import { SkillCard } from "@/components/ui/skill-card";
import { skillCategories, type SkillCategory as SkillCategoryData } from "@/data/skills";
import styles from "./skills.module.css";

export function SkillCategory({ category }: { category: SkillCategoryData }) {
  const headingId = `skills-${category.id}`;

  return (
    <section className={styles.category} aria-labelledby={headingId}>
      <h3 id={headingId} className={styles.categoryTitle}>{category.name}</h3>
      {category.secondarySkills ? (
        <div className={styles.cardRows}>
          <ul className={styles.cards} aria-label={`${category.name} primary skills`}>
            {category.skills.map((skill) => <SkillCard key={skill.name} skill={skill} />)}
          </ul>
          <ul className={styles.secondaryRow} aria-label={`${category.name} additional skills`}>
            {category.secondarySkills.map((skill) => <SkillCard key={skill.name} skill={skill} />)}
          </ul>
        </div>
      ) : (
        <ul className={styles.cards}>
          {category.skills.map((skill) => <SkillCard key={skill.name} skill={skill} />)}
        </ul>
      )}
    </section>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className={styles.skills}
      aria-labelledby="skills-heading"
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Explore My</p>
        <h2 id="skills-heading" className={styles.title}>Skills</h2>
      </div>
      <div className={styles.categories}>
        {skillCategories.map((category) => (
          <SkillCategory key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
