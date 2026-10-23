/** Sylhet location page: /ambulance-service-sylhet/ (new URL). */
import { business, shown } from '../business';
import { unconfirmedDistrict } from '../districts';
import { longTrip } from '../routes';
import { buildDistrictPage } from './build';

/** Booking (and paying) from abroad waits for longTrip.bookFromAbroad. */
const abroad = Boolean(shown(business.whatsapp)) && longTrip.bookFromAbroad.verified;

export const sylhetPage = buildDistrictPage({
  key: 'sylhet',
  district: 'Sylhet',
  slug: '/ambulance-service-sylhet/',
  admin: 'Sylhet District',
  facts: unconfirmedDistrict('Sylhet', {
    destinations: [{ name: 'Sylhet MAG Osmani Medical College Hospital', area: 'Sylhet city' }],
    areas: ['Zindabazar', 'Amberkhana', 'Chowhatta', 'Shahjalal Upashahar', 'Subhanighat', 'Tilagor', 'Kumarpara', 'Bandar Bazar'],
    upazilas: [
      { name: 'Sylhet Sadar' },
      { name: 'Dakshin Surma' },
      { name: 'Golapganj' },
      { name: 'Beanibazar' },
      { name: 'Bishwanath' },
      { name: 'Balaganj' },
      { name: 'Osmani Nagar' },
      { name: 'Fenchuganj' },
      { name: 'Jaintiapur' },
      { name: 'Gowainghat' },
      { name: 'Kanaighat' },
      { name: 'Zakiganj' },
      { name: 'Companiganj', remote: true },
    ],
  }),
  mentions: [{ type: 'City', name: 'Sylhet', sameAs: 'https://en.wikipedia.org/wiki/Sylhet' }],
  metaDescription: 'Ambulance from Sylhet city or any upazila to Dhaka via Moulvibazar and Bhairab. {vehicles}, 24/7. Fare told first. Call {phone}.',
  lede: 'Need an ambulance from Sylhet to a Dhaka hospital, or for a parent in Sylhet while you live abroad? We pick up in Sylhet city or any upazila, drive the Dhaka–Sylhet highway, and tell you the full fare before we leave.',
  serviceFact: 'Sylhet city and its upazilas to Dhaka or any district, and the trip home to Sylhet after treatment.',
  routeFact: 'The Dhaka–Sylhet highway, through Moulvibazar and Habiganj districts, over the Meghna at Bhairab and through Narsingdi.',
  localFact: { term: 'Families abroad', value: 'Many Sylheti families live in the UK, Europe and the Middle East, so a son or daughter abroad is often the one on the phone with the dispatcher.' },
  journeysIntro: 'Sylhet calls often come from two places at once: the family at the hospital, and a relative on the phone from abroad. We keep both informed.',
  journeys: [
    {
      icon: 'route',
      title: 'Sylhet to a Dhaka hospital',
      text: 'When the doctors at the medical college hospital in Sylhet refer the patient to a Dhaka team, we collect from the ward or from home in Zindabazar, Amberkhana or wherever they are, and drive down the highway. Share the ward, the Dhaka hospital and when the patient can leave.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'Arranging care for a parent from abroad',
      text: 'If you live abroad and your mother or father in Sylhet needs to reach a Dhaka hospital, you can arrange it from where you are. Send the address in Sylhet, the hospital in Dhaka and the patient’s needs, and agree the fare before we leave.',
      needsPickup: true,
      verified: abroad,
    },
    {
      icon: 'building',
      title: 'Home to Sylhet after Dhaka treatment',
      text: 'After treatment in Dhaka, we bring the patient home to Sylhet lying down, up the highway through Bhairab. Share the discharge time and a landmark near home, whether in the city or in Beanibazar, Golapganj or Bishwanath.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Sylhet',
      text: 'We are sorry for your loss. We carry your loved one from the Dhaka hospital to the family home or graveyard in Sylhet in a freezer van, with care and respect. If family members are flying in, tell us, and we plan the timing with you.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Sylhet' },
    },
  ],
  acLine: 'For stable patients between Sylhet and Dhaka: referrals and the trip home.',
  route: {
    answer: 'Most journeys between Sylhet and Dhaka use the Dhaka–Sylhet highway, through Moulvibazar and Habiganj districts, across the Meghna at Bhairab and on through Narsingdi. The dispatcher confirms the route on the call.',
    factors: ['City traffic in Sylhet around Zindabazar', 'The Meghna crossing at Bhairab', 'Traffic through Narsingdi into Dhaka', 'Rest stops on a long journey', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Sylhet', note: 'Pickup' }, { name: 'Habiganj' }, { name: 'Bhairab' }, { name: 'Narsingdi' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up from hospitals and homes across Sylhet city and its upazilas, from Beanibazar and Golapganj to Jaintiapur and Gowainghat, and take the patient to Dhaka or any other district.',
    areasH3: 'Areas in Sylhet city',
  },
  fareMore: 'Ask us to send the agreed fare on WhatsApp, so the family in Sylhet and any relatives abroad see the same number.',
  tipsIntro: 'When the family is split between Sylhet and abroad, a little coordination helps.',
  tips: ['Give us one local phone number in Sylhet for the driver, and one for the relative abroad.', 'Share the Dhaka hospital name and ward before the ambulance leaves Sylhet.'],
  faqs: [
    {
      q: 'Can I book an ambulance for my parent in Sylhet from the UK?',
      a: 'Send the address in Sylhet, the hospital in Dhaka and the patient’s needs on WhatsApp. We confirm the fare before we leave and keep you updated.',
      verified: abroad,
    },
    {
      q: 'Which route do you take from Sylhet to Dhaka?',
      a: 'The Dhaka–Sylhet highway, across the Meghna at Bhairab and through Narsingdi. We do not promise a fixed travel time; the dispatcher gives an estimate on the call.',
    },
    {
      q: 'Do you pick up in Beanibazar, Golapganj and Bishwanath?',
      a: 'Share the address and a landmark. We confirm the pickup, the timing and the full fare before we leave.',
    },
  ],
  nearby: ['Mymensingh', 'Cumilla', 'Chittagong'],
  nearbyAnswer: 'Sylhet division also includes Moulvibazar, Habiganj and Sunamganj. We run journeys from the nearby districts to Dhaka too.',
});
