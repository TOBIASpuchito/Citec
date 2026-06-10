---
name: human-design-frontend
description: Diseno y revision de interfaces frontend para evitar resultados genericos o con apariencia de IA. Use when Codex creates, edits, or reviews Astro, React, Tailwind, website sections, landing pages, UI components, visual hierarchy, responsive states, motion, product copy, brand expression, or any frontend screen that needs to feel specific, credible, human, and production-ready.
---

# Human Design Frontend

Use this skill before and after changing visible UI.

## Workflow

1. Read the local context first: page purpose, existing components, Tailwind tokens, assets, copy tone, route role, and nearby UI patterns.
2. State the screen's job in one sentence before designing. If a section has no clear job, remove it or make it sharper.
3. Prefer existing tokens and components. Add new visual language only when the current system cannot express the intent.
4. For simple size, spacing, layout, responsive, or alignment tweaks, use existing Tailwind classes in the affected component; do not edit global CSS, token variables, or Tailwind config.
5. Keep route files clean. Move repeated visual decisions to shared components, `src/styles/tokens.css`, `tailwind.config.mjs`, or `@layer components` in `src/styles/global.css` only when the pattern is genuinely shared.
6. Design with real information density. Use specific content, real page states, real data structures, and credible empty/loading/error states where relevant.
7. Verify desktop and mobile. Check text wrapping, spacing rhythm, hit targets, contrast, motion, and whether the first viewport communicates the actual product or institution.

## Anti-AI Checks

- Avoid generic gradient blob backgrounds, decorative orbs, glass overload, vague neon cards, and centered hero formulas with no product signal.
- Avoid repeated section templates that only swap eyebrow, title, description, and three cards.
- Avoid vague copy such as "transforma tu negocio", "soluciones innovadoras", "potencia tu futuro", or claims without concrete nouns.
- Avoid one-note palettes. CITEC can use navy, paper, mist, cyan, violet, warm, and white, but accents should be intentional.
- Avoid oversized display type inside cards, tool panels, or compact content. Reserve hero scale for true heroes.
- Avoid nested cards and decorative wrappers around every section. Use cards for repeated items, modals, and framed tools only.
- Avoid page-local style blocks that recreate buttons, grids, stats, shadows, or typography already available in the design system.

## CITEC Direction

- Make the interface feel institutional, editorial, and useful for Ecuador's tech ecosystem.
- Show ecosystem mechanics: socios, ciudades, industrias, regulacion, agenda, beneficios, Pulse, eventos, afiliacion.
- Favor sober composition, strong hierarchy, enough white space, and restrained motion over spectacle.
- Use page-specific assets or concrete content when possible. Atmospheric decoration is a last resort.
- Keep Spanish copy direct, specific, and executive. Prefer "mesas de trabajo", "agenda regulatoria", "directorio de socios", "lecturas Pulse", and "afiliacion" over generic SaaS language.

## Component Decisions

- Put route-only sections in `src/pages/_<route>/components`.
- Keep shared primitives in `src/components/ui`.
- Keep shared layout, motion, and reusable content cards in `src/components`.
- Promote a page component to shared only after at least two routes need the same behavior without page-specific copy branches.
- Pass small typed props. Do not pass whole datasets unless the component owns filtering or rendering of that dataset.
- When repeated classes or CSS appear, use the `citec-tailwind-system` skill and refactor toward tokens/components before continuing visual polish.

## Visual QA

Before finishing a UI change, run the project check/build when practical and inspect the affected route in a browser. Confirm:

- The first viewport has a clear product, institution, or workflow signal.
- Text does not overlap or overflow on mobile.
- Cards and repeated items have stable dimensions.
- Motion respects reduced-motion behavior already present in the project.
- The screen would still make sense with production data, longer names, and fewer items.
