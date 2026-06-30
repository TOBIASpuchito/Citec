import { clamp, deterministicNoise, easeInOut, gradientColor } from "./math";
import type { Particle, Point } from "./types";

export function buildParticles(from: Point[], to: Point[], sceneWidth: number, isMobile: boolean) {
  if (!to.length) {
    return [];
  }

  const count = from.length;
  const fromBaseRadius = isMobile ? 2.6 : 4.9;
  const toBaseRadius = isMobile ? 2.6 : 4.45;

  return Array.from({ length: count }, (_, index): Particle => {
    const targetPoint = to[index % to.length];
    const persistsToMap = index < to.length;

    return {
      color: gradientColor(targetPoint, sceneWidth),
      delay: deterministicNoise(index * 2.7) * 0.18,
      from: from[index] ?? targetPoint,
      fromAlpha: 1,
      fromRadius: fromBaseRadius + deterministicNoise(index * 0.77) * (isMobile ? 0.14 : 0.16),
      to: targetPoint,
      toAlpha: persistsToMap ? 1 : 0,
      toRadius: persistsToMap ? toBaseRadius + deterministicNoise(index * 0.77) * (isMobile ? 0.14 : 0.22) : 0,
    };
  });
}

export function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  progress: number,
  visibility = 1,
) {
  particles.forEach((particle, index) => {
    const localProgress = clamp((progress - particle.delay) / 0.82, 0, 1);
    const localVisibility = clamp((visibility - particle.delay) / 0.82, 0, 1);
    const eased = easeInOut(localProgress);
    const visible = easeInOut(localVisibility);
    const x = particle.from.x + (particle.to.x - particle.from.x) * eased;
    const y = particle.from.y + (particle.to.y - particle.from.y) * eased;
    const radius = particle.fromRadius + (particle.toRadius - particle.fromRadius) * eased;
    const alpha = particle.fromAlpha + (particle.toAlpha - particle.fromAlpha) * eased;
    const pulse = 0.98 + deterministicNoise(index * 0.41) * 0.04;

    context.beginPath();
    context.globalAlpha = alpha * visible;
    context.fillStyle = particle.color;
    context.arc(x, y, radius * pulse, 0, Math.PI * 2);
    context.fill();
  });

  context.globalAlpha = 1;
}
