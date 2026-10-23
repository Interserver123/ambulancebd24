/** Rangpur location page: /ambulance-service-rangpur/ (new URL). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const rangpurPage = buildDistrictPage({
  key: 'rangpur',
  district: 'Rangpur',
  slug: '/ambulance-service-rangpur/',
  admin: 'Rangpur District',
  facts: unconfirmedDistrict('Rangpur', {
    destinations: [{ name: 'Rangpur Medical College Hospital', area: 'Rangpur city' }],
    areas: ['Jahaj Company Mor', 'Modern Mor', 'Dhap', 'Shapla Chattar', 'Lalbagh', 'Medical Mor'],
    upazilas: [
      { name: 'Rangpur Sadar' },
      { name: 'Badarganj' },
      { name: 'Gangachara' },
      { name: 'Kaunia' },
      { name: 'Mithapukur' },
      { name: 'Pirgachha' },
      { name: 'Pirganj' },
      { name: 'Taraganj' },
    ],
  }),
  mentions: [{ type: 'City', name: 'Rangpur', sameAs: 'https://en.wikipedia.org/wiki/Rangpur_City' }],
  metaDescription: 'Ambulance from Rangpur city or any upazila to Dhaka via Bogura and the Jamuna Bridge. {vehicles}, 24/7. Fare told first: {phone}.',
  lede: 'Need an ambulance from Rangpur to a Dhaka hospital? It is a long road south over the Jamuna, and the patient deserves to lie down the whole way. We pick up in Rangpur city or any upazila and agree the full fare first.',
  serviceFact: 'Rangpur city and its eight upazilas to Dhaka or any district, and the long trip home after treatment.',
  routeFact: 'South on the Dhaka–Rangpur highway through Pirganj and Bogura, over the Jamuna Bridge.',
  localFact: { term: 'Long route', value: 'Rangpur is one of the longest regular routes from Dhaka. Book ahead when you can.' },
  journeysIntro: 'From Rangpur, almost every trip is planned: the referral is written, the Dhaka bed is confirmed, then the ambulance comes north.',
  journeys: [
    {
      icon: 'route',
      title: 'Rangpur to a Dhaka hospital',
      text: 'When the medical college hospital in Rangpur refers a patient to Dhaka, we collect them at the ward near Medical Mor or from home, then drive south through Bogura and over the Jamuna. Share the ward, the Dhaka hospital and when the patient can leave.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Pirganj, Mithapukur or Badarganj',
      text: 'Pirganj is on the highway south of the city; Badarganj and Taraganj are to the west. The dispatcher plans the pickup from the upazila you give, so share a landmark such as the bazar or the upazila health complex.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Rangpur to recover',
      text: 'The trip home from Dhaka to Rangpur is long for a patient after surgery. We drive it in one vehicle, lying down, with rest stops when needed. Book a day ahead so we can match the discharge.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Rangpur',
      text: 'We are sorry for your loss. The road north is long, and families often travel with the van. We carry your loved one home to Rangpur with care and respect, and settle the fare on the call.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Rangpur' },
    },
  ],
  acLine: 'For stable patients on the long Rangpur road: referrals and the journey home.',
  route: {
    answer: 'Most journeys between Rangpur and Dhaka use the Dhaka–Rangpur highway: through Pirganj and Bogura, over the Jamuna Bridge and through Tangail. The dispatcher confirms the route on the call.',
    factors: ['City traffic around Modern Mor and Medical Mor', 'Market towns on the highway, such as Bogura', 'The Jamuna Bridge toll plaza', 'Rest stops on a long journey', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Rangpur', note: 'Pickup' }, { name: 'Bogura' }, { name: 'Jamuna Bridge' }, { name: 'Tangail' }, { name: 'Dhaka', note: 'Hospital or home' }],
    onRoute: { lead: 'The highway passes through Bogura. See our', district: 'Bogura', anchor: 'ambulance service in Bogura' },
  },
  pickup: {
    answer: 'We pick up from hospitals and homes across Rangpur city and its upazilas, and take the patient to Dhaka or any other district.',
    areasH3: 'Areas in Rangpur city',
  },
  fareMore: 'Rangpur is a long route, so ask whether the quote includes the ambulance returning to Dhaka. We say it plainly.',
  tipsIntro: 'For a trip this long, a little preparation on the Rangpur side makes a big difference.',
  tips: ['Book a day ahead when you can, so the ambulance arrives as the papers are ready.', 'Tell us if the patient needs regular breaks on the way.'],
  faqs: [
    {
      q: 'Which route do you take from Rangpur to Dhaka?',
      a: 'Usually the Dhaka–Rangpur highway through Bogura and over the Jamuna Bridge. We do not promise a fixed travel time; the dispatcher gives an estimate on the call.',
    },
    {
      q: 'Do you pick up from Mithapukur and Pirganj?',
      a: 'Share the address and a landmark. The dispatcher confirms the pickup, the timing and the full fare before we leave.',
    },
  ],
  nearby: ['Bogura', 'Panchagarh', 'Rajshahi'],
  nearbyAnswer: 'Rangpur division covers the far north, up to Panchagarh. We run journeys from the nearby districts to Dhaka too.',
});
