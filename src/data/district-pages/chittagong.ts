/** Chittagong (Chattogram) location page: /ambulance-service-in-chittagong/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const chittagongPage = buildDistrictPage({
  key: 'chittagong',
  district: 'Chittagong',
  aka: 'Chattogram',
  slug: '/ambulance-service-in-chittagong/',
  admin: 'Chattogram District',
  facts: unconfirmedDistrict('Chittagong', {
    destinations: [{ name: 'Chattogram Medical College Hospital', area: 'Panchlaish' }],
    areas: ['Agrabad', 'GEC Circle', 'Nasirabad', 'Panchlaish', 'Halishahar', 'Chawkbazar', 'Bahaddarhat', 'Muradpur', 'Oxygen', 'Patenga'],
    upazilas: [
      { name: 'Sitakunda' },
      { name: 'Mirsharai' },
      { name: 'Hathazari' },
      { name: 'Raozan' },
      { name: 'Rangunia' },
      { name: 'Fatikchhari' },
      { name: 'Boalkhali' },
      { name: 'Patiya' },
      { name: 'Karnaphuli' },
      { name: 'Anwara' },
      { name: 'Chandanaish' },
      { name: 'Satkania' },
      { name: 'Lohagara' },
      { name: 'Banshkhali' },
      { name: 'Sandwip', remote: true },
    ],
  }),
  mentions: [{ type: 'City', name: 'Chittagong', sameAs: 'https://en.wikipedia.org/wiki/Chittagong' }],
  lede: 'Need an ambulance from Chittagong (Chattogram) to a Dhaka hospital, or to another district? We collect from any part of the port city or the upazilas around it, drive the Dhaka–Chattogram highway, and tell you the full fare before we leave.',
  serviceFact: 'Chattogram city and its upazilas to Dhaka or any district; patients returning from Dhaka to Chattogram; loved ones taken home.',
  routeFact: 'The Dhaka–Chattogram highway (N1), through Feni, Cumilla and over the Meghna Bridge.',
  localFact: { term: 'Long route', value: 'Chattogram is one of the longest regular routes from Dhaka, so most trips are booked a few hours ahead.' },
  emergencyMore: 'Chattogram has large hospitals of its own. Call us when the treating doctor decides the patient should move to Dhaka or another district.',
  journeysIntro: 'Most Chattogram calls are planned transfers: a referral to Dhaka, a move closer to family, or the journey home after treatment.',
  journeys: [
    {
      icon: 'route',
      title: 'Chattogram to a Dhaka specialist hospital',
      text: 'When the doctors in Chattogram refer a patient to a Dhaka hospital for a specialist team or a procedure, we collect from the ward in Panchlaish, Agrabad or wherever the patient is, and drive up the N1. Share the ward, the Dhaka hospital that accepted the patient, and the time the doctors will release them.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Sitakunda, Patiya or Banshkhali',
      text: 'Pickups north and south of the city join the highway at different points. Mirsharai and Sitakunda are on the N1 itself; Patiya, Anwara and Banshkhali come across the Karnaphuli first. Give us the upazila and a landmark, and the dispatcher plans the pickup around it.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Chattogram after Dhaka treatment',
      text: 'After an operation or a course of treatment in Dhaka, many families bring the patient back to Chattogram to recover at home. We drive them back down the highway lying down, with stops when the patient needs them. Book a day ahead so we can match the discharge.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Chattogram',
      text: 'We are sorry for your loss. The road from Dhaka to Chattogram is long, and the family is often travelling with the van. We carry your loved one home with care and respect, and the fare is settled on the call before we leave.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Chittagong' },
    },
  ],
  acLine: 'For stable patients on the long Chattogram highway: referrals to Dhaka and the trip home after treatment.',
  route: {
    answer: 'Most journeys between Chittagong and Dhaka use the Dhaka–Chattogram highway (N1), through Feni and Cumilla and over the Meghna Bridge. The dispatcher confirms the route on the call.',
    factors: [
      'City traffic leaving Chattogram, around Oxygen, Bahaddarhat or the port area',
      'Market towns on the N1, such as Cumilla and Feni',
      'Traffic at the Meghna Bridge and the entry into Dhaka',
      'Rest stops on a long journey',
      "The patient's needs on the way, as the doctor advised",
    ],
    stops: [
      { name: 'Chattogram', note: 'Pickup' },
      { name: 'Feni' },
      { name: 'Cumilla' },
      { name: 'Meghna Bridge' },
      { name: 'Dhaka', note: 'Hospital or home' },
    ],
    onRoute: { lead: 'The highway passes through Cumilla. See our', district: 'Cumilla', anchor: 'ambulance service in Cumilla' },
  },
  pickup: {
    answer: 'We pick up from hospitals and homes across Chattogram city, from Patenga to Oxygen, and from the upazilas around it, then drive to Dhaka or any other district. For Sandwip, the dispatcher agrees a mainland pickup point with you.',
    areasH3: 'Areas in Chattogram city',
  },
  fareMore: 'The Chattogram route is long, so ask whether a quote covers the return of the ambulance to Dhaka. We say it plainly on the call.',
  tipsIntro: 'A long highway trip goes better when the details are settled before the ambulance reaches Chattogram.',
  tips: [
    'Confirm the bed at the Dhaka hospital before the patient leaves Chattogram.',
    'Tell us how many family members are travelling, so we can plan for the long trip.',
  ],
  faqs: [
    {
      q: 'Do you pick up from anywhere in Chattogram city?',
      a: 'Share the hospital and ward, or the home address with a landmark such as GEC Circle or Agrabad, and the dispatcher confirms the pickup and the full fare.',
    },
    {
      q: 'Which road do you take from Chittagong to Dhaka?',
      a: 'Most trips use the Dhaka–Chattogram highway (N1) through Feni and Cumilla. We do not promise a fixed travel time; the dispatcher gives an estimate on the call.',
    },
    {
      q: 'Can you collect a patient from Sandwip?',
      a: 'Sandwip is an island, so the ambulance meets the patient on the mainland side. The dispatcher agrees the meeting point and the timing with you.',
      verified: false,
    },
  ],
  nearby: ['Noakhali', 'Cumilla', 'Chandpur', 'Sylhet'],
  nearbyAnswer: 'We run journeys from the other districts on the Chattogram side of the country to Dhaka as well.',
});
