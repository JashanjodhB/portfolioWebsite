import styles from "./About.module.css";
import { faCodeBranch, faGlobe, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { personalHighlights } from "../../data/profile";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>About Me</p>
        <h2 className={styles.title}>Research-driven engineering, built to ship.</h2>

        <div className={styles.items}>
          <article className={styles.item}>
            <FontAwesomeIcon icon={faGraduationCap} className={styles.icon} />
            <div>
              <h3>{personalHighlights[0].title}</h3>
              <p>{personalHighlights[0].description}</p>
            </div>
          </article>

          <article className={styles.item}>
            <FontAwesomeIcon icon={faCodeBranch} className={styles.icon} />
            <div>
              <h3>{personalHighlights[1].title}</h3>
              <p>{personalHighlights[1].description}</p>
            </div>
          </article>

          <article className={styles.item}>
            <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
            <div>
              <h3>{personalHighlights[2].title}</h3>
              <p>{personalHighlights[2].description}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
