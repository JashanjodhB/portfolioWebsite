import styles from "./Hero.module.css";
import Typewriter from "../Typewriter";
import { StarforgeVisual } from "./StarforgeVisual";

export const Hero = () => {
  return (
    <section className={styles.container} id="top">
      <div className={styles.content}>
        <p className={styles.eyebrow}>Cybersecurity | Machine Learning | Full-Stack</p>
        <h1 className={styles.name}>
          <Typewriter text="Jashanjodh Bajwa" delay={45} />
        </h1>
        <p className={styles.description}>
          Texas A&amp;M Computer Science Honors Student with experience building security, ML,
          and software projects in Python, C++, and JAva.
        </p>

        <div className={styles.actions}>
          <a className={`${styles.primaryBtn} linkBox linkBoxSolid`} href="#projects">
            View Projects
          </a>
          <a
            className={`${styles.secondaryBtn} linkBox linkBoxGhost linkBoxArrow`}
            href="https://github.com/JashanjodhB"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className={styles.visualWrap}>
        <StarforgeVisual />
      </div>
    </section>
  );
};

