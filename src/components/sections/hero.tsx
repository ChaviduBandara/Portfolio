import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={`page-container ${styles.hero}`} aria-labelledby="hero-heading">
      <div className={styles.copy}>
        <p className={styles.introduction}>
          <span className={styles.introDot} aria-hidden="true" />
          Software Engineer <span aria-hidden="true">·</span> Sri Lanka
        </p>
        <h1 id="hero-heading" className={styles.headline}>
          <span className={styles.line}>I build systems</span>{" "}
          <span className={styles.highlight}>
            <span className={styles.line}>people</span>{" "}
            <span className={styles.line}>remember.</span>
          </span>
        </h1>
        <p className={styles.supportingLine}>Web · Full Stack · AI</p>
        <a href="#projects" className={styles.viewProjects}>
          View Projects
          <ArrowDownRight size={18} aria-hidden="true" />
        </a>
      </div>

      <figure className={styles.portrait}>
        <div className={styles.portraitFrame}>
          <div className={styles.portraitImage}>
            <Image
              src="/images/profile-sketch.png"
              alt="Pencil sketch portrait of Chavidu Bandara"
              fill
              sizes="(min-width: 1192px) 390px, (min-width: 960px) 33vw, (min-width: 480px) 422px, calc(100vw - 58px)"
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
