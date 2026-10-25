/**
 * AC Ambulance page: /ac-ambulance-service/ (existing URL, keep exactly).
 * Brief: AC page content brief, Oct 2026. Personas: E planned mover first, A emergency caller second.
 * Voice: practical, friendly, clear. Emergency lines stay short. No em dashes in body copy.
 *
 * Gated where it renders: vehicles.ts (acVehicles), fares.ts (fares.ac: ranges, factors,
 * payment), destinations.ts (pickupAnyHospital, acDestinations), business.claims.acCheckSopLive,
 * Non-AC catalogue status (comparison column, related card) and the FAQ verified flags.
 */
import { business, copy, shown } from '../business';
import { servicePageSchema } from './schema';

const phone = business.phone.display;

export const acPage = servicePageSchema.parse({
  serviceKey: 'ac',
  slug: '/ac-ambulance-service/',
  metaTitle: 'AC Ambulance Service in Dhaka 24/7 | Ambulance BD 24',
  metaDescription: `AC ambulance in Dhaka for emergencies, discharge and check-up trips, 24/7. We tell you the fare, waiting included, before we move. ${phone}`,
  updated: '2026-10-21',
  byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page when our fares or vehicles change.`,
  breadcrumb: 'AC Ambulance Service',
  schema: { name: 'AC Ambulance', serviceType: 'AC ambulance patient transport' },
  reviewTags: ['ac', 'speed'],

  hero: {
    eyebrow: 'AC ambulance · Dhaka · 24/7',
    h1: 'AC ambulance service in Dhaka, 24/7',
    lede: 'A cooled, comfortable ambulance for emergencies, hospital transfers and trips home. We tell you the fare, including waiting time, before we move.',
    trust: ['Open 24 hours, 7 days', copy.timingLine.en.replace(/\.$/, ''), 'Waiting time included in the quote'],
    card: {
      title: 'Tell us 3 things',
      items: [
        { text: 'Pickup: the area and a landmark, or the hospital and ward' },
        { text: 'The patient: can they sit, or do they need a stretcher, a wheelchair or oxygen?' },
        { text: 'Destination, and whether we should wait and bring them back' },
      ],
      footerWithCrew: 'We confirm the vehicle and the fare.',
      footer: 'We confirm the vehicle and the fare.',
    },
  },

  trips: {
    eyebrow: 'Trips we run',
    h2Lead: 'AC ambulance trips',
    h2Accent: 'we run in Dhaka',
    intro: 'Most AC trips are one of these. Each one starts the same way: call or WhatsApp, and we tell you the fare first.',
    items: [
      {
        icon: 'ambulance',
        title: 'Emergency ride to hospital',
        text: 'Call first. Tell us where you are and how the patient is. The nearest AC ambulance comes to you, and the fare is told on the call.',
      },
      {
        icon: 'building',
        title: 'Hospital discharge, home',
        text: 'Book ahead on WhatsApp. Send the hospital, the ward and the discharge time, and your home address. We tell you the fare before the day, so there is no bargaining at the gate.',
      },
      {
        icon: 'clock',
        title: 'Check-up and treatment trips',
        text: 'Going for a check-up, dialysis or a test? Tell the dispatcher how long the visit may take and whether you need a ride back. Any waiting time is part of the quote you agree to before we leave.',
      },
      {
        icon: 'route',
        title: 'Hospital to hospital',
        text: 'For stable patients moving between hospitals in Dhaka. If the treating doctor advises ICU support on the way, choose an ICU ambulance instead.',
        link: { key: 'icu', anchor: 'ICU ambulance in Dhaka' },
      },
      {
        icon: 'navigation',
        title: 'Dhaka to your district',
        text: 'Long trips home or to a hospital in another district, in a cooled cabin. Tell us the destination first, and we give you the full fare before you agree.',
        link: { key: 'inter-district', anchor: 'Dhaka to district ambulance' },
      },
    ],
  },

  fare: {
    eyebrow: 'Fare first',
    h2Lead: 'AC ambulance fare',
    h2Accent: 'in Dhaka',
    answer:
      'An AC ambulance costs more than a non-AC one and much less than an ICU ambulance. We tell you the exact fare before dispatch, including waiting time and extra stops, and it does not change after the trip.',
    more: 'Tell us the pickup, the destination and whether we should wait. The dispatcher gives you one clear fare before the ambulance leaves.',
    factorsH3: 'What the fare depends on',
    tableCaption: 'AC ambulance fare ranges',
    tableWithin: 'Within Dhaka',
    gateH3: 'No surprise at the hospital gate',
    gateText:
      'Some families are quoted one fare, then asked for more once waiting comes up, or at discharge. Our rule is simple: waiting is included in the quote, and what we agree is what you pay.',
    paymentLabel: 'Ways to pay',
  },

  proof: {
    h2: 'What our AC ambulance has',
    pending:
      'Every AC ambulance is set up a little differently. Until we publish a full list for each vehicle, the dispatcher tells you what the ambulance for your trip has, such as oxygen and seats for family, before you agree.',
    equipmentH3: 'On board',
    crewH3: 'Who comes with the ambulance',
    checklistH3: 'Ask before you book any AC ambulance',
    checklist: [
      'Is the AC working right now?',
      'Is oxygen available, and is it extra?',
      'How many family members can ride with the patient?',
      'Is waiting time included in the fare?',
      'Who helps carry the patient?',
    ],
    checklistClose: 'Ask us any of these on the call.',
    opsCheck: { text: 'We check the AC before every trip.', claim: 'acCheckSopLive' },
  },

  coverage: {
    eyebrow: 'Where we go',
    h2Lead: 'AC ambulance',
    h2Accent: 'across Dhaka',
    answer: `Our dispatch base is in ${business.address.locality}. ${copy.timingLine.en} We run AC trips to every area of the city.`,
    hospitalsH3: 'Pickup from any hospital in Dhaka',
    hospitalsLead: "You don't have to use the ambulance at the hospital gate. Call us and we'll come to the ward or gate where the patient is.",
    anyHospitalGate: true,
    areasH3: 'Dhaka areas',
    districtsH3: 'Dhaka to districts',
    districtsText:
      'Planning a long trip home, or to a hospital in another district? We run AC ambulances from Dhaka to every district. Tell us the destination first, so the dispatcher can give you the full fare.',
    interDistrictAnchor: 'inter-district ambulance',
    longRoute: 'The dispatcher confirms the vehicle and the full fare before you agree.',
  },

  reviewsHeading: { eyebrow: 'Reviews', h2Lead: 'What families', h2Accent: 'say' },

  why: {
    eyebrow: 'Comfort matters',
    h2: 'Why choose AC for trips in Dhaka',
    answer:
      "Dhaka's heat and long traffic waits make any ride hard for an elderly or weak patient. A cooled cabin keeps the trip more comfortable for the patient and for the family sitting with them.",
    more: 'It matters most on long district journeys and in the summer months, when a single trip can mean hours on the road.',
  },

  explainer: {
    h2: 'What is an AC ambulance?',
    definition:
      'An AC ambulance is an air-conditioned ambulance with a stretcher, for patients who need safe, comfortable transport but not intensive care on the way. In Dhaka it is used for emergency rides, hospital transfers, discharge trips home and regular check-ups.',
    usesH3: 'When an AC ambulance is the right choice',
    uses: [
      'An emergency ride to hospital',
      'A transfer between hospitals for a stable patient',
      'Discharge, going home',
      'Check-up trips with waiting',
      'Journeys between Dhaka and a district',
    ],
    doctorLine: 'If the treating doctor says the patient needs ICU-level support on the way, choose an',
    doctorLink: { key: 'icu', anchor: 'ICU ambulance' },
    compare: {
      h3: 'AC, Non-AC or ICU ambulance?',
      intro: 'All three carry a patient lying down. They differ in comfort, in the support on the way and in the fare.',
      partial: {
        h3: 'AC or ICU ambulance?',
        intro: 'Both carry a patient lying down. They differ in the support on the way and in the fare.',
      },
      columns: [
        { key: 'ac', label: 'AC ambulance' },
        { key: 'non-ac', label: 'Non-AC ambulance' },
        { key: 'icu', label: 'ICU ambulance' },
      ],
      rows: [
        {
          label: 'Used for',
          values: {
            ac: 'Emergency rides, discharge, check-ups and long trips for stable patients',
            'non-ac': 'Short trips for stable patients',
            icu: 'Critically ill patients who need support on the way, as the doctor advises',
          },
        },
        {
          label: 'Comfort',
          values: { ac: 'Cooled cabin', 'non-ac': 'No air conditioning', icu: 'Set up for critical care' },
        },
        {
          label: 'Fare level',
          values: { ac: 'Middle', 'non-ac': 'Lowest', icu: 'Highest' },
        },
      ],
      carriesLabel: 'What it carries',
      crewLabel: 'Who comes with it',
    },
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'AC ambulance',
    h2Accent: 'questions',
    items: [
      {
        q: 'How much does an AC ambulance cost in Dhaka?',
        a: 'It depends on the distance, any waiting time and extra stops. An AC ambulance costs more than a non-AC one and much less than an ICU ambulance. We tell you the exact fare before dispatch, and it does not change after the trip.',
        verified: true,
      },
      // Shown instead of "AC vs Non-AC" while Non-AC is not a confirmed service.
      {
        q: 'AC or ICU ambulance: which do I need?',
        a: "For a stable patient, an AC ambulance is usually enough. If the treating doctor says the patient needs ICU-level support on the way, choose an ICU ambulance. Describe the patient on the call and we'll match the vehicle.",
        verified: true,
      },
      // Needs oxygen confirmed per vehicle, and whether it is charged extra.
      { q: 'Is oxygen available in the AC ambulance? Is it extra?', a: '', verified: false },
      // Needs the waiting-time policy and rate.
      { q: 'Can the ambulance wait and bring the patient back?', a: '', verified: false },
      // Needs family seats per vehicle.
      { q: 'How many family members can ride with the patient?', a: '', verified: false },
      // Needs pickupAnyHospital (destinations.ts).
      { q: 'Can you pick up from any hospital in Dhaka?', a: '', verified: false },
      {
        q: 'How fast can an AC ambulance reach me?',
        a: `${copy.timingLine.en} The dispatcher tells you the expected arrival time on the call.`,
        verified: true,
      },
      {
        q: 'Do you go from Dhaka to other districts by AC ambulance?',
        a: 'Yes. We run AC ambulances from Dhaka to any district, and back. Tell us the destination and we tell you the full fare before you agree.',
        verified: true,
      },
      {
        q: 'Can I book an AC ambulance in advance?',
        a: 'Yes. Message us on WhatsApp with the pickup, the destination and the time, and ask for the fare first. For an emergency, always call.',
        verified: Boolean(shown(business.whatsapp)),
      },
      // Needs attendant or helper confirmed.
      { q: 'Is someone there to help carry the patient?', a: '', verified: false },
      // Needs payment methods (fares.ts, fares.ac.payment).
      { q: 'How can I pay?', a: '', verified: false },
    ],
  },

  related: {
    eyebrow: 'More from us',
    h2Lead: 'Other ambulances',
    h2Accent: 'we provide',
    items: [
      { key: 'icu', anchor: 'ICU ambulance in Dhaka', text: 'When the treating doctor advises ICU support on the way.' },
      { key: 'non-ac', anchor: 'Non-AC ambulance in Dhaka', text: 'A lower-cost option for stable patients on short trips.' },
      { key: 'inter-district', anchor: 'Inter-district ambulance', text: 'Dhaka to any district and back, with the fare told before we leave.' },
    ],
    homeLead: 'Any other emergency? See our',
    homeAnchor: '24/7 ambulance service in Dhaka',
  },

  napHeading: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch',
    h2Accent: 'base',
    body: 'You never need to come to the base. Call, and the AC ambulance comes to you.',
  },

  final: {
    h2Lead: 'Need an',
    h2Accent: 'AC ambulance?',
    text: 'Call and tell us the pickup, the patient and the destination. We tell you the fare, including waiting, before we move.',
    h3: 'Booking a discharge or check-up trip?',
  },
});
