"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import styles from "./typewriter-heading.module.css";

type TypewriterHeadingProps = {
  id: string;
  className: string;
  lineClassName: string;
  lines: readonly string[];
};

export function TypewriterHeading({ id, className, lineClassName, lines }: TypewriterHeadingProps) {
  const heading = useRef<HTMLHeadingElement>(null);
  const text = lines.join(" ");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finishForReducedMotion = () => {
      if (motion.matches && heading.current) heading.current.dataset.complete = "true";
    };
    finishForReducedMotion();
    motion.addEventListener("change", finishForReducedMotion);
    return () => motion.removeEventListener("change", finishForReducedMotion);
  }, []);

  return (
    <h1 ref={heading} id={id} className={`${className} ${styles.heading}`} aria-label={text}>
      {lines.map((line, lineIndex) => {
        const offset = lines.slice(0, lineIndex).reduce((length, previous) => length + previous.length + 1, 0);
        return (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && " "}
            <span className={lineClassName} aria-hidden="true">
              {Array.from(line).map((character, index) => {
                const last = offset + index === text.length - 1;
                return (
                  <span
                    key={index}
                    className={styles.character}
                    data-cursor={last ? undefined : "true"}
                    style={{
                      "--character-delay": `${200 + (offset + index) * 65}ms`,
                      "--cursor-duration": `${index === line.length - 1 ? 130 : 65}ms`,
                    } as CSSProperties}
                    onAnimationEnd={last ? (event) => {
                      if (!event.nativeEvent.pseudoElement && heading.current) {
                        heading.current.dataset.complete = "true";
                      }
                    } : undefined}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
          </Fragment>
        );
      })}
    </h1>
  );
}
