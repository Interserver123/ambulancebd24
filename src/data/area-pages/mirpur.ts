/**
 * /ambulance-service-mirpur/: ambulance service in Mirpur, Dhaka. Restores the old WordPress URL
 * (lost in the rebuild) as a real area page.
 * Written around what goes wrong on a Mirpur call (numbered sections and blocks, crowded lanes off
 * Begum Rokeya Sarani, metro works and station crowds, match days at the stadium, a long area from
 * Mirpur 1 to Mirpur 12) and what we do about each. Hospitals are destinations, never partners.
 * No prices, no equipment or crew claims, no minute figures. Distances are approximate road
 * distances from the Mohakhali base; confirm with dispatch before changing them.
 */
import { business, copy, shown } from '../business';
import { areaPageSchema } from './schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));
const base = business.address.locality;

export const mirpurPage = areaPageSchema.parse({
  key: 'mirpur',
  area: 'Mirpur',
  aliases: ['Pallabi', 'Kazipara', 'Shewrapara'],
  slug: '/ambulance-service-mirpur/',
  metaTitle: `Ambulance Service in Mirpur, Dhaka 24/7 | ${business.name}`,
  metaDescription: `Ambulance in every section of Mirpur, from Mirpur 1 to Mirpur 12 and Pallabi, 24/7: ICU, NICU, AC and freezer van. Fare told first. Call ${phone}.`,
  updated: '2026-11-03',
  byline: `Written by the ${business.name} dispatch team`,
  breadcrumb: 'Mirpur',
  schema: {
    name: 'Ambulance service in Mirpur, Dhaka',
    serviceType: 'Ambulance service',
    place: { name: 'Mirpur', sameAs: 'https://en.wikipedia.org/wiki/Mirpur,_Dhaka', geo: { lat: 23.8223, lng: 90.3654 } },
    mentions: [
      { type: 'Place', name: 'Sher-e-Bangla National Cricket Stadium', sameAs: 'https://en.wikipedia.org/wiki/Sher-e-Bangla_National_Cricket_Stadium' },
      { type: 'Place', name: 'Bangladesh National Zoo', sameAs: 'https://en.wikipedia.org/wiki/Bangladesh_National_Zoo' },
      { type: 'Place', name: 'Dhaka Metro Rail', sameAs: 'https://en.wikipedia.org/wiki/Dhaka_Metro_Rail' },
    ],
  },

  hero: {
    eyebrow: 'Ambulance in Mirpur · 24/7',
    h1: 'Ambulance service in Mirpur, Dhaka',
    lede: 'Mirpur is large and busy, from Mirpur 1 to Mirpur 12 and Pallabi. Give us your section, block, road and house number, and we confirm the vehicle and the fare before we dispatch.',
    trust: [business.hours.short, 'Every section of Mirpur', 'Fare told before dispatch'],
    card: {
      title: 'Tell us',
      items: [
        { text: 'Your section, block, road and house number', notAClaim: false },
        { text: 'Who is unwell, and what the doctor advised', notAClaim: false },
        { text: 'The hospital, if a doctor has named one', notAClaim: false },
      ],
      footerWithCrew: 'We confirm the vehicle and the fare.',
      footer: 'We confirm the vehicle and the fare.',
    },
  },

  intro: {
    h2: 'If you are in Mirpur and need an ambulance now',
    paragraphs: [
      `Call ${phone}. A dispatcher answers day and night. Tell us your section number first, for example Mirpur 10 or Mirpur 2, then the block, road and house. In Mirpur the section matters more than the area name, because road numbers repeat across sections.`,
      `We dispatch from ${base} and reach Mirpur through Agargaon or the cantonment roads. We will not promise a time we cannot keep. The dispatcher gives you the live arrival time on the call, and the fare before the ambulance leaves.`,
      `Below: what slows a Mirpur trip and what we do about it, which ambulance fits, the hospitals people ask for, and the Mirpur landmarks with the road from our base.`,
    ],
  },

  problems: {
    eyebrow: 'What goes wrong',
    h2Lead: 'Why an ambulance in Mirpur',
    h2Accent: 'needs clear directions',
    intro: 'Mirpur is one of the most crowded parts of Dhaka. These are the problems that lose time on a Mirpur call, and what we do about each.',
    items: [
      {
        pain: 'Twelve sections, repeating road numbers',
        happens: 'Mirpur is divided into numbered sections, blocks and roads. A road number in Mirpur 6 can also exist in Mirpur 11, and a driver sent to the wrong section loses time.',
        we: 'We ask for section, block, road, house number and a landmark, and read them back to you. Send a WhatsApp location pin as well.',
      },
      {
        pain: 'Narrow lanes off the main road',
        happens: 'Many Mirpur homes sit in narrow lanes off Begum Rokeya Sarani and Mirpur Road, crowded with rickshaws and shops. An ambulance may not reach the door of every house.',
        we: 'Tell us how wide your lane is. If the ambulance cannot reach the door, we agree a pickup point on the nearest wide road and plan how to carry the patient there.',
      },
      {
        pain: 'Metro stations and crowds',
        happens: 'The metro line runs above the main Mirpur roads, from Pallabi through Mirpur 11, Mirpur 10, Kazipara and Shewrapara. The station areas get very crowded at rush hour.',
        we: 'Tell us which station you are near and which side of the road. Ask someone to wait at the main road to guide the driver.',
      },
      {
        pain: 'Match days at the stadium',
        happens: 'Sher-e-Bangla National Cricket Stadium is in Mirpur 2. On match days the roads around it fill with crowds and some are closed.',
        we: 'The dispatcher picks a route around the stadium area and gives you a live arrival time, not a promise.',
      },
      {
        pain: 'A long way from the central hospitals',
        happens: 'From the northern sections of Mirpur and Pallabi, the drive to Panthapath, Shahbag or Gulshan is long, and traffic on Mirpur Road and Begum Rokeya Sarani is heavy at office hours.',
        we: 'Tell us the destination on the first call. We plan the route and confirm the vehicle and the fare before we leave.',
      },
    ],
  },

  services: {
    eyebrow: 'Which ambulance',
    h2Lead: 'Which ambulance',
    h2Accent: 'for your Mirpur trip',
    intro: 'Tell us what the doctor advised. We match the vehicle.',
    items: [
      {
        title: 'From Mirpur to an ICU bed',
        photo: 'icu',
        text: 'When the doctor advises ICU support on the way, for example a move from a Mirpur clinic to a bigger hospital.',
        links: [{ anchor: 'ICU ambulance service in Dhaka', href: '/icu-ambulance-service-dhaka/' }],
      },
      {
        title: 'A newborn moving to another NICU',
        photo: 'nicu',
        text: 'Calm and step by step. Ask the NICU doctor to confirm the receiving bed first, then call us with both hospital names.',
        links: [
          { anchor: 'NICU ambulance service', href: '/nicu-ambulance-service-dhaka/' },
          { anchor: 'steps for parents', href: '/the-procedure-to-request-a-nicu-ambulance/' },
        ],
      },
      {
        title: 'Discharge, check-ups and trips home',
        photo: 'ac',
        text: 'A cooled, comfortable ride from a hospital to your home in Mirpur, or from home to a check-up in central Dhaka.',
        links: [{ anchor: 'AC ambulance service', href: '/ac-ambulance-service/' }],
      },
      {
        title: 'Taking a loved one home',
        photo: 'freezer',
        text: 'We take your loved one home from a Mirpur hospital or home, within Dhaka or to any district. You can call at any hour.',
        links: [{ anchor: 'Freezer van service', href: '/freezer-ambulance-service/' }],
      },
      {
        title: 'From Mirpur to another district',
        photo: 'inter-district',
        text: 'Mirpur is on the north-west side, close to the road toward Gabtoli and the west. Tell us the destination on the first call.',
        links: [
          { anchor: 'Dhaka to any district', href: '/inter-district-ambulance-service/' },
          { anchor: 'Rajshahi route', href: '/ambulance-service-rajshahi/' },
        ],
      },
      {
        title: 'To the airport for a medical flight',
        photo: 'air',
        text: 'Air ambulance is arranged through an aviation operator. Our ground ambulance takes the patient between Mirpur and the airport.',
        links: [{ anchor: 'Air ambulance service', href: '/air-ambulance-service-bangladesh/' }],
      },
    ],
  },

  address: {
    eyebrow: 'Your address',
    h2: 'How to give your Mirpur address',
    intro: 'Do this on the call. It saves the most time.',
    steps: [
      { title: 'Section first', text: 'Say the section number first: Mirpur 1, 2, 10, 11, 12 or Pallabi.' },
      { title: 'Then block, road and house', text: 'Give the block, the road and the house number. For a block of flats, give the building name and the floor.' },
      { title: 'Add one landmark', text: 'Name something the driver can see: a metro station, a mosque, a school, a market or the stadium.' },
      { title: 'Send a location pin', text: 'Share your location on WhatsApp. A pin is better than a spoken address.' },
      { title: 'Meet us at the wide road', text: 'If your lane is narrow, ask someone to wait at the main road and walk the driver in.' },
    ],
    close: 'If you do not know the section, say what you can see. The dispatcher asks questions until we have you.',
  },

  hospitals: {
    eyebrow: 'Where we take patients',
    h2: 'Hospitals we take patients to from Mirpur',
    intro: 'We take patients to any hospital the doctor names. These hospitals are destinations only. This is not a ranking and not a recommendation. Ask the treating doctor which one is right, and ask the hospital to confirm it can receive the patient.',
    inAreaH3: 'In and near Mirpur',
    inArea: [
      { name: 'Delta Medical College and Hospital, Mirpur 1', role: 'destination' },
      { name: 'Kidney Foundation Hospital, Mirpur 2', role: 'destination' },
      { name: 'Dhaka Shishu (Children) Hospital, Sher-e-Bangla Nagar', role: 'destination' },
    ],
    cityH3: 'Elsewhere in Dhaka',
    city: [
      { name: 'National Institute of Cardiovascular Diseases', area: 'Sher-e-Bangla Nagar' },
      { name: 'Square Hospital', area: 'West Panthapath', href: '/square-hospital-dhaka/' },
      { name: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)', area: 'Shahbag' },
      { name: 'Dhaka Medical College Hospital', area: 'Dhaka Medical College area' },
      { name: 'United Hospital', area: 'Gulshan' },
    ],
    close: 'More hospitals, by area, are in our guide to private hospitals in Dhaka.',
  },

  fare: {
    eyebrow: 'Fare first',
    h2: 'Ambulance fare in Mirpur',
    answer: `${copy.fareLine.en} For Mirpur, the fare moves most with how far into Mirpur the ambulance travels to reach you, the distance to the hospital, and any waiting.`,
    factorsH3: 'What the fare depends on',
    factors: [
      'The distance from our Mohakhali base to your door',
      'The distance from your door to the hospital',
      'The type of ambulance the patient needs',
      'Waiting time at the hospital',
      'Whether you need the return trip',
    ],
    close: 'Ask for the full fare on the first call. If anything changes on the way, we tell you before we continue.',
  },

  landmarks: {
    eyebrow: 'Around Mirpur',
    h2: 'Landmarks in Mirpur and the road from our base',
    intro: 'Families often describe a location by a landmark. These are the places in and around Mirpur that people name most. For each one: why it matters for an ambulance call, the approximate road distance from our Mohakhali base, and a route in Google Maps.',
    disclaimer: 'Distances are approximate road distances. Traffic changes the drive a lot, so we do not publish a fixed time for each place. Ask the dispatcher for the live arrival time when you call.',
    distanceLabel: 'From our base',
    trafficLabel: 'Traffic',
    routeLabel: 'Route from Ambulance BD 24',
    mapH3: 'Map: from Ambulance BD 24 to Mirpur',
    mapShow: 'Show route map',
    mapCaption: `The route starts at our dispatch base in ${base}. The map loads only when you ask for it.`,
    mapDestination: 'Mirpur, Dhaka',
    items: [
      {
        name: 'Mirpur 10 circle',
        type: 'Main junction and metro station',
        why: 'The busiest junction in Mirpur, with a metro station above it. Many families give Mirpur 10 as their landmark. Tell us which road off the circle you are on.',
        km: 8,
        traffic: 'Very heavy at rush hour.',
        mapQuery: 'Mirpur 10 Circle, Dhaka',
      },
      {
        name: 'Sher-e-Bangla National Cricket Stadium',
        type: 'Stadium, Mirpur 2',
        why: 'An easy landmark in Mirpur 2. On match days the roads around the stadium fill up, so tell us if a match is on and which side of the stadium you are.',
        km: 9,
        traffic: 'Closed or crowded roads on match days.',
        mapQuery: 'Sher-e-Bangla National Cricket Stadium, Mirpur, Dhaka',
        sameAs: 'https://en.wikipedia.org/wiki/Sher-e-Bangla_National_Cricket_Stadium',
      },
      {
        name: 'Mirpur 1 and the zoo',
        type: 'Market area and National Zoo',
        why: 'Mirpur 1 has a big market and the road to the National Zoo and Botanical Garden. Lanes here are crowded. Tell us the market or mosque you are near.',
        km: 10,
        traffic: 'Crowded around the market.',
        mapQuery: 'Mirpur 1, Dhaka',
        sameAs: 'https://en.wikipedia.org/wiki/Bangladesh_National_Zoo',
      },
      {
        name: 'Kazipara and Shewrapara',
        type: 'Metro stations on Begum Rokeya Sarani',
        why: 'The southern part of Mirpur along Begum Rokeya Sarani. Homes here are often in narrow lanes behind the main road. Say which station and which side of the road.',
        km: 6,
        traffic: 'Heavy all day on the main road.',
        mapQuery: 'Kazipara Metro Station, Dhaka',
      },
      {
        name: 'Agargaon',
        type: 'Government and hospital area',
        why: 'Between Mirpur and our base, and the way we usually enter Mirpur. Several large hospitals and institutes in Sher-e-Bangla Nagar are next to it, which makes it common for Mirpur transfers.',
        km: 5,
        traffic: 'Busy at office hours.',
        mapQuery: 'Agargaon, Dhaka',
      },
      {
        name: 'Pallabi and Mirpur 12',
        type: 'Northern Mirpur',
        why: 'The northern end of Mirpur, a long way from the central hospitals. If you live here, call early and tell us the destination at once so we plan the whole route.',
        km: 11,
        traffic: 'Slow on the run south at rush hour.',
        mapQuery: 'Pallabi, Mirpur, Dhaka',
      },
      {
        name: 'Mirpur DOHS',
        type: 'Residential area',
        why: 'A planned residential area on the eastern side of Mirpur, near the cantonment. Give the avenue, road and house number, and tell the gate staff to expect the ambulance.',
        km: 10,
        traffic: 'Gate checks at the entrances.',
        mapQuery: 'Mirpur DOHS, Dhaka',
      },
      {
        name: 'Mirpur 11',
        type: 'Market and metro station',
        why: 'A crowded market area between Mirpur 10 and Pallabi, with a metro station on the main road. Name the market, mosque or station exit you are closest to.',
        km: 10,
        traffic: 'Crowded around the market.',
        mapQuery: 'Mirpur 11, Dhaka',
      },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Ambulance in Mirpur:',
    h2Accent: 'your questions',
    items: [
      {
        q: 'How fast can an ambulance reach Mirpur?',
        a: `${copy.timingLine.en} Our dispatch base is in ${base}, and Mirpur is farther out to the north-west, so the drive depends on your section and the traffic. The dispatcher gives you the live arrival time when you call ${phone}.`,
      },
      {
        q: 'Do you cover every section of Mirpur?',
        a: 'Yes. We go to every section of Mirpur, from Mirpur 1 and Kazipara to Mirpur 12, Pallabi and Mirpur DOHS. Give the section, block, road and house number.',
      },
      {
        q: 'What number do I call for an ambulance in Mirpur at night?',
        a: `Call ${phone}. A dispatcher answers 24 hours a day, 7 days a week. In a life-threatening emergency in Bangladesh you can also call 999.`,
      },
      {
        q: 'How much is an ambulance fare in Mirpur?',
        a: `${copy.fareLine.en} The fare depends on the vehicle, how far into Mirpur the ambulance travels, the distance to the hospital and any waiting. Ask for the full fare on the first call.`,
      },
      {
        q: 'My lane in Mirpur is too narrow for an ambulance. What happens?',
        a: 'Tell the dispatcher on the call. We agree a pickup point on the nearest wide road in Mirpur and plan how to carry the patient there. Ask someone to wait at the main road.',
      },
      {
        q: 'Can you take a patient from a Mirpur clinic to a hospital in central Dhaka?',
        a: 'Yes. Tell us the Mirpur clinic, the ward and floor, and the destination. Ask the receiving hospital to confirm it can receive the patient. We confirm the vehicle and the fare before we leave.',
      },
      {
        q: 'Is an ICU ambulance available in Mirpur?',
        a: 'Ask the treating doctor whether the patient needs ICU support on the way, then tell the dispatcher in the doctor’s words. We match the vehicle for your Mirpur pickup and tell you what it carries before you agree.',
      },
      {
        q: 'Is there a match at the Mirpur stadium today? Will that slow the ambulance?',
        a: 'On match days the roads around the stadium in Mirpur 2 are crowded. Tell the dispatcher if you are close to it. We choose a route around the crowds and give you a live arrival time.',
      },
      {
        q: 'Can you take a loved one home from Mirpur to another district?',
        a: 'Yes. Our freezer van takes your loved one home from a hospital or home in Mirpur to any district. You can call at any hour, and we tell you the full fare before we leave.',
      },
      {
        q: 'I do not know my section number in Mirpur. What should I do?',
        a: wa
          ? 'Send a WhatsApp location pin and tell us what you can see: a metro station, a market, the stadium. The dispatcher asks questions until we find you.'
          : 'Tell the dispatcher what you can see: a metro station, a market, the stadium. The dispatcher asks questions until we find you.',
      },
    ],
  },

  napHeading: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: `We dispatch from ${base}. You never need to come to the base. Mirpur is on the road north-west, through Agargaon.` },
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'in Mirpur?',
    text: 'Call and give us your section, block, road and house number. We confirm the vehicle and the fare first.',
    h3: 'Request a call back',
    pickupHint: 'Section, block, road and house number',
  },
});
