/**
 * Freezer Van, English: /freezer-ambulance-service/ (existing URL, keep exactly).
 * Brief: Freezer Van content brief (EN + BN), Oct 2026. The Bangla page (freezer-bn.ts) is the
 * priority; this page mirrors it section for section and links to it from the hero.
 * Persona D (grieving family, eldest son or brother). Voice: quiet, respectful, condolence first.
 * Never "fast", "quick" or "hurry" (the content linter fails the page), no "!", no emojis,
 * no urgency words, no red except the call button (hero.calm). "Dead body carrier" once, in the
 * definition; elsewhere "your loved one".
 *
 * Gated where it renders: freezerVehicles (cabin, family seats), fares.freezer (ranges, factors),
 * pickupAnyHospital, ops.ts (papers, holidays, booking from abroad), FAQ verified flags.
 */
import { business, copy, shown } from '../business';
import { pickupAnyHospital } from '../destinations';
import { ops } from '../ops';
import { servicePageSchema } from './schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));

export const freezerPage = servicePageSchema.parse({
  serviceKey: 'freezer',
  lang: 'en',
  slug: '/freezer-ambulance-service/',
  metaTitle: `Freezer Van Service in Dhaka 24/7 | ${business.name}`,
  metaDescription: `Freezer van in Dhaka to take your loved one home with respect, to any district. We tell you the full fare before we leave. 24/7: ${phone}`,
  updated: '2026-10-21',
  byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page when our fares or vans change.`,
  breadcrumb: 'Freezer Van',
  schema: { name: 'Freezer Van', serviceType: 'Freezer van (deceased transport)' },
  reviewTags: ['freezer'],
  order: { main: ['explainer', 'proof', 'steps', 'fare', 'coverage'], afterReviews: ['faq', 'related'] },

  hero: {
    eyebrow: 'Freezer van · Dhaka · 24/7',
    condolence: "We're sorry for your loss.",
    h1: 'Freezer van service in Dhaka, to any district',
    lede: copy.freezerLine.en,
    langNote: { lead: 'বাংলায় পড়ুন:', anchor: 'লাশবাহী ফ্রিজিং গাড়ি ঢাকা' },
    calm: true,
    trust: [business.hours.short, 'From Dhaka to any district', 'Fare told first, waiting time included'],
    card: {
      title: 'When you call, tell us',
      items: [
        { text: 'The hospital or home where we collect your loved one' },
        { text: 'The district, village or address where the family is going' },
        { text: 'How many family members will travel with the van' },
      ],
      footerWithCrew: 'We tell you the van and the full fare. Take the time you need.',
      footer: 'We tell you the van and the full fare. Take the time you need.',
    },
  },

  explainer: {
    h2: 'What is a freezer van?',
    definition:
      'A freezer van is a refrigerated vehicle that keeps the deceased cool for the whole journey, so the family can take their loved one home for the funeral. It is also called a dead body carrier, or লাশবাহী ফ্রিজিং গাড়ি in Bangla, and it is used most for long journeys from Dhaka to another district.',
    note: {
      h3: 'Single cabin or double cabin?',
      text: 'Freezer vans usually come in two types. A single-cabin van has a seat for the driver only, so the family travels separately. A double-cabin van has a second row of seats, so family members can travel with their loved one.',
      more: 'Tell us how many family members will travel, and the dispatcher tells you which van is available for your journey.',
    },
    doctorLine: 'If the patient is still alive and needs care on the way, please ask us for an ambulance instead. We will send the right vehicle.',
  },

  proof: {
    h2: 'Our freezer vans',
    pending:
      'Before you agree, the dispatcher tells you which freezer van is available for your journey, whether it is single or double cabin, and how many family members can travel with it.',
    equipmentH3: 'In the van',
    crewH3: 'Who comes with the van',
    cabinLabels: { single: 'Single cabin', double: 'Double cabin, with seats for family' },
    seatsLine: 'Seats for {n} family members',
    checklistH3: 'What to ask any provider before you book',
    checklist: [
      'Is the freezing working properly?',
      'How many family members can travel with the van?',
      'What is the total fare, including waiting time?',
      'Who pays for tolls or ferries on the way?',
    ],
    checklistClose: 'Call and ask us. We will answer plainly.',
  },

  steps: {
    eyebrow: 'Step by step',
    h2Lead: 'How it',
    h2Accent: 'works',
    intro: 'You do not have to work this out alone. One call, and we take it from there, at a pace that suits your family.',
    items: [
      {
        n: '01',
        label: 'Call or WhatsApp',
        title: 'Tell us where and how many',
        text: 'Where your loved one is now, where the family is going, and how many people will travel.',
      },
      {
        n: '02',
        label: 'Before we leave',
        title: 'We tell you the van and the full fare',
        text: 'The fare includes waiting time. The van leaves only once you agree.',
      },
      {
        n: '03',
        label: 'Hospital or home',
        title: 'We collect your loved one with respect',
        text: 'Tell us the hospital and the gate, or the home address. We come to you and carry your loved one with care.',
      },
      {
        n: '04',
        label: 'The journey home',
        title: 'We take your loved one home',
        text: 'We drive to the address you gave us. The fare stays as agreed.',
      },
    ],
    ready: {
      h3: 'Keep with you',
      items: [
        ...(ops.freezerPapers.verified ? [ops.freezerPapers.value.en] : []),
        'The full destination address, with a landmark nearby',
        'A working phone number for one family member',
      ],
    },
  },

  fare: {
    eyebrow: 'Fare first',
    h2Lead: 'Freezer van fare',
    h2Accent: 'from Dhaka',
    answer: 'The fare depends mainly on the distance to the home or burial place, and on waiting time. We tell you the full fare before we leave, and it does not change.',
    more: 'At a time like this, no family should have to bargain. One clear fare, agreed on the call, is what you pay.',
    factorsH3: 'What the fare depends on',
    tableCaption: 'Freezer van fares from Dhaka',
    tableWithin: 'Within Dhaka',
    gateH3: 'No pressure at the hospital gate',
    gateText:
      'Families are often approached at the hospital gate at the hardest moment. With us, you hear the total fare first, on the phone, before you agree. It does not change later.',
  },

  coverage: {
    eyebrow: 'Where we go',
    h2Lead: 'From Dhaka',
    h2Accent: 'to any district',
    answer: `Our base is in ${business.address.locality}, Dhaka. We collect your loved one from the hospital or home in Dhaka and travel to every district of Bangladesh, at any hour.`,
    hospitalsH3: 'Pickup from any hospital in Dhaka',
    hospitalsLead: 'Tell us the hospital and the gate, or the home address. We come to you.',
    anyHospitalGate: true,
    districtsH3: 'Journeys home from Dhaka',
    districtsText: 'Some of the districts families travel to. Tell us the destination, and we tell you the full fare before you agree.',
    districtChip: 'Dhaka to {d}',
    interDistrictAnchor: 'inter-district ambulance',
    longRoute: 'Travelling with a patient instead?',
    abroad: {
      h3: 'Family abroad?',
      text: 'Message us on WhatsApp with the pickup and the destination. We reply with the full fare, so the family at home and abroad can agree on it before the van leaves.',
    },
  },

  reviewsHeading: { eyebrow: 'Reviews', h2Lead: 'What families', h2Accent: 'say' },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Common',
    h2Accent: 'questions',
    items: [
      {
        q: 'How much does a freezer van cost from Dhaka?',
        a: 'The fare depends mainly on the distance to the home or burial place, and on waiting time. We tell you the full fare before we leave, and it does not change.',
        verified: true,
      },
      // Needs the cabin types the client has (vehicles.ts).
      { q: 'What is the difference between a single and a double cabin?', a: '', verified: false },
      // Needs family seats per van (vehicles.ts).
      { q: 'How many family members can travel with the van?', a: '', verified: false },
      {
        q: 'Can you collect from any hospital in Dhaka?',
        a: 'Yes. Tell us the hospital and the gate or ward, or the home address, and we come to you.',
        verified: pickupAnyHospital.verified,
      },
      {
        q: 'Do you go from Dhaka to any district?',
        a: 'Yes. We take families and their loved ones from Dhaka to every district of Bangladesh. Tell us the destination, and we tell you the full fare before you agree.',
        verified: true,
      },
      {
        q: 'Is a freezer van available at night?',
        a: `Yes. We are ${business.hours.display.toLowerCase()}. Call ${phone} at any hour.`,
        verified: true,
      },
      {
        q: 'Is a freezer van available during Eid and holidays?',
        a: 'Yes. Our freezer vans run on Eid and public holidays too. If you can, call early so we can plan the journey with you.',
        verified: ops.holidays.verified,
      },
      {
        q: 'What papers do we need?',
        a: `Keep ${ops.freezerPapers.value.en.toLowerCase()}, and the full destination address.`,
        verified: ops.freezerPapers.verified,
      },
      {
        q: 'Can family abroad book on WhatsApp?',
        a: 'Yes. Message us on WhatsApp with the pickup and the destination. We reply with the full fare, and the family can book from abroad.',
        verified: wa && ops.abroadBooking.verified,
      },
      // Needs tolls and ferries confirmed as a fare factor (fares.ts).
      { q: 'Are tolls and ferries included in the fare?', a: '', verified: false },
    ],
  },

  related: {
    eyebrow: 'More from us',
    h2Lead: 'Other help',
    h2Accent: 'on the same number',
    items: [{ key: 'inter-district', anchor: 'Inter-district ambulance', text: 'For a patient travelling between Dhaka and any district, with the fare told first.' }],
    homeLead: 'For anything else, see our',
    homeAnchor: '24/7 ambulance service in Dhaka',
  },

  napHeading: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch',
    h2Accent: 'base',
    body: 'You never need to come to the base. Call, and we come to the hospital or home.',
  },

  final: {
    h2Lead: "We're here",
    h2Accent: 'for you',
    text: `${copy.freezerLine.en} Call at any hour, and we will take it from there.`,
    h3: copy.cta.callback.en,
    formHelper: 'We call you back at a time that suits you. To talk now, please call.',
  },
});
