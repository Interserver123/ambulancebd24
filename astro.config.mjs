// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ambulancebd24.com',
  // Never change: existing URLs all end in "/". Any URL change needs a 301 in public/_redirects.
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn'],
    routing: { prefixDefaultLocale: false }, // English at /, Bangla at /bn/
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-BD', bn: 'bn-BD' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
