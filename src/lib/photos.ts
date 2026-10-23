/**
 * Photo slots. Drop a real photo into src/assets/photos/ named after its slot, optionally
 * followed by "--" and a descriptive kebab-case name (e.g. icu--icu-ccu-ambulance-dhaka.jpg).
 * The descriptive part carries into the optimised AVIF/WebP file names (image SEO).
 * Until then the slot shows a branded placeholder (labelled in dev only).
 * Vehicles, crew and the base: real photos only. Scene slots (cta, base, air) may use licensed
 * stock or AI images (approved 22 Oct 2026), never showing a branded vehicle or crew as ours;
 * their alt text describes the scene and does not claim it as Ambulance BD 24. Sources: README.
 */
import type { ImageMetadata } from 'astro';
import { business } from '../data/business';

const phone = business.phone.display;

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,jpeg,png,webp,avif}', { eager: true });

export const photoSlots = {
  hero: { alt: `Ambulance BD 24 ICU and CCU life support ambulance with the ${phone} hotline, Dhaka`, size: '1920×1080', label: 'hero ambulance' },
  emergency: { alt: 'Ambulance BD 24 emergency life support ambulance parked on a Dhaka street', size: '1200×900', label: 'emergency ambulance' },
  dispatch: { alt: 'Ambulances and a freezer van lined up at night in Dhaka', size: '1200×800', label: 'our ambulances at the base' },
  team: { alt: 'Ambulance BD 24 driver beside the vehicle', size: '1000×800', label: 'driver portrait beside the vehicle' },
  'icu-equipment': { alt: 'Equipment inside an Ambulance BD 24 ICU ambulance, Dhaka', size: '1200×900', label: 'ICU ambulance equipment, inside' },
  'ac-interior': { alt: 'Inside an AC ambulance in Dhaka: stretcher and seats for family', size: '1200×900', label: 'AC ambulance interior' },
  'icu-interior': { alt: 'Inside an Ambulance BD 24 ICU ambulance', size: '1200×900', label: 'ICU ambulance interior' },
  icu: { alt: 'Ambulance BD 24 ICU and CCU ambulance in Dhaka', size: '1200×900', label: 'ICU ambulance exterior' },
  nicu: { alt: 'Ambulance BD 24 ambulance used for NICU transfers in Dhaka', size: '1200×900', label: 'NICU ambulance exterior' },
  ac: { alt: 'Ambulance BD 24 AC ambulance on a road in Dhaka', size: '1200×900', label: 'AC ambulance exterior' },
  freezer: { alt: 'Ambulance BD 24 freezer van (লাশবাহী ফ্রিজিং গাড়ি) in Dhaka', size: '1200×900', label: 'freezer van exterior' },
  'inter-district': { alt: 'Ambulance BD 24 ambulance for inter-district trips', size: '1200×900', label: 'inter-district ambulance' },
  // Scene image (stock): the aircraft belongs to the aviation operator, never to us.
  air: { alt: 'A medical jet on the airport tarmac, prepared for a patient transfer', size: '1200×900', label: 'air ambulance transfer' },
  'non-ac': { alt: 'Ambulance BD 24 non-AC ambulance', size: '1200×900', label: 'Non-AC ambulance exterior' },
  fare: { alt: `Ambulance BD 24 ambulance with the ${phone} hotline on the side`, size: '1200×900', label: 'ambulance at the base' },
  // Scene image (stock).
  cta: { alt: 'Emergency light glowing on a vehicle at night', size: '1920×800', label: 'emergency light at night' },
  // Scene image (stock) until a real photo of the Mohakhali base is added.
  base: { alt: 'A dispatcher with a headset taking an ambulance call', size: '1200×900', label: 'dispatcher taking a call' },
} as const;

/**
 * Logo files: src/assets/brand/logo.(svg|png|webp) for light backgrounds and
 * logo-light.(svg|png|webp) (white text) for dark ones. Falls back to a wordmark.
 */
const brand = import.meta.glob<{ default: ImageMetadata }>('/src/assets/brand/logo*.{svg,png,webp}', { eager: true });
const pick = (name: string) => Object.entries(brand).find(([p]) => p.split('/').pop()?.replace(/\.[^.]+$/, '') === name)?.[1].default;
export const brandLogo: ImageMetadata | undefined = pick('logo');
export const brandLogoLight: ImageMetadata | undefined = pick('logo-light');

export type PhotoSlotKey = keyof typeof photoSlots;

export function getPhoto(key: PhotoSlotKey): ImageMetadata | undefined {
  const hit = Object.entries(files).find(([path]) => {
    const base = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
    return base === key || base.startsWith(`${key}--`);
  });
  return hit?.[1].default;
}
