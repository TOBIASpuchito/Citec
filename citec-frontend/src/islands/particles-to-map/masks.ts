import { MASK_DARK_THRESHOLD, MASK_SOURCES } from "./constants";
import type { Bounds, MaskPixelMode } from "./types";

let maskPromise: Promise<[HTMLImageElement, HTMLImageElement]> | null = null;
const contentBoundsCache = new WeakMap<HTMLImageElement, Map<MaskPixelMode, Bounds>>();

export function isMaskPixel(
  red: number,
  green: number,
  blue: number,
  alpha: number,
  pixelMode: MaskPixelMode,
) {
  if (alpha <= 12) {
    return false;
  }

  if (pixelMode === "alpha") {
    return true;
  }

  const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;

  return luminance <= MASK_DARK_THRESHOLD;
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

export function loadMasks() {
  if (!maskPromise) {
    maskPromise = Promise.all([loadMask(MASK_SOURCES.citec), loadMask(MASK_SOURCES.map)]);
  }

  return maskPromise;
}

export function getMaskContentBounds(image: HTMLImageElement, pixelMode: MaskPixelMode): Bounds {
  const cachedBounds = contentBoundsCache.get(image)?.get(pixelMode);

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
      if (isMaskPixel(red, green, blue, alpha, pixelMode)) {
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

  const imageCache = contentBoundsCache.get(image) ?? new Map<MaskPixelMode, Bounds>();
  imageCache.set(pixelMode, bounds);
  contentBoundsCache.set(image, imageCache);

  return bounds;
}
