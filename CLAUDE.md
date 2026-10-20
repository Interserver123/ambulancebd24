# Ambulance BD 24 — Website (ambulancebd24.com)

Owner: Ratul Roy (Head of SEO, DigiPolli). Brand source of truth: `docs/brand-deck.md` (v1.0, 6 Oct 2026).
**If anything here or in code conflicts with the brand deck, the deck wins.** Update the deck first, then site → GBP → social → citations.

## Goal
Top 3 in Dhaka map pack + organic for emergency ambulance searches (English + Bangla). Primary conversion = tap-to-call. Secondary = WhatsApp, then call-back form.

## Stack
- Astro (static output), Tailwind CSS, Fontsource (Archivo for EN headings, Hind Siliguri for body + all Bangla)
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
- WhatsApp: wa.me/8801919339689 [VERIFY]
- Email: hello@ambulancebd24.com [VERIFY]
- Hours: Open 24 hours, 7 days a week
- Geo: 23.7776294, 90.4042711 (Plus Code QCH3+3P)
- sameAs: facebook.com/AmbulanceBD24Service · x.com/BdAmbulance · youtube.com/@ambulancebd24

## Existing URLs (keep)
/ · /icu-ambulance-service-dhaka/ · /ac-ambulance-service/ · /freezer-ambulance-service/ · /nicu-ambulance-service-dhaka/ (fix 404) · Gulshan + Mirpur area pages · district pages: Chittagong, Khulna, Barisal, Benapole, Noakhali, Jessore, Kushtia, Rajshahi, Gopalganj.
New: /inter-district-ambulance-service/ · /non-ac-ambulance-service-dhaka/ [VERIFY] · Air Ambulance only if confirmed.
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
- Colours: Red #C8102E (call only) · Navy #13233F · Warm White #FAF7F2 · Mist #F1ECE4 · WhatsApp Green #1F8A4C (WhatsApp only) · Slate #4A5568
- Body ≥17px, Bangla line-height 1.5. Max two CTAs per screen.
- CTA text: "Call 01919-339689 — 24/7" / "এখনই কল করুন: 01919-339689" · "WhatsApp for your fare" · "Request a call back". Never "Submit", "Learn more", "Book now".
- Form: 3 fields only (Name, Phone, Pickup location).
- No sliders, no animation libraries, real fleet photos only (WebP/AVIF via astro:assets). Target LCP < 2.5s on 4G.

## Schema
EmergencyService/MedicalBusiness on home + location pages, Service on service pages, BreadcrumbList everywhere, Organization with real sameAs only. Generate JSON-LD from `business.ts` and page data.

## Page output standard
H1–H3, meta title ≤60 chars, meta description ≤155 chars, slug, internal links (anchor → target), CTA placements, FAQ, schema.

## Workflow
1 Technical + conversion (NAP, CTAs, links, schema, speed) → 2 GBP/citations → 3 Home + service pages → 4 Dhaka area pages → 5 District pages → 6 Bangla layer → 7 Blog (must link to money pages).
Before any commit: run `npm run lint:content` and `npm run build`.
