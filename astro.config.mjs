// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Ruta base para GitHub Pages.
 * - Sitio de organización (repo `iglesia-gethsemani.github.io`): `/`
 * - Sitio de proyecto (repo `webside_gethsemani`): `/webside_gethsemani/`
 */
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
