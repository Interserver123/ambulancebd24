/**
 * Fares per service. Amounts in ৳. Nothing renders (and no schema offers) until verified: true.
 * Each fare factor has its own flag: show only factors the client actually prices on.
 */
import { z } from 'astro/zod';

const amount = z.number().int().positive();
export const fareRange = z.object({ min: amount, max: amount }).refine((r) => r.max >= r.min, 'max must be >= min');

export const serviceFareSchema = z.object({
  withinDhaka: fareRange.optional(),
  /** Labelled rows, e.g. "Return trip with waiting", "Dhaka to Chittagong". */
  /** toBn: the row label on Bangla pages. */
  routes: z.array(z.object({ to: z.string().min(2), toBn: z.string().min(2).optional(), fare: fareRange })).default([]),
  /** bn: the factor on Bangla pages (needed for any service that has a Bangla page). */
  factors: z.array(z.object({ text: z.string().min(3), bn: z.string().min(3).optional(), verified: z.boolean() })).min(1),
  payment: z.object({ methods: z.array(z.string().min(2)).min(1), verified: z.boolean() }).optional(),
  verified: z.boolean().default(false),
});
export type ServiceFare = z.infer<typeof serviceFareSchema>;

export const fares = {
  icu: serviceFareSchema.parse({
    factors: [
      { text: 'Distance, from pickup to destination', verified: true },
      { text: 'Waiting time at the hospital', verified: true },
      { text: 'The support the patient needs on the way', verified: true },
      { text: 'Extra stops on the route', verified: true },
      // Not confirmed as a pricing factor yet.
      { text: 'Tolls on longer routes', verified: false },
    ],
    verified: false,
  }),
  ac: serviceFareSchema.parse({
    factors: [
      { text: 'Distance, from pickup to destination', verified: true },
      { text: 'Waiting time', verified: true },
      { text: 'Extra stops on the route', verified: true },
      // Not confirmed as pricing factors yet.
      { text: 'A return trip', verified: false },
      { text: 'Oxygen, if the patient needs it', verified: false },
      { text: 'Tolls on longer routes', verified: false },
    ],
    payment: { methods: ['Cash', 'bKash', 'Nagad'], verified: false },
    verified: false,
  }),
  nicu: serviceFareSchema.parse({
    factors: [
      { text: 'Distance, from pickup to destination', verified: true },
      { text: 'Waiting time at the hospital', verified: true },
      { text: 'The equipment and support the baby needs on the way', verified: true },
      { text: 'Extra stops on the route', verified: true },
      // Not confirmed as a pricing factor yet.
      { text: 'Tolls on district routes', verified: false },
    ],
    verified: false,
  }),
  freezer: serviceFareSchema.parse({
    factors: [
      { text: 'Distance, from pickup to the home or burial place', bn: 'দূরত্ব: কোথা থেকে নেব, কোন বাড়ি বা গ্রামে যাব', verified: true },
      { text: 'Waiting time', bn: 'অপেক্ষার সময়', verified: true },
      { text: 'Extra stops on the route', bn: 'পথে বাড়তি থামা', verified: true },
      // Not confirmed as pricing factors yet (Freezer Van brief, client questions 1-2).
      { text: 'Cabin type: single or double', bn: 'গাড়ির ধরন: সিঙ্গেল বা ডাবল কেবিন', verified: false },
      { text: 'Tolls and ferries on longer routes', bn: 'দূরের পথে টোল ও ফেরি', verified: false },
    ],
    // Dhaka to the main districts, when confirmed: { to: 'Dhaka to Chittagong', toBn: 'ঢাকা থেকে চট্টগ্রাম', fare: { min, max } }.
    verified: false,
  }),
  'inter-district': serviceFareSchema.parse({
    factors: [
      { text: 'Distance, from pickup to the district', verified: true },
      { text: 'The type of ambulance the patient needs', verified: true },
      { text: 'Waiting time', verified: true },
      { text: 'Extra stops on the route', verified: true },
      // Not confirmed as pricing factors yet (client questions, inter-district brief §8).
      { text: 'Bridge and highway tolls', verified: false },
      { text: 'Ferries on the route', verified: false },
      { text: 'The empty return to Dhaka', verified: false },
      { text: 'Night travel', verified: false },
      { text: 'A second driver on very long routes', verified: false },
    ],
    payment: { methods: ['Cash', 'bKash', 'Nagad'], verified: false },
    verified: false,
  }),
  air: serviceFareSchema.parse({
    factors: [
      { text: 'The route and distance of the flight', verified: true },
      { text: 'The support the patient needs on board', verified: true },
      { text: 'Ground ambulance to and from the airports', verified: true },
    ],
    verified: false,
  }),
};

export const money = (n: number) => `৳${n.toLocaleString('en-US')}`;
/** ৳ amount with Bangla digits (Bangla pages). */
export const moneyBn = (n: number) => `৳${n.toLocaleString('en-IN').replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]!)}`;
