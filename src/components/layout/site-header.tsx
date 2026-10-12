import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header id="home" className="page-container">
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Chavidu Bandara — home">
          <span className={styles.avatar} aria-hidden="true">
            <Image
              src="/images/profile-sketch.png"
              alt=""
              width={40}
              height={40}
              sizes="68px"
              loading="eager"
              className={styles.avatarImage}
            />
          </span>
          <span className={styles.name}>Chavidu Bandara</span>
        </Link>
        <div className={styles.controls}>
          <nav className={styles.navigation} aria-label="Main navigation">
            <a className={styles.navLink} href="#about">About</a>
            <a className={styles.navLink} href="#skills">Skills</a>
            <a className={styles.navLink} href="#projects">Projects</a>
            <a className={styles.navLink} href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
