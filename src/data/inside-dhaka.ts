/**
 * Inside Dhaka hub: /ambulance-service-areas-dhaka/ (new URL).
 * Intent: "which Dhaka areas do you cover / ambulance in my area". The homepage keeps the
 * head term "ambulance service in Dhaka"; this page is the coverage hub that every Dhaka
 * area page links up to, and it links down to each area page as they are published.
 * Area hints come from homepage.ts (one source). No invented landmarks, hospitals or timings.
 */
import { business, copy, shown } from './business';
import { hp } from './homepage';
import { homeEn } from './home';
import type { ServicePage } from './service-pages/schema';

const phone = business.phone.display;

/** Every Dhaka area we name, with the short hint where homepage.ts has one. */
const hints = new Map<string, string>(hp.coverage.areas.map((a) => [a.name, a.hint]));
export const dhakaAreas = homeEn.areas.dhaka.map((name) => ({ name, hint: hints.get(name) }));

const hero: ServicePage['hero'] = {
  eyebrow: 'Inside Dhaka · every area · 24/7',
  h1: 'Ambulance in every area of Dhaka city',
  lede: `From Uttara to Old Dhaka, call one number. We send the nearest available ambulance to your area and tell you the fare before we move.`,
  trust: [business.hours.short, copy.timingLine.chip, 'Fare told before dispatch'],
  card: {
    title: 'Tell us where you are',
    items: [
      { text: 'Your area and a landmark: Gulshan 1 circle, Mirpur 10, Farmgate', notAClaim: false },
      { text: 'The house, the road, or the hospital and ward', notAClaim: false },
      { text: 'How the patient is, and where they need to go', notAClaim: false },
    ],
    footerWithCrew: 'We confirm the vehicle and the fare.',
    footer: 'We confirm the vehicle and the fare.',
  },
};

export const insideDhaka = {
  slug: '/ambulance-service-areas-dhaka/',
  breadcrumb: 'Inside Dhaka',
  metaTitle: 'Ambulance in Every Area of Dhaka City | Ambulance BD 24',
  metaDescription: `Ambulance in Gulshan, Banani, Mirpur, Uttara, Dhanmondi, Old Dhaka and every area of Dhaka city, 24/7. Fare told first. Call ${phone}.`,
  updated: '2026-10-21',
  hero,

  areas: {
    eyebrow: 'Areas we cover',
    h2Lead: 'Every area',
    h2Accent: 'of Dhaka city',
    intro: `Our dispatch base is in ${business.address.locality}, near the middle of the city. ${copy.timingLine.en} Your area is not listed? We still come. Call and tell us where you are.`,
    pageAnchor: (a: string) => `Ambulance in ${a}`,
    base: 'Our dispatch base',
  },

  steps: {
    eyebrow: 'How it works',
    h2Lead: 'What happens',
    h2Accent: 'when you call',
    intro: 'The same four steps, in any area of the city.',
  },

  services: {
    eyebrow: 'Inside the city',
    h2Lead: 'Which ambulance',
    h2Accent: 'do you need?',
    items: [
      { key: 'ac', anchor: 'AC ambulance in Dhaka', text: 'Emergencies, discharge and check-up trips for stable patients.' },
      { key: 'icu', anchor: 'ICU ambulance in Dhaka', text: 'Hospital transfers when the doctor advises ICU support on the way.' },
      { key: 'nicu', anchor: 'NICU ambulance for newborns', text: 'Moving a newborn to a NICU at another hospital.' },
      { key: 'freezer', anchor: 'Freezer van', text: 'Taking a loved one home with respect.' },
    ],
    homeLead: 'For the emergency hotline, see our',
    homeAnchor: '24/7 ambulance service in Dhaka',
  } satisfies ServicePage['related'],

  beyond: {
    h2: 'Going outside Dhaka?',
    text: 'For a trip from Dhaka to any district, or from a district hospital to Dhaka, see our',
    anchor: 'inter-district ambulance',
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Ambulance inside Dhaka',
    h2Accent: 'questions',
    items: [
      {
        q: 'Which areas of Dhaka do you cover?',
        a: `Every area of Dhaka city, including Gulshan, Banani, Mirpur, Uttara, Dhanmondi, Mohammadpur, Badda, Rampura, Tejgaon and Old Dhaka. Our dispatch base is in ${business.address.locality}.`,
      },
      {
        q: 'How fast can an ambulance reach my area?',
        a: `${copy.timingLine.en} The dispatcher tells you the expected arrival time on the call.`,
      },
      {
        q: 'How much is an ambulance inside Dhaka?',
        a: 'It depends on the distance, the type of ambulance, waiting time and extra stops. We tell you the fare before we dispatch, and it does not change after the trip.',
      },
      {
        q: 'What should I tell the dispatcher?',
        a: 'Your area and a nearby landmark, the house or hospital, how the patient is, and where they need to go. An address or a landmark is enough to start.',
      },
      {
        q: 'My area is not on the list. Can you still come?',
        a: 'Yes. The list shows the areas people ask about most. Call and tell us where you are, and we send the nearest available ambulance.',
      },
      ...(shown(business.whatsapp)
        ? [
            {
              q: 'Can I book an ambulance inside Dhaka on WhatsApp?',
              a: 'Yes, for planned trips such as a discharge or a check-up. Send the pickup, the destination and the time, and ask for the fare first. For an emergency, always call.',
            },
          ]
        : []),
    ],
  },

  nap: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch',
    h2Accent: 'base',
    body: 'You never need to come to the base. Call, and the ambulance comes to your area.',
  },

  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'in Dhaka?',
    text: 'Call and tell us your area and a landmark. We tell you the fare and send the nearest available ambulance.',
  },
};
