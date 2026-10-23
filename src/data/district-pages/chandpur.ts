/** Chandpur location page: /chandpur-ambulance-service/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const chandpurPage = buildDistrictPage({
  key: 'chandpur',
  district: 'Chandpur',
  slug: '/chandpur-ambulance-service/',
  keyword: 'Chandpur ambulance service',
  admin: 'Chandpur District',
  facts: unconfirmedDistrict('Chandpur', {
    destinations: [{ name: 'Chandpur 250-bed General Hospital', area: 'Chandpur town' }],
    upazilas: [
      { name: 'Chandpur Sadar' },
      { name: 'Hajiganj' },
      { name: 'Kachua' },
      { name: 'Shahrasti' },
      { name: 'Faridganj' },
      { name: 'Matlab Uttar' },
      { name: 'Matlab Dakshin' },
      { name: 'Haimchar', remote: true },
    ],
  }),
  mentions: [{ type: 'City', name: 'Chandpur', sameAs: 'https://en.wikipedia.org/wiki/Chandpur' }],
  lede: 'Need an ambulance from Chandpur to a Dhaka hospital? Many people still think of Chandpur as a launch journey, but a patient on a stretcher travels better by road. We pick up in Chandpur town, Hajiganj, Matlab or Kachua, and agree the full fare first.',
  serviceFact: 'Chandpur town and its upazilas to Dhaka or any district by road, and home to Chandpur after treatment.',
  routeFact: 'By road through Cumilla district to the Dhaka–Chattogram highway. The dispatcher confirms the road for your upazila.',
  journeysIntro: 'A launch is not built for a patient lying down. For Chandpur, we plan the road trip door to door.',
  journeys: [
    {
      icon: 'route',
      title: 'Chandpur to a Dhaka hospital by road',
      text: 'When a doctor at the hospital in Chandpur refers the patient to Dhaka, we collect them from the ward and drive the whole way, with no launch ghat and no change of vehicle. Share the ward, the Dhaka hospital and when the patient can leave.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Matlab, Hajiganj or Kachua',
      text: 'Matlab sits on the river side of the district, while Hajiganj and Kachua are closer to Cumilla. The pickup and the road depend on where you are. Give us the upazila and a landmark, and the dispatcher plans it.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Back to Chandpur after treatment',
      text: 'Discharged in Dhaka and going home to Chandpur? We bring the patient home lying down, straight to the door, instead of a launch and a rickshaw at the other end.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Chandpur',
      text: 'We are sorry for your loss. We carry your loved one from the Dhaka hospital to the family home or graveyard in Chandpur in a freezer van, by road, with care and respect. The fare is agreed before we leave.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Chandpur' },
    },
  ],
  acLine: 'For stable patients between Chandpur and Dhaka by road: referrals and the trip home.',
  route: {
    answer: 'By road, most journeys between Chandpur and Dhaka cross Cumilla district to the Dhaka–Chattogram highway and then head north to Dhaka. The road inside the district depends on the upazila; the dispatcher confirms it on the call.',
    factors: ['Which upazila the pickup is in', 'Market towns on the way, such as Hajiganj', 'Traffic on the Dhaka–Chattogram highway', 'Entry into Dhaka', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Chandpur', note: 'Pickup' }, { name: 'Cumilla district' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up in Chandpur town and the upazilas around it and take the patient to Dhaka or any other district by road. For river chars such as Haimchar, the dispatcher agrees a road pickup point.',
    upazilasH3: 'Upazilas of Chandpur',
  },
  fareMore: 'A road ambulance from Chandpur costs more than a launch ticket, but the patient stays lying down in one vehicle. We tell you the exact fare first, so you can decide.',
  tipsIntro: 'Chandpur is a river town. A few details help the ambulance reach you on the road side.',
  tips: ['If the home is near the river, share the nearest road the ambulance can reach.', 'Tell us if the patient is in Matlab, so we plan the right road.'],
  faqs: [
    {
      q: 'Is it better to go from Chandpur to Dhaka by launch or by ambulance?',
      a: 'For a patient who needs to lie down or needs support on the way, a road ambulance avoids the ghat, the stairs and a change of vehicle. The treating doctor can advise what the patient needs.',
    },
    {
      q: 'Do you go to Matlab and Hajiganj?',
      a: 'Share the address and a landmark. The dispatcher confirms the pickup, the road and the full fare before we leave.',
    },
  ],
  nearby: ['Cumilla', 'Noakhali', 'Chittagong'],
  nearbyAnswer: 'Chandpur borders Cumilla and Lakshmipur. We run journeys from the nearby districts to Dhaka too.',
});
