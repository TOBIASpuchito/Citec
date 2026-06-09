# CITEC Frontend

Base profesional para el hub digital de CITEC, construida con Astro, React Islands, TypeScript, TailwindCSS, GSAP, ScrollTrigger, Lenis y Lucide React.

## Stack

- Astro para rutas, SEO, layouts y contenido estatico.
- React Islands para directorio, formulario e interacciones con estado.
- TailwindCSS para tokens visuales, responsive y estados.
- GSAP + ScrollTrigger para reveals y microinteracciones.
- Lenis para smooth scrolling global integrado con ScrollTrigger.

## Estructura

```txt
src/
  assets/
  components/
  data/
  islands/
  layouts/
  lib/
  pages/
  styles/
  utils/
```

## Rutas

- `/`
- `/la-citec/`
- `/socios/`
- `/socios/[slug]/`
- `/pulse/`
- `/pulse/[slug]/`
- `/beneficios/`
- `/eventos/`
- `/radarindustriatech/`
- `/unete/`

## Datos y WordPress futuro

El proyecto usa datos mock tipados en `src/data`. La capa `src/lib/wordpress.ts` centraliza funciones placeholder (`getPartners`, `getPulse`, `getEvents`, etc.) para reemplazar luego por WordPress REST API, GraphQL o una fuente headless equivalente.

## Comandos

```bash
bun run dev
bun run check
bun run build
```

## Motion y accesibilidad

Lenis se inicializa desde `src/lib/lenis.ts` y actualiza ScrollTrigger. Los reveals usan `data-reveal` y respetan `prefers-reduced-motion`.
