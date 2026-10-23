/**
 * Operational facts the client still has to confirm (Freezer Van brief, Oct 2026, §6–7).
 * Copy that depends on one of these renders only once it is verified: true.
 * Related gates elsewhere: pickupAnyHospital (destinations.ts), fares.freezer (fares.ts),
 * freezerVehicles cabin and family seats (vehicles.ts), business.claims.fareInWritingSopLive.
 */
import type { Verifiable } from './business';

export const ops = {
  /** Papers families should bring (e.g. the death certificate from the hospital). */
  freezerPapers: {
    value: { en: 'Papers the hospital gives you, such as the death certificate', bn: 'হাসপাতালের দেওয়া প্রয়োজনীয় কাগজপত্র, যেমন মৃত্যু সনদ' },
    verified: false,
    note: 'Client to confirm which papers families need for the journey.',
  } as Verifiable<{ en: string; bn: string }>,
  /** Freezer vans run on Eid and public holidays too. */
  holidays: { value: true, verified: false, note: 'Client to confirm Eid and holiday availability.' } as Verifiable<boolean>,
  /** Families abroad can book (not only ask the fare) on WhatsApp. */
  abroadBooking: { value: true, verified: false, note: 'Client to confirm bookings from abroad on WhatsApp.' } as Verifiable<boolean>,
};
