"use client";

import { ArrowUp } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/social-icons";
import styles from "./site-footer.module.css";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  function backToTop() {
    const header = document.getElementById("home");
    // The existing html scroll-behavior also handles reduced-motion preferences.
    header?.scrollIntoView({ behavior: "auto", block: "start" });
    header?.querySelector<HTMLAnchorElement>('a[href="/"]')?.focus({ preventScroll: true });
  }

  return (
    <footer className={`page-container ${styles.footer}`} aria-label="Site footer">
      <div className={styles.topRow}>
        <div className={styles.identity}>
          <a href="#home" className={styles.brand} aria-label="Chavidu Bandara — home">
            <span className={styles.monogram} aria-hidden="true">cb<span>.</span></span>
            <span className={styles.name}>Chavidu Bandara</span>
          </a>
          <p className={styles.description}>
            Software Engineer building reliable web and AI-powered systems.
          </p>
        </div>

        <div className={styles.links}>
          <nav aria-label="Footer navigation">
            <ul className={styles.navigation}>
              {navigation.map(({ label, href }) => (
                <li key={href}><a href={href} className={styles.navLink}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <ul className={styles.socialLinks} aria-label="Social profiles">
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
          </ul>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <p className={styles.copyright}>© {year} Chavidu Bandara. All rights reserved.</p>
        <button type="button" className={styles.backToTop} onClick={backToTop}>
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
