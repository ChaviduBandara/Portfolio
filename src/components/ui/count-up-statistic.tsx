"use client";

import { useLayoutEffect, useRef } from "react";
import styles from "./count-up-statistic.module.css";

export function CountUpStatistic({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const final = useRef<HTMLSpanElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const completed = useRef(false);

  useLayoutEffect(() => {
    const element = root.current;
    const finalElement = final.current;
    const numberElement = number.current;
    if (!element || !finalElement || !numberElement) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    let started = false;
    let disposed = false;

    const finish = () => {
      completed.current = true;
      element.dataset.state = "complete";
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };

    // If the CSS fallback is already visible (slow/failed initialization), keep
    // it visible rather than flashing from the final value back to zero.
    if (completed.current || motion.matches || !("IntersectionObserver" in window)
      || getComputedStyle(finalElement).visibility !== "hidden") {
      finish();
      return;
    }

    const onMotionChange = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", onMotionChange);

    try {
      observer = new IntersectionObserver((entries) => {
        if (started || completed.current || disposed
          || !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35)) return;
        started = true;
        observer?.disconnect();
        element.dataset.state = "running";
        const start = performance.now();
        let previous = 0;

        const tick = (now: number) => {
          if (disposed || completed.current) return;
          const progress = Math.min((now - start) / 1400, 1);
          const next = Math.floor(value * (1 - (1 - progress) ** 2));
          if (next !== previous) {
            numberElement.textContent = next === value ? `${value}${suffix}` : String(next);
            previous = next;
          }
          if (progress === 1) finish();
          else frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }, { threshold: 0.35 });

      numberElement.textContent = "0";
      element.dataset.state = "waiting";
      observer.observe(element.closest("[data-count-card]") ?? element);
    } catch {
      finish();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      motion.removeEventListener("change", onMotionChange);
      delete element.dataset.state;
    };
  }, [value, suffix]);

  return (
    <span ref={root} className={styles.statistic}>
      <span className="sr-only">{value}{suffix}</span>
      <span ref={final} className={styles.final} aria-hidden="true">{value}{suffix}</span>
      <span ref={number} className={styles.number} aria-hidden="true">0</span>
    </span>
  );
}
