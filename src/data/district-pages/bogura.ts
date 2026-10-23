/** Bogura (Bogra) location page: /ambulance-service-bogura/ (new URL). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const boguraPage = buildDistrictPage({
  key: 'bogura',
  district: 'Bogura',
  aka: 'Bogra',
  slug: '/ambulance-service-bogura/',
  admin: 'Bogura District',
  facts: unconfirmedDistrict('Bogura', {
    destinations: [{ name: 'Shaheed Ziaur Rahman Medical College Hospital', area: 'Bogura town' }],
    areas: ['Satmatha', 'Thanthania', 'Malatinagar', 'Jaleshwaritola', 'Sutrapur'],
    upazilas: [
      { name: 'Bogura Sadar' },
      { name: 'Sherpur' },
      { name: 'Shajahanpur' },
      { name: 'Gabtali' },
      { name: 'Shibganj' },
      { name: 'Kahaloo' },
      { name: 'Nandigram' },
      { name: 'Adamdighi' },
      { name: 'Dupchanchia' },
      { name: 'Sonatola' },
      { name: 'Dhunat' },
      { name: 'Sariakandi', remote: true },
    ],
  }),
  mentions: [{ type: 'City', name: 'Bogra', sameAs: 'https://en.wikipedia.org/wiki/Bogra' }],
  lede: 'Need an ambulance from Bogura (Bogra) to a Dhaka hospital, or further north? Bogura is the gateway to the north on the Dhaka–Rangpur highway. We pick up in town or any upazila and tell you the full fare first.',
  serviceFact: 'Bogura town and its twelve upazilas to Dhaka or any district, and patients coming home to Bogura after treatment.',
  routeFact: 'South on the Dhaka–Rangpur highway through Sherpur, over the Jamuna Bridge, then through Tangail.',
  journeysIntro: 'Bogura sits where the northern roads meet. We run transfers south to Dhaka, and trips home from Dhaka hospitals.',
  journeys: [
    {
      icon: 'route',
      title: 'Bogura to a Dhaka hospital',
      text: 'Referred from Bogura to Dhaka? We collect the patient from the ward or from home near Satmatha or anywhere in the district, then head south on the highway and over the Jamuna. Share the Dhaka hospital and whether a bed is ready.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Sherpur, Shibganj or Dhunat',
      text: 'Sherpur is on the highway itself, Shibganj to the north, and Dhunat and Sariakandi towards the Jamuna. Give us the upazila and a landmark, and the dispatcher plans the pickup around it.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Coming home to Bogura',
      text: 'After treatment in Dhaka, we bring the patient home to Bogura lying down in an AC ambulance. Book ahead, and we time the pickup with the discharge.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Bogura',
      text: 'We are sorry for your loss. We carry your loved one from the Dhaka hospital to the family home in Bogura in a freezer van, over the Jamuna Bridge, with the fare agreed first.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Bogura' },
    },
  ],
  acLine: 'For stable patients between Bogura and Dhaka: referrals and the trip home.',
  route: {
    answer: 'Most journeys between Bogura and Dhaka use the Dhaka–Rangpur highway: south through Sherpur and Sirajganj, over the Jamuna Bridge, then through Tangail. The dispatcher confirms the route on the call.',
    factors: ['Traffic in Bogura town around Satmatha', 'The Jamuna Bridge toll plaza', 'The roads through Tangail and Gazipur', 'Entry into Dhaka', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Bogura', note: 'Pickup' }, { name: 'Sirajganj' }, { name: 'Jamuna Bridge' }, { name: 'Tangail' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up from Bogura town and its upazilas and take the patient to Dhaka or any other district. For chars on the Jamuna, the dispatcher agrees a road pickup point.',
    areasH3: 'Areas in Bogura town',
  },
  fareMore: 'Bogura is about halfway to the far north. We quote from your exact pickup, so a Sherpur trip and a Sonatola trip are priced on their own distance.',
  tipsIntro: 'A few details help the ambulance find the patient in Bogura quickly and calmly.',
  tips: ['In town, Satmatha or a nearby school makes a good landmark.', 'For a char area near the Jamuna, plan the road pickup with the dispatcher.'],
  faqs: [
    {
      q: 'Is it Bogura or Bogra?',
      a: 'Both refer to the same district. Bogura is the current official spelling; many people still write Bogra. Our service covers the whole district either way.',
    },
    {
      q: 'Which route do you take from Bogura to Dhaka?',
      a: 'South on the Dhaka–Rangpur highway, over the Jamuna Bridge and through Tangail. The dispatcher confirms the route on the call.',
    },
  ],
  nearby: ['Rangpur', 'Rajshahi', 'Panchagarh', 'Mymensingh'],
  nearbyAnswer: 'From Bogura, the highway runs on to Rangpur and the far north. We run journeys from these districts to Dhaka too.',
});
