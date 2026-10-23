/**
 * District location pages built from section components (src/pages/[district].astro).
 * Add a page here to publish it; the footer, the inter-district route table, the
 * /locations/ hub and the nearby-district chips link to it automatically.
 * Existing live URLs keep their exact form (see each file's header).
 */
import { barisalPage } from './barisal';
import { benapolePage } from './benapole';
import { boguraPage } from './bogura';
import { chandpurPage } from './chandpur';
import { chittagongPage } from './chittagong';
import { cumillaPage } from './cumilla';
import { faridpurPage } from './faridpur';
import { gopalganjPage } from './gopalganj';
import { jessorePage } from './jessore';
import { jhalokatiPage } from './jhalokati';
import { khulnaPage } from './khulna';
import { kushtiaPage } from './kushtia';
import { madaripurPage } from './madaripur';
import { mymensinghPage } from './mymensingh';
import { noakhaliPage } from './noakhali';
import { panchagarhPage } from './panchagarh';
import { pirojpurPage } from './pirojpur';
import { rajshahiPage } from './rajshahi';
import { rangpurPage } from './rangpur';
import { sylhetPage } from './sylhet';
import type { DistrictPage } from './schema';

export const districtPages: DistrictPage[] = [
  // Existing URLs
  chittagongPage,
  khulnaPage,
  barisalPage,
  rajshahiPage,
  jessorePage,
  benapolePage,
  kushtiaPage,
  noakhaliPage,
  gopalganjPage,
  madaripurPage,
  jhalokatiPage,
  pirojpurPage,
  chandpurPage,
  panchagarhPage,
  // New
  sylhetPage,
  cumillaPage,
  mymensinghPage,
  boguraPage,
  rangpurPage,
  faridpurPage,
];
