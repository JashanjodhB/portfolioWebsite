import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSun, faMoon, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "../../context/NavigationContext";
import styles from "./ChapterFooter.module.css";

const SOCIAL = [
  { icon: faGithub,   label: "GitHub",   href: "https://github.com/JashanjodhB" },
  { icon: faLinkedin, label: "LinkedIn",  href: "https://www.linkedin.com/in/jashanjodh-bajwa/" },
  { icon: faEnvelope, label: "Email",     href: "mailto:jashanjodhb@gmail.com" },
];

const CHAPTERS = [
  { num: "I",   label: "About",    page: "about" },
  { num: "II",  label: "Work", page: "work" },
  { num: "III", label: "Portfolio",     page: "portfolio" },
  { num: "IV",  label: "Contact",  page: "contact" },
];

export function ChapterFooter() {
  const { theme, toggleTheme } = useTheme();
  const { goTo, currentPage } = useNavigation();

  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />

      <div className={styles.socialRow}>
        {SOCIAL.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            aria-label={label}
          >
            <FontAwesomeIcon icon={icon} />
            <span>{label}</span>
          </a>
        ))}
      </div>

      <div className={styles.controlsRow}>
        <button className={styles.ctrlBtn} onClick={toggleTheme} aria-label="Toggle theme">
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button className={styles.ctrlBtn} onClick={() => goTo("landing")} aria-label="Back to contents">
          <FontAwesomeIcon icon={faHouse} />
          <span>Contents</span>
        </button>
      </div>

      <div className={styles.tocRow}>
        {CHAPTERS.map((ch) => (
          <button
            key={ch.num}
            className={`${styles.tocEntry} ${currentPage === ch.page ? styles.tocActive : ""}`}
            onClick={() => goTo(ch.page)}
          >
            <span className={styles.tocNum}>{ch.num}.</span>
            <span>{ch.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
}
