import type { Skill } from "@/data/skills";
import styles from "./skill-card.module.css";

export function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  const SecondaryIcon = skill.secondaryIcon;

  return (
    <li className={styles.card}>
      <span className={styles.iconArea} aria-hidden="true">
        <Icon className={styles.icon} focusable="false" />
        {SecondaryIcon && <SecondaryIcon className={styles.icon} focusable="false" />}
      </span>
      <span className={styles.name}>{skill.name}</span>
    </li>
  );
}
