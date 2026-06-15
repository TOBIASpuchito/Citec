---
name: citec-bun-quality
description: Flujo Bun y validacion de calidad para CITEC. Use when Codex runs or updates project commands, dependencies, validation scripts, dev server flows, build checks, Astro check, React doctor, OG generation, or final verification for the CITEC frontend.
---

# CITEC Bun Quality

Use this skill when work touches project commands, dependency workflow, validation, dev server usage, or final QA.

## Workflow

1. Use Bun for project commands and dependency work.
2. Read `package.json` before changing commands, dependencies, or validation flow.
3. Run `bun run check` after TypeScript, Astro, route, prop, or integration changes.
4. Run `bun run build` after visible UI, SEO, sitemap, motion, or layout changes.
5. Use `bun run doctor` when React hydration, hooks, or client component behavior is suspect.
6. Run `bun run generate:og` only when `public/og-image.png` or its source script intentionally changes.
7. For frontend changes, start the dev server and perform desktop and mobile visual QA when the route is known.
8. Keep validation scoped to the change when edits are docs-only or skill-only.

## Commands

```bash
bun run dev
bun run check
bun run build
bun run doctor
bun run generate:og
```

## Rules

- Do not use npm, pnpm, or yarn for this project unless the user explicitly asks.
- Do not add dependencies for UI that can be built with Astro, React, Tailwind, or existing utilities.
- Do not regenerate OG assets unless the OG source or output is intentionally changed.
- Do not skip reporting failed or unavailable validation in the final response.

## QA Order

1. Static contract: `bun run check`.
2. Production confidence: `bun run build`.
3. Hydration diagnosis: `bun run doctor` only when needed.
4. Visual QA: desktop and mobile for changed routes.
5. Accessibility spot-check: keyboard focus, labels, contrast, and reduced-motion behavior for affected UI.
