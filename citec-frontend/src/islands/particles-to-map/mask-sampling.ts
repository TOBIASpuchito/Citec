import { MASK_DARK_THRESHOLD } from "./constants";
import { deterministicJitter, deterministicShuffle, normalizePoints } from "./math";
import { getMaskContentBounds } from "./masks";
import type { Bounds, MaskExtractionOptions, MaskSample, Placement, Point } from "./types";

export function fitSourceToPlacement(sourceBounds: Bounds, placement: Placement): Bounds {
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

export function extractPointsFromMask(
  image: HTMLImageElement,
  sceneWidth: number,
  sceneHeight: number,
  count: number,
  spacing: number,
  placement: Placement,
  options: MaskExtractionOptions = {},
): MaskSample {
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
