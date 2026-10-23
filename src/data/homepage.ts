/**
 * Copy for the homepage design (reference: "Emergency Ambulance Service" layout, Oct 2026).
 * Shared facts, FAQ and CTA text come from home.ts and business.ts.
 * Anything that depends on an unverified fact is gated where it renders.
 */
import { business, copy, type ServiceKey } from './business';

const phone = business.phone.display;

export const hp = {
  meta: {
    title: 'Ambulance Service in Dhaka 24/7 | Ambulance BD 24',
    description: `24/7 ambulance service in Dhaka: ICU, NICU, AC and freezer van. Nearest ambulance, fare told before we move. Call ${phone}.`,
  },

  topbar: { status: `Dispatch open · ${business.hours.display}`, whatsapp: copy.cta.whatsapp.en },

  header: {
    nav: { ambulances: 'Ambulances', areas: 'Dhaka Areas', districts: 'Districts', about: 'About', contact: 'Contact' },
    allAmbulances: 'All ambulance types',
    allAreas: 'Areas we serve',
    allDistricts: 'Dhaka to districts',
    hotlineLabel: '24/7 Emergency hotline',
    call: `Call ${phone}`,
  },

  hero: {
    eyebrow: `${business.name} · ${business.address.locality}, ${business.address.city} ${business.address.postalCode}`,
    h1Line1: '24/7 Emergency Ambulance',
    h1Line2Lead: 'Service',
    h1Line2In: 'in',
    h1Line2Accent: 'Dhaka',
    leadStrong: copy.tagline.en,
    /** Service list is filled in from the catalogue (only confirmed services). */
    lead: (servicesList: string) =>
      `From our base in ${business.address.locality}, ${business.address.city}, we run ${servicesList} ambulances 24/7, across Dhaka and from Dhaka to every district. Share your pickup location and the patient's condition.`,
    features: [
      { icon: 'first-aid', title: 'Fare confirmed first', text: copy.fareLine.en },
      { icon: 'navigation', title: 'Local dispatch', text: `Nearest ambulance — ${copy.timingLine.inline}.` },
      { icon: 'phone', title: 'One hotline, 24/7', text: 'ICU · NICU · AC · Freezer Van' },
    ],
    openLine: business.hours.display,
    reviewsLink: 'Read our Google reviews',
    rating: (r: { rating: number; count: number }) => `${r.rating} on Google · ${r.count} reviews`,
    tabs: { icu: 'ICU', nicu: 'NICU', ac: 'AC', 'non-ac': 'Non-AC', freezer: 'Freezer Van', 'inter-district': 'Inter-District', air: 'Air' } as Partial<Record<ServiceKey, string>>,
  },


  quick: {
    eyebrow: 'What happens when you call',
    steps: [
      { n: '01', title: 'You call, we answer', text: 'Day or night, a dispatcher answers.' },
      { n: '02', title: 'Tell us two things', text: "Where you are, and the patient's condition." },
      { n: '03', title: 'Fare first, then we move', text: 'We confirm the fare and send the nearest ambulance.' },
    ],
  },

  ambulances: {
    eyebrow: 'Our ambulances',
    h2: 'Which ambulance does the patient need?',
    intro: 'Not sure? Describe the patient on the phone. The dispatcher picks the vehicle — oxygen, stretcher or wheelchair — and tells you the fare.',
    callFor: 'Call about this ambulance',
    details: (title: string) => `View ${title}`,
    cards: [
      {
        key: 'icu',
        title: 'ICU Ambulance',
        text: "Doctor advised an ICU transfer? Tell us the patient's condition. We match the vehicle and tell you the fare first. Crew depends on the case — ask the dispatcher.",
        trips: ['Heart attack or cardiac arrest', 'Stroke', 'Severe breathing difficulty', 'Critical-care hospital transfers'],
      },
      {
        key: 'nicu',
        title: 'NICU Ambulance',
        text: 'Your baby needs a NICU at another hospital? We guide you step by step and tell you the fare first.',
        trips: ['Newborn transfer to a NICU bed', 'Referral to a specialist NICU', 'District hospital to Dhaka', 'Back to a hospital nearer home'],
      },
      {
        key: 'ac',
        title: 'AC Ambulance',
        text: 'Comfortable transport for stable patients who do not need advanced equipment on the way.',
        trips: ['Home to hospital', 'After surgery', 'Routine hospital visits', 'Long-distance transfers'],
      },
      {
        key: 'non-ac',
        title: 'Non-AC Ambulance',
        text: 'A lower-cost option for stable patients on short trips.',
        trips: ['Local hospital transfers', 'Short emergency trips', 'Discharge trips'],
      },
      {
        key: 'freezer',
        title: 'Freezer Van',
        text: 'Taking your loved one home with respect — fare confirmed first.',
        trips: ['Hospital to home', 'To the funeral', 'Long trips to the home district'],
      },
      {
        key: 'inter-district',
        title: 'Inter-District Ambulance',
        text: 'Dhaka to any district and back, in AC, ICU or Freezer Van. We tell you the fare before we dispatch.',
      },
      {
        key: 'air',
        title: 'Air Ambulance',
        text: 'When the distance is too far by road, we arrange an air ambulance through an aviation operator, with our ambulance to and from the airport.',
        trips: ['Long-distance patient transfers', 'Ground ambulance to and from the airport', 'Fare told before we book the flight'],
      },
    ] as { key: ServiceKey; title: string; text: string; trips?: string[] }[],
    tripsLabel: 'Common trips',
    unsure: { lead: 'Still unsure which one? Call', tail: 'and describe the patient.' },
    freezerBn: {
      line: copy.freezerLine.bn,
      cta: copy.cta.freezerCall.bn,
    },
  },

  fareBand: {
    kicker: 'Need an ambulance right now?',
    promiseTitle: 'The fare is told before we move',
    checks: ['Fare told on the call, before dispatch', 'Waiting time and extra stops included', 'No change after the trip'],
    inWriting: 'Sent to you in writing by SMS or WhatsApp',
  },

  timeline: {
    eyebrow: 'How it works',
    h2: 'What happens when you call',
    steps: [
      { n: '01', label: 'You call', title: `Call ${phone}`, text: 'A dispatcher answers, day or night.' },
      {
        n: '02',
        label: 'Where you are',
        title: 'Tell us the pickup point',
        text: 'An address or a landmark is enough: Gulshan Circle, Mirpur 10, Farmgate, Shahbagh.',
      },
      {
        n: '03',
        label: 'The right vehicle',
        title: 'We match the ambulance',
        text: 'Tell us how the patient is. We pick the vehicle and tell you the ETA and the fare.',
      },
      {
        n: '04',
        label: 'On the way',
        title: 'The nearest ambulance leaves',
        text: 'The nearest available ambulance sets off. The fare does not change after the trip.',
      },
    ],
  },

  coverage: {
    eyebrow: 'Areas we serve',
    h2: 'Ambulances across Dhaka, and from Dhaka to every district',
    body: `We dispatch from ${business.address.locality}. The nearest available ambulance goes to you, ${copy.timingLine.inline}.`,
    mapNote: 'Illustrative, not to scale',
    base: 'Dispatch base',
    dhakaH3: 'Dhaka areas',
    areas: [
      { name: 'Mohakhali', hint: 'our base, by the flyover' },
      { name: 'Gulshan', hint: 'Gulshan 1 and 2 circles' },
      { name: 'Banani', hint: 'Banani and Kemal Ataturk Avenue' },
      { name: 'Mirpur', hint: 'Mirpur 10 and around' },
      { name: 'Dhanmondi', hint: 'Road 27 to Satmasjid Road' },
      { name: 'Uttara', hint: 'sectors along Airport Road' },
      { name: 'Mohammadpur', hint: 'Asad Gate to Town Hall' },
      { name: 'Badda', hint: 'Pragati Sarani and Merul Badda' },
      { name: 'Rampura', hint: 'Rampura Bridge and Banasree' },
      { name: 'Tejgaon', hint: 'Farmgate and Tejgaon' },
      { name: 'Old Dhaka', hint: 'Sadarghat to Lalbagh' },
    ],
    districtsH3: 'From Dhaka to districts',
    districts: ['Chittagong', 'Khulna', 'Barisal', 'Rajshahi', 'Jessore', 'Kushtia', 'Noakhali', 'Benapole', 'Gopalganj'],
    anyDistrict: 'Any other district: call us',
    allLink: 'All areas & districts',
    /** Label positions on the illustrative map (percent of the box). */
    mapLabels: [
      { name: 'Uttara', x: 50, y: 10 },
      { name: 'Bashundhara', x: 72, y: 21 },
      { name: 'Mirpur', x: 22, y: 28 },
      { name: 'Banani', x: 57, y: 36 },
      { name: 'Gulshan', x: 68, y: 42 },
      { name: 'Badda', x: 82, y: 53 },
      { name: 'Mohammadpur', x: 20, y: 60 },
      { name: 'Tejgaon', x: 47, y: 64 },
      { name: 'Rampura', x: 78, y: 66 },
      { name: 'Dhanmondi', x: 33, y: 78 },
      { name: 'Old Dhaka', x: 46, y: 92 },
    ],
    basePos: { x: 50, y: 50 },
  },

  destinations: {
    eyebrow: 'Destinations',
    h2: 'Hospitals we take patients to',
    body: 'Name any hospital in Dhaka and we take the patient there. A few common ones:',
    note: 'Listed as destinations only. We have no ties to these hospitals.',
    hospitals: [
      { name: 'Evercare Hospital Dhaka', area: 'Bashundhara', short: 'Evercare' },
      { name: 'United Hospital', area: 'Gulshan', short: 'United' },
      { name: 'Square Hospital', area: 'Panthapath', short: 'Square' },
      { name: 'Labaid Specialized Hospital', area: 'Dhanmondi', short: 'Labaid' },
      { name: 'Dhaka Medical College Hospital (DMCH)', area: 'Shahbagh', short: 'DMCH' },
      { name: 'Ibn Sina Specialized Hospital', area: 'Dhanmondi', short: 'Ibn Sina' },
    ],
  },

  emergencies: {
    eyebrow: 'Any hour',
    h2Lead: 'When to call',
    h2Accent: 'an ambulance',
    body: "Emergencies don't keep office hours. Early morning, late night or in Dhaka's worst traffic, call us for:",
    items: [
      { icon: 'heart-pulse', title: 'Heart attack or cardiac arrest' },
      { icon: 'first-aid', title: 'Stroke' },
      { icon: 'ambulance', title: 'Road accidents' },
      { icon: 'baby', title: 'Pregnancy complications' },
      { icon: 'baby', title: 'A newborn in distress' },
      { icon: 'wind', title: 'Severe breathing difficulty' },
    ],
    asideTitle: 'Not sure what to say?',
    asideText: "Tell us where you are and how the patient is. We'll ask the rest.",
    note: "For police or fire, call 999, Bangladesh's national emergency number.",
  },

  why: {
    eyebrow: 'Why families call us',
    h2Lead: 'Families across Dhaka',
    h2Accent: 'call us first',
    items: [
      { icon: 'clock', title: '24/7 dispatch', text: 'Day or night, a dispatcher answers and sends help.' },
      { icon: 'navigation', title: 'Nearest ambulance', text: 'We send the closest available vehicle to cut the wait.' },
      { icon: 'receipt', title: 'Fare told first', text: `${copy.fareLine.en} No confusion in an emergency.` },
      { icon: 'route', title: 'Drivers who know the way', text: "Our drivers know Dhaka's hospital routes and emergency entrances." },
    ],
  },

  /** Renders only when business.claims.equipmentVerified is true. */
  equipment: {
    eyebrow: "What's on board",
    h2: 'Equipment inside our ambulances',
    body: "Equipment depends on the vehicle. Ask the dispatcher what's on board for your case.",
    photoNote: 'Equipment varies by vehicle',
    groups: [
      {
        title: 'Life support',
        sub: 'For ICU and critical transfers',
        items: [
          { name: 'Ventilator', text: 'Breathing support for critical patients.' },
          { name: 'Defibrillator (AED)', text: 'For cardiac emergencies on the way.' },
          { name: 'Suction machine', text: 'Keeps the airway clear during transport.' },
          { name: 'Infusion pump', text: 'IV fluids and medicine, controlled on the move.' },
        ],
      },
      {
        title: 'Oxygen & monitoring',
        sub: 'Breathing support and readings',
        items: [
          { name: 'Oxygen cylinder', text: 'Main oxygen supply for the journey.' },
          { name: 'Portable oxygen cylinders', text: 'Backup oxygen for longer trips.' },
          { name: 'Oxygen flow meter', text: 'Sets the flow the patient needs.' },
          { name: 'Pulse oximeter', text: 'Blood oxygen readings during transfer.' },
          { name: 'BP monitor & stethoscope', text: 'Basic checks while we drive.' },
        ],
      },
      {
        title: 'Patient handling',
        sub: 'Safe, gentle movement',
        items: [
          { name: 'Folding stretcher & spine board', text: 'For patients who cannot sit or walk.' },
          { name: 'Wheelchair', text: 'For patients who can sit up.' },
          { name: 'Patient transfer trolley', text: 'Easy loading of bed-bound patients.' },
          { name: 'First-aid kit', text: 'Basic emergency kit.' },
        ],
      },
    ],
  },

  reviews: {
    eyebrow: 'Reviews',
    h2: 'What families told Google',
    sub: 'Quoted as written, spelling included.',
    source: 'Google review',
    all: 'Read all reviews on Google',
    allOurs: 'Read all our reviews on Google',
  },

  note: {
    label: 'From our dispatch desk',
    text: "If you're calling in a panic, that's normal. We'll ask where you are, how the patient is and where they need to go. Then we tell you the fare and send the nearest ambulance. Stay on the line if you can.",
    sign: `— The ${business.name} dispatch desk, ${business.address.locality}`,
  },

  findUs: {
    eyebrow: 'Find us',
    h2: `Our dispatch base in ${business.address.locality}`,
    body: 'You never need to come to the base. Call, and the ambulance comes to you.',
    labels: { business: 'Business', address: 'Address', hotline: '24/7 Hotline', hours: 'Hours', email: 'Email' },
    openNow: 'Open now',
    plusCode: `Plus Code: ${business.geo.plusCode} Dhaka`,
    directions: 'Get directions',
    rate: 'Rate us on Google',
    napNote: 'Name, address and phone are the same as our Google Business Profile.',
    mapCaption: 'Map: Google. Ambulances come to your location. No need to visit the base.',
    mapShow: 'Show Google map',
    seeGoogle: 'See us on Google',
    mapOpen: 'Open in Google Maps',
    dispatchTo: 'We dispatch to:',
    chips: ['Gulshan', 'Banani', 'Mohakhali', 'Mirpur', 'Uttara', 'Dhanmondi', 'Mohammadpur', 'Badda', 'Bashundhara', 'Tejgaon', 'Old Dhaka'],
  },

  faq: { eyebrow: 'Questions', h2: 'Questions families ask', aside: 'Still have a question?' },

  callback: {
    eyebrow: 'Callback',
    h2: 'Request a call back',
    h3: 'Planning a discharge or district trip?',
    text: "We'll call you back. For a medical emergency, always call the hotline directly.",
    pickupHint: 'Area, road or a nearby landmark',
  },

  final: {
    eyebrow: business.hours.short,
    tagline: copy.tagline.en,
    h2: `Call ${phone}`,
    text: `${copy.fareLine.en} Nearest ambulance — ${copy.timingLine.inline}.`,
    share: 'Share our number with family',
    shared: 'Number copied',
    shareText: `${business.name}: 24/7 ambulance in Dhaka. Call ${phone}.`,
  },

  footer: {
    tagline: '24/7 · ICU · NICU · AC · Freezer Van · Dhaka & all districts',
    baseTitle: 'Dispatch base',
    openNow: 'Open now · 24/7',
    directions: 'Get directions',
    seeGoogle: 'See us on Google',
    cols: { ambulances: 'Ambulances', areas: 'Dhaka Areas', districts: 'Districts', company: 'Company' },
    hospitalsLead: 'Hospitals we transport to:',
    hospitalsNote: 'Listed as destinations only.',
    backToTop: 'Back to top',
  },
};

export type HomePage = typeof hp;
