import { deterministicJitter, deterministicShuffle, normalizePoints } from "./math";
import { getMaskContentBounds, isMaskPixel } from "./masks";
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
    const emptyBounds = { height: 0, width: 0, x: 0, y: 0 };

    return { bounds: emptyBounds, imageBounds: emptyBounds, points: [] };
  }

  canvas.width = sceneWidth;
  canvas.height = sceneHeight;

  context.clearRect(0, 0, sceneWidth, sceneHeight);
  const pixelMode = options.pixelMode ?? "dark";

  if (pixelMode === "dark") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, sceneWidth, sceneHeight);
  }

  const sourceBounds =
    options.cropToContent === false
      ? { height: image.naturalHeight, width: image.naturalWidth, x: 0, y: 0 }
      : getMaskContentBounds(image, pixelMode);
  const bounds = fitSourceToPlacement(sourceBounds, placement);
  const sourceScale = bounds.width / sourceBounds.width;
  const imageBounds = {
    height: image.naturalHeight * sourceScale,
    width: image.naturalWidth * sourceScale,
    x: bounds.x - sourceBounds.x * sourceScale,
    y: bounds.y - sourceBounds.y * sourceScale,
  };

  context.drawImage(image, imageBounds.x, imageBounds.y, imageBounds.width, imageBounds.height);

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
      if (isMaskPixel(red, green, blue, alpha, pixelMode)) {
        points.push({
          x: x + deterministicJitter(x, y, jitterAmount),
          y: y + deterministicJitter(y, x, jitterAmount),
        });
      }
    }
  }

  return { bounds, imageBounds, points: normalizePoints(deterministicShuffle(points), count) };
}
