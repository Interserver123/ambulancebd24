#!/usr/bin/env node
/**
 * SEO QA on the production build (dist/). Run after `astro build`:
 *
 *   node scripts/seo-check.mjs            checks, exits 1 on any error
 *   node scripts/seo-check.mjs --report   also prints the route inventory
 *
 * Checks every HTML page for: title/description (present, unique, length), canonical
 * (absolute, self-referencing, https, trailing slash, no query/fragment), robots vs
 * canonical consistency, <html lang>, exactly one <h1>, landmarks, img alt/width/height,
 * JSON-LD (parses, one graph, @id/url consistency, no aggregateRating/Review), OG/Twitter
 * tags, hreflang reciprocity, internal links (target exists, no "#"/javascript:),
 * sitemap (only canonical indexable pages, all indexable pages listed), robots.txt
 * (sitemap line, no site-wide disallow), llms.txt (links resolve to indexable pages) and _redirects (no chains, loops or redirected
 * URLs that also exist as pages). Content rules (YMYL wording) live in lint-content.mjs.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const SITE = 'https://ambulancebd24.com';
const REPORT = process.argv.includes('--report');

const errors = [];
const warns = [];
const err = (url, rule, msg) => errors.push(`${url}  [${rule}]  ${msg}`);
const warn = (url, rule, msg) => warns.push(`${url}  [${rule}]  ${msg}`);

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run astro build first.');
  process.exit(1);
}

const walk = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const toUrl = (f) => {
  const r = relative(DIST, f).split(sep).join('/');
  if (r === '404.html') return '/404/';
  return `/${r.replace(/index\.html$/, '')}`;
};
const exists = new Set(htmlFiles.map(toUrl));
const assetPaths = new Set(files.filter((f) => !f.endsWith('.html')).map((f) => `/${relative(DIST, f).split(sep).join('/')}`));

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, 'i'))?.[1];
const metas = (h, key, val) => [...h.matchAll(new RegExp(`<meta\\b[^>]*\\b${key}="${val}"[^>]*>`, 'gi'))].map((m) => attr(m[0], 'content'));
const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const pages = [];
for (const f of htmlFiles) {
  const url = toUrl(f);
  const h = readFileSync(f, 'utf8');
  const head = h.split(/<\/head>/i)[0];
  const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((m) => decode(m[1]).trim());
  const descs = metas(head, 'name', 'description');
  const robots = metas(head, 'name', 'robots');
  const canons = [...head.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)].map((m) => attr(m[0], 'href'));
  const noindex = robots.some((r) => /noindex/i.test(r ?? ''));
  const p = { url, file: f, title: titles[0], desc: decode(descs[0] ?? ''), noindex, canonical: canons[0], h, head, lang: h.match(/<html\b[^>]*\blang="([^"]*)"/i)?.[1] };
  pages.push(p);

  // Title / description
  if (titles.length !== 1) err(url, 'title', `${titles.length} <title> tags`);
  else if ([...p.title].length > 60) err(url, 'title', `${[...p.title].length} chars (max 60)`);
  else if ([...p.title].length < 15) warn(url, 'title', 'very short');
  if (descs.length !== 1) err(url, 'description', `${descs.length} meta descriptions`);
  else if ([...p.desc].length > 155) err(url, 'description', `${[...p.desc].length} chars (max 155)`);
  else if ([...p.desc].length < 50) warn(url, 'description', 'very short');
  if (robots.length > 1) err(url, 'robots', 'more than one robots meta');

  // Canonical
  if (noindex) {
    if (canons.length) err(url, 'canonical', 'noindex page has a canonical (conflicting signals)');
  } else if (canons.length !== 1) err(url, 'canonical', `${canons.length} canonical tags`);
  else {
    const c = canons[0];
    if (c !== `${SITE}${url}`) err(url, 'canonical', `not self-referencing: ${c}`);
    if (/[?#]/.test(c) || /[A-Z]/.test(new URL(c).pathname)) err(url, 'canonical', `query, fragment or uppercase: ${c}`);
  }

  // Language, headings, landmarks
  if (!p.lang) err(url, 'lang', 'missing <html lang>');
  const h1 = (h.match(/<h1\b/gi) ?? []).length;
  if (h1 !== 1) err(url, 'h1', `${h1} <h1> tags`);
  for (const lm of ['header', 'main', 'footer']) if (!new RegExp(`<${lm}\\b`, 'i').test(h)) warn(url, 'landmark', `no <${lm}>`);
  if ((h.match(/<main\b/gi) ?? []).length > 1) err(url, 'landmark', 'more than one <main>');

  // Images
  for (const m of h.matchAll(/<img\b[^>]*>/gi)) {
    const t = m[0];
    // alt may be valueless (alt / alt="") for decorative images; it only has to be present.
    if (!/\salt(\s|=|>|\/)/i.test(t)) err(url, 'img-alt', `no alt: ${attr(t, 'src')}`);
    if (!attr(t, 'width') || !attr(t, 'height')) err(url, 'img-size', `no width/height: ${attr(t, 'src')}`);
  }

  // Open Graph / Twitter (indexable pages)
  if (!noindex) {
    for (const k of ['og:title', 'og:description', 'og:url', 'og:type', 'og:image']) if (!metas(head, 'property', k).length) err(url, 'og', `missing ${k}`);
    const ogUrl = metas(head, 'property', 'og:url')[0];
    if (ogUrl && ogUrl !== p.canonical) err(url, 'og', `og:url ${ogUrl} differs from canonical`);
    const ogImg = metas(head, 'property', 'og:image')[0];
    if (ogImg && !/^https:\/\//.test(ogImg)) err(url, 'og', `og:image not absolute: ${ogImg}`);
    if (ogImg?.startsWith(SITE) && !assetPaths.has(new URL(ogImg).pathname)) err(url, 'og', `og:image file missing in dist: ${ogImg}`);
    if (!metas(head, 'name', 'twitter:card').length) err(url, 'twitter', 'missing twitter:card');
  }

  // JSON-LD
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (!noindex && blocks.length === 0) err(url, 'jsonld', 'no JSON-LD');
  if (blocks.length > 1) err(url, 'jsonld', `${blocks.length} JSON-LD blocks (use one @graph)`);
  for (const b of blocks) {
    let j;
    try {
      j = JSON.parse(b[1]);
    } catch (e) {
      err(url, 'jsonld', `invalid JSON: ${e.message}`);
      continue;
    }
    const nodes = j['@graph'] ?? [j];
    p.types = nodes.map((n) => n['@type']);
    const ids = nodes.map((n) => n['@id']).filter(Boolean);
    if (new Set(ids).size !== ids.length) err(url, 'jsonld', 'duplicate @id in graph');
    if (/aggregateRating|"@type":\s*"Review"/i.test(b[1])) err(url, 'jsonld', 'aggregateRating/Review present');
    for (const n of nodes) {
      if (n['@type'] === 'WebPage' || n['@type'] === 'ContactPage' || n['@type'] === 'CollectionPage') {
        if (n.url && n.url !== p.canonical) err(url, 'jsonld', `${n['@type']}.url ${n.url} differs from canonical`);
      }
      if (n['@type'] === 'BreadcrumbList') {
        const last = n.itemListElement?.at(-1)?.item;
        if (last && last !== p.canonical) err(url, 'jsonld', `breadcrumb last item ${last} is not this page`);
      }
    }
    for (const m of b[1].matchAll(/"(https:\/\/ambulancebd24\.com\/[^"#]*)/g)) {
      const path = new URL(m[1]).pathname;
      if (path.endsWith('/') && !exists.has(path)) err(url, 'jsonld', `links to missing page ${path}`);
      else if (!path.endsWith('/') && !assetPaths.has(path)) err(url, 'jsonld', `links to missing file ${path}`);
    }
  }

  // Internal links
  p.links = new Set();
  for (const m of h.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(m[0], 'href');
    if (href === undefined) continue;
    if (href === '#' || /^javascript:/i.test(href)) err(url, 'link', `bad href "${href}"`);
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const path = href.split(/[?#]/)[0];
    if (!path) continue;
    if (/\.[a-z0-9]+$/i.test(path)) {
      if (!assetPaths.has(path)) err(url, 'link', `missing file ${path}`);
    } else if (!path.endsWith('/')) err(url, 'link', `no trailing slash: ${href}`);
    else if (!exists.has(path)) err(url, 'link', `broken internal link ${path}`);
    p.links.add(path);
  }
}

// Duplicate titles / descriptions among indexable pages
const indexable = pages.filter((p) => !p.noindex);
for (const key of ['title', 'desc']) {
  const seen = new Map();
  for (const p of indexable) seen.set(p[key], [...(seen.get(p[key]) ?? []), p.url]);
  for (const [v, urls] of seen) if (urls.length > 1) err(urls.join(' + '), `duplicate-${key}`, v);
}

// hreflang reciprocity (only where alternates exist)
const byUrl = new Map(pages.map((p) => [p.url, p]));
for (const p of indexable) {
  const alts = [...p.head.matchAll(/<link\b[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*>/gi)].map((m) => ({ lang: m[1], href: attr(m[0], 'href') }));
  if (!alts.length) continue;
  const self = alts.find((a) => a.href === p.canonical);
  if (!self) err(p.url, 'hreflang', 'no self-referencing hreflang');
  for (const a of alts) {
    if (a.lang === 'x-default') continue;
    const other = byUrl.get(new URL(a.href).pathname);
    if (!other) {
      err(p.url, 'hreflang', `alternate ${a.href} does not exist`);
      continue;
    }
    if (other !== p && !other.head.includes(`href="${p.canonical}"`)) err(p.url, 'hreflang', `${a.href} does not link back`);
  }
  if (alts.length === 2 && alts.some((a) => a.lang === 'x-default') && self) warn(p.url, 'hreflang', 'hreflang with no real alternate');
}

// Orphans: indexable pages with no internal link in
const linkedTo = new Set(pages.flatMap((p) => [...p.links].filter((l) => l !== p.url)));
for (const p of indexable) if (p.url !== '/' && !linkedTo.has(p.url)) err(p.url, 'orphan', 'no internal links point here');

// Sitemap
const smIndex = join(DIST, 'sitemap-index.xml');
const smUrls = new Set();
if (!existsSync(smIndex)) err('/sitemap-index.xml', 'sitemap', 'missing');
else {
  for (const m of readFileSync(smIndex, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const file = join(DIST, new URL(m[1]).pathname);
    if (!existsSync(file)) err('/sitemap-index.xml', 'sitemap', `child sitemap missing: ${m[1]}`);
    else
      for (const u of readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
        if (smUrls.has(u[1])) err(u[1], 'sitemap', 'listed more than once');
        smUrls.add(u[1]);
      }
  }
  for (const u of smUrls) {
    const page = byUrl.get(new URL(u).pathname);
    if (!page) err(u, 'sitemap', 'listed but not built');
    else if (page.noindex) err(u, 'sitemap', 'listed but noindex');
    else if (page.canonical !== u) err(u, 'sitemap', `listed URL is not the canonical (${page.canonical})`);
  }
  for (const p of indexable) if (!smUrls.has(p.canonical)) err(p.url, 'sitemap', 'indexable page missing from sitemap');
}

// robots.txt
const robotsFile = join(DIST, 'robots.txt');
if (!existsSync(robotsFile)) err('/robots.txt', 'robots', 'missing');
else {
  const r = readFileSync(robotsFile, 'utf8');
  if (!/^Sitemap:\s*https:\/\/ambulancebd24\.com\/sitemap-index\.xml\s*$/im.test(r)) err('/robots.txt', 'robots', 'no Sitemap line for sitemap-index.xml');
  const groups = r.split(/\n(?=User-agent:)/i);
  for (const g of groups) if (/User-agent:\s*\*/i.test(g) && /^Disallow:\s*\/\s*$/im.test(g)) err('/robots.txt', 'robots', 'site-wide Disallow for all crawlers');
}

// llms.txt: every listed site URL must be a live, indexable page
const llmsFile = join(DIST, 'llms.txt');
if (!existsSync(llmsFile)) err('/llms.txt', 'llms', 'missing');
else {
  for (const m of readFileSync(llmsFile, 'utf8').matchAll(/\]\((https:\/\/ambulancebd24\.com\/[^)]*)\)/g)) {
    const page = byUrl.get(new URL(m[1]).pathname);
    if (!page) err('/llms.txt', 'llms', `links to missing page ${m[1]}`);
    else if (page.noindex) err('/llms.txt', 'llms', `links to noindex page ${m[1]}`);
  }
}

// _redirects: chains, loops, sources that are live pages
const redirFile = join(DIST, '_redirects');
if (existsSync(redirFile)) {
  const rules = readFileSync(redirFile, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(/\s+/));
  const map = new Map(rules.map(([from, to]) => [from, to]));
  for (const [from, to, code] of rules) {
    if (!['301', '308'].includes(code)) warn(from, 'redirect', `status ${code} (permanent moves should be 301)`);
    if (exists.has(from)) err(from, 'redirect', 'source is also a live page');
    if (map.has(to)) err(from, 'redirect', `chain: ${from} -> ${to} -> ${map.get(to)}`);
    const target = to.split(/[?#]/)[0];
    if (to.startsWith('/') && !exists.has(target) && !assetPaths.has(target)) err(from, 'redirect', `target ${to} does not exist`);
    if (from === to) err(from, 'redirect', 'loop');
  }
}

// 404 page
const nf = byUrl.get('/404/');
if (!nf) err('/404/', '404', 'no 404.html');
else if (!nf.noindex) err('/404/', '404', '404 page is indexable');

if (REPORT) {
  console.log('Route inventory (all static, prerendered):');
  for (const p of pages.sort((a, b) => a.url.localeCompare(b.url))) {
    console.log(`  ${p.url.padEnd(62)} ${p.noindex ? 'noindex' : 'index  '} ${p.lang} ${(p.types ?? []).join('+')}`);
  }
}
for (const w of warns) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`seo-check: ${pages.length} pages, ${indexable.length} indexable, ${smUrls.size} in sitemap. ${errors.length} error(s), ${warns.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
