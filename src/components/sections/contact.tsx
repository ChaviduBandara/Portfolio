"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/social-icons";
import {
  contactEmail,
  contactFields,
  contactLimits,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import styles from "./contact.module.css";

type SubmissionState = "idle" | "sending" | "success" | "error";
const retryMessage = "We couldn't send your message. Please try again in a moment, or copy the email address to get in touch directly.";

export function Contact() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const manualCopyInput = useRef<HTMLInputElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitting = useRef(false);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  useEffect(() => {
    if (copyState === "manual") {
      manualCopyInput.current?.focus();
      manualCopyInput.current?.select();
    }
  }, [copyState]);

  async function copyEmail() {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyState("copied");
      copyTimer.current = setTimeout(() => setCopyState("idle"), 3000);
    } catch {
      setCopyState("manual");
      manualCopyInput.current?.focus();
      manualCopyInput.current?.select();
    }
  }

  function clearError(field: ContactField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submission !== "sending") setSubmission("idle");
  }

  function focusFirstError(form: HTMLFormElement, fieldErrors: ContactErrors) {
    const firstInvalid = contactFields.find((field) => fieldErrors[field]);
    if (firstInvalid) {
      const input = form.elements.namedItem(firstInvalid) as HTMLInputElement | HTMLTextAreaElement;
      input.focus();
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const validation = validateContact(Object.fromEntries(new FormData(form)));
    setSubmission("idle");
    if (!validation.valid) {
      setErrors(validation.errors);
      focusFirstError(form, validation.errors);
      return;
    }

    setErrors({});
    submitting.current = true;
    setSubmission("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.values),
      });
      const result: { success?: boolean; errors?: ContactErrors } = await response.json();

      if (!response.ok || result.success !== true) {
        if (response.status === 400 && result.errors) {
          setErrors(result.errors);
          setSubmissionError("Please check the fields below and try again.");
          setSubmission("error");
          // Wait for the fieldset to become enabled before moving focus.
          requestAnimationFrame(() => focusFirstError(form, result.errors!));
          return;
        }
        throw new Error("Contact request failed");
      }

      form.reset();
      setSubmission("success");
    } catch {
      setSubmissionError(retryMessage);
      setSubmission("error");
    } finally {
      submitting.current = false;
    }
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

        <ul className={styles.contactCards} aria-label="Ways to get in touch">
          <li>
            <button
              type="button"
              className={styles.contactCard}
              onClick={copyEmail}
              aria-label={`Copy email address: ${contactEmail}`}
              aria-describedby="contact-copy-status"
              title="Copy email address"
            >
              <span className={styles.cardIcon}><Mail size={21} aria-hidden="true" /></span>
              <span className={styles.cardText}>
                <span className={styles.cardLabel}>Email</span>
                <span className={styles.cardValue}>{contactEmail}</span>
              </span>
              {copyState === "copied"
                ? <Check className={styles.cardAction} size={17} aria-hidden="true" />
                : <Copy className={styles.cardAction} size={17} aria-hidden="true" />}
            </button>
          </li>
          <li>
            <a className={styles.contactCard} href="https://www.linkedin.com/in/chavidu-bandara/" target="_blank" rel="noopener noreferrer">
              <span className={styles.cardIcon}><Linkedin size={21} aria-hidden="true" /></span>
              <span className={styles.cardText}>
                <span className={styles.cardLabel}>LinkedIn</span>
                <span className={styles.cardValue}>Chavidu Bandara</span>
              </span>
              <ArrowUpRight className={styles.cardAction} size={17} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className={styles.contactCard} href="https://github.com/ChaviduBandara" target="_blank" rel="noopener noreferrer">
              <span className={styles.cardIcon}><Github size={21} aria-hidden="true" /></span>
              <span className={styles.cardText}>
                <span className={styles.cardLabel}>GitHub</span>
                <span className={styles.cardValue}>ChaviduBandara</span>
              </span>
              <ArrowUpRight className={styles.cardAction} size={17} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
        <p id="contact-copy-status" className={styles.copyStatus} role="status" aria-live="polite">
          {copyState === "idle" && "Click the email card to copy the address."}
          {copyState === "copied" && "Email copied"}
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

      <form className={styles.form} onSubmit={sendMessage} noValidate aria-labelledby="contact-form-heading" aria-busy={submission === "sending"}>
        <h3 id="contact-form-heading" className={styles.formTitle}>Send a message</h3>
        <p className={styles.formIntro}>A conversation starts with a hello. All fields are required.</p>
        {Object.values(errors).some(Boolean) && (
          <p className={styles.errorSummary} role="alert">Please check the fields below.</p>
        )}

        <fieldset className={styles.formFields} disabled={submission === "sending"}>
          <legend className="sr-only">Your contact details and message</legend>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={contactLimits.name}
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
                maxLength={contactLimits.email}
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
              maxLength={contactLimits.message}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={`contact-message-help${errors.message ? " contact-message-error" : ""}`}
              onChange={() => clearError("message")}
            />
            <p id="contact-message-help" className={styles.fieldHelp}>Up to 5,000 characters.</p>
            {errors.message && <p id="contact-message-error" className={styles.error}>{errors.message}</p>}
          </div>

          <button type="submit" className={styles.sendButton} disabled={submission === "sending"}>
            {submission === "sending" ? "Sending…" : "Send Message"}
            <Send size={18} aria-hidden="true" />
          </button>
        </fieldset>

        <p className={styles.submissionStatus} role="status" aria-live="polite" aria-atomic="true">
          {submission === "sending" && "Sending your message…"}
          {submission === "success" && <><Check size={17} aria-hidden="true" />Message sent successfully</>}
        </p>
        {submission === "error" && (
          <p className={styles.errorSummary} role="alert">{submissionError}</p>
        )}
      </form>
    </section>
  );
}
