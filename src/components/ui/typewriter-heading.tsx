"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import styles from "./typewriter-heading.module.css";

type TypewriterHeadingProps = {
  id: string;
  className: string;
  lineClassName: string;
  lines: readonly string[];
};

type Phase = "typing" | "holding" | "deleting" | "waiting";

const TYPE_DELAY = 110;
const HOLD_DELAY = 3000;
const DELETE_DELAY = 60;
const REPEAT_DELAY = 500;

export function TypewriterHeading({ id, className, lineClassName, lines }: TypewriterHeadingProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const text = lines.join(" ");

  useLayoutEffect(() => {
    const container = wrapper.current;
    const title = heading.current;
    const caret = cursor.current;
    if (!container || !title || !caret) return;

    const characters = Array.from(title.querySelectorAll<HTMLSpanElement>("[data-character]"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const total = Array.from(text).length;
    // If hydration is late, keep the already-visible fallback and begin with a hold.
    let count = getComputedStyle(characters[0]).opacity === "0" ? 0 : total;
    let phase: Phase = count === 0 ? "typing" : "holding";
    let remaining = count === 0 ? TYPE_DELAY : HOLD_DELAY;
    let due = 0;
    let timer: number | undefined;
    let visible = false;
    let disposed = false;
    let observer: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;

    const positionCursor = () => {
      const last = characters.findLast((character) => Number(character.dataset.character) < count);
      const characterBox = (last ?? characters[0]).getBoundingClientRect();
      const headingBox = title.getBoundingClientRect();
      caret.style.left = `${(last ? characterBox.right : characterBox.left) - headingBox.left}px`;
      caret.style.top = `${characterBox.top - headingBox.top}px`;
    };

    const render = () => {
      characters.forEach((character) => {
        character.dataset.visible = String(Number(character.dataset.character) < count);
      });
      container.dataset.phase = phase;
      positionCursor();
    };

    const stop = () => {
      if (timer !== undefined) {
        remaining = Math.max(0, due - performance.now());
        window.clearTimeout(timer);
        timer = undefined;
      }
      container.dataset.running = "false";
    };

    const sync = () => {
      if (disposed || motion.matches || !visible || document.hidden) {
        stop();
        return;
      }
      container.dataset.running = "true";
      if (timer !== undefined) return;
      due = performance.now() + remaining;
      timer = window.setTimeout(() => {
        timer = undefined;
        remaining = 0;
        if (disposed || motion.matches || !visible || document.hidden) {
          sync();
          return;
        }
        switch (phase) {
          case "waiting":
          case "typing":
            count += 1;
            phase = count === total ? "holding" : "typing";
            remaining = count === total ? HOLD_DELAY : TYPE_DELAY;
            break;
          case "holding":
          case "deleting":
            count -= 1;
            phase = count === 0 ? "waiting" : "deleting";
            remaining = count === 0 ? REPEAT_DELAY : DELETE_DELAY;
            break;
        }
        render();
        sync();
      }, remaining);
    };

    const onMotionChange = () => {
      if (motion.matches) {
        stop();
        count = total;
        phase = "holding";
        remaining = HOLD_DELAY;
        render();
      }
      sync();
    };

    try {
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0;
        sync();
      }, { threshold: 0 });
      observer.observe(title.closest("section") ?? title);
      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(positionCursor);
        resizeObserver.observe(title);
      }
      window.addEventListener("resize", positionCursor);
      document.addEventListener("visibilitychange", sync);
      motion.addEventListener("change", onMotionChange);
      render();
      container.dataset.ready = "true";
      onMotionChange();
    } catch {
      // Leave the complete, server-rendered heading readable if setup fails.
      disposed = true;
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      container.dataset.fallback = "true";
      delete container.dataset.ready;
    }

    return () => {
      disposed = true;
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", positionCursor);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotionChange);
      delete container.dataset.ready;
      delete container.dataset.fallback;
    };
  }, [text]);

  return (
    <div ref={wrapper} className={styles.wrapper}>
      <h1 ref={heading} id={id} className={`${className} ${styles.heading}`} aria-label={text}>
        {lines.map((line, lineIndex) => {
          const offset = lines.slice(0, lineIndex).reduce((length, previous) => length + Array.from(previous).length + 1, 0);
          return (
            <Fragment key={lineIndex}>
              {lineIndex > 0 && " "}
              <span className={lineClassName} aria-hidden="true">
                {Array.from(line).map((character, index) => (
                  <span key={index} className={styles.character} data-character={offset + index}>
                    {character}
                  </span>
                ))}
              </span>
            </Fragment>
          );
        })}
        <span ref={cursor} className={styles.cursor} aria-hidden="true" />
      </h1>
    </div>
  );
}
