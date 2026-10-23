/**
 * Inter-District Ambulance hub: /inter-district-ambulance-service/ (new URL).
 * Brief: inter-district content brief, Oct 2026. The hub targets the generic intent
 * ("ambulance Dhaka to district", "inter-district ambulance") and links down to each district
 * page through the route table. It never targets "{District} ambulance" (district pages own those).
 *
 * Personas: E (planned mover) first; D (freezer van home) and B (ICU district transfer) second.
 * Voice: practical, clear. No journey-time promises. No em dashes in body copy.
 *
 * Gated where it renders: routes.ts (distances, fares, longTrip facts), fares.ts
 * (fares['inter-district']: factors, ranges, payment), destinations.ts (pickupAnyHospital)
 * and the FAQ verified flags. Copy that depends on a longTrip fact switches when it is verified.
 */
import { business, shown } from '../business';
import { pickupAnyHospital } from '../destinations';
import { longTrip, routes } from '../routes';
import { servicePageSchema } from './schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));
const icu = longTrip.icuLongRoutes.verified;
const tolls = longTrip.tollsIncluded.verified;
const districtPickup = longTrip.districtPickup.verified;
const vehicles = icu ? 'AC, ICU and freezer van' : 'AC ambulance and freezer van';

export const interDistrictPage = servicePageSchema.parse({
  serviceKey: 'inter-district',
  slug: '/inter-district-ambulance-service/',
  metaTitle: 'Dhaka to Any District Ambulance 24/7 | Ambulance BD 24',
  metaDescription:
    icu && tolls && districtPickup
      ? `Ambulance from Dhaka to any district and back: AC, ICU and freezer van. Full fare incl. tolls and waiting told before we leave. ${phone}`
      : `Ambulance from Dhaka to any district, 24/7: ${vehicles}. Full fare incl. waiting told before we leave. Call ${phone}.`,
  updated: '2026-10-21',
  byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page when our fares or routes change.`,
  breadcrumb: 'Inter-District Ambulance',
  schema: { name: 'Inter-District Ambulance', serviceType: 'Long-distance ambulance transport' },
  // Reviews naming a district route first, then speed, then any.
  reviewTags: ['inter-district', ...routes.map((r) => r.district.toLowerCase()), 'speed'],

  hero: {
    eyebrow: 'Inter-district ambulance · 24/7',
    h1: 'Ambulance from Dhaka to any district, 24/7',
    lede: 'Taking a patient home after discharge, or bringing them to Dhaka for treatment? We run ambulances between Dhaka and every district, and tell you the full fare before we leave.',
    waFirst: true,
    trust: ['Every district, any time', tolls ? 'Full fare told first, incl. tolls and waiting' : 'Full fare told first, waiting included', vehicles],
    card: {
      title: 'For a long trip, tell us',
      items: [
        { text: 'Pickup (hospital and ward, or home) and destination (district, upazila, address)' },
        { text: 'The patient: condition, oxygen, stretcher or wheelchair, or ICU support as advised by the doctor', notAClaim: true },
        { text: "Date and time, and whether it's one-way or return" },
      ],
      footerWithCrew: 'We confirm the vehicle, who comes with it, and the full fare before we leave.',
      footer: 'We confirm the vehicle and the full fare before we leave.',
    },
  },

  // §2 Which ambulance for a long journey (AEO + links to the service pages)
  trips: {
    eyebrow: 'Choose the vehicle',
    h2Lead: 'Which ambulance for',
    h2Accent: 'a long journey?',
    intro:
      "It depends on the patient's condition and what the treating doctor advises. Describe the patient to the dispatcher, and we help you choose before we tell you the fare.",
    items: [
      {
        icon: 'fan',
        title: 'AC ambulance',
        text: 'For stable patients: going home after discharge, or travelling for a check-up or treatment. A cooled cabin keeps long hours on the road more comfortable.',
        link: { key: 'ac', anchor: 'AC ambulance service' },
      },
      {
        icon: 'heart-pulse',
        title: 'ICU ambulance',
        text: icu
          ? 'For critically ill patients who need ICU support on the way, as the treating doctor advises. We run ICU ambulances on long district routes too.'
          : 'For critically ill patients who need ICU support on the way, as the treating doctor advises. Tell us the route first, and the dispatcher confirms whether an ICU ambulance can make the trip.',
        link: { key: 'icu', anchor: 'ICU ambulance in Dhaka' },
      },
      {
        icon: 'snow',
        title: 'Freezer van',
        text: 'When a family is taking a loved one home for burial. We carry them with care and respect, and tell you the full fare before we leave.',
        link: { key: 'freezer', anchor: 'Freezer van service' },
      },
      {
        icon: 'baby',
        title: 'NICU ambulance',
        text: "When a district hospital's doctor advises moving a newborn to a NICU in Dhaka. Tell us what the doctor says, and we take it step by step with you.",
        link: { key: 'nicu', anchor: 'NICU ambulance in Dhaka' },
        verified: districtPickup,
      },
    ],
  },

  // §3 Both directions
  directions: {
    eyebrow: 'Both directions',
    h2: 'Dhaka to your district, and back to Dhaka',
    h2Partial: 'Taking a patient from Dhaka to your district',
    items: [
      {
        icon: 'navigation',
        h3: 'From Dhaka to your district',
        text: 'Going home after discharge, moving a patient closer to family, or taking a loved one home for burial. Tell us the hospital or home in Dhaka and the full address in the district.',
        link: { key: 'freezer', anchor: 'Freezer van for the journey home' },
        verified: true,
      },
      {
        icon: 'route',
        h3: 'From your district to Dhaka',
        text: 'When a district hospital refers the patient to Dhaka for treatment. We collect the patient from the district hospital or from home, and take them to the Dhaka hospital.',
        verified: districtPickup,
      },
      {
        icon: 'building',
        h3: 'Pickup from any Dhaka hospital',
        text: "You don't need to use the ambulance at the hospital gate. Call us, and we come to the ward or gate where the patient is.",
        verified: pickupAnyHospital.verified,
      },
    ],
  },

  // §4 Route table (the signature section). Rows: src/data/routes.ts
  routes: {
    eyebrow: 'Routes',
    h2Lead: 'Routes we run',
    h2Accent: 'from Dhaka',
    intro: 'These are the routes families ask us about most. The driver chooses the road on the day, depending on traffic and the weather.',
    caption: 'Dhaka to district ambulance routes',
    cols: {
      district: 'District',
      division: 'Division',
      via: 'Main road',
      distance: 'Approx. road distance',
      page: 'Route page',
      fares: { ac: 'AC ambulance fare', icu: 'ICU ambulance fare', freezer: 'Freezer van fare' },
    },
    notChecked: 'Ask the dispatcher',
    distanceNote: 'Approx. road distance from Dhaka, from Google Maps. We do not promise journey times: traffic, ferries and the weather change them.',
    missingLead: "Don't see your district? We go to all 64 districts. Call or WhatsApp for your fare.",
    homeLead: 'Need an ambulance inside Dhaka? See our',
    homeAnchor: '24/7 ambulance service in Dhaka',
  },

  // §5 Fare for long trips
  fare: {
    eyebrow: 'Fare first',
    h2Lead: 'How the fare works',
    h2Accent: 'on long trips',
    answer: 'We tell you the full fare before departure, and it does not change after the trip.',
    more: "Send us the pickup, the full destination address, the date and the patient's needs. The dispatcher gives you one clear fare, and tells you whether it is one-way or includes the return to Dhaka.",
    factorsH3: 'What goes into the fare',
    tableCaption: 'Inter-district fare ranges',
    tableWithin: 'Within Dhaka',
    ...(longTrip.noChangeForDelays.verified
      ? {
          gateH3: 'No surprises on the road',
          gateText: 'No extra charge at the destination, and no change if traffic makes the trip run late. What we agree before we leave is what you pay.',
        }
      : {}),
    paymentLabel: 'Ways to pay',
  },

  // §6 Planning tips (practical, non-medical)
  tips: {
    eyebrow: 'Before you travel',
    h2: 'Planning a long ambulance trip',
    intro: "A little planning makes a long trip calmer for the patient and the family. None of this replaces the treating doctor's advice.",
    items: [
      'For a planned discharge, book a few hours ahead, so the ambulance is ready when the papers are.',
      'Keep the referral or discharge papers with you for the whole journey.',
      'Confirm the destination address with a nearby landmark, such as a school, mosque or bazar.',
      "Tell us what the patient needs for the whole journey, such as how many hours of oxygen the doctor advises.",
      'Tell us who will travel with the patient, so we can plan the seats.',
      'Keep one family phone on and charged, so the driver can reach you.',
    ],
    close: 'Not sure about something? Ask the dispatcher on the call.',
  },

  reviewsHeading: { eyebrow: 'Reviews', h2Lead: 'What families', h2Accent: 'say' },

  // §8 FAQ. Unverified answers stay empty until the client confirms (brief §8).
  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Inter-district ambulance',
    h2Accent: 'questions',
    items: [
      {
        q: 'Do you go to every district in Bangladesh?',
        a: 'Yes. We run ambulances from Dhaka to all 64 districts, day and night. Tell us the destination and we tell you the full fare before we leave.',
        verified: true,
      },
      {
        q: 'How much does an ambulance from Dhaka to a district cost?',
        a: 'It depends on the distance, the type of ambulance, waiting time and any extra stops. We tell you the full fare before departure, and it does not change after the trip.',
        verified: true,
      },
      // Needs longTrip.returnLeg (one-way or return included).
      { q: 'Is the fare one-way, or does it include the return?', a: '', verified: false },
      {
        q: 'Are tolls and ferries included in the fare?',
        a: 'Yes. Bridge and highway tolls and ferry fares on the route are part of the fare we tell you before we leave.',
        verified: tolls && longTrip.ferriesIncluded.verified,
      },
      {
        q: 'Can you bring a patient from a district to Dhaka?',
        a: 'Yes. When a district hospital refers the patient to Dhaka, we collect them from the hospital or from home and take them to the Dhaka hospital. Send us both addresses for the fare.',
        verified: districtPickup,
      },
      {
        q: 'Can an ICU ambulance go to another district?',
        a: 'Yes, when the treating doctor advises ICU support on the way. Tell the dispatcher about the patient and the route, and we confirm the vehicle and the full fare.',
        verified: icu,
      },
      // Needs longTrip.familySeats per vehicle type.
      { q: 'How many family members can travel along?', a: '', verified: false },
      {
        q: 'Do you run long trips at night?',
        a: 'Yes. We are open 24 hours, 7 days a week, and run trips between Dhaka and the districts at any hour.',
        verified: true,
      },
      // Needs longTrip.holidays (Eid availability and any surcharge).
      { q: 'Do you run trips on Eid and other holidays?', a: '', verified: false },
      {
        q: 'Can I book from abroad for a family member?',
        a: 'Yes. Message us on WhatsApp with the pickup, the destination and a family contact in Bangladesh. We tell you the full fare before we leave.',
        verified: wa && longTrip.bookFromAbroad.verified,
      },
    ],
  },

  // §9 Related: the service links live in "Which ambulance"; the home link sits under the route table.

  napHeading: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch',
    h2Accent: 'base',
    body: 'You never need to come to the base. Call or WhatsApp, and we plan the trip with you.',
  },

  final: {
    h2Lead: 'Planning a trip between',
    h2Accent: 'Dhaka and a district?',
    text: "Send the pickup, the destination and the patient's needs. We tell you the full fare before we leave.",
    h3: 'Rather we call you to plan it?',
    whatsapp: true,
    pickupHint: 'e.g. hospital name, Dhaka → Rangpur',
  },
});
