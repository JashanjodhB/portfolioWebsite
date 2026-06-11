import { useNavigation } from "../../context/NavigationContext";
import { useTheme } from "../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faTerminal } from "@fortawesome/free-solid-svg-icons";
import styles from "./Landing.module.css";

const CHAPTERS = [
  { num: "I",   label: "About",    page: "about" },
  { num: "II",  label: "Work", page: "work" },
  { num: "III", label: "Portfolio",     page: "portfolio" },
  { num: "IV",  label: "Contact",  page: "contact" },
];

export function Landing() {
  const { goTo } = useNavigation();
  const { theme, toggleTheme } = useTheme();

  return (
    <section className={styles.landing}>
      <div className={styles.page}>
        <h1 className={styles.title}>Jashanjodh Bajwa</h1>
        <div className={styles.divider} />

        <p className={styles.tocHeader}>Table of Contents</p>
        <ol className={styles.tocList}>
          {CHAPTERS.map((ch) => (
            <li key={ch.num} className={styles.tocItem}>
              <button
                className={styles.tocBtn}
                onClick={() => goTo(ch.page)}
              >
                <span className={styles.chapterNum}>{ch.num}.</span>
                <span className={styles.chapterTitle}>{ch.label}</span>
                <span className={styles.leaders} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.divider} />

        <div className={styles.controls}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
          </button>
          <button
            className={styles.themeToggle}
            onClick={() => goTo("terminal")}
            aria-label="Switch to terminal view"
          >
            <FontAwesomeIcon icon={faTerminal} />
          </button>
        </div>
      </div>
    </section>
  );
}
