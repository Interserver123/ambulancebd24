/** Jhalokati location page: /ambulance-service-in-jhalokati/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const jhalokatiPage = buildDistrictPage({
  key: 'jhalokati',
  district: 'Jhalokati',
  aka: 'Jhalakathi',
  slug: '/ambulance-service-in-jhalokati/',
  admin: 'Jhalokati District',
  facts: unconfirmedDistrict('Jhalokati', {
    destinations: [{ name: 'Jhalokati Sadar Hospital', area: 'Jhalokati town' }],
    upazilas: [{ name: 'Jhalokati Sadar' }, { name: 'Nalchity' }, { name: 'Rajapur' }, { name: 'Kathalia' }],
  }),
  mentions: [{ type: 'Place', name: 'Jhalokati District', sameAs: 'https://en.wikipedia.org/wiki/Jhalokati_District' }],
  lede: 'Need an ambulance from Jhalokati to a Dhaka hospital, or to Barishal on the way? We collect the patient in Jhalokati town, Nalchity, Rajapur or Kathalia, drive to Dhaka or any district, and agree the full fare before we leave.',
  serviceFact: "Jhalokati town, Nalchity, Rajapur and Kathalia to Dhaka or any district, plus the journey home after treatment.",
  routeFact: 'Through Barishal and Bhanga, then over the Padma Bridge into Dhaka.',
  journeysIntro: 'Jhalokati is a small district next to Barishal, so many trips start at the sadar hospital or at home. Most are planned a few hours ahead.',
  journeys: [
    {
      icon: 'route',
      title: 'Jhalokati to a Dhaka hospital',
      text: 'When a doctor in Jhalokati refers the patient to Dhaka, we collect them from the hospital or home and take them straight to the Dhaka hospital, without changing vehicles in Barishal. Tell the dispatcher the pickup in Jhalokati, the Dhaka hospital, and when the patient will be ready.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'Jhalokati to Barishal, then onward',
      text: 'Sometimes the doctor first sends the patient to a hospital in Barishal city. If the plan then changes to Dhaka, call us from Barishal and we pick up there. Tell us both hospitals so the dispatcher can quote each part of the journey clearly.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Jhalokati after treatment',
      text: 'Coming back to Nalchity or Rajapur after an operation in Dhaka? We drive the patient home in one go, without a change at Barishal. Give us the discharge time and a landmark such as the bazar or mosque near the house.',
    },
    {
      icon: 'snow',
      title: 'Taking a loved one home to Jhalokati',
      text: 'We are sorry for your loss. When a family from Jhalokati loses someone in a Dhaka hospital, we take your loved one home in a freezer van, all the way to the house or the graveyard, with the fare settled on the call.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Jhalokati' },
    },
  ],
  acLine: 'For stable patients between Jhalokati and Dhaka: referrals, discharges and planned check-ups.',
  route: {
    answer: 'Most journeys between Jhalokati and Dhaka go through Barishal and Bhanga and cross the Padma Bridge. The dispatcher confirms the route on the call.',
    factors: ['The road through Barishal city', 'The Padma Bridge toll plaza', 'Traffic on the way into Dhaka', 'Pickups in Kathalia or Rajapur, further from the highway', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Jhalokati', note: 'Pickup' }, { name: 'Barishal' }, { name: 'Bhanga' }, { name: 'Padma Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
    onRoute: { lead: 'The road passes through Barisal. See our', district: 'Barisal', anchor: 'ambulance service in Barisal' },
  },
  pickup: {
    answer: 'We pick up from hospitals and homes in Jhalokati town and its four upazilas, and take the patient to Dhaka or any other district.',
    upazilasH3: 'Upazilas of Jhalokati',
  },
  fareMore: 'For a Jhalokati trip, the fare covers the whole road to Dhaka, so you do not pay again in Barishal. Ask whether the return leg is included; we say it plainly.',
  tipsIntro: 'A few small things make the Jhalokati pickup smoother.',
  tips: [
    'If the doctor sends the patient to Barishal first, keep that hospital\'s papers with the Jhalokati ones.','Give the dispatcher a landmark near the home, such as a school, bazar or mosque, so the driver finds you in town.'],
  faqs: [
    {
      q: 'Do I need to change ambulances in Barishal?',
      a: 'No. The same ambulance collects the patient in Jhalokati and drives all the way to the hospital in Dhaka.',
    },
    {
      q: 'Do you pick up in Kathalia and Rajapur?',
      a: 'Tell us the exact address and a landmark, and the dispatcher confirms the pickup, the timing and the full fare before we leave.',
    },
  ],
  nearby: ['Barisal', 'Pirojpur', 'Madaripur', 'Gopalganj'],
  nearbyAnswer: 'Jhalokati sits between Barishal and Pirojpur. We run journeys from these districts to Dhaka too.',
});
