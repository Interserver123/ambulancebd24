/**
 * /ambulance-service-mohakhali/: ambulance service in Mohakhali, Dhaka, the area of our dispatch base.
 * Intent: "ambulance Mohakhali" and near-me searches around the base. The homepage keeps the head
 * term "ambulance service in Dhaka"; this page owns the Mohakhali area intent only.
 * Written around what goes wrong on a Mohakhali call (the flyover and its service roads, the bus
 * terminal, the hospital cluster, Wireless Gate and the rail crossing, DOHS gates) and what we do
 * about each. Hospitals are destinations, never partners. No prices, no equipment or crew claims,
 * no minute figures. Distances are approximate road distances from the base; confirm with dispatch.
 */
import { business, copy, shown } from '../business';
import { areaPageSchema } from './schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));

export const mohakhaliPage = areaPageSchema.parse({
  key: 'mohakhali',
  area: 'Mohakhali',
  aliases: ['Mohakhali DOHS', 'Amtoli'],
  slug: '/ambulance-service-mohakhali/',
  metaTitle: `Ambulance Service in Mohakhali, Dhaka 24/7 | ${business.name}`,
  metaDescription: `Our dispatch base is in Mohakhali. Ambulance 24/7 in Mohakhali, DOHS, Amtoli and Wireless Gate: ICU, NICU, AC and freezer van. Call ${phone}.`,
  updated: '2026-11-03',
  byline: `Written by the ${business.name} dispatch team`,
  breadcrumb: 'Mohakhali',
  schema: {
    name: 'Ambulance service in Mohakhali, Dhaka',
    serviceType: 'Ambulance service',
    place: { name: 'Mohakhali', sameAs: 'https://en.wikipedia.org/wiki/Mohakhali', geo: { lat: 23.7781, lng: 90.4006 } },
    mentions: [
      { type: 'Place', name: 'icddr,b', sameAs: 'https://en.wikipedia.org/wiki/International_Centre_for_Diarrhoeal_Disease_Research,_Bangladesh' },
    ],
  },

  hero: {
    eyebrow: 'Ambulance in Mohakhali · 24/7',
    h1: 'Ambulance service in Mohakhali, Dhaka',
    lede: 'Our dispatch base is in Mohakhali, so this is our home area. Tell us your road and building, or the hospital and ward, and we confirm the vehicle and the fare before we dispatch.',
    trust: [business.hours.short, 'Our base is in Mohakhali', 'Fare told before dispatch'],
    card: {
      title: 'Tell us',
      items: [
        { text: 'Road and building, or the hospital and ward', notAClaim: false },
        { text: 'Who is unwell, and what the doctor advised', notAClaim: false },
        { text: 'Where the patient needs to go', notAClaim: false },
      ],
      footerWithCrew: 'We confirm the vehicle and the fare.',
      footer: 'We confirm the vehicle and the fare.',
    },
  },

  intro: {
    h2: 'If you are in Mohakhali and need an ambulance now',
    paragraphs: [
      `Call ${phone}. A dispatcher answers day and night. Our base is in Mohakhali, so the ambulance does not have to cross the city to reach you. Tell us the road and building, or the hospital, ward and floor.`,
      `${copy.timingLine.en} Even close to our base, the flyover, the bus terminal and the hospital gates can slow the last stretch. The dispatcher gives you the live arrival time on the call, and the fare before the ambulance leaves.`,
      `Below: what slows a Mohakhali trip and what we do about it, which ambulance fits, the hospitals in Mohakhali, and the landmarks families name most.`,
    ],
  },

  problems: {
    eyebrow: 'What goes wrong',
    h2Lead: 'What slows an ambulance',
    h2Accent: 'in Mohakhali',
    intro: 'Mohakhali is close, but it is one of the busiest crossings in Dhaka. These are the problems that lose time on a call, and what we do about each.',
    items: [
      {
        pain: 'Above or below the flyover',
        happens: 'The Mohakhali flyover carries traffic over the junction, with service roads below. A driver who takes the flyover when you are on the road underneath has to loop back.',
        we: 'Tell us whether you are on the main road, a service road or a side lane, and which side of the flyover. We read it back to you.',
      },
      {
        pain: 'Buses at the terminal',
        happens: 'The Mohakhali bus terminal fills the roads around it with long-distance buses and crowds, especially in the evening and before holidays.',
        we: 'If you are near the terminal, tell us the gate or shop you can see. We agree a pickup point the ambulance can reach.',
      },
      {
        pain: 'Large hospital campuses',
        happens: 'Mohakhali has several large hospitals and institutes close together. Each campus has many buildings and gates, and families often do not know which gate the ambulance should use.',
        we: 'Tell us the hospital, the building or ward, and the floor. Ask the ward staff which gate to use, and send someone to wait there.',
      },
      {
        pain: 'The rail crossing and Wireless Gate',
        happens: 'The railway line and the crossings near Mohakhali and Wireless Gate can hold traffic when a train passes, and the roads toward Tejgaon get congested.',
        we: 'The dispatcher picks the route that avoids the crossing where it can, and gives you a live arrival time, not a promise.',
      },
      {
        pain: 'Gates in Mohakhali DOHS',
        happens: 'Mohakhali DOHS is a gated residential area with checks at the entrances. A driver can be held at the gate while the family waits upstairs.',
        we: 'Give the road and house number in Mohakhali DOHS, and ask the gate staff to expect the ambulance.',
      },
    ],
  },

  services: {
    eyebrow: 'Which ambulance',
    h2Lead: 'Which ambulance',
    h2Accent: 'for your Mohakhali trip',
    intro: 'Tell us what the doctor advised. We match the vehicle.',
    items: [
      {
        title: 'From a Mohakhali hospital to an ICU bed',
        photo: 'icu',
        text: 'When the doctor advises ICU support on the way, for example a transfer from a Mohakhali institute to another hospital.',
        links: [{ anchor: 'ICU ambulance service in Dhaka', href: '/icu-ambulance-service-dhaka/' }],
      },
      {
        title: 'A newborn moving to another NICU',
        photo: 'nicu',
        text: 'Calm and step by step. Ask the NICU doctor to confirm the receiving bed first, then call us with both hospital names.',
        links: [{ anchor: 'NICU ambulance service', href: '/nicu-ambulance-service-dhaka/' }],
      },
      {
        title: 'Discharge, check-ups and trips home',
        photo: 'ac',
        text: 'A cooled, comfortable ride home after a stay at a Mohakhali hospital, or to a check-up anywhere in Dhaka.',
        links: [{ anchor: 'AC ambulance service', href: '/ac-ambulance-service/' }],
      },
      {
        title: 'Taking a loved one home',
        photo: 'freezer',
        text: 'We take your loved one home from a Mohakhali hospital or home, within Dhaka or to any district. You can call at any hour.',
        links: [{ anchor: 'Freezer van service', href: '/freezer-ambulance-service/' }],
      },
      {
        title: 'From Mohakhali to another district',
        photo: 'inter-district',
        text: 'Many families arrive at the Mohakhali hospitals from other districts and go home the same way. Tell us the destination on the first call.',
        links: [{ anchor: 'Dhaka to any district', href: '/inter-district-ambulance-service/' }],
      },
      {
        title: 'To the airport for a medical flight',
        photo: 'air',
        text: 'Air ambulance is arranged through an aviation operator. Our ground ambulance takes the patient between Mohakhali and the airport.',
        links: [{ anchor: 'Air ambulance service', href: '/air-ambulance-service-bangladesh/' }],
      },
    ],
  },

  address: {
    eyebrow: 'Your address',
    h2: 'How to give your Mohakhali address',
    intro: 'Do this on the call. It saves the most time.',
    steps: [
      { title: 'Say the road or the hospital', text: 'Give the road and building name, or the hospital, building, ward and floor.' },
      { title: 'Flyover or service road', text: 'Say whether you are on the main road, a service road under the flyover, or a side lane.' },
      { title: 'Add one landmark', text: 'Name something the driver can see: the bus terminal, Amtoli, Wireless Gate or a hospital gate.' },
      { title: 'Send a location pin', text: 'Share your location on WhatsApp. A pin is better than a spoken address.' },
      { title: 'Someone at the gate', text: 'Ask a person to wait at the hospital gate or the building gate and guide the driver in.' },
    ],
    close: 'If you are a visitor and do not know the address, say what you can see. The dispatcher asks questions until we have you.',
  },

  hospitals: {
    eyebrow: 'Where we take patients',
    h2: 'Hospitals we take patients to from Mohakhali',
    intro: 'We take patients to any hospital the doctor names. These hospitals are destinations only. This is not a ranking and not a recommendation. Ask the treating doctor which one is right, and ask the hospital to confirm it can receive the patient.',
    inAreaH3: 'In Mohakhali',
    inArea: [
      { name: 'National Institute of Diseases of the Chest and Hospital (NIDCH)', role: 'destination' },
      { name: 'National Institute of Cancer Research and Hospital (NICRH)', role: 'destination' },
      { name: 'icddr,b Dhaka Hospital', role: 'destination' },
    ],
    cityH3: 'Elsewhere in Dhaka',
    city: [
      { name: 'United Hospital', area: 'Gulshan' },
      { name: 'Evercare Hospital', area: 'Bashundhara' },
      { name: 'Square Hospital', area: 'West Panthapath', href: '/square-hospital-dhaka/' },
      { name: 'National Institute of Cardiovascular Diseases', area: 'Sher-e-Bangla Nagar' },
      { name: 'Dhaka Medical College Hospital', area: 'Dhaka Medical College area' },
    ],
    close: 'More hospitals, by area, are in our guide to private hospitals in Dhaka.',
  },

  fare: {
    eyebrow: 'Fare first',
    h2: 'Ambulance fare in Mohakhali',
    answer: `${copy.fareLine.en} Our base is in Mohakhali, so the trip to reach you is short. What moves the fare most is the distance to the hospital, the vehicle and any waiting.`,
    factorsH3: 'What the fare depends on',
    factors: [
      'The type of ambulance the patient needs',
      'The distance from your door to the hospital',
      'Waiting time at the hospital',
      'Whether you need the return trip',
    ],
    close: 'Ask for the full fare on the first call. If anything changes on the way, we tell you before we continue.',
  },

  landmarks: {
    eyebrow: 'Around Mohakhali',
    h2: 'Landmarks in Mohakhali and around our base',
    intro: 'Families often describe a location by a landmark. These are the places in and around Mohakhali that people name most. For each one: why it matters for an ambulance call, the approximate road distance from our base, and a route in Google Maps.',
    disclaimer: 'Distances are approximate road distances. Traffic changes the drive a lot, so we do not publish a fixed time for each place. Ask the dispatcher for the live arrival time when you call.',
    distanceLabel: 'From our base',
    trafficLabel: 'Traffic',
    routeLabel: 'Route from Ambulance BD 24',
    mapH3: 'Map: our base in Mohakhali',
    mapShow: 'Show route map',
    mapCaption: 'The route starts at our dispatch base in Mohakhali. The map loads only when you ask for it.',
    mapDestination: 'Mohakhali, Dhaka',
    items: [
      {
        name: 'Mohakhali flyover',
        type: 'Flyover and junction',
        why: 'The main crossing in Mohakhali. Tell us if you are on the flyover side, the service road below, or a side lane, so the driver comes down at the right point.',
        km: 1,
        traffic: 'Heavy at office hours.',
        mapQuery: 'Mohakhali Flyover, Dhaka',
      },
      {
        name: 'Mohakhali bus terminal',
        type: 'Bus terminal',
        why: 'Long-distance buses to the north leave from here, and the roads around it are crowded. Patients arriving in Mohakhali by bus often need an ambulance to a hospital nearby.',
        km: 1,
        traffic: 'Crowded in the evening and before holidays.',
        mapQuery: 'Mohakhali Bus Terminal, Dhaka',
      },
      {
        name: 'The Mohakhali hospital cluster',
        type: 'Hospitals and institutes',
        why: 'The chest and cancer institutes and icddr,b sit close together in Mohakhali. Each has its own gates, so give the hospital name and the gate or building.',
        km: 1,
        traffic: 'Busy at visiting hours.',
        mapQuery: 'National Institute of Diseases of the Chest and Hospital, Mohakhali, Dhaka',
        sameAs: 'https://en.wikipedia.org/wiki/International_Centre_for_Diarrhoeal_Disease_Research,_Bangladesh',
      },
      {
        name: 'Amtoli',
        type: 'Junction',
        why: 'The junction where Mohakhali meets the road to Banani and Gulshan. Many families give Amtoli as their landmark. Say which corner and one shop or building.',
        km: 1,
        traffic: 'Slow at office hours.',
        mapQuery: 'Amtoli, Mohakhali, Dhaka',
      },
      {
        name: 'Wireless Gate',
        type: 'Junction',
        why: 'South of the flyover, near the rail line and the road to Tejgaon. If you are here, tell us which side of the railway you are on.',
        km: 2,
        traffic: 'Held by trains at the crossing.',
        mapQuery: 'Wireless Gate, Mohakhali, Dhaka',
      },
      {
        name: 'Mohakhali DOHS',
        type: 'Gated residential area',
        why: 'A gated residential area in Mohakhali with checks at the entrances. Give the road and house number, and ask the gate staff to expect the ambulance.',
        km: 2,
        traffic: 'Gate checks at the entrances.',
        mapQuery: 'Mohakhali DOHS, Dhaka',
      },
      {
        name: 'Tejgaon Industrial Area',
        type: 'Offices and factories',
        why: 'Next to Mohakhali, with offices and factories. Workplace emergencies here are close to our base. Give the building name and the gate number.',
        km: 2,
        traffic: 'Busy with trucks during the day.',
        mapQuery: 'Tejgaon Industrial Area, Dhaka',
      },
      {
        name: 'Banani',
        type: 'Neighbouring area',
        why: 'North of Mohakhali, across Kemal Ataturk Avenue and the Banani roads. Families in Banani are close to our base. Give the road and house number.',
        km: 2,
        traffic: 'Slow in the evening.',
        mapQuery: 'Banani, Dhaka',
      },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Ambulance in Mohakhali:',
    h2Accent: 'your questions',
    items: [
      {
        q: 'Where is your ambulance base in Mohakhali?',
        a: `Our dispatch base is in Mohakhali, Dhaka 1212. You never need to come to the base: call ${phone} and the ambulance comes to you.`,
      },
      {
        q: 'How fast can an ambulance reach me in Mohakhali?',
        a: `${copy.timingLine.en} Our base is in Mohakhali, but the flyover and the bus terminal can slow the last stretch. The dispatcher gives you the live arrival time when you call.`,
      },
      {
        q: 'What number do I call for an ambulance in Mohakhali at night?',
        a: `Call ${phone}. A dispatcher answers 24 hours a day, 7 days a week. In a life-threatening emergency in Bangladesh you can also call 999.`,
      },
      {
        q: 'How much is an ambulance fare in Mohakhali?',
        a: `${copy.fareLine.en} Our base is in Mohakhali, so the trip to reach you is short. The fare depends on the vehicle, the distance to the hospital and any waiting.`,
      },
      {
        q: 'Can you collect a patient from a Mohakhali hospital?',
        a: 'Yes. Tell us the Mohakhali hospital, the building, the ward and the floor, and which gate to use. We confirm the vehicle and the fare before we leave.',
      },
      {
        q: 'Can you take a patient from Mohakhali back to their home district?',
        a: 'Yes. Many patients come to the Mohakhali hospitals from other districts. Tell us the district on the first call and we tell you the fare before we leave.',
      },
      {
        q: 'Do you go into Mohakhali DOHS?',
        a: 'Yes. Give the road and house number in Mohakhali DOHS, and ask the gate staff to expect the ambulance.',
      },
      {
        q: 'Can you take a loved one home from Mohakhali to another district?',
        a: 'Yes. Our freezer van takes your loved one home from a hospital or home in Mohakhali to any district. You can call at any hour, and we tell you the full fare before we leave.',
      },
      {
        q: 'I do not know the exact address in Mohakhali. What should I do?',
        a: wa
          ? 'Send a WhatsApp location pin and tell us what you can see: the flyover, the bus terminal, a hospital gate. The dispatcher asks questions until we find you.'
          : 'Tell the dispatcher what you can see: the flyover, the bus terminal, a hospital gate. The dispatcher asks questions until we find you.',
      },
    ],
  },

  napHeading: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: 'Our base is here in Mohakhali. You never need to come to it: the ambulance comes to you.' },
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'in Mohakhali?',
    text: 'Call and give us your road and building, or the hospital and ward. We confirm the vehicle and the fare first.',
    h3: 'Request a call back',
    pickupHint: 'Road and building, or hospital and ward',
  },
});
