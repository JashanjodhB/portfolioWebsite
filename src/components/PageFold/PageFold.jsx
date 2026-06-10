import { useNavigation } from "../../context/NavigationContext";
import styles from "./PageFold.module.css";

export function PageFold() {
  const { goNext, goPrev, hasNext, hasPrev, currentPage } = useNavigation();

  return (
    <>
      {hasNext && (
        <button
          className={styles.foldNext}
          onClick={goNext}
          aria-label="Next page"
        />
      )}
      {hasPrev && currentPage !== "landing" && (
        <button
          className={styles.foldPrev}
          onClick={goPrev}
          aria-label="Previous page"
        />
      )}
    </>
  );
}
