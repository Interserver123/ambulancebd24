/** Jessore (Jashore) location page: /ambulance-service-jessore/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const jessorePage = buildDistrictPage({
  key: 'jessore',
  district: 'Jessore',
  aka: 'Jashore',
  slug: '/ambulance-service-jessore/',
  admin: 'Jashore District',
  facts: unconfirmedDistrict('Jessore', {
    destinations: [{ name: 'Jashore 250-bed General Hospital', area: 'Jashore town' }],
    areas: ['Doratana', 'Palbari', 'Chanchra', 'Monihar', 'Shankarpur', 'Rail Road'],
    upazilas: [
      { name: 'Jashore Sadar' },
      { name: 'Abhaynagar' },
      { name: 'Bagherpara' },
      { name: 'Chaugachha' },
      { name: 'Jhikargachha' },
      { name: 'Keshabpur' },
      { name: 'Manirampur' },
      { name: 'Sharsha' },
    ],
  }),
  mentions: [{ type: 'City', name: 'Jessore', sameAs: 'https://en.wikipedia.org/wiki/Jessore' }],
  lede: 'Need an ambulance from Jessore (Jashore) to a Dhaka hospital, or to another district? We pick up in Jashore town and every upazila, drive to Dhaka over the Padma Bridge, and tell you the full fare before we leave.',
  serviceFact: 'Jashore town and its eight upazilas to Dhaka or any district, including patients coming back from India via Benapole.',
  routeFact: 'Through Narail and the Kalna bridge over the Madhumati, then Bhanga and the Padma Bridge.',
  localFact: { term: 'Near the border', value: 'Jashore is the district of the Benapole land port, so we also carry patients arriving from India towards Dhaka.' },
  journeysIntro: 'Jashore is a crossroads: patients leave for Dhaka, others arrive from India through Benapole, and many come home to recover.',
  journeys: [
    {
      icon: 'route',
      title: 'Jashore to a Dhaka hospital',
      text: 'When a doctor in Jashore refers the patient to Dhaka, we collect them at the ward in town or at home in an upazila and drive via Narail and the Padma Bridge. Tell us the Jashore pickup, the Dhaka hospital and whether a bed is confirmed.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'Back from India through Jashore',
      text: 'Patients returning from treatment in India cross at Benapole and often need an ambulance onward. We can meet them in Jashore or at the border town and drive to Dhaka or home. Share the expected crossing time and the destination.',
      needsPickup: true,
      link: { href: '/ambulance-service-benapole/', anchor: 'ambulance service in Benapole' },
    },
    {
      icon: 'building',
      title: 'Home to Jashore after Dhaka treatment',
      text: 'After treatment in Dhaka, the patient goes home to Jashore lying down in an AC ambulance, over the bridge and the Madhumati. Give us the discharge time and a landmark near home in Manirampur, Keshabpur or town.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Jashore',
      text: 'We are sorry for your loss. We take your loved one from the Dhaka hospital to the family home in Jashore in a freezer van, with care and respect, and the fare agreed before we set off.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Jessore' },
    },
  ],
  acLine: 'For stable patients between Jashore and Dhaka: referrals, returns from India and the trip home.',
  route: {
    answer: 'Most journeys between Jessore and Dhaka go through Narail, cross the Madhumati at the Kalna bridge, and reach the Padma Bridge through Bhanga. The dispatcher confirms the route on the call.',
    factors: ['Traffic in Jashore town', 'The Kalna bridge and the Padma Bridge toll plazas', 'Traffic on the Dhaka side', 'Waiting for patients crossing from India', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Jashore', note: 'Pickup' }, { name: 'Narail' }, { name: 'Bhanga' }, { name: 'Padma Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up from Jashore town and all eight upazilas, from Sharsha near the border to Abhaynagar near Khulna, and take the patient to Dhaka or any other district.',
    areasH3: 'Areas in Jashore town',
  },
  fareMore: 'If the patient is crossing from India, waiting at the border can change the plan. Tell us early, and the waiting is part of the quote.',
  tipsIntro: 'Jashore trips often connect with a hospital in Dhaka or a crossing from India. Plan both ends.',
  tips: ['For a return from India, share the expected crossing time and a phone number that works on the Bangladesh side.', 'Keep the hospital papers from India with the patient.'],
  faqs: [
    {
      q: 'Can you collect a patient arriving from India at Benapole and take them to Jashore or Dhaka?',
      a: 'Tell us the expected crossing time and where the patient is going. The dispatcher confirms the meeting point, the waiting and the full fare before we leave.',
      verified: false,
    },
    {
      q: 'Which route do you take from Jessore to Dhaka?',
      a: 'Usually through Narail, the Kalna bridge, Bhanga and the Padma Bridge. The dispatcher confirms the route on the call; we do not promise a fixed travel time.',
    },
    {
      q: 'Do you pick up in Manirampur and Keshabpur?',
      a: 'Share the address and a landmark such as the bazar. We confirm the pickup, the timing and the full fare before we leave.',
    },
  ],
  nearby: ['Benapole', 'Khulna', 'Kushtia', 'Gopalganj'],
  nearbyAnswer: 'Jashore sits between Khulna, Kushtia and the Benapole border. We run journeys from these places to Dhaka too.',
});
