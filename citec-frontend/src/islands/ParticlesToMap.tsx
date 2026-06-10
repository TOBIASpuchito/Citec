import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Point = {
  x: number;
  y: number;
};

type Particle = {
  color: string;
  delay: number;
  from: Point;
  radius: number;
  to: Point;
};

const WIDTH = 640;
const HEIGHT = 560;
const DESKTOP_PARTICLE_COUNT = 360;
const MOBILE_PARTICLE_COUNT = 210;
const MAP_MASK_SRC = "/mask1.png";
const LOGO_MASK_SRC = "/mask2.png";
const MASK_DARK_THRESHOLD = 42;

function gradientColor(from: Point, to: Point) {
  const blend = Math.min(1, Math.max(0, ((from.x + to.x) / 2) / WIDTH));
  const pink = { r: 236, g: 72, b: 153 };
  const cyan = { r: 56, g: 189, b: 248 };
  const red = Math.round(pink.r + (cyan.r - pink.r) * blend);
  const green = Math.round(pink.g + (cyan.g - pink.g) * blend);
  const blue = Math.round(pink.b + (cyan.b - pink.b) * blend);

  return `rgba(${red}, ${green}, ${blue}, 0.82)`;
}

function loadMask(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`No se pudo cargar la mascara ${src}`));
    image.src = src;
  });
}

function drawImageContain(context: CanvasRenderingContext2D, image: HTMLImageElement) {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  const scale = Math.min(WIDTH / image.naturalWidth, HEIGHT / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const drawX = (WIDTH - drawWidth) / 2;
  const drawY = (HEIGHT - drawHeight) / 2;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function deterministicNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function deterministicJitter(x: number, y: number, amount: number) {
  return (deterministicNoise(x * 0.91 + y * 1.37) - 0.5) * amount;
}

function deterministicShuffle(points: Point[]) {
  return [...points].sort((a, b) => deterministicNoise(a.x * 0.037 + a.y * 0.071) - deterministicNoise(b.x * 0.037 + b.y * 0.071));
}

function normalizePoints(points: Point[], count: number) {
  if (!points.length) {
    return [];
  }

  if (points.length >= count) {
    const step = points.length / count;

    return Array.from({ length: count }, (_, index) => points[Math.floor(index * step)]);
  }

  const result = [...points];

  while (result.length < count) {
    result.push(points[result.length % points.length]);
  }

  return result;
}

function extractPointsFromMask(image: HTMLImageElement, count: number, spacing: number) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return [];
  }

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  drawImageContain(context, image);

  const data = context.getImageData(0, 0, WIDTH, HEIGHT).data;
  const points: Point[] = [];
  const jitterAmount = spacing * 0.2;

  for (let y = spacing; y < HEIGHT - spacing; y += spacing) {
    for (let x = spacing; x < WIDTH - spacing; x += spacing) {
      const pixelIndex = (Math.round(y) * WIDTH + Math.round(x)) * 4;
      const red = data[pixelIndex] ?? 255;
      const green = data[pixelIndex + 1] ?? 255;
      const blue = data[pixelIndex + 2] ?? 255;
      const alpha = data[pixelIndex + 3] ?? 255;
      const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;

      if (alpha > 12 && luminance <= MASK_DARK_THRESHOLD) {
        points.push({
          x: x + deterministicJitter(x, y, jitterAmount),
          y: y + deterministicJitter(y, x, jitterAmount),
        });
      }
    }
  }

  return normalizePoints(deterministicShuffle(points), count);
}

function buildParticles(from: Point[], to: Point[]) {
  const count = Math.min(from.length, to.length);

  return Array.from({ length: count }, (_, index) => ({
    color: gradientColor(from[index], to[index]),
    delay: deterministicNoise(index * 2.7) * 0.24,
    from: from[index],
    radius: index % 13 === 0 ? 5.4 : 4.1 + deterministicNoise(index) * 0.72,
    to: to[index],
  }));
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawParticles(context: CanvasRenderingContext2D, particles: Particle[], progress: number, pixelRatio: number) {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.globalCompositeOperation = "source-over";

  particles.forEach((particle, index) => {
    const localProgress = Math.min(1, Math.max(0, (progress - particle.delay) / 0.76));
    const eased = easeInOut(localProgress);
    const x = particle.from.x + (particle.to.x - particle.from.x) * eased;
    const y = particle.from.y + (particle.to.y - particle.from.y) * eased;
    const pulse = 0.88 + deterministicNoise(index * 0.41) * 0.22;

    context.beginPath();
    context.fillStyle = particle.color;
    context.arc(x, y, particle.radius * pulse * pixelRatio, 0, Math.PI * 2);
    context.fill();
  });
}

export default function ParticlesToMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    let cancelled = false;
    let timeline: gsap.core.Timeline | null = null;

    const canvasElement = canvas;

    async function initParticles() {
      const context = canvasElement.getContext("2d", { alpha: true });

      if (!context) {
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const particleCount = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
      const spacing = isMobile ? 20 : 15;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvasElement.width = WIDTH * pixelRatio;
      canvasElement.height = HEIGHT * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const [mapMask, logoMask] = await Promise.all([loadMask(MAP_MASK_SRC), loadMask(LOGO_MASK_SRC)]);

      if (cancelled) {
        return;
      }

      const from = extractPointsFromMask(mapMask, particleCount, spacing);
      const to = extractPointsFromMask(logoMask, particleCount, spacing);
      const particles = buildParticles(from, to);
      const state = { progress: 0 };

      drawParticles(context, particles, state.progress, 1);

      if (reducedMotion) {
        return;
      }

      timeline = gsap
        .timeline({ repeat: -1, repeatDelay: 1.4 })
        .to(state, {
          progress: 1,
          delay: 1.6,
          duration: 2.2,
          ease: "none",
          onUpdate: () => drawParticles(context, particles, state.progress, 1),
        })
        .to(state, {
          progress: 0,
          delay: 0.9,
          duration: 2.2,
          ease: "none",
          onUpdate: () => drawParticles(context, particles, state.progress, 1),
        });
    }

    initParticles();

    return () => {
      cancelled = true;
      timeline?.kill();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute right-[-10rem] top-1/2 h-[50rem] w-[64rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(98,199,217,0.2),rgba(119,112,201,0.12)_42%,transparent_70%)] blur-3xl max-lg:right-[-20rem] max-lg:opacity-55" />
      <div className="absolute right-[6rem] top-[72%] h-8 w-[26rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.28),rgba(56,189,248,0.16)_42%,transparent_72%)] blur-xl max-lg:right-[-3rem] max-lg:w-[20rem] max-lg:opacity-45 max-sm:right-[-2rem] max-sm:top-[82%] max-sm:h-6 max-sm:w-[16rem] max-sm:opacity-40" />
      <canvas
        ref={canvasRef}
        className="absolute right-[-7rem] top-1/2 h-auto w-[min(66vw,62rem)] -translate-y-1/2 opacity-95 max-lg:right-[-17rem] max-lg:w-[48rem] max-lg:opacity-35 max-sm:right-[-13rem] max-sm:top-[76%] max-sm:w-[34rem] max-sm:opacity-38"
        width={WIDTH}
        height={HEIGHT}
      />
    </div>
  );
}
