import type { ParticlesToMapRefs } from "./types";

type ParticleSceneProps = ParticlesToMapRefs;

export function ParticleScene({ canvasRef, sceneRef }: ParticleSceneProps) {
  return (
    <div ref={sceneRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
