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
      "Built a 2,000-line, dependency-free Win32 application in C++17 to work around OneNote's native PDF export, which produced duplicated pages, shrunken text, and cut-off lines that left homework and notes unsubmittable.",
      "Captures regions, windows, and virtual desktops through a dimmed frozen-frame overlay, with a PDF writer and PNG stream encoder written from scratch and covered by CTest.",
      "Added a multithreaded Winsock HTTP server with per-request token authentication and a bounded connection pool, built with CMake and Visual Studio.",
      "Diagnosed a production outage caused by Chrome/Edge 142+ Local Network Access policy changes that blocked loopback connections from Office iframes, then redesigned the transport layer around policy-exempt user-gesture channels after weeks of silent failures with no actionable error output.",
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
  {
    title: "Restaurant POS & Analytics Platform",
    bullets: [
      "Built a full-stack restaurant point-of-sale and analytics platform in Java and JavaScript as part of a five-person Agile team, delivered across three sprints tracked with GitHub Projects.",
      "Built a REST API layer using Express with 12 route modules, session middleware, and a centralized error handler backed by a PostgreSQL connection pool, serving a React 18 front end.",
      "Integrated a Gemini API assistant to answer natural-language questions against live menu, inventory, and recipe tables.",
    ],
  },
  {
    title: "Internship Alert System",
    bullets: [
      "Built a self-hosted job-posting monitor in Python that runs as a long-lived Linux daemon on a dedicated Ubuntu server.",
      "Polls sources on a schedule, deduplicates results in SQLite, and pushes Discord alerts.",
      "Serves a FastAPI backend and HTMX dashboard, packaged with Docker and reached over a private Tailscale network, keeping it off the public internet while staying remotely administrable.",
    ],
  },
  {
    title: "Parallel Wikipedia Search Engine",
    bullets: [
      "Built a multithreaded substring-search engine in C reaching 1.4 GB/s scan throughput across a 28 GB corpus, partitioning work across all available cores.",
      "Designed a producer-consumer pipeline using synchronized work queues and semaphores to overlap disk I/O with computation.",
      "Profiled and tuned buffered I/O and thread affinity to close the remaining throughput gaps.",
    ],
  },
];

const TECH = [
  { heading: "Languages",          items: "Python, Java, C++, TypeScript, JavaScript, HTML/CSS, SQL" },
  { heading: "Frameworks & Tools", items: "React, Node.js/Express, Flask, FastAPI, Streamlit, Qt, PostgreSQL, Scikit-learn, PyTorch, TensorFlow, Hugging Face, VADER" },
  { heading: "Platforms",          items: "GitHub, Git, Azure, Azure DevOps, Databricks, Docker, Jupyter" },
];

export function Portfolio() {
  return (
    <ChapterLayout chapterNum="III" title="Portfolio">
      <div className={styles.body}>

        <section className={styles.projectsSection}>
          {PROJECTS.map((p) => (
            <div key={p.title} className={styles.project}>
              {p.img && <img src={p.img} alt={p.alt} className={styles.screenshot} />}
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>
                  {p.href
                    ? <a href={p.href} target="_blank" rel="noreferrer">{p.title}</a>
                    : p.title}
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
