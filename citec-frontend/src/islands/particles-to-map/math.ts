import type { Point } from "./types";

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function gradientColor(point: Point, sceneWidth: number) {
  const blend = clamp(point.x / sceneWidth, 0, 1);
  const indigo = { r: 45, g: 54, b: 142 };
  const sky = { r: 59, g: 167, b: 255 };
  const red = Math.round(indigo.r + (sky.r - indigo.r) * blend);
  const green = Math.round(indigo.g + (sky.g - indigo.g) * blend);
  const blue = Math.round(indigo.b + (sky.b - indigo.b) * blend);

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
