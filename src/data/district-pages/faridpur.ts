/** Faridpur location page: /ambulance-service-faridpur/ (new URL). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const faridpurPage = buildDistrictPage({
  key: 'faridpur',
  district: 'Faridpur',
  slug: '/ambulance-service-faridpur/',
  admin: 'Faridpur District',
  facts: unconfirmedDistrict('Faridpur', {
    destinations: [{ name: 'Faridpur Medical College Hospital', area: 'Faridpur town' }],
    areas: ['Jhiltuli', 'Goalchamot', 'Niltuli', 'Alipur', 'Tepakhola'],
    upazilas: [
      { name: 'Faridpur Sadar' },
      { name: 'Bhanga' },
      { name: 'Boalmari' },
      { name: 'Alfadanga' },
      { name: 'Madhukhali' },
      { name: 'Nagarkanda' },
      { name: 'Saltha' },
      { name: 'Sadarpur' },
      { name: 'Charbhadrasan', remote: true },
    ],
  }),
  mentions: [{ type: 'City', name: 'Faridpur', sameAs: 'https://en.wikipedia.org/wiki/Faridpur' }],
  metaDescription: 'Ambulance from Faridpur or Bhanga to Dhaka via the expressway and Padma Bridge. {vehicles}, 24/7. Fare told first. Call {phone}.',
  lede: 'Need an ambulance from Faridpur to a Dhaka hospital? With the Padma Bridge and the Bhanga expressway, Faridpur is now a short road trip from Dhaka. We pick up in Faridpur town or any upazila and agree the full fare first.',
  serviceFact: "Faridpur town, Bhanga and the eastern upazilas to Dhaka or any district, and home to Faridpur after discharge.",
  routeFact: 'From Faridpur town to Bhanga, then the expressway and the Padma Bridge into Dhaka.',
  localFact: { term: 'Bhanga junction', value: 'Bhanga in Faridpur is where the expressway from the Padma Bridge splits towards Khulna, Barishal and Faridpur town.' },
  journeysIntro: 'Faridpur trips are among the shorter district routes we run, so families often call the same day. Planning ahead still helps.',
  journeys: [
    {
      icon: 'route',
      title: 'Faridpur to a Dhaka hospital',
      text: 'Faridpur has its own medical college hospital, but some cases still need a specialist team in Dhaka. If the treating doctor writes a referral, call with the ward name and the Dhaka hospital. We plan the pickup in town and drive via Bhanga, with the patient lying down throughout.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Boalmari, Alfadanga or Madhukhali',
      text: "The eastern side of the district reaches Dhaka through Faridpur town or Bhanga. Share the address and a landmark, and the dispatcher agrees the pickup point and the timing.",
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Faridpur after treatment',
      text: 'Recovering patients often go home to Faridpur on the day of discharge. Send us the expected discharge time in the morning, and the ambulance waits at the hospital in Dhaka until the papers are signed.',
    },
    {
      icon: 'snow',
      title: 'Taking a loved one home to Faridpur',
      text: 'We are sorry for your loss. For a burial in Faridpur, the family usually wants to leave Dhaka as soon as the hospital releases the body. Call when you have the papers, and the freezer van comes to the hospital with the fare already agreed.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Faridpur' },
    },
  ],
  acLine: 'For stable patients on the short Faridpur route: referrals, follow-up visits and discharges.',
  route: {
    answer: 'Journeys between Faridpur and Dhaka run from Faridpur town to Bhanga, then along the expressway and over the Padma Bridge. The dispatcher confirms the route on the call.',
    factors: ['Traffic in Faridpur town', 'The Bhanga junction', 'The Padma Bridge toll plaza', 'Roads into Dhaka at busy times', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Faridpur', note: 'Pickup' }, { name: 'Bhanga' }, { name: 'Padma Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up in Faridpur town and across the district, from Bhanga to Boalmari and Madhukhali, and take the patient to Dhaka or any other district.',
    areasH3: 'Areas in Faridpur town',
  },
  fareMore: 'Faridpur is close to Dhaka by road now. Ask for a return-trip fare if the patient is coming home the same day.',
  tipsIntro: 'Faridpur is close to Dhaka by road, so many families book on the day. A little detail still helps.',
  tips: [
    'Book the evening before for a morning appointment in Dhaka, so the pickup is not rushed.','For a pickup in Bhanga, tell us which side of the junction you are on.'],
  faqs: [
    {
      q: 'Do you pick up in Bhanga?',
      a: 'Yes. Bhanga is on the expressway in Faridpur district. Share the address and a landmark near the junction, and we confirm the pickup and the fare.',
    },
    {
      q: 'Which route do you take from Faridpur to Dhaka?',
      a: 'From Faridpur town to Bhanga, then the expressway and the Padma Bridge. The dispatcher confirms the route on the call; we do not promise a fixed travel time.',
    },
  ],
  nearby: ['Madaripur', 'Gopalganj', 'Kushtia', 'Jessore'],
  nearbyAnswer: 'Faridpur is the gateway to the Padma Bridge corridor. We run journeys from the districts around it to Dhaka too.',
});
