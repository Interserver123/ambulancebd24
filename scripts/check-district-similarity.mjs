/**
 * Anti-doorway check for district pages (district brief §5, CLAUDE.md rule 5).
 *
 * Reads the built district pages (dist/, marked with data-district-page), takes the <main> body
 * text without the global blocks every page shares (reviews, NAP + map, final CTA + form) and
 * without the components the brief allows to repeat (marked data-shared: dispatch card, fare
 * promise checklist, fare factors, ambulance-type cards, FAQ call box), and
 * compares every pair with 5-word shingles (Jaccard). Fails the build above 30% overlap.
 *
 * Usage: node scripts/check-district-similarity.mjs  (after astro build)
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = process.env.DIST_DIR ?? 'dist';
const LIMIT = 0.3;
const SHINGLE = 5;

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name === 'index.html') yield p;
  }
}

/** Removes every element marked data-shared (with its children). */
function dropShared(html) {
  let out = '';
  let last = 0;
  const tag = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
  let skip = null; // { name, depth, start }
  for (let m; (m = tag.exec(html)); ) {
    const [, close, name, attrs, selfClose] = m;
    if (!skip) {
      if (!close && /\sdata-shared\b/.test(attrs) && !selfClose) {
        out += html.slice(last, m.index);
        skip = { name, depth: 1 };
      }
      continue;
    }
    if (name !== skip.name || selfClose) continue;
    skip.depth += close ? -1 : 1;
    if (skip.depth === 0) {
      last = tag.lastIndex;
      skip = null;
    }
  }
  return out + (skip ? '' : html.slice(last));
}

/** Body text of <main> without the shared global sections and shared components. */
function bodyText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  const shared = /id="(reviews-h2|contact|callback)"/;
  return dropShared(
    main
      .split(/(?=<section\b)/)
      .filter((chunk) => !shared.test(chunk))
      .join(' '),
  )
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/** District names are masked, so swapping one city name for another still counts as a copy. */
function shingles(words, names) {
  const masked = words.map((w) => (names.has(w) ? '#' : w));
  const set = new Set();
  for (let i = 0; i + SHINGLE <= masked.length; i++) set.add(masked.slice(i, i + SHINGLE).join(' '));
  return set;
}

if (!existsSync(DIST)) {
  console.error('check-district-similarity: no dist/ folder. Run astro build first.');
  process.exit(1);
}

const pages = [];
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const marker = html.match(/data-district-page="([^"]+)"/);
  if (marker) pages.push({ file, district: marker[1].toLowerCase(), words: bodyText(html) });
}
const names = new Set(pages.map((p) => p.district));
for (const p of pages) p.set = shingles(p.words, names);

let failed = 0;
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const a = pages[i].set;
    const b = pages[j].set;
    let inter = 0;
    for (const s of a) if (b.has(s)) inter++;
    const score = inter / (a.size + b.size - inter || 1);
    const line = `${pages[i].district} vs ${pages[j].district}: ${(score * 100).toFixed(1)}% overlap`;
    if (score > LIMIT) {
      failed++;
      console.error(`  FAIL ${line} (limit ${LIMIT * 100}%)`);
    } else console.log(`  ok   ${line}`);
  }
}
console.log(`check-district-similarity: ${pages.length} district page(s), ${failed} pair(s) over ${LIMIT * 100}%.`);
process.exit(failed ? 1 : 0);
