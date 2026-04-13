import { useEffect, useRef } from "react";
import styles from "./StarforgeVisual.module.css";

const shards = [
  { x: "13%", y: "18%", width: "60px", angle: "-28deg", driftX: "18px", driftY: "-12px" },
  { x: "76%", y: "16%", width: "54px", angle: "34deg", driftX: "-16px", driftY: "14px" },
  { x: "83%", y: "58%", width: "44px", angle: "-56deg", driftX: "-12px", driftY: "-16px" },
  { x: "18%", y: "72%", width: "58px", angle: "26deg", driftX: "14px", driftY: "10px" },
  { x: "8%", y: "48%", width: "34px", angle: "-6deg", driftX: "12px", driftY: "-8px" },
  { x: "84%", y: "44%", width: "34px", angle: "10deg", driftX: "-10px", driftY: "8px" },
  { x: "48%", y: "9%", width: "30px", angle: "72deg", driftX: "8px", driftY: "14px" },
  { x: "50%", y: "84%", width: "42px", angle: "-78deg", driftX: "-8px", driftY: "-12px" },
];

const dustClouds = [
  { x: "22%", y: "22%", size: "100px", driftX: "26px", driftY: "-18px" },
  { x: "70%", y: "24%", size: "88px", driftX: "-24px", driftY: "18px" },
  { x: "18%", y: "66%", size: "74px", driftX: "20px", driftY: "-18px" },
  { x: "72%", y: "70%", size: "68px", driftX: "-16px", driftY: "18px" },
];

const sparks = [
  { x: "26%", y: "14%", delay: "0s" },
  { x: "62%", y: "20%", delay: "1.6s" },
  { x: "80%", y: "34%", delay: "0.9s" },
  { x: "32%", y: "54%", delay: "2.1s" },
  { x: "18%", y: "78%", delay: "0.7s" },
  { x: "74%", y: "74%", delay: "1.3s" },
  { x: "54%", y: "86%", delay: "2.7s" },
];

export const StarforgeVisual = () => {
  const cardRef = useRef(null);
  const rafRef = useRef(0);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const animatePointer = () => {
    const card = cardRef.current;

    if (!card) {
      rafRef.current = 0;
      return;
    }

    const current = currentRef.current;
    const target = targetRef.current;

    current.x += (target.x - current.x) * 0.12;
    current.y += (target.y - current.y) * 0.12;

    card.style.setProperty("--pointer-x", current.x.toFixed(4));
    card.style.setProperty("--pointer-y", current.y.toFixed(4));

    if (Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001) {
      rafRef.current = 0;
      return;
    }

    rafRef.current = requestAnimationFrame(animatePointer);
  };

  const scheduleAnimation = () => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animatePointer);
    }
  };

  const handlePointerMove = (event) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    targetRef.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };

    scheduleAnimation();
  };

  const handlePointerLeave = () => {
    targetRef.current = { x: 0, y: 0 };
    scheduleAnimation();
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.backdropLayer}>
        <div className={styles.nebula} />
        <div className={styles.grid} />
        <div className={styles.scanSweep} />
        <div className={styles.vignette} />
      </div>

      <div className={styles.frameLayer}>
        <span className={`${styles.corner} ${styles.cornerTl}`} />
        <span className={`${styles.corner} ${styles.cornerTr}`} />
        <span className={`${styles.corner} ${styles.cornerBr}`} />
        <span className={`${styles.corner} ${styles.cornerBl}`} />
        <span className={styles.frameBandTop} />
        <span className={styles.frameBandBottom} />
      </div>

      <div className={styles.assemblyLayer}>
        <span className={`${styles.ring} ${styles.ringA}`} />
        <span className={`${styles.ring} ${styles.ringB}`} />
        <span className={`${styles.ring} ${styles.ringC}`} />
        <span className={`${styles.ring} ${styles.ringD}`} />

        <span className={`${styles.beam} ${styles.beamA}`} />
        <span className={`${styles.beam} ${styles.beamB}`} />
        <span className={`${styles.beam} ${styles.beamC}`} />
        <span className={`${styles.beam} ${styles.beamD}`} />

        <svg className={styles.sigil} viewBox="0 0 240 240" preserveAspectRatio="xMidYMid meet">
          <circle cx="120" cy="120" r="88" />
          <circle cx="120" cy="120" r="54" />
          <path d="M120 42 L142 98 L198 120 L142 142 L120 198 L98 142 L42 120 L98 98 Z" />
          <path d="M120 68 L132 108 L172 120 L132 132 L120 172 L108 132 L68 120 L108 108 Z" />
        </svg>

        <div className={styles.core}>
          <span className={styles.coreHalo} />
          <span className={styles.coreShell} />
          <span className={styles.corePulse} />
          <span className={styles.coreSpec} />
        </div>
      </div>

      <div className={styles.particlesLayer}>
        {shards.map((shard) => (
          <span
            key={`${shard.x}-${shard.y}-${shard.angle}`}
            className={styles.shard}
            style={{
              "--x": shard.x,
              "--y": shard.y,
              "--w": shard.width,
              "--angle": shard.angle,
              "--drift-x": shard.driftX,
              "--drift-y": shard.driftY,
            }}
          />
        ))}

        {dustClouds.map((cloud) => (
          <span
            key={`${cloud.x}-${cloud.y}-${cloud.size}`}
            className={styles.dust}
            style={{
              "--x": cloud.x,
              "--y": cloud.y,
              "--size": cloud.size,
              "--drift-x": cloud.driftX,
              "--drift-y": cloud.driftY,
            }}
          />
        ))}

        {sparks.map((spark) => (
          <span
            key={`${spark.x}-${spark.y}`}
            className={styles.spark}
            style={{
              "--x": spark.x,
              "--y": spark.y,
              "--delay": spark.delay,
            }}
          />
        ))}
      </div>

      <div className={styles.edgeGlow} />
    </div>
  );
};
