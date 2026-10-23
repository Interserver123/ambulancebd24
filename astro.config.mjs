// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

/** /blog/ is noindex (and out of the sitemap) until a post file exists. */
const hasBlogPosts = ['en', 'bn'].some((l) => {
  try {
    return readdirSync(`./src/content/blog/${l}`).some((f) => f.endsWith('.md'));
  } catch {
    return false;
  }
});

/**
 * Sitemap lastmod = the page's own JSON-LD dateModified (the "updated" date shown on the page),
 * so the sitemap and the page never disagree. Read from dist/, which is written before the sitemap
 * integration runs. Fallbacks: /blog/ = newest post, / = last git commit to its sources. Any
 * other page without a date gets no lastmod rather than a guessed one.
 */
const lastmodFor = (/** @type {string} */ url) => {
  const path = new URL(url).pathname;
  try {
    const html = readFileSync(new URL(`./dist${path}index.html`, import.meta.url), 'utf8');
    const own = html.match(/"dateModified":"(\d{4}-\d{2}-\d{2})/)?.[1];
    if (own) return own;
  } catch {
    // fall through to the fallbacks below
  }
  if (path === '/blog/') return newestPostDate();
  if (path === '/') return gitDate(HOME_SOURCES);
  return undefined;
};

/** Home has no visible "updated" date: use the last commit that touched its sources. */
const HOME_SOURCES = [
  'src/pages/index.astro',
  'src/components/home',
  'src/data/home.ts',
  'src/data/home-warm.ts',
  'src/data/homepage.ts',
];

/** YYYY-MM-DD of the last commit touching these paths; undefined without git history. */
const gitDate = (/** @type {string[]} */ paths) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], { encoding: 'utf8' }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined;
  } catch {
    return undefined;
  }
};

/** Blog index changes when a post does: newest `updated` among published posts. */
const newestPostDate = () => {
  /** @type {string[]} */
  const dates = [];
  for (const l of ['en', 'bn']) {
    let files = [];
    try {
      files = readdirSync(`./src/content/blog/${l}`).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }
    for (const f of files) {
      const fm = readFileSync(`./src/content/blog/${l}/${f}`, 'utf8').split(/^---$/m)[1] ?? '';
      if (/^draft:\s*true\s*$/m.test(fm)) continue;
      const d = fm.match(/^updated:\s*"?(\d{4}-\d{2}-\d{2})/m)?.[1];
      if (d) dates.push(d);
    }
  }
  return dates.sort().at(-1);
};

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
      // No news, image or video entries: drop their unused namespace declarations.
      namespaces: { news: false, image: false, video: false },
      serialize(item) {
        const lastmod = lastmodFor(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: { plugins: [devTrailingSlash, tailwindcss()] },
});
