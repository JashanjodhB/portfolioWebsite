/* eslint-disable react/prop-types */
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({ project: { title, description, skills, highlights, github } }) => {
  return (
    <article className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <ul className={styles.highlights}>
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <ul className={styles.skills}>
        {skills.map((skill) => {
          return (
            <li key={skill} className={styles.skill}>
              {skill}
            </li>
          );
        })}
      </ul>

      <div className={styles.links}>
        <a
          target="_blank"
          rel="noreferrer"
          href={github}
          className={`${styles.link} linkBox linkBoxSolid linkBoxArrow`}
        >
          View on GitHub
        </a>
      </div>
    </article>
  );
};
