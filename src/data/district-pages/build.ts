/**
 * Builder for district location pages (Mode A: we serve the district from our Dhaka base).
 *
 * The builder writes only the parts that must read the same everywhere because they depend on
 * verification flags (hero card, trust row, fare promise, 999 note, gated FAQs, NAP line). Every
 * district passes its own local copy: lede, journeys, route, places, local FAQs, tips and the
 * fare note. scripts/check-district-similarity.mjs fails the build if two pages overlap > 30%.
 *
 * Keyword pattern (SERP, Oct 2026): "ambulance service in {District}" = an ambulance that picks up
 * in the district, mainly to Dhaka or another district. Title carries the scope ("to Dhaka")
 * until an ambulance stationed in the district is verified.
 *
 * Voice: calm dispatcher, practical, honest. No travel-time promises, no "fast", no em dashes.
 */
import { business, shown } from '../business';
import type { DistrictFacts } from '../districts';
import { longTrip } from '../routes';
import { districtPageSchema, type DistrictPage } from './schema';

type Icon = 'route' | 'navigation' | 'snow' | 'building' | 'heart-pulse' | 'baby' | 'fan' | 'pin' | 'clock' | 'ambulance';
type Faq = { q: string; a: string; verified?: boolean };
/** needsPickup: the journey starts in the district, so it waits for longTrip.districtPickup. */
type Journey = {
  icon: Icon;
  title: string;
  text: string;
  link?: { key?: 'freezer' | 'icu' | 'ac' | 'nicu' | 'inter-district'; href?: string; anchor: string };
  needsPickup?: boolean;
  verified?: boolean;
};

export interface DistrictInput {
  key: string;
  /** Name as in routes.ts (e.g. "Chittagong"). */
  district: string;
  /** Name used in copy, if different (e.g. "Chattogram"). Defaults to district. */
  name?: string;
  /** Other spelling people search, mentioned once (e.g. "Chattogram"). */
  aka?: string;
  slug: string;
  /** Keyword phrase for title/H1, e.g. "Ambulance service in Chittagong" or "Chandpur ambulance service". */
  keyword?: string;
  updated?: string;
  facts: DistrictFacts;
  /** Administrative area for schema, e.g. "Chattogram District". */
  admin: string;
  /** Wikipedia places mentioned on the page. */
  mentions: { type: 'City' | 'Place'; name: string; sameAs: string }[];
  /**
   * Unique meta description with a local detail (route, towns), used once pickup in the district
   * is verified. Placeholders: {vehicles} (follows the ICU flag) and {phone} (from business.ts).
   * Falls back to the shared template if it does not fit 155 characters.
   */
  metaDescription?: string;
  lede: string;
  /** Key-facts "Service" line, in the district's own words (who calls, where they go). */
  serviceFact: string;
  /** One sentence for the key-facts "Route" line. */
  routeFact: string;
  /** Extra key fact unique to the district (e.g. land port, islands). */
  localFact?: { term: string; value: string };
  journeysIntro: string;
  journeys: Journey[];
  /** Short local line on the AC card in "Which ambulance". */
  acLine: string;
  route: { answer: string; factors: string[]; stops: { name: string; note?: string }[]; onRoute?: { lead: string; district: string; anchor: string } };
  pickup: { answer: string; areasH3?: string; upazilasH3?: string };
  fareMore: string;
  /** Tips intro and items: local, practical, non-medical. */
  tipsIntro: string;
  tips: string[];
  /** Optional local line after the 999 note (e.g. which hospital families usually go to first). */
  emergencyMore?: string;
  faqs: Faq[];
  nearby: string[];
  nearbyAnswer: string;
  /** Extra review tags after the district (default: inter-district). */
  reviewTags?: string[];
}

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));
const icu = longTrip.icuLongRoutes.verified;
const tolls = longTrip.tollsIncluded.verified;

const fitTitle = (options: string[]) => options.find((t) => t.length <= 60) ?? options[options.length - 1]!;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function buildDistrictPage(d: DistrictInput): DistrictPage {
  const name = d.name ?? d.district;
  const f = d.facts;
  const local = f.localDispatch.verified;
  const fromDistrict = local || longTrip.districtPickup.verified;
  const coverage = fromDistrict && f.coverage.verified;
  const keyword = d.keyword ?? `Ambulance service in ${name}`;
  // Title case, keeping short words lower case ("Ambulance Service in Rangpur").
  const kwTitle = keyword.replace(/\b\w+/g, (w, i: number) => (i > 0 && ['in', 'to', 'of', 'and'].includes(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)));
  const brand = ` | ${business.name}`;
  const types = icu ? 'AC ambulance, ICU ambulance and freezer van' : 'AC ambulance and freezer van';
  const short = icu ? 'AC, ICU and freezer van' : 'AC and freezer van';

  return districtPageSchema.parse({
    key: d.key,
    district: d.district,
    aliases: [d.name, d.aka].filter((x): x is string => Boolean(x)),
    slug: d.slug,
    metaTitle: local
      ? fitTitle([`${kwTitle}, 24/7${brand}`, `${kwTitle}${brand}`])
      : fromDistrict
        ? fitTitle([`${kwTitle} to Dhaka, 24/7${brand}`, `${kwTitle} to Dhaka${brand}`, `${kwTitle}, 24/7${brand}`, `${kwTitle}${brand}`])
        : fitTitle([`${kwTitle} from Dhaka${brand}`, `${kwTitle}${brand}`]),
    metaDescription: fromDistrict
      ? fitDescription([
          ...(d.metaDescription ? [d.metaDescription.replaceAll('{vehicles}', cap(short)).replaceAll('{phone}', phone)] : []),
          `${keyword}: pickup from hospital or home, to Dhaka or any district, 24/7. ${short}. Fare told first. Call ${phone}.`,
          `${keyword}: pickup to Dhaka or any district, 24/7. ${short}. Fare told first. Call ${phone}.`,
        ])
      : fitDescription([`${keyword} for journeys from Dhaka, 24/7: ${short}. Full fare told first. Call ${phone}.`]),
    updated: d.updated ?? '2026-10-22',
    byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page when our ${name} fares or routes change.`,
    breadcrumb: name,
    schema: {
      name: keyword,
      serviceType: 'Long-distance ambulance transport',
      areaServed: [
        { type: 'City', name },
        { type: 'AdministrativeArea', name: d.admin },
        { type: 'City', name: 'Dhaka' },
      ],
      mentions: d.mentions,
    },
    facts: f,
    reviewTags: [d.key, ...(d.reviewTags ?? ['inter-district'])],

    hero: {
      eyebrow: fromDistrict ? `${keyword} · to Dhaka or any district · 24/7` : `${keyword} · 24/7`,
      h1: local ? `${keyword}, 24/7` : fromDistrict ? `${keyword}, to Dhaka or any district` : `${keyword} for journeys from Dhaka`,
      lede: d.lede,
      waFirst: true,
      trust: [
        coverage ? `Pickup from any hospital or home in ${name}` : fromDistrict ? `Pickup in ${name}` : `To any address in ${name}`,
        ...(fromDistrict ? ['To Dhaka or any district'] : []),
        tolls ? 'Full fare first, incl. tolls and waiting' : 'Full fare first, waiting included',
        business.hours.short,
      ],
      card: {
        title: `For a ${name} trip, tell us`,
        items: [
          { text: fromDistrict ? `Pickup in ${name} (hospital and ward, or home with a landmark), and where the patient is going` : `Pickup in Dhaka, and the full address in ${name} with a landmark` },
          { text: "The patient's needs on the way, as the doctor advised (for example oxygen or ICU support)", notAClaim: true },
          { text: 'The date and time, and whether it is one-way or return' },
        ],
        footerWithCrew: 'We confirm the vehicle, who comes with it, and the full fare before we leave.',
        footer: 'We confirm the vehicle and the full fare before we leave.',
      },
    },

    keyFacts: {
      eyebrow: 'At a glance',
      h2: `${keyword}: key facts`,
      items: [
        { term: 'Service', value: d.serviceFact },
        { term: 'Ambulance types', value: `${types}.`, shared: true },
        { term: 'Route', value: d.routeFact },
        ...(d.localFact ? [d.localFact] : []),
        { term: 'Fare', value: `Told before we leave${tolls ? ', tolls included' : ''}. No change after the trip.`, shared: true },
        { term: 'Book', value: wa ? `${phone}, call or WhatsApp, 24/7.` : `${phone}, 24/7.`, shared: true },
        { term: 'Base', value: `${business.address.locality}, Dhaka.`, shared: true },
      ],
    },

    ...(local
      ? {}
      : {
          emergency: {
            eyebrow: `Emergency in ${name}`,
            h2: `Is this a sudden emergency inside ${name}?`,
            answer: `Our ambulances are based in Dhaka, so for an emergency in ${name} that needs help right away, call 999 or go to the nearest hospital. Call us for the transfer once the doctor advises it.`,
            ...(d.emergencyMore ? { more: d.emergencyMore } : {}),
          },
        }),

    journeys: {
      eyebrow: 'Journeys',
      h2Lead: `Our ${name} ambulance`,
      h2Accent: 'journeys',
      intro: d.journeysIntro,
      items: [
        ...d.journeys.map(({ needsPickup, ...j }) => ({ ...j, verified: (j.verified ?? true) && (!needsPickup || fromDistrict) })),
        ...(icu && fromDistrict
          ? [
              {
                icon: 'heart-pulse' as const,
                title: `Critical transfer, ${name} ⇄ Dhaka`,
                text: `When the treating doctor says a critically ill patient needs ICU support on the way between ${name} and Dhaka. The support has to last the whole journey, including waiting, so call as early as you can. Tell the dispatcher both hospitals, the support the doctor advises, and when the patient is ready.`,
                link: { key: 'icu' as const, anchor: 'ICU ambulance' },
              },
            ]
          : []),
      ],
    },

    vehicles: {
      eyebrow: 'Choose the vehicle',
      h2Lead: 'Which ambulance',
      h2Accent: `for a ${name} trip?`,
      intro: "It depends on the patient's condition and the treating doctor's advice. The dispatcher helps you choose before telling you the fare.",
      items: [
        { key: 'ac', anchor: 'AC ambulance', text: d.acLine },
        {
          key: 'icu',
          anchor: 'ICU ambulance',
          text: icu
            ? `For critically ill patients between ${name} and Dhaka, when the doctor advises ICU support.`
            : `For critically ill patients. Tell us the ${name} route first, and the dispatcher confirms whether an ICU ambulance can make the trip.`,
        },
        { key: 'freezer', anchor: 'Freezer van', text: `For taking a loved one home to ${name}, with care and respect.` },
      ],
      homeLead: 'Need an ambulance inside Dhaka? See our',
      homeAnchor: '24/7 ambulance service in Dhaka',
    },

    route: {
      eyebrow: 'The route',
      h2: `The ${name}–Dhaka route`,
      answer: d.route.answer,
      factorsH3: 'What affects the journey',
      factors: d.route.factors,
      distanceLine: `Approximate road distance from Dhaka to ${name}: {km} km (approx., from Google Maps).`,
      etaLine: 'We do not promise a travel time. The dispatcher gives an estimated arrival time on the call.',
      stops: d.route.stops,
      diagramAlt: `Route diagram: ${d.route.stops.map((s) => s.name).join(' to ')}.`,
      ...(d.route.onRoute ? { onRoute: d.route.onRoute } : {}),
    },

    pickup: {
      eyebrow: 'Where we go',
      h2: `${keyword} across the district`,
      h2Partial: `Where our ${name} ambulance service goes`,
      answer: d.pickup.answer,
      answerPartial: d.pickup.answer,
      hospitalsH3: 'Hospitals we transport patients to and from',
      hospitalsLead: `We transport patients to and from hospitals in ${name}, including:`,
      ...(d.pickup.areasH3 ? { areasH3: d.pickup.areasH3 } : {}),
      upazilasH3: d.pickup.upazilasH3 ?? `Upazilas of ${d.admin}`,
      landmarkLine: "Share a landmark near the address, and we'll confirm the timing and the fare.",
    },

    fare: {
      eyebrow: 'Fare first',
      h2Lead: fromDistrict ? `${name} to Dhaka` : `Dhaka to ${name}`,
      h2Accent: 'ambulance fare',
      answer: `The fare depends on the ambulance type, the route and any waiting time. We tell you the full fare${tolls ? ', including tolls,' : ''} before we leave, and it does not change after the trip.`,
      more: d.fareMore,
      factorsH3: "What's included",
      tableCaption: `${name} ⇄ Dhaka ambulance fares`,
      tableWithin: 'Within Dhaka',
      paymentLabel: 'Ways to pay',
    },

    tips: {
      eyebrow: 'Before you travel',
      h2: `Before a ${name}–Dhaka journey`,
      intro: d.tipsIntro,
      items: [...d.tips, 'Keep the referral or discharge papers with you.'],
      close: 'Unsure about anything? Ask the dispatcher.',
    },

    faq: {
      eyebrow: 'Questions',
      h2Lead: `${name} ambulance`,
      h2Accent: 'questions',
      items: [
        {
          q: `Do you have an ambulance in ${name}?`,
          a: local
            ? `Yes. We have an ambulance in ${name} for pickups inside the city, and we run journeys to Dhaka and other districts.`
            : `Our ambulances are based in Dhaka and come to ${name} for each pickup. For a sudden emergency there, call 999.`,
          verified: true,
          shared: true,
        },
        {
          q: `What is the ambulance number for ${name}?`,
          a: `${phone}, 24 hours a day${wa ? ', by call or WhatsApp' : ''}.`,
          verified: true,
          shared: true,
        },
        ...d.faqs.map((x) => ({ q: x.q, a: x.a, verified: x.verified ?? true })),
        {
          q: `Can you bring an ICU patient from ${name} to Dhaka?`,
          a: 'Yes, when the treating doctor advises ICU support on the way. Share both hospitals and the support needed, and we confirm the vehicle and the full fare first.',
          verified: icu && fromDistrict,
          shared: true,
        },
        {
          q: 'Are bridge and highway tolls included in the fare?',
          a: 'Yes. The fare we tell you before we leave includes the tolls on the way, so there is nothing extra to pay on the road.',
          verified: tolls,
          shared: true,
        },
        {
          q: `Can I book from abroad for a family member in ${name}?`,
          a: `Yes. WhatsApp us the pickup in ${name}, the destination and the patient's needs. We tell you the full fare first and keep you updated.`,
          verified: wa && longTrip.bookFromAbroad.verified,
          shared: true,
        },
      ],
    },

    nearby: {
      eyebrow: 'Nearby',
      h2Lead: 'Nearby districts',
      h2Accent: 'we serve',
      answer: d.nearbyAnswer,
      districts: d.nearby,
      chip: 'Dhaka to {d} ambulance',
      hubLead: 'Going somewhere else? See our',
      hubAnchor: 'ambulance from Dhaka to any district',
    },

    napHeading: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: `We serve ${name} from our dispatch base in Mohakhali, Dhaka.` },

    final: {
      h2Lead: 'Need an ambulance',
      h2Accent: `for ${name}?`,
      text: wa ? `Send the ${name} pickup, the destination and the date on WhatsApp, or call. We tell you the full fare before we leave.` : `Call with the ${name} pickup, the destination and the date. We tell you the full fare before we leave.`,
      h3: 'Prefer a call back?',
      pickupHint: `e.g. hospital name, ${name} → Dhaka`,
    },
  });
}

function fitDescription(options: string[]) {
  return options.find((t) => t.length <= 155) ?? cap(options[options.length - 1]!.slice(0, 155));
}
