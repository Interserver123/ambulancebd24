import { business, services, shown } from '../data/business';
import { homeEn } from '../data/home';
import type { HomeNav } from '../components/home/types';
import { publishedPaths } from './routes';

/** Nav, page sets and FAQ list shared by the homepage and its design previews. */
export async function homeData() {
  const pub = await publishedPaths('en');
  const hasBn = Object.keys(import.meta.glob('../pages/bn/index.astro')).length > 0;
  // About and Blog show in the menu only once their page files exist (no links to 404s).
  const hasAbout = Object.keys(import.meta.glob('../pages/about.astro')).length > 0 || pub.all.has('/about/');
  const hasBlog = Object.keys(import.meta.glob('../pages/blog/index.astro')).length > 0;
  const nav: HomeNav = {
    services: services
      .filter((s) => s.key !== 'emergency' && s.status === 'fact' && pub.all.has(s.path))
      .map((s) => ({ label: s.en, path: s.path })),
    areas: [...pub.areas].map(([name, path]) => ({ label: name, path })),
    districts: [...pub.districts].map(([name, path]) => ({ label: name, path })),
    freezer: pub.all.has('/freezer-ambulance-service/') ? '/freezer-ambulance-service/' : undefined,
    contact: pub.all.has('/contact/') ? '/contact/' : undefined,
    about: hasAbout ? '/about/' : undefined,
    blog: hasBlog ? '/blog/' : undefined,
    bangla: hasBn ? '/bn/' : undefined,
  };
  // FAQ 8 (WhatsApp) only once the number is verified. Same array feeds page and schema.
  const faqs = [...homeEn.faq.items, ...(shown(business.whatsapp) ? [homeEn.faq.whatsappItem] : [])];
  return { pub, nav, hasBn, faqs };
}
