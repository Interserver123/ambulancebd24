/** Panchagarh location page: /ambulance-service-panchagarh/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const panchagarhPage = buildDistrictPage({
  key: 'panchagarh',
  district: 'Panchagarh',
  slug: '/ambulance-service-panchagarh/',
  admin: 'Panchagarh District',
  facts: unconfirmedDistrict('Panchagarh', {
    destinations: [{ name: 'Panchagarh Sadar Hospital', area: 'Panchagarh town' }],
    upazilas: [{ name: 'Panchagarh Sadar' }, { name: 'Boda' }, { name: 'Debiganj' }, { name: 'Atwari' }, { name: 'Tetulia' }],
  }),
  mentions: [{ type: 'Place', name: 'Panchagarh District', sameAs: 'https://en.wikipedia.org/wiki/Panchagarh_District' }],
  lede: 'Need an ambulance from Panchagarh to a Dhaka hospital? Panchagarh is at the northern tip of Bangladesh, one of the longest routes from Dhaka. We plan the trip with you, pick up in town, Tetulia, Boda or Debiganj, and agree the full fare first.',
  serviceFact: 'Panchagarh town, Tetulia, Boda, Debiganj and Atwari to Dhaka or any district, and the long road home after treatment.',
  routeFact: 'South through Rangpur and Bogura on the northern highway, over the Jamuna Bridge.',
  localFact: { term: 'Far north', value: 'Panchagarh is the northernmost district. A Dhaka trip is a full day on the road, so we plan it ahead with you.' },
  emergencyMore: 'For many families in Panchagarh, the first step is the hospital in town or in Rangpur. Call us when the doctor advises moving the patient to Dhaka.',
  journeysIntro: 'Nothing about a Panchagarh trip is rushed. We agree the timing, the stops and the fare before the ambulance sets off north.',
  journeys: [
    {
      icon: 'route',
      title: 'Panchagarh to a Dhaka hospital',
      text: 'When a doctor in Panchagarh, or in Rangpur on the way, refers the patient to Dhaka, we collect them and drive the whole length of the country in one vehicle. Share the pickup, the Dhaka hospital and the confirmed admission date, so we can arrive in time.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Tetulia or Debiganj',
      text: 'Tetulia sits at the very top of the country near Banglabandha; Debiganj is to the south-east, towards Nilphamari. Give us the upazila and a landmark, and the dispatcher plans the pickup and the road south.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'The long road home to Panchagarh',
      text: 'After treatment in Dhaka, the journey back to Panchagarh is the longest part of recovery for many families. We drive it lying down, with rest stops, and keep the family informed along the way.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Panchagarh',
      text: 'We are sorry for your loss. Taking a loved one home to Panchagarh means a long day on the road. We carry them in a freezer van with care and respect, and agree the fare on the call so nothing needs discussing on the way.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Panchagarh' },
    },
  ],
  acLine: 'For stable patients on the very long Panchagarh road, with rest stops planned.',
  route: {
    answer: 'Most journeys between Panchagarh and Dhaka run south through Rangpur and Bogura on the northern highway, cross the Jamuna Bridge and continue through Tangail. The dispatcher confirms the route on the call.',
    factors: ['The length of the trip and the rest stops it needs', 'Town traffic in Rangpur and Bogura', 'The Jamuna Bridge toll plaza', 'Entry into Dhaka', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Panchagarh', note: 'Pickup' }, { name: 'Rangpur' }, { name: 'Bogura' }, { name: 'Jamuna Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
    onRoute: { lead: 'The road passes through Rangpur. See our', district: 'Rangpur', anchor: 'ambulance service in Rangpur' },
  },
  pickup: {
    answer: 'We pick up from Panchagarh town and all five upazilas, from Tetulia in the north to Debiganj in the south-east, and take the patient to Dhaka or any other district.',
    upazilasH3: 'Upazilas of Panchagarh',
  },
  fareMore: 'This is one of the longest trips we run. Ask whether the quote includes the ambulance returning to Dhaka and any overnight waiting; we say it plainly.',
  tipsIntro: 'A full day on the road needs more planning than a city transfer.',
  tips: ['Confirm the Dhaka admission date first, then book the ambulance for the day before or the same morning.', 'Pack water, food and anything the patient needs for a long day.'],
  faqs: [
    {
      q: 'Do you really go to Panchagarh and Tetulia?',
      a: 'Yes. Share the address and a landmark, and the dispatcher plans the trip and tells you the full fare before we leave Dhaka.',
    },
    {
      q: 'Which route do you take from Panchagarh to Dhaka?',
      a: 'South through Rangpur and Bogura, over the Jamuna Bridge and through Tangail. We do not promise a fixed travel time; the dispatcher gives an estimate on the call.',
    },
  ],
  nearby: ['Rangpur', 'Bogura'],
  nearbyAnswer: 'Panchagarh borders Thakurgaon, Dinajpur and Nilphamari. We run journeys from the northern districts to Dhaka too.',
});
