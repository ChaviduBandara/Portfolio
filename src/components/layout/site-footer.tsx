"use client";

import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/social-icons";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  function backToTop() {
    const header = document.getElementById("home");
    // The existing html scroll-behavior also handles reduced-motion preferences.
    header?.scrollIntoView({ behavior: "auto", block: "start" });
    header?.querySelector<HTMLAnchorElement>('a[href="/"]')?.focus({ preventScroll: true });
  }

  return (
    <>
      <footer className={`page-container ${styles.footer}`} aria-label="Site footer">
        <ul className={styles.socialLinks} aria-label="Social profiles and contact">
          <li>
            <a
              href="https://github.com/ChaviduBandara"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chavidu Bandara on GitHub (opens in a new tab)"
            >
              <Github size={19} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/chavidu-bandara/"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chavidu Bandara on LinkedIn (opens in a new tab)"
            >
              <Linkedin size={19} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={styles.socialLink}
              aria-label="Email Chavidu Bandara — go to Contact"
            >
              <Mail size={19} aria-hidden="true" />
            </a>
          </li>
        </ul>
        <p className={styles.copyright}>© {year} Chavidu Bandara. All rights reserved.</p>
      </footer>
      <button
        type="button"
        className={styles.backToTop}
        onClick={backToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </>
  );
}
