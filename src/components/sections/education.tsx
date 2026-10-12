"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { CalendarDays, GraduationCap, School } from "lucide-react";
import { education } from "@/data/education";
import styles from "./education.module.css";

export function Education() {
  const timeline = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = timeline.current;
    if (!list) return;

    const entries = Array.from(list.children) as HTMLLIElement[];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Like the existing count-up, observe once and leave completed entries alone.
    const observer = !motion.matches && "IntersectionObserver" in window
      ? new IntersectionObserver((intersections) => {
        intersections.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          (target as HTMLLIElement).dataset.entered = "true";
          observer?.unobserve(target);
        });
      }, { threshold: 0.1 })
      : undefined;
    const finish = () => {
      entries.forEach((entry) => { entry.dataset.entered = "static"; });
      observer?.disconnect();
    };

    if (!observer) {
      finish();
      return;
    }

    entries.forEach((entry) => {
      if (!entry.dataset.entered) observer?.observe(entry);
    });

    const onMotionChange = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section id="education" className={styles.education} aria-labelledby="education-heading">
      <h2 id="education-heading" className={styles.title}>
        <GraduationCap aria-hidden="true" strokeWidth={1.5} />
        <span>Education Journey</span>
      </h2>

      <ol ref={timeline} className={styles.timeline} role="list">
        {education.map((entry, index) => {
          const Icon = entry.kind === "university" ? GraduationCap : School;
          return (
            <li key={entry.id} className={styles.entry} style={{ "--entry-delay": `${index * 90}ms` } as CSSProperties}>
              <article className={styles.card} aria-labelledby={`education-${entry.id}`}>
                <div className={styles.icon} aria-hidden="true">
                  <Icon strokeWidth={1.5} />
                </div>
                <div className={styles.details}>
                  <h3 id={`education-${entry.id}`} className={styles.institution}>{entry.institution}</h3>
                  <p className={styles.qualification}>{entry.qualification}</p>
                  {entry.affiliation && <p className={styles.affiliation}>{entry.affiliation}</p>}
                  {entry.achievement && <p className={styles.achievement}>{entry.achievement}</p>}
                  <p className={styles.dates}>
                    <CalendarDays size={16} aria-hidden="true" strokeWidth={1.5} />
                    <span>
                      <time dateTime={entry.start.dateTime}>{entry.start.label}</time>
                      {entry.end && <> – <time dateTime={entry.end.dateTime}>{entry.end.label}</time></>}
                    </span>
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
