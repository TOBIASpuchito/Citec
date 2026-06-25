import type { Point } from "./types";

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function gradientColor(point: Point, sceneWidth: number) {
  const blend = clamp(point.x / sceneWidth, 0, 1);
  const violet = { r: 141, g: 107, b: 214 };
  const cyan = { r: 98, g: 199, b: 217 };
  const red = Math.round(violet.r + (cyan.r - violet.r) * blend);
  const green = Math.round(violet.g + (cyan.g - violet.g) * blend);
  const blue = Math.round(violet.b + (cyan.b - violet.b) * blend);

  return `rgba(${red}, ${green}, ${blue}, 0.82)`;
}

export function deterministicNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

export function deterministicJitter(x: number, y: number, amount: number) {
  return (deterministicNoise(x * 0.91 + y * 1.37) - 0.5) * amount;
}

export function deterministicShuffle(points: Point[]) {
  return [...points].sort(
    (a, b) => deterministicNoise(a.x * 0.037 + a.y * 0.071) - deterministicNoise(b.x * 0.037 + b.y * 0.071),
  );
}

export function normalizePoints(points: Point[], count: number) {
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

export function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
