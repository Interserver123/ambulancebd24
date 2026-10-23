/** Rajshahi location page: /ambulance-service-rajshahi/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const rajshahiPage = buildDistrictPage({
  key: 'rajshahi',
  district: 'Rajshahi',
  slug: '/ambulance-service-rajshahi/',
  admin: 'Rajshahi District',
  facts: unconfirmedDistrict('Rajshahi', {
    destinations: [{ name: 'Rajshahi Medical College Hospital', area: 'Laxmipur' }],
    areas: ['Shaheb Bazar', 'Laxmipur', 'Uposhohor', 'Kazla', 'Talaimari', 'Shiroil', 'Binodpur'],
    upazilas: [
      { name: 'Paba' },
      { name: 'Godagari' },
      { name: 'Tanore' },
      { name: 'Mohanpur' },
      { name: 'Bagmara' },
      { name: 'Durgapur' },
      { name: 'Puthia' },
      { name: 'Charghat' },
      { name: 'Bagha' },
    ],
  }),
  mentions: [
    { type: 'City', name: 'Rajshahi', sameAs: 'https://en.wikipedia.org/wiki/Rajshahi' },
    { type: 'Place', name: 'Jamuna Bridge', sameAs: 'https://en.wikipedia.org/wiki/Bangabandhu_Bridge' },
  ],
  metaDescription: 'Ambulance from Rajshahi city or any upazila to Dhaka via Natore and the Jamuna Bridge. {vehicles}, 24/7. Fare told first: {phone}.',
  lede: 'Need an ambulance from Rajshahi to a Dhaka hospital? We collect patients from the medical college area, the city or any upazila, cross the Jamuna Bridge to Dhaka, and tell you the full fare before the ambulance leaves.',
  serviceFact: 'Rajshahi city and its nine upazilas to Dhaka or any district, and the journey home after treatment.',
  routeFact: 'East through Natore and Sirajganj, over the Jamuna Bridge, then through Tangail into Dhaka.',
  journeysIntro: 'Rajshahi is a long road from Dhaka. Most calls are planned transfers, booked a few hours or a day ahead.',
  journeys: [
    {
      icon: 'route',
      title: 'Rajshahi to a Dhaka specialist hospital',
      text: 'Rajshahi has a large medical college hospital, and when a patient needs a Dhaka team the referral usually comes from there. We collect at the ward in Laxmipur or wherever the patient is and drive east over the Jamuna. Tell us the ward, the Dhaka hospital and when the doctors will release the patient.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Godagari, Bagmara or Puthia',
      text: 'Godagari lies west of the city along the Padma, Bagmara and Puthia to the east, nearer the highway. Share the upazila and a landmark, and the dispatcher plans the pickup and tells you the timing.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Back to Rajshahi after Dhaka treatment',
      text: 'After a hospital stay in Dhaka, we take the patient home to Rajshahi lying down, with stops on the long road when the patient needs them. Book ahead so the pickup matches the discharge papers.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Rajshahi',
      text: 'We are sorry for your loss. We bring your loved one home from Dhaka to Rajshahi in a freezer van, across the Jamuna Bridge, with care and respect. The fare is fixed on the call.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Rajshahi' },
    },
  ],
  acLine: 'For stable patients on the long Rajshahi road: referrals to Dhaka and trips home.',
  route: {
    answer: 'Most journeys between Rajshahi and Dhaka run east through Natore and Sirajganj, cross the Jamuna Bridge, and continue through Tangail into Dhaka. The dispatcher confirms the route on the call.',
    factors: ['Traffic on the Jamuna Bridge approach and the toll plaza', 'Market towns such as Natore and Sirajganj', 'The roads through Tangail and Gazipur into Dhaka', 'Rest stops on a long journey', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Rajshahi', note: 'Pickup' }, { name: 'Natore' }, { name: 'Jamuna Bridge' }, { name: 'Tangail' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up from hospitals and homes across Rajshahi city and its upazilas, from Godagari to Bagha, and take the patient to Dhaka or any other district.',
    areasH3: 'Areas in Rajshahi city',
  },
  fareMore: 'Rajshahi is a long route, so ask whether a quote includes the ambulance returning to Dhaka. We say it clearly on the call.',
  tipsIntro: 'A long road over the Jamuna is easier when everything is ready before the ambulance arrives.',
  tips: ['Ask the hospital in Rajshahi for the referral papers before the ambulance reaches you.', 'Tell us if the patient needs to stop on the way, so we plan breaks.'],
  faqs: [
    {
      q: 'Which route do you take from Rajshahi to Dhaka?',
      a: 'Usually east through Natore and Sirajganj, over the Jamuna Bridge and through Tangail. We do not promise a fixed travel time; the dispatcher gives an estimate on the call.',
    },
    {
      q: 'Do you pick up from the upazilas, like Godagari or Bagmara?',
      a: 'Share the address and a landmark. We confirm the pickup, the timing and the full fare before we leave.',
    },
  ],
  nearby: ['Bogura', 'Kushtia', 'Rangpur'],
  nearbyAnswer: 'Rajshahi division stretches from Bogura to Chapainawabganj. We run journeys from the nearby districts to Dhaka too.',
});
