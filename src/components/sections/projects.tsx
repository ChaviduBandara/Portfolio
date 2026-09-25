"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import styles from "./projects.module.css";

const initialCount = 3;

export function Projects() {
  const [expanded, setExpanded] = useState(false);
  const firstRevealedCard = useRef<HTMLElement>(null);
  const visibleProjects = expanded ? projects : projects.slice(0, initialCount);

  useEffect(() => {
    if (expanded) {
      firstRevealedCard.current?.focus({ preventScroll: true });
    }
  }, [expanded]);

  return (
    <section
      id="projects"
      className={`page-container ${styles.projects}`}
      aria-labelledby="projects-heading"
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Projects</p>
        <h2 id="projects-heading" className={styles.title}>
          Portfolio Showcase<span>.</span>
        </h2>
        <p className={styles.introduction}>
          A selection of work across full-stack development, AI, and the web.
        </p>
      </div>

      <ul id="project-list" className={styles.grid} aria-label="Projects">
        {visibleProjects.map((project, index) => (
          <li key={project.id} className={styles.project}>
            <ProjectCard
              project={project}
              number={index + 1}
              ref={index === initialCount ? firstRevealedCard : undefined}
            />
          </li>
        ))}
      </ul>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.revealButton}
          aria-expanded={expanded}
          aria-controls="project-list"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show Less" : "See More"}
          {expanded ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
        </button>
        <p className={styles.count} role="status" aria-live="polite" aria-atomic="true">
          Showing {visibleProjects.length} of {projects.length} projects
        </p>
      </div>
    </section>
  );
}
