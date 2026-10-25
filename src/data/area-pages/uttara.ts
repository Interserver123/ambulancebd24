/**
 * /ambulance-service-uttara/: ambulance service in Uttara, Dhaka.
 * Written around what actually goes wrong on an Uttara call (distance from central hospitals, sector
 * and road numbering, Airport Road traffic, flats and gates, the airport next door) and what we do
 * about each. Hospitals are destinations, never partners. No prices, no equipment or crew claims,
 * no minute figures other than the approved timing line. Distances are approximate road distances
 * from the Mohakhali base; confirm with dispatch before changing them.
 */
import { business, copy, shown } from '../business';
import { areaPageSchema } from './schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));
const base = business.address.locality;

export const uttaraPage = areaPageSchema.parse({
  key: 'uttara',
  area: 'Uttara',
  aliases: ['Uttara Model Town'],
  slug: '/ambulance-service-uttara/',
  metaTitle: `Ambulance Service in Uttara, Dhaka 24/7 | ${business.name}`,
  metaDescription: `Ambulance in every sector of Uttara, 24/7: ICU, NICU, AC and freezer van. Send your sector, road and house number. Fare told first. Call ${phone}.`,
  updated: '2026-10-25',
  byline: `Written by the ${business.name} dispatch team`,
  breadcrumb: 'Uttara',
  schema: {
    name: 'Ambulance service in Uttara, Dhaka',
    serviceType: 'Ambulance service',
    place: { name: 'Uttara', sameAs: 'https://en.wikipedia.org/wiki/Uttara,_Dhaka', geo: { lat: 23.8759, lng: 90.3795 } },
    mentions: [
      { type: 'Airport', name: 'Hazrat Shahjalal International Airport', sameAs: 'https://en.wikipedia.org/wiki/Shahjalal_International_Airport' },
      { type: 'Place', name: 'Dhaka Metro Rail', sameAs: 'https://en.wikipedia.org/wiki/Dhaka_Metro_Rail' },
    ],
  },

  hero: {
    eyebrow: 'Ambulance in Uttara · 24/7',
    h1: 'Ambulance service in Uttara, Dhaka',
    lede: 'Uttara is at the far north of Dhaka. The hospital your doctor names is often far south. Give us your sector, road and house number, and we confirm the vehicle and the fare before we dispatch.',
    trust: [business.hours.short, 'Every sector of Uttara', 'Fare told before dispatch'],
    card: {
      title: 'Tell us',
      items: [
        { text: 'Your sector, road and house number, and one landmark', notAClaim: false },
        { text: 'Who is unwell, and what the doctor advised', notAClaim: false },
        { text: 'The hospital, if a doctor has named one', notAClaim: false },
      ],
      footerWithCrew: 'We confirm the vehicle and the fare.',
      footer: 'We confirm the vehicle and the fare.',
    },
  },

  intro: {
    h2: 'If you are in Uttara and need an ambulance now',
    paragraphs: [
      `Call ${phone}. A dispatcher answers day and night. Tell us your sector, road and house number first. In Uttara those three matter more than the area name, because road and house numbers repeat from one sector to the next.`,
      `We dispatch from ${base} and drive north along Airport Road, so the trip is longer than inside central Dhaka. We will not promise a time we cannot keep. The dispatcher gives you the live arrival time on the call, and the fare before the ambulance leaves.`,
      `Below: what slows an Uttara trip and what we do about it, which ambulance fits, the hospitals people ask for, and the landmarks around Uttara with the road from our base.`,
    ],
  },

  problems: {
    eyebrow: 'What goes wrong',
    h2Lead: 'Why an ambulance in Uttara',
    h2Accent: 'needs a plan',
    intro: 'Uttara is a planned town of numbered sectors at the north end of the city. That shapes every call. These are the five problems that slow an Uttara trip, and what we do about each.',
    items: [
      {
        pain: 'The hospital is far from home',
        happens: 'Uttara sits at the north end of Dhaka. The ICU or NICU bed a doctor finds is often in central Dhaka: Panthapath, Shahbag, Gulshan or Bashundhara. That is a long drive, and a late start is hard to win back.',
        we: 'Tell us the destination on the first call. We plan the route and confirm the vehicle and the fare before we leave.',
      },
      {
        pain: 'Every sector has a Road 5',
        happens: 'Uttara Model Town is numbered into sectors, and road and house numbers repeat from one sector to the next. A driver sent to the wrong sector loses time you do not have.',
        we: 'We ask for sector, road, house number and a landmark, and read them back to you. Send a WhatsApp location pin as well.',
      },
      {
        pain: 'Airport Road at the wrong hour',
        happens: 'Most trips from Uttara to central Dhaka use Airport Road, past the airport, through Kuril or Banani. At office and school hours the road slows a lot. At night it clears, but houses are harder to find.',
        we: 'The dispatcher gives you a live arrival time when you call, not a promise. For planned trips like a discharge or a check-up, we help you pick a time that avoids the worst traffic.',
      },
      {
        pain: 'Upper floors, lifts and gates',
        happens: 'Many Uttara homes are flats in tall buildings with gates and guards. A stretcher has to fit the lift or the stairs, and a gate that stays closed wastes time.',
        we: 'Tell us the floor and whether there is a lift. Ask someone to wait at the gate and at the main road. We plan how to carry the patient before we arrive.',
      },
      {
        pain: 'Back from abroad, straight from the airport',
        happens: 'Uttara borders Hazrat Shahjalal International Airport. Patients returning from treatment abroad, or elderly travellers who cannot manage the terminal, often need a stretcher and a quiet ride home or to a hospital.',
        we: 'We take patients from the airport to Uttara or to any hospital in Dhaka by ground ambulance. For a flight between cities, we arrange an air ambulance through an aviation operator.',
      },
    ],
  },

  services: {
    eyebrow: 'Which ambulance',
    h2Lead: 'Which ambulance',
    h2Accent: 'for your Uttara trip',
    intro: 'Tell us what the doctor advised. We match the vehicle.',
    items: [
      {
        title: 'From an Uttara hospital to an ICU bed elsewhere',
        photo: 'icu',
        text: 'When the doctor advises ICU support on the way, for example a move to a bigger hospital in central Dhaka.',
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
        text: 'A cooled, comfortable ride from an Uttara hospital to your flat, or from home to a check-up in central Dhaka.',
        links: [{ anchor: 'AC ambulance service', href: '/ac-ambulance-service/' }],
      },
      {
        title: 'Taking a loved one home',
        photo: 'freezer',
        text: 'We take your loved one home from an Uttara hospital or flat, in Dhaka or to any district. You can call at any hour.',
        links: [{ anchor: 'Freezer van service', href: '/freezer-ambulance-service/' }],
      },
      {
        title: 'From Uttara to another district',
        photo: 'inter-district',
        text: 'Uttara is on the north side, so trips toward Gazipur and Mymensingh start with a short run to the highway at Abdullahpur.',
        links: [
          { anchor: 'Dhaka to any district', href: '/inter-district-ambulance-service/' },
          { anchor: 'Mymensingh route', href: '/ambulance-service-mymensingh/' },
        ],
      },
      {
        title: 'From the airport next door',
        photo: 'air',
        text: 'Air ambulance is arranged through an aviation operator. Our ground ambulance takes the patient to and from Hazrat Shahjalal International Airport.',
        links: [{ anchor: 'Air ambulance service', href: '/air-ambulance-service-bangladesh/' }],
      },
    ],
  },

  address: {
    eyebrow: 'Your address',
    h2: 'How to give your Uttara address',
    intro: 'Do this on the call. It saves the most time.',
    steps: [
      { title: 'Sector first', text: 'Say the sector number first. Road and house numbers repeat across sectors.' },
      { title: 'Then road and house', text: 'Give the road number and the house or plot number. For a block of flats, give the building name and the floor.' },
      { title: 'Add one landmark', text: 'Name something the driver can see: a metro station, a school, a mosque, a corner shop, or a main road such as Jashimuddin Road or the Rajlakshmi junction.' },
      { title: 'Send a location pin', text: 'Share your location on WhatsApp. A pin is better than a spoken address.' },
      { title: 'Someone at the gate', text: 'Ask a person to wait at the main road, and to open the gate and call the lift.' },
    ],
    close: 'If you do not know the sector, say what you can see. The dispatcher asks questions until we have you.',
  },

  hospitals: {
    eyebrow: 'Where we take patients',
    h2: 'Hospitals we take patients to from Uttara',
    intro: 'We take patients to any hospital the doctor names. These hospitals are destinations only. This is not a ranking and not a recommendation. Ask the treating doctor which one is right, and ask the hospital to confirm it can receive the patient.',
    inAreaH3: 'In Uttara',
    inArea: [
      { name: 'Uttara Adhunik Medical College and Hospital', role: 'destination' },
      { name: 'Kuwait Bangladesh Friendship Government Hospital', role: 'destination' },
      { name: 'Medical College for Women and Hospital', role: 'destination' },
    ],
    cityH3: 'Elsewhere in Dhaka, often for ICU and NICU beds',
    city: [
      { name: 'Evercare Hospital', area: 'Bashundhara' },
      { name: 'United Hospital', area: 'Gulshan' },
      { name: 'Square Hospital', area: 'West Panthapath', href: '/square-hospital-dhaka/' },
      { name: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)', area: 'Shahbag' },
      { name: 'Dhaka Medical College Hospital', area: 'Dhaka Medical College area' },
      { name: 'National Institute of Cardiovascular Diseases', area: 'Sher-e-Bangla Nagar' },
    ],
    close: 'More hospitals, by area, are in our guide to private hospitals in Dhaka.',
  },

  fare: {
    eyebrow: 'Fare first',
    h2: 'Ambulance fare in Uttara',
    answer: `${copy.fareLine.en} For Uttara, three things move the fare most: how far the ambulance travels to reach you, the distance to the hospital, and any waiting.`,
    factorsH3: 'What the fare depends on',
    factors: [
      'The distance from our Mohakhali base to your door',
      'The distance from your door to the hospital',
      'The type of ambulance the patient needs',
      'Waiting time at the hospital or the airport',
      'Whether you need the return trip',
    ],
    close: 'Ask for the full fare on the first call. If anything changes on the way, we tell you before we continue.',
  },

  landmarks: {
    eyebrow: 'Around Uttara',
    h2: 'Landmarks in Uttara and the road from our base',
    intro: 'Families often describe a location by a landmark. These are the places in and around Uttara that people name most. For each one: why it matters for an ambulance call, the approximate road distance from our Mohakhali base, and a route in Google Maps.',
    disclaimer: 'Distances are approximate road distances. Traffic changes the drive a lot, so we do not publish a fixed time for each place. Ask the dispatcher for the live arrival time when you call.',
    distanceLabel: 'From our base',
    trafficLabel: 'Traffic',
    routeLabel: 'Route from Ambulance BD 24',
    mapH3: 'Map: from Ambulance BD 24 to Uttara',
    mapShow: 'Show route map',
    mapCaption: `The route starts at our dispatch base in ${base}. The map loads only when you ask for it.`,
    mapDestination: 'Uttara, Dhaka',
    items: [
      {
        name: 'Hazrat Shahjalal International Airport',
        type: 'Airport',
        why: 'Uttara borders the airport. Arrivals who need a stretcher, patients returning from treatment abroad, and families seeing off a patient on an air ambulance flight call us from here. Ground transfers to and from the airport are part of our air ambulance service.',
        km: 7,
        traffic: 'Airport Road is busy at office hours.',
        mapQuery: 'Hazrat Shahjalal International Airport, Dhaka',
        sameAs: 'https://en.wikipedia.org/wiki/Shahjalal_International_Airport',
      },
      {
        name: 'Kuril and Khilkhet',
        type: 'Gateway junctions',
        why: 'The gateway between Uttara and the rest of the city. Many hospital trips from Uttara pass Kuril, on the flyover and Kuril Bishwa Road, or Khilkhet. Give it as a landmark if you live on the southern side of Uttara.',
        km: 6,
        traffic: 'Heavy at rush hour in both directions.',
        mapQuery: 'Kuril Flyover, Dhaka',
      },
      {
        name: 'Uttara metro stations',
        type: 'Metro Rail Line 6',
        why: 'Uttara North, Uttara Center and Uttara South are easy landmarks to give the driver. Tell us which station and which side of the road you are on. Buildings next to a station often have busy forecourts, so ask someone to meet us at the main road.',
        km: 11,
        traffic: 'Station roads fill up at rush hour.',
        mapQuery: 'Uttara Center Metro Station, Dhaka',
        sameAs: 'https://en.wikipedia.org/wiki/Dhaka_Metro_Rail',
      },
      {
        name: 'Rajlakshmi',
        type: 'Junction and shopping area',
        why: 'A well-known junction in Uttara that many people use to say where they are. If you are close, tell us which corner of the junction and one shop or building we can see.',
        km: 11,
        traffic: 'Crowded around the junction in the evening.',
        mapQuery: 'Rajlakshmi, Uttara, Dhaka',
      },
      {
        name: 'Jashimuddin Road',
        type: 'Main road',
        why: 'A main road in Uttara that families name when giving directions. Say whether you are on the road itself or a side lane, and the nearest cross road.',
        km: 10,
        traffic: 'Slow at school and office hours.',
        mapQuery: 'Jashimuddin Road, Uttara, Dhaka',
      },
      {
        name: 'Azampur',
        type: 'Transport area',
        why: 'A busy transport area on the Uttara side where long-distance buses stop. Crowds and parked vehicles can block the narrow roads, so tell us the exact lane and a shop name.',
        km: 12,
        traffic: 'Congested around the bus stop.',
        mapQuery: 'Azampur, Uttara, Dhaka',
      },
      {
        name: 'Abdullahpur',
        type: 'Northern gateway',
        why: 'Where Uttara meets the Dhaka-Mymensingh Highway, the start of the road to Gazipur and Mymensingh. We use it when a patient travels from Uttara out of Dhaka, or comes in from a northern district to a Dhaka hospital.',
        km: 14,
        traffic: 'Heavy at rush hour, with buses and trucks.',
        mapQuery: 'Abdullahpur, Dhaka',
      },
      {
        name: 'Diabari',
        type: 'Lake and neighbourhood',
        why: 'A northern area of Uttara around the Diabari lake, a long way from the central hospitals. If you live here, call early and tell us the destination at once so we plan the whole route.',
        km: 16,
        traffic: 'Quieter, but the long run south is slow at rush hour.',
        mapQuery: 'Diabari, Uttara, Dhaka',
      },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Ambulance in Uttara:',
    h2Accent: 'your questions',
    items: [
      {
        q: 'How fast can an ambulance reach Uttara?',
        a: `${copy.timingLine.en} Our dispatch base is in ${base}, and Uttara is farther north along Airport Road, so the drive is longer and depends on traffic. The dispatcher gives you the live arrival time when you call ${phone}.`,
      },
      {
        q: 'Do you cover every sector of Uttara?',
        a: 'Yes. We go to every sector of Uttara, from the southern side near the airport to Diabari and Abdullahpur in the north. Give the sector, road and house number so the driver goes to the right place.',
      },
      {
        q: 'What number do I call for an ambulance in Uttara at night?',
        a: `Call ${phone}. A dispatcher answers 24 hours a day, 7 days a week. In a life-threatening emergency in Bangladesh you can also call 999.`,
      },
      {
        q: 'How much is an ambulance fare in Uttara?',
        a: `${copy.fareLine.en} The fare depends on the vehicle, how far the ambulance travels to you, the distance to the hospital and any waiting. Ask for the full fare on the first call.`,
      },
      {
        q: 'Can you take a patient from an Uttara hospital to a hospital in central Dhaka?',
        a: 'Yes. Tell us the Uttara hospital, the ward and floor, and the destination. Ask the receiving hospital to confirm it can receive the patient. We confirm the vehicle and the fare before we leave.',
      },
      {
        q: 'Is an ICU ambulance available in Uttara?',
        a: 'Ask the treating doctor whether the patient needs ICU support on the way, then tell the dispatcher in the doctor’s words. We match the vehicle and tell you what it carries before you agree. See our ICU ambulance service.',
      },
      {
        q: 'Can you collect a patient from the airport and take them to Uttara?',
        a: 'Yes, by ground ambulance, from Hazrat Shahjalal International Airport to a home or hospital in Uttara or elsewhere in Dhaka. Tell us the flight arrival time and whether the patient needs a stretcher.',
      },
      {
        q: 'My flat is on an upper floor. Can you still help?',
        a: 'Yes. Tell us the floor, whether there is a lift and whether the gate is locked. Ask someone to wait at the gate and at the main road. We plan how to carry the patient before we arrive.',
      },
      {
        q: 'Can you take a loved one home from an Uttara hospital to another district?',
        a: 'Yes. Our freezer van takes your loved one home from a hospital or a flat in Uttara to any district. You can call at any hour, and we tell you the full fare before we leave.',
      },
      {
        q: 'I do not know my sector number. What should I do?',
        a: wa
          ? 'Send a WhatsApp location pin and tell us what you can see: a metro station, a school, a main road. The dispatcher asks questions until we find you.'
          : 'Tell the dispatcher what you can see: a metro station, a school, a main road. The dispatcher asks questions until we find you.',
      },
    ],
  },

  napHeading: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: `We dispatch from ${base}. You never need to come to the base. Uttara is on the road north.` },
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'in Uttara?',
    text: 'Call and give us your sector, road and house number. We confirm the vehicle and the fare first.',
    h3: 'Request a call back',
    pickupHint: 'Sector, road, house number and a landmark',
  },
});
