import { Resend } from "resend";
import { validateContact } from "@/lib/contact";

export const runtime = "nodejs";

const maxRequestBytes = 32 * 1024;
const sendFailure = "We couldn't send your message. Please try again in a moment, or copy the email address to get in touch directly.";

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return Response.json({ error: "Please submit a JSON request." }, { status: 415 });
  }

  // Bound the body even when Content-Length is missing or incorrect.
  let input: unknown;
  const reader = request.body?.getReader();
  if (!reader) {
    return Response.json({ error: "Please provide your name, email and message." }, { status: 400 });
  }

  try {
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxRequestBytes) {
        await reader.cancel();
        return Response.json({ error: "Your message is too long. Please shorten it and try again." }, { status: 413 });
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return Response.json({ error: "The request could not be read. Please submit valid JSON." }, { status: 400 });
  } finally {
    reader.releaseLock();
  }

  const validation = validateContact(input);
  if (!validation.valid) {
    return Response.json(
      { error: "Please check the fields below.", errors: validation.errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) {
    return Response.json({ error: sendFailure }, { status: 503 });
  }

  try {
    // Initialize only at request time, after configuration has been checked.
    const resend = new Resend(apiKey);
    const { name, email, message } = validation.values;
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: [
        "New message from your portfolio",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error || !data?.id) {
      return Response.json({ error: sendFailure }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: sendFailure }, { status: 502 });
  }
}
