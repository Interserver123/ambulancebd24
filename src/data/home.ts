/**
 * English homepage copy, verbatim from docs/homepage-spec.md §3.
 * Phone, hours and address always come from business.ts.
 * The Bangla homepage will add a `bn` object with the same shape.
 */
import { business, copy, type Faq, type ServiceKey } from './business';

const phone = business.phone.display;

export type ServiceCard = { key: ServiceKey; title: string; text: string; anchor: string };

export const homeEn = {
  meta: {
    title: 'Ambulance Service in Dhaka 24/7 | Ambulance BD 24',
    description: `24/7 ambulance service in Dhaka: ICU, NICU, AC and freezer van. Nearest ambulance, fare told before we move. Call ${phone}.`,
  },

  header: {
    services: 'Services',
    areas: 'Areas',
    freezer: 'Freezer Van',
    contact: 'Contact',
    call: `Call ${phone}`,
  },

  hero: {
    eyebrow: '24/7 emergency ambulance · Dhaka',
    h1: '24/7 ambulance service in Dhaka',
    lede: copy.tagline.en,
    body: 'Call and a dispatcher answers. We send the nearest available ambulance and tell you the fare before we move.',
    hotlineLabel: 'Emergency hotline',
    /** Appended to the label only when claims.backupLineLive (deck USP 4 prerequisite). */
    hotlineLabelPersonAnswers: ' — a person answers',
    trust: [business.hours.short, copy.timingLine.chip, 'Fare told before dispatch'],
    /** Cards under the hero. Same facts as the trust row, with an icon each. */
    strip: [
      { icon: 'clock', title: 'Open 24/7', text: business.hours.display },
      { icon: 'route', title: 'Nearest ambulance', text: copy.timingLine.chip },
      { icon: 'receipt', title: 'Fare told first', text: 'Before dispatch, including waiting time and extra stops' },
      { icon: 'ambulance', title: 'One hotline', text: 'ICU, NICU, AC and Freezer Van' },
    ] as const,
    rating: (r: { rating: number; count: number }) => `${r.rating} on Google · ${r.count} reviews`,
  },

  fare: {
    eyebrow: 'Our fare promise',
    h2: 'The fare is told before we move',
    body: "Many families in Dhaka have been quoted one price and charged another. We don't work that way. Before we dispatch, the dispatcher tells you the fare, including waiting time and any extra stops. What we agree is what you pay.",
    checklist: ['Fare told on the call, before dispatch', 'Waiting time and extra stops included in the quote', 'No change after the trip'],
    /** Only when claims.fareInWritingSopLive. */
    inWriting: 'Sent to you in writing by SMS or WhatsApp',
    table: { caption: 'Fare ranges by ambulance type', type: 'Ambulance', range: 'Fare', waiting: 'Waiting, per hour', extraStop: 'Extra stop' },
  },

  areas: {
    eyebrow: 'Coverage',
    h2: 'Ambulance service across Dhaka',
    body: `Our base is in ${business.address.locality}. ${copy.timingLine.en} We cover every area of the city and run trips from Dhaka to any district.`,
    dhakaH3: 'Dhaka areas',
    dhaka: ['Mohakhali', 'Gulshan', 'Banani', 'Mirpur', 'Uttara', 'Dhanmondi', 'Mohammadpur', 'Badda', 'Bashundhara R/A', 'Tejgaon', 'Rampura', 'Old Dhaka'],
    areaAnchor: (area: string) => `Ambulance in ${area}`,
    districtsH3: 'From Dhaka to districts',
    districts: ['Chittagong', 'Khulna', 'Barisal', 'Rajshahi', 'Jessore', 'Kushtia', 'Noakhali', 'Benapole', 'Gopalganj'],
    districtAnchor: (d: string) => `Dhaka to ${d} ambulance`,
    anyDistrict: 'Any other district: call us',
    mapLink: 'Find us on Google Maps',
    mapButton: 'Show map',
    mapPlaceholder: `Our base: ${business.address.display}`,
  },

  reviews: {
    h2: 'What families say',
    source: 'Google review',
    link: 'Read all reviews on Google',
  },

  freezer: {
    h2Bn: 'লাশবাহী ফ্রিজিং গাড়ি — সম্মানের সাথে প্রিয়জনকে বাড়ি পৌঁছে দিই',
    bodyBn:
      'আপনার শোকে আমরা সমব্যথী। ঢাকা থেকে দেশের যেকোনো জেলায় প্রিয়জনের মরদেহ সম্মানের সাথে পৌঁছে দিতে আমরা ফ্রিজিং গাড়ি পাঠাই। রওনা দেওয়ার আগেই ভাড়া জানিয়ে দিই, অপেক্ষার সময়সহ।',
    bodyEn:
      "We're sorry for your loss. We take your loved one home with respect, from Dhaka to any district. The fare, including waiting time, is told before we leave.",
    cta: `${copy.cta.freezerCall.bn}: ${phone}`,
    link: 'লাশবাহী ফ্রিজিং গাড়ি সম্পর্কে বিস্তারিত',
  },

  faq: {
    eyebrow: 'FAQ',
    h2: 'Questions families ask',
    aside: { title: 'Still have a question?', text: 'Call and ask the dispatcher, day or night.' },
    items: [
      { q: 'What is the ambulance number in Dhaka?', a: `Call ${phone}. A dispatcher answers 24 hours a day, 7 days a week.` },
      {
        q: 'How fast can an ambulance reach me?',
        a: `${copy.timingLine.en} The dispatcher tells you the expected arrival time on the call.`,
      },
      {
        q: 'How much does an ambulance cost in Dhaka?',
        a: 'The fare depends on the ambulance type, the distance and any waiting time. We tell you the fare before we dispatch, including waiting and extra stops, and it does not change after the trip.',
      },
      {
        q: 'Which ambulance do I need?',
        a: "Tell the dispatcher the patient's condition and whether they need oxygen, a stretcher or a wheelchair. If a doctor has advised an ICU or NICU transfer, say so. We match the right vehicle.",
      },
      {
        q: 'What should I tell the dispatcher?',
        a: 'Your area and a nearby landmark, the patient\'s condition, where they need to go, and a phone number we can reach.',
      },
      {
        q: 'What types of ambulances do you provide?',
        a: "ICU, NICU, AC and Freezer Van ambulances, in Dhaka and from Dhaka to any district. For distances too far by road, we arrange an air ambulance. Not sure which one? Describe the patient and the dispatcher matches the vehicle.",
      },
      {
        q: 'Do your ambulances carry oxygen and medical equipment?',
        a: 'It depends on the vehicle. Tell the dispatcher what the patient needs, such as oxygen, a stretcher or a wheelchair, and ask what the ambulance carries before it is sent.',
      },
      {
        q: 'Can I book an ambulance for another district?',
        a: 'Yes. We run ambulances from Dhaka to any district, any time. Tell us the pickup point and destination, and we tell you the fare before we dispatch.',
      },
      {
        q: 'Do you have a freezer van?',
        a: 'Yes. We provide freezer vans to take a loved one home with respect, within Dhaka or to any district. The fare is told before we leave.',
      },
      {
        q: 'Is Ambulance BD 24 the same as 999?',
        a: `No. 999 is Bangladesh's national emergency number. Ambulance BD 24 is a separate ambulance service with its own 24/7 hotline, ${phone}.`,
      },
    ] satisfies Faq[],
    /** Only when the WhatsApp number is verified. */
    whatsappItem: {
      q: 'Can I arrange a planned trip on WhatsApp?',
      a: 'Yes. For discharge or district trips, message us on WhatsApp and ask for your fare before you book.',
    } satisfies Faq,
  },

  finalCta: {
    h2: 'Need an ambulance now?',
    bannerText: 'Call and tell us where you are. We send the nearest available ambulance.',
    contact: { hotline: 'Emergency hotline', base: 'Our base', hours: 'Hours', email: 'Email' },
    formIntro: 'Leave your number and a dispatcher will call you back.',
    h3: 'Planning a discharge or district trip?',
    fields: { name: 'Name', phone: 'Phone', pickup: 'Pickup location' },
    button: copy.cta.callback.en,
    helper: "For an emergency, call. It's faster.",
    success: 'Thank you. A dispatcher will call you shortly.',
    error: `We couldn't send your request. Please call ${phone}.`,
  },

  mobileBar: { call: 'Call now', whatsapp: 'WhatsApp' },
};
