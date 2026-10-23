/**
 * Sitemap built from the finished HTML in dist/, so it can never disagree with the pages:
 *
 * - A page is listed only if it is indexable (no robots noindex) and its canonical is its own URL.
 * - hreflang alternates are copied from the page's own <link rel="alternate" hreflang> tags.
 * - lastmod is the page's JSON-LD dateModified (the "Last updated" date shown on the page).
 *   Fallbacks: /blog/ = its newest post, / = last git commit to the home sources.
 *   Any other page without a date gets no lastmod rather than a guessed one.
 *
 * Output, one file per section of the site (grouped by the page's breadcrumb trail):
 *   sitemap-index.xml → sitemap-pages.xml · sitemap-services.xml · sitemap-locations.xml · sitemap-blog.xml
 *
 * No <priority> or <changefreq>: Google ignores both. Google reads <loc>, <lastmod> and
 * xhtml:link hreflang only.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

/** Sections in index order. `match` sees the page; first match wins, `pages` catches the rest. */
const SECTIONS = [
  { name: 'services', match: (p) => p.types.has('Service') && !p.crumbs.some(isLocationHub) },
  { name: 'locations', match: (p) => isLocationHub(p.path) || p.crumbs.some(isLocationHub) },
  { name: 'blog', match: (p) => p.path === '/blog/' || p.crumbs.includes('/blog/') },
];
const LOCATION_HUBS = ['/ambulance-service-areas-dhaka/', '/locations/'];
const isLocationHub = (/** @type {string} */ path) => LOCATION_HUBS.includes(path);

/** Home has no visible "updated" date: use the last commit that touched its sources. */
const HOME_SOURCES = [
  'src/pages/index.astro',
  'src/components/home',
  'src/data/home.ts',
  'src/data/home-warm.ts',
  'src/data/homepage.ts',
];

/** @param {{ site: string }} opts @returns {import('astro').AstroIntegration} */
export default function sitemap({ site }) {
  return {
    name: 'ambulancebd24-sitemap',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const pages = htmlFiles(dist)
          .map((file) => readPage(dist, file, site))
          .filter((p) => p.indexable)
          .sort(byPath);

        if (pages.length === 0) throw new Error('sitemap: no indexable pages found in dist/');

        const blogPosts = pages.filter((p) => p.crumbs.includes('/blog/') && p.lastmod);
        for (const p of pages) {
          if (p.lastmod) continue;
          if (p.path === '/blog/') p.lastmod = latest(blogPosts.map((b) => b.lastmod));
          if (p.path === '/') p.lastmod = gitDate(HOME_SOURCES);
        }

        /** @type {Record<string, typeof pages>} */
        const groups = { pages: [] };
        for (const s of SECTIONS) groups[s.name] = [];
        for (const p of pages) groups[SECTIONS.find((s) => s.match(p))?.name ?? 'pages'].push(p);

        /** @type {{ loc: string; lastmod?: string }[]} */
        const index = [];
        for (const [name, list] of Object.entries(groups)) {
          if (list.length === 0) continue;
          const file = `sitemap-${name}.xml`;
          writeFileSync(join(dist, file), urlset(list));
          index.push({ loc: `${site}/${file}`, lastmod: latest(list.map((p) => p.lastmod)) });
        }
        writeFileSync(join(dist, 'sitemap-index.xml'), sitemapIndex(index));

        const counts = Object.entries(groups).map(([n, l]) => `${n} ${l.length}`).join(', ');
        logger.info(`sitemap-index.xml: ${pages.length} URLs (${counts})`);
      },
    },
  };
}

/** @param {string} root @param {string} [sub] @returns {string[]} */
function htmlFiles(root, sub = '') {
  return readdirSync(join(root, sub), { withFileTypes: true }).flatMap((e) => {
    const rel = join(sub, e.name);
    if (e.isDirectory()) return e.name.startsWith('_') ? [] : htmlFiles(root, rel);
    return e.name === 'index.html' ? [rel] : [];
  });
}

/** @param {string} dist @param {string} file @param {string} site */
function readPage(dist, file, site) {
  const html = readFileSync(join(dist, file), 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const path = `/${file.replace(/\\/g, '/').replace(/index\.html$/, '')}`;
  const url = `${site}${path}`;

  const robots = attrOf(head, /<meta[^>]+name="robots"[^>]*>/i, 'content') ?? '';
  const canonical = attrOf(head, /<link[^>]+rel="canonical"[^>]*>/i, 'href');
  const alternates = [...head.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="[^"]+"[^>]*>/gi)].map((m) => ({
    lang: /hreflang="([^"]+)"/.exec(m[0])?.[1] ?? '',
    href: /href="([^"]+)"/.exec(m[0])?.[1] ?? '',
  }));

  /** @type {Set<string>} */
  const types = new Set();
  /** @type {string[]} */
  let crumbs = [];
  let lastmod;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(m[1]);
    for (const node of data['@graph'] ?? [data]) {
      for (const t of [node['@type']].flat()) types.add(t);
      if (node['@type'] === 'BreadcrumbList') {
        crumbs = node.itemListElement.map((/** @type {{ item: string }} */ i) => new URL(i.item).pathname);
      }
      const d = /^\d{4}-\d{2}-\d{2}/.exec(node.dateModified ?? '')?.[0];
      if (d && node.url === url) lastmod = d;
      else if (d && !lastmod && ['WebPage', 'BlogPosting', 'ContactPage', 'CollectionPage'].includes(node['@type'])) lastmod = d;
    }
  }

  return { path, url, lastmod, alternates, types, crumbs, indexable: !/noindex/i.test(robots) && canonical === url };
}

/** @param {string} head @param {RegExp} tag @param {string} attr */
function attrOf(head, tag, attr) {
  const m = tag.exec(head);
  return m ? new RegExp(`${attr}="([^"]*)"`).exec(m[0])?.[1] : undefined;
}

/** Home and section hubs first, then by URL; Bangla pages after their section's English pages. */
const HUBS = ['/', '/blog/', ...LOCATION_HUBS];
function byPath(/** @type {{ path: string }} */ a, /** @type {{ path: string }} */ b) {
  const hub = (/** @type {string} */ p) => (HUBS.includes(p) ? HUBS.indexOf(p) : HUBS.length);
  if (hub(a.path) !== hub(b.path)) return hub(a.path) - hub(b.path);
  const bn = Number(a.path.startsWith('/bn/')) - Number(b.path.startsWith('/bn/'));
  return bn || a.path.localeCompare(b.path);
}

/** @param {(string | undefined)[]} dates */
function latest(dates) {
  return dates.filter(Boolean).sort().at(-1);
}

/** YYYY-MM-DD of the last commit touching these paths; undefined without git history. */
function gitDate(/** @type {string[]} */ paths) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], { encoding: 'utf8' }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined;
  } catch {
    return undefined;
  }
}

const esc = (/** @type {string} */ s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** @param {ReturnType<typeof readPage>[]} pages */
function urlset(pages) {
  const urls = pages.map((p) =>
    [
      '  <url>',
      `    <loc>${esc(p.url)}</loc>`,
      ...(p.lastmod ? [`    <lastmod>${p.lastmod}</lastmod>`] : []),
      ...p.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${esc(a.lang)}" href="${esc(a.href)}"/>`),
      '  </url>',
    ].join('\n'),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

/** @param {{ loc: string; lastmod?: string }[]} maps */
function sitemapIndex(maps) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...maps.map((m) =>
      ['  <sitemap>', `    <loc>${esc(m.loc)}</loc>`, ...(m.lastmod ? [`    <lastmod>${m.lastmod}</lastmod>`] : []), '  </sitemap>'].join('\n'),
    ),
    '</sitemapindex>',
    '',
  ].join('\n');
}
