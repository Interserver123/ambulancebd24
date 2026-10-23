/**
 * Service pages built from section components (src/pages/[service].astro).
 * Add a page here to publish it; links across the site pick it up automatically.
 * Bangla pages (lang: 'bn') are built at /bn/ and paired with the English page by serviceKey.
 */
import { acPage } from './ac';
import { airPage } from './air';
import { freezerPage } from './freezer';
import { freezerPageBn } from './freezer-bn';
import { icuPage } from './icu';
import { interDistrictPage } from './inter-district';
import { nicuPage } from './nicu';
import type { ServicePage } from './schema';

export const servicePages: ServicePage[] = [icuPage, nicuPage, acPage, freezerPage, interDistrictPage, airPage, freezerPageBn];
