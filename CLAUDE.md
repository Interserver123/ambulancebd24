# Ambulance BD 24 — Website (ambulancebd24.com)

Owner: Ratul Roy (Head of SEO, DigiPolli). Brand source of truth: `docs/brand-deck.md` (v1.3, 20 Oct 2026).
**If anything here or in code conflicts with the brand deck, the deck wins.** Update the deck first, then site → GBP → social → citations.

## Goal
Top 3 in Dhaka map pack + organic for emergency ambulance searches (English + Bangla). Primary conversion = tap-to-call. Secondary = WhatsApp, then call-back form.

## Stack
- Astro (static output), Tailwind CSS, Fontsource (Fraunces for EN headings, Hind Siliguri for body + all Bangla)
- Content: Markdown/MDX content collections with Zod schemas; Keystatic for client edits
- Hosting: Cloudflare Pages; `public/_redirects` holds the 301 map
- Form: Pages Function + Turnstile + Resend email + Telegram alert to dispatch
- Analytics: GA4 via Cloudflare Zaraz; track every `tel:` and `wa.me` click
- `trailingSlash: 'always'` — never change an existing URL without a 301 entry

## Single source of truth
All NAP/brand data lives in `src/data/business.ts`. Never hard-code phone, hours, address, geo, email or social URLs in pages or components.
- Name: Ambulance BD 24 (with spaces). "AmbulanceBD24" only in handles/URLs.
- Address: Mohakhali, Dhaka 1212, Bangladesh [VERIFY house/road]
- Phone display: 01919-339689 · link/schema: +8801919339689 · Latin digits always, even in Bangla
- WhatsApp: wa.me/8801919339689 (confirmed 20 Oct 2026)
- Email: hello@ambulancebd24.com [VERIFY]
- Hours: Open 24 hours, 7 days a week
- Geo: 23.7776294, 90.4042711 (Plus Code QCH3+3P)
- sameAs: facebook.com/AmbulanceBD24Service · x.com/BdAmbulance · youtube.com/@ambulancebd24

## Existing URLs (keep)
/ · /icu-ambulance-service-dhaka/ · /ac-ambulance-service/ · /freezer-ambulance-service/ · /nicu-ambulance-service-dhaka/ (fix 404) · Gulshan + Mirpur area pages · district pages: Chittagong, Khulna, Barisal, Benapole, Noakhali, Jessore, Kushtia, Rajshahi, Gopalganj.
New: /inter-district-ambulance-service/ · /non-ac-ambulance-service-dhaka/ [VERIFY] · /air-ambulance-service-bangladesh/ (Air Ambulance: arranged through an operator; never claim our own aircraft).
One primary intent per URL. Flag cannibalisation (home vs ICU vs Dhaka pages).

## Non-negotiable rules (YMYL)
1. Never invent prices, response times, equipment, crew credentials, fleet size, years, hospital partnerships, reviews, ratings or stats. Use `[VERIFY]`.
2. No medical advice beyond "call now, share location and patient condition". No guaranteed outcomes.
3. Hospitals only as destinations ("we transport to…"), never as partners.
4. No fake reviews, no `aggregateRating` unless real on-site reviews exist.
5. Every area/district page needs unique local content: landmarks, nearest hospitals (as destinations), routes, area-specific FAQs. City-name swapping is forbidden; Zod schemas must enforce required fields.
6. FAQPage schema only where the FAQs are visible on the page; generate both from the same `faqs[]` data.

## Banned words/claims (content linter fails the build)
"guaranteed", "best/No.1/fastest/cheapest" as our own claim, discounts/offers, crew on board (until verified), any `[VERIFY]` left in published content, any `href="#"`, phone in a non-canonical format, `aggregateRating`.
Approved timing line: "Around 10 minutes in central Dhaka, depending on traffic."
Approved fare line: "We tell you the fare before we dispatch." (Say "in writing" only once the SOP is live.)

## Voice
Calm, direct, honest, warm. Test: would a calm dispatcher say it at 3 a.m.?
- Emergency: urgent-calm, lines ≤12 words, lead with hotline + 24/7
- ICU: competent, specific equipment lists [VERIFY]
- NICU: gentle, no exclamation marks
- Freezer Van: Bangla first, condolence first, no "fast", no emojis
- Planned/district: practical, fare range + route
Taglines: "Fast ambulance. Fare confirmed first." / "দ্রুত অ্যাম্বুলেন্স, ভাড়া আগেই নিশ্চিত।"

## Language
English pages + full Bangla layer under `/bn/` with hreflang. Spelling: অ্যাম্বুলেন্স (এম্বুলেন্স only in meta). Body copy: প্রিয়জন/মরদেহ; লাশবাহী only in titles. Bangla copy uses Bangla digits except the phone number. Currency: ৳ only.

## Design / UX
- Mobile-first. Sticky bottom bar on mobile: red Call + green WhatsApp, always visible.
- Hotline in header, hero (visual focus, ≥32px on mobile), mid-page, footer.
- Logo: `src/assets/brand/logo.png` (light backgrounds), `logo-light.png` (dark backgrounds).
- Colours (deck v1.2): Black #0B0B0F · Logo Blue #5070FC (accent; small text uses #3A55DE) · White · Red #C8102E (call only) · WhatsApp Green #1F8A4C (WhatsApp only). Tokens: `src/styles/warm.css`.
- Body ≥17px, Bangla line-height 1.5. Max two CTAs per screen.
- CTA text: "Call 01919-339689 — 24/7" / "এখনই কল করুন: 01919-339689" · "WhatsApp for your fare" · "Request a call back". Never "Submit", "Learn more", "Book now".
- Form: 3 fields only (Name, Phone, Pickup location).
- No sliders, no animation libraries, real fleet photos only for vehicles/crew/equipment/base; licensed stock or AI only for scene images with no branded vehicle or crew shown as ours (WebP/AVIF via astro:assets). Target LCP < 2.5s on 4G.

## Schema
EmergencyService/MedicalBusiness on home + location pages, Service on service pages, BreadcrumbList everywhere, Organization with real sameAs only. Generate JSON-LD from `business.ts` and page data.

## SEO engineering standards (non-negotiable — best-in-class codebase)
Every technical decision must favour crawlability, speed and clarity for Google. If a choice trades SEO for convenience, pick SEO and say why.

**Rendering & URLs**
- Every indexable page is static HTML at build time. No content rendered client-side. JS only as small islands (form, map click).
- URLs: lowercase, hyphenated, trailing slash, never changed without a single-hop 301 in `public/_redirects`.
- Self-referencing absolute canonical on every page. One canonical host (https, non-www unless decided otherwise) enforced at Cloudflare.
- No duplicate pages via query params, tags or pagination.

**Head (one `<SEO>` component, data-driven)**
- Unique title (≤60) and meta description (≤155) per page, enforced by Zod at build — build fails if missing, duplicated or too long.
- hreflang pairs `en-BD` ↔ `bn-BD` + `x-default`, reciprocal; `<html lang>` set per page.
- OG + Twitter tags per page (no "Written by"/"Time to read" on non-blog pages); og:locale `en_BD` / `bn_BD`.
- `noindex` on thank-you, form-success and utility pages. Real 404 page (status 404) with hotline + links to services.

**Crawl & index**
- Auto sitemap with only canonical, indexable, 200-status pages; `lastmod` from git. `robots.txt` points to it.
- Internal links are plain `<a href>` with descriptive anchors. No orphan pages: a build check fails if any page has zero internal links in.
- Every area/district page links up to its service/hub page and to 2–4 sibling locations. Every blog post links to at least one money page.
- Broken-link check in CI (internal + external). No `#`, no `javascript:` links.

**HTML semantics**
- Exactly one H1; no skipped heading levels; landmarks `header/nav/main/footer`.
- Visible breadcrumbs on all non-home pages, matching BreadcrumbList schema.
- Images: descriptive alt, descriptive kebab-case filenames, explicit width/height, no text baked into images.

**Performance (Core Web Vitals, mobile 4G)**
- Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1. Lighthouse CI fails below: Performance 95, SEO 100, Accessibility 95, Best Practices 95.
- Images via `astro:assets` → AVIF/WebP, responsive `srcset`, lazy below the fold, `fetchpriority="high"` only on the LCP image.
- Fonts self-hosted, subset, `font-display: swap`, preload the 2 critical files only.
- Total JS per page < 30KB. Third-party scripts only through Cloudflare Zaraz. No sliders, animation libraries or icon fonts.

**Structured data**
- One JSON-LD `@graph` per page with stable `@id`s, generated from `business.ts` + page data, typed with `schema-dts`.
- Validated in CI. Never `aggregateRating`/`Review` unless real on-site reviews exist.

**Code quality**
- TypeScript strict; `astro check`, ESLint and Prettier must pass. Small single-purpose components, no dead code, no inline styles except critical tokens.
- Conventional commit messages (`feat:`, `fix:`, `content:`, `seo:`). One logical change per commit.
- Security headers via `public/_headers` (HSTS, X-Content-Type-Options, Referrer-Policy).

**Measurement**
- GA4 via Zaraz with events: `call_click` (tel:), `whatsapp_click` (wa.me), `form_submit`. GSC verified by DNS. GBP link uses `?utm_source=google&utm_medium=gbp&utm_campaign=local`.

## Page output standard
H1–H3, meta title ≤60 chars, meta description ≤155 chars, slug, internal links (anchor → target), CTA placements, FAQ, schema.

## Workflow
1 Technical + conversion (NAP, CTAs, links, schema, speed) → 2 GBP/citations → 3 Home + service pages → 4 Dhaka area pages → 5 District pages → 6 Bangla layer → 7 Blog (must link to money pages).
Before any commit: run `npm run lint:content`, `astro check`, `npm run build` and the link check. Fix failures; never bypass a check.
