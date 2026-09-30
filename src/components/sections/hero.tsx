import Image from "next/image";
import { ArrowDownRight, Download } from "lucide-react";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={`page-container ${styles.hero}`} aria-labelledby="hero-heading">
      <div className={styles.copy}>
        <p className={`${styles.introduction} ${styles.highlight}`}>
          <span className={styles.introDot} aria-hidden="true" />
          Software Engineer   |   Full Stack Developer
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

      <figure className={styles.portrait}>
        <div className={styles.portraitFrame}>
          <div className={styles.portraitImage}>
            <Image
              src="/images/profile-sketch.png"
              alt="Pencil sketch portrait of Chavidu Bandara"
              fill
              sizes="(min-width: 1429px) 374px, (min-width: 1072px) calc(28vw - 26px), (min-width: 960px) 280px, (min-width: 400px) 322px, calc(85vw - 18px)"
              loading="eager"
              fetchPriority="high"
              className={styles.photo}
            />
          </div>
        </div>
        <figcaption className={styles.caption}>
          <p className={styles.captionName}>Chavidu Bandara</p>
          <p className={styles.captionRole}>Software Engineer</p>
        </figcaption>
      </figure>
    </section>
  );
}
