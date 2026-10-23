/**
 * Dhaka ⇄ district routes for the inter-district hub (/inter-district-ambulance-service/),
 * plus the long-trip facts the client still has to confirm.
 *
 * Rows: districts with their own page first (names match the districts collection `district`
 * field, so the table links to a page as soon as it is published), then the routes customers
 * ask about most, as plain text until their pages exist.
 *
 * distanceKm: approximate road distance from Mohakhali. It renders only with distanceChecked: true.
 * Check each one on Google Maps (driving, from Mohakhali) before flipping the flag.
 * Never add journey times here.
 *
 * fares: per vehicle type, in ৳. Render only with faresVerified: true (and then also feed the
 * Service offers in JSON-LD through fares.ts if wanted).
 */
import { z } from 'astro/zod';
import { fareRange } from './fares';

export const routeSchema = z.object({
  /** Name as used on the site (and in the districts collection). */
  district: z.string().min(2),
  /** Current official spelling, shown under the name (e.g. Chattogram). */
  aka: z.string().min(2).optional(),
  /** 'town' for a place that is not a district (Benapole). Towns stay out of areaServed. */
  kind: z.enum(['district', 'town']).default('district'),
  division: z.string().min(2),
  /** Main road or crossing. Omit when the usual road is not clear. */
  via: z.string().min(2).optional(),
  distanceKm: z.number().int().positive(),
  distanceChecked: z.boolean().default(false),
  fares: z.object({ ac: fareRange.optional(), icu: fareRange.optional(), freezer: fareRange.optional() }).default({}),
  faresVerified: z.boolean().default(false),
});
export type Route = z.infer<typeof routeSchema>;

const N1 = 'Dhaka–Chattogram Highway';
const PADMA = 'Padma Bridge';
const JAMUNA = 'Jamuna Bridge';

export const routes: Route[] = z.array(routeSchema).parse([
  // District pages (existing URLs)
  { district: 'Chittagong', aka: 'Chattogram', division: 'Chattogram', via: N1, distanceKm: 250 },
  { district: 'Khulna', division: 'Khulna', via: PADMA, distanceKm: 220 },
  { district: 'Barisal', aka: 'Barishal', division: 'Barishal', via: PADMA, distanceKm: 170 },
  { district: 'Rajshahi', division: 'Rajshahi', via: JAMUNA, distanceKm: 250 },
  { district: 'Jessore', aka: 'Jashore', division: 'Khulna', via: PADMA, distanceKm: 170 },
  { district: 'Kushtia', division: 'Khulna', distanceKm: 190 },
  { district: 'Noakhali', division: 'Chattogram', via: N1, distanceKm: 165 },
  { district: 'Benapole', aka: 'Jashore district', kind: 'town', division: 'Khulna', via: PADMA, distanceKm: 205 },
  { district: 'Gopalganj', division: 'Dhaka', via: PADMA, distanceKm: 135 },
  { district: 'Madaripur', division: 'Dhaka', via: PADMA, distanceKm: 100 },
  { district: 'Jhalokati', aka: 'Jhalakathi', division: 'Barishal', via: PADMA, distanceKm: 190 },
  { district: 'Pirojpur', division: 'Barishal', via: PADMA, distanceKm: 210 },
  { district: 'Chandpur', division: 'Chattogram', distanceKm: 120 },
  { district: 'Panchagarh', division: 'Rangpur', via: JAMUNA, distanceKm: 460 },
  // Main routes customers ask about (no page yet)
  { district: 'Rangpur', division: 'Rangpur', via: JAMUNA, distanceKm: 300 },
  { district: 'Mymensingh', division: 'Mymensingh', via: 'Dhaka–Mymensingh Highway', distanceKm: 120 },
  { district: 'Sylhet', division: 'Sylhet', via: 'Dhaka–Sylhet Highway', distanceKm: 240 },
  { district: 'Bogura', division: 'Rajshahi', via: JAMUNA, distanceKm: 195 },
  { district: 'Cumilla', division: 'Chattogram', via: N1, distanceKm: 100 },
  { district: 'Faridpur', division: 'Dhaka', via: PADMA, distanceKm: 105 },
]);

type Flag = { verified: boolean; note: string };
const flag = (note: string): Flag => ({ verified: false, note });

/**
 * Long-trip facts. Copy that depends on one of these renders only once it is verified.
 * Pickup from any Dhaka hospital lives in destinations.ts (pickupAnyHospital).
 */
export const longTrip = {
  /** Confirmed 22 Oct 2026 (client, via Ratul Roy): pickup from district hospitals and homes, to Dhaka or any district. */
  districtPickup: { verified: true, note: 'Confirmed by the client on 22 Oct 2026 (via Ratul Roy).' },
  icuLongRoutes: flag('Does the ICU ambulance run on long district routes?'),
  tollsIncluded: flag('Are bridge and highway tolls part of the quoted fare?'),
  ferriesIncluded: flag('Are ferry fares part of the quoted fare?'),
  /** "No extra charge at the destination, no change if traffic makes the trip late." */
  noChangeForDelays: flag('Confirm the fare never changes for traffic delays or at the destination.'),
  returnLeg: flag('Is the quote one-way, or does it include the empty return to Dhaka?'),
  familySeats: flag('How many family members can travel, per vehicle type?'),
  holidays: flag('Eid and holiday availability, and any surcharge.'),
  bookFromAbroad: flag('Can a family member abroad book and pay on WhatsApp?'),
};
