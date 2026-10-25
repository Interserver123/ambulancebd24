/**
 * Air Ambulance page: /air-ambulance-service-bangladesh/ (new URL).
 * Deck v1.3: Air Ambulance is ARRANGED through an aviation operator, with our ground
 * ambulance to and from the airport. Never "our aircraft", "our plane" or "our helicopter".
 * No routes, countries, aircraft types, operator names or fares until the client confirms them.
 * Voice: formal, clear English (persona F, relative abroad, reads this too).
 *
 * Gated where it renders: fares.ts (fares.air), the verified flag on each FAQ.
 */
import { business, shown } from '../business';
import { servicePageSchema } from './schema';

const phone = business.phone.display;

export const airPage = servicePageSchema.parse({
  serviceKey: 'air',
  slug: '/air-ambulance-service-bangladesh/',
  metaTitle: 'Air Ambulance Service in Bangladesh | Ambulance BD 24',
  metaDescription: `We arrange air ambulance transfers through an aviation operator, with our ground ambulance to and from the airport. Call ${phone} for details, 24/7.`,
  updated: '2026-10-21',
  byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page when the arrangements change.`,
  breadcrumb: 'Air Ambulance',
  schema: { name: 'Air Ambulance (arranged)', serviceType: 'Air ambulance arrangement' },
  reviewTags: ['air', 'icu'],

  hero: {
    eyebrow: 'Air ambulance · arranged · 24/7',
    h1: 'Air ambulance service in Bangladesh',
    lede: 'When the distance is too far or too hard by road, we arrange an air ambulance through an aviation operator, and take the patient to and from the airport in our ground ambulance.',
    trust: ['One hotline, 24 hours', 'Arranged through an aviation operator', 'Our ground ambulance at both ends'],
    card: {
      title: 'To start an air transfer, tell us',
      items: [
        { text: 'Where the patient is now, and where they need to go' },
        { text: "The patient's condition, and what the treating doctor says about flying" },
        { text: 'When the patient needs to travel, and whether the receiving hospital has agreed' },
      ],
      footerWithCrew: 'We confirm the arrangement, who travels with the patient, and the cost before you agree.',
      footer: 'We confirm the arrangement and the cost before you agree.',
    },
  },

  steps: {
    eyebrow: 'Step by step',
    h2Lead: 'How we arrange',
    h2Accent: 'an air transfer',
    intro: 'An air transfer takes more planning than a road trip. Call as early as you can, so there is time to arrange the flight and the ground ambulances.',
    items: [
      {
        n: '01',
        label: 'Call',
        title: 'Tell us about the patient',
        text: "Where the patient is, where they need to go, and what the treating doctor says about flying.",
      },
      {
        n: '02',
        label: 'We arrange',
        title: 'We check with the aviation operator',
        text: 'The operator confirms whether the flight is possible and when. We tell you the full cost before you agree.',
      },
      {
        n: '03',
        label: 'To the airport',
        title: 'Our ground ambulance takes the patient',
        text: 'Our ambulance picks the patient up from the hospital or home and takes them to the aircraft.',
      },
      {
        n: '04',
        label: 'After landing',
        title: 'Ground ambulance to the hospital',
        text: 'At the other end, the patient travels by ambulance to the receiving hospital.',
      },
    ],
  },

  fare: {
    eyebrow: 'Cost first',
    h2Lead: 'Air ambulance',
    h2Accent: 'cost',
    answer:
      'An air ambulance costs much more than a road ambulance. The cost depends on the route, the support the patient needs on board and the ground ambulances at both ends. We tell you the full cost before you agree.',
    more: 'Ask any provider for the full cost in one figure, including the ground ambulance to and from the airports.',
    factorsH3: 'What the cost depends on',
    tableCaption: 'Air ambulance cost ranges',
    tableWithin: 'Within Bangladesh',
  },

  proof: {
    h2: 'Who does what',
    pending:
      'The aircraft and the flight are provided by an aviation operator. We arrange the transfer for you on one hotline and run the ground ambulance to and from the airport. The dispatcher tells you which operator flies the patient, and what support is on board, before you agree.',
    equipmentH3: 'Ground ambulance',
    crewH3: 'Who travels with the patient',
    checklistH3: 'Ask before you agree to any air ambulance',
    checklist: [
      'Who operates the aircraft?',
      'Has the treating doctor agreed the patient is fit to fly?',
      'What support is on board, and who travels with the patient?',
      'Is the ground ambulance at both ends included?',
      'Is the full cost told in one figure before you agree?',
    ],
    checklistClose: 'Ask us any of these on the call. We will answer plainly.',
  },

  coverage: {
    eyebrow: 'Where we go',
    h2Lead: 'Ground ambulance',
    h2Accent: 'to the airport',
    answer: `Our dispatch base is in ${business.address.locality}, Dhaka. Our ground ambulance takes the patient from any hospital or home in Dhaka to the airport, and from the airport to the hospital after landing.`,
    hospitalsH3: 'Hospitals we transport patients to and from',
    hospitalsLead: 'We transport patients between the airport and hospitals including:',
    areasH3: 'Pickup across Dhaka',
    districtsH3: 'Is a road trip possible instead?',
    districtsText:
      'Many long journeys inside Bangladesh can be done by road, in an AC or ICU ambulance. Ask the dispatcher, who will tell you both options.',
    interDistrictAnchor: 'inter-district ambulance',
    longRoute: 'The dispatcher confirms the arrangement and the full cost before you agree.',
  },

  reviewsHeading: { eyebrow: 'Reviews', h2Lead: 'What families', h2Accent: 'say' },

  explainer: {
    h2: 'What is an air ambulance?',
    definition:
      'An air ambulance is an aircraft set up to carry a patient who needs care during a flight, used when the distance is too long or the road journey too hard for the patient. In Bangladesh, an air ambulance transfer is arranged with an aviation operator, with a road ambulance to and from each airport.',
    usesH3: 'When families ask about one',
    uses: [
      'The road journey is too long for the patient',
      'The patient needs treatment in another city',
      'The treating doctor advises a transfer by air',
    ],
    doctorLine: 'The treating doctor decides whether the patient is fit to fly. We arrange the transfer around what the doctor advises.',
    compare: {
      h3: 'Air ambulance or road ambulance?',
      intro: 'Both can move a patient a long way. They differ in time on the move, in planning and in cost.',
      columns: [
        { key: 'air', label: 'Air ambulance' },
        { key: 'inter-district', label: 'Road ambulance (inter-district)' },
      ],
      rows: [
        {
          label: 'Suited to',
          values: {
            air: 'Very long distances, or when the doctor advises against a long road trip',
            'inter-district': 'Most journeys between Dhaka and the districts',
          },
        },
        {
          label: 'Planning',
          values: { air: 'Needs the operator, the airports and the doctor to agree first', 'inter-district': 'Planned on the call with the dispatcher' },
        },
        {
          label: 'Cost level',
          values: { air: 'Much higher', 'inter-district': 'Lower' },
        },
      ],
      link: { lead: 'Going by road? See our', key: 'inter-district', anchor: 'inter-district ambulance' },
      carriesLabel: 'What it carries',
      crewLabel: 'Who travels with the patient',
    },
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Air ambulance',
    h2Accent: 'questions',
    items: [
      {
        q: 'Do you have your own air ambulance?',
        a: 'No. We arrange air ambulance transfers through an aviation operator, and run the ground ambulance to and from the airport ourselves. You deal with one hotline for the whole transfer.',
        verified: true,
      },
      {
        q: 'How much does an air ambulance cost in Bangladesh?',
        a: 'It costs much more than a road ambulance. The cost depends on the route, the support the patient needs on board and the ground ambulances at both ends. We tell you the full cost before you agree.',
        verified: true,
      },
      {
        q: 'Who decides if a patient can fly?',
        a: 'The treating doctor. Tell us what the doctor advises, and we arrange the transfer around it.',
        verified: true,
      },
      {
        q: 'How do I start arranging an air ambulance?',
        a: `Call ${phone}. Tell us where the patient is, where they need to go, their condition and what the treating doctor says. We check with the operator and come back to you with the arrangement and the full cost.`,
        verified: true,
      },
      // Needs confirmed routes (domestic and/or international) from the operator.
      { q: 'Can you arrange an air ambulance to another country?', a: '', verified: false },
      // Needs the operator's lead time.
      { q: 'How soon can an air ambulance leave?', a: '', verified: false },
      // Needs on-board crew roles from the operator and claims.crewOnBoardVerified.
      { q: 'Who travels with the patient on the flight?', a: '', verified: false },
      {
        q: 'Can I ask about an air ambulance on WhatsApp?',
        a: 'Yes. Message us the patient\'s location, the destination and the timing, and we come back to you. For an emergency, always call.',
        verified: Boolean(shown(business.whatsapp)),
      },
    ],
  },

  related: {
    eyebrow: 'More from us',
    h2Lead: 'Other ambulances',
    h2Accent: 'we provide',
    items: [
      { key: 'inter-district', anchor: 'Inter-district ambulance', text: 'Dhaka to any district and back by road, with the fare told first.' },
      { key: 'icu', anchor: 'ICU ambulance in Dhaka', text: 'When the treating doctor advises ICU support on the way.' },
      { key: 'ac', anchor: 'AC ambulance in Dhaka', text: 'For stable patients: emergencies, discharge and check-up trips.' },
    ],
    homeLead: 'Any other emergency? See our',
    homeAnchor: '24/7 ambulance service in Dhaka',
  },

  napHeading: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch',
    h2Accent: 'base',
    body: 'You never need to come to the base. Call, and we arrange the transfer.',
  },

  final: {
    h2Lead: 'Need to arrange',
    h2Accent: 'an air ambulance?',
    text: "Call and tell us where the patient is, where they need to go, and what the doctor advises. We come back with the full cost first.",
    h3: 'Planning a transfer for the coming days?',
  },
});
