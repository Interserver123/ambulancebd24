/** Barisal (Barishal) location page: /ambulance-service-barisal/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const barisalPage = buildDistrictPage({
  key: 'barisal',
  district: 'Barisal',
  aka: 'Barishal',
  slug: '/ambulance-service-barisal/',
  admin: 'Barishal District',
  facts: unconfirmedDistrict('Barisal', {
    destinations: [{ name: 'Sher-e-Bangla Medical College Hospital', area: 'Barishal city' }],
    areas: ['Nathullabad', 'Band Road', 'Sadar Road', 'Rupatali', 'Amtala', 'Kawnia', 'Natun Bazar', 'Chowmatha'],
    upazilas: [
      { name: 'Barishal Sadar' },
      { name: 'Babuganj' },
      { name: 'Bakerganj' },
      { name: 'Banaripara' },
      { name: 'Gournadi' },
      { name: 'Agailjhara' },
      { name: 'Wazirpur' },
      { name: 'Muladi' },
      { name: 'Hizla', remote: true },
      { name: 'Mehendiganj', remote: true },
    ],
  }),
  mentions: [
    { type: 'City', name: 'Barisal', sameAs: 'https://en.wikipedia.org/wiki/Barisal' },
    { type: 'Place', name: 'Padma Bridge', sameAs: 'https://en.wikipedia.org/wiki/Padma_Bridge' },
  ],
  lede: 'Need an ambulance from Barisal (Barishal) to a Dhaka hospital, or to another district? Since the Padma Bridge opened, the road is the usual way to move a patient. We collect from the hospital or home in Barisal and tell you the full fare before we leave.',
  serviceFact: "Referrals from Barishal city and the river upazilas to Dhaka hospitals, transfers to other districts, and trips home to Barisal after treatment.",
  routeFact: 'By road over the Padma Bridge, through Bhanga and Gournadi. No launch or ferry needed for most of the district.',
  emergencyMore: 'Families in the river upazilas often reach a Barishal hospital first; call us from there once the doctor advises Dhaka.',
  journeysIntro: 'Before the bridge, many families moved patients by launch. Now most Barisal transfers go by road, planned a few hours ahead because our ambulance comes from Dhaka.',
  journeys: [
    {
      icon: 'route',
      title: 'Barisal to a specialist hospital in Dhaka',
      text: 'When doctors in Barishal refer a patient to Dhaka for surgery, cancer care, cardiac care or another specialist service. We collect the patient from the ward or from home and drive them to the Dhaka hospital, with the patient lying down for the whole road. Tell the dispatcher the hospital and ward in Barisal, the Dhaka hospital, and whether a bed is confirmed there.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From a river upazila to Dhaka',
      text: 'Families in Muladi, Wazirpur or Banaripara often bring the patient to a Barishal hospital first. If the doctor then advises Dhaka, we pick up from that hospital. For the island upazilas, tell us how the patient reaches the road, and the dispatcher plans the meeting point with you.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Barisal after treatment in Dhaka',
      text: 'After a long admission in Dhaka, the trip home is easier in an AC ambulance than by launch or bus. Book a day ahead if you can, and we line up the pickup with the discharge papers. Share the Dhaka hospital, the home address in Barisal with a nearby landmark, and who is travelling.',
    },
    {
      icon: 'snow',
      title: 'Taking a loved one home to Barisal',
      text: 'We are sorry for your loss. Families who once took a loved one home to Barishal by launch now usually go by road. Our freezer van brings your loved one home over the Padma Bridge, with the fare agreed on the call.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Barisal' },
    },
  ],
  acLine: 'For stable patients going between Barisal and Dhaka by road: referrals, discharges and planned treatment.',
  route: {
    answer: 'Most journeys between Barisal and Dhaka cross the Padma Bridge, then run through Bhanga and Gournadi on the Dhaka–Barishal highway. The dispatcher confirms the route on the call.',
    factors: [
      'Traffic at the Dhaka end, on the way to the Mawa expressway',
      'The Padma Bridge toll plaza',
      'Market towns along the highway, such as Gournadi',
      'Where the pickup is: Barishal city or a river upazila',
      "The patient's needs on the way, as the doctor advised",
    ],
    stops: [
      { name: 'Barishal', note: 'Pickup' },
      { name: 'Gournadi' },
      { name: 'Bhanga' },
      { name: 'Padma Bridge' },
      { name: 'Dhaka', note: 'Hospital or home' },
    ],
  },
  pickup: {
    answer: 'We pick up in Barishal city and across the district, and take the patient to Dhaka or any other district. For island upazilas such as Hizla and Mehendiganj, we agree a road pickup point with you.',
    areasH3: 'Areas in Barishal city',
  },
  fareMore: 'A road trip from Barisal now replaces the launch for most patients. Ask any provider whether the bridge toll and the return to Dhaka are in the quote; we say it clearly on the call.',
  tipsIntro: 'Long road trips from the south go better with a little planning on the Barisal side.',
  tips: [
    'Confirm the Dhaka hospital has a bed before the ambulance leaves Barishal; it saves waiting at the gate.','If the patient is in a river upazila, agree the road pickup point with the dispatcher before you set off.'],
  faqs: [
    {
      q: 'Do you go to Barisal by road or by launch?',
      a: 'By road. Since the Padma Bridge opened, our ambulances drive between Dhaka and Barisal through Bhanga and Gournadi, so the patient stays in one vehicle the whole way.',
    },
    {
      q: 'Can you pick up from Hizla or Mehendiganj?',
      a: 'Tell us where the patient is. For island upazilas, the dispatcher agrees a road pickup point with you before you travel, then confirms the timing and the fare.',
    },
  ],
  nearby: ['Jhalokati', 'Pirojpur', 'Madaripur', 'Gopalganj', 'Khulna'],
  nearbyAnswer: 'We also run journeys from the districts around Barisal to Dhaka, with the fare told before we leave.',
});
