import Image from "next/image";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/social-icons";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={`page-container ${styles.hero}`} aria-labelledby="hero-heading">
      <div className={styles.copy}>
        <p className={`${styles.introduction} ${styles.highlight}`}>
          <span className={styles.introDot} aria-hidden="true" />
          Software Engineer
        </p>
        <h1 id="hero-heading" className={styles.headline}>
          <span className={styles.line}>Hi, I’m</span>{" "}
          <span className={styles.line}>Chavidu</span>{" "}
          <span className={styles.line}>Bandara.</span>
        </h1>
        <p className={styles.supportingLine}>
          Full-stack developer building responsive frontend experiences, scalable backend systems and intelligent applications from modern web platforms to AI-powered computer vision solutions.
        </p>
        <div className={styles.actions}>
          <a href="#projects" className={styles.viewProjects}>
            View Projects
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>
          <a
            href="/documents/chavidu-bandara-resume.pdf"
            download
            className={`${styles.viewProjects} ${styles.downloadResume}`}
          >
            Download Resume
            <Download size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={styles.portrait}>
        <figure className={styles.portraitFrame}>
          <svg
            className={styles.portraitDecoration}
            viewBox="0 0 400 560"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M160 10C110 16 70 4 28 10S10 16 10 44C16 104 4 164 10 224S16 260 10 278" />
            <path d="M390 240C382 308 398 382 390 458L390 524Q390 548 366 548C320 552 290 544 254 548" />
          </svg>
          <div className={styles.portraitImage}>
            <Image
              src="/images/profile-sketch.png"
              alt="Pencil sketch portrait of Chavidu Bandara"
              fill
              sizes="(min-width: 1192px) 362px, (min-width: 960px) 33vw, (min-width: 480px) 390px, calc(100vw - 78px)"
              loading="eager"
              fetchPriority="high"
              className={styles.photo}
            />
          </div>
          <figcaption className={styles.caption}>
            <p className={styles.captionName}>Chavidu Bandara</p>
            <p className={styles.captionRole}>Software Engineer</p>
            <div className={styles.portraitLinks}>
              <a
                href="https://github.com/ChaviduBandara"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chavidu Bandara on GitHub (opens in a new tab)"
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/chavidu-bandara/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chavidu Bandara on LinkedIn (opens in a new tab)"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                aria-label="Contact Chavidu Bandara at chavidunethmika@gmail.com"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
