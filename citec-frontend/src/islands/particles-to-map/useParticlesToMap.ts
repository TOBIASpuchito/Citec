import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MEDIA_QUERIES, PARTICLE_COUNTS, PARTICLE_SPACING, SCENE_LIMITS, TIMING } from "./constants";
import { finalizeHeroIntro } from "./hero-intro";
import { extractPointsFromMask } from "./mask-sampling";
import { loadMasks } from "./masks";
import { buildParticles, drawParticles } from "./particles";
import { buildPlacements } from "./placements";
import type { ParticlesToMapRefs } from "./types";

export function useParticlesToMap({ canvasRef, sceneRef }: ParticlesToMapRefs) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    const hero = scene?.closest("[data-home-hero]") as HTMLElement | null;

    if (!canvas || !scene || !hero) {
      return;
    }

    const canvasElement = canvas;
    const sceneElement = scene;
    const heroElement = hero;
    const copyItems = Array.from(heroElement.querySelectorAll<HTMLElement>("[data-home-hero-copy-item]"));
    let cancelled = false;
    let introCompleted = false;
    let timeline: gsap.core.Timeline | null = null;
    let resizeTimeout: number | null = null;

    async function renderScene(animateIntro: boolean) {
      const context = canvasElement.getContext("2d", { alpha: true });

      if (!context) {
        return;
      }

      const reducedMotion = window.matchMedia(MEDIA_QUERIES.reducedMotion).matches;
      const isMobile = window.matchMedia(MEDIA_QUERIES.mobile).matches;
      const sceneWidth = Math.max(Math.round(sceneElement.clientWidth), SCENE_LIMITS.minWidth);
      const sceneHeight = Math.max(Math.round(sceneElement.clientHeight), SCENE_LIMITS.minHeight);
      const citecParticleCount = isMobile ? PARTICLE_COUNTS.mobileCitec : PARTICLE_COUNTS.desktopCitec;
      const mapParticleCount = isMobile ? PARTICLE_COUNTS.mobileMap : PARTICLE_COUNTS.desktopMap;
      const citecSpacing = isMobile ? PARTICLE_SPACING.mobileCitec : PARTICLE_SPACING.desktopCitec;
      const mapSpacing = isMobile ? PARTICLE_SPACING.mobileMap : PARTICLE_SPACING.desktopMap;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvasElement.width = Math.round(sceneWidth * pixelRatio);
      canvasElement.height = Math.round(sceneHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const placements = buildPlacements(sceneWidth, sceneHeight, isMobile);
      const [logoMask, mapMask] = await loadMasks();

      if (cancelled) {
        return;
      }

      const logoSample = extractPointsFromMask(
        logoMask,
        sceneWidth,
        sceneHeight,
        citecParticleCount,
        citecSpacing,
        placements.logo,
        { jitter: false },
      );
      const mapSample = extractPointsFromMask(
        mapMask,
        sceneWidth,
        sceneHeight,
        mapParticleCount,
        mapSpacing,
        placements.map,
      );
      const particles = buildParticles(logoSample.points, mapSample.points, sceneWidth, isMobile);
      const shouldAnimateIntro = animateIntro && !reducedMotion && !introCompleted;
      const state = {
        progress: shouldAnimateIntro ? 0 : 1,
      };

      const paint = () => {
        context.clearRect(0, 0, sceneWidth, sceneHeight);
        drawParticles(context, particles, state.progress);
      };

      paint();
      timeline?.kill();

      if (reducedMotion || introCompleted || !animateIntro) {
        introCompleted = true;
        finalizeHeroIntro(heroElement, copyItems);
        return;
      }

      gsap.set(copyItems, { autoAlpha: 0, y: 28 });

      const morphDuration = isMobile ? TIMING.mobileMorphSeconds : TIMING.desktopMorphSeconds;
      const morphStart = TIMING.citecReadSeconds;

      timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          introCompleted = true;
          finalizeHeroIntro(heroElement, copyItems);
          ScrollTrigger.refresh();
        },
        onUpdate: paint,
      });

      timeline
        .to(state, {
          duration: morphDuration,
          ease: "sine.inOut",
          progress: 1,
        }, morphStart)
        .to(
          copyItems,
          {
            autoAlpha: 1,
            duration: TIMING.copyRevealDuration,
            ease: "power3.out",
            stagger: TIMING.copyRevealStagger,
            y: 0,
          },
          morphStart + morphDuration - TIMING.copyRevealOverlapSeconds,
        );
    }

    void renderScene(true);

    const handleResize = () => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        timeline?.kill();
        void renderScene(false);
      }, TIMING.resizeDebounceMs);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      timeline?.kill();

      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }

      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, sceneRef]);
}
