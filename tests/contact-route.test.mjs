import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Exercise the actual TypeScript handler and Resend SDK without sending email.
function compile(relativePath) {
  return ts.transpileModule(readFileSync(new URL(relativePath, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}

const validationModule = { exports: {} };
runInNewContext(compile("../src/lib/contact.ts"), {
  exports: validationModule.exports,
  module: validationModule,
});
const routeSource = compile("../src/app/api/contact/route.ts");

function loadRoute(env = {}) {
  const routeModule = { exports: {} };
  runInNewContext(routeSource, {
    exports: routeModule.exports,
    module: routeModule,
    require: (specifier) => specifier === "@/lib/contact" ? validationModule.exports : require(specifier),
    process: { env },
    Buffer,
    Response,
  });
  return routeModule.exports.POST;
}

const valid = { name: "Alex Example", email: "alex+portfolio@example.com", message: "Hello Chavidu,\nI'd like to discuss an opportunity." };
const configured = {
  RESEND_API_KEY: "test-only-not-a-real-key",
  CONTACT_TO_EMAIL: "owner@example.com",
  CONTACT_FROM_EMAIL: "Portfolio <sender@example.com>",
};

function request(body, contentType = "application/json") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("route loads without configuration and safely refuses a valid submission", async () => {
  const response = await loadRoute()(request(valid));
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.match(result.error, /try again/i);
  assert.doesNotMatch(JSON.stringify(result), /RESEND|API_KEY|CONTACT_FROM|CONTACT_TO/);
});

for (const field of Object.keys(configured)) {
  test(`requires ${field} before sending`, async (context) => {
    const outbound = context.mock.method(globalThis, "fetch", () => assert.fail("Must not send"));
    const env = { ...configured, [field]: "   " };
    assert.equal((await loadRoute(env)(request(valid))).status, 503);
    assert.equal(outbound.mock.callCount(), 0);
  });
}

for (const [label, body, status, contentType] of [
  ["missing fields", {}, 400],
  ["null body", null, 400],
  ["array body", [], 400],
  ["wrong field types", { name: 123, email: [], message: {} }, 400],
  ["whitespace fields", { name: " ", email: "\t", message: "\n" }, 400],
  ["empty body", "", 400],
  ["malformed JSON", "{broken", 400],
  ["oversized body", " ".repeat(32769), 413],
  ["wrong content type", valid, 415, "text/plain"],
  ["name over limit", { ...valid, name: "a".repeat(101) }, 400],
  ["email over limit", { ...valid, email: "a".repeat(255) }, 400],
  ["message over limit", { ...valid, message: "a".repeat(5001) }, 400],
  ["name header injection", { ...valid, name: "Alex\r\nBcc: person@example.com" }, 400],
  ["control characters", { ...valid, message: "Hello\u0000there" }, 400],
]) {
  test(`rejects ${label} without contacting Resend`, async (context) => {
    const outbound = context.mock.method(globalThis, "fetch", () => assert.fail("Must not send"));
    const response = await loadRoute(configured)(request(body, contentType));
    assert.equal(response.status, status);
    assert.equal(typeof (await response.json()).error, "string");
    assert.equal(outbound.mock.callCount(), 0);
  });
}

for (const email of ["not-an-email", "alex@example", "alex@@example.com", "alex@-example.com", "alex@example..com", ".alex@example.com", "alex..test@example.com", "alex@example.com\r\nBcc:x@example.com"]) {
  test(`rejects malformed email ${JSON.stringify(email)}`, async () => {
    const response = await loadRoute()(request({ ...valid, email }));
    assert.equal(response.status, 400);
    assert.equal(typeof (await response.json()).errors.email, "string");
  });
}

test("sends trimmed plain text with the configured recipient, sender and visitor reply-to", async (context) => {
  let sent;
  const outbound = context.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(String(url), "https://api.resend.com/emails");
    sent = JSON.parse(options.body);
    return Response.json({ id: "mock-message-id" });
  });
  const response = await loadRoute(configured)(request({
    ...valid,
    name: `  ${valid.name}  `,
    message: `  ${valid.message}\n  `,
    // A caller cannot redirect the message or override the configured sender.
    to: "unexpected@example.com",
    from: "unexpected@example.com",
  }, "application/json; charset=utf-8"));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(outbound.mock.callCount(), 1);
  assert.equal(sent.to, configured.CONTACT_TO_EMAIL);
  assert.equal(sent.from, configured.CONTACT_FROM_EMAIL);
  assert.equal(sent.reply_to, valid.email);
  assert.equal(sent.subject, `Portfolio message from ${valid.name}`);
  assert.ok(sent.text.includes(`Name: ${valid.name}`));
  assert.ok(sent.text.includes(`Email: ${valid.email}`));
  assert.ok(sent.text.endsWith(valid.message));
  assert.equal(sent.html, undefined);
});

for (const failure of ["provider rejection", "network failure", "missing message ID"]) {
  test(`handles ${failure} without claiming success or exposing internal errors`, async (context) => {
    context.mock.method(console, "error", () => {});
    context.mock.method(globalThis, "fetch", async () => {
      if (failure === "network failure") throw new Error("private-provider-details");
      return failure === "provider rejection"
        ? Response.json({ name: "validation_error", message: "private-provider-details" }, { status: 403 })
        : Response.json({});
    });
    const response = await loadRoute(configured)(request(valid));
    assert.equal(response.status, 502);
    const result = await response.json();
    assert.equal(result.success, undefined);
    assert.match(result.error, /try again/i);
    assert.doesNotMatch(JSON.stringify(result), /private-provider-details|test-only|mock-message/);
  });
}
