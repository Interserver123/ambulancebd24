/**
 * Vehicles, per service. Equipment, crew and photos render only when the vehicle is
 * verified: true (client confirmation in writing). Leave lists empty until then.
 */
import { z } from 'astro/zod';

export const vehicleSchema = z.object({
  name: z.string().min(2),
  /** Name on Bangla pages. */
  nameBn: z.string().min(2).optional(),
  /** Freezer Van: single cabin (driver only) or double cabin (a second row for family). */
  cabin: z.enum(['single', 'double']).optional(),
  /** Freezer Van: family members who can travel in the van. */
  familySeats: z.number().int().positive().optional(),
  /** Files in src/assets/photos/ (slot names), interior first. */
  photos: z.array(z.string()).default([]),
  equipment: z.array(z.string().min(2)).default([]),
  /** Roles only, e.g. "Paramedic". Never names or invented credentials. */
  crew: z.array(z.string().min(2)).default([]),
  verified: z.boolean().default(false),
});
export type Vehicle = z.infer<typeof vehicleSchema>;

export const icuVehicles: Vehicle[] = z.array(vehicleSchema).parse([
  { name: 'ICU Ambulance', photos: ['icu-interior', 'icu'], equipment: [], crew: [], verified: false },
]);

/** Equipment can include family seats and oxygen ("Seats for 2 family members"); crew can include "Attendant". */
export const acVehicles: Vehicle[] = z.array(vehicleSchema).parse([
  { name: 'AC Ambulance', photos: ['ac'], equipment: [], crew: [], verified: false },
]);

export const nicuVehicles: Vehicle[] = z.array(vehicleSchema).parse([
  { name: 'NICU Ambulance', photos: ['nicu'], equipment: [], crew: [], verified: false },
]);

/**
 * Freezer vans (brief §6, "freezerVans"). Keep only the cabin types the client actually has,
 * with the confirmed number of family seats, then set verified: true. No photos of the deceased, ever.
 */
export const freezerVehicles: Vehicle[] = z.array(vehicleSchema).parse([
  { name: 'Single-cabin freezer van', nameBn: 'সিঙ্গেল কেবিন ফ্রিজিং গাড়ি', cabin: 'single', photos: ['freezer'], verified: false },
  { name: 'Double-cabin freezer van', nameBn: 'ডাবল কেবিন ফ্রিজিং গাড়ি', cabin: 'double', photos: ['freezer'], verified: false },
]);

/** Long trips use the AC or ICU ambulance; list here what the client confirms for district runs. */
export const interDistrictVehicles: Vehicle[] = z.array(vehicleSchema).parse([
  { name: 'Ambulance for district trips', photos: ['inter-district'], equipment: [], crew: [], verified: false },
]);

/** Aircraft belong to the aviation operator. Only our ground ambulance may be listed as ours. */
export const airVehicles: Vehicle[] = z.array(vehicleSchema).parse([]);

/** Vehicles whose equipment and crew may be shown. */
export const verifiedVehicles = (list: Vehicle[]) =>
  list.filter((v) => v.verified && (v.equipment.length > 0 || v.crew.length > 0 || v.cabin !== undefined || v.familySeats !== undefined));
