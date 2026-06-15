# AGENTS.md

This file guides agents working in the CITEC frontend. The project is an Astro site with React islands, strict TypeScript, Bun, TailwindCSS 3.x, GSAP, ScrollTrigger, Lenis, Lucide React, sitemap/RSS/manifest routes, and structured SEO helpers. Treat it as an institutional product surface for Ecuador's technology ecosystem, not as a generic marketing template.

## Project Skill Stack

Project-specific skills live in `.codex/skills` and should be used in this order when the task matches their scope:

1. `$citec-bun-quality` for command selection, validation, dev server flow, dependency workflow, and final QA.
2. `$citec-astro-routing` for Astro routes, layouts, static paths, page-owned components, and asset-aware page composition.
3. `$citec-typescript-contracts` for strict props, data contracts, typed helpers, and integration boundaries.
4. `$citec-tailwind-system` for Tailwind 3.x tokens, global CSS variables, semantic utilities, and shared component classes.
5. `$human-design-frontend` for CITEC's institutional visual direction, content specificity, hierarchy, and non-generic frontend polish.
6. `$citec-react-islands` for hydrated React islands, browser-only behavior, hooks, lucide-react controls, and interaction accessibility.
7. `$citec-motion-system` for GSAP, ScrollTrigger, Lenis, reveal motion, animation cleanup, and reduced-motion support.
8. `$citec-seo-routing` for metadata, canonical URLs, Open Graph/Twitter, JSON-LD, sitemap, RSS, robots, and manifest routes.

Globally installed support skills can be used when relevant: `$playwright`, `$playwright-interactive`, `$screenshot`, `$security-best-practices`, `$gh-address-comments`, `$gh-fix-ci`, and `$yeet`.

## Repository Shape

```txt
src/
  assets/                 Static source assets used by Astro.
  components/
    ui/                   Shared primitives: Button, Badge, Container, inputs, cards.
    layout/               Shared shell: Header, Footer.
    motion/               Shared motion bootstraps.
    sections/             Shared content sections/cards used by more than one route.
    directory/            Shared directory-specific cards.
  data/                   Typed content, mock data, navigation, and site metadata.
  islands/                React-only interactive islands with client state or browser APIs.
  layouts/                BaseLayout: metadata, global shell, SEO, and motion bootstraps.
  lib/                    External adapters and browser integrations.
  pages/                  Astro routes. Prefix private page component folders with `_`.
  styles/                 Design tokens and global component classes.
  utils/                  Pure helpers for classnames, SEO, and animation setup.
```

Astro exposes files under `src/pages` as public routes. Keep page-owned components beside their route in `src/pages/_<route>/components` so they do not become routes.

## Tooling And Commands

Use Bun for project commands and dependency work.

```bash
bun run dev
bun run check
bun run build
bun run doctor
bun run generate:og
```

Run `bun run check` after TypeScript, Astro, route, prop, or integration changes. Run `bun run build` after visible UI, SEO, sitemap, motion, or layout changes. Use `bun run doctor` when React hydration, hooks, or client component behavior is suspect. Regenerate OG assets with `bun run generate:og` only when `public/og-image.png` or its source script intentionally changes.

## Astro Rules

- Route files should stay thin: import data, declare `getStaticPaths` when needed, set `BaseLayout` props, and compose sections.
- Prefer `.astro` components for static or mostly static UI. Use React only for state, hooks, browser-only APIs, complex interaction, or components already implemented as islands.
- Use `BaseLayout` on every page route. Do not duplicate head tags, header/footer shells, global metadata, or global motion bootstraps in route files.
- Keep dynamic routes static-friendly with `getStaticPaths`, typed props, and data from `src/data` or adapters in `src/lib`.
- Follow the configured `trailingSlash: "always"` behavior. Internal links should generally include the trailing slash.
- Use the `@/*` alias from `tsconfig.json` for imports inside `src`.

## React Islands

- Put hydrated React components in `src/islands`. Do not put ordinary presentational components there unless they need client execution.
- Choose hydration deliberately: `client:load` only for above-the-fold or immediately required UI, `client:visible` for deferred interactive sections, and lighter directives when interaction is not urgent.
- Keep islands self-contained. Pass small typed props instead of whole datasets unless the island owns filtering, searching, or rendering those records.
- Guard browser APIs with effects or `typeof window !== "undefined"`. Clean up event listeners, timers, GSAP timelines, and ScrollTriggers.
- Use `lucide-react` icons for React UI. Mark decorative icons with `aria-hidden="true"` and keep icon buttons labelled.

## TypeScript Standards

- The repo extends `astro/tsconfigs/strict`; keep strictness intact.
- Type all component props explicitly. In Astro, use an `interface Props` and `Astro.props`; in React, use named prop types near the component.
- Prefer `import type` for types and avoid unnecessary runtime imports.
- Avoid `any`, broad `Record<string, unknown>` data plumbing, non-null assertions, and implicit browser globals in server-rendered code.
- Keep data contracts in `src/data` and integration boundaries in `src/lib`. UI should depend on local typed contracts, not service details.
- Use `src/utils/cn.ts` (`clsx` + `tailwind-merge`) when React class composition becomes conditional or conflict-prone.

## Tailwind And CSS System

- Tailwind is 3.x. Do not use Tailwind v4 `@theme` syntax.
- Before substantial style changes, read `tailwind.config.mjs`, `src/styles/tokens.css`, `src/styles/global.css`, and the affected component.
- Prefer semantic utilities from the configured tokens: `text-primary-text`, `text-secondary-text`, `bg-page-bg`, `bg-surface`, `border-border-subtle`, `bg-action-bg`, and related variants.
- Use brand palette utilities such as `citec-ink`, `citec-cyan`, or `citec-violet` only when the brand color itself is the intent.
- Do not add raw hex values, one-off shadows, or repeated easing in page components. Promote true system decisions to `tokens.css`, `tailwind.config.mjs`, or `@layer components`.
- Use existing shared classes first: `glass-surface`, `editorial-label`, `soft-grid`, `citec-button`, `shadow-soft`, `shadow-glass`, and `ease-premium`.
- For simple spacing, sizing, alignment, and responsive fixes, edit only the affected component's Tailwind classes.
- Do not paste large repeated class walls across pages. Extract a component or shared class when repetition is meaningful.

## Design Direction

- CITEC should feel institutional, editorial, sober, and useful for Ecuador's technology ecosystem.
- Use concrete nouns and workflows: socios, ciudades, industrias, regulacion, agenda, beneficios, Pulse, eventos, afiliacion, mesas de trabajo, directorio.
- Avoid generic AI-looking gradients, decorative blobs, vague SaaS copy, nested cards, repeated eyebrow/title/three-card section formulas, and decorative wrappers without product signal.
- Keep cards purposeful, stable, and generally at `rounded-lg` or less unless an existing shared primitive requires otherwise.
- Preserve useful information density. Dashboard/tool surfaces should be quiet and scannable; landing sections should still show the real institution or workflow in the first viewport.

## GSAP, ScrollTrigger, And Lenis

- Import `gsap` and `ScrollTrigger` only from `@/lib/gsap`. Do not register `ScrollTrigger` in component files.
- Reuse `data-reveal` and `data-reveal-delay` for standard entrance motion. The shared setup lives in `src/utils/animation.ts`.
- `src/lib/lenis.ts` owns the Lenis instance and synchronizes scroll with `ScrollTrigger.update`. Do not create a second global Lenis instance.
- Respect `prefers-reduced-motion`. Reduced-motion users must see content immediately with no required animation.
- Animate transform and opacity when possible. Avoid animating layout-heavy properties that cause scroll jank.
- In React islands, create timelines inside effects, scope selectors to local refs, and clean up with `timeline.kill()`, `ctx.revert()`, or `ScrollTrigger.getAll()` only when scoped appropriately.
- Call `ScrollTrigger.refresh()` after adding reveal triggers or after layout-affecting async content. Avoid refresh loops.

## SEO Rules

- Every route must declare a specific `title` and `description` through `BaseLayout`.
- Keep canonical URLs, Open Graph, Twitter metadata, sitemap discovery, RSS discovery, manifest link, base JSON-LD, header, footer, and global wrappers in `BaseLayout`.
- Use helpers from `src/utils/seo.ts`: `absoluteUrl`, `breadcrumbJsonLd`, `itemListJsonLd`, `pulseArticleJsonLd`, `partnerOrganizationJsonLd`, `eventJsonLd`, and `faqPageJsonLd`.
- Add route-specific JSON-LD only when it describes visible content on the page.
- Keep global site metadata in `src/data/site.ts`. Do not hardcode the site URL, locale, legal name, or OG image in page components.
- Maintain generated route endpoints through `src/pages/robots.txt.ts`, `src/pages/rss.xml.ts`, and `src/pages/site.webmanifest.ts`.
- Keep sitemap priority, change frequency, and last modified policy in `astro.config.mjs` aligned with route importance.
- For article or dynamic detail routes, keep dates ISO-compatible and pass `ogType="article"`, `publishedTime`, `modifiedTime`, and `section` when appropriate.

## Accessibility Rules

- Preserve semantic landmarks: one main content area through `BaseLayout`, real headings in order, real links for navigation, and buttons for actions.
- Keep the skip link in `Header.astro` working with `#main-content`.
- Inputs and selects need visible or `sr-only` labels, not placeholder-only labels. Use `autoComplete` where it helps.
- Meaningful images need useful `alt` text. Decorative images should use empty alt text or be hidden from assistive tech.
- Icon-only controls need accessible names. Decorative icons and visual-only canvases should be `aria-hidden="true"`.
- Use `aria-current="page"` for active navigation states when implementing route-aware nav.
- Maintain visible focus states. Do not remove the global `:focus-visible` behavior.
- Verify keyboard access for menus, forms, filters, cards with stretched links, and any custom interactive element.
- Keep contrast readable against glass or muted surfaces. Text over imagery or gradients must remain legible at mobile sizes.
- Do not hide essential content behind animation, hover, pointer precision, or client hydration.
- Mobile layouts must avoid text overlap, clipped controls, unstable cards, and touch targets smaller than practical finger size.

## Performance And Assets

- Default to static Astro output and minimal hydration. Every React island should justify its client bundle.
- Keep images purposeful and inspectable. Use Astro assets or public assets consistently with the existing pattern.
- Avoid adding dependencies for UI that can be built with Astro, React, Tailwind, or existing utilities.
- Keep global CSS small and systemic. Page-specific exceptions should stay in the component unless the pattern repeats.
- Do not introduce browser-only code into server-rendered modules without guards.

## Component Placement

- `src/components/ui`: reusable primitives with stable props.
- `src/components/layout`: global shell pieces.
- `src/components/motion`: shared motion bootstraps.
- `src/components/sections`: cards or sections reused by at least two routes.
- `src/pages/_<route>/components`: route-private sections and compositions.
- `src/islands`: React client behavior.
- `src/lib`: external services, WordPress adapters, GSAP/Lenis setup, or integration boundaries.
- `src/utils`: pure helpers that do not own UI.

## Validation Checklist

Before finishing meaningful changes, check the relevant subset:

- `bun run check`
- `bun run build`
- Desktop and mobile visual QA for changed routes
- Keyboard navigation and focus states
- Reduced-motion behavior for animated changes
- SEO metadata and JSON-LD for new or changed routes
- No unintended changes in unrelated files
