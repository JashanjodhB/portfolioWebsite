import { useNavigation, PAGES } from "../../context/NavigationContext";
import styles from "./PageFold.module.css";

const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

export function PageFold() {
  const { goNext, goPrev, hasNext, hasPrev, currentPage, currentIndex } = useNavigation();

  const nextPage = capitalize(PAGES[currentIndex + 1]);
  const prevPage = capitalize(PAGES[currentIndex - 1]);

  if (currentPage === "terminal") return null;

  return (
    <nav className={styles.nav}>
      <div className={styles.slot}>
        {hasPrev && currentPage !== "landing" && (
          <button className={styles.btn} onClick={goPrev}>
            <span className={styles.arrow}>‹</span>
            <span className={styles.label}>{prevPage}</span>
          </button>
        )}
      </div>
      <div className={`${styles.slot} ${styles.slotRight}`}>
        {hasNext && (
          <button className={styles.btn} onClick={goNext}>
            <span className={styles.label}>{nextPage}</span>
            <span className={styles.arrow}>›</span>
          </button>
        )}
      </div>
    </nav>
  );
}
