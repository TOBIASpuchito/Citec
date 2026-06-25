import { useRef } from "react";
import { ParticleScene } from "./particles-to-map/ParticleScene";
import { useParticlesToMap } from "./particles-to-map/useParticlesToMap";

export default function ParticlesToMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useParticlesToMap({ canvasRef, sceneRef });

  return <ParticleScene canvasRef={canvasRef} sceneRef={sceneRef} />;
}
