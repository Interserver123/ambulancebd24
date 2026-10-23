/** Kushtia location page: /ambulance-service-kushtia/ (existing URL, keep exactly). */
import { unconfirmedDistrict } from '../districts';
import { buildDistrictPage } from './build';

export const kushtiaPage = buildDistrictPage({
  key: 'kushtia',
  district: 'Kushtia',
  slug: '/ambulance-service-kushtia/',
  admin: 'Kushtia District',
  facts: unconfirmedDistrict('Kushtia', {
    destinations: [{ name: 'Kushtia 250-bed General Hospital', area: 'Kushtia town' }],
    areas: ['NS Road', 'Majampur', 'Chourhash', 'Thanapara', 'Courtpara', 'Mangalbaria'],
    upazilas: [{ name: 'Kushtia Sadar' }, { name: 'Kumarkhali' }, { name: 'Khoksa' }, { name: 'Mirpur' }, { name: 'Bheramara' }, { name: 'Daulatpur' }],
  }),
  mentions: [{ type: 'City', name: 'Kushtia', sameAs: 'https://en.wikipedia.org/wiki/Kushtia' }],
  lede: 'Need an ambulance from Kushtia to a Dhaka hospital? We pick up in Kushtia town, Kumarkhali, Bheramara or anywhere in the district, take the road the dispatcher plans for the day, and agree the full fare first.',
  serviceFact: 'Kushtia town and its six upazilas to Dhaka or any district, and the trip home after treatment in Dhaka.',
  routeFact: 'Kushtia has more than one road to Dhaka: via Rajbari and the Padma crossing, or north via the Lalon Shah bridge and the Jamuna Bridge.',
  journeysIntro: 'Kushtia sits on the Padma, between Pabna and Rajbari. The road to Dhaka depends on the day, so every trip starts with a short plan.',
  journeys: [
    {
      icon: 'route',
      title: 'Kushtia to a Dhaka hospital',
      text: 'Referred from Kushtia to Dhaka for specialist care? We collect from the ward in town or from home, and the dispatcher tells you which road we will take and why. Share the Kushtia pickup, the Dhaka hospital and whether a bed is confirmed.',
      needsPickup: true,
    },
    {
      icon: 'navigation',
      title: 'From Bheramara or Daulatpur',
      text: 'Bheramara and Daulatpur are in the north of the district, near the Lalon Shah bridge to Pabna. From there, the northern road can make sense. Give us the upazila and a landmark, and we plan the pickup and the route together.',
      needsPickup: true,
    },
    {
      icon: 'building',
      title: 'Home to Kushtia to recover',
      text: 'After a hospital stay in Dhaka, we take the patient home to Kushtia lying down, timed with the discharge. Share the home address with a landmark such as a bazar, a school or the Lalon shrine area.',
    },
    {
      icon: 'snow',
      title: 'A loved one home to Kushtia',
      text: 'We are sorry for your loss. We carry your loved one from Dhaka to the family home in Kushtia in a freezer van, with care and respect. We tell you the road we will take and the fare before we leave.',
      link: { key: 'freezer', anchor: 'freezer van from Dhaka to Kushtia' },
    },
  ],
  acLine: 'For stable patients between Kushtia and Dhaka: referrals and the trip home after treatment.',
  route: {
    answer: 'Kushtia has two main roads to Dhaka: south-east through Rajbari and across the Padma, or north over the Lalon Shah bridge, through Pabna and over the Jamuna Bridge. The dispatcher picks the one that suits the day and confirms it on the call.',
    factors: ['Which road suits the day: the Padma crossing or the northern bridges', 'Ferry queues, if the route uses a ferry', 'Traffic on the way into Dhaka', 'Where in the district the pickup is', "The patient's needs on the way, as the doctor advised"],
    stops: [{ name: 'Kushtia', note: 'Pickup' }, { name: 'Rajbari' }, { name: 'Padma crossing' }, { name: 'Dhaka', note: 'Hospital or home' }],
  },
  pickup: {
    answer: 'We pick up from Kushtia town and all six upazilas, from Kumarkhali and Khoksa in the east to Bheramara and Daulatpur in the north, and take the patient to Dhaka or any other district.',
    areasH3: 'Areas in Kushtia town',
  },
  fareMore: 'Because Kushtia has more than one road to Dhaka, ask which route the quote is for. We tell you before you agree.',
  tipsIntro: 'With two possible roads, a quick plan on the phone makes the Kushtia trip calmer.',
  tips: ['Ask the dispatcher which road the ambulance will take, so the family travelling separately can follow.', 'Tell us if the patient cannot stay long in a ferry queue.'],
  faqs: [
    {
      q: 'Which road do you take from Kushtia to Dhaka?',
      a: 'Either through Rajbari and across the Padma, or north through Pabna and over the Jamuna Bridge. The dispatcher tells you on the call which suits the day; we do not promise a fixed travel time.',
    },
    {
      q: 'Are ferry fares included?',
      a: 'If the route uses a ferry, the fare we quote before we leave includes it, so there is nothing extra to pay on the way.',
      verified: false,
    },
    {
      q: 'Do you pick up in Bheramara?',
      a: 'Share the address and a landmark. We confirm the pickup, the road and the full fare before we leave.',
    },
  ],
  nearby: ['Jessore', 'Rajshahi', 'Faridpur', 'Khulna'],
  nearbyAnswer: 'Kushtia borders Pabna, Rajbari, Jhenaidah and Chuadanga. We run journeys from the nearby districts to Dhaka too.',
});
