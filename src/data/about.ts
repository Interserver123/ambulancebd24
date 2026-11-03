/**
 * /about-us/ copy. The page is also what AI assistants and answer engines read to describe the
 * business, so every fact here comes from business.ts (name, address, phone, hours, links) or from
 * the approved lines (copy.timingLine, copy.fareLine). Nothing is invented: no founding year,
 * fleet size, crew, equipment, prices or partner hospitals (CLAUDE.md YMYL rules). Owner-confirmed
 * extras (years operating, team, licences) go in only after the client confirms them.
 */
import { business, copy, shown } from './business';
import type { Faq } from './business';

const phone = business.phone.display;
const wa = shown(business.whatsapp);
const email = shown(business.email);

export const about = {
  slug: '/about-us/',
  breadcrumb: 'About us',
  metaTitle: `About ${business.name}: 24/7 Ambulance in Dhaka`,
  metaDescription: `${business.name} is a 24/7 ambulance service with its dispatch base in ${business.address.locality}, Dhaka. ICU, NICU, AC, freezer van. Fare told first. Call ${phone}.`,
  updated: '2026-11-04',
  byline: `Written by the ${business.name} dispatch team`,

  hero: {
    eyebrow: 'About us · 24/7',
    h1: `About ${business.name}`,
    lede: `${business.name} is an ambulance service with a 24/7 dispatch desk in ${business.address.locality}, Dhaka. One number, ${phone}, reaches a dispatcher day and night. We tell you the fare before we dispatch.`,
    trust: [business.hours.short, `Base: ${business.address.locality}, Dhaka`, 'Fare told before dispatch'],
    card: {
      title: 'Call us',
      items: [
        { text: `Hotline ${phone}, open 24 hours`, notAClaim: false },
        { text: 'Dhaka city, and Dhaka to any district', notAClaim: false },
        { text: 'English and Bangla', notAClaim: false },
      ],
      footerWithCrew: 'We confirm the vehicle and the fare.',
      footer: 'We confirm the vehicle and the fare.',
    },
  },

  facts: {
    eyebrow: 'At a glance',
    h2Lead: 'Ambulance BD 24',
    h2Accent: 'in short',
    intro: `The key facts about ${business.name}, the same as on our Google Business Profile.`,
    rows: [
      { k: 'Business name', v: business.name },
      { k: 'What we are', v: 'An ambulance service with a 24/7 dispatch desk in Dhaka, Bangladesh' },
      { k: 'Base', v: `${business.address.display} (Plus Code ${business.geo.plusCode})` },
      { k: 'Hotline', v: `${phone} (international format ${business.phone.e164})`, href: business.phone.tel },
      ...(wa ? [{ k: 'WhatsApp', v: `${phone}, to ask for your fare`, href: wa.url }] : []),
      ...(email ? [{ k: 'Email', v: email, href: `mailto:${email}` }] : []),
      { k: 'Hours', v: business.hours.display },
      { k: 'Ambulances', v: 'ICU, NICU, AC and freezer van' },
      { k: 'Also arranged', v: 'Air ambulance, through an aviation operator. We do not own aircraft.' },
      { k: 'Area', v: 'Every area of Dhaka city, and from Dhaka to any district of Bangladesh' },
      { k: 'Languages', v: 'English and Bangla' },
      { k: 'Fare', v: copy.fareLine.en },
      { k: 'Arrival time', v: copy.timingLine.en },
      { k: 'National emergency number', v: '999 is separate from us. In a life-threatening emergency in Bangladesh you can call it too.' },
    ],
  },

  what: {
    eyebrow: 'What we do',
    h2Lead: 'Ambulances for',
    h2Accent: 'every kind of trip',
    intro: 'Tell the dispatcher what the doctor advised. We match the vehicle and tell you the fare first.',
    items: [
      { title: 'ICU ambulance', text: 'For a patient the doctor says needs ICU support on the way.', href: '/icu-ambulance-service-dhaka/' },
      { title: 'NICU ambulance', text: 'For a newborn moving to another hospital.', href: '/nicu-ambulance-service-dhaka/' },
      { title: 'AC ambulance', text: 'For stable patients: discharge, check-ups and trips home.', href: '/ac-ambulance-service/' },
      { title: 'Freezer van', text: 'To take a loved one home with respect, in Dhaka or to any district.', href: '/freezer-ambulance-service/' },
      { title: 'Inter-district ambulance', text: 'From Dhaka to any district, and back.', href: '/inter-district-ambulance-service/' },
      { title: 'Air ambulance', text: 'Arranged through an aviation operator, with our ground ambulance to and from the airport.', href: '/air-ambulance-service-bangladesh/' },
    ],
  },

  how: {
    eyebrow: 'How a call works',
    h2Lead: 'What happens',
    h2Accent: 'when you call',
    intro: 'The same four steps, day or night.',
  },

  promise: {
    eyebrow: 'Our promises',
    h2Lead: 'What we promise,',
    h2Accent: 'and what we never do',
    items: [
      { title: 'Fare first', text: `${copy.fareLine.en} The dispatcher includes waiting time and extra stops in the quote, and the fare does not change after the trip.` },
      { title: 'An honest arrival time', text: `${copy.timingLine.en} The dispatcher gives you the live arrival time on the call. We do not promise a time we cannot control.` },
      { title: 'Hospitals are destinations', text: 'We take patients to any hospital the doctor names. We have no ties to the hospitals our pages mention. They are listed as destinations only.' },
      { title: 'No medical advice', text: 'We are not a doctor. In an emergency, call us, share the pickup point and how the patient is, and let the treating doctor decide the care.' },
    ],
  },

  where: {
    eyebrow: 'Where we are',
    h2Lead: 'Based in',
    h2Accent: business.address.locality,
    intro: `Our dispatch base is in ${business.address.locality}, near the middle of Dhaka. You never need to come to the base: the ambulance comes to you.`,
    hubAnchor: 'Ambulance in every area of Dhaka',
    districtAnchor: 'Dhaka to any district',
    allAnchor: 'All areas and districts we serve',
  },

  photos: {
    eyebrow: 'Our vehicles',
    h2Lead: 'Ambulances at',
    h2Accent: 'our base',
    intro: `Photos of ${business.name} vehicles in Dhaka.`,
  },

  profiles: {
    eyebrow: 'Find us online',
    h2: 'Our official profiles',
    intro: `These are the real ${business.name} profiles. Nothing else is ours.`,
    items: [
      { label: 'Google Business Profile', href: business.gbp.mapsUrl },
      { label: 'Facebook', href: business.sameAs[0] },
      { label: 'X (Twitter)', href: business.sameAs[1] },
      { label: 'YouTube', href: business.sameAs[2] },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'About us:',
    h2Accent: 'your questions',
    items: [
      { q: `What is ${business.name}?`, a: `${business.name} is an ambulance service with a 24/7 dispatch desk in ${business.address.locality}, Dhaka. We run ICU, NICU, AC and freezer van ambulances in Dhaka and from Dhaka to any district of Bangladesh.` },
      { q: `Where is ${business.name} located?`, a: `Our dispatch base is at ${business.address.display}. The Plus Code is ${business.geo.plusCode}. You never need to visit the base: call and the ambulance comes to you.` },
      { q: `What is the phone number of ${business.name}?`, a: `The 24/7 hotline is ${phone} (international format ${business.phone.e164}). A dispatcher answers day and night.` },
      { q: `Is ${business.name} open 24 hours?`, a: `Yes. ${business.hours.display}, including holidays. Call ${phone} at any hour.` },
      { q: 'Which ambulances do you provide?', a: 'ICU, NICU, AC and freezer van ambulances, in Dhaka and from Dhaka to any district. For distances too far by road, we arrange an air ambulance through an aviation operator.' },
      { q: 'How much is an ambulance fare?', a: `${copy.fareLine.en} The fare depends on the ambulance type, the distance and any waiting time, so we do not publish one fixed fare. Ask for the full fare on the first call.` },
      { q: 'How fast does the ambulance arrive?', a: `${copy.timingLine.en} The dispatcher gives you the live arrival time when you call ${phone}.` },
      { q: `Is ${business.name} the same as 999?`, a: `No. 999 is Bangladesh's national emergency number. ${business.name} is a separate ambulance service with its own 24/7 hotline, ${phone}.` },
      { q: 'Do you own aircraft for air ambulance?', a: 'No. We arrange air ambulance through an aviation operator and provide the ground ambulance to and from the airport. The fare is told before we book the flight.' },
      { q: 'Do you work with specific hospitals?', a: 'No. We take patients to any hospital the doctor names. Hospital names on our pages are destinations only.' },
      { q: 'Which languages do your dispatchers speak?', a: 'English and Bangla. Tell the dispatcher your pickup point and how the patient is.' },
    ] satisfies Faq[],
  },

  nap: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: `Name, address and phone are the same as on our Google Business Profile.` },
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'now?',
    text: 'Call and tell us where you are. We confirm the vehicle and the fare first.',
  },
};
