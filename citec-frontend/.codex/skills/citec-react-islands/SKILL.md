---
name: citec-react-islands
description: React islands para CITEC. Use when Codex creates, edits, or reviews hydrated React components, browser-only behavior, hooks, local state, lucide-react icons, accessibility for interactive controls, cleanup of effects, or Astro hydration directives in the CITEC frontend.
---

# CITEC React Islands

Use this skill when work touches `src/islands`, hydrated React components, or Astro `client:*` directives.

## Workflow

1. Confirm the component needs client execution. Keep static presentation in `.astro` components.
2. Choose hydration deliberately: `client:load` only for above-the-fold or immediately required interaction, `client:visible` for deferred interactive sections, and lighter directives when possible.
3. Keep islands self-contained. Pass small typed props instead of whole datasets unless the island owns filtering, searching, or rendering those records.
4. Type props with named types near the component. Prefer `import type` for type-only imports.
5. Guard browser APIs inside effects or with `typeof window !== "undefined"`.
6. Clean up event listeners, timers, observers, GSAP timelines, ScrollTriggers, and requestAnimationFrame loops.
7. Use `src/utils/cn.ts` when conditional class composition becomes conflict-prone.
8. Use `lucide-react` icons for React UI. Mark decorative icons with `aria-hidden="true"` and label icon-only buttons.
9. Validate with `bun run check`; use `bun run doctor` when hydration, hooks, or client behavior is suspect.

## Rules

- Do not put ordinary presentational components in `src/islands`.
- Do not pass broad service objects or untyped records through props.
- Do not read `window`, `document`, `localStorage`, media queries, or layout measurements during server render.
- Do not leave client listeners or animation handles alive after unmount.
- Do not hide essential content behind hydration, hover, pointer precision, or animation.

## Interaction Standards

- Preserve keyboard access for menus, filters, buttons, stretched links, and custom controls.
- Keep touch targets practical on mobile.
- Keep focus states visible and compatible with the global `:focus-visible` behavior.
- Prefer quiet, scannable controls that match CITEC's institutional product surface.
