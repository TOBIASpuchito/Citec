import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const lastmod = '2026-06-09T00:00:00.000Z';

function withSitemapMetadata(item) {
  const pathname = new URL(item.url).pathname;

  item.lastmod = lastmod;

  if (pathname === '/') {
    item.changefreq = ChangeFreqEnum.WEEKLY;
    item.priority = 1;
    return item;
  }

  if (pathname.startsWith('/pulse/')) {
    item.changefreq = ChangeFreqEnum.WEEKLY;
    item.priority = pathname === '/pulse/' ? 0.9 : 0.78;
    return item;
  }

  if (pathname.startsWith('/socios/')) {
    item.changefreq = ChangeFreqEnum.WEEKLY;
    item.priority = pathname === '/socios/' ? 0.9 : 0.72;
    return item;
  }

  if (pathname === '/unete/' || pathname === '/beneficios/') {
    item.changefreq = ChangeFreqEnum.MONTHLY;
    item.priority = 0.86;
    return item;
  }

  item.changefreq = ChangeFreqEnum.MONTHLY;
  item.priority = 0.74;
  return item;
}

export default defineConfig({
  site: 'https://citec.ec',
  trailingSlash: 'always',
  integrations: [react(), tailwind({ applyBaseStyles: false }), sitemap({ serialize: withSitemapMetadata })],
});
