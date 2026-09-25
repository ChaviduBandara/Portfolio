"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import styles from "./contact.module.css";

const contactEmail = "chavidunethmika@gmail.com";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

export function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const manualCopyInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (copyState === "manual") {
      manualCopyInput.current?.focus();
      manualCopyInput.current?.select();
    }
  }, [copyState]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyState("copied");
    } catch {
      setCopyState("manual");
      // Also reselect the address if the manual fallback is already displayed.
      manualCopyInput.current?.focus();
      manualCopyInput.current?.select();
    }
  }

  function clearError(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function openEmailDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const nextErrors: FieldErrors = {};

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailInput.validity.valid) {
      nextErrors.email = "Enter a valid email address, such as name@example.com.";
    }
    if (!message) nextErrors.message = "Please write a message.";

    setErrors(nextErrors);
    const firstInvalidField = (["name", "email", "message"] as const).find(
      (field) => nextErrors[field],
    );

    if (firstInvalidField) {
      const field = form.elements.namedItem(firstInvalidField) as HTMLInputElement | HTMLTextAreaElement;
      field.focus();
      return;
    }

    const subject = `Portfolio enquiry from ${name}`;
    const body = [
      "Hi Chavidu,",
      "",
      message.replace(/\r?\n/g, "\r\n"),
      "",
      `From: ${name}`,
      `Reply email: ${email}`,
    ].join("\r\n");
    const draft = document.createElement("a");
    draft.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Hand off to the visitor's mail app. Keep their text and make no delivery claim.
    draft.click();
  }

  return (
    <section
      id="contact"
      className={`page-container ${styles.contact}`}
      aria-labelledby="contact-heading"
    >
      <div className={styles.details}>
        <p className={styles.eyebrow}>Contact</p>
        <h2 id="contact-heading" className={styles.title}>
          Let’s start a<br />conversation<span>.</span>
        </h2>
        <p className={styles.invitation}>
          Have a software engineering opportunity or a project in mind? I’d love to hear about it.
        </p>

        <div className={styles.emailBlock}>
          <p className={styles.linkLabel}>Email me</p>
          <a className={styles.emailLink} href={`mailto:${contactEmail}`}>
            <Mail size={20} aria-hidden="true" />
            <span>{contactEmail}</span>
          </a>
          <button type="button" className={styles.copyButton} onClick={copyEmail}>
            {copyState === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            Copy email address
          </button>
          <p className={styles.copyStatus} role="status" aria-live="polite">
            {copyState === "copied" && "Email address copied."}
            {copyState === "manual" && "Clipboard access is unavailable. Copy the selected address below."}
          </p>
          {copyState === "manual" && (
            <input
              ref={manualCopyInput}
              className={styles.manualCopy}
              aria-label="Email address to copy manually"
              value={contactEmail}
              readOnly
              onFocus={(event) => event.currentTarget.select()}
            />
          )}
        </div>

        <ul className={styles.socialLinks} aria-label="Social profiles">
          <li>
            <a href="https://github.com/ChaviduBandara" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/chavidu-bandara/" target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>

      <form className={styles.form} onSubmit={openEmailDraft} noValidate aria-labelledby="contact-form-heading">
        <h3 id="contact-form-heading" className={styles.formTitle}>Write a note</h3>
        <p className={styles.formIntro}>All fields are required.</p>
        {Object.values(errors).some(Boolean) && (
          <p className={styles.errorSummary} role="alert">Please check the fields below.</p>
        )}

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              onChange={() => clearError("name")}
            />
            {errors.name && <p id="contact-name-error" className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              pattern="[^@]+@[^@]+[.][^@]+"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              onChange={() => clearError("email")}
            />
            {errors.email && <p id="contact-email-error" className={styles.error}>{errors.email}</p>}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            onChange={() => clearError("message")}
          />
          {errors.message && <p id="contact-message-error" className={styles.error}>{errors.message}</p>}
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.draftButton} aria-describedby="contact-draft-help">
            Open email draft <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <p id="contact-draft-help" className={styles.draftHelp}>
            Opens a draft in your email app. Review and send it from there.
          </p>
        </div>
        <p className={styles.fallbackHelp}>
          No email app set up? Use “Copy email address” to write from your preferred email service.
        </p>
      </form>
    </section>
  );
}
