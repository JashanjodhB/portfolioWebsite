import { ChapterLayout } from "../ChapterLayout/ChapterLayout";
import styles from "./Work.module.css";

export function Work() {
  return (
    <ChapterLayout chapterNum="II" title="Work">
      <div className={styles.body}>

        <div className={styles.entry}>
          <img src="/Plains.jpg" alt="Plains All American" className={styles.entryImg} />
          <div className={styles.entryText}>
            <h2 className={styles.company}>
              <a href="https://www.plains.com" target="_blank" rel="noreferrer">Plains All American</a>
            </h2>
            <p className={styles.role}>Data Engineering Intern</p>
            <p>
              I am currently working as a Data Engineering Intern at Plains All American.
              I have been involved in building data pipelines, optimizing apps, implementing features for internal tools, and exploring new technologies.
            </p>
          </div>
        </div>

        <div className={styles.entry}>
          <img src="/aggies.jpg" alt="AGGIES Lab" className={styles.entryImg} />
          <div className={styles.entryText}>
            <h2 className={styles.company}>
              <a href="https://www.aggieslab.org" target="_blank" rel="noreferrer">AGGIES Lab</a>
            </h2>
            <p className={styles.role}>Undergraduate Researcher</p>
            <p>
              I have been a part of the cybersecurity-oriented AGGIES Lab at Texas A&M University since my freshman year.
              As a part of the lab, I co-authored a <a href="https://papers.academic-conferences.org/index.php/iccws/article/view/4521" target="_blank" rel="noreferrer">research paper</a> on
              the security of Small Modular Nuclear Reactors, accepted to the proceedings of the 21st ICCWS conference.
            </p>
          </div>
        </div>

      </div>
    </ChapterLayout>
  );
}
