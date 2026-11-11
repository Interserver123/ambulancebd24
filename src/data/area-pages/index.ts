/**
 * Dhaka area pages. Add a page here to publish it; the Inside Dhaka hub, the footer and the
 * sitemap pick it up automatically.
 */
import { mohakhaliPage } from './mohakhali';
import { gulshanPage } from './gulshan';
import { mirpurPage } from './mirpur';
import { uttaraPage } from './uttara';
import { keraniganjPage } from './keraniganj';
import type { AreaPage } from './schema';

export const areaPages: AreaPage[] = [mohakhaliPage, gulshanPage, mirpurPage, uttaraPage, keraniganjPage];
