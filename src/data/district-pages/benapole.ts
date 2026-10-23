/** Benapole location page: /ambulance-service-benapole/ (existing URL, keep exactly). Benapole is a land-port town in Sharsha upazila, Jashore. */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const benapolePage = buildDistrictPage({
  key: 'benapole',
  district: 'Benapole',
  slug: '/ambulance-service-benapole/',
  admin: 'Jashore District',
  facts: unconfirmedDistrict('Benapole', {
    landPort: true,
    destinations: [],
    upazilas: [{ name: 'Benapole town' }, { name: 'Sharsha' }, { name: 'Jhikargachha' }, { name: 'Jashore Sadar' }],
  }),
  mentions: [{ type: 'City', name: 'Benapole', sameAs: 'https://en.wikipedia.org/wiki/Benapole' }],
  lede: 'Crossing back from India at Benapole with a patient, or bringing a loved one home through the land port? We meet you on the Bangladesh side of the Benapole border and drive to Dhaka or any district, with the full fare agreed before we leave.',
  serviceFact: 'Patients arriving from India through the Benapole land port, taken to a hospital in Dhaka or home to any district.',
  routeFact: 'From Benapole to Jashore, then through Narail, the Kalna bridge, Bhanga and the Padma Bridge.',
  localFact: { term: 'Land port', value: 'Benapole is the main land crossing between Bangladesh and India for patients treated in Kolkata and beyond.' },
  emergencyMore: 'If the patient is unwell at the crossing, the nearest hospitals are in Jashore. Call us for the onward journey once the doctor says the patient can travel.',
  journeysIntro: 'Most Benapole calls come from families finishing treatment in India. The timing depends on the crossing, so we plan with you.',
  journeys: [
    {
      icon: 'route',
      title: 'Back from India to a Dhaka hospital',
      text: 'After treatment in India, some patients need a Dhaka hospital to continue care. We meet the patient on the Bangladesh side at Benapole and drive to the Dhaka hospital. Tell us the expected crossing time, the hospital, and the papers from the Indian hospital.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Benapole home to any district',
      text: 'If the patient is going home to recover, we drive from the land port to the family home in Khulna, Jashore, Dhaka or any other district. Share the destination address and a landmark, and how many people are travelling with the patient.',
      needsPickup: true,
    },
    {
      icon: 'snow',
      title: 'Bringing a loved one home through Benapole',
      text: 'We are deeply sorry for your loss. When a family member has died during treatment in India, the body often comes home through Benapole. We meet the family at the land port with a freezer van and carry your loved one home with care. Tell us the expected time and the destination.',
      link: { key: 'freezer', anchor: 'freezer van from Benapole' },
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'From Dhaka to Benapole for the crossing',
      text: 'Travelling to India for treatment and need to reach the border lying down? We drive the patient from Dhaka to Benapole land port. Share your crossing plan, and we time the trip with it.',
      verified: false,
    },
  ],
  acLine: 'For stable patients between Benapole and Dhaka: returns from treatment in India and trips home.',
  route: {
    answer: 'From Benapole, the road runs east to Jashore, then through Narail and the Kalna bridge to Bhanga and the Padma Bridge into Dhaka. The dispatcher confirms the route on the call.',
    factors: ['Waiting for the crossing at the land port', 'Traffic between Benapole and Jashore', 'The Kalna bridge and Padma Bridge toll plazas', 'Entry into Dhaka', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Benapole', note: 'Land port' }, { name: 'Jashore' }, { name: 'Bhanga' }, { name: 'Padma Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
    onRoute: { lead: 'The road passes through Jashore. See our', district: 'Jessore', anchor: 'ambulance service in Jessore' },
  },
  pickup: {
    answer: 'We meet patients and families at the Benapole land port on the Bangladesh side, in Benapole town, and in Sharsha and Jashore nearby, and drive to Dhaka or any other district.',
    upazilasH3: 'Places near Benapole we pick up from',
  },
  fareMore: 'Crossings can take longer than planned. Tell us the expected time and we include the waiting in the fare before you agree.',
  tipsIntro: 'A crossing from India has more moving parts than a normal transfer. These points help.',
  tips: [
    'Share the expected crossing time and a phone number that works in Bangladesh.',
    'Keep the hospital papers from India, and any death certificate, with the family member travelling.',
  ],
  faqs: [
    {
      q: 'Can you meet a patient coming from India at Benapole?',
      a: 'Yes. Share the expected crossing time and the destination. We meet the patient on the Bangladesh side of the land port and confirm the waiting and the full fare first.',
      verified: false,
    },
    {
      q: 'Can a freezer van collect a loved one at Benapole?',
      a: 'Tell us the expected time, the papers you have and where you are taking your loved one. The dispatcher confirms the meeting point and the fare before we leave.',
      verified: false,
    },
    {
      q: 'Which way does the ambulance go from Benapole to Dhaka?',
      a: 'From Benapole to Jashore, then through Narail, Bhanga and the Padma Bridge. The dispatcher confirms the route on the call; we do not promise a fixed travel time.',
    },
    {
      q: 'Where in Benapole do you meet us?',
      a: 'On the Bangladesh side of the land port or anywhere in Benapole town. Tell us where you will be, and the driver calls you when close.',
    },
  ],
  nearby: ['Jessore', 'Khulna', 'Kushtia'],
  nearbyAnswer: 'Benapole is in Jashore district, close to Khulna. We run journeys from these districts to Dhaka too.',
  reviewTags: ['jessore', 'inter-district'],
});
