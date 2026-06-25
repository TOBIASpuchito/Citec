export const PARTICLE_COUNTS = {
  desktopCitec: 3200,
  desktopMap: 1200,
  mobile: 1050,
} as const;

export const MASK_SOURCES = {
  citec: "/mask2.png",
  map: "/mask1.png",
} as const;

export const MASK_DARK_THRESHOLD = 96;

export const TIMING = {
  citecReadSeconds: 1,
  copyRevealDuration: 0.6,
  copyRevealOverlapSeconds: 0.28,
  copyRevealStagger: 0.05,
  desktopMorphSeconds: 1.7,
  mobileMorphSeconds: 1.35,
  resizeDebounceMs: 180,
} as const;

export const SCENE_LIMITS = {
  minHeight: 560,
  minWidth: 320,
} as const;

export const MEDIA_QUERIES = {
  mobile: "(max-width: 640px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
