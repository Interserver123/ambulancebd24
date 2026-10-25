/**
 * Locations hub: /locations/ (existing URL, keep exactly; /location/ 301s here).
 * Intent: "where do you operate / do you cover my district". The hub links down to the Inside
 * Dhaka hub and every district page, grouped by division, and is the "Areas we serve" crumb on
 * district pages. It never targets "{District} ambulance" (district pages own those).
 */
import { business, shown } from './business';
import type { ServicePage } from './service-pages/schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));

const hero: ServicePage['hero'] = {
  eyebrow: 'Areas we serve · 24/7',
  h1: 'Ambulance service across Dhaka and every district',
  lede: 'Inside Dhaka city, we send the nearest available ambulance. Anywhere else in Bangladesh, we pick up and drive to Dhaka or any district. Every fare is told before we move.',
  waFirst: true,
  trust: [business.hours.short, 'Dhaka and all 64 districts', 'Fare told before dispatch'],
  card: {
    title: 'Tell us where',
    items: [
      { text: 'The pickup: area or district, and the hospital or home with a landmark', notAClaim: false },
      { text: 'Where the patient is going', notAClaim: false },
      { text: "The patient's needs on the way, as the doctor advised", notAClaim: false },
    ],
    footerWithCrew: 'We confirm the vehicle and the fare.',
    footer: 'We confirm the vehicle and the fare.',
  },
};

export const locations = {
  slug: '/locations/',
  breadcrumb: 'Areas we serve',
  metaTitle: 'Areas We Serve: Dhaka and All Districts | Ambulance BD 24',
  metaDescription: `Ambulance service in every area of Dhaka and from all 64 districts to Dhaka, 24/7. Find your district, then call ${phone} for your fare.`,
  updated: '2026-10-22',
  hero,
  dhaka: {
    eyebrow: 'Inside Dhaka',
    h2Lead: 'Ambulance in',
    h2Accent: 'Dhaka city',
    text: `Our dispatch base is in ${business.address.locality}. For any area of Dhaka city, from Uttara to Old Dhaka, see`,
    anchor: 'ambulance in every area of Dhaka city',
  },
  districts: {
    eyebrow: 'Districts',
    h2Lead: 'Ambulance from your district',
    h2Accent: 'to Dhaka',
    intro: 'Pages for the districts families call us about most, grouped by division. Each one covers the route, the places we pick up from and the questions people ask about that district.',
    noPage: 'Call for this route',
    missing: `Your district is not listed? We still go there. Call ${phone}${wa ? ' or WhatsApp' : ''} with the pickup and destination, and we tell you the fare before we leave.`,
    hubLead: 'For fares, vehicle types and every route from Dhaka, see our',
    hubAnchor: 'inter-district ambulance service',
  },
  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Where we',
    h2Accent: 'go',
    items: [
      {
        q: 'Which areas do you cover?',
        a: 'Every area of Dhaka city, and journeys between Dhaka and all 64 districts of Bangladesh, in both directions. Call with the pickup and the destination, and we tell you the fare first.',
      },
      {
        q: 'Do you have ambulances stationed outside Dhaka?',
        a: `Our dispatch base is in ${business.address.locality}, Dhaka. For a district pickup, the ambulance travels from Dhaka, so district trips are usually planned ahead. For a sudden emergency outside Dhaka, call 999 or go to the nearest hospital.`,
      },
      {
        q: 'How do I find the fare for my district?',
        a: `Call ${phone}${wa ? ' or send a WhatsApp message' : ''} with the pickup, the destination, the date and the patient's needs. We tell you the full fare before we leave, and it does not change after the trip.`,
      },
    ],
  },
  nap: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: 'Every journey, in Dhaka or to a district, is dispatched from Mohakhali.' },
  final: { h2Lead: 'Need an ambulance', h2Accent: 'anywhere in Bangladesh?', text: 'Call and tell us where the patient is and where they need to go. We confirm the vehicle and the fare first.' },
};
