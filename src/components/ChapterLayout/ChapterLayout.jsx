import { ChapterFooter } from "../ChapterFooter/ChapterFooter";
import styles from "./ChapterLayout.module.css";

export function ChapterLayout({ chapterNum, title, children }) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.chapterLabel}>Chapter {chapterNum}</span>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.rule} />
        </header>

        <div className={styles.body}>
          {children}
        </div>

        <ChapterFooter />
      </div>
    </div>
  );
}
