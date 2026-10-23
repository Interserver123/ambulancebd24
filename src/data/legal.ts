/**
 * Legal pages: /privacy-policy/, /terms/, /disclaimer/ (footer links already point here).
 * Plain words, written from what the site actually does (form fields, Cloudflare, Zaraz/GA4,
 * Google Maps and reviews). No invented retention periods, payment methods, cancellation fees,
 * crew, equipment or legal citations. The email is not shown until verified (business.ts).
 * Review with a Bangladeshi lawyer before relying on these as legal advice.
 */
import { business, copy, shown } from './business';

const phone = business.phone.display;
const wa = shown(business.whatsapp);
const email = shown(business.email);
const where = business.address.display;

export type LegalSection = { id: string; h2: string; paras?: string[]; items?: string[] };
export type LegalPage = {
  slug: string;
  breadcrumb: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: LegalSection[];
};

const UPDATED = '2026-10-23';

const contactSection = (lead: string): LegalSection => ({
  id: 'contact',
  h2: 'Contact us',
  paras: [
    `${lead} Call ${phone}${wa ? ' or message us on WhatsApp' : ''}. You can also use the call-back form on our contact page. ${business.name}, ${where}.`,
    ...(email ? [`Email: ${email}`] : []),
  ],
});

export const privacyPolicy: LegalPage = {
  slug: '/privacy-policy/',
  breadcrumb: 'Privacy policy',
  metaTitle: 'Privacy Policy | Ambulance BD 24',
  metaDescription: `How ${business.name} uses the details you share when you call, message or send a call-back request on ambulancebd24.com.`,
  updated: UPDATED,
  eyebrow: 'Privacy policy',
  h1: 'Privacy policy',
  intro: `${business.name} runs ambulance services from ${where}. This page explains what we collect on ambulancebd24.com and when you call or message us, why, and what you can ask us to do. We keep it short and we do not sell your details.`,
  sections: [
    {
      id: 'collect',
      h2: 'What we collect',
      paras: ['We collect only what we need to send an ambulance and to run this website.'],
      items: [
        'Call-back form: your name, phone number and pickup location. The form also records the page it was sent from and the time.',
        'Phone calls and WhatsApp messages: your number and what you tell us, such as the pickup, the destination and the patient\'s condition, so the dispatcher can plan the trip.',
        'Website visits: which pages are viewed and which call, WhatsApp and directions buttons are tapped. This is measured with Google Analytics 4 through Cloudflare Zaraz. We do not use it to identify you.',
        'Technical data: your IP address and browser details, handled by Cloudflare to deliver the site and block spam and attacks.',
      ],
    },
    {
      id: 'use',
      h2: 'How we use it',
      items: [
        'To call you back, confirm the vehicle and the fare, and dispatch the ambulance.',
        'To keep a record of the request and answer questions about it.',
        'To understand which pages and buttons help people reach us, and to fix problems on the site.',
        'To prevent spam and misuse of the form.',
        'To meet legal duties when the law of Bangladesh requires it.',
      ],
    },
    {
      id: 'share',
      h2: 'Who sees it',
      paras: [
        'We do not sell or rent your details. A call-back request goes to our dispatch team by email and may also reach them as a Telegram alert. These services process it for us:',
      ],
      items: [
        'Cloudflare: hosts the website, protects the form and may run the Turnstile spam check.',
        'Resend: delivers the form request to our dispatch team by email.',
        'Telegram: may carry the alert to the dispatcher.',
        'Google: Analytics measurement through Zaraz, and Google Maps and Google reviews when those parts of a page are loaded.',
        'An aviation operator, only when you ask us to arrange an air ambulance, and only the details needed for that transfer.',
      ],
    },
    {
      id: 'cookies',
      h2: 'Cookies and tracking',
      paras: [
        'Analytics and the services above may set cookies or similar identifiers in your browser. We use them to count visits and button taps, not to show you adverts. You can block or delete cookies in your browser settings. The site and the hotline work without them.',
      ],
    },
    {
      id: 'keep',
      h2: 'How long we keep it',
      paras: [
        'We keep a request only as long as we need it to handle the trip, answer questions about it and keep our service records. After that we delete it or remove what identifies you.',
      ],
    },
    {
      id: 'safe',
      h2: 'Keeping it safe',
      paras: [
        'The site is served over HTTPS. The form sends only three fields and access to requests is limited to our dispatch team. No online system is completely secure, so for anything very sensitive, tell the dispatcher on the phone.',
      ],
    },
    {
      id: 'rights',
      h2: 'Your choices',
      items: [
        'Ask what we hold about you.',
        'Ask us to correct or delete your request details.',
        'Ask us to stop contacting you about a request.',
      ],
      paras: ['We answer as soon as we can. We may need to confirm it is you before we change or delete anything.'],
    },
    {
      id: 'children',
      h2: 'Children',
      paras: [
        'The site is for adults, such as parents and family members, arranging transport for a patient. We do not knowingly collect details from children for any other purpose.',
      ],
    },
    {
      id: 'links',
      h2: 'Other websites',
      paras: [
        'Our pages link to Google Maps, Google reviews, Facebook, X and YouTube. Those sites have their own privacy policies and we do not control them.',
      ],
    },
    {
      id: 'changes',
      h2: 'Changes to this policy',
      paras: ['When we change this page we update the date at the top. Please check it from time to time.'],
    },
    contactSection('Questions about your details or this policy?'),
  ],
};

export const terms: LegalPage = {
  slug: '/terms/',
  breadcrumb: 'Terms and conditions',
  metaTitle: 'Terms and Conditions | Ambulance BD 24',
  metaDescription: `The terms for using ambulancebd24.com and booking an ambulance with ${business.name}: fares, cancellations, air ambulance and responsibilities.`,
  updated: UPDATED,
  eyebrow: 'Terms and conditions',
  h1: 'Terms and conditions',
  intro: `These terms cover the ${business.name} website and the ambulance services we arrange. By using the site or booking a trip, you agree to them. If something is unclear, call ${phone} and ask before you book.`,
  sections: [
    {
      id: 'who',
      h2: 'Who we are',
      paras: [
        `${business.name} is an ambulance service based at ${where}. We run ICU, NICU, AC and freezer van ambulances in Dhaka and between Dhaka and the districts of Bangladesh, ${business.hours.display.toLowerCase()}.`,
      ],
    },
    {
      id: 'service',
      h2: 'What the service is',
      paras: [
        'We provide road transport by ambulance and arrange air ambulance transfers through an aviation operator. We transport patients. We do not diagnose or treat them, and nothing on this site or on a call is medical advice.',
        'In a life-threatening emergency, call 999 or go to the nearest hospital if that is faster.',
      ],
    },
    {
      id: 'booking',
      h2: 'Booking a trip',
      items: [
        `Call ${phone}${wa ? ', message us on WhatsApp' : ''} or send a call-back request.`,
        'Tell us the pickup, the destination, the patient\'s condition as the doctor advised, and a phone number we can reach.',
        'We match the vehicle and confirm it with you. A trip is booked when we confirm it on the call or in a message.',
        'Please give accurate details. If they change on the way, tell the dispatcher so we can adjust.',
      ],
    },
    {
      id: 'fares',
      h2: 'Fares and payment',
      items: [
        `${copy.fareLine.en} The fare depends on the vehicle, the distance and waiting time.`,
        'If the trip changes, for example a longer route, extra stops or more waiting, we tell you the new fare before we continue.',
        'We tell you the accepted payment methods when we confirm the trip.',
      ],
    },
    {
      id: 'cancel',
      h2: 'Changes and cancellations',
      paras: [
        'If your plans change, call the hotline as early as you can. If an ambulance has already been sent, we tell you on the call whether any charge applies, before you decide.',
      ],
    },
    {
      id: 'times',
      h2: 'Arrival and travel times',
      paras: [
        `${copy.timingLine.en} Weather, road works, tolls and bridge queues can change arrival and journey times, especially on district trips. We cannot promise a time we cannot control, and we tell you honestly when a delay is likely.`,
      ],
    },
    {
      id: 'air',
      h2: 'Air ambulance',
      paras: [
        'We do not own aircraft. Air ambulance is arranged through an aviation operator, and the operator\'s own terms, fare and flight decisions apply. Our ground ambulance takes the patient to and from the airport.',
      ],
    },
    {
      id: 'hospitals',
      h2: 'Hospitals',
      paras: [
        'Hospitals named on this site are places we take patients to. We do not work for any hospital and no hospital endorses us. We do not decide which hospital a patient is admitted to.',
      ],
    },
    {
      id: 'you',
      h2: 'Your responsibilities',
      items: [
        'Give us accurate details about the patient and the trip.',
        'Follow the crew\'s reasonable instructions for the safety of the patient and everyone on board.',
        'Do not misuse the hotline, the form or this website.',
      ],
    },
    {
      id: 'liability',
      h2: 'Our responsibility',
      paras: [
        'We take care to run every trip safely and honestly. We cannot promise any medical result, because that depends on the patient\'s condition and the hospital\'s care. To the extent the law of Bangladesh allows, we are not liable for delays or losses caused by traffic, weather, road closures or other events outside our control, or for the decisions of hospitals and doctors. Nothing here limits any right you have that the law does not allow us to limit.',
      ],
    },
    {
      id: 'site',
      h2: 'Using this website',
      paras: [
        'The text, layout and brand on this site belong to us. You may link to a page or share our number, but please do not copy the site or present it as your own. Information on the site is general and may change. Pages that link to other websites are not under our control.',
      ],
    },
    {
      id: 'law',
      h2: 'Governing law',
      paras: ['These terms follow the laws of Bangladesh. Any dispute is for the courts of Bangladesh. We would rather hear about a problem first, so please call us.'],
    },
    {
      id: 'changes',
      h2: 'Changes to these terms',
      paras: ['We update the date at the top when these terms change. The version on this page when you book applies to that trip.'],
    },
    contactSection('Questions about these terms?'),
  ],
};

export const disclaimer: LegalPage = {
  slug: '/disclaimer/',
  breadcrumb: 'Disclaimer',
  metaTitle: 'Medical and Service Disclaimer | Ambulance BD 24',
  metaDescription: `What ambulancebd24.com is and is not: ambulance transport, not medical advice. Hospitals are destinations. Call ${phone}, 24/7.`,
  updated: UPDATED,
  eyebrow: 'Disclaimer',
  h1: 'Disclaimer',
  intro: `This site helps you reach an ambulance. It does not replace a doctor. Please read this short page so you know what to expect from ${business.name}.`,
  sections: [
    {
      id: 'medical',
      h2: 'Not medical advice',
      paras: [
        'Pages, guides and blog posts on this site are general information. They do not diagnose, treat or advise on any condition. In an emergency, do this: call, share your location and the patient\'s condition. Then follow the advice of a doctor or the emergency services.',
        'In a life-threatening emergency, call 999 or go to the nearest hospital if that is faster.',
      ],
    },
    {
      id: 'transport',
      h2: 'We provide transport',
      paras: [
        'We move patients between home, hospitals and districts, and we take a loved one home after they have passed away. We do not promise any medical outcome.',
      ],
    },
    {
      id: 'hospitals',
      h2: 'Hospitals are destinations',
      paras: [
        'When a page names a hospital, it is a place we take patients to. It does not mean the hospital works with us, recommends us or has approved the page.',
      ],
    },
    {
      id: 'air',
      h2: 'Air ambulance',
      paras: ['We arrange air ambulance through an aviation operator. We do not own aircraft.'],
    },
    {
      id: 'times',
      h2: 'Times and fares',
      paras: [
        `${copy.timingLine.en} District trips take longer and depend on the road. Fares depend on the vehicle, the distance and waiting time, and we tell you the fare before we dispatch.`,
      ],
    },
    {
      id: 'reviews',
      h2: 'Reviews',
      paras: ['Reviews shown on the site come from Google and appear as their authors wrote them. We do not edit them.'],
    },
    {
      id: 'general',
      h2: 'General guides',
      paras: [
        'Some guides discuss other countries or general topics, for example insurance rules abroad. They are written for information only and may not apply in Bangladesh.',
      ],
    },
    contactSection('Questions about this page?'),
  ],
};
