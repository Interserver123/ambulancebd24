/**
 * Freezer Van, Bangla: /bn/freezer-ambulance-service/ (priority page; most searches are Bangla).
 * Brief: Freezer Van content brief (EN + BN), Oct 2026. Same sections and order as freezer.ts,
 * written natively in Bangla, not translated. Linked to the English page by hreflang.
 *
 * Bangla rules: প্রিয়জন / মরদেহ in body copy, লাশবাহী only in the title, headings and the
 * service name; ফ্রিজার ভ্যান and এম্বুলেন্স only in meta. Bangla digits in copy, Latin digits
 * for the phone number. The Bangla brand name shows only once business.nameBn is verified.
 * No "দ্রুত", no "!", no emojis, no urgency words (the content linter checks the built page).
 *
 * Gated where it renders: same gates as freezer.ts.
 */
import { business, copy, services, shown } from '../business';
import { pickupAnyHospital } from '../destinations';
import { ops } from '../ops';
import { servicePageSchema } from './schema';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));
const brand = shown(business.nameBn) ?? business.name;
const interDistrictBn = services.find((s) => s.key === 'inter-district')!.bn;

export const freezerPageBn = servicePageSchema.parse({
  serviceKey: 'freezer',
  lang: 'bn',
  slug: '/bn/freezer-ambulance-service/',
  metaTitle: `লাশবাহী ফ্রিজিং গাড়ি ঢাকা, ২৪ ঘণ্টা | ${brand}`,
  metaDescription: `প্রিয়জনকে সম্মানের সাথে বাড়ি পৌঁছাতে লাশবাহী ফ্রিজিং গাড়ি, ঢাকা থেকে যেকোনো জেলায়। ভাড়া আগেই জানিয়ে দিই। কল: ${phone}`,
  updated: '2026-10-21',
  byline: `লিখেছে ${business.name}-এর ডিসপ্যাচ টিম, মহাখালী, ঢাকা। ভাড়া বা গাড়ির তথ্য বদলালে আমরা এই পাতা হালনাগাদ করি।`,
  breadcrumb: 'লাশবাহী ফ্রিজিং গাড়ি',
  schema: { name: 'লাশবাহী ফ্রিজিং গাড়ি', serviceType: 'Freezer van (deceased transport)' },
  reviewTags: ['freezer'],
  order: { main: ['explainer', 'proof', 'steps', 'fare', 'coverage'], afterReviews: ['faq', 'related'] },

  hero: {
    eyebrow: 'ফ্রিজিং গাড়ি · ঢাকা · ২৪ ঘণ্টা',
    condolence: 'আপনার শোকে আমরা সমব্যথী।',
    h1: 'লাশবাহী ফ্রিজিং গাড়ি, ঢাকা থেকে দেশের যেকোনো জেলায়',
    lede: copy.freezerLine.bn,
    langNote: { lead: 'Read this page in English:', anchor: 'Freezer van service in Dhaka' },
    calm: true,
    trust: ['২৪ ঘণ্টা, সপ্তাহে ৭ দিন', 'ঢাকা থেকে যেকোনো জেলায়', 'ভাড়া আগেই জানিয়ে দিই, অপেক্ষার সময়সহ'],
    card: {
      title: 'কল করলে আমাদের জানান',
      items: [
        { text: 'কোন হাসপাতাল বা বাসা থেকে নিতে হবে' },
        { text: 'কোন জেলায়, কোন গ্রামে বা ঠিকানায় যেতে হবে' },
        { text: 'পরিবারের কতজন সাথে যাবেন' },
      ],
      footerWithCrew: 'আমরা গাড়ি ও মোট ভাড়া জানিয়ে দিই। আপনার যতটা সময় দরকার, নিন।',
      footer: 'আমরা গাড়ি ও মোট ভাড়া জানিয়ে দিই। আপনার যতটা সময় দরকার, নিন।',
    },
  },

  explainer: {
    h2: 'লাশবাহী ফ্রিজিং গাড়ি কী?',
    definition:
      'ফ্রিজিং গাড়ি হলো ঠান্ডা রাখার ব্যবস্থাসহ একটি বিশেষ গাড়ি, যা পুরো যাত্রায় মরদেহ ঠান্ডা রাখে। ফলে পরিবার প্রিয়জনকে দাফন বা শেষকৃত্যের জন্য নিজের বাড়িতে নিয়ে যেতে পারে, ঢাকা থেকে দূরের জেলাতেও। অনেকে একে ফ্রিজিং অ্যাম্বুলেন্সও বলেন। ঢাকা থেকে অন্য জেলায় লম্বা যাত্রায় এই গাড়িই সবচেয়ে বেশি দরকার হয়।',
    note: {
      h3: 'সিঙ্গেল কেবিন না ডাবল কেবিন?',
      text: 'ফ্রিজিং গাড়ি সাধারণত দুই ধরনের হয়। সিঙ্গেল কেবিনে শুধু চালকের বসার জায়গা থাকে, তাই পরিবারকে আলাদা গাড়িতে যেতে হয়। ডাবল কেবিনে পেছনে আরেক সারি আসন থাকে, ফলে পরিবারের সদস্যরা প্রিয়জনের সাথেই যেতে পারেন।',
      more: 'পরিবারের কতজন সাথে যাবেন জানালে, আপনার যাত্রার জন্য কোন গাড়ি পাওয়া যাবে তা ডিসপ্যাচার জানিয়ে দেবেন।',
    },
    doctorLine: 'রোগী জীবিত থাকলে এবং পথে চিকিৎসা লাগলে, ফ্রিজিং গাড়ি নয়, অ্যাম্বুলেন্স চান। আমরা সঠিক গাড়ি পাঠাব।',
  },

  proof: {
    h2: 'আমাদের ফ্রিজিং গাড়ি',
    pending:
      'আপনি রাজি হওয়ার আগেই ডিসপ্যাচার জানিয়ে দেবেন আপনার যাত্রার জন্য কোন ফ্রিজিং গাড়ি পাওয়া যাবে, সেটি সিঙ্গেল না ডাবল কেবিন, আর পরিবারের কতজন সাথে যেতে পারবেন।',
    equipmentH3: 'গাড়িতে যা আছে',
    crewH3: 'গাড়ির সাথে কে যান',
    cabinLabels: { single: 'সিঙ্গেল কেবিন', double: 'ডাবল কেবিন, পরিবারের জন্য আসনসহ' },
    seatsLine: 'পরিবারের {n} জনের আসন',
    checklistH3: 'গাড়ি নেওয়ার আগে যা জেনে নেবেন',
    checklist: [
      'ফ্রিজিং ঠিকমতো কাজ করছে কি?',
      'পরিবারের কতজন সাথে যেতে পারবেন?',
      'মোট ভাড়া কত, অপেক্ষার সময়সহ?',
      'পথের টোল ও ফেরি ভাড়া কে দেবে?',
    ],
    checklistClose: 'কল করে আমাদের জিজ্ঞেস করুন, সোজাসুজি উত্তর দেব।',
  },

  steps: {
    eyebrow: 'ধাপে ধাপে',
    h2Lead: 'কীভাবে',
    h2Accent: 'কাজ করি',
    intro: 'এই সময়ে সবকিছু একা সামলাতে হবে না। একটি কল করুন, বাকিটা আমরা আপনার পরিবারের সুবিধামতো গুছিয়ে নেব।',
    items: [
      {
        n: '০১',
        label: 'কল বা হোয়াটসঅ্যাপ',
        title: 'কল করুন',
        text: 'প্রিয়জন এখন কোথায় আছেন, পরিবার কোথায় যাবে, আর কতজন সাথে যাবেন, জানান।',
      },
      {
        n: '০২',
        label: 'রওনার আগে',
        title: 'গাড়ির ধরন ও মোট ভাড়া জানাই',
        text: 'অপেক্ষার সময়সহ মোট ভাড়া জানিয়ে দিই। আপনি রাজি হলে তবেই গাড়ি রওনা দেয়।',
      },
      {
        n: '০৩',
        label: 'হাসপাতাল বা বাসা থেকে',
        title: 'সম্মানের সাথে প্রিয়জনকে তুলে নিই',
        text: 'হাসপাতাল ও গেট, অথবা বাসার ঠিকানা জানান। আমরা আপনার কাছে আসি, যত্নের সাথে প্রিয়জনকে গাড়িতে তুলি।',
      },
      {
        n: '০৪',
        label: 'বাড়ির পথে',
        title: 'নির্ধারিত ঠিকানায় পৌঁছে দিই',
        text: 'আপনার দেওয়া ঠিকানায় প্রিয়জনকে পৌঁছে দিই। ভাড়া বদলায় না।',
      },
    ],
    ready: {
      h3: 'সাথে রাখুন',
      items: [
        ...(ops.freezerPapers.verified ? [ops.freezerPapers.value.bn] : []),
        'গন্তব্যের পুরো ঠিকানা, কাছের কোনো চেনা জায়গাসহ',
        'পরিবারের একজনের সচল ফোন নম্বর',
      ],
    },
  },

  fare: {
    eyebrow: 'ভাড়া আগে',
    h2Lead: 'লাশবাহী ফ্রিজিং গাড়ির',
    h2Accent: 'ভাড়া',
    answer: 'ভাড়া মূলত নির্ভর করে দূরত্বের ওপর, সাথে অপেক্ষার সময়। রওনা দেওয়ার আগেই মোট ভাড়া জানিয়ে দিই, পরে আর বদলায় না।',
    more: 'এমন সময়ে কোনো পরিবারের দর কষাকষি করার কথা নয়। কলেই যে ভাড়া ঠিক হয়, সেটাই দেবেন।',
    factorsH3: 'ভাড়া যেসব বিষয়ের ওপর নির্ভর করে',
    tableCaption: 'ঢাকা থেকে ফ্রিজিং গাড়ির ভাড়া',
    tableWithin: 'ঢাকার ভেতরে',
    gateH3: 'হাসপাতালের গেটে কোনো চাপ নয়',
    gateText:
      'সবচেয়ে কঠিন মুহূর্তে হাসপাতালের গেটেই অনেক পরিবারের কাছে গাড়ির লোক চলে আসে। আমাদের সাথে মোট ভাড়া আগেই ফোনে জানতে পারবেন, রাজি হওয়ার আগে। পরে কোনো পরিবর্তন হয় না।',
  },

  coverage: {
    eyebrow: 'কোথায় যাই',
    h2Lead: 'ঢাকা থেকে',
    h2Accent: 'দেশের যেকোনো জেলায়',
    answer: 'আমাদের বেস ঢাকার মহাখালীতে। ঢাকার হাসপাতাল বা বাসা থেকে প্রিয়জনকে নিয়ে দেশের সব জেলায় যাই, দিনে বা রাতে যেকোনো সময়।',
    hospitalsH3: 'ঢাকার যেকোনো হাসপাতাল থেকে',
    hospitalsLead: 'হাসপাতাল ও গেট, অথবা বাসার ঠিকানা জানান। আমরা আপনার কাছে আসব।',
    anyHospitalGate: true,
    districtsH3: 'ঢাকা থেকে জেলায়',
    districtsText: 'পরিবারগুলো যেসব জেলায় প্রিয়জনকে নিয়ে যান, তার কয়েকটি। গন্তব্য জানালে রাজি হওয়ার আগেই মোট ভাড়া জানিয়ে দিই।',
    districtChip: 'ঢাকা থেকে {d}',
    interDistrictAnchor: interDistrictBn,
    longRoute: 'রোগী নিয়ে যাত্রা করছেন?',
    abroad: {
      h3: 'পরিবারের কেউ বিদেশে আছেন?',
      text: 'হোয়াটসঅ্যাপে জানান কোথা থেকে নিতে হবে আর কোথায় যেতে হবে। আমরা মোট ভাড়া জানিয়ে দেব, যাতে দেশে ও বিদেশে থাকা পরিবারের সবাই রওনার আগেই একমত হতে পারেন।',
    },
  },

  reviewsHeading: { eyebrow: 'রিভিউ', h2Lead: 'পরিবারগুলো', h2Accent: 'যা বলেছেন' },

  faq: {
    eyebrow: 'প্রশ্ন',
    h2Lead: 'সাধারণ',
    h2Accent: 'প্রশ্ন',
    items: [
      {
        q: 'লাশবাহী ফ্রিজিং গাড়ির ভাড়া কত?',
        a: 'ভাড়া মূলত দূরত্ব ও অপেক্ষার সময়ের ওপর নির্ভর করে। রওনা দেওয়ার আগেই মোট ভাড়া জানিয়ে দিই, পরে আর বদলায় না।',
        verified: true,
      },
      // Needs the cabin types the client has (vehicles.ts).
      { q: 'সিঙ্গেল আর ডাবল কেবিনের পার্থক্য কী?', a: '', verified: false },
      // Needs family seats per van (vehicles.ts).
      { q: 'পরিবারের কতজন সাথে যেতে পারবেন?', a: '', verified: false },
      {
        q: 'যেকোনো হাসপাতাল থেকে নিতে পারবেন?',
        a: 'হ্যাঁ। হাসপাতাল ও গেট বা ওয়ার্ড, অথবা বাসার ঠিকানা জানান, আমরা আপনার কাছে আসব।',
        verified: pickupAnyHospital.verified,
      },
      {
        q: 'ঢাকার বাইরে যেকোনো জেলায় যান?',
        a: 'হ্যাঁ। ঢাকা থেকে দেশের সব জেলায় প্রিয়জনকে পৌঁছে দিই। গন্তব্য জানালে রাজি হওয়ার আগেই মোট ভাড়া জানিয়ে দিই।',
        verified: true,
      },
      {
        q: 'রাতেও কি পাওয়া যায়?',
        a: `হ্যাঁ। আমরা ২৪ ঘণ্টা, সপ্তাহে ৭ দিন খোলা। যেকোনো সময় কল করুন: ${phone}`,
        verified: true,
      },
      {
        q: 'ঈদ বা ছুটির দিনেও পাওয়া যায়?',
        a: 'হ্যাঁ। ঈদ ও সরকারি ছুটির দিনেও আমাদের ফ্রিজিং গাড়ি চলে। সম্ভব হলে আগে কল করুন, যাতে যাত্রা একসাথে গুছিয়ে নিতে পারি।',
        verified: ops.holidays.verified,
      },
      {
        q: 'কী কী কাগজপত্র লাগবে?',
        a: `${ops.freezerPapers.value.bn} এবং গন্তব্যের পুরো ঠিকানা সাথে রাখুন।`,
        verified: ops.freezerPapers.verified,
      },
      {
        q: 'বিদেশ থেকে কি বুকিং দেওয়া যায়?',
        a: 'হ্যাঁ। হোয়াটসঅ্যাপে জানান কোথা থেকে নিতে হবে আর কোথায় যেতে হবে। আমরা মোট ভাড়া জানিয়ে দেব, বিদেশ থেকেই বুকিং দিতে পারবেন।',
        verified: wa && ops.abroadBooking.verified,
      },
      // Needs tolls and ferries confirmed as a fare factor (fares.ts).
      { q: 'টোল ও ফেরি ভাড়া কি মোট ভাড়ার মধ্যে?', a: '', verified: false },
    ],
  },

  related: {
    eyebrow: 'আরও সেবা',
    h2Lead: 'একই নম্বরে',
    h2Accent: 'অন্য সেবা',
    items: [{ key: 'inter-district', anchor: interDistrictBn, text: 'রোগী নিয়ে ঢাকা থেকে যেকোনো জেলায় যাতায়াতের জন্য, ভাড়া আগেই নিশ্চিত।' }],
    homeLead: 'অন্য যেকোনো প্রয়োজনে দেখুন:',
    homeAnchor: 'ঢাকায় ২৪ ঘণ্টা অ্যাম্বুলেন্স সেবা',
  },

  napHeading: {
    eyebrow: 'ঠিকানা',
    h2Lead: 'আমাদের',
    h2Accent: 'ডিসপ্যাচ বেস',
    body: 'বেসে আসার দরকার নেই। কল করুন, আমরা হাসপাতাল বা বাসায় আসব।',
  },

  final: {
    h2Lead: 'আমরা',
    h2Accent: 'পাশে আছি',
    text: `${copy.freezerLine.bn} যেকোনো সময় কল করুন, বাকিটা আমরা দেখব।`,
    h3: copy.cta.callback.bn,
    formHelper: 'সুবিধামতো সময়ে আমরা কল করব। এখনই কথা বলতে চাইলে কল করুন।',
  },
});
