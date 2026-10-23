/**
 * Hospitals per service, as destinations only (CLAUDE.md rule 3: never partners,
 * no logos). A list renders only with entries the client has confirmed (verified: true).
 */
import { z } from 'astro/zod';

export const destinationSchema = z.object({
  name: z.string().min(2),
  area: z.string().min(2),
  verified: z.boolean().default(false),
});
export type Destination = z.infer<typeof destinationSchema>;

/** Client to confirm up to 8 hospitals they regularly run ICU transfers to and from. */
export const icuDestinations: Destination[] = z.array(destinationSchema).max(8).parse([]);

/** Client to confirm up to 6 hospitals for AC pickups and drop-offs. */
export const acDestinations: Destination[] = z.array(destinationSchema).max(8).parse([]);

/** Client to confirm hospitals with a NICU they regularly run newborn transfers to and from. */
export const nicuDestinations: Destination[] = z.array(destinationSchema).max(8).parse([]);

/** Freezer Van: hospitals families most often call us from (pickup points, not partners). */
export const freezerDestinations: Destination[] = z.array(destinationSchema).max(8).parse([]);

/** Inter-district: district hospitals the client confirms as regular destinations. */
export const interDistrictDestinations: Destination[] = z.array(destinationSchema).max(8).parse([]);

/** Air: none until the operator and routes are confirmed. */
export const airDestinations: Destination[] = z.array(destinationSchema).max(8).parse([]);

/** Can we pick up from any hospital ward or gate in Dhaka? Gates the "any hospital" copy. */
export const pickupAnyHospital = { verified: false, note: 'Client to confirm pickup from any hospital ward or gate.' };

export const confirmed = (list: Destination[]) => list.filter((d) => d.verified);

/** Operational facts the client still has to confirm. Each gates the copy that depends on it. */
export const ops = {
  /** Do we pick up newborns from district hospitals (district to a Dhaka NICU)? Gates NICU FAQ 6. */
  districtPickup: { verified: true, note: 'District pickups confirmed by the client on 22 Oct 2026 (via Ratul Roy).' },
};
