/** Madaripur location page: /ambulance-service-madaripur/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const madaripurPage = buildDistrictPage({
  key: 'madaripur',
  district: 'Madaripur',
  slug: '/ambulance-service-madaripur/',
  admin: 'Madaripur District',
  facts: unconfirmedDistrict('Madaripur', {
    destinations: [{ name: 'Madaripur Sadar Hospital', area: 'Madaripur town' }],
    upazilas: [{ name: 'Madaripur Sadar' }, { name: 'Shibchar' }, { name: 'Kalkini' }, { name: 'Rajoir' }, { name: 'Dasar' }],
  }),
  mentions: [
    { type: 'Place', name: 'Madaripur District', sameAs: 'https://en.wikipedia.org/wiki/Madaripur_District' },
    { type: 'Place', name: 'Padma Bridge', sameAs: 'https://en.wikipedia.org/wiki/Padma_Bridge' },
  ],
  metaDescription: 'Ambulance from Madaripur, Shibchar, Kalkini or Rajoir to Dhaka over the Padma Bridge. {vehicles}, 24/7. Fare told first: {phone}.',
  lede: 'Need an ambulance from Madaripur to a Dhaka hospital? Madaripur sits just across the Padma Bridge, one of the shortest district routes from Dhaka. We pick up in Shibchar, Madaripur town, Kalkini or Rajoir, and tell you the full fare first.',
  serviceFact: "Referrals and same-day treatment trips from Madaripur to Dhaka, transfers to other districts, and trips home.",
  routeFact: 'Over the Padma Bridge and along the expressway through Shibchar.',
  localFact: { term: 'On the expressway', value: 'Shibchar in Madaripur is on the Dhaka–Bhanga expressway, right after the Padma Bridge.' },
  journeysIntro: 'Because Madaripur is close to the bridge, many families call us for same-day hospital trips as well as planned transfers.',
  journeys: [
    {
      icon: 'route',
      title: 'Madaripur to a Dhaka hospital',
      text: 'When a doctor in Madaripur advises treatment in Dhaka, we collect the patient from the hospital or from home and drive over the Padma Bridge to the Dhaka hospital. Tell the dispatcher the pickup, the Dhaka hospital and whether a bed is confirmed.',
      needsPickup: true,
    },
    {
      icon: 'clock',
      title: 'Day trips for treatment',
      text: 'Some patients from Madaripur travel to Dhaka for a test, a session or a consultation and come home the same day. Ask for a return-trip fare, and tell us how long the hospital visit may take, so waiting time is in the quote.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Madaripur after discharge',
      text: 'Discharged in Dhaka and going home to Kalkini, Rajoir or Madaripur town? The drive is short now, but a patient after surgery still travels better lying down. Send the discharge time and a landmark near home.',
    },
    {
      icon: 'snow',
      title: 'Taking a loved one home to Madaripur',
      text: 'We are sorry for your loss. Madaripur is close to Dhaka, so families can often hold the janaza the same day. Tell us the home village and the time, and we bring your loved one home in a freezer van with care.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Madaripur' },
    },
  ],
  acLine: 'For stable patients on the short Madaripur route: referrals, day trips for treatment and discharges.',
  route: {
    answer: 'Journeys between Madaripur and Dhaka cross the Padma Bridge and use the expressway through Shibchar. From there, local roads lead to Madaripur town, Kalkini and Rajoir. The dispatcher confirms the route on the call.',
    factors: ['Traffic on the Dhaka side before the expressway', 'The Padma Bridge toll plaza', 'Local roads from the expressway to the pickup', 'Waiting at the hospital on day trips', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Madaripur', note: 'Pickup' }, { name: 'Shibchar' }, { name: 'Padma Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up in Madaripur town and across the district, from Shibchar on the expressway to Kalkini and Rajoir, and take the patient to Dhaka or any other district.',
    upazilasH3: 'Upazilas of Madaripur',
  },
  fareMore: 'For a day trip, ask for the return fare with waiting included. It is usually clearer than booking two one-way trips.',
  tipsIntro: 'Short routes still need a plan, especially for a same-day hospital visit.',
  tips: [
    'For a return trip, carry anything the patient needs for the hospital visit and the drive home.','For a same-day hospital visit, tell us the appointment time so we plan the waiting.'],
  faqs: [
    {
      q: 'Can you do a return trip from Madaripur in one day?',
      a: 'Yes. Ask for a return-trip fare and tell us how long the hospital visit may take. The waiting time is part of the quote we give you before we leave.',
      verified: true,
    },
    {
      q: 'Do you pick up in Shibchar?',
      a: 'Yes. Shibchar is on the expressway just after the Padma Bridge. Share the address and a landmark, and we confirm the pickup and the fare.',
    },
  ],
  nearby: ['Faridpur', 'Gopalganj', 'Barisal', 'Jhalokati'],
  nearbyAnswer: 'Madaripur is part of the Padma Bridge corridor. We run journeys from the districts around it to Dhaka too.',
});
