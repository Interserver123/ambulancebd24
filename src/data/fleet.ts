/**
 * Real photos of our own vehicles only. No stock images, ever.
 * The Fleet section stays hidden until at least one entry has a photo.
 * Equipment and crew items render only when verified: true.
 */
import type { ImageMetadata } from 'astro';
import type { ServiceKey } from './business';

export type FleetItem = {
  serviceKey: ServiceKey;
  /** import photo from '../assets/fleet/icu-1.jpg' */
  photo: ImageMetadata;
  alt: string;
  equipment: { item: string; verified: boolean }[];
  crew: { role: string; verified: boolean }[];
};

export const fleet: FleetItem[] = [];
