/**
 * Bangla hub: /bn/ ("ঢাকায় অ্যাম্বুলেন্স সার্ভিস"). The Bangla entry point for emergency searches
 * in Bangla. Paired with the English homepage by hreflang. It links down to the Bangla service pages
 * that exist (ICU, AC, Freezer Van) and to the English pages for the rest, marked as English.
 * Written natively in Bangla. Same rules as the Bangla service pages: অ্যাম্বুলেন্স in copy
 * (এম্বুলেন্স only in meta), Bangla digits except the phone number, ভাড়া, only the approved
 * timing line, no prices, equipment, crew or hospital-partnership claims.
 */
import { business, copy, shown } from './business';

const phone = business.phone.display;
const wa = Boolean(shown(business.whatsapp));
const brand = shown(business.nameBn) ?? business.name;

export const bnHub = {
  slug: '/bn/',
  metaTitle: `ঢাকায় এম্বুলেন্স সার্ভিস, ২৪ ঘণ্টা | ${brand}`,
  metaDescription: `ঢাকায় ২৪ ঘণ্টা এম্বুলেন্স: আইসিইউ, এনআইসিইউ, এসি ও ফ্রিজিং গাড়ি। ${copy.fareLine.bn} কল: ${phone}`,
  updated: '2026-11-11',
  hero: {
    eyebrow: 'জরুরি অ্যাম্বুলেন্স · ঢাকা · ২৪ ঘণ্টা',
    h1: 'ঢাকায় অ্যাম্বুলেন্স সার্ভিস, ২৪ ঘণ্টা',
    lede: `${copy.tagline.bn} কল করলে ডিসপ্যাচার ধরেন। রোগীর অবস্থা ও আপনার ঠিকানা জানান, আমরা উপযুক্ত অ্যাম্বুলেন্স ঠিক করি।`,
    langNote: { lead: 'Read this page in English:', anchor: 'Ambulance service in Dhaka' },
    trust: ['২৪ ঘণ্টা, সপ্তাহে ৭ দিন', copy.timingLine.bn, 'ভাড়া আগেই জানিয়ে দিই'],
    card: {
      title: 'কল করলে জানান',
      items: [
        { text: 'আপনি কোথায় আছেন: এলাকা ও একটি চেনা জায়গা, অথবা হাসপাতাল ও ওয়ার্ড', notAClaim: false },
        { text: 'রোগীর অবস্থা, আর চিকিৎসক কী পরামর্শ দিয়েছেন', notAClaim: false },
        { text: 'কোথায় যেতে হবে: হাসপাতাল, বাসা বা অন্য জেলা', notAClaim: false },
      ],
      footerWithCrew: 'আমরা গাড়ি ও ভাড়া জানিয়ে দিই।',
      footer: 'আমরা গাড়ি ও ভাড়া জানিয়ে দিই।',
    },
  },
  services: {
    eyebrow: 'আমাদের সেবা',
    h2Lead: 'যাত্রার জন্য উপযুক্ত',
    h2Accent: 'অ্যাম্বুলেন্স বেছে নিন',
    intro: 'প্রতিটি সেবার আলাদা পাতা আছে: কীভাবে কাজ করে, পরিবারগুলো কী জানতে চায়, আর কলের সময় কী জানাবেন।',
    more: 'আরও পড়ুন',
    englishNote: '(ইংরেজি পাতা)',
    cards: [
      { key: 'icu', text: 'চিকিৎসক আইসিইউ সহায়তায় রোগীকে অন্য হাসপাতালে নিতে বলেছেন।' },
      { key: 'ac', text: 'জরুরি যাত্রা, ছাড়পত্রের পর বাসায় ফেরা বা চেক-আপে ঠান্ডা, আরামদায়ক গাড়ি।' },
      { key: 'freezer', text: 'প্রিয়জনকে সম্মানের সাথে বাড়ি পৌঁছে দিতে, ঢাকা থেকে যেকোনো জেলায়।' },
      { key: 'nicu', text: 'অন্য হাসপাতালের এনআইসিইউতে নবজাতককে নিতে।' },
      { key: 'inter-district', text: 'ঢাকা থেকে যেকোনো জেলায় ও ফেরার পথে, রওনার আগেই ভাড়া জানিয়ে দিই।' },
      { key: 'air', text: 'সড়কপথে দূরত্ব অনেক বেশি হলে। এয়ার অ্যাম্বুলেন্স একটি বিমান অপারেটরের মাধ্যমে ব্যবস্থা করা হয়।' },
    ] as const,
  },
  areas: {
    eyebrow: 'ঢাকার এলাকা',
    h2Lead: 'ঢাকার যেকোনো এলাকায়',
    h2Accent: 'অ্যাম্বুলেন্স',
    intro: `আমাদের বেস ঢাকার ${business.address.locality}-এ। ${copy.timingLine.bn}। এলাকা অনুযায়ী পাতাগুলো ইংরেজিতে আছে।`,
    englishNote: '(ইংরেজি পাতা)',
    list: [
      { name: 'মহাখালী', path: '/ambulance-service-mohakhali/' },
      { name: 'গুলশান', path: '/ambulance-service-gulshan/' },
      { name: 'মিরপুর', path: '/ambulance-service-mirpur/' },
      { name: 'উত্তরা', path: '/ambulance-service-uttara/' },
    ],
    allAreas: { anchor: 'ঢাকার সব এলাকা', path: '/ambulance-service-areas-dhaka/' },
  },
  fare: {
    eyebrow: 'ভাড়া আগে',
    h2Lead: 'রওনার আগেই',
    h2Accent: 'ভাড়া জানিয়ে দিই',
    body: `${copy.fareLine.bn} ভাড়া নির্ভর করে গাড়ির ধরন, দূরত্ব ও অপেক্ষার সময়ের ওপর, তাই কলে${wa ? ' বা হোয়াটসঅ্যাপে' : ''} ডিসপ্যাচার তা নিশ্চিত করেন। ঠিক হওয়া ভাড়া ট্রিপের পরে বদলায় না।`,
  },
  faq: {
    eyebrow: 'প্রশ্ন',
    h2Lead: 'সাধারণ',
    h2Accent: 'প্রশ্ন',
    items: [
      {
        q: 'কোন অ্যাম্বুলেন্স লাগবে, বুঝব কীভাবে?',
        a: `কে যাবেন, চিকিৎসকের পরামর্শ, কোথা থেকে নিতে হবে আর গন্তব্য কোথায়, ডিসপ্যাচারকে জানান। আমরা উপযুক্ত গাড়ি ঠিক করে আপনাকে জানাই। কল করুন: ${phone}।`,
      },
      {
        q: 'অ্যাম্বুলেন্স রওনা দেওয়ার আগে কি ভাড়া জানান?',
        a: `হ্যাঁ। ${copy.fareLine.bn} ভাড়া নির্ভর করে গাড়ির ধরন, দূরত্ব ও অপেক্ষার সময়ের ওপর, তাই কলে${wa ? ' বা হোয়াটসঅ্যাপে' : ''} তা নিশ্চিত করি।`,
      },
      {
        q: 'রাতেও কি অ্যাম্বুলেন্স পাওয়া যায়?',
        a: `হ্যাঁ। আমরা ২৪ ঘণ্টা, সপ্তাহে ৭ দিন খোলা। যেকোনো সময় কল করুন: ${phone}।`,
      },
      {
        q: 'এয়ার অ্যাম্বুলেন্স কি আপনাদের নিজস্ব বিমান?',
        a: 'না। আমরা একটি বিমান অপারেটরের মাধ্যমে এয়ার অ্যাম্বুলেন্স ট্রান্সফারের ব্যবস্থা করি, আর বিমানবন্দর থেকে ও বিমানবন্দরে রোগীকে আমাদের স্থলপথের অ্যাম্বুলেন্সে নিই।',
      },
    ],
  },
  nap: { eyebrow: 'ঠিকানা', h2Lead: 'আমাদের', h2Accent: 'ডিসপ্যাচ বেস', body: 'সব সেবা ঢাকার মহাখালী থেকে পাঠানো হয়। বেসে আসার দরকার নেই, কল করুন।' },
  final: {
    h2Lead: 'এখনই অ্যাম্বুলেন্স',
    h2Accent: 'লাগবে?',
    text: 'কল করে রোগীর অবস্থা ও যাত্রার কথা জানান। আমরা আগে গাড়ি ও ভাড়া নিশ্চিত করি।',
  },
};
