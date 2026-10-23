/**
 * Social-sharing image from a local photo: a 1200px-wide JPEG (widely supported by
 * Facebook, WhatsApp, X and LinkedIn previews). Returns undefined when there is no photo,
 * so the layout falls back to /og-default.jpg.
 */
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import type { OgImage } from '../layouts/BaseLayout.astro';

export async function ogImageFrom(src: ImageMetadata | undefined, alt: string): Promise<OgImage | undefined> {
  if (!src) return undefined;
  const width = Math.min(1200, src.width);
  const img = await getImage({ src, width, format: 'jpg', quality: 82 });
  const height = Math.round((src.height / src.width) * width);
  return { src: img.src, width, height, alt };
}
