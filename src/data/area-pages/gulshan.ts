/**
 * /ambulance-service-gulshan/: ambulance service in Gulshan, Dhaka. Restores the old WordPress URL
 * (indexed, lost in the rebuild) as a real area page.
 * Written around what goes wrong on a Gulshan call (secured roads and checkpoints, Gulshan 1 and 2
 * circle traffic, tall buildings with guards, foreign residents who need English, lakeside roads
 * that dead-end) and what we do about each. Hospitals are destinations, never partners. No prices,
 * no equipment or crew claims, no minute figures. Distances are approximate road distances from
 * the Mohakhali base; confirm with dispatch before changing them.
 */
import { business, copy, shown } from '../business';
import { areaPageSchema } from './schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));
const base = business.address.locality;

export const gulshanPage = areaPageSchema.parse({
  key: 'gulshan',
  area: 'Gulshan',
  aliases: ['Gulshan 1', 'Gulshan 2', 'Baridhara'],
  slug: '/ambulance-service-gulshan/',
  metaTitle: `Ambulance Service in Gulshan, Dhaka 24/7 | ${business.name}`,
  metaDescription: `Ambulance in Gulshan 1, Gulshan 2, Baridhara and Niketan, 24/7: ICU, NICU, AC and freezer van. Fare told before dispatch. Call ${phone}.`,
  updated: '2026-11-03',
  byline: `Written by the ${business.name} dispatch team`,
  breadcrumb: 'Gulshan',
  schema: {
    name: 'Ambulance service in Gulshan, Dhaka',
    serviceType: 'Ambulance service',
    place: { name: 'Gulshan', sameAs: 'https://en.wikipedia.org/wiki/Gulshan', geo: { lat: 23.7925, lng: 90.4078 } },
    mentions: [{ type: 'Place', name: 'Hatirjheel', sameAs: 'https://en.wikipedia.org/wiki/Hatirjheel' }],
  },

  hero: {
    eyebrow: 'Ambulance in Gulshan · 24/7',
    h1: 'Ambulance service in Gulshan, Dhaka',
    lede: `Gulshan is next door to our ${base} base. Tell us your road and house number, and whether you are near Gulshan 1 or Gulshan 2 circle. We confirm the vehicle and the fare before we dispatch.`,
    trust: [business.hours.short, 'Gulshan 1, Gulshan 2, Baridhara, Niketan', 'Fare told before dispatch'],
    card: {
      title: 'Tell us',
      items: [
        { text: 'Road and house number, and Gulshan 1 or Gulshan 2', notAClaim: false },
        { text: 'Who is unwell, and what the doctor advised', notAClaim: false },
        { text: 'The hospital, if a doctor has named one', notAClaim: false },
      ],
      footerWithCrew: 'We confirm the vehicle and the fare.',
      footer: 'We confirm the vehicle and the fare.',
    },
  },

  intro: {
    h2: 'If you are in Gulshan and need an ambulance now',
    paragraphs: [
      `Call ${phone}. A dispatcher answers day and night. Tell us the road and house number first, then say Gulshan 1 or Gulshan 2. Gulshan road numbers run across both halves, so the circle tells the driver which side to head for.`,
      `We dispatch from ${base}, which borders Gulshan to the west. ${copy.timingLine.en} The dispatcher gives you the live arrival time on the call, and the fare before the ambulance leaves.`,
      `Below: what slows a Gulshan trip and what we do about it, which ambulance fits, the hospitals people ask for, and the Gulshan landmarks with the road from our base.`,
    ],
  },

  problems: {
    eyebrow: 'What goes wrong',
    h2Lead: 'What slows an ambulance',
    h2Accent: 'in Gulshan',
    intro: 'Gulshan is close to our base, but it has its own problems. These are the ones that lose time on a call, and what we do about each.',
    items: [
      {
        pain: 'Two circles, one set of road numbers',
        happens: 'Gulshan is split into Gulshan 1 and Gulshan 2, each built around a busy circle. A road number alone can send a driver to the wrong half of Gulshan.',
        we: 'We ask for the road, the house and the nearest circle, and read them back to you. Send a WhatsApp location pin as well.',
      },
      {
        pain: 'Guarded roads and checkpoints',
        happens: 'Parts of Gulshan and Baridhara have embassies, guarded roads and checkpoints. Some lanes close at night, and a driver can be held at a barrier while the patient waits.',
        we: 'Tell us if your road has a checkpoint or a guard post. Ask the building guard to expect the ambulance, and tell us the open entry road.',
      },
      {
        pain: 'Tall buildings and service lifts',
        happens: 'Many Gulshan homes and offices are in tall buildings with reception desks, guards and separate service lifts. A stretcher may not fit the main lift.',
        we: 'Tell us the floor, the building name and whether a service lift exists. We plan how to carry the patient before we arrive.',
      },
      {
        pain: 'Circle traffic at office hours',
        happens: 'Gulshan 1 and Gulshan 2 circles, and the link road toward Badda, slow down a lot at office hours. A detour around Gulshan lake can be longer than it looks on a map.',
        we: 'The dispatcher picks the entry road from our base and gives you a live arrival time, not a promise.',
      },
      {
        pain: 'Families and visitors who need English',
        happens: 'Gulshan has many foreign residents, office staff and visitors. In an emergency they may not know the local landmark names or speak Bangla.',
        we: 'Our dispatchers take calls in English and Bangla. Give the building name and road, or send a location pin, and we take it from there.',
      },
    ],
  },

  services: {
    eyebrow: 'Which ambulance',
    h2Lead: 'Which ambulance',
    h2Accent: 'for your Gulshan trip',
    intro: 'Tell us what the doctor advised. We match the vehicle.',
    items: [
      {
        title: 'From Gulshan to an ICU bed',
        photo: 'icu',
        text: 'When the doctor advises ICU support on the way, for example a move from a Gulshan clinic to a bigger hospital.',
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
        text: 'A cooled, comfortable ride from a Gulshan hospital to your home, or from home to a check-up anywhere in Dhaka.',
        links: [{ anchor: 'AC ambulance service', href: '/ac-ambulance-service/' }],
      },
      {
        title: 'Taking a loved one home',
        photo: 'freezer',
        text: 'We take your loved one home from a Gulshan hospital or home, within Dhaka or to any district. You can call at any hour.',
        links: [{ anchor: 'Freezer van service', href: '/freezer-ambulance-service/' }],
      },
      {
        title: 'From Gulshan to another district',
        photo: 'inter-district',
        text: 'For a trip home to another district, tell us the destination on the first call and we plan the route out of the city.',
        links: [{ anchor: 'Dhaka to any district', href: '/inter-district-ambulance-service/' }],
      },
      {
        title: 'To the airport for a medical flight',
        photo: 'air',
        text: 'Air ambulance is arranged through an aviation operator. Our ground ambulance takes the patient between Gulshan and the airport.',
        links: [{ anchor: 'Air ambulance service', href: '/air-ambulance-service-bangladesh/' }],
      },
    ],
  },

  address: {
    eyebrow: 'Your address',
    h2: 'How to give your Gulshan address',
    intro: 'Do this on the call. It saves the most time.',
    steps: [
      { title: 'Say Gulshan 1 or Gulshan 2', text: 'Name the nearest circle first. It tells the driver which side of Gulshan to enter.' },
      { title: 'Then road and house', text: 'Give the road number and house number. For a tall building, give the building name and the floor.' },
      { title: 'Name the entry road', text: 'If your road has a checkpoint or closes at night, tell us which road is open.' },
      { title: 'Send a location pin', text: 'Share your location on WhatsApp. A pin is better than a spoken address.' },
      { title: 'Someone at the gate', text: 'Ask the guard or a family member to wait at the gate and to hold the lift.' },
    ],
    close: 'If you are a visitor and do not know the address, say what you can see. The dispatcher asks questions until we have you.',
  },

  hospitals: {
    eyebrow: 'Where we take patients',
    h2: 'Hospitals we take patients to from Gulshan',
    intro: 'We take patients to any hospital the doctor names. These hospitals are destinations only. This is not a ranking and not a recommendation. Ask the treating doctor which one is right, and ask the hospital to confirm it can receive the patient.',
    inAreaH3: 'In and near Gulshan',
    inArea: [
      { name: 'United Hospital, Gulshan 2', role: 'destination' },
      { name: 'Shahabuddin Medical College Hospital, Gulshan 2', role: 'destination' },
      { name: 'Evercare Hospital, Bashundhara', role: 'destination' },
    ],
    cityH3: 'Elsewhere in Dhaka',
    city: [
      { name: 'Square Hospital', area: 'West Panthapath', href: '/square-hospital-dhaka/' },
      { name: 'National Institute of Cardiovascular Diseases', area: 'Sher-e-Bangla Nagar' },
      { name: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)', area: 'Shahbag' },
      { name: 'Dhaka Medical College Hospital', area: 'Dhaka Medical College area' },
    ],
    close: 'More hospitals, by area, are in our guide to private hospitals in Dhaka.',
  },

  fare: {
    eyebrow: 'Fare first',
    h2: 'Ambulance fare in Gulshan',
    answer: `${copy.fareLine.en} Gulshan is close to our base, so the trip to reach you is short. What moves the fare most is the distance to the hospital, the vehicle and any waiting.`,
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
    eyebrow: 'Around Gulshan',
    h2: 'Landmarks in Gulshan and the road from our base',
    intro: 'Families often describe a location by a landmark. These are the places in and around Gulshan that people name most. For each one: why it matters for an ambulance call, the approximate road distance from our Mohakhali base, and a route in Google Maps.',
    disclaimer: 'Distances are approximate road distances. Traffic changes the drive a lot, so we do not publish a fixed time for each place. Ask the dispatcher for the live arrival time when you call.',
    distanceLabel: 'From our base',
    trafficLabel: 'Traffic',
    routeLabel: 'Route from Ambulance BD 24',
    mapH3: 'Map: from Ambulance BD 24 to Gulshan',
    mapShow: 'Show route map',
    mapCaption: `The route starts at our dispatch base in ${base}. The map loads only when you ask for it.`,
    mapDestination: 'Gulshan, Dhaka',
    items: [
      {
        name: 'Gulshan 1 circle',
        type: 'Main junction',
        why: 'The southern hub of Gulshan, with markets and offices around it. If you are on this side of Gulshan, name the circle and the road you turn into from it.',
        km: 3,
        traffic: 'Heavy at office hours.',
        mapQuery: 'Gulshan 1 Circle, Dhaka',
      },
      {
        name: 'Gulshan 2 circle',
        type: 'Main junction',
        why: 'The northern hub of Gulshan, close to many offices and hospitals. Say Gulshan 2 first, then the road number, so the driver enters from the right side.',
        km: 4,
        traffic: 'Slow in the evening.',
        mapQuery: 'Gulshan 2 Circle, Dhaka',
      },
      {
        name: 'Gulshan lake',
        type: 'Lake and lakeside roads',
        why: 'The lake runs along the edge of Gulshan, and some lakeside roads dead-end at the water. Tell us which side of the lake you are on and the nearest bridge or road.',
        km: 4,
        traffic: 'Lakeside roads are narrow.',
        mapQuery: 'Gulshan Lake, Dhaka',
      },
      {
        name: 'Baridhara',
        type: 'Diplomatic area',
        why: 'North of Gulshan, with embassies and guarded roads. Tell us the road number and whether a checkpoint is on the way, so the ambulance uses the open entry.',
        km: 6,
        traffic: 'Checkpoints can slow entry at night.',
        mapQuery: 'Baridhara, Dhaka',
      },
      {
        name: 'Niketan',
        type: 'Residential area',
        why: 'A residential area between Gulshan 1 and the Tejgaon link road. Many families give Niketan as their landmark. Say the block and the road number.',
        km: 3,
        traffic: 'Narrow internal roads.',
        mapQuery: 'Niketan, Gulshan, Dhaka',
      },
      {
        name: 'Gulshan-Badda link road',
        type: 'Main road',
        why: 'Connects Gulshan 1 to Badda and Pragati Sarani. If you are on the eastern side of Gulshan, tell us how far along the link road you are and one shop or building.',
        km: 5,
        traffic: 'Very busy at office hours.',
        mapQuery: 'Gulshan Badda Link Road, Dhaka',
      },
      {
        name: 'Hatirjheel',
        type: 'Lake and road network',
        why: 'The Hatirjheel roads link Gulshan with Tejgaon and the central hospitals. Patients moving from Gulshan toward Panthapath or Shahbag often pass this way.',
        km: 4,
        traffic: 'Moves well, but busy at office hours.',
        mapQuery: 'Hatirjheel, Dhaka',
        sameAs: 'https://en.wikipedia.org/wiki/Hatirjheel',
      },
      {
        name: 'Kemal Ataturk Avenue',
        type: 'Main road, Banani side',
        why: 'The main road between Banani and Gulshan 2. If you are on the western edge of Gulshan, near Banani, name this road and the nearest cross road.',
        km: 3,
        traffic: 'Slow in the evening.',
        mapQuery: 'Kemal Ataturk Avenue, Dhaka',
      },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    h2Lead: 'Ambulance in Gulshan:',
    h2Accent: 'your questions',
    items: [
      {
        q: 'How fast can an ambulance reach Gulshan?',
        a: `${copy.timingLine.en} Our dispatch base in ${base} borders Gulshan, so the drive is short, but the circles can be slow. The dispatcher gives you the live arrival time when you call ${phone}.`,
      },
      {
        q: 'Do you cover Gulshan 1, Gulshan 2 and Baridhara?',
        a: 'Yes. We cover Gulshan 1, Gulshan 2, Baridhara, Niketan and the roads around Gulshan lake. Give the road number, the house number and the nearest circle.',
      },
      {
        q: 'What number do I call for an ambulance in Gulshan at night?',
        a: `Call ${phone}. A dispatcher answers 24 hours a day, 7 days a week. In a life-threatening emergency in Bangladesh you can also call 999.`,
      },
      {
        q: 'How much is an ambulance fare in Gulshan?',
        a: `${copy.fareLine.en} The fare depends on the vehicle, the distance from Gulshan to the hospital and any waiting. Ask for the full fare on the first call.`,
      },
      {
        q: 'Can you take a patient from a Gulshan hospital to another hospital?',
        a: 'Yes. Tell us the Gulshan hospital, the ward and floor, and the destination. Ask the receiving hospital to confirm it can receive the patient. We confirm the vehicle and the fare before we leave.',
      },
      {
        q: 'Can I call in English from Gulshan?',
        a: 'Yes. Our dispatchers take calls in English and Bangla. If you do not know the Gulshan address, give the building name or send a location pin.',
      },
      {
        q: 'My building in Gulshan has guards and a service lift. What should I do?',
        a: 'Tell us the floor and whether a service lift exists. Ask the guard to expect the ambulance and hold the lift. We plan how to carry the patient before we arrive.',
      },
      {
        q: 'My road in Gulshan or Baridhara has a checkpoint. Will the ambulance get through?',
        a: 'Tell the dispatcher about the checkpoint on the call. Ask the building guard to inform the post, and tell us which entry road is open at that hour.',
      },
      {
        q: 'Can you take a loved one home from Gulshan to another district?',
        a: 'Yes. Our freezer van takes your loved one home from a hospital or home in Gulshan to any district. You can call at any hour, and we tell you the full fare before we leave.',
      },
      {
        q: 'I do not know my road number in Gulshan. What should I do?',
        a: wa
          ? 'Send a WhatsApp location pin and tell us what you can see: a circle, the lake, a building name. The dispatcher asks questions until we find you.'
          : 'Tell the dispatcher what you can see: a circle, the lake, a building name. The dispatcher asks questions until we find you.',
      },
    ],
  },

  napHeading: { eyebrow: 'Find us', h2Lead: 'Our dispatch', h2Accent: 'base', body: `We dispatch from ${base}, next to Gulshan. You never need to come to the base.` },
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'in Gulshan?',
    text: 'Call and give us your road, house number and nearest circle. We confirm the vehicle and the fare first.',
    h3: 'Request a call back',
    pickupHint: 'Road, house number and Gulshan 1 or 2',
  },
});
