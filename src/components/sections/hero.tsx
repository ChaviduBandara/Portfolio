import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import styles from "./hero.module.css";

export function Hero() {
  // Evaluated on the server, including at production build time.
  const hasPortrait = existsSync(path.join(process.cwd(), "public/images/profile.jpg"));

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
      </div>

      <figure className={styles.portrait}>
        <div className={styles.portraitFrame}>
          {hasPortrait ? (
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Chavidu Bandara, Software Engineer"
              fill
              sizes="(min-width: 1192px) 410px, (min-width: 960px) 35vw, (min-width: 480px) 440px, calc(100vw - 40px)"
              loading="eager"
              fetchPriority="high"
              className={styles.photo}
            />
          ) : (
            <div
              className={styles.placeholder}
              role="img"
              aria-label="Abstract portrait placeholder for Chavidu Bandara"
            >
              <div className={styles.artwork} aria-hidden="true">
                <span className={styles.artworkInitials}>CB</span>
                <span className={styles.artworkCross}>+</span>
                <span className={styles.orbit} />
                <span className={styles.disc} />
                <span className={styles.shoulders} />
                <span className={styles.neck} />
                <span className={styles.head} />
                <span className={styles.artworkLabel}>A work in progress.</span>
              </div>
            </div>
          )}
        </div>
        <figcaption className={styles.caption}>
          <p className={styles.captionName}>Chavidu Bandara</p>
          <p className={styles.captionRole}>Software Engineer</p>
        </figcaption>
      </figure>
    </section>
  );
}
