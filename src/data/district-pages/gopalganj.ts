/** Gopalganj location page: /ambulance-service-gopalganj/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const gopalganjPage = buildDistrictPage({
  key: 'gopalganj',
  district: 'Gopalganj',
  slug: '/ambulance-service-gopalganj/',
  admin: 'Gopalganj District',
  facts: unconfirmedDistrict('Gopalganj', {
    destinations: [{ name: 'Gopalganj 250-bed General Hospital', area: 'Gopalganj town' }],
    upazilas: [{ name: 'Gopalganj Sadar' }, { name: 'Kashiani' }, { name: 'Muksudpur' }, { name: 'Kotalipara' }, { name: 'Tungipara' }],
  }),
  mentions: [{ type: 'Place', name: 'Gopalganj District', sameAs: 'https://en.wikipedia.org/wiki/Gopalganj_District,_Bangladesh' }],
  metaDescription: 'Ambulance from Gopalganj, Kashiani, Muksudpur or Tungipara to Dhaka or Khulna. {vehicles}, 24/7. Fare told first: {phone}.',
  lede: 'Need an ambulance from Gopalganj to a Dhaka hospital? Gopalganj sits on the Dhaka–Khulna highway, past Bhanga. We collect the patient in Gopalganj town, Kashiani, Muksudpur, Kotalipara or Tungipara, and agree the full fare first.',
  serviceFact: "Gopalganj to Dhaka, to Khulna along the same highway, or to any district; and home to Gopalganj after treatment.",
  routeFact: 'Along the Dhaka–Khulna highway through Bhanga, then over the Padma Bridge.',
  journeysIntro: 'Gopalganj is on the road between Dhaka and Khulna, so we also pass through it on Khulna trips. Each Gopalganj pickup is planned on its own call.',
  journeys: [
    {
      icon: 'route',
      title: 'Gopalganj to a Dhaka hospital',
      text: 'A referral from Gopalganj to Dhaka often comes for cardiac, kidney or cancer care. Tell us the referring hospital, the ward and the Dhaka hospital that accepted the patient. The ambulance comes down the Khulna highway, collects the patient, and heads back towards the bridge.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Kotalipara or Muksudpur',
      text: 'Kotalipara and Muksudpur are away from the main highway. Share the address and a landmark such as the bazar or union office, and the dispatcher confirms the pickup and the timing.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Gopalganj after treatment',
      text: 'Going home to Tungipara, Kashiani or Gopalganj town after weeks in a Dhaka hospital? An AC ambulance lets the patient rest lying down. Share the village or para name with the nearest bazar, and we plan the last part of the road.',
    },
    {
      icon: 'snow',
      title: 'Taking a loved one home to Gopalganj',
      text: 'We are sorry for your loss. Many families from Gopalganj bury their loved ones in the family graveyard at home. Tell us the village and when the janaza is planned, and we carry your loved one there in a freezer van, with the fare agreed first.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Gopalganj' },
    },
  ],
  acLine: 'For stable patients between Gopalganj and Dhaka: referrals, discharges and planned treatment.',
  route: {
    answer: 'Most journeys between Gopalganj and Dhaka use the Dhaka–Khulna highway to Bhanga, then cross the Padma Bridge. The dispatcher confirms the route on the call.',
    factors: ['Traffic on the Dhaka side of the bridge', 'The Padma Bridge toll plaza', 'Local roads to Kotalipara and Muksudpur', 'Waiting at the hospital', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Gopalganj', note: 'Pickup' }, { name: 'Bhanga' }, { name: 'Padma Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
    onRoute: { lead: 'Going further along the highway? See our', district: 'Khulna', anchor: 'ambulance service in Khulna' },
  },
  pickup: {
    answer: 'We pick up from hospitals and homes in Gopalganj town and its upazilas, and take the patient to Dhaka or any other district, including Khulna along the same highway.',
    upazilasH3: 'Upazilas of Gopalganj',
  },
  fareMore: 'Gopalganj is about halfway between Dhaka and Khulna on the highway. Ask us for the exact fare from your upazila, not a district-wide estimate.',
  tipsIntro: 'Gopalganj pickups away from the highway go better with clear directions.',
  tips: [
    'Say whether the patient is going to Dhaka or to Khulna; both are on the same highway, in opposite directions.','If the patient is in Kotalipara or Muksudpur, share the nearest bazar or school as a landmark.'],
  faqs: [
    {
      q: 'Can you take a patient from Gopalganj to Khulna instead of Dhaka?',
      a: 'Yes. Gopalganj is on the Dhaka–Khulna highway, so we can go either way. Tell us the hospital in Khulna, and we confirm the fare before we leave.',
    },
    {
      q: 'Do you pick up in Tungipara and Kotalipara?',
      a: 'Share the address and a landmark. The dispatcher confirms the pickup, the timing and the full fare on the call.',
    },
  ],
  nearby: ['Khulna', 'Madaripur', 'Faridpur', 'Jessore', 'Pirojpur'],
  nearbyAnswer: 'Gopalganj links the Padma Bridge corridor with Khulna and Jashore. We run journeys from these districts to Dhaka too.',
});
