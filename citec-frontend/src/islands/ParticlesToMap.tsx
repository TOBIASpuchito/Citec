import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Bounds = {
  height: number;
  width: number;
  x: number;
  y: number;
};

type Placement = {
  centerX: number;
  centerY: number;
  maxHeight: number;
  maxWidth: number;
};

type Point = {
  x: number;
  y: number;
};

type Particle = {
  color: string;
  delay: number;
  from: Point;
  fromAlpha: number;
  fromRadius: number;
  to: Point;
  toAlpha: number;
  toRadius: number;
};

const DESKTOP_CITEC_PARTICLE_COUNT = 3200;
const DESKTOP_MAP_PARTICLE_COUNT = 1200;
const MOBILE_PARTICLE_COUNT = 1050;
const CITEC_MASK_SRC = "/mask2.png";
const MAP_MASK_SRC = "/mask1.png";
const MASK_DARK_THRESHOLD = 96;
const CITEC_READ_SECONDS = 1;
const DESKTOP_MORPH_SECONDS = 1.7;
const MOBILE_MORPH_SECONDS = 1.35;
const COPY_REVEAL_DURATION = 0.6;
const COPY_REVEAL_STAGGER = 0.05;
const COPY_REVEAL_OVERLAP_SECONDS = 0.28;
const MIN_SCENE_HEIGHT = 560;
const MIN_SCENE_WIDTH = 320;

let maskPromise: Promise<[HTMLImageElement, HTMLImageElement]> | null = null;
const contentBoundsCache = new WeakMap<HTMLImageElement, Bounds>();

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function gradientColor(point: Point, sceneWidth: number) {
  const blend = clamp(point.x / sceneWidth, 0, 1);
  const violet = { r: 141, g: 107, b: 214 };
  const cyan = { r: 98, g: 199, b: 217 };
  const red = Math.round(violet.r + (cyan.r - violet.r) * blend);
  const green = Math.round(violet.g + (cyan.g - violet.g) * blend);
  const blue = Math.round(violet.b + (cyan.b - violet.b) * blend);

  return `rgba(${red}, ${green}, ${blue}, 0.82)`;
}

function loadMask(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`No se pudo cargar la máscara ${src}`));
    image.src = src;
  });
}

function loadMasks() {
  if (!maskPromise) {
    maskPromise = Promise.all([loadMask(CITEC_MASK_SRC), loadMask(MAP_MASK_SRC)]);
  }

  return maskPromise;
}

function deterministicNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function deterministicJitter(x: number, y: number, amount: number) {
  return (deterministicNoise(x * 0.91 + y * 1.37) - 0.5) * amount;
}

function deterministicShuffle(points: Point[]) {
  return [...points].sort(
    (a, b) => deterministicNoise(a.x * 0.037 + a.y * 0.071) - deterministicNoise(b.x * 0.037 + b.y * 0.071),
  );
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

function getMaskContentBounds(image: HTMLImageElement): Bounds {
  const cachedBounds = contentBoundsCache.get(image);

  if (cachedBounds) {
    return cachedBounds;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return { height: image.naturalHeight, width: image.naturalWidth, x: 0, y: 0 };
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  context.drawImage(image, 0, 0);

  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const pixelIndex = (y * canvas.width + x) * 4;
      const red = data[pixelIndex] ?? 255;
      const green = data[pixelIndex + 1] ?? 255;
      const blue = data[pixelIndex + 2] ?? 255;
      const alpha = data[pixelIndex + 3] ?? 255;
      const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;

      if (alpha > 12 && luminance <= MASK_DARK_THRESHOLD) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const bounds =
    minX <= maxX && minY <= maxY
      ? { height: maxY - minY + 1, width: maxX - minX + 1, x: minX, y: minY }
      : { height: image.naturalHeight, width: image.naturalWidth, x: 0, y: 0 };

  contentBoundsCache.set(image, bounds);

  return bounds;
}

function fitSourceToPlacement(sourceBounds: Bounds, placement: Placement): Bounds {
  const scale = Math.min(placement.maxWidth / sourceBounds.width, placement.maxHeight / sourceBounds.height);
  const width = sourceBounds.width * scale;
  const height = sourceBounds.height * scale;

  return {
    height,
    width,
    x: placement.centerX - width / 2,
    y: placement.centerY - height / 2,
  };
}

function extractPointsFromMask(
  image: HTMLImageElement,
  sceneWidth: number,
  sceneHeight: number,
  count: number,
  spacing: number,
  placement: Placement,
  options: { cropToContent?: boolean; jitter?: boolean } = {},
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return { bounds: { height: 0, width: 0, x: 0, y: 0 }, points: [] };
  }

  canvas.width = sceneWidth;
  canvas.height = sceneHeight;

  context.clearRect(0, 0, sceneWidth, sceneHeight);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, sceneWidth, sceneHeight);

  const sourceBounds =
    options.cropToContent === false
      ? { height: image.naturalHeight, width: image.naturalWidth, x: 0, y: 0 }
      : getMaskContentBounds(image);
  const bounds = fitSourceToPlacement(sourceBounds, placement);

  context.drawImage(
    image,
    sourceBounds.x,
    sourceBounds.y,
    sourceBounds.width,
    sourceBounds.height,
    bounds.x,
    bounds.y,
    bounds.width,
    bounds.height,
  );

  const data = context.getImageData(0, 0, sceneWidth, sceneHeight).data;
  const points: Point[] = [];
  const jitterAmount = options.jitter === false ? 0 : spacing * 0.08;

  for (let y = spacing; y < sceneHeight - spacing; y += spacing) {
    for (let x = spacing; x < sceneWidth - spacing; x += spacing) {
      const pixelIndex = (Math.round(y) * sceneWidth + Math.round(x)) * 4;
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

  return { bounds, points: normalizePoints(deterministicShuffle(points), count) };
}

function buildParticles(from: Point[], to: Point[], sceneWidth: number, isMobile: boolean) {
  if (!to.length) {
    return [];
  }

  const count = from.length;
  const fromBaseRadius = isMobile ? 2.6 : 4.9;
  const toBaseRadius = isMobile ? 2.6 : 4.45;

  return Array.from({ length: count }, (_, index) => {
    const targetPoint = to[index % to.length];
    const persistsToMap = index < to.length;

    return {
      color: gradientColor(targetPoint, sceneWidth),
      delay: deterministicNoise(index * 2.7) * 0.18,
      from: from[index],
      fromAlpha: 1,
      fromRadius: fromBaseRadius + deterministicNoise(index * 0.77) * (isMobile ? 0.14 : 0.16),
      to: targetPoint,
      toAlpha: persistsToMap ? 1 : 0,
      toRadius: persistsToMap ? toBaseRadius + deterministicNoise(index * 0.77) * (isMobile ? 0.14 : 0.22) : 0,
    };
  });
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawParticles(context: CanvasRenderingContext2D, particles: Particle[], progress: number) {
  particles.forEach((particle, index) => {
    const localProgress = clamp((progress - particle.delay) / 0.82, 0, 1);
    const eased = easeInOut(localProgress);
    const x = particle.from.x + (particle.to.x - particle.from.x) * eased;
    const y = particle.from.y + (particle.to.y - particle.from.y) * eased;
    const radius = particle.fromRadius + (particle.toRadius - particle.fromRadius) * eased;
    const alpha = particle.fromAlpha + (particle.toAlpha - particle.fromAlpha) * eased;
    const pulse = 0.98 + deterministicNoise(index * 0.41) * 0.04;

    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = particle.color;
    context.arc(x, y, radius * pulse, 0, Math.PI * 2);
    context.fill();
  });

  context.globalAlpha = 1;
}

function buildPlacements(sceneWidth: number, sceneHeight: number, isMobile: boolean) {
  if (isMobile) {
    return {
      logo: {
        centerX: sceneWidth * 0.5,
        centerY: sceneHeight * 0.5,
        maxHeight: sceneHeight * 0.4,
        maxWidth: sceneWidth * 0.96,
      },
      map: {
        centerX: sceneWidth * 0.5,
        centerY: sceneHeight * 0.52,
        maxHeight: sceneHeight * 0.34,
        maxWidth: sceneWidth * 0.74,
      },
    };
  }

  return {
    logo: {
      centerX: sceneWidth * 0.5,
      centerY: sceneHeight * 0.5,
      maxHeight: sceneHeight * 0.34,
      maxWidth: sceneWidth * 0.78,
    },
    map: {
      centerX: sceneWidth * 0.78,
      centerY: sceneHeight * 0.5,
      maxHeight: sceneHeight * 0.58,
      maxWidth: sceneWidth * 0.42,
    },
  };
}

function finalizeHeroIntro(hero: HTMLElement, copyItems: HTMLElement[]) {
  hero.dataset.homeHeroSequenced = "true";
  hero.classList.remove("home-hero--intro");
  gsap.set(copyItems, { clearProps: "opacity,transform,visibility" });
}

export default function ParticlesToMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    const hero = scene?.closest("[data-home-hero]") as HTMLElement | null;

    if (!canvas || !scene || !hero) {
      return;
    }

    const canvasElement = canvas;
    const sceneElement = scene;
    const heroElement = hero;
    const copyItems = Array.from(heroElement.querySelectorAll<HTMLElement>("[data-home-hero-copy-item]"));
    let cancelled = false;
    let introCompleted = false;
    let timeline: gsap.core.Timeline | null = null;
    let resizeTimeout: number | null = null;

    async function renderScene(animateIntro: boolean) {
      const context = canvasElement.getContext("2d", { alpha: true });

      if (!context) {
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const sceneWidth = Math.max(Math.round(sceneElement.clientWidth), MIN_SCENE_WIDTH);
      const sceneHeight = Math.max(Math.round(sceneElement.clientHeight), MIN_SCENE_HEIGHT);
      const citecParticleCount = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_CITEC_PARTICLE_COUNT;
      const mapParticleCount = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_MAP_PARTICLE_COUNT;
      const spacing = isMobile ? 7 : 9;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvasElement.width = Math.round(sceneWidth * pixelRatio);
      canvasElement.height = Math.round(sceneHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const placements = buildPlacements(sceneWidth, sceneHeight, isMobile);
      const [logoMask, mapMask] = await loadMasks();

      if (cancelled) {
        return;
      }

      const logoSample = extractPointsFromMask(logoMask, sceneWidth, sceneHeight, citecParticleCount, spacing, placements.logo, {
        jitter: false,
      });
      const mapSample = extractPointsFromMask(mapMask, sceneWidth, sceneHeight, mapParticleCount, spacing, placements.map);
      const particles = buildParticles(logoSample.points, mapSample.points, sceneWidth, isMobile);
      const state = {
        progress: animateIntro && !reducedMotion && !introCompleted ? 0 : 1,
      };

      const paint = () => {
        context.clearRect(0, 0, sceneWidth, sceneHeight);
        drawParticles(context, particles, state.progress);
      };

      paint();
      timeline?.kill();

      if (reducedMotion || introCompleted || !animateIntro) {
        introCompleted = true;
        finalizeHeroIntro(heroElement, copyItems);
        return;
      }

      gsap.set(copyItems, { autoAlpha: 0, y: 28 });

      timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          introCompleted = true;
          finalizeHeroIntro(heroElement, copyItems);
          ScrollTrigger.refresh();
        },
      });

      timeline
        .to(state, {
          delay: CITEC_READ_SECONDS,
          duration: isMobile ? MOBILE_MORPH_SECONDS : DESKTOP_MORPH_SECONDS,
          ease: "power3.inOut",
          onUpdate: paint,
          progress: 1,
        })
        .to(
          copyItems,
          {
            autoAlpha: 1,
            duration: COPY_REVEAL_DURATION,
            ease: "power3.out",
            stagger: COPY_REVEAL_STAGGER,
            y: 0,
          },
          `>-${COPY_REVEAL_OVERLAP_SECONDS}`,
        );
    }

    void renderScene(true);

    const handleResize = () => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        timeline?.kill();
        void renderScene(false);
      }, 180);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      timeline?.kill();

      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={sceneRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
