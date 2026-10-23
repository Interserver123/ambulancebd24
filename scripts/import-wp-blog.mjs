#!/usr/bin/env node
/**
 * One-off migration: WordPress blog (ambulancebd24.com) -> src/content/blog/en/*.md
 *
 *   node scripts/import-wp-blog.mjs
 *
 * - Text is kept as published; HTML is converted to Markdown (tables kept).
 * - Images: only files uploaded to ambulancebd24.com are downloaded (src/assets/blog/).
 *   Images hot-linked from other sites are left out (not ours to rehost; brand rule: no stock).
 * - Links: old ambulancebd24.com URLs are rewritten to the new site's paths. Links to pages
 *   that do not exist on the new site are unwrapped to plain text (no broken links).
 * - Each post keeps its live URL (/<wp-slug>/). Posts that fail the content linter are
 *   switched to draft by the second pass (see the report at the end).
 * - Re-running overwrites the generated files.
 */
import { mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'src', 'content', 'blog', 'en');
const IMG = join(ROOT, 'src', 'assets', 'blog');
const API = 'https://ambulancebd24.com/wp-json/wp/v2';
const UA = { 'User-Agent': 'Mozilla/5.0 (AmbulanceBD24 site migration)' };

/** Duplicate posts: the newer copy 301s to the older original (public/_redirects). */
const SKIP = new Map([['how-many-ambulances-does-a-hospital', 'how-many-ambulances-does-a-hospital-have']]);

/** Old WordPress paths -> new site paths. */
const LINK_MAP = {
  '/': '/',
  '/blog/': '/blog/',
  '/contact/': '/contact/',
  '/ac-ambulance/': '/ac-ambulance-service/',
  '/ac-ambulance-service/': '/ac-ambulance-service/',
  '/icu-ambulance-service/': '/icu-ambulance-service-dhaka/',
  '/icu-ambulance-service-dhaka/': '/icu-ambulance-service-dhaka/',
  '/nicu-ambulance-service-dhaka/': '/nicu-ambulance-service-dhaka/',
  '/freezer-ambulance/': '/freezer-ambulance-service/',
  '/freezer-ambulance-service/': '/freezer-ambulance-service/',
  '/air-ambulance-services/': '/air-ambulance-service-bangladesh/',
  // Area and district pages are not built yet: point to the hub until they are.
  '/ambulance-service-gulshan/': '/ambulance-service-areas-dhaka/',
  '/ambulance-service-mirpur/': '/ambulance-service-areas-dhaka/',
  '/ambulance-service-in-chittagong/': '/inter-district-ambulance-service/',
  '/ambulance-service-khulna/': '/inter-district-ambulance-service/',
  '/ambulance-service-rajshahi/': '/inter-district-ambulance-service/',
  '/ambulance-service-madaripur/': '/inter-district-ambulance-service/',
};

/** Money page per topic (first match wins). Every post links to at least one. */
const MONEY = [
  [/nicu|newborn|neonat|premature/i, '/nicu-ambulance-service-dhaka/'],
  [/\bicu\b|intensive care|cardiac|heart attack|ccu/i, '/icu-ambulance-service-dhaka/'],
  [/air ambulance/i, '/air-ambulance-service-bangladesh/'],
  [/freezer|dead body|lash/i, '/freezer-ambulance-service/'],
  [/khulna|chittagong|rajshahi|district/i, '/inter-district-ambulance-service/'],
  [/hospital|dhaka/i, '/ambulance-service-areas-dhaka/'],
];

const decode = (s) =>
  s
    .replace(/&#8217;|&#039;|&rsquo;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&nbsp;| |�/g, ' ')
    .replace(/&#8230;|&hellip;/g, '…')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

const titleCase = (s) => s.replace(/\bnicu\b/gi, 'NICU').replace(/\bicu\b/gi, 'ICU').replace(/^./, (c) => c.toUpperCase());

/** <= max chars, cut at a word boundary. */
function fit(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,:;–-]+$/, '')}…`;
}

/** Meta title <= 60: full title + brand if it fits, else the question part, else a word-safe cut. */
function metaTitle(title) {
  const brand = ' | Ambulance BD 24';
  if ((title + brand).length <= 60) return title + brand;
  if (title.length <= 60) return title;
  const head = title.split(/(?<=[?!:])\s/)[0].replace(/:$/, '').trim();
  if (head.length >= 20 && head.length <= 60) return head;
  return fit(title, 60);
}

function metaDescription(excerptHtml, fallback) {
  const t = decode(excerptHtml.replace(/<[^>]+>/g, ' ')).replace(/\s*\[…\]$/, '').replace(/…$/, '');
  const base = t.length >= 50 ? t : fallback;
  if (base.length <= 155) return base;
  const sentences = base.match(/[^.!?]+[.!?]/g) ?? [];
  let out = '';
  for (const s of sentences) {
    if ((out + s).trim().length > 155) break;
    out = (out + s).trim();
  }
  return out.length >= 50 ? out : fit(base, 155);
}

const yaml = (s) => JSON.stringify(s);

async function getJson(url) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

async function download(url, slug, i) {
  const clean = url.split('?')[0];
  const ext = extname(clean).toLowerCase() || '.jpg';
  const name = `${slug}-${i}${ext === '.jpeg' ? '.jpg' : ext}`;
  const dest = join(IMG, name);
  if (!existsSync(dest)) {
    // Prefer the full-size original over WordPress's "-1024x683" resize.
    const full = clean.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
    let r = await fetch(full, { headers: UA });
    if (!r.ok) r = await fetch(clean, { headers: UA });
    if (!r.ok) return undefined;
    writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  }
  return name;
}

const report = { posts: [], droppedImages: [], unwrapped: [], skipped: [] };

const posts = await getJson(`${API}/posts?per_page=100&_fields=id,date,modified,slug,title,content,excerpt,featured_media`);
const mediaIds = posts.map((p) => p.featured_media).filter(Boolean);
const media = mediaIds.length ? await getJson(`${API}/media?per_page=100&include=${mediaIds.join(',')}&_fields=id,source_url,alt_text`) : [];
const mediaById = new Map(media.map((m) => [m.id, m]));
const liveSlugs = new Set(posts.map((p) => p.slug).filter((s) => !SKIP.has(s)));

// The imported posts were edited afterwards to follow the YMYL rules. Re-importing would
// overwrite those edits, so it needs an explicit --force.
if (existsSync(OUT) && !process.argv.includes('--force')) {
  console.error('src/content/blog/en/ already has posts (edited after import). Re-run with --force to overwrite them.');
  process.exit(1);
}
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
mkdirSync(IMG, { recursive: true });

for (const p of posts) {
  if (SKIP.has(p.slug)) {
    report.skipped.push(`/${p.slug}/ -> /${SKIP.get(p.slug)}/ (duplicate)`);
    continue;
  }
  const title = titleCase(decode(p.title.rendered));
  let html = p.content.rendered;

  // Images: keep own uploads, drop hot-linked ones.
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  let n = 0;
  for (const [tag] of imgs) {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1] ?? '';
    const alt = decode(tag.match(/\salt="([^"]*)"/)?.[1] ?? '');
    if (/^https?:\/\/(www\.)?ambulancebd24\.com\/wp-content\/uploads\//.test(src)) {
      const file = await download(src, p.slug, ++n);
      html = html.replace(tag, file ? `<img src="../../../assets/blog/${file}" alt="${alt || title}">` : '');
    } else {
      report.droppedImages.push(`/${p.slug}/: ${src}`);
      html = html.replace(tag, '');
    }
  }
  // Drop empty figures/captions left behind.
  html = html.replace(/<figure\b[^>]*>\s*(?:<a[^>]*>\s*<\/a>)?\s*(?:<figcaption[^>]*>[\s\S]*?<\/figcaption>)?\s*<\/figure>/gi, '');

  // Links: map our old URLs to new paths; unwrap anything that would 404.
  html = html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (whole, attrs, inner) => {
    const href = attrs.match(/href="([^"]*)"/)?.[1];
    if (!href) return inner; // <a> without href
    const own = href.match(/^(?:https?:\/\/(?:www\.)?ambulancebd24\.com)?(\/[^"#?]*)?([#?].*)?$/i);
    if (own && (href.startsWith('/') || /ambulancebd24\.com/i.test(href))) {
      let path = (own[1] || '/').replace(/\.$/, '');
      if (!path.endsWith('/')) path += '/';
      const slug = path.replace(/^\/|\/$/g, '');
      const target = LINK_MAP[path] ?? (liveSlugs.has(slug) ? path : SKIP.has(slug) ? `/${SKIP.get(slug)}/` : undefined);
      if (!target) {
        report.unwrapped.push(`/${p.slug}/: ${href}`);
        return inner;
      }
      return `<a href="${target}">${inner}</a>`;
    }
    // Our own hotline, in any format, becomes the canonical tel: link.
    if (/^tel:/i.test(href) && href.replace(/\D/g, '').endsWith('1919339689')) return `<a href="tel:+8801919339689">${inner}</a>`;
    if (/^https?:\/\//i.test(href)) return `<a href="${href}">${inner}</a>`;
    report.unwrapped.push(`/${p.slug}/: ${href}`);
    return inner;
  });

  // H1 belongs to the page title; demote any in the body.
  html = html.replace(/<(\/?)h1\b/gi, '<$1h2');

  const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' });
  td.use(gfm);
  td.remove(['script', 'style', 'iframe', 'noscript']);
  let md = td
    .turndown(html)
    .replace(/ /g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Cover: featured image if it is our own upload.
  let cover;
  let coverAlt;
  const fm = mediaById.get(p.featured_media);
  if (fm && /ambulancebd24\.com\/wp-content\/uploads\//.test(fm.source_url)) {
    const file = await download(fm.source_url, p.slug, 'cover');
    if (file) {
      cover = `../../../assets/blog/${file}`;
      coverAlt = decode(fm.alt_text || '') || title;
    }
  }

  const plain = md.replace(/[#*_>`[\]()!|-]/g, ' ');
  const money = MONEY.find(([re]) => re.test(`${title} ${plain.slice(0, 3000)}`))?.[1] ?? '/';
  const desc = metaDescription(p.excerpt.rendered, fit(decode(plain), 155));
  const mt = metaTitle(title);

  const fmLines = [
    '---',
    `lang: en`,
    `translationKey: ${p.slug}`,
    `slug: /${p.slug}/`,
    `metaTitle: ${yaml(mt)}`,
    `metaDescription: ${yaml(desc)}`,
    `h1: ${yaml(title)}`,
    `author: "Ambulance BD 24 team"`,
    `published: ${p.date.slice(0, 10)}`,
    `updated: ${p.modified.slice(0, 10)}`,
    ...(cover ? [`cover: ${yaml(cover)}`, `coverAlt: ${yaml(coverAlt)}`] : []),
    `moneyPages:`,
    `  - ${money}`,
    `wpId: ${p.id}`,
    `draft: false`,
    '---',
    '',
  ];
  writeFileSync(join(OUT, `${p.slug}.md`), `${fmLines.join('\n')}${md}\n`);
  report.posts.push({ slug: p.slug, title, metaTitle: mt, shortened: mt !== `${title} | Ambulance BD 24` && mt !== title, images: n, cover: Boolean(cover) });
}

writeFileSync(join(ROOT, 'scripts', 'import-wp-blog.report.json'), JSON.stringify(report, null, 2));
console.log(`Imported ${report.posts.length} posts, skipped ${report.skipped.length} duplicate(s).`);
console.log(`Own images kept: ${report.posts.reduce((a, p) => a + p.images, 0)} inline, ${report.posts.filter((p) => p.cover).length} covers.`);
console.log(`Hot-linked images left out: ${report.droppedImages.length}. Links unwrapped: ${report.unwrapped.length}.`);
console.log('Details: scripts/import-wp-blog.report.json');
