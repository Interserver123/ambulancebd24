/**
 * Zod schema for service pages built from section components (src/pages/[service].astro).
 * NICU, AC and Freezer reuse the same shape with their own copy.
 * The build fails if a page breaks a rule here (meta length, slug, missing sections).
 */
import { z } from 'astro/zod';
import { serviceKeys, services } from '../business';

const text = z.string().min(2);
const heading = z.object({ eyebrow: text, h2Lead: text, h2Accent: text });
/** Sections that can be reordered per page (src/components/service/ServicePageView.astro). */
export const mainSections = ['steps', 'trips', 'directions', 'routes', 'tips', 'fare', 'proof', 'coverage', 'explainer'] as const;
export const afterReviewSections = ['why', 'explainer', 'faq', 'related'] as const;
type Order = { main: Array<(typeof mainSections)[number]>; afterReviews: Array<(typeof afterReviewSections)[number]> };
export const defaultOrder: Order = {
  main: ['steps', 'trips', 'directions', 'routes', 'fare', 'tips', 'proof', 'coverage'],
  afterReviews: ['why', 'explainer', 'faq', 'related'],
};
const icon = z.enum(['ambulance', 'pin', 'clock', 'route', 'navigation', 'building', 'heart-pulse', 'baby', 'snow', 'fan', 'phone', 'whatsapp', 'mail', 'facebook']);

/** A FAQ renders (and goes into FAQPage schema) only with verified: true. */
export const serviceFaqSchema = z
  .object({ q: z.string().min(5), a: z.string(), verified: z.boolean() })
  .refine((f) => !f.verified || f.a.length >= 20, 'A verified FAQ needs a full answer');

export const servicePageSchema = z
  .object({
    serviceKey: z.enum(serviceKeys),
    /** Bangla pages live at /bn/ + the English path, linked by hreflang. */
    lang: z.enum(['en', 'bn']).default('en'),
    slug: z.string().regex(/^(?:\/bn)?\/[a-z0-9-]+\/$/),
    metaTitle: z.string().min(10).max(60),
    metaDescription: z.string().min(50).max(155),
    /** Visible "Last updated" date and WebPage dateModified. YYYY-MM-DD. */
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** Who maintains the page (shown next to Last updated). No invented people or credentials. */
    byline: text,
    breadcrumb: text,
    schema: z.object({ name: text, serviceType: text }),
    /** Review tags in priority order (e.g. ['ac', 'speed']); matching reviews show first. */
    reviewTags: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1),
    /**
     * Section order. Default: steps, trips, directions, routes, tips, fare, proof, coverage ·
     * reviews · why, explainer, faq, related. Each section still renders only if the page has it.
     */
    order: z
      .object({ main: z.array(z.enum(mainSections)), afterReviews: z.array(z.enum(afterReviewSections)) })
      .optional(),

    hero: z.object({
      eyebrow: text,
      h1: z.string().min(5),
      lede: z.string().min(20),
      bnLine: text.optional(),
      /** Freezer Van: Bangla line before the lede, calm Bangla call button (no ringing, no arrow). */
      calm: z.boolean().optional(),
      /** Freezer Van: condolence line above the H1. */
      condolence: text.optional(),
      /** One line linking to the other language version (shown only if that page exists). */
      langNote: z.object({ lead: text, anchor: text }).optional(),
      /** Planned-trip pages: WhatsApp button first (still equal weight with Call). */
      waFirst: z.boolean().optional(),
      trust: z.array(text).min(2).max(4),
      card: z.object({
        title: text,
        /** notAClaim: names equipment as an example the doctor may ask for, not as something we carry. */
        items: z.array(z.object({ text, notAClaim: z.boolean().default(false) })).min(2).max(4),
        footerWithCrew: text,
        footer: text,
      }),
    }),

    explainer: z.object({
      h2: text,
      /** 40-60 words. Bangla needs more characters per word, hence the higher cap. */
      definition: z.string().min(150).max(600),
      more: text.optional(),
      /** Optional H3 + paragraph under the definition (e.g. "Single cabin or double cabin?"). */
      note: z.object({ h3: text, text, more: text.optional() }).optional(),
      usesH3: text.optional(),
      uses: z.array(text).min(2).optional(),
      doctorLine: text.optional(),
      /** Optional link right after the doctor line (e.g. "...choose an" + ICU ambulance). */
      doctorLink: z.object({ key: z.enum(serviceKeys), anchor: text }).optional(),
      compare: z.object({
        h3: text,
        intro: text,
        /** First column is this page's service. A column shows only if its service is confirmed. */
        columns: z.array(z.object({ key: z.enum(serviceKeys), label: text })).min(2).max(3),
        /** Used while a column is hidden (its service not confirmed yet). */
        partial: z.object({ h3: text, intro: text }).optional(),
        rows: z.array(z.object({ label: text, values: z.record(z.string(), text) })).min(1),
        link: z.object({ lead: text, key: z.enum(serviceKeys), anchor: text }).optional(),
        /** Rows filled from verified vehicle data only (this page's column). */
        carriesLabel: text,
        crewLabel: text,
      }).optional(),
    }).optional(),

    proof: z.object({
      h2: text,
      pending: text,
      equipmentH3: text,
      crewH3: text,
      checklistH3: text,
      checklist: z.array(text).min(3),
      checklistClose: text,
      /** Freezer Van: shown per verified vehicle. {n} = number of family seats. */
      seatsLine: text.optional(),
      cabinLabels: z.object({ single: text, double: text }).optional(),
      /** Ops promise shown only when its claim gate in business.claims is true. */
      opsCheck: z.object({ text, claim: z.enum(['acCheckSopLive']) }).optional(),
    }).optional(),

    steps: heading
      .extend({
        intro: text,
        items: z.array(z.object({ n: text, label: text, title: text, text })).length(4),
        /** Optional practical checklist under the steps (e.g. "What to keep ready"). No medical instructions. */
        ready: z.object({ h3: text, items: z.array(text).min(2).max(5) }).optional(),
      })
      .optional(),

    /** Use-case cards ("Trips we run"). A card with verified: false does not render. */
    trips: heading
      .extend({
        intro: text,
        items: z
          .array(
            z.object({
              icon,
              title: text,
              text: z.string().min(40),
              /** key: a service page (or its homepage card); href: any other link (tel:, wa.me, #section). */
              link: z.object({ key: z.enum(serviceKeys).optional(), href: z.string().optional(), anchor: text, placement: z.string().optional() }).optional(),
              verified: z.boolean().default(true),
            }),
          )
          .min(3),
      })
      .optional(),

    /**
     * Directions of travel ("Dhaka to your district, and back"). An item with verified: false
     * does not render; h2Partial is used while any item is hidden.
     */
    directions: z
      .object({
        eyebrow: text,
        h2: text,
        h2Partial: text.optional(),
        items: z
          .array(z.object({ icon, h3: text, text: z.string().min(40), link: z.object({ key: z.enum(serviceKeys), anchor: text }).optional(), verified: z.boolean() }))
          .min(1),
      })
      .optional(),

    /**
     * Route table (inter-district hub). Rows come from src/data/routes.ts; this is the copy.
     * Distance and fare columns appear only once a row is checked or verified.
     */
    routes: heading
      .extend({
        intro: text,
        caption: text,
        cols: z.object({ district: text, division: text, via: text, distance: text, page: text, fares: z.object({ ac: text, icu: text, freezer: text }) }),
        notChecked: text,
        distanceNote: text,
        missingLead: text,
        homeLead: text,
        homeAnchor: text,
      })
      .optional(),

    /** Practical, non-medical planning list ("Planning a long ambulance trip"). */
    tips: z.object({ eyebrow: text, h2: text, intro: text, items: z.array(text).min(3), close: text }).optional(),

    /** Short answer-first section (e.g. "Why choose AC for trips in Dhaka"). */
    why: z.object({ eyebrow: text, h2: text, answer: text, more: text.optional() }).optional(),

    fare: heading.extend({
      answer: text,
      more: text,
      factorsH3: text,
      tableCaption: text,
      tableWithin: text,
      /** Optional "No surprise at the hospital gate" note. */
      gateH3: text.optional(),
      gateText: text.optional(),
      paymentLabel: text.optional(),
    }),

    coverage: heading.extend({
      answer: text,
      hospitalsH3: text,
      hospitalsLead: text,
      /** Omit to leave out the Dhaka area chips (e.g. Freezer Van, which is about district journeys). */
      areasH3: text.optional(),
      districtsH3: text,
      /** District chip label, {d} = district name (e.g. "Dhaka to {d}"). Default: the plain name. */
      districtChip: text.optional(),
      /** "Family abroad?" note with the WhatsApp button. */
      abroad: z.object({ h3: text, text }).optional(),
      districtsText: text,
      interDistrictAnchor: text,
      longRoute: text,
      /** true: the hospitals block promises pickup from any hospital, so it waits for pickupAnyHospital. */
      anyHospitalGate: z.boolean().default(false),
    }).optional(),

    reviewsHeading: z.object({ eyebrow: text, h2Lead: text, h2Accent: text }),

    faq: heading.extend({ items: z.array(serviceFaqSchema).min(3) }),

    related: heading.extend({
      /** Optional answer-first line under the H2 (e.g. "Which ambulance for a Khulna trip?"). */
      intro: text.optional(),
      items: z.array(z.object({ key: z.enum(serviceKeys), anchor: text, text })).min(1).max(4),
      homeAnchor: text,
      homeLead: text,
    }).optional(),

    napHeading: heading.extend({ body: text }),
    /** showForm: false drops the call-back form (its helper copy says "faster", wrong for Freezer Van). */
    /** whatsapp: WhatsApp button instead of Share (planned trips). pickupHint: helper under the Pickup field. */
    final: z.object({
      h2Lead: text,
      h2Accent: text,
      text,
      h3: text,
      showForm: z.boolean().optional(),
      whatsapp: z.boolean().optional(),
      pickupHint: text.optional(),
      /** Helper under the form button (default: "For an emergency, call..."). */
      formHelper: text.optional(),
    }),
  })
  .superRefine((d, ctx) => {
    const entry = services.find((s) => s.key === d.serviceKey)!;
    const path = d.lang === 'bn' ? `/bn${entry.path}` : entry.path;
    if (path !== d.slug) ctx.addIssue({ code: 'custom', path: ['slug'], message: `Slug must be the catalogue path ${path}` });
    if (entry.status !== 'fact') ctx.addIssue({ code: 'custom', path: ['serviceKey'], message: `${entry.en} is not confirmed yet` });
    // Every page links onward: related cards, or the hub's route table (which links home).
    if (!d.related && !d.routes) ctx.addIssue({ code: 'custom', path: ['related'], message: 'Needs related links (or a route table)' });
    if (d.order) {
      const all = [...d.order.main, ...d.order.afterReviews];
      if (!d.order.main.includes('fare')) ctx.addIssue({ code: 'custom', path: ['order'], message: 'Order must include fare' });
      if (!d.order.afterReviews.includes('faq')) ctx.addIssue({ code: 'custom', path: ['order'], message: 'Order must include faq' });
      if (new Set(all).size !== all.length) ctx.addIssue({ code: 'custom', path: ['order'], message: 'A section is listed twice' });
    }
    if (d.faq.items.filter((f) => f.verified).length < 3) ctx.addIssue({ code: 'custom', path: ['faq'], message: 'At least 3 verified FAQs' });
  });

export type ServicePage = z.infer<typeof servicePageSchema>;
