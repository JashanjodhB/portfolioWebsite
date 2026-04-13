import { useEffect, useRef } from "react";
import styles from "./CosmicBackground.module.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, factor) => start + (end - start) * factor;
const randomBetween = (min, max) => min + Math.random() * (max - min);

const makeStars = (count, width, worldHeight, config) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    worldY: Math.random() * worldHeight,
    size: randomBetween(config.minSize, config.maxSize),
    alpha: randomBetween(config.minAlpha, config.maxAlpha),
    twinkle: randomBetween(0.05, 0.18),
    parallax: randomBetween(config.minParallax, config.maxParallax),
    drift: randomBetween(2, 14),
    seed: Math.random() * Math.PI * 2,
    color: config.color,
  }));

const makeNebulas = (height) => [
  { x: 0.18, worldY: height * 0.12, radius: 0.34, color: "116,0,184", alpha: 0.2, parallax: 0.1 },
  { x: 0.78, worldY: height * 0.72, radius: 0.3, color: "72,191,227", alpha: 0.18, parallax: 0.16 },
  { x: 0.28, worldY: height * 1.45, radius: 0.38, color: "100,223,223", alpha: 0.18, parallax: 0.22 },
  { x: 0.74, worldY: height * 2.25, radius: 0.42, color: "83,144,217", alpha: 0.22, parallax: 0.3 },
];

const makeConstellations = (height) => [
  {
    worldY: height * 0.95,
    alpha: 0.22,
    points: [
      [0.2, 0.16],
      [0.27, 0.22],
      [0.34, 0.14],
      [0.42, 0.2],
      [0.5, 0.1],
    ],
  },
  {
    worldY: height * 1.85,
    alpha: 0.18,
    points: [
      [0.62, 0.32],
      [0.69, 0.22],
      [0.76, 0.28],
      [0.83, 0.2],
      [0.9, 0.34],
    ],
  },
];

const makeOrbitRings = (height) => [
  { x: 0.78, worldY: height * 0.42, radius: 180, alpha: 0.12, parallax: 0.08 },
  { x: 0.24, worldY: height * 1.62, radius: 210, alpha: 0.1, parallax: 0.18 },
  { x: 0.82, worldY: height * 2.45, radius: 160, alpha: 0.12, parallax: 0.26 },
];

const TRAIL_COUNT = 7;

export const CosmicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });

    if (!canvas || !ctx) {
      return undefined;
    }

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrame = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let documentHeight = 0;
    let targetScroll = window.scrollY;
    let smoothScroll = window.scrollY;
    let scene = {
      farStars: [],
      midStars: [],
      nearStars: [],
      nebulas: [],
      constellations: [],
      orbitRings: [],
    };

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
    };

    let trail = Array.from({ length: TRAIL_COUNT }, () => ({
      x: pointer.x,
      y: pointer.y,
    }));

    const buildScene = () => {
      const areaFactor = clamp((width * height) / 900000, 0.7, 1.5);
      const screenFactor = clamp(documentHeight / Math.max(height, 1), 1, 4);

      scene = {
        farStars: makeStars(Math.round(90 * areaFactor * screenFactor), width, documentHeight, {
          minSize: 0.7,
          maxSize: 1.8,
          minAlpha: 0.22,
          maxAlpha: 0.65,
          minParallax: 0.2,
          maxParallax: 0.45,
          color: "255,255,255",
        }),
        midStars: makeStars(Math.round(50 * areaFactor * screenFactor), width, documentHeight, {
          minSize: 1,
          maxSize: 2.4,
          minAlpha: 0.25,
          maxAlpha: 0.8,
          minParallax: 0.35,
          maxParallax: 0.7,
          color: "128,255,219",
        }),
        nearStars: makeStars(Math.round(18 * areaFactor * screenFactor), width, documentHeight, {
          minSize: 1.5,
          maxSize: 3.2,
          minAlpha: 0.28,
          maxAlpha: 0.95,
          minParallax: 0.65,
          maxParallax: 1,
          color: "255,221,170",
        }),
        nebulas: makeNebulas(height),
        constellations: makeConstellations(height),
        orbitRings: makeOrbitRings(height),
      };
    };

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      documentHeight = Math.max(document.documentElement.scrollHeight, height * 3);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
      trail = Array.from({ length: TRAIL_COUNT }, () => ({
        x: pointer.x,
        y: pointer.y,
      }));
    };

    const drawBackgroundWash = (progress) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#030713");
      gradient.addColorStop(0.5, progress > 0.33 ? "#081229" : "#071022");
      gradient.addColorStop(1, progress > 0.66 ? "#091933" : "#08142d");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.globalAlpha = 0.22;
      ctx.fillStyle = "#081628";
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
    };

    const drawNebula = (nebula, time) => {
      const screenY = nebula.worldY - smoothScroll * nebula.parallax;

      if (screenY < -height * 0.7 || screenY > height * 1.7) {
        return;
      }

      const x = width * nebula.x + Math.sin(time * 0.00018 + nebula.x * 10) * width * 0.03;
      const radius = Math.min(width, height) * nebula.radius;
      const gradient = ctx.createRadialGradient(x, screenY, radius * 0.12, x, screenY, radius);

      gradient.addColorStop(0, `rgba(${nebula.color}, ${nebula.alpha})`);
      gradient.addColorStop(0.55, `rgba(${nebula.color}, ${nebula.alpha * 0.45})`);
      gradient.addColorStop(1, `rgba(${nebula.color}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, screenY - radius, radius * 2, radius * 2);
    };

    const drawStars = (stars, time, mouseX, mouseY, cross = false) => {
      stars.forEach((star) => {
        const screenY = star.worldY - smoothScroll * star.parallax;

        if (screenY < -20 || screenY > height + 20) {
          return;
        }

        const screenX =
          star.x +
          mouseX * star.parallax * 16 +
          Math.sin(time * 0.0005 + star.seed) * star.drift +
          mouseY * star.parallax * 4;
        const alpha = clamp(
          star.alpha + Math.sin(time * 0.0014 + star.seed) * star.twinkle,
          0.06,
          1,
        );

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgba(${star.color}, 1)`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (cross) {
          ctx.strokeStyle = `rgba(${star.color}, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(screenX - star.size * 2.2, screenY);
          ctx.lineTo(screenX + star.size * 2.2, screenY);
          ctx.moveTo(screenX, screenY - star.size * 2.2);
          ctx.lineTo(screenX, screenY + star.size * 2.2);
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
    };

    const drawConstellations = () => {
      scene.constellations.forEach((group) => {
        const screenPoints = group.points.map(([x, y]) => ({
          x: x * width,
          y: group.worldY + y * height * 0.22 - smoothScroll * 0.52,
        }));

        const visible = screenPoints.some((point) => point.y > -40 && point.y < height + 40);

        if (!visible) {
          return;
        }

        ctx.strokeStyle = `rgba(210, 235, 255, ${group.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        screenPoints.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
            return;
          }
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        screenPoints.forEach((point) => {
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.beginPath();
          ctx.arc(point.x, point.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    };

    const drawOrbitRings = (time) => {
      scene.orbitRings.forEach((ring, index) => {
        const y = ring.worldY - smoothScroll * ring.parallax;

        if (y < -ring.radius || y > height + ring.radius) {
          return;
        }

        const x = width * ring.x + Math.sin(time * 0.00016 + index) * 18;
        ctx.strokeStyle = `rgba(128,255,219,${ring.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, ring.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(94,96,206,${ring.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, ring.radius * 0.68, 0, Math.PI * 2);
        ctx.stroke();
      });
    };

    const drawComets = (time, progress) => {
      const cometConfigs = [
        { speed: 0.00007, offset: 0.12, y: 0.18, span: 0.34, opacity: 0.34 + progress * 0.1 },
        { speed: 0.00005, offset: 0.58, y: 0.52, span: 0.28, opacity: 0.24 + progress * 0.16 },
      ];

      cometConfigs.forEach((comet) => {
        const travel = ((time * comet.speed + comet.offset) % 1.28) - 0.14;

        if (travel < 0 || travel > 1) {
          return;
        }

        const x = lerp(-width * 0.22, width * 1.18, travel);
        const y = lerp(height * comet.y, height * (comet.y - comet.span), travel);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-0.42);
        ctx.globalAlpha = comet.opacity;
        const gradient = ctx.createLinearGradient(-70, 0, 0, 0);
        gradient.addColorStop(0, "rgba(255,255,255,0)");
        gradient.addColorStop(0.7, "rgba(255,255,255,0.8)");
        gradient.addColorStop(1, "rgba(255,248,210,1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(-70, -1.5, 70, 3);
        ctx.beginPath();
        ctx.arc(0, 0, 3.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,248,210,0.95)";
        ctx.fill();
        ctx.restore();
        ctx.globalAlpha = 1;
      });
    };

    const drawCursorTrail = () => {
      if (isCoarsePointer) {
        return;
      }

      const targetX = pointer.active ? pointer.x : width * 0.5;
      const targetY = pointer.active ? pointer.y : height * 0.45;

      trail[0].x += (targetX - trail[0].x) * 0.36;
      trail[0].y += (targetY - trail[0].y) * 0.36;

      for (let index = 1; index < trail.length; index += 1) {
        trail[index].x += (trail[index - 1].x - trail[index].x) * 0.36;
        trail[index].y += (trail[index - 1].y - trail[index].y) * 0.36;
      }

      for (let index = trail.length - 1; index >= 0; index -= 1) {
        const point = trail[index];
        const target = trail[index - 1] ?? { x: targetX, y: targetY };
        const angle = Math.atan2(target.y - point.y, target.x - point.x);
        const length = 24 - index * 2.4;
        const opacity = clamp(0.62 - index * 0.08, 0.08, 0.62);

        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.rotate(angle);
        ctx.globalAlpha = opacity;
        const gradient = ctx.createLinearGradient(-length, 0, 0, 0);
        gradient.addColorStop(0, "rgba(255,255,255,0)");
        gradient.addColorStop(0.72, "rgba(255,245,204,0.78)");
        gradient.addColorStop(1, "rgba(255,184,108,1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(-length, -1.2, length, 2.4);
        ctx.beginPath();
        ctx.arc(0, 0, 2.2 - index * 0.14, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,248,210,0.95)";
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
    };

    const drawVignette = () => {
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        height * 0.12,
        width * 0.5,
        height * 0.5,
        width * 0.85,
      );
      vignette.addColorStop(0, "rgba(3,7,19,0)");
      vignette.addColorStop(1, "rgba(3,7,19,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const render = (time = 0) => {
      if (!prefersReducedMotion) {
        smoothScroll = lerp(smoothScroll, targetScroll, 0.08);
      } else {
        smoothScroll = targetScroll;
      }

      const progress = clamp(smoothScroll / Math.max(documentHeight - height, 1), 0, 1);
      const mouseX = (pointer.x / Math.max(width, 1) - 0.5) * 2;
      const mouseY = (pointer.y / Math.max(height, 1) - 0.5) * 2;

      drawBackgroundWash(progress);
      scene.nebulas.forEach((nebula) => drawNebula(nebula, time));
      drawStars(scene.farStars, time, mouseX * 0.5, mouseY * 0.4);
      drawStars(scene.midStars, time, mouseX * 0.8, mouseY * 0.55);
      drawConstellations();
      drawOrbitRings(time);
      drawComets(time, progress);
      drawStars(scene.nearStars, time, mouseX * 1.1, mouseY * 0.8, true);
      drawCursorTrail();
      drawVignette();

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
      documentHeight = Math.max(document.documentElement.scrollHeight, height * 3);

      if (prefersReducedMotion) {
        render();
      }
    };

    const handleResize = () => {
      resizeCanvas();

      if (prefersReducedMotion) {
        render();
      }
    };

    resizeCanvas();
    render();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.matte} />
    </div>
  );
};
