/**
 * Contact page: /contact/. Every way to reach us, who answers, what happens next,
 * where we dispatch to, NAP + map (layout) and contact FAQs. All NAP from business.ts.
 * Gated: email (business.email), WhatsApp (business.whatsapp), any-hospital pickup.
 * No em dashes in body copy.
 */
import { z } from 'astro/zod';
import { business, copy, shown } from './business';
import { serviceFaqSchema, type ServicePage } from './service-pages/schema';

const phone = business.phone.display;
const wa = shown(business.whatsapp);
const email = shown(business.email);

const meta = z
  .object({ title: z.string().min(10).max(60), description: z.string().min(50).max(155), updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) })
  .parse({
    title: `Contact Ambulance BD 24 | 24/7 Hotline ${phone}`,
    description: `Contact Ambulance BD 24 in Mohakhali, Dhaka: 24/7 hotline ${phone}, WhatsApp and call back. Address, map and directions to our base.`,
    updated: '2026-10-21',
  });

const hero: ServicePage['hero'] = {
  eyebrow: `Contact · ${business.address.locality}, Dhaka · 24/7`,
  h1: `Contact ${business.name}`,
  lede: 'Need an ambulance now? Call. Planning a trip? WhatsApp or ask for a call back. A dispatcher answers day and night, and tells you the fare before we move.',
  trust: ['Open 24 hours, 7 days', 'Fare told before dispatch', 'Bangla and English'],
  card: {
    title: 'When you call, tell us',
    items: [
      { text: 'Where you are: the area and a nearby landmark, or the hospital and ward', notAClaim: false },
      { text: "How the patient is, and if they need a stretcher, a wheelchair or oxygen", notAClaim: false },
      { text: 'Where they need to go, and a number we can call back', notAClaim: false },
    ],
    footerWithCrew: 'We confirm the vehicle and the fare.',
    footer: 'We confirm the vehicle and the fare.',
  },
};

type Way = NonNullable<ServicePage['trips']>['items'][number];
const ways: Way[] = [
  {
    icon: 'phone',
    title: 'Call the 24/7 hotline',
    text: `For an emergency, always call ${phone}. A dispatcher answers day and night and sends the nearest available ambulance.`,
    link: { href: business.phone.tel, anchor: `Call ${phone}`, placement: 'contact-way-call' },
    verified: true,
  },
  {
    icon: 'whatsapp',
    title: 'WhatsApp for your fare',
    text: 'Planning a discharge, a check-up or a district trip? Send the pickup, the destination and the time, and ask for the fare first.',
    link: wa ? { href: wa.url, anchor: copy.cta.whatsapp.en, placement: 'contact-way-whatsapp' } : undefined,
    verified: Boolean(wa),
  },
  {
    icon: 'clock',
    title: 'Request a call back',
    text: 'Leave your name, phone and pickup location in the form below, and a dispatcher calls you back. For an emergency, call instead.',
    link: { href: '#callback', anchor: copy.cta.callback.en },
    verified: true,
  },
  {
    icon: 'mail',
    title: 'Email us',
    text: 'For questions that are not urgent, such as invoices or planned transfers next week. For anything urgent, call.',
    link: email ? { href: `mailto:${email}`, anchor: email } : undefined,
    verified: Boolean(email),
  },
  {
    icon: 'pin',
    title: `Our base in ${business.address.locality}`,
    text: 'You never need to come to the base: the ambulance comes to you. If you do need to find us, the address, map and directions are below.',
    link: { href: '#contact', anchor: 'Address and map' },
    verified: true,
  },
  {
    icon: 'facebook',
    title: 'Follow us',
    text: 'Updates and news from our team on Facebook, X and YouTube. For an ambulance, please call rather than message on social media.',
    link: { href: business.sameAs[0], anchor: 'Our Facebook page' },
    verified: true,
  },
];

export const contactPage = {
  slug: '/contact/',
  breadcrumb: 'Contact',
  ...meta,
  byline: `Written by the ${business.name} dispatch team in ${business.address.locality}, Dhaka. We update this page whenever our contact details change.`,
  hero,
  ways: {
    eyebrow: 'Ways to reach us',
    h2Lead: 'Call, WhatsApp',
    h2Accent: 'or ask for a call back',
    intro: 'Pick the way that suits the moment. For an emergency, always call: it is quicker than any message.',
    items: ways,
  } satisfies ServicePage['trips'],
  form: {
    eyebrow: 'Call-back form',
    h2Lead: 'Request',
    h2Accent: 'a call back',
    text: 'Planning a discharge, a check-up or a district trip? Leave three details and a dispatcher calls you back to plan it with you.',
    points: [
      'A dispatcher calls you back on the number you give',
      'We ask about the patient, the pickup and the destination',
      'You hear the fare before anything is booked',
    ],
    urgent: 'An emergency? Do not wait for a call back. Call now:',
    formTitle: 'Your details',
  },
  who: {
    eyebrow: 'Who answers',
    h2: 'A dispatcher in Mohakhali, day and night',
    answer: `When you call ${phone}, a dispatcher at our ${business.address.locality} base answers. They ask where you are, how the patient is and where they need to go. Then they tell you the fare and send the nearest available ambulance.`,
    more: 'Speak in Bangla or English, whichever is easier. If you are calling in a panic, that is normal: the dispatcher will guide you with simple questions.',
  } satisfies ServicePage['why'],
  steps: {
    eyebrow: "Here's how a call goes",
    h2Lead: 'What happens',
    h2Accent: 'when you call',
    intro: 'The same four steps, day or night, for an emergency or a planned trip.',
  },
  coverage: {
    eyebrow: 'Where we go',
    h2Lead: 'We send ambulances',
    h2Accent: 'across Dhaka',
    answer: `We dispatch from ${business.address.locality} to every area of Dhaka, ${copy.timingLine.inline}, and from Dhaka to every district.`,
    hospitalsH3: 'Pickup from any hospital in Dhaka',
    hospitalsLead: "Call us and we'll come to the ward or gate where the patient is.",
    anyHospitalGate: true,
    areasH3: 'Dhaka areas',
    districtsH3: 'From Dhaka to districts',
    districtsText: 'For a district trip, tell us the destination first, so the dispatcher can give you the full fare before you agree.',
    interDistrictAnchor: 'inter-district ambulance',
    longRoute: 'Long routes are planned on the call, with the vehicle and the full fare confirmed first.',
  } satisfies ServicePage['coverage'],
  reviews: { eyebrow: 'Reviews', h2Lead: 'What families', h2Accent: 'say' },
  nap: {
    eyebrow: 'Find us',
    h2Lead: 'Our dispatch base in',
    h2Accent: business.address.locality,
    body: 'Name, address and phone are the same as on our Google Business Profile. Call first: the ambulance comes to you.',
  },
  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Contact',
    h2Accent: 'questions',
    items: z.array(serviceFaqSchema).parse([
      {
        q: 'What is the Ambulance BD 24 phone number?',
        a: `Call ${phone}, 24 hours a day, 7 days a week. From outside Bangladesh, dial ${business.phone.e164}.`,
        verified: true,
      },
      {
        q: 'Can I message on WhatsApp instead of calling?',
        a: 'Yes, for planned trips such as a discharge, a check-up or a district journey. For an emergency, always call: it is faster.',
        verified: Boolean(wa),
      },
      {
        q: 'Do I need to visit your office to book an ambulance?',
        a: `No. Call or WhatsApp, and the ambulance comes to you. Our base in ${business.address.locality} is where we dispatch from.`,
        verified: true,
      },
      {
        q: 'What details do you need when I call?',
        a: "Where you are and a nearby landmark, how the patient is, where they need to go, and a phone number we can reach. If you can't answer everything, that's fine: we'll ask.",
        verified: true,
      },
      {
        q: 'Can family abroad arrange an ambulance for a patient in Dhaka?',
        a: "Yes. Call or WhatsApp us from any country with the patient's location in Dhaka, their condition and a local contact number. We tell you the fare before we dispatch.",
        verified: true,
      },
      {
        q: 'Is Ambulance BD 24 the same as 999?',
        a: `No. 999 is Bangladesh's national emergency number. ${business.name} is a separate ambulance service with its own 24/7 hotline, ${phone}.`,
        verified: true,
      },
      {
        q: 'Can I contact you by email?',
        a: email ? `Yes, at ${email}, for anything that is not urgent. For an ambulance, always call.` : '',
        verified: Boolean(email),
      },
    ]),
  },
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'now?',
    text: 'Call and tell us where you are. We tell you the fare and send the nearest available ambulance.',
    h3: 'Planning a trip? Request a call back',
  },
};
