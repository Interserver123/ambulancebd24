/**
 * ICU Ambulance page: /icu-ambulance-service-dhaka/ (existing URL, keep exactly).
 * Brief: ICU page prompt, Oct 2026. Persona B (critical-transfer coordinator).
 * Voice: competent, specific, reassuring. No medical advice beyond "your treating
 * doctor decides". No em dashes in body copy.
 *
 * Anything that depends on an unconfirmed fact is gated where it renders:
 * vehicles.ts (equipment, crew), fares.ts (ranges, factors), destinations.ts
 * (hospital list) and the verified flag on each FAQ.
 */
import { business, shown } from '../business';
import { servicePageSchema } from './schema';

const phone = business.phone.display;

export const icuPage = servicePageSchema.parse({
  serviceKey: 'icu',
  slug: '/icu-ambulance-service-dhaka/',
  metaTitle: 'ICU Ambulance Service in Dhaka 24/7 | Ambulance BD 24',
  metaDescription: `ICU ambulance in Dhaka for hospital transfers, 24/7. Tell us the patient's needs; we match the vehicle and confirm the fare first. ${phone}`,
  updated: '2026-10-21',
  byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page when our fares or vehicles change.`,
  breadcrumb: 'ICU Ambulance Service',
  schema: { name: 'ICU Ambulance', serviceType: 'ICU ambulance transport' },
  reviewTags: ['icu'],

  hero: {
    eyebrow: 'ICU ambulance · Dhaka · 24/7',
    h1: 'ICU ambulance service in Dhaka, 24/7',
    lede: "Doctor advised an ICU transfer? Tell us the patient's condition. We match the right ICU ambulance and confirm the fare before we move.",
    trust: ['Open 24 hours, 7 days', 'Fare told before dispatch', 'Hospital-to-hospital and hospital-to-home transfers'],
    card: {
      title: 'For an ICU transfer, tell us',
      items: [
        { text: 'The current hospital and ward, and the destination hospital or home address' },
        { text: 'What support the treating doctor says the patient needs on the way (for example oxygen, a monitor or a ventilator)', notAClaim: true },
        { text: 'When the patient is ready to move, and whether the destination bed is confirmed' },
      ],
      footerWithCrew: 'We confirm the vehicle, who travels with the patient, and the fare.',
      footer: 'We confirm the vehicle and the fare.',
    },
  },

  explainer: {
    h2: 'When is an ICU ambulance needed?',
    definition:
      'An ICU ambulance is an ambulance set up to keep a critically ill patient supported during the journey. In Dhaka it is used mainly to move patients between hospitals, or from hospital to home, while they stay on support. The treating doctor advises when a patient needs one.',
    more: "The vehicle is only part of it. What matters is that the support the doctor asks for is ready before the patient leaves the bed, and that there is enough of it for the whole trip, including time in Dhaka traffic.",
    usesH3: 'When families in Dhaka usually need one',
    uses: [
      'An ICU bed has been found at another hospital',
      'The patient is moving to a specialist hospital',
      'The patient is going home on support',
      'A critical patient is coming from a district to Dhaka, or going back',
    ],
    doctorLine: 'Your treating doctor decides whether the patient needs ICU-level transport. We match the vehicle to what the doctor advises.',
    compare: {
      h3: 'ICU ambulance vs AC ambulance',
      intro: 'Both carry a patient lying down. The difference is the support on the way, and the fare.',
      columns: [
        { key: 'icu', label: 'ICU ambulance' },
        { key: 'ac', label: 'AC ambulance' },
      ],
      rows: [
        {
          label: 'Used for',
          values: {
            icu: 'Critically ill patients who need support on the way, as the treating doctor advises',
            ac: 'Stable patients: home to hospital, discharge and routine trips',
          },
        },
        {
          label: 'Fare level',
          values: {
            icu: 'Higher, because of the equipment and the people on board',
            ac: 'Lower. The dispatcher tells you the exact fare first',
          },
        },
      ],
      link: { lead: 'Patient stable? See our', key: 'ac', anchor: 'AC ambulance in Dhaka' },
      carriesLabel: 'What it carries',
      crewLabel: 'Who travels with the patient',
    },
  },

  proof: {
    h2: 'What our ICU ambulance carries',
    pending:
      'Equipment and crew are matched to each transfer. Until we publish a full list for each vehicle, the dispatcher tells you exactly what the ICU ambulance for your case carries, and who travels with the patient, before you agree.',
    equipmentH3: 'On board',
    crewH3: 'Who travels with the patient',
    checklistH3: 'What to ask any ICU ambulance provider',
    checklist: [
      'Is there a working ventilator, if the doctor says the patient needs one?',
      'Is there enough oxygen for the whole trip, including waiting time?',
      'Is there a cardiac monitor and suction?',
      'Who travels with the patient, and what is their role?',
      'Is the fare, including waiting time, told before you agree?',
    ],
    checklistClose: "Ask us any of these on the call. We'll answer plainly.",
  },

  steps: {
    eyebrow: 'Step by step',
    h2Lead: 'How an ICU transfer',
    h2Accent: 'works',
    intro: 'An ICU transfer usually starts once the doctor agrees the patient can move and the destination confirms a bed. Call as early as you can, so we can match the vehicle in time.',
    items: [
      {
        n: '01',
        label: 'Call or WhatsApp',
        title: 'Send us the details',
        text: 'The two hospitals or the home address, the support the doctor advises for the journey, and when the patient is ready.',
      },
      {
        n: '02',
        label: 'Before dispatch',
        title: 'We confirm the vehicle and the fare',
        text: 'The fare includes waiting time and any extra stops. You agree before the ambulance leaves.',
      },
      {
        n: '03',
        label: 'Pickup',
        title: 'The ambulance reaches the hospital',
        text: 'The dispatcher shares the ETA. Tell us where to meet: the ward, the gate or the emergency entrance.',
      },
      {
        n: '04',
        label: 'Arrival',
        title: 'Handover at the destination',
        text: 'The patient is handed over at the destination hospital or at home. The fare stays as agreed.',
      },
    ],
  },

  fare: {
    eyebrow: 'Fare first',
    h2Lead: 'ICU ambulance fare',
    h2Accent: 'in Dhaka',
    answer:
      'An ICU ambulance costs more than a regular ambulance because of the equipment and the people on board. We tell you the exact fare before we dispatch, and it does not change after the trip.',
    more: 'Ask any provider for the full fare before you agree. A clear fare includes waiting time at the hospital, because discharges and admissions can take longer than planned.',
    factorsH3: 'What the fare depends on',
    tableCaption: 'ICU ambulance fare ranges',
    tableWithin: 'Within Dhaka',
  },

  coverage: {
    eyebrow: 'Where we go',
    h2Lead: 'ICU ambulance across Dhaka',
    h2Accent: 'and to every district',
    answer: `Our dispatch base is in ${business.address.locality}. We run ICU transfers between hospitals across Dhaka, from hospital to home, and between Dhaka and every district, in both directions.`,
    hospitalsH3: 'Hospitals we transport patients to and from',
    hospitalsLead: 'We transport patients to and from hospitals across Dhaka, including:',
    areasH3: 'Dhaka areas',
    districtsH3: 'ICU transfers between Dhaka and districts',
    districtsText:
      'Long ICU routes, such as Dhaka to Chittagong, Khulna or Rajshahi, need enough oxygen and support for many hours on the road. Tell us the destination first, so the dispatcher can plan for the full journey.',
    interDistrictAnchor: 'inter-district ambulance',
    longRoute: 'For longer routes, the dispatcher confirms the vehicle, the support on board and the full fare before you agree.',
  },

  reviewsHeading: { eyebrow: 'Reviews', h2Lead: 'What families', h2Accent: 'say' },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'ICU ambulance',
    h2Accent: 'questions',
    items: [
      {
        q: 'What is an ICU ambulance?',
        a: 'An ambulance set up to keep a critically ill patient supported during the journey, mainly for transfers between hospitals or from hospital to home. The treating doctor advises when a patient needs one.',
        verified: true,
      },
      {
        q: 'How much does an ICU ambulance cost in Dhaka?',
        a: 'The fare depends on the distance, waiting time at the hospital, the support the patient needs on the way and any extra stops. We tell you the exact fare before we dispatch, and it does not change after the trip.',
        verified: true,
      },
      // Needs crew roles per vehicle (vehicles.ts) and claims.crewOnBoardVerified.
      { q: 'Is a doctor or paramedic on board?', a: '', verified: false },
      // Needs the ventilator confirmed per vehicle and claims.equipmentVerified.
      { q: 'Does your ICU ambulance have a ventilator?', a: '', verified: false },
      {
        q: 'Can you move a patient from a hospital ICU to home?',
        a: 'Yes, when the treating doctor advises it. Tell us the support the patient needs on the way and the home address. We confirm the vehicle and the fare before we dispatch.',
        verified: true,
      },
      {
        q: 'Do you do ICU transfers from Dhaka to other districts?',
        a: 'Yes. We run ICU transfers from Dhaka to any district, and from districts to Dhaka. For longer routes we confirm the vehicle, the support on board and the full fare before you agree.',
        verified: true,
      },
      {
        q: 'What should I tell the dispatcher for an ICU transfer?',
        a: 'The current hospital and ward, the destination hospital or home address, the support the treating doctor says the patient needs on the way, and when the patient is ready to move. Tell us if the destination bed is confirmed.',
        verified: true,
      },
      // Client to confirm that CCU and cardiac transfers use the ICU ambulance.
      { q: 'Is a CCU ambulance different from an ICU ambulance?', a: '', verified: false },
      // Client to confirm how many family members may ride along.
      { q: 'How many family members can travel with the patient?', a: '', verified: false },
      {
        q: 'Can I arrange an ICU transfer in advance on WhatsApp?',
        a: 'Yes. Message us on WhatsApp with the hospitals, the timing and the support needed, and ask for the fare before you book.',
        verified: Boolean(shown(business.whatsapp)),
      },
    ],
  },

  related: {
    eyebrow: 'More from us',
    h2Lead: 'Other ambulances',
    h2Accent: 'we provide',
    items: [
      { key: 'nicu', anchor: 'NICU ambulance for newborns', text: 'For a newborn who needs a NICU at another hospital. Gentle, step by step.' },
      { key: 'ac', anchor: 'AC ambulance in Dhaka', text: 'For stable patients: home to hospital, discharge and routine trips.' },
      { key: 'inter-district', anchor: 'Inter-district ambulance', text: 'Dhaka to any district and back, with the fare told before we leave.' },
    ],
    homeLead: 'Any other emergency? See our',
    homeAnchor: '24/7 ambulance service in Dhaka',
  },

  napHeading: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch',
    h2Accent: 'base',
    body: 'You never need to come to the base. Call, and the ICU ambulance comes to the hospital.',
  },

  final: {
    h2Lead: 'Need an',
    h2Accent: 'ICU ambulance?',
    text: "Call and tell us the two hospitals and the patient's needs. We confirm the vehicle and the fare first.",
    h3: 'Planning a transfer for later today or tomorrow?',
  },
});
