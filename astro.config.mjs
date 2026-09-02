// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://blogs.olladns.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
  devToolbar: {
    enabled: false
  },
  redirects: {
    '/blog': '/',
    '/blog/[...slug]': '/[...slug]'
  }
});
