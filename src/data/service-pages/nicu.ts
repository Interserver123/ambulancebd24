/**
 * NICU Ambulance page: /nicu-ambulance-service-dhaka/ (existing URL, was a 404; keep exactly).
 * Brief: NICU content brief, Oct 2026. Persona C (a new father handling the transfer while
 * the mother recovers). Voice: gentle, precise, calm. No exclamation marks (the content
 * linter fails the page on "!"), no urgency drama, no fear language. No em dashes in body copy.
 * No medical advice beyond "the baby's doctor decides".
 *
 * Gated where it renders: vehicles.ts (nicuVehicles: equipment, crew, photos), fares.ts
 * (fares.nicu), destinations.ts (nicuDestinations, ops.districtPickup) and the verified
 * flag on each FAQ.
 *
 * Dropped until the client confirms: "we stay on the phone with you until pickup" (hero card)
 * and "we coordinate with the ward" (step 3).
 */
import { business, shown } from '../business';
import { ops } from '../destinations';
import { servicePageSchema } from './schema';

const phone = business.phone.display;

export const nicuPage = servicePageSchema.parse({
  serviceKey: 'nicu',
  slug: '/nicu-ambulance-service-dhaka/',
  metaTitle: 'NICU Ambulance in Dhaka for Newborns 24/7 | Ambulance BD 24',
  metaDescription: `NICU ambulance in Dhaka for newborn transfers, 24/7. Tell us the baby's needs; we match the vehicle and tell you the fare first. ${phone}`,
  updated: '2026-10-21',
  byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page when our fares or vehicles change.`,
  breadcrumb: 'NICU Ambulance Service',
  schema: { name: 'NICU Ambulance', serviceType: 'Neonatal (NICU) ambulance transport' },
  reviewTags: ['nicu'],

  hero: {
    eyebrow: 'NICU ambulance · Dhaka · 24/7',
    h1: 'NICU ambulance service in Dhaka for newborns',
    lede: 'When a doctor advises moving your baby to a NICU at another hospital, call us. We guide you step by step and confirm the fare before we move.',
    trust: ['Open 24 hours, 7 days', 'Fare told before dispatch', 'Hospital-to-hospital newborn transfers'],
    card: {
      title: 'Tell us',
      items: [
        { text: 'The hospital the baby is in now, and the receiving NICU (if a bed is confirmed)' },
        { text: 'What the treating doctor says the baby needs on the way (for example oxygen, an incubator or monitoring)', notAClaim: true },
        { text: 'Who will travel with the baby' },
      ],
      footerWithCrew: 'We confirm the vehicle, who travels with your baby, and the fare.',
      footer: 'We confirm the vehicle and the fare before we come.',
    },
  },

  steps: {
    eyebrow: 'Step by step',
    h2Lead: 'How a newborn transfer',
    h2Accent: 'works',
    intro: 'A NICU transfer usually starts once the doctor agrees your baby can move and the receiving hospital confirms a bed. Call as early as you can, so we have time to prepare.',
    items: [
      {
        n: '01',
        label: 'Call or WhatsApp',
        title: 'Share the details',
        text: 'The hospital your baby is in, the receiving NICU, the support the doctor advises for the journey, and when your baby will be ready.',
      },
      {
        n: '02',
        label: 'Before dispatch',
        title: 'We confirm the vehicle and the fare',
        text: 'The dispatcher tells you who travels with your baby and the full fare, including waiting time. You agree before the ambulance leaves.',
      },
      {
        n: '03',
        label: 'Pickup',
        title: 'The ambulance reaches the hospital',
        text: 'The dispatcher shares the arrival time. Tell us the ward and the floor, so the team can find you.',
      },
      {
        n: '04',
        label: 'Arrival',
        title: 'Handover at the receiving NICU',
        text: 'Your baby is handed over at the receiving hospital. The fare stays as agreed.',
      },
    ],
    ready: {
      h3: 'What to keep ready',
      items: [
        "The baby's discharge or referral papers from the doctor",
        "The receiving hospital's name and a contact number",
        "A parent's phone that stays on, so the dispatcher can reach you",
      ],
    },
  },

  fare: {
    eyebrow: 'Fare first',
    h2Lead: 'NICU ambulance fare',
    h2Accent: 'in Dhaka',
    answer:
      'A NICU ambulance costs more than a regular ambulance because of the equipment and the people on board. We tell you the exact fare before we dispatch, and it does not change after the trip.',
    more: 'You have enough to think about today. One clear fare, agreed on the call, means no discussion at the hospital gate.',
    factorsH3: 'What the fare depends on',
    tableCaption: 'NICU ambulance fare ranges',
    tableWithin: 'Within Dhaka',
  },

  proof: {
    h2: 'What our NICU ambulance carries',
    pending:
      "Each newborn transfer is matched to what the baby's doctor advises. Until we publish a full list for each vehicle, the dispatcher tells you what the ambulance for your baby carries, and who travels with your baby, before you agree.",
    equipmentH3: 'On board',
    crewH3: 'Who travels with your baby',
    checklistH3: 'Questions to ask any NICU ambulance provider',
    checklist: [
      'Is there a transport incubator to keep the baby warm?',
      'Is there oxygen and monitoring suited to newborns?',
      'Who travels with the baby, and what is their training?',
      'Can a parent ride along?',
      'Is the fare, including waiting, told before you agree?',
    ],
    checklistClose: "Ask us any of these. We'll answer plainly.",
  },

  coverage: {
    eyebrow: 'Where we go',
    h2Lead: 'NICU transfers across Dhaka',
    h2Accent: 'and from districts',
    answer: `Our dispatch base is in ${business.address.locality}. We move newborns between hospitals across Dhaka, from any district to a NICU in Dhaka, and back to a hospital closer to home once the baby is stable.`,
    hospitalsH3: 'Hospitals with NICUs we transport newborns to',
    hospitalsLead: 'We transport newborns to hospitals with a NICU in Dhaka, including:',
    areasH3: 'Dhaka areas',
    districtsH3: 'From a district hospital to Dhaka',
    districtsText:
      'Often a doctor at a district hospital says the baby needs a NICU in Dhaka, sometimes late at night. Tell us the district, the hospital and the receiving NICU first. The dispatcher plans the support for the whole journey before you agree.',
    interDistrictAnchor: 'inter-district ambulance',
    longRoute: 'For longer routes, the dispatcher confirms the vehicle, the support on board and the full fare before you agree.',
  },

  reviewsHeading: { eyebrow: 'Reviews', h2Lead: 'What families', h2Accent: 'say' },

  explainer: {
    h2: 'What is a NICU ambulance?',
    definition:
      "A NICU ambulance is an ambulance set up to move a newborn who needs neonatal intensive care, usually from one hospital to a NICU at another. It keeps the baby warm and supported on the way, as the baby's treating doctor advises.",
    more: 'The most important part happens before the move: the receiving NICU confirms a bed, and the support the doctor asks for is ready in the ambulance before your baby leaves the ward.',
    usesH3: 'When parents usually need one',
    uses: [
      'The birth hospital has no NICU, or no free NICU bed',
      'The doctor refers the baby to a specialist NICU',
      'A newborn in a district hospital needs a NICU in Dhaka',
      'The baby is stable and can move back to a hospital closer to home',
    ],
    doctorLine: "Your baby's doctor decides whether a NICU transfer is needed and what support the baby needs on the way.",
    compare: {
      h3: 'NICU ambulance vs ICU ambulance',
      intro: 'Both are for patients who need support on the way. The difference is who they are set up for.',
      columns: [
        { key: 'nicu', label: 'NICU ambulance' },
        { key: 'icu', label: 'ICU ambulance' },
      ],
      rows: [
        {
          label: 'Set up for',
          values: {
            nicu: 'Newborn babies who need neonatal intensive care, as the doctor advises',
            icu: 'Children and adults who need intensive care support on the way',
          },
        },
        {
          label: 'Usual trip',
          values: {
            nicu: 'Hospital to a NICU at another hospital, and back closer to home',
            icu: 'Hospital to hospital, or hospital to home',
          },
        },
      ],
      link: { lead: 'Moving an older child or an adult? See our', key: 'icu', anchor: 'ICU ambulance for adults' },
      carriesLabel: 'What it carries',
      crewLabel: 'Who travels with the baby',
    },
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'NICU ambulance',
    h2Accent: 'questions',
    items: [
      {
        q: 'What is a NICU ambulance?',
        a: "An ambulance set up to move a newborn who needs neonatal intensive care, usually from one hospital to a NICU at another. It keeps the baby warm and supported on the way. The baby's doctor advises when one is needed.",
        verified: true,
      },
      {
        q: 'How much does a NICU ambulance cost in Dhaka?',
        a: 'It costs more than a regular ambulance because of the equipment and the people on board. The fare depends on the distance, the waiting time and the support your baby needs. We tell you the exact fare before we dispatch, and it does not change after the trip.',
        verified: true,
      },
      // Needs the incubator confirmed per vehicle (vehicles.ts) and claims.equipmentVerified.
      { q: 'Is there an incubator in the ambulance?', a: '', verified: false },
      // Needs crew roles per vehicle (vehicles.ts) and claims.crewOnBoardVerified.
      { q: 'Who travels with the baby: doctor, nurse or paramedic?', a: '', verified: false },
      // Needs the client to confirm a parent may ride along (and how many).
      { q: 'Can the mother or father ride with the baby?', a: '', verified: false },
      {
        q: 'Can you bring a newborn from another district to a NICU in Dhaka?',
        a: 'Yes. Tell us the district, the hospital and the receiving NICU in Dhaka. The dispatcher plans the support for the whole journey and tells you the full fare before you agree.',
        verified: ops.districtPickup.verified,
      },
      {
        q: 'Can you move a baby back to a hospital nearer home?',
        a: "Yes, when the baby's doctor agrees the baby is ready to move. Tell us both hospitals and the support the doctor advises. We confirm the vehicle and the fare before we dispatch.",
        verified: true,
      },
      {
        q: 'What papers should we keep ready?',
        a: "The baby's discharge or referral papers from the treating doctor, the receiving hospital's name and contact number, and a parent's phone that stays on during the trip.",
        verified: true,
      },
      {
        q: 'Can we arrange the transfer in advance on WhatsApp?',
        a: 'Yes. Message us with both hospitals, the timing and the support the doctor advises, and ask for the fare before you book. If your baby needs to move now, please call.',
        verified: Boolean(shown(business.whatsapp)),
      },
    ],
  },

  related: {
    eyebrow: 'More from us',
    h2Lead: 'Other ambulances',
    h2Accent: 'we provide',
    items: [
      { key: 'icu', anchor: 'ICU ambulance for adults', text: 'For children and adults when the doctor advises ICU support on the way.' },
      { key: 'ac', anchor: 'AC ambulance for discharge trips', text: 'For a mother or family member who is stable: discharge and trips home.' },
      { key: 'inter-district', anchor: 'Inter-district ambulance', text: 'Dhaka to any district and back, with the fare told before we leave.' },
    ],
    homeLead: 'Any other emergency? See our',
    homeAnchor: '24/7 ambulance service in Dhaka',
  },

  napHeading: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch',
    h2Accent: 'base',
    body: 'You never need to come to the base. Call, and the NICU ambulance comes to the hospital.',
  },

  final: {
    h2Lead: 'Need a',
    h2Accent: 'NICU ambulance?',
    text: 'Call and tell us both hospitals and what the doctor advises. We confirm the vehicle and the fare first.',
    h3: 'Transfer planned for later? Request a call back.',
  },
});
