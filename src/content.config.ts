/**
 * Content collections. Files live at src/content/{collection}/{en|bn}/*.md
 *
 * Rules the schemas enforce (see CLAUDE.md, YMYL section):
 * - meta title <= 60 chars, meta description <= 155 chars
 * - FAQs come from `faqs[]` only, so the visible FAQ and FAQPage schema match
 * - area and district pages must carry local facts (landmarks, hospitals as
 *   destinations, routes); the linter then checks pages are not near-copies
 * - Non-AC and Air pages cannot publish until the catalogue marks them "fact"
 * - entries default to draft: true, so nothing publishes by accident
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { services as catalogue, serviceKeys, icuSubtypes } from './data/business';

/* ---------------- shared pieces ---------------- */

const lang = z.enum(['en', 'bn']);

/** Site path with leading and trailing slash; Bangla pages under /bn/. */
const path = z
  .string()
  .regex(/^\/(?:[a-z0-9-]+\/)*$/, 'Use a lowercase path like /icu-ambulance-service-dhaka/ (trailing slash required)');

const faq = z.object({
  q: z.string().min(5),
  a: z.string().min(20),
});

const internalLink = z.object({
  anchor: z.string().min(2),
  target: path,
});

/** A hospital is only ever a destination we transport to, never a partner. */
const hospital = z.object({
  name: z.string().min(2),
  role: z.literal('destination'),
});

const geo = z.object({
  lat: z.number().min(20.5).max(26.7), // Bangladesh bounds
  lng: z.number().min(88).max(92.7),
});

const base = {
  lang,
  /** Same value on the EN and BN version of a page; drives hreflang. */
  translationKey: z.string().regex(/^[a-z0-9-]+$/),
  slug: path,
  metaTitle: z.string().min(10).max(60),
  metaDescription: z.string().min(50).max(155),
  h1: z.string().min(5),
  faqs: z.array(faq).min(3),
  internalLinks: z.array(internalLink).default([]),
  draft: z.boolean().default(true),
  updated: z.coerce.date(),
};

type BaseData = { lang: 'en' | 'bn'; slug: string };

/** Bangla pages live under /bn/, English pages never do. */
function checkLangSlug(d: BaseData, ctx: z.RefinementCtx) {
  const isBn = d.slug === '/bn/' || d.slug.startsWith('/bn/');
  if (d.lang === 'bn' && !isBn) ctx.addIssue({ code: 'custom', path: ['slug'], message: 'Bangla pages must live under /bn/' });
  if (d.lang === 'en' && isBn) ctx.addIssue({ code: 'custom', path: ['slug'], message: 'English pages must not live under /bn/' });
}

/** Strip the /bn prefix to compare against the English catalogue path. */
const enPath = (slug: string) => (slug.startsWith('/bn/') ? slug.slice(3) : slug);

/* ---------------- services ---------------- */

const voice = z.enum(['emergency', 'icu', 'nicu', 'freezer', 'planned', 'abroad']);
/** Deck audiences: A emergency caller, B ICU coordinator, C NICU parents,
 *  D grieving family, E planned mover, F relative abroad, G B2B. */
const audience = z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']);

const verifiedItem = z.object({
  item: z.string().min(2),
  /** Only verified items render. */
  verified: z.boolean().default(false),
});

const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z
    .object({
      ...base,
      serviceKey: z.enum(serviceKeys),
      voice,
      audience: z.array(audience).min(1),
      icuSubtypes: z.array(z.enum(icuSubtypes)).default([]),
      equipment: z.array(verifiedItem).default([]),
      crew: z.array(z.object({ role: z.string().min(2), verified: z.boolean().default(false) })).default([]),
    })
    .superRefine((d, ctx) => {
      checkLangSlug(d, ctx);
      const entry = catalogue.find((s) => s.key === d.serviceKey)!;
      if (enPath(d.slug) !== entry.path) {
        ctx.addIssue({ code: 'custom', path: ['slug'], message: `Slug must match the catalogue path ${entry.path} (with /bn prefix for Bangla)` });
      }
      if (entry.status !== 'fact' && !d.draft) {
        ctx.addIssue({ code: 'custom', path: ['draft'], message: `${entry.en} is not confirmed yet; keep draft: true` });
      }
      if (d.icuSubtypes.length && d.serviceKey !== 'icu') {
        ctx.addIssue({ code: 'custom', path: ['icuSubtypes'], message: 'CCU/PICU/Cardiac/BLS/ALS only sit under the ICU page' });
      }
      if (d.serviceKey === 'freezer' && d.voice !== 'freezer') {
        ctx.addIssue({ code: 'custom', path: ['voice'], message: 'Freezer Van pages use the freezer voice' });
      }
      if (d.serviceKey === 'nicu' && d.voice !== 'nicu') {
        ctx.addIssue({ code: 'custom', path: ['voice'], message: 'NICU pages use the nicu voice' });
      }
    }),
});

/* ---------------- Dhaka areas ---------------- */

const route = z.object({
  from: z.string().min(2),
  via: z.array(z.string().min(2)).min(1),
  note: z.string().optional(),
});

const areasCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: z
    .object({
      ...base,
      areaName: z.string().min(2),
      geo,
      landmarks: z.array(z.string().min(2)).min(3),
      hospitals: z.array(hospital).min(2),
      routes: z.array(route).min(1),
    })
    .superRefine(checkLangSlug),
});

/* ---------------- districts ---------------- */

const districtsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/districts' }),
  schema: z
    .object({
      ...base,
      district: z.string().min(2),
      division: z.string().min(2),
      geo,
      routeFromDhaka: z.object({
        via: z.array(z.string().min(2)).min(1),
        approxKm: z.number().positive().optional(),
        /** Unverified distance is not rendered. */
        verified: z.boolean().default(false),
      }),
      landmarks: z.array(z.string().min(2)).min(2),
      hospitals: z.array(hospital).min(2),
      /** Only allowed once the client confirms the range. */
      fareRange: z
        .object({
          min: z.number().int().positive(),
          max: z.number().int().positive(),
          currency: z.literal('৳'),
          verified: z.literal(true),
        })
        .refine((f) => f.max >= f.min, 'max must be >= min')
        .optional(),
    })
    .superRefine(checkLangSlug),
});

/* ---------------- reviews ---------------- */

/**
 * Real Google reviews, copied verbatim (spelling included). One file: reviews/google.json.
 * A review renders only with approved: true (client confirms it may be quoted).
 * Tags: service keys (icu, nicu, ...) and area slugs (mirpur, ...), used to pick reviews per page.
 * Never turned into review or star-rating schema.
 */
const reviewsCollection = defineCollection({
  loader: file('src/content/reviews/google.json'),
  schema: z.object({
    author: z.string().min(2),
    /** Month the review was posted, YYYY-MM. Shown as "Oct 2025". */
    date: z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM').optional(),
    text: z.string().min(3),
    /** Language the review is written in. Bangla pages show Bangla reviews first. */
    lang: z.enum(['en', 'bn']).default('en'),
    stars: z.number().int().min(1).max(5).optional(),
    source: z.literal('Google'),
    /** Link to the review (or the GBP reviews list). */
    url: z.url().optional(),
    tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
    approved: z.boolean().default(false),
  }),
});

/* ---------------- blog ---------------- */

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        ...base,
        /** Posts have FAQs only where the article has them; FAQPage schema only then. */
        faqs: z.array(faq).default([]),
        author: z.string().min(2),
        published: z.coerce.date(),
        /** Cover image (own uploads only, never hot-linked or stock from other sites). */
        cover: image().optional(),
        coverAlt: z.string().optional(),
        /** Every post must link to at least one money page: service pages, the Dhaka hub or the homepage. */
        moneyPages: z.array(path).min(1, 'Blog posts must link to at least one service, area or district page'),
        /**
         * General guide: describes ambulances in general (equipment, crew training), not our fleet.
         * The linter then checks equipment/crew wording only in sentences about us, and the page
         * shows a note that the dispatcher confirms what our ambulance carries.
         */
        generalGuide: z.boolean().default(false),
        /** Off-topic for Bangladesh readers: kept live but out of search, the sitemap, the blog list and llms.txt. */
        noindex: z.boolean().default(false),
        /** Original WordPress post id (migration audit trail). */
        wpId: z.number().int().optional(),
      })
      .superRefine((d, ctx) => {
        // Bangla posts may sit at a root slug (e.g. /what-to-tell-ambulance-dispatcher-bangla/); English never under /bn/.
        if (d.lang === 'en' && d.slug.startsWith('/bn/')) ctx.addIssue({ code: 'custom', path: ['slug'], message: 'English pages must not live under /bn/' });
        // No slug pattern forced: existing posts must keep their live URLs.
      }),
});

export const collections = {
  services: servicesCollection,
  areas: areasCollection,
  districts: districtsCollection,
  blog: blogCollection,
  reviews: reviewsCollection,
};
