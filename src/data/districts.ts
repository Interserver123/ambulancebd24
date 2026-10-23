/**
 * District facts for district location pages (src/data/district-pages). One entry per district.
 * Everything the client still has to confirm is a flag with verified: false; copy that depends
 * on it renders only once it is verified. Long-trip facts shared by every route (district pickup,
 * ICU on long routes, tolls, family seats, booking from abroad) live in routes.ts (longTrip).
 *
 * Hospitals are destinations only (CLAUDE.md rule 3): no logos, no partner wording, no criticism.
 */
import { z } from 'astro/zod';

const flag = z.object({ verified: z.boolean().default(false), note: z.string().min(5) });

export const districtFactsSchema = z.object({
  /**
   * Mode B switch: our own ambulance (or a verified arrangement) stationed in the district for
   * pickups inside the city. false = Mode A: we come from Dhaka for transfers and planned trips.
   */
  localDispatch: flag,
  /** Pickup from any hospital or home in the district (city and upazilas). */
  coverage: flag,
  /** Pickup at the ward or gate where the patient is, in the district's hospitals. */
  wardPickup: flag,
  /** Remote upazilas (coastal, river crossings) covered for pickups and drop-offs. */
  remoteUpazilas: flag,
  /** The driver chooses the safest route on the day (ops practice). */
  routePractice: flag,
  /** Trips to a nearby land port for patients going to India (Benapole). */
  landPortTrips: flag.optional(),
  /** Hospitals the client confirms they regularly pick up from or drop at. */
  destinations: z.array(z.object({ name: z.string().min(2), area: z.string().min(2), verified: z.boolean().default(false) })).max(8),
  /** City areas, plain text (no sub-pages: avoids thin pages). Empty for small towns. */
  areas: z.array(z.string().min(2)).default([]),
  /** Upazilas, plain text. remote: true waits for remoteUpazilas. */
  upazilas: z.array(z.object({ name: z.string().min(2), remote: z.boolean().default(false) })).min(3),
});
export type DistrictFacts = z.infer<typeof districtFactsSchema>;

/**
 * Facts for a district with nothing confirmed yet beyond the sitewide long-trip flags
 * (routes.ts). Every flag starts unverified; pass only the local lists.
 */
export function unconfirmedDistrict(
  name: string,
  lists: Pick<z.input<typeof districtFactsSchema>, 'destinations' | 'areas' | 'upazilas'> & { landPort?: boolean },
): DistrictFacts {
  return districtFactsSchema.parse({
    localDispatch: { verified: false, note: `Any ambulance or arrangement stationed in ${name}? Decides Mode A (false) or Mode B (true).` },
    coverage: { verified: false, note: `Pickup from any hospital or home in ${name} city and district?` },
    wardPickup: { verified: false, note: `Pickup at any hospital ward or gate in ${name}?` },
    remoteUpazilas: { verified: false, note: `Coverage of the remote upazilas of ${name} (islands, chars, hill areas).` },
    routePractice: { verified: false, note: `Confirm the driver chooses the safest route on the day (${name} route).` },
    ...(lists.landPort ? { landPortTrips: { verified: false, note: `Trips to or from the land port for patients travelling to India (${name}).` } } : {}),
    destinations: lists.destinations,
    areas: lists.areas,
    upazilas: lists.upazilas,
  });
}

export const districts = {
  khulna: districtFactsSchema.parse({
    localDispatch: { verified: false, note: 'Any ambulance or arrangement stationed in Khulna? Decides Mode A (false) or Mode B (true).' },
    coverage: { verified: true, note: 'Pickup from hospitals and homes in Khulna confirmed by the client on 22 Oct 2026 (via Ratul Roy).' },
    wardPickup: { verified: false, note: 'Pickup at any hospital ward or gate in Khulna, including KMCH?' },
    remoteUpazilas: { verified: false, note: 'Coverage of remote upazilas: Koyra, Paikgachha, Dacope.' },
    routePractice: { verified: false, note: 'Confirm the driver chooses the safest route on the day (Padma Bridge corridor).' },
    landPortTrips: { verified: false, note: 'Khulna to Benapole trips for patients going to India?' },
    // Candidates from the brief. Client confirms each one before it renders.
    destinations: [
      { name: 'Khulna Medical College Hospital', area: 'Khulna', verified: false },
      { name: 'Gazi Medical College Hospital', area: 'Sonadanga', verified: false },
      { name: 'Khulna City Medical College Hospital', area: 'Moylapota', verified: false },
      { name: 'Ad-din Akij Medical College Hospital', area: 'Khulna', verified: false },
    ],
    areas: ['Sonadanga', 'Boyra', 'Khalishpur', 'Daulatpur', 'Moylapota', 'Gollamari', 'Nirala', 'Rupsha', 'Shib Bari', 'Khan Jahan Ali Road'],
    upazilas: [
      { name: 'Dumuria' },
      { name: 'Phultala' },
      { name: 'Dighalia' },
      { name: 'Rupsha' },
      { name: 'Batiaghata' },
      { name: 'Terokhada' },
      { name: 'Dacope', remote: true },
      { name: 'Paikgachha', remote: true },
      { name: 'Koyra', remote: true },
    ],
  }),
};
