/**
 * Single source of truth for brand, NAP and service data.
 *
 * Mirrors docs/brand-deck.md (v1.3, 20 Oct 2026). If this file and the deck
 * disagree, the deck wins: update the deck first, then this file, then GBP,
 * social and citations.
 *
 * Never hard-code phone, hours, address, geo, email or social URLs anywhere
 * else. Import from here.
 *
 * Values marked `verified: false` are known but not yet confirmed by the
 * client. Pages and JSON-LD must not render them: read them through
 * `shown()`, which returns undefined until they are verified. The content
 * linter (scripts/lint-content.mjs) also reads the flags in this file.
 *
 * Keep this file to erasable TypeScript only (no enums, no namespaces):
 * the linter imports it directly with Node's built-in type stripping.
 */

export type Verifiable<T> = {
  readonly value: T;
  readonly verified: boolean;
  /** What is still needed from the client. */
  readonly note?: string;
};

/** Returns the value only once the client has confirmed it. */
export function shown<T>(field: Verifiable<T>): T | undefined {
  return field.verified ? field.value : undefined;
}

/** One row of the fare table (homepage FarePromise). Amounts in ৳. */
export type FareRow = {
  serviceKey: string;
  min: number;
  max: number;
  waitingPerHour?: number;
  extraStop?: number;
};

const PHONE_DISPLAY = '01919-339689';
const PHONE_E164 = '+8801919339689';

export const business = {
  name: 'Ambulance BD 24', // Always with spaces. "AmbulanceBD24" only in handles/URLs.
  handle: 'AmbulanceBD24',
  nameBn: {
    value: 'অ্যাম্বুলেন্স বিডি ২৪',
    verified: false,
    note: 'Bangla brand name not yet confirmed by client.',
  } as Verifiable<string>,
  url: 'https://ambulancebd24.com',

  phone: {
    /** Use for anything a person reads. Latin digits, even on Bangla pages. */
    display: PHONE_DISPLAY,
    /** Use for schema and tel: links. */
    e164: PHONE_E164,
    tel: `tel:${PHONE_E164}`,
  },

  whatsapp: {
    value: { number: '8801919339689', url: 'https://wa.me/8801919339689' },
    verified: true,
    note: 'Confirmed by owner, 20 Oct 2026.',
  } as Verifiable<{ number: string; url: string }>,

  email: {
    value: 'hello@ambulancebd24.com',
    verified: false,
    note: 'Pick one email; retire info@ everywhere.',
  } as Verifiable<string>,

  address: {
    street: {
      value: '',
      verified: false,
      note: 'House and road number needed.',
    } as Verifiable<string>,
    locality: 'Mohakhali',
    city: 'Dhaka',
    region: 'Dhaka Division',
    postalCode: '1212',
    country: 'Bangladesh',
    countryCode: 'BD',
    /** Exact display form from the deck. */
    display: 'Mohakhali, Dhaka 1212, Bangladesh',
  },

  geo: { lat: 23.7776294, lng: 90.4042711, plusCode: 'QCH3+3P' },

  hours: {
    display: 'Open 24 hours, 7 days a week',
    short: 'Open 24 hours, 7 days',
    is24x7: true,
  },

  gbp: {
    primaryCategory: 'Ambulance service',
    cid: '8178456293920123356',
    placeId: 'ChIJ4RUtzdyTfYcR3KkqAqu2f3E',
    mapsUrl: 'https://maps.google.com/?cid=8178456293920123356',
    embedUrl: 'https://maps.google.com/maps?cid=8178456293920123356&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Ambulance+BD+24&destination_place_id=ChIJ4RUtzdyTfYcR3KkqAqu2f3E',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ4RUtzdyTfYcR3KkqAqu2f3E',
    /** Reviews list on Google (for "Read all reviews on Google"). */
    reviewsListUrl: 'https://search.google.com/local/reviews?placeid=ChIJ4RUtzdyTfYcR3KkqAqu2f3E',
    /**
     * Shown as visible text only, never as schema. Re-check the numbers on GBP
     * before each release, then set verified: true.
     */
    rating: {
      value: { rating: 4.3, count: 35, checkedOn: '2026-09-29' },
      verified: false,
      note: 'From the 29 Sep 2026 audit. Confirm current numbers before showing.',
    } as Verifiable<{ rating: number; count: number; checkedOn: string }>,
    /**
     * Third-party Google reviews widget (Elfsight, Trustindex, etc.), loaded only
     * when the reviews section nears the screen. Paste from the provider's embed code:
     * scriptSrc = the <script src="…">, mountHtml = the <div …></div> (empty if none).
     * Turn OFF any "rich snippet"/schema option in the widget: no review schema on this site.
     */
    reviewsWidget: {
      value: { provider: 'Trustindex', scriptSrc: 'https://cdn.trustindex.io/loader.js?a7daa3c84dee03001116c8a7826', mountHtml: '' },
      verified: true,
      note: 'Trustindex widget from the owner, 20 Oct 2026.',
    } as Verifiable<{ provider: string; scriptSrc: string; mountHtml: string }>,
  },

  /** Real profiles only. Nothing else goes in sameAs. */
  sameAs: [
    'https://www.facebook.com/AmbulanceBD24Service',
    'https://x.com/BdAmbulance',
    'https://www.youtube.com/@ambulancebd24',
  ],

  /** Facts the client must still confirm. Not rendered until verified. */
  pending: {
    paymentMethods: { value: [], verified: false, note: 'Cash / bKash / Nagad? Unconfirmed.' } as Verifiable<string[]>,
    foundingYear: { value: null, verified: false } as Verifiable<number | null>,
    fleetSize: { value: null, verified: false } as Verifiable<number | null>,
    anyHospitalPickup: {
      value: null,
      verified: false,
      note: 'Can the team pick up at any hospital gate?',
    } as Verifiable<boolean | null>,
    fareRanges: {
      value: [],
      verified: false,
      note: 'Fare ranges, waiting charge and extra-stop rate per vehicle type.',
    } as Verifiable<FareRow[]>,
  },

  /**
   * Gates for claims. While false, the linter fails any copy that makes the claim.
   * Flip to true only when the client confirms in writing.
   */
  claims: {
    /** Allows "in writing" / লিখিত in fare copy. */
    fareInWritingSopLive: false,
    /** Allows promising a backup line. */
    backupLineLive: false,
    /** Allows crew-on-board wording (doctor, nurse, paramedic on board). */
    crewOnBoardVerified: false,
    /** Allows naming specific medical equipment (ventilator, defibrillator, etc.). */
    equipmentVerified: false,
    /** Allows "We check the AC before every trip" (ops SOP live). */
    acCheckSopLive: false,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Service catalogue: one name per service (deck, "Service catalogue") */
/* ------------------------------------------------------------------ */

export type ServiceStatus = 'fact' | 'verify';

export const services = [
  { key: 'emergency', en: 'Emergency Ambulance', bn: 'জরুরি অ্যাম্বুলেন্স', path: '/', status: 'fact' },
  { key: 'icu', en: 'ICU Ambulance', bn: 'আইসিইউ অ্যাম্বুলেন্স', path: '/icu-ambulance-service-dhaka/', status: 'fact' },
  { key: 'nicu', en: 'NICU Ambulance', bn: 'এনআইসিইউ অ্যাম্বুলেন্স', path: '/nicu-ambulance-service-dhaka/', status: 'fact' },
  { key: 'ac', en: 'AC Ambulance', bn: 'এসি অ্যাম্বুলেন্স', path: '/ac-ambulance-service/', status: 'fact' },
  { key: 'freezer', en: 'Freezer Van', bn: 'লাশবাহী ফ্রিজিং গাড়ি', path: '/freezer-ambulance-service/', status: 'fact' },
  {
    key: 'inter-district',
    en: 'Inter-District Ambulance',
    bn: 'ঢাকা থেকে জেলায় অ্যাম্বুলেন্স',
    path: '/inter-district-ambulance-service/',
    status: 'fact',
  },
  { key: 'non-ac', en: 'Non-AC Ambulance', bn: 'নন-এসি অ্যাম্বুলেন্স', path: '/non-ac-ambulance-service-dhaka/', status: 'verify' },
  { key: 'air', en: 'Air Ambulance', bn: 'এয়ার অ্যাম্বুলেন্স', path: '/air-ambulance-service-bangladesh/', status: 'fact' },
] as const satisfies ReadonlyArray<{
  key: string;
  en: string;
  bn: string;
  path: string;
  status: ServiceStatus;
}>;

export type ServiceKey = (typeof services)[number]['key'];
export const serviceKeys = services.map((s) => s.key) as [ServiceKey, ...ServiceKey[]];

/** Sit under ICU Ambulance until confirmed as separate vehicles. */
export const icuSubtypes = ['ccu', 'picu', 'cardiac', 'bls', 'als'] as const;

export function getService(key: ServiceKey) {
  const s = services.find((x) => x.key === key);
  if (!s) throw new Error(`Unknown service: ${key}`);
  return s;
}

/* ------------------------------------------------------------------ */
/* Approved copy: taglines, CTAs, USPs. Use these strings verbatim.    */
/* ------------------------------------------------------------------ */

const TIMING = 'Around 10 minutes in central Dhaka, depending on traffic';

export const copy = {
  tagline: {
    en: 'Fast ambulance. Fare confirmed first.',
    bn: 'দ্রুত অ্যাম্বুলেন্স, ভাড়া আগেই নিশ্চিত।',
  },
  /** Freezer Van pages use this, never the "fast" tagline. */
  freezerLine: {
    en: 'Taking your loved one home with respect — fare confirmed first.',
    bn: 'সম্মানের সাথে প্রিয়জনকে বাড়ি পৌঁছে দিই — ভাড়া আগেই নিশ্চিত।',
  },
  /**
   * The only approved timing claim (deck v1.3, USP #2). Every page takes it from here;
   * the content linter fails on any other timing wording. No Bangla line approved yet.
   *   en: full sentence · chip: no full stop (trust rows, cards) · inline: mid-sentence
   */
  timingLine: {
    en: `${TIMING}.`,
    chip: TIMING,
    inline: `${TIMING.charAt(0).toLowerCase()}${TIMING.slice(1)}`,
  },
  /** Approved fare line. "In writing" only once claims.fareInWritingSopLive is true. */
  fareLine: { en: 'We tell you the fare before we dispatch.' },
  cta: {
    call: { en: `Call ${PHONE_DISPLAY} — 24/7`, bn: `এখনই কল করুন: ${PHONE_DISPLAY}` },
    whatsapp: { en: 'WhatsApp for your fare', bn: 'হোয়াটসঅ্যাপে ভাড়া জানুন' },
    callback: { en: 'Request a call back', bn: 'কল ব্যাক চাই' },
    /** Freezer Van pages (Bangla). */
    freezerCall: { bn: 'কল করুন, আমরা পাশে আছি' },
  },
  /** Ranked. Lead with #1 and #2 together. */
  usps: [
    { rank: 1, en: 'Fare told before we move, no change after', requires: 'fareInWritingSopLive (for "in writing")' },
    { rank: 2, en: `Nearest ambulance, ${TIMING.charAt(0).toLowerCase()}${TIMING.slice(1)}` },
    { rank: 3, en: 'ICU, NICU, AC and Freezer Van on one hotline' },
    { rank: 4, en: 'Open 24/7, a person answers', requires: 'backupLineLive' },
    { rank: 5, en: 'Right vehicle for the patient' },
    { rank: 6, en: 'Dhaka to any district' },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* JSON-LD builders. Unverified fields are left out.                   */
/* ------------------------------------------------------------------ */

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function postalAddressLd() {
  // Until the house/road number is confirmed, the locality stands in (homepage spec §6).
  const street = shown(business.address.street) || business.address.locality;
  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.countryCode,
  };
}

function openingHoursLd() {
  return [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ALL_DAYS, opens: '00:00', closes: '23:59' }];
}

/** Stable public image URLs for schema (files in public/). Real photo and logo only. */
export const schemaImages = {
  logo: { url: `${business.url}/logo.png`, width: 375, height: 165 },
  photo: { url: `${business.url}/og-default.jpg`, width: 1200, height: 630 },
};

export const ids = {
  organization: `${business.url}/#org`,
  business: `${business.url}/#business`,
  website: `${business.url}/#website`,
};

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ids.organization,
    name: business.name,
    url: `${business.url}/`,
    logo: { '@type': 'ImageObject', ...schemaImages.logo },
    telephone: business.phone.e164,
    ...(shown(business.email) ? { email: shown(business.email) } : {}),
    sameAs: [...business.sameAs],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.phone.e164,
      contactType: 'emergency',
      areaServed: business.address.countryCode,
      availableLanguage: ['en', 'bn'],
      hoursAvailable: openingHoursLd(),
    },
  };
}

/**
 * For the home page and location pages (docs/homepage-spec.md §6).
 * No rating or review markup until real on-site reviews exist.
 */
export function emergencyServiceLd(opts: { pageUrl?: string } = {}) {
  const email = shown(business.email);
  return {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    '@id': ids.business,
    name: business.name,
    url: opts.pageUrl ?? `${business.url}/`,
    image: schemaImages.photo.url,
    logo: schemaImages.logo.url,
    telephone: business.phone.e164,
    ...(email ? { email } : {}),
    address: postalAddressLd(),
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.gbp.mapsUrl,
    openingHoursSpecification: openingHoursLd(),
    areaServed: [
      { '@type': 'City', name: business.address.city },
      { '@type': 'Country', name: business.address.country },
    ],
    sameAs: [...business.sameAs],
    parentOrganization: { '@id': ids.organization },
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${business.url}/`,
    name: business.name,
    inLanguage: ['en-BD', 'bn-BD'],
    publisher: { '@id': ids.organization },
  };
}

export type Faq = { q: string; a: string };

/** FAQPage from the same faqs[] that the page renders. */
export function faqPageLd(faqs: readonly Faq[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Combines nodes into one @graph, dropping each node's own @context. */
export function graphLd(...nodes: Array<Record<string, unknown>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map(({ '@context': _ctx, ...rest }) => rest),
  };
}

/** BreadcrumbList. Items in order, Home first. Matches the visible breadcrumbs. */
export function breadcrumbLd(pageUrl: string, items: ReadonlyArray<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

/**
 * Service node for a service page. Offers only when the fare is verified (pass it in);
 * WhatsApp only once verified. No rating or review markup.
 */
export function serviceLd(opts: {
  pageUrl: string;
  name: string;
  serviceType: string;
  offers?: { minPrice: number; maxPrice: number };
  /** Overrides the default (Dhaka + Bangladesh), e.g. Bangladesh + each district on the inter-district hub. */
  areaServed?: Array<Record<string, unknown>>;
}) {
  const wa = shown(business.whatsapp);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${opts.pageUrl}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    url: opts.pageUrl,
    provider: { '@id': ids.business },
    areaServed: opts.areaServed ?? [
      { '@type': 'City', name: business.address.city },
      { '@type': 'Country', name: business.address.country },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: business.phone.e164, contactType: 'emergency' },
      ...(wa ? { serviceUrl: wa.url } : {}),
    },
    hoursAvailable: openingHoursLd(),
    ...(opts.offers
      ? {
          offers: {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'BDT',
              minPrice: opts.offers.minPrice,
              maxPrice: opts.offers.maxPrice,
            },
          },
        }
      : {}),
  };
}

export function webPageLd(opts: { pageUrl: string; name: string; dateModified: string; aboutId?: string; lang?: 'en' | 'bn' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': opts.pageUrl,
    url: opts.pageUrl,
    name: opts.name,
    inLanguage: opts.lang === 'bn' ? 'bn-BD' : 'en-BD',
    isPartOf: { '@id': ids.website },
    ...(opts.aboutId ? { about: { '@id': opts.aboutId } } : {}),
    breadcrumb: { '@id': `${opts.pageUrl}#breadcrumb` },
    publisher: { '@id': ids.organization },
    dateModified: opts.dateModified,
  };
}
