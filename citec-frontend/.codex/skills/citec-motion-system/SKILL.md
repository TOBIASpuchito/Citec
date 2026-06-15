---
name: citec-motion-system
description: Motion frontend para CITEC con GSAP, ScrollTrigger y Lenis. Use when Codex creates, edits, reviews, or debugs scroll animation, reveal motion, timelines, Lenis integration, reduced-motion behavior, animation cleanup, or performance-sensitive motion in Astro or React islands.
---

# CITEC Motion System

Use this skill when work touches GSAP, ScrollTrigger, Lenis, reveal attributes, scroll-linked animation, or animated React islands.

## Workflow

1. Read `src/lib/gsap.ts`, `src/lib/lenis.ts`, `src/utils/animation.ts`, and the affected component before editing motion code.
2. Import `gsap` and `ScrollTrigger` only from `@/lib/gsap`.
3. Reuse `data-reveal` and `data-reveal-delay` for standard entrance motion.
4. Keep Lenis ownership in `src/lib/lenis.ts`; do not create another global Lenis instance.
5. Respect `prefers-reduced-motion`. Reduced-motion users must see content immediately.
6. Animate transform and opacity when possible. Avoid layout-heavy animation that can create scroll jank.
7. In React islands, create timelines inside effects, scope selectors to local refs, and clean up with `timeline.kill()`, `ctx.revert()`, or scoped ScrollTrigger cleanup.
8. Call `ScrollTrigger.refresh()` only after adding reveal triggers or after layout-affecting async content.
9. Validate visible motion with desktop and mobile QA after substantial animation changes.

## Rules

- Do not register `ScrollTrigger` in component files.
- Do not use `ScrollTrigger.getAll()` for broad cleanup unless the scope is intentionally global and safe.
- Do not create refresh loops.
- Do not animate required content from invisible to visible without a reduced-motion fallback.
- Do not let decorative canvases or animation layers block pointer events or assistive technology.

## CITEC Motion Shape

- Prefer restrained editorial motion: reveal, emphasis, continuity, and spatial orientation.
- Avoid generic animated decoration that competes with institutional content.
- Keep dashboards and operational surfaces calm, fast, and scannable.
