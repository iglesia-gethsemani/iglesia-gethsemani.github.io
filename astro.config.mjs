// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: 'https://iglesia-gethsemani.github.io',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
