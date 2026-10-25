/**
 * Zod schema for Dhaka area pages (src/pages/[area].astro), e.g. /ambulance-service-uttara/.
 * An area page must solve that area's own problems: the build fails if the area name is missing
 * from the parts that have to be local (lede, intro, problems, landmarks, FAQ), so copy
 * cannot be city-name swapped. Hospitals are destinations only (CLAUDE.md rule 3).
 * No minute figures: only the approved timing claim is allowed (lint-content.mjs).
 */
import { z } from 'astro/zod';
import { servicePageSchema } from '../service-pages/schema';

const text = z.string().min(2);
const heading = z.object({ eyebrow: text, h2Lead: text, h2Accent: text });

export const areaPageSchema = z
  .object({
    key: z.string().regex(/^[a-z-]+$/),
    /** Name as used on the Inside Dhaka hub (e.g. "Uttara"). */
    area: text,
    aliases: z.array(text).default([]),
    slug: z.string().regex(/^\/ambulance-service-[a-z0-9-]+\/$/),
    metaTitle: z.string().min(10).max(60),
    metaDescription: z.string().min(50).max(155),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    byline: text,
    breadcrumb: text,
    schema: z.object({
      name: text,
      serviceType: text,
      place: z.object({ name: text, sameAs: z.url(), geo: z.object({ lat: z.number(), lng: z.number() }) }),
      mentions: z.array(z.object({ type: z.enum(['City', 'Place', 'Airport', 'TrainStation']), name: text, sameAs: z.url() })).default([]),
    }),
    hero: servicePageSchema.shape.hero,

    /** Answer-first opening in plain sentences: what to do now, and what is different about this area. */
    intro: z.object({ h2: text, paragraphs: z.array(z.string().min(60)).min(2) }),

    problems: heading.extend({
      intro: text,
      items: z.array(z.object({ pain: text, happens: z.string().min(40), we: z.string().min(30) })).min(4),
    }),

    services: heading.extend({
      intro: text,
      items: z.array(z.object({ title: text, text: z.string().min(30), links: z.array(z.object({ anchor: text, href: z.string().regex(/^\/[a-z0-9/-]*\/$/) })).min(1) })).min(4),
    }),

    address: z.object({
      eyebrow: text,
      h2: text,
      intro: text,
      steps: z.array(z.object({ title: text, text: z.string().min(20) })).min(4),
      close: text,
    }),

    hospitals: z.object({
      eyebrow: text,
      h2: text,
      intro: z.string().min(40),
      inAreaH3: text,
      inArea: z.array(z.object({ name: text, role: z.literal('destination') })).min(2),
      cityH3: text,
      city: z.array(z.object({ name: text, area: text, href: z.string().optional() })).min(3),
      close: text,
    }),

    fare: z.object({ eyebrow: text, h2: text, answer: z.string().min(40), factorsH3: text, factors: z.array(text).min(3), close: text }),

    landmarks: z.object({
      eyebrow: text,
      h2: text,
      intro: z.string().min(40),
      disclaimer: z.string().min(40),
      distanceLabel: text,
      trafficLabel: text,
      routeLabel: text,
      mapH3: text,
      mapShow: text,
      mapCaption: text,
      /** Google Maps destination for the click-to-load route map. */
      mapDestination: text,
      items: z
        .array(
          z.object({
            name: text,
            type: text,
            why: z.string().min(40),
            /** Approximate road distance from the Mohakhali base, in km. */
            km: z.number().positive(),
            traffic: text,
            mapQuery: text,
            sameAs: z.url().optional(),
          }),
        )
        .min(6),
    }),

    faq: heading.extend({ items: z.array(z.object({ q: z.string().min(5), a: z.string().min(40) })).min(8) }),
    napHeading: heading.extend({ body: text }),
    final: z.object({ h2Lead: text, h2Accent: text, text, h3: text, pickupHint: text, formHelper: text.optional() }),
  })
  .superRefine((d, ctx) => {
    const names = [d.area, d.breadcrumb, ...d.aliases];
    const must = (value: string, path: (string | number)[]) => {
      if (!names.some((n) => value.includes(n))) ctx.addIssue({ code: 'custom', path, message: `Must be about ${d.area} (name missing): no city-name swapping or generic copy` });
    };
    must(d.hero.lede, ['hero', 'lede']);
    must(d.intro.paragraphs.join(' '), ['intro']);
    must(d.problems.items.map((i) => i.happens).join(' '), ['problems']);
    must(d.landmarks.items.map((i) => i.why).join(' '), ['landmarks']);
    must(d.faq.items.map((f) => f.q + f.a).join(' '), ['faq']);
  });

export type AreaPage = z.infer<typeof areaPageSchema>;
