import { ChapterLayout } from "../ChapterLayout/ChapterLayout";
import styles from "./About.module.css";

export function About() {
  return (
    <ChapterLayout chapterNum="I" title="About">
      <div className={styles.body}>

        <div className={styles.bioSection}>
          <p>
            <img
              src="/aboutImage.png"
              alt="Jashanjodh Bajwa"
              className={styles.portrait}
            />
            Hi! I'm Jashanjodh Bajwa and I am a student at Texas A&M University. I am majoring in Computer Science with minors in Cybersecurity and Mathematics.</p>
          <p>Throughout the years I have built several projects that address some challenge or curiosity.
            Some of these projects include <a href="https://github.com/JashanjodhB/Network-Intrusion-Detector">Network Intrusion Detector</a>,{" "}
            <a href="https://github.com/JashanjodhB/SmartShot">SmartShot</a>, and{" "}
            <a href="https://github.com/JashanjodhB/wsbPredictionAccuracy">Reddit Sentiment Analyzer</a>.
          </p>
          <p>
            In addition to my projects, I have had the opportunity to work as a Data Engineering Intern at{" "}
            <a href="https://www.plains.com/">Plains All American Pipeline</a>{" "}
            and as an undergraduate researcher at{" "}
            <a href="https://www.tamu.edu/">Texas A&M University</a>.
          </p>
          <p>
            I am passionate about learning and solving problems, and I am always looking for new opportunities to grow and develop my skills.
            I am excited to see where my journey in computer science takes me!
          </p>
          <p>
            In my free time, I enjoy reading sci-fi and fantasy books, playing video games, and binging TV shows.
          </p>
        </div>

        <div className={styles.listSection}>
          <h2>Reading Queue</h2>
          <ul>
            <li><a href="https://www.goodreads.com/book/show/41886271-the-sword-of-kaigen" target="_blank" rel="noreferrer">The Sword of Kaigen</a></li>
            <li><a href="https://www.goodreads.com/book/show/77566.Hyperion" target="_blank" rel="noreferrer">Hyperion</a></li>
            <li><a href="https://www.goodreads.com/en/book/show/36454667-empire-of-silence" target="_blank" rel="noreferrer">Empire of Silence</a></li>
            <li><a href="https://www.goodreads.com/series/309211-dungeon-crawler-carl">Dungeon Crawler Carl</a></li>
          </ul>
        </div>

        <div className={styles.listSection}>
          <h2>Reading Leaderboard</h2>
          <ol>
            <li><a href="https://www.goodreads.com/en/book/show/29226553-dark-age" target="_blank" rel="noreferrer">Dark Age</a></li>
            <li><a href="https://www.goodreads.com/en/book/show/44767458-dune" target="_blank" rel="noreferrer">Dune</a></li>
            <li><a href="https://www.goodreads.com/en/book/show/34002132-oathbringer" target="_blank" rel="noreferrer">Oathbringer</a></li>
            <li><a href="https://www.goodreads.com/book/show/68428.Mistborn" target="_blank" rel="noreferrer">The Final Empire</a></li>
            <li><a href="https://www.goodreads.com/en/book/show/23947089-the-lost-metal" target="_blank" rel="noreferrer">The Lost Metal</a></li>
          </ol>
        </div>

      </div>
    </ChapterLayout>
  );
}
