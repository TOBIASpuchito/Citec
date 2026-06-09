# Agent Guide

This project is the CITEC frontend: an Astro site with React islands, TypeScript, TailwindCSS, GSAP, ScrollTrigger, Lenis, and Lucide React. Treat it as an institutional product surface, not a generic marketing template.

## Architecture

```txt
src/
  assets/                 Static source assets used by Astro.
  components/
    ui/                   Shared primitives: Button, Badge, Container, inputs, cards.
    layout/               Shared shell: Header, Footer.
    motion/               Shared motion bootstraps.
    sections/             Shared content sections/cards used by more than one route.
    directory/            Shared directory-specific cards.
  data/                   Typed mock data and future content contracts.
  islands/                React-only interactive islands with client state.
  layouts/                BaseLayout only: SEO, header, footer, global motion.
  lib/                    External adapters and integration boundaries.
  pages/
    index.astro           Route entrypoints stay thin and compose page sections.
    _home/components/     Private components used only by the home route.
    _beneficios/components/
                            Private components used only by beneficios.
  styles/                 Global CSS and design tokens.
  utils/                  Pure helpers for classnames, SEO, animation helpers.
```

Astro exposes files under `src/pages` as routes. Prefix route-private folders with `_` so page-owned components stay near their route without becoming public pages. Do not add a generic page layout for visible page headers; each route owns its own structure.

## Component Placement

- Put page-only sections in `src/pages/_<route>/components`.
- Put reusable UI primitives in `src/components/ui`.
- Put shared cards or sections in `src/components/sections` only when at least two routes use them.
- Put interactive React components in `src/islands` only when state, hooks, or client-side behavior are required.
- Put external service access in `src/lib`; page components should depend on local contracts, not on service details.
- Use `BaseLayout` in every route for browser tab title, meta description, header, footer, and global wrappers.

## SOLID For This Codebase

- Single Responsibility: route files compose their own page structure and declare SEO through `BaseLayout`; components render one visual concern; data modules own content; libs own integrations.
- Open/Closed: extend pages by adding page-private components or data entries instead of adding page-specific conditionals to shared components.
- Liskov Substitution: shared components must keep stable prop contracts and render predictably wherever they are reused.
- Interface Segregation: pass small props that a component actually needs. Avoid pushing full datasets through presentational cards.
- Dependency Inversion: UI depends on typed local data contracts and adapter functions. Future WordPress work should replace `src/lib/wordpress.ts` internals without forcing page rewrites.

## Design Standard

Use `.codex/skills/human-design-frontend/SKILL.md` when creating or reviewing visible UI. CITEC should feel institutional, specific, editorial, and useful: avoid generic AI-looking gradients, vague SaaS copy, repeated three-card sections, and decorative wrappers without product signal.

## SEO Standard

- Declare each route's browser title and meta description in that route through `BaseLayout`.
- Keep canonical, Open Graph, Twitter, sitemap discovery, RSS discovery, and base JSON-LD inside `BaseLayout`.
- Add route-specific JSON-LD from `src/utils/seo.ts` only when the structured data describes visible page content.
- Use `src/pages/robots.txt.ts`, `src/pages/rss.xml.ts`, and `@astrojs/sitemap` rather than hand-maintained generated files.
- Keep sitemap priority/change frequency in `astro.config.mjs` aligned with route importance.

## Commands

```bash
bun run dev
bun run check
bun run build
bun run doctor
```

Run `bun run check` or `bun run build` after architectural or visible UI changes when practical.
