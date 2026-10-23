/** Cumilla (Comilla) location page: /ambulance-service-cumilla/ (new URL). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const cumillaPage = buildDistrictPage({
  key: 'cumilla',
  district: 'Cumilla',
  aka: 'Comilla',
  slug: '/ambulance-service-cumilla/',
  admin: 'Cumilla District',
  facts: unconfirmedDistrict('Cumilla', {
    destinations: [{ name: 'Cumilla Medical College Hospital', area: 'Cumilla city' }],
    areas: ['Kandirpar', 'Tomsom Bridge', 'Shasongacha', 'Racecourse', 'Jhawtola', 'Chawkbazar', 'Paduar Bazar'],
    upazilas: [
      { name: 'Cumilla Adarsha Sadar' },
      { name: 'Cumilla Sadar Dakshin' },
      { name: 'Burichang' },
      { name: 'Chandina' },
      { name: 'Daudkandi' },
      { name: 'Debidwar' },
      { name: 'Muradnagar' },
      { name: 'Homna' },
      { name: 'Barura' },
      { name: 'Laksam' },
      { name: 'Chauddagram' },
      { name: 'Nangalkot' },
      { name: 'Brahmanpara' },
    ],
  }),
  mentions: [{ type: 'City', name: 'Comilla', sameAs: 'https://en.wikipedia.org/wiki/Comilla' }],
  lede: 'Need an ambulance from Cumilla (Comilla) to a Dhaka hospital? Cumilla is on the Dhaka–Chattogram highway, one of the nearer district routes. We pick up in the city or any upazila and tell you the full fare before we leave.',
  serviceFact: 'Cumilla city, Daudkandi, Laksam and the other upazilas to Dhaka or any district, and the trip home after treatment.',
  routeFact: 'North on the Dhaka–Chattogram highway (N1), through Daudkandi and over the Meghna Bridge.',
  journeysIntro: 'Cumilla is close enough to Dhaka for same-day hospital visits, and many patients also move to Dhaka for longer treatment.',
  journeys: [
    {
      icon: 'route',
      title: 'Cumilla to a Dhaka hospital',
      text: 'When the doctors in Cumilla refer the patient to Dhaka, we collect them from the hospital or from home in Kandirpar, Shasongacha or wherever they are, and drive north on the highway. Tell us the Dhaka hospital and whether it has confirmed the admission.',
      needsPickup: true,
    },
    {
      icon: 'clock',
      title: 'Same-day treatment visits',
      text: 'Patients from Cumilla often go to Dhaka for a test, a session or a follow-up and come home the same day. Ask for a return fare with waiting included, and share the appointment time so we plan around it.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Discharge home to Cumilla',
      text: 'After a stay in a Dhaka hospital, the drive home to Cumilla is short, but the patient may still need to lie down. Send the discharge time and the home address with a landmark near the city or upazila.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Cumilla',
      text: 'We are sorry for your loss. Families from Cumilla can usually hold the janaza the same day. Tell us the village and the time, and we bring your loved one home in a freezer van with the fare agreed first.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Cumilla' },
    },
  ],
  acLine: 'For stable patients on the short Cumilla route: referrals, same-day visits and discharges.',
  route: {
    answer: 'Journeys between Cumilla and Dhaka use the Dhaka–Chattogram highway (N1), through Daudkandi and over the Meghna Bridge. The dispatcher confirms the route on the call.',
    factors: ['Traffic in Cumilla city and at Kandirpar', 'The Meghna Bridge and Daudkandi', 'Entry into Dhaka at busy times', 'Waiting at the hospital on same-day trips', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Cumilla', note: 'Pickup' }, { name: 'Daudkandi' }, { name: 'Meghna Bridge' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up across Cumilla city and its upazilas, from Daudkandi and Homna near Dhaka to Laksam and Chauddagram in the south, and take the patient to Dhaka or any other district.',
    areasH3: 'Areas in Cumilla city',
  },
  fareMore: 'For a same-day visit, a return fare with waiting is usually clearer than two one-way trips. Ask for both on the call.',
  tipsIntro: 'Cumilla trips are shorter, so families often book on the day. These points still help.',
  tips: ['Share the appointment time for same-day visits, so the waiting is planned.', 'In the city, a landmark like Kandirpar or Tomsom Bridge helps the driver.'],
  faqs: [
    {
      q: 'Can you do a return trip from Cumilla to Dhaka in one day?',
      a: 'Yes. Ask for a return fare and tell us how long the hospital visit may take. Waiting is part of the quote we give you first.',
    },
    {
      q: 'Do you pick up in Laksam and Chauddagram?',
      a: 'Share the address and a landmark. The dispatcher confirms the pickup, the timing and the full fare on the call.',
    },
  ],
  nearby: ['Chandpur', 'Noakhali', 'Chittagong', 'Sylhet'],
  nearbyAnswer: 'Cumilla is on the main road between Dhaka and Chattogram. We run journeys from the districts along it to Dhaka too.',
});
