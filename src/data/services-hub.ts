/**
 * Services hub: /services/ (new URL). Intent: "which ambulance service do I need". It links down
 * to every published service page (cards are built from src/data/service-pages, so a new service
 * page appears here automatically) and never targets a service's own keyword.
 * Voice: calm, direct. No prices, response times, equipment or crew claims.
 */
import { business, shown } from './business';
import type { ServiceKey } from './business';
import type { ServicePage } from './service-pages/schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));

const hero: ServicePage['hero'] = {
  eyebrow: 'Our services · 24/7',
  h1: 'Ambulance services in Dhaka and across Bangladesh',
  lede: 'ICU, NICU, AC, freezer van, trips to any district and air ambulance transfers. Tell us the patient and the journey. We match the vehicle and tell you the fare before we dispatch.',
  trust: [business.hours.short, 'ICU · NICU · AC · Freezer Van', 'Fare told before dispatch'],
  card: {
    title: 'Not sure which one?',
    items: [
      { text: 'Tell us who is travelling and the doctor\'s advice', notAClaim: false },
      { text: 'Tell us the pickup and where the patient is going', notAClaim: false },
      { text: 'We suggest the right vehicle and confirm the fare', notAClaim: false },
    ],
    footerWithCrew: 'Call and we help you choose.',
    footer: 'Call and we help you choose.',
  },
};

/** "I need…" guide. `key` links to that service's page once published. */
export const choose: { key: ServiceKey; need: string }[] = [
  { key: 'icu', need: 'A doctor advised moving the patient with life support to another hospital' },
  { key: 'nicu', need: 'A newborn has to be moved to a NICU at another hospital' },
  { key: 'ac', need: 'A comfortable ride for an emergency, a discharge or a check-up' },
  { key: 'freezer', need: 'Taking a loved one home after they have passed away' },
  { key: 'inter-district', need: 'A trip between Dhaka and another district' },
  { key: 'air', need: 'The distance is too far or too hard by road' },
];

export const servicesHub = {
  slug: '/services/',
  breadcrumb: 'Services',
  metaTitle: 'Our Ambulance Services in Dhaka | Ambulance BD 24',
  metaDescription: `ICU, NICU, AC, freezer van, inter-district and air ambulance services in Dhaka, 24/7. Not sure which you need? Call ${phone} and we help you choose.`,
  updated: '2026-10-23',
  hero,
  cards: {
    eyebrow: 'All services',
    h2Lead: 'Choose the ambulance',
    h2Accent: 'for the journey',
    intro: 'Each service has its own page with how it works, the questions families ask and what to tell us when you call.',
    more: 'Read more',
  },
  choose: {
    eyebrow: 'Which one?',
    h2Lead: 'What do you',
    h2Accent: 'need?',
    intro: 'Find your situation below. If it is not listed, call and we help you choose.',
    airNote: 'Air ambulance is arranged through an aviation operator.',
  },
  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Choosing a',
    h2Accent: 'service',
    items: [
      {
        q: 'How do I know which ambulance I need?',
        a: `Tell the dispatcher who is travelling, the doctor's advice, the pickup and the destination. We match the vehicle and confirm it with you. Call ${phone}.`,
      },
      {
        q: 'Do you tell the fare before the ambulance leaves?',
        a: `Yes. ${'We tell you the fare before we dispatch.'} The fare depends on the vehicle, the distance and waiting time, so we confirm it on the call${wa ? ' or on WhatsApp' : ''}.`,
      },
      {
        q: 'Do you own the aircraft for air ambulance?',
        a: 'No. We arrange air ambulance transfers through an aviation operator, and take the patient to and from the airport in our ground ambulance.',
      },
      {
        q: 'Is the service available at night?',
        a: `${business.hours.display}. Call ${phone} at any hour.`,
      },
    ],
  },
  nap: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: 'Every service is dispatched from Mohakhali, Dhaka.' },
  final: { h2Lead: 'Need an ambulance', h2Accent: 'now?', text: 'Call and tell us the patient and the journey. We confirm the vehicle and the fare first.' },
};
