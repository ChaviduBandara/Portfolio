import type { Ref } from "react";
import Image from "next/image";
import { ArrowUpRight, Boxes, Database, Hand, ScanLine, Workflow } from "lucide-react";
import type { Project } from "@/data/projects";
import { Github } from "@/components/ui/social-icons";
import styles from "./project-card.module.css";

const visualIcons = {
  inventory: Boxes,
  inspection: ScanLine,
  threads: Workflow,
  gesture: Hand,
  records: Database,
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
      {project.image ? (
        <div className={`${styles.visual} ${styles.imageVisual}`}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 699px) calc(100vw - 40px), (max-width: 959px) calc((100vw - 64px) / 2), (max-width: 1192px) calc((100vw - 88px) / 3), 368px"
            className={styles.image}
          />
        </div>
      ) : (
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
      )}
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
        {(project.liveUrl || project.repositoryUrl) && (
          <div className={styles.actions}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.liveLink}
                aria-label={`Live website for ${project.title} (opens in a new tab)`}
              >
                Live website
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repositoryLink}
                aria-label={`View ${project.title} on GitHub`}
                title={`View ${project.title} on GitHub`}
              >
                <Github size={19} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
