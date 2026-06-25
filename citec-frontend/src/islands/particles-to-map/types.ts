import type { RefObject } from "react";

export type Bounds = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type Placement = {
  centerX: number;
  centerY: number;
  maxHeight: number;
  maxWidth: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Particle = {
  color: string;
  delay: number;
  from: Point;
  fromAlpha: number;
  fromRadius: number;
  to: Point;
  toAlpha: number;
  toRadius: number;
};

export type MaskExtractionOptions = {
  cropToContent?: boolean;
  jitter?: boolean;
};

export type MaskSample = {
  bounds: Bounds;
  points: Point[];
};

export type ParticlePlacements = {
  logo: Placement;
  map: Placement;
};

export type ParticlesToMapRefs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  sceneRef: RefObject<HTMLDivElement | null>;
};
