import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { isUnverified } from './src/content-status.mjs';

// The public address of the site. Change this one line when the custom domain is live
// (for example 'https://neukee.dev'); canonical links, Open Graph tags, structured data,
// the sitemap, robots.txt and llms.txt all derive from it.
const SITE_URL = 'https://neukee.github.io';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    // Pages still under technical review stay out of the sitemap.
    sitemap({ filter: (page) => !isUnverified(new URL(page).pathname) }),
  ],
});
