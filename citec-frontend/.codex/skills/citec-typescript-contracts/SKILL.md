---
name: citec-typescript-contracts
description: TypeScript estricto y contratos de datos para CITEC. Use when Codex creates, edits, or reviews TypeScript types, Astro props, React props, data modules, integration boundaries, SEO helpers, utility functions, or strict typing issues in the CITEC frontend.
---

# CITEC TypeScript Contracts

Use this skill when work touches `.ts`, `.tsx`, typed Astro props, data contracts, helpers, or integration boundaries.

## Workflow

1. Read the local types and data source before editing UI that consumes them.
2. Keep data contracts in `src/data` and integration boundaries in `src/lib`.
3. Type Astro props with `interface Props` and `Astro.props`.
4. Type React props with named prop types near the component.
5. Prefer `import type` for type-only imports.
6. Use narrow unions, explicit interfaces, and domain-specific types over broad plumbing.
7. Keep utilities pure in `src/utils` unless they intentionally wrap browser or service behavior.
8. Validate with `bun run check` after TypeScript, Astro, route, prop, or integration changes.

## Rules

- Do not use `any` unless the boundary truly cannot be typed and the reason is documented locally.
- Do not use broad `Record<string, unknown>` as a substitute for a data contract.
- Do not use non-null assertions to silence uncertain data flow.
- Do not import service details directly into UI when a typed adapter or data module should own the boundary.
- Do not introduce implicit browser globals in server-rendered code.

## CITEC Data Shape

- Prefer concrete civic and technology nouns in types and data: partner, city, industry, regulation, event, benefit, Pulse article, working group, directory entry.
- Keep dates ISO-compatible for articles, events, feeds, sitemap metadata, and JSON-LD.
