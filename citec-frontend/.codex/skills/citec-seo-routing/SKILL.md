---
name: citec-seo-routing
description: SEO tecnico, rutas generadas y datos estructurados para CITEC. Use when Codex creates, edits, or reviews page metadata, BaseLayout SEO props, canonical URLs, Open Graph, Twitter metadata, JSON-LD, sitemap, robots.txt, RSS, manifest routes, article metadata, or SEO helper usage in the CITEC frontend.
---

# CITEC SEO Routing

Use this skill when work touches route metadata, structured data, feeds, sitemap policy, robots, manifest, or SEO helper functions.

## Workflow

1. Read `src/layouts/BaseLayout.astro`, `src/data/site.ts`, `src/utils/seo.ts`, and the affected route before editing SEO.
2. Every route must declare a specific `title` and `description` through `BaseLayout`.
3. Keep canonical URLs, Open Graph, Twitter metadata, sitemap discovery, RSS discovery, manifest link, base JSON-LD, header, footer, and global wrappers in `BaseLayout`.
4. Use helpers from `src/utils/seo.ts`: `absoluteUrl`, `breadcrumbJsonLd`, `itemListJsonLd`, `pulseArticleJsonLd`, `partnerOrganizationJsonLd`, `eventJsonLd`, and `faqPageJsonLd`.
5. Add route-specific JSON-LD only when it describes visible content on the page.
6. Keep global site metadata in `src/data/site.ts`.
7. Maintain generated route endpoints through `src/pages/robots.txt.ts`, `src/pages/rss.xml.ts`, and `src/pages/site.webmanifest.ts`.
8. For article or dynamic detail routes, keep dates ISO-compatible and pass `ogType="article"`, `publishedTime`, `modifiedTime`, and `section` when appropriate.
9. Validate with `bun run build` after SEO, sitemap, feed, route, or layout changes.

## Rules

- Do not hardcode the site URL, locale, legal name, or OG image in page components.
- Do not add JSON-LD for content that is not visible on the page.
- Do not duplicate global metadata outside `BaseLayout`.
- Do not change sitemap priority, change frequency, or last modified policy without checking `astro.config.mjs`.
- Do not forget trailing slashes in internal canonical route references.

## CITEC SEO Shape

- Make metadata specific to Ecuador's technology ecosystem.
- Prefer clear route descriptions that name the real workflow, institution, event, article, or directory content.
