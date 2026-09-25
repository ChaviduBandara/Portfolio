import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className="page-container">
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Chavidu Bandara — home">
          <span className={styles.monogram} aria-hidden="true">cb<span>.</span></span>
          <span className={styles.name}>Chavidu Bandara</span>
        </Link>
        <div className={styles.controls}>
          <nav className={styles.navigation} aria-label="Main navigation">
            <a className={styles.navLink} href="#about">About</a>
            <a className={styles.navLink} href="#projects">Projects</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
