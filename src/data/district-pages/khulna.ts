/**
 * Khulna location page: /ambulance-service-khulna/ (existing URL, keep exactly; the old generic
 * template copy is not migrated). Brief: Khulna location page brief, Oct 2026.
 *
 * Mode A (districts.khulna.localDispatch = false, the default): we serve Khulna from Dhaka for
 * transfers and planned journeys, and say plainly that a sudden emergency inside Khulna needs 999
 * or the nearest hospital. Mode B (true, only once verified): local ambulance in Khulna city.
 *
 * Gates (copy switches when a flag is verified):
 * - longTrip.districtPickup (routes.ts): collecting a patient in Khulna and bringing them to Dhaka.
 *   Until verified, the page leads with Dhaka → Khulna (the inter-district hub does the same).
 * - longTrip.icuLongRoutes, tollsIncluded, familySeats, bookFromAbroad, returnLeg (routes.ts)
 * - districts.khulna: coverage, wardPickup, remoteUpazilas, routePractice, landPortTrips, destinations
 * - ops.freezerPapers (ops.ts)
 *
 * Personas: E planned mover, D grieving family, B ICU transfer, F relative abroad.
 * Voice: calm dispatcher, practical, honest. No travel-time promises. No em dashes in body copy.
 */
import { business, shown } from '../business';
import { districts } from '../districts';
import { ops } from '../ops';
import { longTrip } from '../routes';
import { districtPageSchema } from './schema';

const k = districts.khulna;
const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));

const local = k.localDispatch.verified; // Mode B
const fromKhulna = local || longTrip.districtPickup.verified;
const icu = longTrip.icuLongRoutes.verified;
const tolls = longTrip.tollsIncluded.verified;
const coverage = fromKhulna && k.coverage.verified;
const ward = fromKhulna && k.wardPickup.verified;
const seats = longTrip.familySeats.verified;
const route = k.routePractice.verified;

const vehicleList = icu ? 'AC, ICU and freezer van' : 'AC ambulance and freezer van';
const book = wa ? `Call ${phone} or WhatsApp, 24 hours a day, 7 days a week.` : `Call ${phone}, 24 hours a day, 7 days a week.`;

export const khulnaPage = districtPageSchema.parse({
  key: 'khulna',
  district: 'Khulna',
  slug: '/ambulance-service-khulna/',
  // Primary keyword: "ambulance service in Khulna" / "Ambulance Service Khulna".
  // SERP (Oct 2026): searchers want an ambulance that picks up in Khulna, mainly to Dhaka or another
  // district; Dhaka → Khulna is the secondary use. Until a local ambulance is verified (Mode B),
  // the title carries the scope (to Dhaka) and the page says 999 for sudden emergencies in Khulna.
  metaTitle: local
    ? 'Ambulance Service in Khulna, 24/7 | Ambulance BD 24'
    : fromKhulna
      ? 'Ambulance Service in Khulna to Dhaka, 24/7 | Ambulance BD 24'
      : 'Ambulance Service in Khulna from Dhaka | Ambulance BD 24',
  metaDescription: local
    ? `Ambulance service in Khulna, 24/7, and journeys to Dhaka or any district: ${vehicleList}. Fare told before dispatch. Call ${phone}.`
    : fromKhulna
      ? `Ambulance service in Khulna: pickup from hospital or home, to Dhaka or any district, 24/7. ${icu ? 'AC, ICU and freezer van' : 'AC and freezer van'}. Fare told first. Call ${phone}.`
      : `Ambulance service in Khulna for journeys from Dhaka, 24/7: ${vehicleList}. Full fare incl. ${tolls ? 'tolls and ' : ''}waiting told first. Call ${phone}.`,
  updated: '2026-10-22',
  byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page when our Khulna fares or routes change.`,
  breadcrumb: 'Khulna',
  schema: {
    name: 'Ambulance service in Khulna',
    serviceType: 'Long-distance ambulance transport',
    areaServed: [
      { type: 'City', name: 'Khulna' },
      { type: 'AdministrativeArea', name: 'Khulna District' },
      { type: 'City', name: 'Dhaka' },
    ],
    mentions: [
      { type: 'City', name: 'Khulna', sameAs: 'https://en.wikipedia.org/wiki/Khulna' },
      { type: 'Place', name: 'Padma Bridge', sameAs: 'https://en.wikipedia.org/wiki/Padma_Bridge' },
    ],
  },
  facts: k,
  reviewTags: ['khulna', 'inter-district'],

  // §1 Hero
  hero: {
    eyebrow: fromKhulna ? 'Ambulance service Khulna · to Dhaka or any district · 24/7' : 'Ambulance service Khulna · 24/7',
    h1: local
      ? 'Ambulance service in Khulna, 24/7'
      : fromKhulna
        ? 'Ambulance service in Khulna, to Dhaka or any district'
        : 'Ambulance service in Khulna for journeys from Dhaka',
    lede: local
      ? `Need an ambulance service in Khulna? Call one number, day or night. We send the nearest available ambulance in Khulna, run journeys to Dhaka or any district, and tell you the fare before we move.`
      : fromKhulna
        ? `Need an ambulance from Khulna to a Dhaka hospital, or to another district? We pick up from ${coverage ? 'any hospital or home' : 'hospitals and homes'} in Khulna, run ${icu ? 'AC, ICU and freezer-van' : 'AC ambulance and freezer-van'} journeys across Bangladesh, and tell you the full fare before we leave.`
        : 'Need an ambulance service in Khulna for a journey home from a Dhaka hospital, or to take a loved one home? We run AC ambulance and freezer-van journeys from Dhaka to Khulna, and tell you the full fare before we leave.',
    bnLine: 'খুলনা অ্যাম্বুলেন্স সার্ভিস, ২৪ ঘণ্টা',
    waFirst: true,
    trust: [
      coverage ? 'Pickup from any hospital or home in Khulna' : fromKhulna ? 'Pickup in Khulna' : 'To any address in Khulna district',
      ...(fromKhulna ? ['To Dhaka or any district'] : []),
      tolls ? 'Full fare first, incl. tolls and waiting' : 'Full fare first, waiting included',
      business.hours.short,
    ],
    card: {
      title: 'For a Khulna trip, tell us',
      items: [
        { text: fromKhulna ? 'Pickup in Khulna (hospital and ward, or home with a landmark), and where the patient is going' : 'Pickup in Dhaka (hospital and ward, or home) and the full address in Khulna, with a landmark' },
        { text: "The patient's needs on the way, as the doctor advised (for example oxygen or ICU support)", notAClaim: true },
        { text: 'The date and time, and whether it is one-way or return' },
      ],
      footerWithCrew: 'We confirm the vehicle, who comes with it, and the full fare before we leave.',
      footer: 'We confirm the vehicle and the full fare before we leave.',
    },
  },

  // §2 Key facts (GEO / AI-answer block)
  keyFacts: {
    eyebrow: 'At a glance',
    h2: 'Ambulance service in Khulna: key facts',
    items: [
      {
        term: 'Service',
        value: fromKhulna
          ? 'Khulna ambulance service: pickup in Khulna to Dhaka or any district, and journeys from Dhaka back to Khulna, 24/7.'
          : 'Khulna ambulance service for journeys from Dhaka to Khulna, 24/7. Coming from Khulna to Dhaka? Call, and the dispatcher tells you what we can arrange.',
      },
      { term: 'Ambulance types', value: `${icu ? 'AC ambulance, ICU ambulance and freezer van' : 'AC ambulance and freezer van'} on the Khulna route. The dispatcher matches the vehicle to the patient.` },
      {
        term: 'Pickup',
        value: coverage
          ? 'Any hospital or home in Khulna city and Khulna district. Drop-off at any hospital or home in Dhaka or another district.'
          : 'From a hospital or home in Dhaka, to an address in Khulna city or Khulna district.',
      },
      {
        term: 'Route',
        value: route
          ? 'The Dhaka–Khulna highway via the Padma Bridge corridor. The driver chooses the safest route on the day.'
          : 'Most journeys use the Dhaka–Khulna highway via the Padma Bridge corridor. The dispatcher confirms the route on the call.',
      },
      {
        term: 'Fare',
        value: `Told before departure, including ${tolls ? 'tolls and ' : ''}waiting. It does not change after the trip to Khulna.`,
      },
      { term: 'How to book', value: book },
      { term: 'Dispatch base', value: local ? `${business.address.locality}, Dhaka, with an ambulance in Khulna city.` : `${business.address.locality}, Dhaka. We serve Khulna from Dhaka.` },
    ],
  },

  // §3 Mode A only: emergencies inside Khulna, said honestly
  ...(local
    ? {}
    : {
        emergency: {
          eyebrow: 'Emergency in Khulna',
          h2: 'Is this a sudden emergency inside Khulna?',
          answer:
            "Our ambulances come from Dhaka, so we're the right call for transfers and planned journeys, not for an emergency inside Khulna that needs help right away. For that, call 999 or go to the nearest hospital.",
          more: fromKhulna
            ? 'Our ambulance travels from Dhaka to collect the patient, so call as early as you can. Once the patient is stable and the doctor advises a transfer to Dhaka or another district, we plan the journey and tell you the full fare first.'
            : 'Once the patient is stable, call us about the journey to Dhaka. The dispatcher tells you what we can arrange, and the full fare, before you agree.',
        },
      }),

  // §4 Journeys we run
  journeys: {
    eyebrow: 'Journeys',
    h2Lead: 'Our Khulna ambulance',
    h2Accent: 'journeys',
    intro: 'Most Khulna trips are planned a few hours or a day ahead, because our ambulance travels from Dhaka. Each one starts with the same call: who is travelling, from where, and what the doctor advised.',
    items: [
      {
        icon: 'route',
        title: 'Khulna to a Dhaka hospital for treatment',
        text: `When a doctor in Khulna refers the patient to a hospital in Dhaka for specialist treatment. We collect the patient from the Khulna hospital or from home and take them to the Dhaka hospital, in ${icu ? 'an AC or ICU ambulance' : 'the vehicle'} as the doctor advises.${ward ? ' We come to the ward or gate where the patient is.' : ''} Tell the dispatcher: the Khulna hospital and ward, the Dhaka hospital, and whether the bed there is confirmed.`,
        verified: fromKhulna,
      },
      {
        icon: 'navigation',
        title: 'Khulna to another district',
        text: "Moving a patient from Khulna to a hospital in Jashore, Barishal, Rajshahi or anywhere else in Bangladesh, or taking them to family in another district. We collect the patient in Khulna and take them door to door. Tell the dispatcher: the pickup in Khulna, the full destination address with a landmark, the patient's needs on the way as the doctor advised, and the date.",
        verified: fromKhulna,
      },
      {
        icon: 'navigation',
        title: 'Home to Khulna after treatment in Dhaka',
        text: `Discharged from a Dhaka hospital and going home to Khulna? An AC ambulance lets the patient lie down for the whole journey on the highway. Discharge papers often take longer than planned, so book ahead${wa ? ' on WhatsApp' : ''} and we time the pickup with the papers. Tell the dispatcher: the Dhaka hospital and ward, the full home address in Khulna with a landmark, and who is travelling.`,
      },
      {
        icon: 'snow',
        title: 'Taking a loved one home to Khulna',
        text: `We are sorry for your loss. When a family is taking a loved one home to Khulna for burial or cremation, we carry them in a freezer van with care and respect.${seats ? ' Family members can travel with them.' : ''} We tell you the full fare before we leave, so there is nothing to discuss on the road. Tell the dispatcher: the hospital or home in Dhaka, the address in Khulna, and when the family is ready.`,
        link: { key: 'freezer', anchor: 'freezer van from Dhaka to Khulna', placement: 'khulna-journeys-freezer' },
      },
      {
        icon: 'building',
        title: 'Moving a patient to a hospital in Khulna',
        text: 'Some families move a patient from a Dhaka hospital to a hospital in Khulna, closer to home, once the treating doctor agrees. We take the patient from the ward in Dhaka to the hospital in Khulna, in the vehicle the doctor advises. Tell the dispatcher: both hospitals, the support the patient needs on the way, and whether the Khulna hospital has confirmed the admission.',
      },
      {
        icon: 'heart-pulse',
        title: 'Critical transfer, Khulna ⇄ Dhaka',
        text: 'When the treating doctor says a critically ill patient needs ICU support on the way between Khulna and Dhaka. A transfer on this route needs enough support for the whole journey, including waiting and city traffic at both ends, so call as early as you can. Tell the dispatcher: both hospitals, the support the doctor advises, and when the patient is ready to move.',
        link: { key: 'icu', anchor: 'ICU ambulance', placement: 'khulna-journeys-icu' },
        verified: icu && fromKhulna,
      },
      {
        icon: 'route',
        title: 'Khulna to Benapole for treatment in India',
        text: "Many families from Khulna travel to India for treatment through the Benapole land port. We take the patient from a hospital or home in Khulna to Benapole, ready for the border crossing. Tell the dispatcher: the pickup in Khulna, the time you need to reach the land port, and the patient's needs on the way as the doctor advised.",
        link: { href: '/ambulance-service-benapole/', anchor: 'ambulance to Benapole land port', placement: 'khulna-journeys-benapole' },
        verified: fromKhulna && Boolean(k.landPortTrips?.verified),
      },
    ],
  },

  // §5 Which ambulance for the Khulna route
  vehicles: {
    eyebrow: 'Choose the vehicle',
    h2Lead: 'Which ambulance',
    h2Accent: 'for a Khulna trip?',
    intro: "It depends on the patient's condition and the treating doctor's advice. Describe the patient, and the dispatcher helps you choose before telling you the fare.",
    items: [
      { key: 'ac', anchor: 'AC ambulance', text: 'For stable patients on the Khulna road: discharge trips home and planned treatment journeys.' },
      {
        key: 'icu',
        anchor: 'ICU ambulance',
        text: icu
          ? 'For critically ill patients between Khulna and Dhaka, when the doctor advises ICU support on the way.'
          : 'For critically ill patients. Tell us the Khulna route first, and the dispatcher confirms whether an ICU ambulance can make the trip.',
      },
      { key: 'freezer', anchor: 'Freezer van', text: 'For taking a loved one home to Khulna, with care and respect.' },
    ],
    homeLead: 'Need an ambulance inside Dhaka? See our',
    homeAnchor: '24/7 ambulance service in Dhaka',
  },

  // §6 The route
  route: {
    eyebrow: 'The route',
    h2: 'The Khulna–Dhaka route',
    answer: `Most journeys between Dhaka and Khulna use the Padma Bridge corridor, through Bhanga and Gopalganj on the Dhaka–Khulna highway. ${route ? 'The driver picks the safest route on the day.' : 'The dispatcher confirms the route on the call.'}`,
    factorsH3: 'What affects the journey',
    factors: [
      'City traffic at both ends, such as around Gollamari in Khulna and the roads into Dhaka',
      'The time of day you leave',
      'Toll plazas on the bridge and the highway',
      'Rest stops on a long journey',
      "The patient's needs on the way, as the doctor advised",
    ],
    distanceLine: 'Approximate road distance from Dhaka to Khulna: {km} km (approx., from Google Maps).',
    etaLine: 'We do not promise a travel time. The dispatcher gives an estimated arrival time on the call.',
    stops: fromKhulna
      ? [{ name: 'Khulna', note: 'Pickup' }, { name: 'Gopalganj' }, { name: 'Bhanga' }, { name: 'Padma Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }]
      : [{ name: 'Dhaka', note: 'Our base in Mohakhali' }, { name: 'Padma Bridge' }, { name: 'Bhanga' }, { name: 'Gopalganj' }, { name: 'Khulna' }],
    diagramAlt: fromKhulna
      ? 'Route diagram: Khulna to Dhaka via Gopalganj, Bhanga and the Padma Bridge on the Dhaka–Khulna highway.'
      : 'Route diagram: Dhaka to Khulna via Padma Bridge, Bhanga and Gopalganj on the Dhaka–Khulna highway.',
    onRoute: { lead: 'The highway passes through Gopalganj on the way. See our', district: 'Gopalganj', anchor: 'ambulance service in Gopalganj' },
  },

  // §7 Where we pick up in Khulna
  pickup: {
    eyebrow: 'Where we go',
    h2: 'Ambulance service across Khulna city and district',
    h2Partial: 'Where our Khulna ambulance service goes',
    answer: 'We pick up from any hospital or home in Khulna city and across Khulna district, and take the patient to Dhaka or any other district. Coming home? We drop off anywhere in Khulna too.',
    answerPartial: 'We take patients from Dhaka to hospitals and homes across Khulna city and Khulna district. For a pickup inside Khulna, call and the dispatcher tells you what we can arrange.',
    hospitalsH3: 'Hospitals we transport patients to and from',
    hospitalsLead: fromKhulna ? 'We transport patients to and from hospitals in Khulna, including:' : 'We transport patients to hospitals in Khulna, including:',
    areasH3: 'Areas in Khulna city',
    upazilasH3: 'Upazilas of Khulna district',
    landmarkLine: "Tell us a landmark near the address, and we'll confirm the timing and the fare.",
  },

  // §8 Fare
  fare: {
    eyebrow: 'Fare first',
    h2Lead: fromKhulna ? 'Khulna to Dhaka' : 'Dhaka to Khulna',
    h2Accent: 'ambulance fare',
    answer: tolls
      ? 'The fare depends on the ambulance type, the route and any waiting time. We tell you the full fare, including bridge tolls, before we leave, and it does not change after the trip.'
      : 'The fare depends on the ambulance type, the route and any waiting time. We tell you the full fare before we leave, and it does not change after the trip.',
    more: 'Ask any provider whether a quote is one-way or includes the return. We say it clearly on the call, so you can compare.',
    factorsH3: "What's included",
    tableCaption: 'Khulna ⇄ Dhaka ambulance fares',
    tableWithin: 'Within Dhaka',
    gateH3: 'No surprise at the hospital gate',
    gateText: ward
      ? 'At a hospital gate, families are often pressed to take whichever ambulance is waiting, at a higher fare, at the moment they are most stressed. Our rule is simple: we tell you the fare first, before you agree, and we come to the ward or gate where the patient is.'
      : 'At a hospital gate, families are often pressed to take whichever ambulance is waiting, at a higher fare, at the moment they are most stressed. Our rule is simple: we tell you the fare first, before you agree, and it stays as agreed.',
    paymentLabel: 'Ways to pay',
  },

  // §9 Planning checklist (non-medical)
  tips: {
    eyebrow: 'Before you travel',
    h2: 'Before a Khulna–Dhaka journey',
    intro: "A little planning makes the road between Khulna and Dhaka calmer for everyone. None of this replaces the treating doctor's advice.",
    items: [
      'Keep the referral or discharge papers with you for the whole journey.',
      'Confirm the destination hospital, and that a bed is ready, before you leave.',
      "Tell us the patient's needs for the whole journey, as the doctor advised.",
      'Keep one family phone on and charged, so the driver can reach you.',
      ...(ops.freezerPapers.verified ? [`For a freezer van: ${ops.freezerPapers.value.en.charAt(0).toLowerCase()}${ops.freezerPapers.value.en.slice(1)}.`] : []),
    ],
    close: 'Unsure about anything for the Khulna trip? Ask the dispatcher.',
  },

  // §11 FAQ (verified answers only; same data feeds FAQPage)
  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Khulna ambulance',
    h2Accent: 'questions',
    items: [
      {
        q: 'Do you have an ambulance in Khulna?',
        a: local
          ? 'Yes. We have an ambulance in Khulna city for pickups inside the city, and we run journeys between Khulna and Dhaka. The dispatcher gives you an estimated arrival time on the call.'
          : fromKhulna
            ? 'We pick up patients in Khulna for journeys to Dhaka or any district, and bring patients home to Khulna. Our ambulance travels from our base in Dhaka, so call as early as you can. For a sudden emergency inside Khulna, call 999 or go to the nearest hospital.'
            : 'Our ambulances come from our base in Dhaka. We are the right call for planned journeys on the Khulna–Dhaka route. For a sudden emergency inside Khulna, call 999 or go to the nearest hospital.',
        verified: true,
      },
      {
        q: 'What is the ambulance number for Khulna?',
        a: `Call ${phone}, 24 hours a day, 7 days a week${wa ? ', or send a WhatsApp message to the same number' : ''}. It is the hotline for all our Khulna journeys.${local ? '' : ' For a sudden emergency inside Khulna, call 999.'}`,
        verified: true,
      },
      {
        q: 'How much is an ambulance from Khulna to Dhaka?',
        a: `It depends on the ambulance type, the route, waiting time and whether the trip is one-way or return. We tell you the full fare${tolls ? ', including tolls,' : ''} before we leave, and it does not change after the trip.`,
        verified: true,
      },
      {
        q: 'Can you take a patient from Khulna to another district?',
        a: 'Yes. We collect the patient from a hospital or home in Khulna and take them to any district in Bangladesh. Tell us the full destination address and the patient\'s needs on the way, and we tell you the full fare before we leave.',
        verified: fromKhulna,
      },
      {
        q: 'Can you bring an ICU patient from Khulna to Dhaka?',
        a: 'Yes, when the treating doctor advises ICU support on the way. Tell us both hospitals and the support the patient needs, and we confirm the vehicle and the full fare before we leave.',
        verified: icu && fromKhulna,
      },
      {
        q: 'Can you take a loved one from Dhaka to Khulna in a freezer van?',
        a: `Yes. We carry your loved one home to Khulna with care and respect.${seats ? ' Family members can travel with them.' : ''} Tell us the hospital or home in Dhaka and the address in Khulna, and we tell you the full fare before we leave.`,
        verified: true,
      },
      {
        q: 'Can you pick up from any hospital in Khulna?',
        a: 'Yes. Tell us the hospital and the ward, and we come to the ward or gate where the patient is.',
        verified: ward,
      },
      {
        q: 'Which route do you take, and how long does it take?',
        a: `Most journeys use the Padma Bridge corridor, through Bhanga and Gopalganj on the Dhaka–Khulna highway. We do not promise a fixed travel time: traffic and the time of day change it. The dispatcher gives an estimated arrival time on the call.`,
        verified: true,
      },
      {
        q: 'Are bridge tolls included in the fare?',
        a: 'Yes. The fare we tell you before we leave includes the bridge and highway tolls, so there is nothing extra to pay on the road.',
        verified: tolls,
      },
      {
        q: 'Do you go to upazilas like Dumuria, Paikgachha or Koyra?',
        a: 'Yes, including the coastal upazilas. Tell us the upazila and a landmark, and we confirm the timing and the full fare.',
        verified: k.remoteUpazilas.verified,
      },
      {
        q: 'Can I book from abroad for a parent in Khulna?',
        a: 'Yes. Message us on WhatsApp with the pickup, the destination and the patient’s needs. We tell you the full fare before we leave, and keep you updated.',
        verified: wa && longTrip.bookFromAbroad.verified,
      },
    ],
  },

  // §12 Nearby districts
  nearby: {
    eyebrow: 'Nearby',
    h2Lead: 'Nearby districts',
    h2Accent: 'we serve',
    answer: 'We also run journeys between Dhaka and the districts around Khulna, with the full fare told before we leave.',
    districts: ['Jessore', 'Benapole', 'Gopalganj', 'Kushtia', 'Barisal'],
    chip: 'Dhaka to {d} ambulance',
    hubLead: 'Going somewhere else? See our',
    hubAnchor: 'ambulance from Dhaka to any district',
  },

  // §13 NapMap (real Dhaka NAP; never a Khulna address)
  napHeading: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch',
    h2Accent: 'base',
    body: 'We serve Khulna from our dispatch base in Mohakhali, Dhaka.',
  },

  // §14 Final CTA
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'for Khulna?',
    text: wa ? 'Send the pickup, the destination and the date on WhatsApp, or call. We tell you the full fare before we leave.' : 'Call with the pickup, the destination and the date. We tell you the full fare before we leave.',
    h3: 'Prefer a call back?',
    pickupHint: 'e.g. hospital name, Khulna → Dhaka',
  },
});
