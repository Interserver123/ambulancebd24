import { getCollection } from 'astro:content';
import { servicePages } from '../data/service-pages';
import { districtPages } from '../data/district-pages';

/**
 * Paths of every published page, so components can link only to pages that
 * exist (no 404s, no "#" links). Static pages are listed here by hand;
 * data-driven service and district pages come from src/data/service-pages and
 * src/data/district-pages.
 */
const STATIC_PAGES = ['/', '/contact/', '/ambulance-service-areas-dhaka/', '/locations/', ...servicePages.map((p) => p.slug), ...districtPages.map((p) => p.slug)];

export async function publishedPaths(lang: 'en' | 'bn' = 'en') {
  const keep = (e: { data: { draft: boolean; lang: string } }) => !e.data.draft && e.data.lang === lang;
  const [services, areas, districts, blog] = await Promise.all([
    getCollection('services', keep),
    getCollection('areas', keep),
    getCollection('districts', keep),
    getCollection('blog', keep),
  ]);
  return {
    all: new Set<string>([...STATIC_PAGES, ...[services, areas, districts, blog].flat().map((e) => e.data.slug)]),
    /** areaName -> slug */
    areas: new Map(areas.map((e) => [e.data.areaName, e.data.slug])),
    /** district -> slug */
    districts: new Map([
      ...districts.map((e) => [e.data.district, e.data.slug] as const),
      ...districtPages.filter((p) => p.lang === lang).map((p) => [p.district, p.slug] as const),
    ]),
  };
}

export type Published = Awaited<ReturnType<typeof publishedPaths>>;
