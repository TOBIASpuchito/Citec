---
name: citec-tailwind-system
description: Arquitectura Tailwind y CSS para CITEC. Use when Codex creates, edits, or reviews Astro, React, Tailwind, global CSS variables, design tokens, @layer components, utility usage, responsive classes, or refactors repeated/local styles into a maintainable project-wide styling system.
---

# Citec Tailwind System

Use this skill before adding or refactoring frontend styles in the CITEC project.

## Workflow

1. Read `tailwind.config.mjs`, `src/styles/tokens.css`, `src/styles/global.css`, and the affected component before editing.
2. Prefer existing `citec-*` Tailwind tokens and CSS variables before adding new values.
3. Separate palette tokens from semantic tokens. Use `--citec-*` for provisional brand colors and `--color-*` for UI meaning such as `primary-text`, `secondary-text`, `page-bg`, `surface`, `border-subtle`, and `action-bg`.
4. Put brand primitives in `tokens.css`: colors, RGB channels, fonts, radii, shadows, easing, control sizes, and reusable background formulas.
5. Expose semantic tokens through `tailwind.config.mjs` when they need utilities such as `text-primary-text`, `text-secondary-text`, `bg-page-bg`, `bg-surface`, `border-border-subtle`, or `bg-action-bg`.
6. Expose brand tokens through `tailwind.config.mjs` only when a component really needs the brand color itself.
7. Put reusable visual patterns in `@layer components` inside `global.css`.
8. Keep route files mostly structural: content, data, component composition, and a small number of semantic classes.
9. Keep page-only component styles semantic and short. If a style block grows beyond a narrow local exception, promote it to `global.css` or a shared component.
10. Validate with `bun run check` and `bun run build` after significant styling changes.

## Rules

- Do not paste large Tailwind class walls repeatedly across pages.
- Do not define raw hex colors, repeated shadows, or repeated easing inside page components.
- Do not add arbitrary values when a project token can express the same decision.
- Do not use `text-citec-ink`, `bg-citec-paper`, or similar palette utilities in page markup when the intent is semantic. Prefer `text-primary-text`, `bg-page-bg`, `bg-surface`, etc.
- Do not create a new shared class for a one-off detail unless it clarifies the page structure.
- Do not use Tailwind v4-only `@theme` syntax while the project is on Tailwind 3.x.
- Use RGB CSS variables with `<alpha-value>` in Tailwind config for colors that need opacity modifiers.
- Use `@layer components` for buttons, cards, labels, stats, section shells, and repeated hero primitives.
- Keep interactive or animated styles close to the island only when they are inseparable from the behavior.

## CITEC Styling Shape

- Use sober institutional contrast: ink, navy, paper, mist, white, cyan, violet.
- Prefer restrained surfaces, clear typography, and useful information density.
- Use `glass-surface`, `editorial-label`, `soft-grid`, `citec-button`, and similar shared classes before inventing new local patterns.
- Keep mobile states intentional: reduce decoration, preserve readability, and avoid hidden content that leaves awkward blank space.
