/**
 * Microcopy for the warm design preview. Facts, CTAs and FAQ come from home.ts;
 * this file only adds friendlier connecting lines. Same YMYL rules apply
 * (no new claims, timing only via the approved line, fare wording from the deck).
 */
import { homeEn } from './home';

export const warm = {
  meta: homeEn.meta,
  hero: {
    status: 'Open right now, day and night',
    h1Lead: '24/7 ambulance service',
    h1Accent: 'in Dhaka',
    nudge: "Tell us where you are. We'll take it from there.",
    hotlineHint: 'Save it in your phone, just in case.',
    copy: 'Copy number',
    copied: 'Copied',
    dispatchNote: "Can't answer everything? That's fine, we'll ask.",
  },
  services: {
    eyebrow: 'Our ambulances',
    h2Lead: 'Which ambulance',
    h2Accent: 'do you need?',
    helpTitle: 'Not sure which one?',
    helpText: "That's what we're here for. Tell the dispatcher the patient's condition and we'll match the right vehicle.",
  },
  how: { eyebrow: "Here's how a call goes", h2Lead: 'What happens', h2Accent: 'when you call' },
  fare: { eyebrow: 'No surprises', h2Lead: 'The fare is told', h2Accent: 'before we move' },
  areas: { eyebrow: 'Where we go', h2Lead: 'Ambulance service', h2Accent: 'across Dhaka' },
  faq: {
    eyebrow: 'Good questions',
    h2Lead: 'Questions',
    h2Accent: 'families ask',
    asideTitle: 'Still wondering?',
    asideText: 'Ask us anything, day or night.',
  },
  final: {
    h2Lead: 'Need an ambulance',
    h2Accent: 'now?',
    text: homeEn.finalCta.bannerText,
    formIntro: 'Planning ahead? Leave your number and a dispatcher will call you back.',
  },
  footer: { sign: 'Here for Dhaka, day and night.', backToTop: 'Back to top' },
  destinations: { eyebrow: 'Where we take you', h2Lead: 'Hospitals we', h2Accent: 'take patients to' },
  reviews: { eyebrow: 'Kind words', h2Lead: 'What families', h2Accent: 'told Google' },
  findUs: { eyebrow: 'Our home base', h2Lead: 'Find us in', h2Accent: 'Mohakhali' },
  equipment: { eyebrow: "What's on board", h2Lead: 'Equipment inside', h2Accent: 'our ambulances' },
};
