/**
 * Zod schema for district location pages (src/pages/[district].astro).
 * Reuses the service-page section shapes (hero, trips, fare, tips, related, why) so the same
 * section components render them, and adds the district-only sections: key facts, route,
 * local pickup and nearby districts.
 *
 * Anti-doorway rules (CLAUDE.md rule 5, district brief §5): every district-specific section is
 * required, and the build fails if the district name is missing from the parts that must be
 * local (lede, key facts, route, pickup, fare answer, FAQ). scripts/check-district-similarity.mjs
 * also fails the build when two district pages share more than 30% of their body text.
 */
import { z } from 'astro/zod';
import { servicePageSchema } from '../service-pages/schema';
import { districtFactsSchema } from '../districts';

const text = z.string().min(2);
const heading = z.object({ eyebrow: text, h2Lead: text, h2Accent: text });
const shape = servicePageSchema.shape;

export const districtPageSchema = z
  .object({
    /** Key in districts.ts. */
    key: z.string().regex(/^[a-z-]+$/),
    /** Name as used in routes.ts and the districts collection (e.g. "Khulna"). */
    district: text,
    /** Other spellings used in the copy (e.g. Barishal, Chattogram); the anti-doorway check accepts any. */
    aliases: z.array(text).default([]),
    lang: z.enum(['en', 'bn']).default('en'),
    /** Existing live URLs keep their exact form (e.g. /ambulance-service-in-chittagong/, /chandpur-ambulance-service/). */
    slug: z.string().regex(/^\/(bn\/)?[a-z0-9-]*ambulance-service[a-z0-9-]*\/$/),
    metaTitle: z.string().min(10).max(60),
    metaDescription: z.string().min(50).max(155),
    /** Visible "Last updated" and WebPage dateModified. YYYY-MM-DD. */
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    byline: text,
    breadcrumb: text,
    schema: z.object({
      name: text,
      serviceType: text,
      areaServed: z.array(z.object({ type: z.enum(['City', 'AdministrativeArea']), name: text })).min(2),
      /** WebPage mentions: places with a Wikipedia sameAs. */
      mentions: z.array(z.object({ type: z.enum(['City', 'Place', 'Landform', 'TouristAttraction']), name: text, sameAs: z.url() })).default([]),
    }),
    /** Local facts and verification flags (src/data/districts.ts). */
    facts: districtFactsSchema,
    /** Review tags in priority order: the district first, then the route type. */
    reviewTags: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1),

    hero: shape.hero,

    keyFacts: z.object({
      eyebrow: text,
      h2: text,
      /** Each line is a self-contained, quotable fact. */
      /** shared: a standard fact repeated on every district page (types, fare, booking, base). */
      items: z.array(z.object({ term: text, value: z.string().min(2), shared: z.boolean().default(false) })).min(5),
    }),

    /** Mode A only: "Is this a sudden emergency inside {District}?" */
    emergency: shape.why,

    journeys: shape.trips.unwrap(),

    /** "Which ambulance for a {District} trip?" (service cards with a local line each). */
    vehicles: shape.related.unwrap(),

    route: z.object({
      eyebrow: text,
      h2: text,
      answer: z.string().min(40),
      factorsH3: text,
      factors: z.array(text).min(3),
      /** "{km}" is replaced by the checked distance (routes.ts, distanceChecked). */
      distanceLine: z.string().includes('{km}'),
      etaLine: text,
      /** Diagram stops, from Dhaka to the district. */
      stops: z.array(z.object({ name: text, note: text.optional() })).min(3),
      diagramAlt: z.string().min(20),
      /** Link to a district page on the route (renders as plain text until that page exists). */
      onRoute: z.object({ lead: text, district: text, anchor: text }).optional(),
    }),

    pickup: z.object({
      eyebrow: text,
      h2: text,
      /** Used while the district coverage flag is not verified. */
      h2Partial: text,
      answer: z.string().min(40),
      answerPartial: z.string().min(40),
      hospitalsH3: text,
      hospitalsLead: text,
      /** Omit when the district has no city areas listed. */
      areasH3: text.optional(),
      upazilasH3: text,
      landmarkLine: text,
    }),

    fare: shape.fare,
    tips: shape.tips.unwrap(),

    faq: heading.extend({
      items: z
        .array(
          z
            .object({ q: z.string().min(5), a: z.string(), verified: z.boolean(), shared: z.boolean().default(false) })
            .refine((f) => !f.verified || f.a.length >= 20, 'A verified FAQ needs a full answer'),
        )
        .min(4),
    }),

    nearby: heading.extend({
      answer: text,
      /** routes.ts names; linked only once their page exists. */
      districts: z.array(text).min(2).max(6),
      chip: text,
      hubLead: text,
      hubAnchor: text,
    }),

    napHeading: heading.extend({ body: text }),
    final: z.object({ h2Lead: text, h2Accent: text, text, h3: text, pickupHint: text, formHelper: text.optional() }),
  })
  .superRefine((d, ctx) => {
    const name = d.district;
    const names = [name, d.breadcrumb, ...d.aliases];
    const must = (value: string, path: (string | number)[]) => {
      if (!names.some((n) => value.includes(n))) ctx.addIssue({ code: 'custom', path, message: `Must be about ${name} (name missing): no city-name swapping or generic copy` });
    };
    must(d.hero.lede, ['hero', 'lede']);
    must(d.keyFacts.items.filter((i) => !i.shared).map((i) => i.value).join(' '), ['keyFacts']);
    must(d.route.answer, ['route', 'answer']);
    must(d.pickup.answer, ['pickup', 'answer']);
    must(d.fare.h2Lead + d.fare.h2Accent, ['fare']);
    must(d.journeys.items.map((i) => i.title).join(' '), ['journeys']);
    if (d.faq.items.filter((f) => f.verified).length < 3) ctx.addIssue({ code: 'custom', path: ['faq'], message: 'At least 3 verified FAQs' });
    if (d.journeys.items.filter((j) => j.verified).length < 3) ctx.addIssue({ code: 'custom', path: ['journeys'], message: 'At least 3 verified journeys' });
  });

export type DistrictPage = z.infer<typeof districtPageSchema>;
