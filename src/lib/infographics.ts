import type { PhotoSlotKey } from './photos';

/** Photo slots that show an infographic (src/components/infographics) until a real photo exists. */
export const infographicSlots = ['inter-district', 'base', 'cta', 'air', 'icu-interior', 'icu-equipment'] as const satisfies readonly PhotoSlotKey[];
export type InfographicSlot = (typeof infographicSlots)[number];

/** Slots with a Bangla version. Other slots fall back to the photo placeholder on /bn/ pages. */
export const bnInfographicSlots: readonly InfographicSlot[] = ['cta', 'base'];

export const hasInfographic = (slot: PhotoSlotKey): slot is InfographicSlot => (infographicSlots as readonly string[]).includes(slot);
