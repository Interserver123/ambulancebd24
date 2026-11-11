/**
 * /ambulance-service-keraniganj/: ambulance service in Keraniganj, Dhaka.
 * Written around what actually goes wrong on a Keraniganj call (the Buriganga between the patient and
 * the big hospitals, bridge and highway traffic, dense lanes, long trips south-west over the Padma
 * Bridge) and what we do about each. Hospitals are destinations, never partners. No prices, no
 * equipment or crew claims, no minute figures other than the approved timing line. Distances are
 * approximate road distances from the Mohakhali base, taken from public maps: confirm them with
 * dispatch before changing them. Replaces the old 301 from /ambulance-service-keraniganj/.
 */
import { business, copy, shown } from '../business';
import { areaPageSchema } from './schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));
const base = business.address.locality;

export const keraniganjPage = areaPageSchema.parse({
  key: 'keraniganj',
  area: 'Keraniganj',
  aliases: ['South Keraniganj'],
  slug: '/ambulance-service-keraniganj/',
  metaTitle: `Ambulance Service in Keraniganj 24/7 | ${business.name}`,
  metaDescription: `Ambulance in Keraniganj, 24/7: ICU, NICU, AC and freezer van. Across the Buriganga to Dhaka hospitals. Fare told first. Call ${phone}.`,
  updated: '2026-11-11',
  byline: `Written by the ${business.name} dispatch team`,
  breadcrumb: 'Keraniganj',
  schema: {
    name: 'Ambulance service in Keraniganj, Dhaka',
    serviceType: 'Ambulance service',
    place: { name: 'Keraniganj', sameAs: 'https://en.wikipedia.org/wiki/Keraniganj_Upazila', geo: { lat: 23.695, lng: 90.35 } },
    mentions: [
      { type: 'Place', name: 'Buriganga River', sameAs: 'https://en.wikipedia.org/wiki/Buriganga_River' },
      { type: 'Place', name: 'Padma Bridge', sameAs: 'https://en.wikipedia.org/wiki/Padma_Bridge' },
    ],
  },

  hero: {
    eyebrow: 'Ambulance in Keraniganj · 24/7',
    h1: 'Ambulance service in Keraniganj, Dhaka',
    lede: 'Keraniganj is across the Buriganga from the hospitals most patients are sent to. Give us your area, lane and a landmark, and we confirm the vehicle and the fare before we dispatch.',
    trust: [business.hours.short, 'Keraniganj and South Keraniganj', 'Fare told before dispatch'],
    card: {
      title: 'Tell us',
      items: [
        { text: 'Your area in Keraniganj, the lane and one landmark', notAClaim: false },
        { text: 'Who is unwell, and what the doctor advised', notAClaim: false },
        { text: 'The hospital, if a doctor has named one', notAClaim: false },
      ],
      footerWithCrew: 'We confirm the vehicle and the fare.',
      footer: 'We confirm the vehicle and the fare.',
    },
  },

  intro: {
    h2: 'If you are in Keraniganj and need an ambulance now',
    paragraphs: [
      `Call ${phone}. A dispatcher answers day and night. Tell us your area in Keraniganj, the lane and a landmark first. Many Keraniganj lanes are narrow and look alike, so a landmark helps the driver more than a house number alone.`,
      `We dispatch from ${base} and cross the Buriganga to reach you, so the trip depends on bridge and highway traffic. We will not promise a time we cannot keep. The dispatcher gives you the live arrival time on the call, and the fare before the ambulance leaves.`,
      `Below: what slows a Keraniganj trip and what we do about it, which ambulance fits, the hospitals people ask for, and the landmarks around Keraniganj with the road from our base.`,
    ],
  },

  problems: {
    eyebrow: 'What goes wrong',
    h2Lead: 'Why an ambulance in Keraniganj',
    h2Accent: 'needs a plan',
    intro: 'Keraniganj lies on the south-west bank of the Buriganga. That shapes every call. These are the problems that slow a Keraniganj trip, and what we do about each.',
    items: [
      {
        pain: 'The river between you and the hospital',
        happens: 'Most of the large hospitals a doctor names are on the other side of the Buriganga, in Old Dhaka, Shahbag or further north. From Keraniganj the patient has to cross the river by bridge, and a late start on the crossing is hard to win back.',
        we: 'Tell us the destination hospital on the first call. We plan the crossing and confirm the vehicle and the fare before we leave.',
      },
      {
        pain: 'Bridge and highway traffic',
        happens: 'Trucks, buses and cars squeeze onto the same bridges and the Dhaka–Mawa road in and out of Keraniganj. Queues build at rush hour, and travel before and after holidays can be slower still.',
        we: 'The dispatcher gives you a live arrival time when you call, not a promise. For planned trips such as a discharge or a check-up, we help you pick a time that avoids the worst traffic.',
      },
      {
        pain: 'Narrow lanes that look alike',
        happens: 'Many Keraniganj neighbourhoods are dense, with narrow lanes, shops spilling onto the road and parked rickshaws. A driver sent to the wrong lane can lose a lot of time, and a large vehicle may not fit down the lane itself.',
        we: 'We ask for the area, the lane and a landmark, and read them back to you. Send a WhatsApp location pin as well, and ask someone to wait at the main road to guide the ambulance in.',
      },
      {
        pain: 'Work injuries and accidents',
        happens: 'Keraniganj has many workshops and workplaces and a busy highway. An injured person often needs to reach a trauma or burns unit in central Dhaka quickly, and the family may not know which hospital to name.',
        we: 'Call first and say plainly what happened. Ask the treating doctor or the hospital which unit can receive the patient, then tell us the hospital. We confirm the vehicle and the fare before we dispatch.',
      },
      {
        pain: 'Long trips south-west over the Padma Bridge',
        happens: 'Keraniganj is on the road out of Dhaka toward the Padma Bridge and the south-west districts. Families here often need to take a patient to, or bring one back from, a district hospital.',
        we: 'We run ambulances and freezer vans from Keraniganj to any district. Tell us the destination first and we give you the full fare before you agree.',
      },
    ],
  },

  services: {
    eyebrow: 'Which ambulance',
    h2Lead: 'Which ambulance',
    h2Accent: 'for your Keraniganj trip',
    intro: 'Tell us what the doctor advised. We match the vehicle.',
    items: [
      {
        title: 'From Keraniganj to an ICU bed in central Dhaka',
        photo: 'icu',
        text: 'When the doctor advises ICU support on the way, for example a move to a larger hospital across the river.',
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
        text: 'A cooled, comfortable ride from a hospital to your home in Keraniganj, or from home to a check-up in Dhaka.',
        links: [{ anchor: 'AC ambulance service', href: '/ac-ambulance-service/' }],
      },
      {
        title: 'Taking a loved one home',
        photo: 'freezer',
        text: 'We take your loved one home from a hospital or a house in Keraniganj, in Dhaka or to any district. You can call at any hour.',
        links: [{ anchor: 'Freezer van service', href: '/freezer-ambulance-service/' }],
      },
      {
        title: 'From Keraniganj to a district',
        photo: 'inter-district',
        text: 'Trips south-west start with the run out of Keraniganj toward the Padma Bridge. We cover every district, including Gopalganj and Khulna.',
        links: [
          { anchor: 'Dhaka to any district', href: '/inter-district-ambulance-service/' },
          { anchor: 'Gopalganj route', href: '/ambulance-service-gopalganj/' },
          { anchor: 'Khulna route', href: '/ambulance-service-khulna/' },
        ],
      },
    ],
  },

  address: {
    eyebrow: 'Your address',
    h2: 'How to give your Keraniganj address',
    intro: 'Do this on the call. It saves the most time.',
    steps: [
      { title: 'Area first', text: 'Say the area or neighbourhood of Keraniganj first, then the nearest main road.' },
      { title: 'Then the lane and the house', text: 'Give the lane and the house or building name. For a block of flats, give the building name and the floor.' },
      { title: 'Add one landmark', text: 'Name something the driver can see: a mosque, a school, a market, a bridge or a main road such as the Dhaka–Mawa road.' },
      { title: 'Send a location pin', text: 'Share your location on WhatsApp. A pin is better than a spoken address in a dense lane.' },
      { title: 'Someone at the main road', text: 'Ask a person to wait at the main road and guide the ambulance in, especially if the lane is narrow.' },
    ],
    close: 'If you do not know the name of your area, say what you can see. The dispatcher asks questions until we have you.',
  },

  hospitals: {
    eyebrow: 'Where we take patients',
    h2: 'Hospitals we take patients to from Keraniganj',
    intro: 'We take patients to any hospital the doctor names. These hospitals are destinations only. This is not a ranking and not a recommendation. Ask the treating doctor which one is right, and ask the hospital to confirm it can receive the patient.',
    inAreaH3: 'In Keraniganj',
    inArea: [
      { name: 'Keraniganj Upazila Health Complex', role: 'destination' },
      { name: 'South Keraniganj Upazila Health Complex', role: 'destination' },
    ],
    cityH3: 'Across the river in Dhaka, often for ICU, NICU and trauma care',
    city: [
      { name: 'Sir Salimullah Medical College Mitford Hospital', area: 'Old Dhaka' },
      { name: 'Dhaka Medical College Hospital', area: 'Dhaka Medical College area' },
      { name: 'National Institute of Traumatology and Orthopaedic Rehabilitation (NITOR)', area: 'Sher-e-Bangla Nagar' },
      { name: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)', area: 'Shahbag' },
      { name: 'Square Hospital', area: 'West Panthapath', href: '/square-hospital-dhaka/' },
    ],
    close: 'More hospitals, by area, are in our guide to private hospitals in Dhaka.',
  },

  fare: {
    eyebrow: 'Fare first',
    h2: 'Ambulance fare in Keraniganj',
    answer: `${copy.fareLine.en} For Keraniganj, three things move the fare most: how far the ambulance travels to reach you, the distance to the hospital, and any waiting.`,
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
    eyebrow: 'Around Keraniganj',
    h2: 'Landmarks around Keraniganj and the road from our base',
    intro: 'Families often describe a location by a landmark. These are the places in and around Keraniganj that people name most. For each one: why it matters for an ambulance call, the approximate road distance from our Mohakhali base, and a route in Google Maps.',
    disclaimer: 'Distances are approximate road distances. Traffic changes the drive a lot, so we do not publish a fixed time for each place. Ask the dispatcher for the live arrival time when you call.',
    distanceLabel: 'From our base',
    trafficLabel: 'Traffic',
    routeLabel: 'Route from Ambulance BD 24',
    mapH3: 'Map: from Ambulance BD 24 to Keraniganj',
    mapShow: 'Show route map',
    mapCaption: `The route starts at our dispatch base in ${base}. The map loads only when you ask for it.`,
    mapDestination: 'Keraniganj, Dhaka',
    items: [
      {
        name: 'The Buriganga bridges',
        type: 'River crossing',
        why: 'The bridges over the Buriganga are the way between Keraniganj and Old Dhaka. A patient from Keraniganj bound for a central Dhaka hospital crosses here. Tell us which side of the bridge you are on when you call, so the driver does not cross twice.',
        km: 15,
        traffic: 'Queues at rush hour and before holidays.',
        mapQuery: 'Buriganga Bridge, Keraniganj, Dhaka',
        sameAs: 'https://en.wikipedia.org/wiki/Buriganga_River',
      },
      {
        name: 'Zinzira',
        type: 'Neighbourhood by the river',
        why: 'A well-known area on the Keraniganj bank of the Buriganga that many people use to say where they are. If you are close, tell us the lane, and one shop or building we can see from the road.',
        km: 18,
        traffic: 'Crowded near the riverbank and the market.',
        mapQuery: 'Zinzira, Keraniganj, Dhaka',
      },
      {
        name: 'Dhaka–Mawa road',
        type: 'Highway toward the Padma Bridge',
        why: 'The main road out of Keraniganj toward Mawa, the Padma Bridge and the south-west districts. We use it when a patient travels from Keraniganj to a district hospital, or comes back to Dhaka from the south-west.',
        km: 20,
        traffic: 'Heavy with trucks and buses at rush hour and around holidays.',
        mapQuery: 'Dhaka-Mawa Highway, Keraniganj',
      },
      {
        name: 'Sadarghat launch terminal',
        type: 'River port on the Dhaka side',
        why: 'Sadarghat is the river port on the Old Dhaka bank. Patients and families arriving by launch from the southern districts call us from here, and many then cross to Keraniganj or go to a hospital in Old Dhaka. Tell us the terminal gate you are at.',
        km: 14,
        traffic: 'Very crowded around the terminal gates.',
        mapQuery: 'Sadarghat Launch Terminal, Dhaka',
      },
      {
        name: 'Hazaribagh',
        type: 'Dhaka side of the river',
        why: 'On the Dhaka bank of the Buriganga, on a common route between Keraniganj and the central hospitals. Families name it as a landmark when the ambulance is already on the Dhaka side of the bridge.',
        km: 12,
        traffic: 'Slow on the narrow roads near the river.',
        mapQuery: 'Hazaribagh, Dhaka',
      },
      {
        name: 'Mitford Hospital area',
        type: 'Hospital area in Old Dhaka',
        why: 'The Sir Salimullah Medical College Mitford Hospital is the nearest large hospital on the Dhaka side of the river, and families from Keraniganj often name it. It is a destination only: we are not part of the hospital, and the hospital must agree to receive the patient.',
        km: 14,
        traffic: 'Crowded lanes around the hospital in the day.',
        mapQuery: 'Sir Salimullah Medical College Mitford Hospital, Dhaka',
      },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Ambulance in Keraniganj:',
    h2Accent: 'your questions',
    items: [
      {
        q: 'How fast can an ambulance reach Keraniganj?',
        a: `${copy.timingLine.en} Our dispatch base is in ${base}, and Keraniganj is across the Buriganga, so the drive depends on bridge and highway traffic. The dispatcher gives you the live arrival time when you call ${phone}.`,
      },
      {
        q: 'Do you cover South Keraniganj as well as Keraniganj?',
        a: 'Yes. We go to Keraniganj and South Keraniganj. Give the area, the lane and a landmark so the driver goes to the right place.',
      },
      {
        q: 'What number do I call for an ambulance in Keraniganj at night?',
        a: `Call ${phone}. A dispatcher answers 24 hours a day, 7 days a week. In a life-threatening emergency in Bangladesh you can also call 999.`,
      },
      {
        q: 'How much is an ambulance fare in Keraniganj?',
        a: `${copy.fareLine.en} The fare depends on the vehicle, how far the ambulance travels to you, the distance to the hospital and any waiting. Ask for the full fare on the first call.`,
      },
      {
        q: 'Can you take a patient from Keraniganj to a hospital in central Dhaka?',
        a: 'Yes. Tell us where the patient is, the ward and floor if they are in a hospital, and the destination. Ask the receiving hospital to confirm it can receive the patient. We confirm the vehicle and the fare before we leave.',
      },
      {
        q: 'Is an ICU ambulance available in Keraniganj?',
        a: 'Ask the treating doctor whether the patient needs ICU support on the way, then tell the dispatcher in the doctor’s words. We match the vehicle and tell you what it carries before you agree. See our ICU ambulance service.',
      },
      {
        q: 'Can you take a patient from Keraniganj to a hospital in another district?',
        a: 'Yes. We run ambulances from Keraniganj to any district, including the south-west over the Padma Bridge, and back. Tell us the destination and we tell you the full fare before you agree.',
      },
      {
        q: 'My lane is too narrow for a vehicle. What should I do?',
        a: 'Tell the dispatcher on the call. Ask someone to wait at the main road, and tell us the nearest landmark. We plan where the ambulance can stop and how to bring the patient to it.',
      },
      {
        q: 'Can you take a loved one home from Keraniganj to another district?',
        a: 'Yes. Our freezer van takes your loved one home from a hospital or a house in Keraniganj to any district. You can call at any hour, and we tell you the full fare before we leave.',
      },
      {
        q: 'I do not know the name of my area. What should I do?',
        a: wa
          ? 'Send a WhatsApp location pin and tell us what you can see: a mosque, a school, a market, a main road. The dispatcher asks questions until we find you.'
          : 'Tell the dispatcher what you can see: a mosque, a school, a market, a main road. The dispatcher asks questions until we find you.',
      },
    ],
  },

  napHeading: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: `We dispatch from ${base}. You never need to come to the base. Keraniganj is across the river.` },
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'in Keraniganj?',
    text: 'Call and give us your area, lane and a landmark. We confirm the vehicle and the fare first.',
    h3: 'Request a call back',
    pickupHint: 'Area, lane, house or building and a landmark',
  },
});
