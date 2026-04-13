import styles from "./Leadership.module.css";
import { funFacts, serviceItems } from "../../data/profile";

export const Leadership = () => {
  return (
    <section className={styles.container} id="leadership">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Leadership & Service</p>
        <h2 className={styles.title}>I like contributing in ways that outlast the task itself.</h2>
      </div>

      <div className={styles.grid}>
        {serviceItems.map((item) => (
          <article key={item.title} className={styles.serviceCard}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <article className={styles.personalCard}>
        <div className={styles.personalCopy}>
          <p className={styles.eyebrow}>Outside The Work</p>
          <h3>The human side matters too.</h3>
          <ul>
            {funFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};
