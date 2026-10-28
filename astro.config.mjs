// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URLs keep the WordPress shape (trailing slash) so Google keeps the pages it already ranks.
export default defineConfig({
  site: 'https://melza.eu',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !['/404', '/gracias/', '/en/thank-you/'].some((p) => new URL(page).pathname.startsWith(p)),
    }),
  ],
});
