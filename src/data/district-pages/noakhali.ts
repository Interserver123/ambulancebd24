/** Noakhali location page: /ambulance-service-noakhali/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const noakhaliPage = buildDistrictPage({
  key: 'noakhali',
  district: 'Noakhali',
  slug: '/ambulance-service-noakhali/',
  admin: 'Noakhali District',
  facts: unconfirmedDistrict('Noakhali', {
    destinations: [{ name: 'Noakhali 250-bed General Hospital', area: 'Maijdee' }],
    areas: ['Maijdee', 'Maijdee Court', 'Sonapur', 'Chowmuhani', 'Datterhat'],
    upazilas: [
      { name: 'Noakhali Sadar' },
      { name: 'Begumganj' },
      { name: 'Senbagh' },
      { name: 'Sonaimuri' },
      { name: 'Chatkhil' },
      { name: 'Companiganj' },
      { name: 'Kabirhat' },
      { name: 'Subarnachar' },
      { name: 'Hatiya', remote: true },
    ],
  }),
  mentions: [{ type: 'Place', name: 'Noakhali District', sameAs: 'https://en.wikipedia.org/wiki/Noakhali_District' }],
  metaDescription: 'Ambulance from Maijdee, Chowmuhani or Begumganj in Noakhali to Dhaka or any district. {vehicles}, 24/7. Fare first: {phone}.',
  lede: 'Need an ambulance from Noakhali to a Dhaka hospital? We collect patients in Maijdee, Chowmuhani, Begumganj and across the district, drive to Dhaka or any other district, and agree the full fare before the ambulance leaves.',
  serviceFact: 'Maijdee, Chowmuhani and the Noakhali upazilas to Dhaka or any district, and the trip home after treatment.',
  routeFact: 'Through Chowmuhani to the Dhaka–Chattogram highway, then north via Cumilla.',
  journeysIntro: 'Noakhali families often travel to Dhaka for treatment and come back to recover at home. We run both legs.',
  journeys: [
    {
      icon: 'route',
      title: 'Maijdee or Chowmuhani to Dhaka',
      text: 'Referred from the hospital in Maijdee or a clinic in Chowmuhani to Dhaka? We collect the patient at the ward or the clinic door and drive to the Dhaka hospital. Chowmuhani is the busiest part of the district, so tell us the exact building and a nearby landmark.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Chatkhil, Senbagh or Companiganj',
      text: 'The upazilas reach the highway by different roads: Chatkhil and Sonaimuri to the north-west, Companiganj and Kabirhat to the south. The dispatcher plans the pickup around the upazila you give, then confirms the timing.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Recovering at home in Noakhali',
      text: 'After treatment in Dhaka, many patients from Noakhali prefer to recover with family. We bring them home lying down in an AC ambulance and time the pickup with the hospital discharge.',
    },
    {
      icon: 'snow',
      title: 'Bringing a loved one home to Noakhali',
      text: 'We are sorry for your loss. When a family is bringing a loved one home to Noakhali for burial, we carry them in a freezer van with care and respect, to the home or the family graveyard, with the fare agreed first.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Noakhali' },
    },
  ],
  acLine: 'For stable patients between Noakhali and Dhaka: referrals and the trip home to recover.',
  route: {
    answer: 'Most journeys between Noakhali and Dhaka go through Chowmuhani and join the Dhaka–Chattogram highway towards Cumilla. The dispatcher confirms the route on the call.',
    factors: ['Traffic in Chowmuhani bazar', 'The road from the upazila to the highway', 'Traffic on the Dhaka–Chattogram highway', 'Entry into Dhaka', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Maijdee', note: 'Pickup' }, { name: 'Chowmuhani' }, { name: 'Cumilla' }, { name: 'Dhaka', note: 'Hospital or home' }],
    onRoute: { lead: 'The road joins the highway near Cumilla. See our', district: 'Cumilla', anchor: 'ambulance service in Cumilla' },
  },
  pickup: {
    answer: 'We pick up from Maijdee, Chowmuhani and the upazilas of Noakhali and take the patient to Dhaka or any other district. For Hatiya, the dispatcher agrees a mainland pickup point first.',
    areasH3: 'Areas in Maijdee and Chowmuhani',
  },
  fareMore: 'Pickups in Chatkhil or Companiganj are a different distance from Dhaka than Maijdee. That is why we quote from your exact pickup point.',
  tipsIntro: 'Noakhali pickups are smoother when the driver knows the exact place before leaving Dhaka.',
  tips: ['In Chowmuhani, give the name of the clinic or the nearest shop, not just the bazar.', 'For a patient from Hatiya, plan the crossing to the mainland with the dispatcher first.'],
  faqs: [
    {
      q: 'Do you pick up in Chowmuhani?',
      a: 'Yes. Chowmuhani is in Begumganj upazila. Share the clinic or the home address with a landmark, and we confirm the pickup and the fare.',
    },
    {
      q: 'Can you collect a patient from Hatiya?',
      a: 'Hatiya is an island. The ambulance meets the patient on the mainland, and the dispatcher agrees the place and the timing with you.',
      verified: false,
    },
    {
      q: 'Which way do you go from Noakhali to Dhaka?',
      a: 'Through Chowmuhani to the Dhaka–Chattogram highway, then north through Cumilla. The dispatcher confirms the route on the call.',
    },
  ],
  nearby: ['Chittagong', 'Cumilla', 'Chandpur'],
  nearbyAnswer: 'Noakhali sits between Feni, Lakshmipur and Cumilla. We run journeys from the nearby districts to Dhaka too.',
});
