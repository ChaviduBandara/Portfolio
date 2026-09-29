import { BriefcaseBusiness, GraduationCap, PanelsTopLeft } from "lucide-react";
import styles from "./about.module.css";

export function About() {
  return (
    <section
      id="about"
      className={`page-container ${styles.about}`}
      aria-labelledby="about-heading"
    >
      <div className={styles.introduction}>
        <div>
          <p className={styles.eyebrow}>About</p>
          <h2 id="about-heading" className={styles.title}>
            A little<br />about me<span>.</span>
          </h2>
        </div>

        <div className={styles.copy}>
          <p className={styles.lead}>
            I’m Chavidu, a Software Engineering graduate with experience in full-stack development. I enjoy building complete web solutions—from responsive and user-friendly frontend interfaces using React and Next.js to reliable backend systems and REST APIs using Java and Spring Boot.
          </p>
          <p>
            During my internship at Dimensions IT (Pvt) Ltd, I contributed to multiple client-facing projects for both local and international clients. My work included frontend development, backend functionality, API integration, feature improvements, bug fixes, technical SEO and manual testing within an Agile environment.
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
        <li className={styles.highlight}>
          <div className={styles.card}>
            <PanelsTopLeft className={styles.icon} aria-hidden="true" strokeWidth={1.5} />
            <h3 className={styles.cardTitle}>
              <span className={styles.metric}>6+</span>{" "}
              <span className={styles.label}>client web projects</span>
            </h3>
            <p className={styles.detail}>
              Client-facing work across local and international projects
            </p>
            <p className={styles.note}>
              E-commerce websites, microsites, corporate websites and custom web applications.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}
