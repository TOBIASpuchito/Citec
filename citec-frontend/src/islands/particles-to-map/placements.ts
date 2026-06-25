import type { ParticlePlacements } from "./types";

export function buildPlacements(sceneWidth: number, sceneHeight: number, isMobile: boolean): ParticlePlacements {
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
