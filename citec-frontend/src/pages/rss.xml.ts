import type { APIRoute } from "astro";
import { pulsePosts } from "@/data/pulse";
import { site as siteConfig } from "@/data/site";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL(siteConfig.url);
  const channelUrl = new URL("/pulse/", siteUrl).toString();
  const rssUrl = new URL("/rss.xml", siteUrl).toString();
  const latestDate = new Date(`${pulsePosts[0]?.date ?? "2026-06-09"}T00:00:00-05:00`);

  const items = pulsePosts
    .map((post) => {
      const url = new URL(`/pulse/${post.slug}/`, siteUrl).toString();
      const pubDate = new Date(`${post.date}T00:00:00-05:00`).toUTCString();

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <category>${escapeXml(post.category)}</category>
          <description>${escapeXml(post.summary)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)} Pulse</title>
    <link>${channelUrl}</link>
    <description>${escapeXml("Lecturas ejecutivas de CITEC sobre regulacion, mercado, talento e industria tech.")}</description>
    <language>es-EC</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${rssUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
};
