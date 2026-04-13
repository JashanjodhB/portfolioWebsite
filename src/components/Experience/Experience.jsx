import styles from "./Experience.module.css";
import {
  educationHighlights,
  experienceHighlights,
  researchHighlights,
  techGroups,
} from "../../data/profile";

export const Experience = () => {
  return (
    <section className={styles.container} id="research">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Research & Qualifications</p>
        <h2 className={styles.title}>Research, fundamentals, and shipped work.</h2>
        <p className={styles.description}>
          At Texas A&amp;M&apos;s{" "}
          <a
            className="textLink"
            href="https://www.aggieslab.org/"
            target="_blank"
            rel="noreferrer"
          >
            AGGIES Lab
          </a>
          , I work on cybersecurity problems tied to infrastructure risk, software analysis, and
          implementation.
        </p>
        <div className={styles.actions}>
          <a
            className={`${styles.actionLink} linkBox linkBoxGhost linkBoxArrow`}
            href="https://scholar.google.com/citations?user=OPf2NFwAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Google Scholar
          </a>
          <a
            className={`${styles.actionLink} linkBox linkBoxGhost linkBoxArrow`}
            href="https://papers.academic-conferences.org/index.php/iccws/article/view/4521"
            target="_blank"
            rel="noreferrer"
          >
            Research Paper
          </a>
        </div>
      </div>

      <div className={styles.topGrid}>
        <article className={styles.featureCard}>
          <span className={styles.cardLabel}>Experience</span>
          <h3>Highlights</h3>
          <ul className={styles.bulletList}>
            {experienceHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.stackCard}>
          <span className={styles.cardLabel}>Education</span>
          <h3>Education</h3>
          <ul className={styles.bulletList}>
            {educationHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className={styles.topGrid}>
        <article className={styles.featureCard}>
          <span className={styles.cardLabel}>Research</span>
          <h3>Research focus</h3>
          <ul className={styles.bulletList}>
            {researchHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.stackCard}>
          <span className={styles.cardLabel}>Toolbox</span>
          <h3>Stack</h3>
          <div className={styles.stackGroups}>
            {techGroups.map((group) => (
              <div key={group.title} className={styles.group}>
                <h3>{group.title}</h3>
                <div className={styles.tags}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
