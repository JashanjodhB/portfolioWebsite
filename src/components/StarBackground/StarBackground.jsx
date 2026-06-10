import { useMemo } from "react";
import styles from "./StarBackground.module.css";

function generateStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    opacity: Math.random() * 0.6 + 0.3,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));
}

export function StarBackground() {
  const stars = useMemo(() => generateStars(180), []);

  return (
    <div className={styles.starField} aria-hidden="true">
      {stars.map((star, i) => (
        <span
          key={i}
          className={styles.star}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
