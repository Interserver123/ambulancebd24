/** Pirojpur location page: /ambulance-service-pirojpur/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const pirojpurPage = buildDistrictPage({
  key: 'pirojpur',
  district: 'Pirojpur',
  slug: '/ambulance-service-pirojpur/',
  admin: 'Pirojpur District',
  facts: unconfirmedDistrict('Pirojpur', {
    destinations: [{ name: 'Pirojpur District Hospital', area: 'Pirojpur town' }],
    upazilas: [
      { name: 'Pirojpur Sadar' },
      { name: 'Nesarabad (Swarupkathi)' },
      { name: 'Nazirpur' },
      { name: 'Kawkhali' },
      { name: 'Bhandaria' },
      { name: 'Indurkani' },
      { name: 'Mathbaria', remote: true },
    ],
  }),
  mentions: [{ type: 'Place', name: 'Pirojpur District', sameAs: 'https://en.wikipedia.org/wiki/Pirojpur_District' }],
  lede: 'Need an ambulance from Pirojpur to a Dhaka hospital, or from Swarupkathi, Nazirpur or Bhandaria? We pick up in Pirojpur, drive to Dhaka or any district, and tell you the full fare before the ambulance leaves.',
  serviceFact: "Pickups across Pirojpur, from Swarupkathi to Bhandaria, to Dhaka or any district, and trips home after discharge.",
  routeFact: 'Through Bhanga and over the Padma Bridge. The road inside the district depends on the upazila.',
  journeysIntro: 'Pirojpur is a river district, and the road from each upazila to the highway is different. Tell us the exact pickup, and we plan from there.',
  journeys: [
    {
      icon: 'route',
      title: 'Pirojpur to a Dhaka hospital',
      text: 'When doctors in Pirojpur refer a patient to Dhaka for specialist care, we collect them from the hospital or from home and drive to the Dhaka hospital in one vehicle. Tell the dispatcher the upazila, the pickup point, the Dhaka hospital and whether the bed is confirmed.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Swarupkathi or Nazirpur',
      text: 'Pickups away from Pirojpur town need a little more planning. Share a landmark, such as the bazar, the ghat or a school, and the dispatcher confirms where the ambulance can reach and when.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Pirojpur after discharge',
      text: 'After an operation or a long stay in Dhaka, the trip back to Bhandaria or Kawkhali is tiring for the patient. We make it in one vehicle, lying down, with stops when the family needs them.',
    },
    {
      icon: 'snow',
      title: 'Taking a loved one home to Pirojpur',
      text: 'We are sorry for your loss. Bringing a loved one home to Pirojpur from Dhaka is a long road. We carry them in a freezer van, keep you informed on the way, and agree the fare before we leave the hospital.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Pirojpur' },
    },
  ],
  acLine: 'For stable patients on the Pirojpur road: referrals to Dhaka and the journey home after discharge.',
  route: {
    answer: 'Most journeys between Pirojpur and Dhaka join the highway at Bhanga and cross the Padma Bridge. Inside the district, the road depends on the upazila, and the dispatcher confirms it on the call.',
    factors: ['Which upazila the pickup is in', 'River crossings on the local roads', 'The Padma Bridge toll plaza', 'Traffic coming into Dhaka', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Pirojpur', note: 'Pickup' }, { name: 'Bhanga' }, { name: 'Padma Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up from Pirojpur town and the upazilas around it, and take the patient to Dhaka or any other district. For Mathbaria and other far points, the dispatcher confirms the pickup first.',
    upazilasH3: 'Upazilas of Pirojpur',
  },
  fareMore: 'Pickups in Swarupkathi, Nazirpur or Bhandaria can take longer to reach than Pirojpur town. That is why we quote the exact pickup point, not just the district.',
  tipsIntro: 'In a river district, the last stretch to the home matters as much as the highway.',
  tips: [
    'Ask the hospital in Pirojpur for the discharge or referral papers before the ambulance arrives.','Tell the dispatcher about any ghat or narrow road near the home, so the driver plans the last stretch.'],
  faqs: [
    {
      q: 'Do you go to Swarupkathi and Nazirpur?',
      a: 'Share the address and a landmark. The dispatcher confirms the pickup, the timing and the full fare before we leave Dhaka.',
    },
    {
      q: 'Which way does the ambulance go from Pirojpur to Dhaka?',
      a: 'Most trips join the highway at Bhanga and cross the Padma Bridge. The local road depends on the upazila; the dispatcher confirms it on the call.',
    },
  ],
  nearby: ['Barisal', 'Jhalokati', 'Gopalganj', 'Khulna'],
  nearbyAnswer: 'Pirojpur borders Barishal, Jhalokati, Gopalganj and Bagerhat. We run journeys from these districts to Dhaka too.',
});
