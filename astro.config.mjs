// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync } from 'node:fs';

/** /blog/ is noindex (and out of the sitemap) until a post file exists. */
const hasBlogPosts = ['en', 'bn'].some((l) => {
  try {
    return readdirSync(`./src/content/blog/${l}`).some((f) => f.endsWith('.md'));
  } catch {
    return false;
  }
});

/**
 * Dev only: mirror Cloudflare Pages, which 308-redirects "/path" to "/path/".
 * Without this, Astro dev shows its own trailingSlash error page instead of our 404.
 * Skips files (anything with an extension) and Vite/Astro internal paths.
 */
/** @type {import('vite').Plugin} */
const devTrailingSlash = {
  name: 'dev-trailing-slash',
  apply: 'serve',
  configureServer(server) {
    // Astro unshifts its own trailingSlash check to the front of the stack after setup;
    // unshifting ours afterwards puts it in front of Astro's.
    return () => {
      server.middlewares.stack.unshift({
        route: '',
        handle: /** @type {import('vite').Connect.NextHandleFunction} */ ((req, res, next) => {
          const [path, query] = (req.url ?? '/').split(/\?(.*)/s);
          const internal = /^\/(@|_astro|node_modules|src|__)/.test(path);
          if (req.method !== 'GET' || internal || path.endsWith('/') || /\.[a-z0-9]+$/i.test(path)) return next();
          res.writeHead(308, { Location: `${path}/${query ? `?${query}` : ''}` });
          res.end();
        }),
      });
    };
  },
};

export default defineConfig({
  site: 'https://ambulancebd24.com',
  // Never change: existing URLs all end in "/". Any URL change needs a 301 in public/_redirects.
  trailingSlash: 'always',
  output: 'static',
  // CSS is small (~12KB): inline it so it never blocks first paint.
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn'],
    routing: { prefixDefaultLocale: false }, // English at /, Bangla at /bn/
  },
  integrations: [
    sitemap({
      // Design previews (and /blog/ while empty) are noindex and stay out of the sitemap.
      filter: (page) => !page.includes('/preview/') && (hasBlogPosts || !page.endsWith('/blog/')),
      i18n: { defaultLocale: 'en', locales: { en: 'en-BD', bn: 'bn-BD' } },
    }),
  ],
  vite: { plugins: [devTrailingSlash, tailwindcss()] },
});
