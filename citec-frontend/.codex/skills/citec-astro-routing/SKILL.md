---
name: citec-astro-routing
description: Arquitectura Astro para CITEC. Use when Codex creates, edits, or reviews Astro routes, layouts, page-owned components, static paths, Astro props, content composition, assets, sitemap-friendly links, or route structure in the CITEC frontend.
---

# CITEC Astro Routing

Use this skill when work touches `.astro` files, `src/pages`, `src/layouts`, route-private components, or Astro asset usage.

## Workflow

1. Read `astro.config.mjs`, the target route in `src/pages`, `src/layouts/BaseLayout.astro`, and any route-private components before editing.
2. Keep route files thin: import data, declare `getStaticPaths` when needed, set `BaseLayout` props, and compose sections.
3. Place page-owned components beside their route under `src/pages/_<route>/components` so they do not become public routes.
4. Prefer `.astro` components for static or mostly static UI. Use React islands only for state, hooks, browser APIs, or complex client interaction.
5. Keep dynamic routes static-friendly with typed `getStaticPaths`, typed `Astro.props`, and data from `src/data` or integration adapters in `src/lib`.
6. Preserve the configured trailing slash behavior. Internal links should generally end with `/`.
7. Use the `@/*` alias for imports inside `src`.
8. Keep `BaseLayout` responsible for global metadata, shell, canonical links, Open Graph/Twitter tags, header, footer, and global motion bootstraps.
9. Validate with `bun run check` after route, prop, layout, or integration changes. Run `bun run build` after visible UI, SEO, sitemap, motion, or layout changes.

## Rules

- Do not duplicate head tags, header/footer shells, JSON-LD boilerplate, or global motion bootstraps in route files.
- Do not put ordinary presentational components in `src/islands`.
- Do not introduce browser-only code into server-rendered modules without guards.
- Do not create public routes accidentally by putting private components directly under `src/pages`.
- Do not hardcode site URL, locale, legal name, or OG image in page components.

## CITEC Shape

- Compose pages around real institutional workflows: socios, ciudades, industrias, regulacion, agenda, Pulse, eventos, afiliacion, mesas de trabajo, and directorio.
- Preserve information density and editorial structure. Avoid generic landing-page formulas when an Astro section can show real institutional content.
