import { useTheme } from "../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Portfolio",     href: "#portfolio" },
  { label: "Contact",  href: "#contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <a href="#landing" className={styles.logo}>JB</a>
      <ul className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className={styles.link}>{label}</a>
          </li>
        ))}
      </ul>
      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
      </button>
    </nav>
  );
}
