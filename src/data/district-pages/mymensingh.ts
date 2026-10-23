/** Mymensingh location page: /ambulance-service-mymensingh/ (new URL). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const mymensinghPage = buildDistrictPage({
  key: 'mymensingh',
  district: 'Mymensingh',
  slug: '/ambulance-service-mymensingh/',
  admin: 'Mymensingh District',
  facts: unconfirmedDistrict('Mymensingh', {
    destinations: [{ name: 'Mymensingh Medical College Hospital', area: 'Mymensingh city' }],
    areas: ['Charpara', 'Ganginarpar', 'Kachijhuli', 'Notun Bazar', 'Shambhuganj', 'Maskanda', 'Town Hall'],
    upazilas: [
      { name: 'Mymensingh Sadar' },
      { name: 'Trishal' },
      { name: 'Bhaluka' },
      { name: 'Muktagachha' },
      { name: 'Fulbaria' },
      { name: 'Gaffargaon' },
      { name: 'Phulpur' },
      { name: 'Tara Khanda' },
      { name: 'Ishwarganj' },
      { name: 'Nandail' },
      { name: 'Gouripur' },
      { name: 'Haluaghat' },
      { name: 'Dhobaura' },
    ],
  }),
  mentions: [{ type: 'City', name: 'Mymensingh', sameAs: 'https://en.wikipedia.org/wiki/Mymensingh' }],
  metaDescription: 'Ambulance from Mymensingh, Trishal or Bhaluka to Dhaka on the four-lane highway. {vehicles}, 24/7. Fare told first. Call {phone}.',
  lede: 'Need an ambulance from Mymensingh to a Dhaka hospital? Mymensingh is one of the closer district routes, straight down the four-lane highway through Bhaluka and Gazipur. We pick up in the city or any upazila and agree the full fare first.',
  serviceFact: 'Mymensingh city and its upazilas, from Bhaluka to Haluaghat, to Dhaka or any district; and home after treatment.',
  routeFact: 'The Dhaka–Mymensingh highway, through Trishal, Bhaluka and Gazipur.',
  journeysIntro: 'Because Mymensingh is close, families call us for planned referrals and for same-day hospital visits alike.',
  journeys: [
    {
      icon: 'route',
      title: 'Mymensingh to a Dhaka hospital',
      text: 'When the medical college hospital in Mymensingh refers the patient to Dhaka, we collect them at Charpara or wherever they are and drive south on the highway. Tell us the ward, the Dhaka hospital and whether the bed is confirmed.',
      needsPickup: true,
    },
    {
      icon: 'clock',
      title: 'Same-day visits from Mymensingh',
      text: 'A scan, a session or a follow-up in Dhaka, and home the same evening. Ask for a return fare with waiting included, and share the appointment time so we leave Mymensingh with time to spare for Gazipur traffic.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Haluaghat, Phulpur or Gouripur',
      text: 'The northern upazilas, towards the Garo hills, are further from the highway than Trishal or Bhaluka. Share the upazila and a landmark, and the dispatcher plans the pickup and confirms the timing.',
      needsPickup: true,
    },
    {
      icon: 'snow',
      title: 'A loved one home to Mymensingh',
      text: 'We are sorry for your loss. Families from Mymensingh can often hold the janaza the same day. Tell us the village and the time, and we bring your loved one home in a freezer van with the fare agreed first.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Mymensingh' },
    },
  ],
  acLine: 'For stable patients on the Mymensingh highway: referrals, day visits and discharges.',
  route: {
    answer: 'Journeys between Mymensingh and Dhaka use the Dhaka–Mymensingh highway, through Trishal and Bhaluka and then Gazipur. Gazipur is usually the busiest part of the trip. The dispatcher confirms the route on the call.',
    factors: ['Traffic through Gazipur, often the slowest stretch', 'Factory hours along the Bhaluka road', 'City traffic in Mymensingh', 'Waiting at the hospital on same-day trips', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Mymensingh', note: 'Pickup' }, { name: 'Trishal' }, { name: 'Bhaluka' }, { name: 'Gazipur' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up from Mymensingh city and its upazilas, from Bhaluka near Gazipur to Haluaghat and Dhobaura in the north, and take the patient to Dhaka or any other district.',
    areasH3: 'Areas in Mymensingh city',
  },
  fareMore: 'Gazipur traffic is the part of the Mymensingh road that varies most. Share your appointment time, and we plan the departure and quote the waiting around it.',
  tipsIntro: 'Mymensingh trips are shorter, but Gazipur traffic can still upset a plan. These points help.',
  tips: ['For a fixed appointment in Dhaka, tell us the time so we leave early enough.', 'For the northern upazilas, share the nearest bazar or school as a landmark.'],
  faqs: [
    {
      q: 'Can the ambulance wait in Dhaka and bring the patient back to Mymensingh?',
      a: 'Yes. Share the appointment time and how long the visit may take, and ask for a return fare. The waiting at the hospital is included in what we quote.',
    },
    {
      q: 'Which route do you take from Mymensingh to Dhaka?',
      a: 'The Dhaka–Mymensingh highway through Bhaluka and Gazipur. The dispatcher confirms the route on the call; we do not promise a fixed travel time.',
    },
  ],
  nearby: ['Sylhet', 'Bogura', 'Rangpur'],
  nearbyAnswer: 'Mymensingh division also covers Jamalpur, Sherpur and Netrokona. We run journeys from across the north to Dhaka too.',
});
