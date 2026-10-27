/**
 * Site chrome strings (header, footer, reviews, NAP, FAQ aside, form, fare checklist)
 * in English and Bangla. English values are the existing homepage strings, so English
 * pages render exactly as before. Phone, hours and address facts come from business.ts.
 *
 * Bangla rules (CLAUDE.md, brand deck): Bangla digits in copy, Latin digits for the
 * phone number only; অ্যাম্বুলেন্স spelling; no unverified Bangla brand name.
 */
import { business, copy } from './business';
import { homeEn } from './home';
import { hp } from './homepage';
import { warm } from './home-warm';

export type Lang = 'en' | 'bn';

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
/** Latin digits to Bangla digits (never use on the phone number). */
export const bnDigits = (s: string | number) => String(s).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]!);
/** Digits in the page language. */
export const digits = (lang: Lang, s: string | number) => (lang === 'bn' ? bnDigits(s) : String(s));

const phone = business.phone.display;

/** Bangla names for the district chips (keys match homeEn.areas.districts). */
const districtsBn: Record<string, string> = {
  Chittagong: 'চট্টগ্রাম',
  Khulna: 'খুলনা',
  Barisal: 'বরিশাল',
  Rajshahi: 'রাজশাহী',
  Jessore: 'যশোর',
  Kushtia: 'কুষ্টিয়া',
  Noakhali: 'নোয়াখালী',
  Benapole: 'বেনাপোল',
  Gopalganj: 'গোপালগঞ্জ',
};

const en = {
  dateLocale: 'en-GB',
  /** Sentence end after an inline link. */
  stop: '.',
  home: 'Home',
  hoursShort: business.hours.short,
  hoursDisplay: business.hours.display,
  address: business.address.display,
  locality: business.address.locality,
  header: {
    links: { ambulances: 'Ambulances', how: 'How it works', areas: 'Areas', faq: 'FAQ', contact: homeEn.header.contact },
    nav: {
      home: 'Home',
      services: 'Services',
      allServices: 'All ambulance services',
      about: 'About',
      locations: 'Locations',
      interDistrict: 'Inter-District',
      interDistrictHint: 'Dhaka to any district',
      insideDhaka: 'Inside Dhaka',
      insideDhakaHint: 'Every area of Dhaka city',
      blog: 'Blog',
    },
    call: homeEn.header.call,
    callShort: homeEn.mobileBar.call,
    menu: 'Menu',
    menuClose: 'Close menu',
    menuLabel: 'Site menu',
    homeLabel: `${business.name} home`,
  },
  mobileBar: homeEn.mobileBar,
  /** callCalm: Freezer Van pages (no urgency words). */
  cta: { call: copy.cta.call.en, callCalm: copy.cta.call.en, whatsapp: copy.cta.whatsapp.en, callback: copy.cta.callback.en },
  footer: {
    /** "a person answers" is USP #4: only once business.claims.backupLineLive is true. */
    hotline: 'Emergency hotline',
    personAnswers: 'a person answers 24/7',
    open247: 'open 24/7',
    callNow: 'Call now',
    /** Freezer Van pages: no urgency words. */
    callCalm: 'Call us',
    backToTop: 'Back to top',
    waMessage: 'Hi, I need an ambulance fare. Pickup: … Destination: …',
    trust: ['Fare told before dispatch', 'ICU, NICU, AC and Freezer Van on one hotline', 'Dhaka and all 64 districts'],
    /** Approved timing line (business.copy.timingLine). No Bangla version approved yet. */
    timing: copy.timingLine.chip as string | undefined,
    helper: 'Not sure which ambulance? Describe the patient. We match the vehicle.',
    baseTitle: 'Our dispatch base',
    plusCode: 'Plus Code',
    follow: 'Follow us',
    directions: 'Get directions',
    reviews: 'See our Google reviews',
    rating: (rating: string, count: string) => `${rating} · ${count} reviews`,
    socialLabel: (network: string) => `${business.name} on ${network}`,
    headings: { services: 'Ambulance services', areas: 'Dhaka areas', districts: 'Districts', coverage: 'Where we go', help: 'Help' },
    areasHub: 'Areas we serve in Dhaka',
    serviceAnchors: {
      icu: 'ICU ambulance in Dhaka',
      nicu: 'NICU ambulance for newborns',
      ac: 'AC ambulance in Dhaka',
      freezer: 'Freezer van',
      'inter-district': 'Dhaka to district ambulance',
      air: 'Air ambulance',
    },
    /** Bangla name after the English Freezer Van anchor (brief: "Freezer van (লাশবাহী ফ্রিজিং গাড়ি)"). */
    freezerBn: 'লাশবাহী ফ্রিজিং গাড়ি',
    areaAnchor: (area: string) => `Ambulance in ${area}`,
    districtAnchor: (d: string) => `Dhaka to ${d} ambulance`,
    help: { fare: 'How our fare works', guides: 'Ambulance guides', about: 'About us', contact: 'Contact', callback: 'Request a call back' },
    /** Link to the other language, written in that language. */
    otherLang: 'বাংলা',
    legal: { privacy: 'Privacy policy', terms: 'Terms', disclaimer: 'Disclaimer' },
  },
  reviews: { sub: hp.reviews.sub, source: hp.reviews.source, allOurs: hp.reviews.allOurs, widgetLabel: 'Google reviews' },
  findUs: {
    labels: hp.findUs.labels,
    plusCode: hp.findUs.plusCode as string | undefined,
    directions: hp.findUs.directions,
    seeGoogle: hp.findUs.seeGoogle,
    napNote: hp.findUs.napNote,
    mapCaption: hp.findUs.mapCaption,
    mapShow: hp.findUs.mapShow,
    mapOpen: hp.findUs.mapOpen,
    base: hp.coverage.base,
  },
  post: {
    eyebrow: 'Ambulance guide',
    published: 'Published',
    updated: 'Updated',
    toc: 'In this guide',
    asideTitle: 'Need an ambulance now?',
    ourService: 'Our service',
    seeService: 'See the service',
    bandTitle: 'Need this for your family?',
    bandText: 'Call and tell us where you are and how the patient is.',
    bandOr: 'Or read about our',
    moreTitleLead: 'More',
    moreTitleAccent: 'guides',
    readGuide: 'Read the guide',
    allGuides: 'All guides',
    finalLead: 'Need an',
    finalAccent: 'ambulance now?',
    finalText: 'Call and tell us where you are and how the patient is. We tell you the fare before we dispatch.',
    breadcrumb: 'Breadcrumb',
    blog: 'Blog',
    emergencyLabel: '24/7 ambulance service in Dhaka',
    areasLabel: 'Ambulance in every area of Dhaka',
    fallbackLabel: 'Our ambulance service',
  },
  faq: { lastUpdated: 'Last updated', asideTitle: warm.faq.asideTitle, asideText: warm.faq.asideText },
  final: {
    share: hp.final.share,
    shared: hp.final.shared,
    shareText: hp.final.shareText,
    contact: homeEn.finalCta.contact,
    formIntro: warm.final.formIntro,
  },
  form: {
    fields: homeEn.finalCta.fields,
    button: homeEn.finalCta.button,
    helper: homeEn.finalCta.helper,
    success: homeEn.finalCta.success,
    error: homeEn.finalCta.error,
  },
  fare: { checklist: homeEn.fare.checklist, inWriting: homeEn.fare.inWriting },
  coverage: {
    seeLead: 'See our',
    areaAnchor: homeEn.areas.areaAnchor,
    districtAnchor: homeEn.areas.districtAnchor,
    districtName: (d: string) => d,
  },
  compareSr: 'Compare',
};

/** Same shape as the English strings, with plain string types (the English values are `as const` literals). */
type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> };
export type Ui = Widen<typeof en>;

const bn: Ui = {
  dateLocale: 'bn-BD',
  stop: '।',
  home: 'হোম',
  hoursShort: '২৪ ঘণ্টা, সপ্তাহে ৭ দিন',
  hoursDisplay: '২৪ ঘণ্টা খোলা, সপ্তাহে ৭ দিন',
  address: 'মহাখালী, ঢাকা ১২১২, বাংলাদেশ',
  locality: 'মহাখালী',
  header: {
    links: { ambulances: 'অ্যাম্বুলেন্স', how: 'কীভাবে কাজ করি', areas: 'এলাকা', faq: 'প্রশ্ন', contact: 'যোগাযোগ' },
    nav: {
      home: 'হোম',
      services: 'সেবাসমূহ',
      allServices: 'সব অ্যাম্বুলেন্স সেবা',
      about: 'আমাদের সম্পর্কে',
      locations: 'লোকেশন',
      interDistrict: 'জেলা থেকে জেলা',
      interDistrictHint: 'ঢাকা থেকে যেকোনো জেলায়',
      insideDhaka: 'ঢাকা শহরের ভেতরে',
      insideDhakaHint: 'ঢাকা শহরের সব এলাকায়',
      blog: 'ব্লগ',
    },
    call: `কল করুন: ${phone}`,
    callShort: 'কল করুন',
    menu: 'মেনু',
    menuClose: 'মেনু বন্ধ করুন',
    menuLabel: 'সাইট মেনু',
    homeLabel: `${business.name} হোম`,
  },
  mobileBar: { call: 'কল করুন', whatsapp: 'হোয়াটসঅ্যাপ' },
  cta: { call: copy.cta.call.bn, callCalm: `${copy.cta.freezerCall.bn}: ${phone}`, whatsapp: copy.cta.whatsapp.bn, callback: copy.cta.callback.bn },
  footer: {
    hotline: 'জরুরি হটলাইন',
    personAnswers: '২৪ ঘণ্টা একজন মানুষ ফোন ধরেন',
    open247: '২৪ ঘণ্টা খোলা',
    callNow: 'এখনই কল করুন',
    callCalm: copy.cta.freezerCall.bn,
    backToTop: 'উপরে ফিরে যান',
    waMessage: 'হ্যালো, অ্যাম্বুলেন্সের ভাড়া জানতে চাই। কোথা থেকে: … কোথায়: …',
    trust: ['রওনার আগেই ভাড়া জানাই', 'আইসিইউ, এনআইসিইউ, এসি ও ফ্রিজিং গাড়ি এক হটলাইনে', 'ঢাকা ও দেশের ৬৪ জেলা'],
    timing: undefined,
    helper: 'কোন অ্যাম্বুলেন্স লাগবে বুঝতে পারছেন না? রোগীর অবস্থা জানান, আমরা গাড়ি ঠিক করে দেব।',
    baseTitle: 'আমাদের ডিসপ্যাচ বেস',
    plusCode: 'প্লাস কোড',
    follow: 'আমাদের ফলো করুন',
    directions: 'পথ দেখুন',
    reviews: 'গুগলে আমাদের রিভিউ দেখুন',
    rating: (rating: string, count: string) => `${rating} · ${count}টি রিভিউ`,
    socialLabel: (network: string) => `${network}-এ ${business.name}`,
    headings: { services: 'অ্যাম্বুলেন্স সেবা', areas: 'ঢাকার এলাকা', districts: 'জেলা', coverage: 'কোথায় যাই', help: 'সহায়তা' },
    areasHub: 'ঢাকায় আমাদের এলাকা',
    serviceAnchors: {
      icu: 'ঢাকায় আইসিইউ অ্যাম্বুলেন্স',
      nicu: 'নবজাতকের জন্য এনআইসিইউ অ্যাম্বুলেন্স',
      ac: 'ঢাকায় এসি অ্যাম্বুলেন্স',
      freezer: 'লাশবাহী ফ্রিজিং গাড়ি',
      'inter-district': 'ঢাকা থেকে জেলায় অ্যাম্বুলেন্স',
      air: 'এয়ার অ্যাম্বুলেন্স',
    },
    freezerBn: '',
    areaAnchor: (area: string) => `${area}-এ অ্যাম্বুলেন্স`,
    districtAnchor: (d: string) => `ঢাকা থেকে ${districtsBn[d] ?? d} অ্যাম্বুলেন্স`,
    help: { fare: 'আমাদের ভাড়া যেভাবে ঠিক হয়', guides: 'অ্যাম্বুলেন্স গাইড', about: 'আমাদের সম্পর্কে', contact: 'যোগাযোগ', callback: copy.cta.callback.bn },
    otherLang: 'English',
    legal: { privacy: 'গোপনীয়তা নীতি', terms: 'শর্তাবলি', disclaimer: 'দায়মুক্তি' },
  },
  reviews: { sub: 'যেমন লেখা হয়েছে, তেমনই তুলে দেওয়া।', source: 'গুগল রিভিউ', allOurs: 'গুগলে আমাদের সব রিভিউ পড়ুন', widgetLabel: 'গুগল রিভিউ' },
  findUs: {
    labels: { business: 'প্রতিষ্ঠান', address: 'ঠিকানা', hotline: '২৪ ঘণ্টার হটলাইন', hours: 'সময়', email: 'ইমেইল' },
    // The Plus Code has Latin digits; Bangla pages leave it out.
    plusCode: undefined,
    directions: 'পথ দেখুন',
    seeGoogle: 'গুগলে আমাদের দেখুন',
    napNote: 'নাম, ঠিকানা ও ফোন নম্বর আমাদের গুগল বিজনেস প্রোফাইলের সাথে মিলে যায়।',
    mapCaption: 'মানচিত্র: গুগল। গাড়ি আপনার ঠিকানায় যায়, বেসে আসার দরকার নেই।',
    mapShow: 'গুগল ম্যাপ দেখুন',
    mapOpen: 'গুগল ম্যাপে খুলুন',
    base: 'ডিসপ্যাচ বেস',
  },
  post: {
    eyebrow: 'অ্যাম্বুলেন্স গাইড',
    published: 'প্রকাশিত',
    updated: 'হালনাগাদ',
    toc: 'এই গাইডে',
    asideTitle: 'এখনই অ্যাম্বুলেন্স লাগবে?',
    ourService: 'আমাদের সেবা',
    seeService: 'সেবাটি দেখুন',
    bandTitle: 'আপনার পরিবারের জন্য লাগবে?',
    bandText: 'কল করে জানান আপনি কোথায় আছেন আর রোগী কেমন আছেন।',
    bandOr: 'অথবা পড়ুন:',
    moreTitleLead: 'আরও',
    moreTitleAccent: 'গাইড',
    readGuide: 'গাইডটি পড়ুন',
    allGuides: 'সব গাইড',
    finalLead: 'এখনই',
    finalAccent: 'অ্যাম্বুলেন্স লাগবে?',
    finalText: 'কল করে জানান আপনি কোথায় আছেন আর রোগী কেমন আছেন। যাওয়ার আগে ভাড়া জানিয়ে দিই।',
    breadcrumb: 'ব্রেডক্রাম্ব',
    blog: 'ব্লগ',
    emergencyLabel: 'ঢাকায় ২৪ ঘণ্টা জরুরি অ্যাম্বুলেন্স সার্ভিস',
    areasLabel: 'ঢাকার সব এলাকা',
    fallbackLabel: 'আমাদের অ্যাম্বুলেন্স সেবা',
  },
  faq: { lastUpdated: 'সর্বশেষ হালনাগাদ', asideTitle: 'আরও কিছু জানতে চান?', asideText: 'দিনে বা রাতে, যেকোনো সময় কল করে জিজ্ঞেস করুন।' },
  final: {
    share: 'পরিবারের সাথে নম্বরটি শেয়ার করুন',
    shared: 'নম্বর কপি হয়েছে',
    shareText: `${business.name}: ঢাকায় ২৪ ঘণ্টা অ্যাম্বুলেন্স ও ফ্রিজিং গাড়ি। কল: ${phone}`,
    contact: { hotline: 'হটলাইন', base: 'আমাদের বেস', hours: 'সময়', email: 'ইমেইল' },
    formIntro: 'আপনার নম্বর রেখে যান, আমরা কল করে নেব।',
  },
  form: {
    fields: { name: 'নাম', phone: 'ফোন নম্বর', pickup: 'কোথা থেকে নিতে হবে' },
    button: copy.cta.callback.bn,
    helper: 'এখনই কথা বলতে চাইলে সরাসরি কল করুন।',
    success: 'ধন্যবাদ। একজন ডিসপ্যাচার শিগগির আপনাকে কল করবেন।',
    error: `অনুরোধটি পাঠানো যায়নি। অনুগ্রহ করে কল করুন: ${phone}`,
  },
  fare: {
    checklist: ['কলেই ভাড়া জানিয়ে দিই, রওনার আগে', 'অপেক্ষার সময় ও পথে থামা ভাড়ার মধ্যেই', 'যাত্রার পরে ভাড়া বদলায় না'],
    inWriting: 'এসএমএস বা হোয়াটসঅ্যাপে লিখিতভাবে পাঠাই',
  },
  coverage: {
    seeLead: 'আরও দেখুন:',
    areaAnchor: (area: string) => `${area}-এ অ্যাম্বুলেন্স`,
    districtAnchor: (d: string) => `ঢাকা থেকে ${districtsBn[d] ?? d}`,
    districtName: (d: string) => districtsBn[d] ?? d,
  },
  compareSr: 'তুলনা',
};

export const ui: Record<Lang, Ui> = { en, bn };
