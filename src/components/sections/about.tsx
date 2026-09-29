import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import styles from "./about.module.css";

export function About() {
  return (
    <section
      id="about"
      className={`page-container ${styles.about}`}
      aria-labelledby="about-heading"
    >
      <div className={styles.introduction}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>About</p>
          <h2 id="about-heading" className={styles.title}>
            A little about me<span>.</span>
          </h2>
        </div>

        <div className={styles.copy}>
          <p className={styles.lead}>
            I’m Chavidu Bandara, a Software Engineering graduate who enjoys building complete web solutions—from responsive, user-friendly frontend interfaces to reliable backend systems and REST APIs.
          </p>
          <p>
            I work across both frontend and backend development using technologies such as React, Next.js, Java and Spring Boot. My goal is to create applications that are visually engaging, maintainable, scalable and easy to use.
          </p>
          <p>
            During my internship at Dimensions IT (Pvt) Ltd, I contributed to multiple client-facing projects for both local and international clients, including e-commerce websites, microsites, corporate websites and custom web applications. My work included frontend development, backend functionality, API integration, bug fixes, technical SEO, manual testing and collaboration within Agile teams.
          </p>
          <p>
            I’m also interested in artificial intelligence, machine learning and computer vision. I applied these areas in DairyFusion AI, my final-year project for multimodal yoghurt defect detection.
          </p>
        </div>
      </div>

      <ul className={styles.highlights} aria-label="Career highlights">
        <li className={styles.highlight}>
          <div className={styles.card}>
            <GraduationCap className={styles.icon} aria-hidden="true" strokeWidth={1.5} />
            <h3 className={styles.cardTitle}>
              <span className={styles.metric}>First Class</span>{" "}
              <span className={styles.label}>Honours</span>
            </h3>
            <p className={styles.detail}>BEng (Hons) Software Engineering</p>
            <p className={styles.note}>
              University of Westminster through Informatics Institute of Technology (IIT).
            </p>
          </div>
        </li>
        <li className={styles.highlight}>
          <div className={styles.card}>
            <BriefcaseBusiness className={styles.icon} aria-hidden="true" strokeWidth={1.5} />
            <h3 className={styles.cardTitle}>
              <span className={styles.metric}>Over one year</span>{" "}
              <span className={styles.label}>of professional experience</span>
            </h3>
            <p className={styles.detail}>
              Software Engineering Intern<br />Dimensions IT (Pvt) Ltd
            </p>
            <p className={styles.note}>
              <time dateTime="2024-05">May 2024</time>–<time dateTime="2025-06">June 2025</time>
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}
