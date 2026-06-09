import type { APIRoute } from "astro";
import { site as siteConfig } from "@/data/site";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL(siteConfig.url);
  const sitemapUrl = new URL("/sitemap-index.xml", siteUrl).toString();

  return new Response(["User-agent: *", "Allow: /", "", `Sitemap: ${sitemapUrl}`, ""].join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
