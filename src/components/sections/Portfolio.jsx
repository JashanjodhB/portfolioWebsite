import { ChapterLayout } from "../ChapterLayout/ChapterLayout";
import styles from "./Portfolio.module.css";

const PROJECTS = [
  {
    img: "/network.png",
    alt: "Network Intrusion Detection System screenshot",
    title: "Network Intrusion Detection System",
    href: "https://github.com/JashanjodhB/Network-Intrusion-Detector",
    bullets: [
      "Built an end-to-end intrusion detection pipeline using UNSW-NB15, PostgreSQL, and an ETL workflow for feature engineering.",
      "Trained and evaluated Random Forest and Neural Network models, achieving over 90% detection accuracy with improved malicious traffic recall.",
      "Logged model metrics to PostgreSQL and built Streamlit dashboards for performance and metrics.",
    ],
  },
  {
    img: "/smart.png",
    alt: "SmartShot screenshot",
    title: "SmartShot",
    href: "https://github.com/JashanjodhB/SmartShot",
    bullets: [
      "Developing a cross-platform application in C++ to create a better school workflow.",
      "Used Qt to create UI, process screenshots, and convert to PDF.",
      "Connected C++ to OneNote AddIn API using local server and TCP protocols.",
      "Decreased processing time of homework submissions by 90%.",
    ],
  },
  {
    img: "/reddit.png",
    alt: "Reddit Sentiment Analyzer screenshot",
    title: "Reddit Sentiment Analyzer",
    href: "https://github.com/JashanjodhB/wsbPredictionAccuracy",
    bullets: [
      "Built a full data pipeline that scrapes daily WallStreetBets comments, cleans text, and applies VADER sentiment analysis.",
      "Integrated one year of S&P 500 historical data to compare daily WSB sentiment with next-day index returns.",
      "Produced visual analytics including a dual-axis sentiment vs. market chart and multi-panel accuracy report.",
    ],
  },
];

const TECH = [
  { heading: "Languages",          items: "Python, Java, C++, JavaScript, HTML/CSS, SQL" },
  { heading: "Frameworks & Tools", items: "React, Streamlit, Qt, PostgreSQL, Scikit-learn, TensorFlow, VADER" },
  { heading: "Platforms",          items: "GitHub, Azure, Databricks, Jupyter" },
];

export function Portfolio() {
  return (
    <ChapterLayout chapterNum="III" title="Portfolio">
      <div className={styles.body}>

        <section className={styles.projectsSection}>
          {PROJECTS.map((p) => (
            <div key={p.title} className={styles.project}>
              <img src={p.img} alt={p.alt} className={styles.screenshot} />
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>
                  <a href={p.href} target="_blank" rel="noreferrer">{p.title}</a>
                </h3>
                <ul className={styles.bullets}>
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.techSection}>
          <h2 className={styles.techHeading}>Tech Stack</h2>
          <div className={styles.techGrid}>
            {TECH.map((t) => (
              <div key={t.heading} className={styles.techGroup}>
                <p className={styles.techLabel}>{t.heading}</p>
                <p className={styles.techItems}>{t.items}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </ChapterLayout>
  );
}
