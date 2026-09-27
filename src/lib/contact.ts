export const contactEmail = "chavidunethmika@gmail.com";

export const contactLimits = { name: 100, email: 254, message: 5000 } as const;
export const contactFields = ["name", "email", "message"] as const;
export type ContactField = (typeof contactFields)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

type ValidationResult =
  | { valid: true; values: ContactValues }
  | { valid: false; errors: ContactErrors };

function validEmail(email: string) {
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;

  return (
    local.length <= 64 &&
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) &&
    !local.startsWith(".") &&
    !local.endsWith(".") &&
    !local.includes("..") &&
    domain.includes(".") &&
    domain.split(".").every((label) =>
      /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label),
    )
  );
}

// Shared rules keep browser feedback and server validation consistent.
export function validateContact(input: unknown): ValidationResult {
  const source = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown>
    : {};
  const values: ContactValues = { name: "", email: "", message: "" };
  const errors: ContactErrors = {};
  const requiredMessages: ContactErrors = {
    name: "Please enter your name.",
    email: "Please enter your email address.",
    message: "Please write a message.",
  };

  for (const field of contactFields) {
    const value = source[field];
    if (typeof value !== "string" || !value.trim()) {
      errors[field] = requiredMessages[field];
    } else if (value.length > contactLimits[field]) {
      errors[field] = `Use ${contactLimits[field].toLocaleString("en-US")} characters or fewer.`;
    } else if (Array.from(value).some((character) => {
      const code = character.charCodeAt(0);
      const allowedWhitespace = field === "message" && [9, 10, 13].includes(code);
      return (code < 32 || code === 127) && !allowedWhitespace;
    })) {
      errors[field] = "Please remove unsupported control characters.";
    } else {
      values[field] = value.trim();
    }
  }

  if (!errors.email && !validEmail(values.email)) {
    errors.email = "Enter a valid email address, such as name@example.com.";
  }

  return Object.keys(errors).length
    ? { valid: false, errors }
    : { valid: true, values };
}
