#!/usr/bin/env node
/**
 * Content linter for ambulancebd24.com (YMYL rules from CLAUDE.md + docs/brand-deck.md).
 *
 *   npm run lint:content         checks src/content and source code
 *   node scripts/lint-content.mjs --dist   also checks the built HTML in dist/
 *
 * Exits 1 on any error. Warnings never fail the build.
 * Claim gates (in writing, crew on board, equipment, backup line) are read
 * from src/data/business.ts, so flipping a flag there unlocks the wording.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT = join(ROOT, 'src', 'content');
const DIST = join(ROOT, 'dist');
const CHECK_DIST = process.argv.includes('--dist');

// Node strips the types from business.ts on import (erasable TS only).
const { business, copy, services } = await import(pathToFileURL(join(ROOT, 'src', 'data', 'business.ts')).href);
const gates = business.claims;

/* ------------------------------------------------------------------ */
/* Reporting                                                           */
/* ------------------------------------------------------------------ */

const errors = [];
const warnings = [];
const rel = (f) => relative(ROOT, f).split(sep).join('/');

function report(level, file, line, rule, msg) {
  (level === 'error' ? errors : warnings).push({ file: rel(file), line, rule, msg });
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function walk(dir, exts) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, exts));
    else if (exts.includes(extname(name))) out.push(p);
  }
  return out;
}

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const toLatinDigits = (s) => s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));

const PHONE_FORMS = new Set([business.phone.display, business.phone.e164, business.phone.e164.slice(1)]);
const OUR_DIGITS = business.phone.e164.replace(/\D/g, '').slice(-10); // 1919339689

/** Finds phone-like digit runs; returns problems for any non-canonical one. */
function phoneProblems(text) {
  const problems = [];
  for (const m of text.matchAll(/\+?[\d০-৯][\d০-৯ -]{8,}[\d০-৯]/g)) {
    const token = m[0].trim();
    const digits = toLatinDigits(token).replace(/\D/g, '');
    const isOurs = digits.endsWith(OUR_DIGITS) && digits.length <= 13;
    const isBdMobile = /^(?:880)?0?1[3-9]\d{8}$/.test(digits);
    if (isOurs && !PHONE_FORMS.has(token)) {
      problems.push(`Phone "${token}" is not canonical. Use ${business.phone.display} (display) or ${business.phone.e164} (links/schema), Latin digits only.`);
    } else if (!isOurs && isBdMobile) {
      problems.push(`Unknown phone number "${token}". Only the number in business.ts may appear.`);
    }
  }
  return problems;
}

function stripPhones(text) {
  let t = text;
  for (const f of PHONE_FORMS) t = t.split(f).join(' ');
  return t;
}

const APPROVED_TIMING = copy.timingLine.en;
const FREEZER_BN = services.find((s) => s.key === 'freezer').bn; // the service name may always appear

/* ------------------------------------------------------------------ */
/* Text rules (run on content lines and on built page text)            */
/* ------------------------------------------------------------------ */

/**
 * Each rule: { id, re, msg, level?, when?(ctx), skipQuote? }
 * ctx = { lang, voice, serviceKey, key, inQuote }
 */
const RULES = [
  { id: 'guaranteed', re: /\bguarantee[sd]?\b|গ্যারান্টি/i, msg: 'No guarantees (YMYL).' },
  {
    id: 'superlative',
    re: /\b(best|fastest|no\.?\s?1|number\s+one|top[- ]rated)\b|#1\b|সেরা|এক নম্বর|১ নম্বর|সবচেয়ে দ্রুত/i,
    msg: '"best / No.1 / fastest" are not allowed as our own claim. Only inside an attributed customer quote (> blockquote).',
    skipQuote: true,
  },
  { id: 'cheapest', re: /\bcheapest\b|সবচেয়ে সস্তা/i, msg: 'Never claim "cheapest", not even in a quote.' },
  {
    id: 'discount',
    re: /\b(discount(s|ed)?|promo(tion(al)?)?s?|coupons?|special offers?|limited[- ]time|\d+\s?% off)\b|ডিসকাউন্ট|অফার|কুপন/i,
    msg: 'No discounts or offers.',
  },
  {
    id: 'timing',
    re: /\b\d+\s*(?:(?:-|–|to)\s*\d+\s*)?(?:mins?|minutes?)\b|\bavg\b|average response|মিনিট/i,
    msg: `Only the approved timing claim: "${APPROVED_TIMING}" ("around 10 minutes … depending on traffic" in one sentence). No Bangla timing line approved yet.`,
    // The approved claim may be phrased inside a longer sentence, but must keep "around" and the traffic qualifier.
    prep: (t) => t.split(APPROVED_TIMING).join(' ').replace(/\baround 10 minutes\b[^.!?]*?\bdepending on traffic\b/gi, ' '),
  },
  {
    id: 'hours',
    re: /\bmon(day)?\s*[–-]\s*fri(day)?\b|\b9\s*(am)?\s*[–-]\s*5\s*(pm)?\b/i,
    msg: `Hours conflict. We are "${business.hours.display}".`,
  },
  {
    id: 'hospital-partner',
    re: /\b(partner(s|ed|ship)?|affiliat\w*|tie[- ]?ups?|network hospitals?|associated with)\b|পার্টনার|অংশীদার|চুক্তিবদ্ধ/i,
    msg: 'Hospitals are destinations only ("we transport to…"), never partners.',
  },
  {
    id: 'crew-claim',
    re: /\b(doctor|nurse|paramedic|emt|medic|crew|staff)s?\b[^.]{0,30}\bon[- ]?board\b|\bon[- ]?board\b[^.]{0,30}\b(doctor|nurse|paramedic|emt|medic)s?\b|trained medical (professionals?|staff|team)|\bwith (an? )?(mbbs )?(doctor|nurse|paramedic)\b|(ডাক্তার|নার্স|প্যারামেডিক)\s*সহ/i,
    msg: 'Crew-on-board claims need business.claims.crewOnBoardVerified = true.',
    when: () => !gates.crewOnBoardVerified,
  },
  {
    id: 'equipment-claim',
    re: /\b(ventilators?|defibrillators?|AED|cardiac monitors?|infusion pumps?|incubators?|syringe pumps?)\b|ভেন্টিলেটর|ডিফিব্রিলেটর|ইনকিউবেটর/i,
    msg: 'Named equipment needs business.claims.equipmentVerified = true (list it in frontmatter `equipment` with verified flags).',
    when: (c) => !gates.equipmentVerified && c.key !== 'equipment',
  },
  {
    id: 'in-writing',
    re: /\bin writing\b|\bwritten (fare|quote|confirmation)\b|লিখিত/i,
    msg: 'Say "in writing" only once business.claims.fareInWritingSopLive = true.',
    when: () => !gates.fareInWritingSopLive,
  },
  {
    id: 'backup-line',
    re: /\bbackup (line|number)\b|বিকল্প নম্বর/i,
    msg: 'Backup line not live yet (business.claims.backupLineLive).',
    when: () => !gates.backupLineLive,
  },
  { id: 'currency', re: /\b(tk\.?|taka|bdt)\b|টাকা/i, msg: 'Use ৳ only for currency.' },
  { id: 'fare-wording', re: /\b(prices?|pricing|costs?)\b|দাম|খরচ/i, msg: 'Prefer "fare" / ভাড়া (deck lexicon).', level: 'warn' },

  /* Bangla-only */
  {
    id: 'bn-spelling',
    re: /এম্বুলেন্স/,
    msg: 'Spell অ্যাম্বুলেন্স. এম্বুলেন্স is allowed only in meta title/description.',
    when: (c) => c.lang === 'bn' && !['metaTitle', 'metaDescription'].includes(c.key),
  },
  {
    id: 'bn-lashbahi',
    re: /লাশবাহী/,
    msg: 'লাশবাহী only in titles/headings or the service name (লাশবাহী ফ্রিজিং গাড়ি). Use প্রিয়জন / মরদেহ in body copy.',
    when: (c) => c.lang === 'bn' && !['metaTitle', 'h1', 'title'].includes(c.key) && !c.isHeading,
    prep: (t, c) => (c.bodyOnly ?? t).split(FREEZER_BN).join(' '),
  },
  {
    id: 'bn-digits',
    re: /[0-9]/,
    msg: 'Bangla copy uses Bangla digits (except the phone number).',
    when: (c) => c.lang === 'bn',
    prep: (t) => stripPhones(t).replace(/https?:\/\/\S+/g, ' ').replace(/\]\([^)]*\)/g, '] '),
  },

  /* Voice */
  { id: 'nicu-exclaim', re: /!/, msg: 'NICU voice is gentle: no exclamation marks.', when: (c) => c.voice === 'nicu', prep: (t) => t.replace(/!\[|\]\(/g, ' ') },
  {
    id: 'freezer-fast',
    re: /\b(fast(er|est)?|quick(ly)?|hurry|rush)\b|দ্রুত|তাড়াতাড়ি/i,
    msg: 'Freezer Van voice: no "fast". Condolence first.',
    when: (c) => c.voice === 'freezer',
  },
  { id: 'freezer-emoji', re: /\p{Extended_Pictographic}/u, msg: 'Freezer Van pages: no emojis.', when: (c) => c.voice === 'freezer' },
];

function applyRules(text, ctx, hit) {
  for (const r of RULES) {
    if (r.when && !r.when(ctx)) continue;
    if (r.skipQuote && ctx.inQuote) continue;
    const t = r.prep ? r.prep(text, ctx) : text;
    const m = t.match(r.re);
    if (m) hit(r.level === 'warn' ? 'warn' : 'error', r.id, `${r.msg} Found: "${m[0]}"`);
  }
}

/* ------------------------------------------------------------------ */
/* Content files                                                       */
/* ------------------------------------------------------------------ */

/** Frontmatter keys that hold codes, paths, dates or numbers, not copy. */
const NON_COPY_KEYS = new Set([
  'lang', 'translationKey', 'slug', 'target', 'draft', 'updated', 'published', 'serviceKey', 'voice',
  'audience', 'icuSubtypes', 'verified', 'role', 'currency', 'geo', 'lat', 'lng', 'approxKm', 'min', 'max',
  'author', 'moneyPages', 'services', 'areas', 'districts',
]);

function parseEntry(file) {
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const lines = raw.split('\n');
  const entry = { file, lines: [], meta: {}, lists: {}, body: '' };
  let inFm = false;
  let fmDone = false;
  let topKey = null;
  const bodyLines = [];

  lines.forEach((text, i) => {
    const n = i + 1;
    if (!fmDone && i === 0 && text.trim() === '---') return void (inFm = true);
    if (inFm && text.trim() === '---') {
      inFm = false;
      fmDone = true;
      return;
    }
    if (inFm) {
      const top = text.match(/^([A-Za-z]\w*):\s*(.*)$/);
      let key = null;
      if (top) {
        topKey = top[1];
        key = top[1];
        const v = top[2].trim().replace(/^['"]|['"]$/g, '');
        if (v) entry.meta[topKey] = v;
      } else {
        const nested = text.match(/^\s+(?:-\s+)?([A-Za-z]\w*):\s*(.*)$/);
        key = nested ? nested[1] : topKey;
        const item = text.match(/^\s*-\s+(?![A-Za-z]\w*:)(.+)$/);
        if (item && topKey) (entry.lists[topKey] ??= []).push(item[1].trim().replace(/^['"]|['"]$/g, ''));
        if (nested && topKey === 'hospitals' && nested[1] === 'name') (entry.lists.hospitalNames ??= []).push(nested[2].trim().replace(/^['"]|['"]$/g, ''));
        if (nested && topKey === 'faqs' && nested[1] === 'q') (entry.lists.faqQs ??= []).push(nested[2].trim().replace(/^['"]|['"]$/g, ''));
      }
      entry.lines.push({ n, text, section: 'fm', topKey, key });
    } else {
      bodyLines.push(text);
      entry.lines.push({ n, text, section: 'body', topKey: null, key: null, inQuote: /^\s*>/.test(text) });
    }
  });

  entry.body = bodyLines.join('\n');
  entry.draft = entry.meta.draft !== 'false'; // schema default is draft: true
  return entry;
}

const contentFiles = walk(CONTENT, ['.md', '.mdx']);
const entries = contentFiles.map(parseEntry).map((e) => {
  const parts = rel(e.file).split('/'); // src/content/<collection>/<lang>/<file>
  e.collection = parts[2];
  e.folderLang = parts[3];
  return e;
});

for (const e of entries) {
  const lang = e.meta.lang;
  if (!['en', 'bn'].includes(e.folderLang)) {
    report('error', e.file, 1, 'folder', `Put entries in ${e.collection}/en/ or ${e.collection}/bn/.`);
  } else if (lang && lang !== e.folderLang) {
    report('error', e.file, 1, 'lang-folder', `lang: ${lang} does not match folder /${e.folderLang}/.`);
  }

  const svc = e.collection === 'services' ? services.find((s) => s.key === e.meta.serviceKey) : null;
  const voice = e.meta.voice ?? (svc?.key === 'freezer' ? 'freezer' : svc?.key === 'nicu' ? 'nicu' : undefined);

  for (const l of e.lines) {
    if (l.section === 'fm' && NON_COPY_KEYS.has(l.key ?? '')) {
      // Still check codes/links for phones and dead anchors.
    } else {
      const ctx = { lang: lang ?? e.folderLang, voice, key: l.key, inQuote: l.inQuote, isHeading: l.section === 'body' && /^#{1,3}\s/.test(l.text) };
      const copyText = l.section === 'fm' ? l.text.replace(/^\s*(?:-\s+)?[A-Za-z]\w*:\s*/, '') : l.text;
      applyRules(copyText, ctx, (level, rule, msg) => report(level, e.file, l.n, rule, msg));
    }
    for (const p of phoneProblems(l.text)) report('error', e.file, l.n, 'phone', p);
    if (/href\s*=\s*["']#["']|\]\(#\)/.test(l.text)) report('error', e.file, l.n, 'dead-link', 'No href="#" / ](#) links.');
    if (/aggregateRating/i.test(l.text)) report('error', e.file, l.n, 'aggregate-rating', 'No aggregateRating (no real on-site reviews yet).');
    if (!e.draft && /\[VERIFY/i.test(l.text)) report('error', e.file, l.n, 'verify-left', '[VERIFY] left in published content. Confirm it or set draft: true.');
  }
}

/* Slugs unique */
const bySlug = new Map();
for (const e of entries) {
  const s = e.meta.slug;
  if (!s) continue;
  if (bySlug.has(s)) report('error', e.file, 1, 'duplicate-slug', `Slug ${s} also used by ${rel(bySlug.get(s).file)}.`);
  else bySlug.set(s, e);
}

/* Bangla layer parity */
for (const e of entries.filter((x) => x.meta.lang === 'en' && !x.draft)) {
  const bn = entries.find((x) => x.meta.lang === 'bn' && x.collection === e.collection && x.meta.translationKey === e.meta.translationKey);
  const freezer = e.meta.serviceKey === 'freezer';
  if (!bn || (freezer && bn.draft)) {
    report(freezer ? 'error' : 'warn', e.file, 1, 'bn-missing',
      freezer ? 'Freezer Van is Bangla-first: publish the BN version with the same translationKey.' : 'No Bangla version yet (same translationKey).');
  }
}

/* Internal link targets must exist and be published */
const pageRoutes = new Set(
  walk(join(ROOT, 'src', 'pages'), ['.astro', '.md', '.mdx'])
    .map((f) => rel(f).replace(/^src\/pages/, '').replace(/\.(astro|mdx?)$/, ''))
    .filter((r) => !r.includes('['))
    .map((r) => (r.replace(/\/index$/, '') + '/').replace(/^\/?/, '/').replace(/\/+$/, '/')),
);
const published = new Set([...entries.filter((e) => !e.draft).map((e) => e.meta.slug), ...pageRoutes]);
for (const e of entries.filter((x) => !x.draft)) {
  for (const l of e.lines.filter((x) => x.key === 'target')) {
    const t = l.text.replace(/^\s*(?:-\s+)?target:\s*/, '').trim().replace(/^['"]|['"]$/g, '');
    if (!published.has(t)) report('error', e.file, l.n, 'link-target', `Internal link target ${t} is not a published page.`);
  }
}

/* Local pages: no city-name swapping */
const shingles = (text, n = 5) => {
  const words = text.toLowerCase().split(/[\s\p{P}\p{S}]+/u).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(' '));
  return set;
};
const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
};
const overlap = (a = [], b = []) => {
  const A = new Set(a.map((x) => x.toLowerCase()));
  const B = new Set(b.map((x) => x.toLowerCase()));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / Math.min(A.size, B.size);
};

const SIMILARITY_MAX = 0.5;
for (const col of ['areas', 'districts']) {
  for (const lang of ['en', 'bn']) {
    const group = entries.filter((e) => e.collection === col && e.folderLang === lang);
    const texts = group.map((e) => shingles(e.body + ' ' + (e.lists.faqQs ?? []).join(' ')));
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i];
        const b = group[j];
        const sim = jaccard(texts[i], texts[j]);
        if (sim > SIMILARITY_MAX) {
          report('error', b.file, 1, 'near-duplicate', `${(sim * 100).toFixed(0)}% the same as ${rel(a.file)}. Area/district pages need unique local content.`);
        }
        if (overlap(a.lists.landmarks, b.lists.landmarks) > 0.5) {
          report('error', b.file, 1, 'shared-landmarks', `More than half its landmarks match ${rel(a.file)}.`);
        }
        const sameQs = (a.lists.faqQs ?? []).filter((q) => (b.lists.faqQs ?? []).includes(q));
        if (sameQs.length) report('error', b.file, 1, 'shared-faq', `FAQ "${sameQs[0]}" also on ${rel(a.file)}. FAQs must be area-specific.`);
        if (overlap(a.lists.hospitalNames, b.lists.hospitalNames) === 1 && (a.lists.hospitalNames ?? []).length === (b.lists.hospitalNames ?? []).length) {
          report('warn', b.file, 1, 'same-hospitals', `Same hospital list as ${rel(a.file)}.`);
        }
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Source code: pages, components, layouts, data                       */
/* ------------------------------------------------------------------ */

const codeFiles = walk(join(ROOT, 'src'), ['.astro', '.ts', '.tsx', '.js', '.mjs', '.jsx']).filter((f) => !f.startsWith(CONTENT + sep));
for (const f of codeFiles) {
  readFileSync(f, 'utf8').split(/\r?\n/).forEach((text, i) => {
    const n = i + 1;
    for (const p of phoneProblems(text)) report('error', f, n, 'phone', p);
    if (/href\s*=\s*["']#["']/.test(text)) report('error', f, n, 'dead-link', 'No href="#".');
    if (/aggregateRating/i.test(text)) report('error', f, n, 'aggregate-rating', 'No aggregateRating.');
    if (/\[VERIFY/i.test(text)) report('error', f, n, 'verify-left', 'No [VERIFY] in code. Use a verified: false field in business.ts.');
    if (/['"`]\+?8801919|01919[\s-]?339|wa\.me\//.test(text) && !f.endsWith(join('data', 'business.ts'))) {
      report('error', f, n, 'hardcoded-nap', 'Import phone/WhatsApp from src/data/business.ts instead of hard-coding.');
    }
  });
}

/* ------------------------------------------------------------------ */
/* Built HTML (--dist)                                                 */
/* ------------------------------------------------------------------ */

const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
const visibleText = (html) =>
  decode(html.replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

function checkDist() {
  if (!existsSync(DIST)) {
    report('error', DIST, 0, 'dist', 'dist/ not found. Run astro build first.');
    return;
  }
  const htmlFiles = walk(DIST, ['.html']);
  const distSet = new Set(htmlFiles.map((f) => '/' + relative(DIST, f).split(sep).join('/')));

  for (const f of htmlFiles) {
    const html = readFileSync(f, 'utf8');
    const route = '/' + relative(DIST, dirname(f)).split(sep).join('/');
    const urlPath = (route === '/' ? '/' : route + '/').replace(/\/+/g, '/');
    if (urlPath === '/404/') continue;

    const lang = /<html[^>]*\blang=["']bn/i.test(html) ? 'bn' : 'en';
    const voice = /freezer/.test(urlPath) ? 'freezer' : /nicu/.test(urlPath) ? 'nicu' : undefined;
    const hit = (level, id, msg) => report(level, f, 0, id, `${urlPath}: ${msg}`);

    // Meta
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim();
    const desc = decode(html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ?? '');
    if (!title) report('error', f, 0, 'meta-title', `${urlPath}: missing <title>.`);
    else if ([...title].length > 60) report('error', f, 0, 'meta-title', `${urlPath}: title is ${[...title].length} chars (max 60).`);
    if (!desc) report('error', f, 0, 'meta-description', `${urlPath}: missing meta description.`);
    else if ([...desc].length > 155) report('error', f, 0, 'meta-description', `${urlPath}: description is ${[...desc].length} chars (max 155).`);
    const h1s = (html.match(/<h1\b/gi) ?? []).length;
    if (h1s !== 1) report('error', f, 0, 'h1', `${urlPath}: ${h1s} <h1> tags (need exactly 1).`);

    // Whole-HTML checks
    for (const p of phoneProblems(html)) report('error', f, 0, 'phone', `${urlPath}: ${p}`);
    if (/href\s*=\s*["']#["']/i.test(html)) report('error', f, 0, 'dead-link', `${urlPath}: href="#".`);
    if (/aggregateRating/i.test(html)) report('error', f, 0, 'aggregate-rating', `${urlPath}: aggregateRating found.`);
    if (/\[VERIFY/i.test(html)) report('error', f, 0, 'verify-left', `${urlPath}: [VERIFY] in published HTML.`);

    // Visible copy rules. <title> is not visible text, so it is excluded here (meta rules cover it).
    const text = visibleText(html.replace(/<title>[\s\S]*?<\/title>/gi, ' '));
    // Quotes are removed before the rules run, so attributed customer quotes may say "best".
    // "cheapest" inside a quote is caught by the content-file pass.
    const noQuotes = html.replace(/<title>[\s\S]*?<\/title>/gi, ' ').replace(/<blockquote\b[\s\S]*?<\/blockquote>/gi, ' ');
    // Headings (h1-h3) count as titles, where লাশবাহী is allowed: that rule gets the text without them.
    const bodyOnly = visibleText(noQuotes.replace(/<h[1-3]\b[\s\S]*?<\/h[1-3]>/gi, ' '));
    applyRules(visibleText(noQuotes), { lang, voice, key: null, inQuote: false, bodyOnly }, hit);

    if (lang === 'bn' && !business.nameBn.verified && html.includes(business.nameBn.value)) {
      report('error', f, 0, 'bn-brand-name', `${urlPath}: Bangla brand name is not verified yet.`);
    }
    if (lang === 'bn' && voice === 'freezer' && !html.includes(copy.cta.freezerCall.bn)) {
      report('error', f, 0, 'freezer-cta', `${urlPath}: Bangla Freezer Van page must use "${copy.cta.freezerCall.bn}".`);
    }

    // FAQPage schema must match visible FAQs
    for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
      let data;
      try {
        data = JSON.parse(m[1]);
      } catch {
        report('error', f, 0, 'json-ld', `${urlPath}: invalid JSON-LD.`);
        continue;
      }
      const nodes = [data, ...(data['@graph'] ?? [])].flat();
      for (const node of nodes) {
        const types = [node?.['@type']].flat();
        if (!types.includes('FAQPage')) continue;
        for (const q of node.mainEntity ?? []) {
          const name = String(q?.name ?? '').replace(/\s+/g, ' ').trim();
          if (name && !text.includes(name)) report('error', f, 0, 'faq-schema', `${urlPath}: FAQ schema question not visible on page: "${name}".`);
        }
      }
    }

    // Internal links resolve and end with "/"
    for (const m of html.matchAll(/<a\b[^>]*\bhref=["'](\/[^"'#?]*)[^"']*["']/gi)) {
      const href = m[1];
      if (href.startsWith('//')) continue;
      const hasExt = /\.[a-z0-9]+$/i.test(href);
      if (!hasExt && !href.endsWith('/')) {
        report('error', f, 0, 'trailing-slash', `${urlPath}: link ${href} needs a trailing slash.`);
        continue;
      }
      const target = hasExt ? href : href + 'index.html';
      if (!distSet.has(target) && !existsSync(join(DIST, target))) report('error', f, 0, 'broken-link', `${urlPath}: link to ${href} does not exist.`);
    }
  }
}

if (CHECK_DIST) checkDist();

/* ------------------------------------------------------------------ */
/* Output                                                              */
/* ------------------------------------------------------------------ */

const fmt = (x) => `  ${x.file}${x.line ? ':' + x.line : ''}  [${x.rule}]  ${x.msg}`;
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n` + warnings.map(fmt).join('\n'));
if (errors.length) console.error(`\nErrors (${errors.length}):\n` + errors.map(fmt).join('\n'));
console.log(
  `\nlint-content: ${entries.length} content file(s), ${codeFiles.length} code file(s)${CHECK_DIST ? ', dist checked' : ''}. ` +
    `${errors.length} error(s), ${warnings.length} warning(s).`,
);
process.exit(errors.length ? 1 : 0);
