import type { Ref } from "react";
import { Boxes, Coffee, Database, Hand, ScanLine, Workflow } from "lucide-react";
import type { Project } from "@/data/projects";
import styles from "./project-card.module.css";

const visualIcons = {
  inventory: Boxes,
  inspection: ScanLine,
  threads: Workflow,
  gesture: Hand,
  records: Database,
  cafe: Coffee,
};

type ProjectCardProps = {
  project: Project;
  number: number;
  ref?: Ref<HTMLElement>;
};

export function ProjectCard({ project, number, ref }: ProjectCardProps) {
  const Icon = visualIcons[project.visual];

  return (
    <article
      ref={ref}
      tabIndex={0}
      className={styles.card}
      aria-labelledby={`${project.id}-title`}
      aria-describedby={`${project.id}-description`}
    >
      <div className={`${styles.visual} ${styles[project.visual]}`} aria-hidden="true">
        <span className={styles.visualLabel}>Concept illustration</span>
        <div className={styles.scene}>
          <span className={styles.shapeOne} />
          <span className={styles.shapeTwo} />
          <span className={styles.shapeThree} />
          <Icon className={styles.glyph} strokeWidth={1.25} />
        </div>
        <span className={styles.number}>{String(number).padStart(2, "0")}</span>
      </div>
      <div className={styles.content}>
        <h3 id={`${project.id}-title`} className={styles.title}>
          {project.title}
          {project.subtitle && (
            <>
              <span className="sr-only"> — </span>
              <span className={styles.subtitle}>{project.subtitle}</span>
            </>
          )}
        </h3>
        <p id={`${project.id}-description`} className={styles.description}>
          {project.description}
        </p>
        <ul className={styles.tags} aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
