import type { APIRoute } from "astro";
import { site } from "@/data/site";

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: site.legalName,
      short_name: site.shortName,
      description: site.description,
      lang: site.language,
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: site.themeColor,
      icons: [
        {
          src: "/brand/citec-logo-stacked-color.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any maskable",
        },
      ],
    }),
    {
      headers: {
        "Content-Type": "application/manifest+json; charset=utf-8",
      },
    },
  );
