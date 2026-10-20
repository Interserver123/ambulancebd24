# Homepage spec — Ambulance BD 24 (EN `/` + BN `/bn/`)

Build from this file + `CLAUDE.md` + `docs/brand-deck.md`. All NAP values come from `src/data/business.ts`, never hard-coded.
Labels: **[VERIFY]** = do not publish until the client confirms. Any section marked *render only if verified* must be driven by a data flag, so it disappears automatically instead of showing a placeholder.

---

## 1. Design direction: "calm dispatch desk", premium not loud

The reference (bangladeshambulance.com) has the right *structure* (24/7 emphasis, 6-service grid, FAQ, contact block). We keep that and replace everything that makes it look cheap or untrustworthy.

| Reference does | We do instead |
|---|---|
| Vague hero ("Every moment is countable / Emergency Support") + "Contact Us" | Keyword H1, the hotline as the hero's visual anchor, a "dispatch card" that tells people what to say |
| Unproven claims: "Established 1987", "Authorized & Certified", "experienced doctors" | Only verified claims; equipment/crew shown per vehicle once confirmed |
| Stock testimonial ("Kevin Martin"), lorem ipsum in footer | Real Google reviews, verbatim and attributed |
| Logo strip implying partners | No logo strip (hospitals are destinations, not partners) |
| "Get a Free Quote" form as the main ask | Call first; fare promise as the differentiator |
| Broken `tel:` links, slider, stock imagery | Data-driven `tel:` (linted), no sliders, real fleet photos only |

**Visual system** (tokens already in Tailwind):
- Page: Warm White `#FAF7F2`. Alternate sections: Mist `#F1ECE4`. Fare promise + footer: Navy `#13233F`. Text: Navy headings, Slate `#4A5568` body.
- **Red `#C8102E` is used only for call buttons and the hotline.** Never as a section background (alarming, cheap). Green `#1F8A4C` only for WhatsApp.
- Type: Archivo 700 for EN headings, tracking −0.02em; H1 `clamp(40px, 6vw, 72px)`; hotline as display numerals `clamp(40px, 5vw, 56px)` with `font-variant-numeric: tabular-nums`. Hind Siliguri for body and all Bangla, body 17–18px, Bangla line-height 1.5.
- Surfaces: 1px hairline borders (`navy / 10%`), radius 20px on cards, layered soft shadow (`0 1px 2px rgb(19 35 63 / .06), 0 8px 24px rgb(19 35 63 / .06)`). Plenty of whitespace: section padding 96px desktop / 64px mobile.
- Icons: inline SVG, 1.5px stroke, Navy. No emoji.
- Motion: CSS only, 150–200ms hover lift on cards; respect `prefers-reduced-motion`. No scroll animations, counters, sliders or pulsing alarms.
- Grid: 12 columns, max-width 1200px, 16px side gutter on mobile, no horizontal scroll.
- **Premium signature elements:** (1) the hero dispatch card, (2) oversized step numerals `01 02 03`, (3) the navy fare-promise section, (4) area chips laid out as a clean grid.

**Performance budget (LCP < 2.5s on 4G):** no hero photo on mobile (LCP = H1 text). Desktop hero photo, if used, is a real fleet WebP/AVIF with `fetchpriority="high"`, ≤120KB. Total page JS < 30KB (form + map click only). Two font files, subset, preloaded. Map = static image; Google Maps iframe loads only on click.

---

## 2. Meta

| Field | EN (`/`) | BN (`/bn/`) |
|---|---|---|
| Title (≤60) | `Ambulance Service in Dhaka 24/7 \| Ambulance BD 24` | `ঢাকায় ২৪ ঘণ্টা অ্যাম্বুলেন্স সার্ভিস \| অ্যাম্বুলেন্স বিডি ২৪` [VERIFY BN brand name] |
| Description (≤155) | `24/7 ambulance service in Dhaka: ICU, NICU, AC and freezer van. Nearest ambulance, fare told before we move. Call 01919-339689.` | `ঢাকায় ২৪ ঘণ্টা আইসিইউ, এনআইসিইউ, এসি এম্বুলেন্স ও লাশবাহী ফ্রিজিং গাড়ি। ভাড়া আগেই জানিয়ে দিই। কল: 01919-339689` |
| Canonical | `https://ambulancebd24.com/` | `https://ambulancebd24.com/bn/` |
| hreflang | `en-BD` ↔ `bn-BD`, `x-default` → `/` | same pair |
| og:locale | `en_BD` (alternate `bn_BD`) | `bn_BD` |

Primary keywords for `/`: ambulance service Dhaka · ambulance number Dhaka · emergency ambulance Dhaka · 24/7 ambulance Dhaka. BN: অ্যাম্বুলেন্স সার্ভিস ঢাকা · এম্বুলেন্স নাম্বার ঢাকা.
**Cannibalisation guard:** the homepage does not target "ICU ambulance Dhaka", "freezer van Dhaka" etc. Service cards stay short (≤35 words) and link out; the depth lives on the service pages.

---

## 3. Sections (top to bottom), with copy

Component names are suggestions for `src/components/home/`.

### 0 · `UtilityBar` (desktop only, 36px, Navy text on Mist)
`Open 24 hours, 7 days` · `Mohakhali, Dhaka` · language toggle `বাংলা`

### 1 · `Header` (sticky on desktop, 72px, Warm White + hairline bottom border)
Logo (alt: `Ambulance BD 24`) · Nav: **Services ▾** (ICU, NICU, AC, Freezer Van, Inter-District) · **Areas ▾** (only existing area pages) · **Freezer Van** · **Contact** · `বাংলা` · red button **`Call 01919-339689`**.
No social icons in the header. No `#` links anywhere.

### 2 · `Hero` (two columns desktop; stacked mobile, card below)
**Left**
- Eyebrow (small caps, Slate): `24/7 emergency ambulance · Dhaka`
- **H1:** `24/7 ambulance service in Dhaka`
- Lede (Archivo 500, larger): `Fast ambulance. Fare confirmed first.`
- Body: `Call and a dispatcher answers. We send the nearest available ambulance and tell you the fare before we move.`
- Hotline block: label `Emergency hotline — a person answers` above display numerals `01919-339689` (the whole block is a `tel:` link).
- CTAs: red **`Call 01919-339689 — 24/7`** · green outline **`WhatsApp for your fare`** [VERIFY WhatsApp number]
- Trust row (3 items with check icons): `Open 24 hours, 7 days` · `Around 10 minutes in central Dhaka, depending on traffic` · `Fare told before dispatch`
- Optional, *render only if verified:* `4.3 on Google · 35 reviews` linking to the GBP. Visible text only, **no rating schema**. [VERIFY current numbers at build time]

**Right: `DispatchCard`** (white card, 20px radius, hairline border, subtle shadow)
- Title: `On the call, tell us 3 things`
- `1  Where you are: area and a nearby landmark`
- `2  The patient's condition, and if they need oxygen, a stretcher or a wheelchair`
- `3  Where they need to go: hospital or home`
- Footer line: `We tell you the ambulance type, the ETA and the fare.`
- Desktop: optional real fleet photo behind/above the card. Mobile: no photo.

### 3 · `ServiceGrid` (Mist background)
- **H2:** `Which ambulance do you need?`
- Intro: `One hotline for every ambulance type. Not sure which one? Tell the dispatcher the patient's condition and we'll match the right vehicle.`
- Cards (H3 + text + text link; whole card clickable). Render from the services collection; Non-AC and Air Ambulance appear only if `verified: true`.

| H3 | Card text | Link anchor → URL |
|---|---|---|
| ICU Ambulance | For critical patients moving between hospitals or going home on support. Tell us the patient's needs; we confirm the vehicle and fare first. | `ICU ambulance in Dhaka` → `/icu-ambulance-service-dhaka/` |
| NICU Ambulance | For a newborn who needs a NICU at another hospital. We guide you step by step. | `NICU ambulance service` → `/nicu-ambulance-service-dhaka/` |
| AC Ambulance | For hospital transfers, discharge trips and check-ups in a cooled, comfortable vehicle. | `AC ambulance in Dhaka` → `/ac-ambulance-service/` |
| Freezer Van | Taking your loved one home with respect, within Dhaka or to any district. | `Freezer van (লাশবাহী ফ্রিজিং গাড়ি)` → `/freezer-ambulance-service/` |
| Inter-District Ambulance | Dhaka to any district, any time, for transfers, discharge and hometown journeys. | `Dhaka to district ambulance` → `/inter-district-ambulance-service/` |
| Non-AC Ambulance *(only if verified)* | A lower-cost option for stable patients on planned trips. | `Non-AC ambulance` → `/non-ac-ambulance-service-dhaka/` |

No equipment, doctor or paramedic claims on cards. Those go on service pages once [VERIFY] is cleared.

### 4 · `HowItWorks` (Warm White)
- **H2:** `What happens when you call`
- Three columns with oversized numerals (Archivo, 64px, Navy at 15% opacity behind the H3):
  - **01 · Call 01919-339689**: `A dispatcher answers, day or night.`
  - **02 · Tell us the situation**: `Location, patient condition and destination. We tell you the ambulance type, the ETA and the fare.`
  - **03 · We send the nearest ambulance**: `The nearest available ambulance is on its way. The fare does not change after the trip.`

### 5 · `FarePromise` (Navy background, white text — the signature section)
- **H2:** `The fare is told before we move`
- Body: `Many families in Dhaka have been quoted one price and charged another. We don't work that way. Before we dispatch, the dispatcher tells you the fare, including waiting time and any extra stops. What we agree is what you pay.`
- Checklist: `Fare told on the call, before dispatch` · `Waiting time and extra stops included in the quote` · `No change after the trip`
- Add `Sent to you in writing by SMS or WhatsApp` **only when the written-fare SOP is live** (data flag `farePromise.inWriting`).
- *Render only if verified:* a fare-range table per ambulance type (`fares.verified`). [VERIFY ranges, waiting and extra-stop rates]
- CTAs: red `Call 01919-339689 — 24/7` · green `WhatsApp for your fare`

### 6 · `AreasServed` (Mist)
- **H2:** `Ambulance service across Dhaka`
- Body: `Our base is in Mohakhali, so we reach central Dhaka in around 10 minutes, depending on traffic. We cover every area of the city and run trips from Dhaka to any district.`
- **H3:** `Dhaka areas`. Chip grid: Mohakhali · Gulshan · Banani · Mirpur · Uttara · Dhanmondi · Mohammadpur · Badda · Bashundhara R/A · Tejgaon · Rampura · Old Dhaka. **A chip is a link only if that area page exists in the collection**; otherwise it is plain text. Anchor pattern: `Ambulance in Gulshan`.
- **H3:** `From Dhaka to districts`. Chips from the districts collection: Chittagong · Khulna · Barisal · Rajshahi · Jessore · Kushtia · Noakhali · Benapole · Gopalganj, then the plain text `Any other district: call us`. Anchor pattern: `Dhaka to Khulna ambulance`. [VERIFY existing district slugs before linking]
- Static map image (Dhaka, pin at Mohakhali 23.7776294, 90.4042711) + link `Find us on Google Maps` → GBP. Iframe loads only on click.

### 7 · `Reviews` (Warm White) — *render only when real reviews are added*
- **H2:** `What families say`
- 3 cards. Each card: exact Google review text (verbatim, unedited), reviewer first name, month/year, `Google review`. Prefer reviews that mention speed, the area or the service type.
- Link: `Read all reviews on Google` → GBP reviews URL.
- [VERIFY permission per deck] · **No AggregateRating or Review schema.**

### 8 · `Fleet` (Mist) — *render only when real photos exist*
- **H2:** `Inside our ambulances`
- Intro: `Real photos of our own vehicles. Ask the dispatcher what each ambulance carries before you book.`
- One tile per vehicle type: real photo + equipment list [VERIFY per vehicle] + crew roles [VERIFY]. No stock images, ever.

### 9 · `FreezerVanBlock` (White card on Mist, Navy accents, quiet; Bangla first)
- **H2 (bn):** `লাশবাহী ফ্রিজিং গাড়ি — সম্মানের সাথে প্রিয়জনকে বাড়ি পৌঁছে দিই`
- Body (bn): `আপনার শোকে আমরা সমব্যথী। ঢাকা থেকে দেশের যেকোনো জেলায় প্রিয়জনের মরদেহ সম্মানের সাথে পৌঁছে দিতে আমরা ফ্রিজিং গাড়ি পাঠাই। রওনা দেওয়ার আগেই ভাড়া জানিয়ে দিই, অপেক্ষার সময়সহ।`
- Body (en, smaller, below): `We're sorry for your loss. We take your loved one home with respect, from Dhaka to any district. The fare, including waiting time, is told before we leave.`
- CTA (red, the only red here): `কল করুন, আমরা পাশে আছি: 01919-339689`
- Text link: `লাশবাহী ফ্রিজিং গাড়ি সম্পর্কে বিস্তারিত` → `/freezer-ambulance-service/`
- Rules: no "fast", no emojis, no images of bodies. An exterior van photo only, if real.

### 10 · `FAQ` (Warm White; native `<details>`, no JS)
- **H2:** `Questions families ask`
1. **What is the ambulance number in Dhaka?** Call 01919-339689. A dispatcher answers 24 hours a day, 7 days a week.
2. **How fast can an ambulance reach me?** Around 10 minutes in central Dhaka, depending on traffic. The dispatcher tells you the expected arrival time on the call.
3. **How much does an ambulance cost in Dhaka?** The fare depends on the ambulance type, the distance and any waiting time. We tell you the fare before we dispatch, including waiting and extra stops, and it does not change after the trip.
4. **Which ambulance do I need?** Tell the dispatcher the patient's condition and whether they need oxygen, a stretcher or a wheelchair. If a doctor has advised an ICU or NICU transfer, say so. We match the right vehicle.
5. **What should I tell the dispatcher?** Your area and a nearby landmark, the patient's condition, where they need to go, and a phone number we can reach.
6. **Do you go outside Dhaka?** Yes. We run ambulances from Dhaka to any district, any time.
7. **Do you have a freezer van?** Yes. We provide freezer vans to take a loved one home with respect, within Dhaka or to any district. The fare is told before we leave.
8. **Can I arrange a planned trip on WhatsApp?** Yes. For discharge or district trips, message us on WhatsApp and ask for your fare before you book. [VERIFY WhatsApp number; remove this FAQ if not confirmed]

Payment-methods FAQ: add only after [VERIFY cash/bKash/Nagad].

### 11 · `FinalCTA` (Warm White, centered)
- **H2:** `Need an ambulance now?`
- Large red button: `Call 01919-339689 — 24/7`
- Divider, then **H3:** `Planning a discharge or district trip?` + 3-field form: `Name` · `Phone` · `Pickup location` → button **`Request a call back`**
- Helper text under the form: `For an emergency, call. It's faster.`
- Form → Pages Function (Turnstile check) → Telegram alert to dispatch + email. Success message: `Thank you. A dispatcher will call you shortly.` [VERIFY callback time before stating one]

### 12 · `Footer` (Navy)
- NAP block (from `business.ts`): Ambulance BD 24 · Mohakhali, Dhaka 1212, Bangladesh [VERIFY street] · `01919-339689` · hello@ambulancebd24.com [VERIFY] · `Open 24 hours, 7 days a week`
- Columns: Services · Dhaka areas (existing pages only) · Districts · Company (About, Contact, Bangla)
- Social: Facebook, X, YouTube (real URLs from `business.ts`)
- `© {year} Ambulance BD 24`

### 13 · `MobileCallBar` (fixed bottom, mobile only, always visible)
Left 60%: red `Call now` (`tel:+8801919339689`). Right 40%: green `WhatsApp`. 64px tall, `padding-bottom: env(safe-area-inset-bottom)`. Add matching bottom padding to `<body>` so the bar never covers the footer.

---

## 4. Heading outline (exactly one H1)
H1 24/7 ambulance service in Dhaka
- H2 Which ambulance do you need? → H3 × service cards
- H2 What happens when you call → H3 × 3
- H2 The fare is told before we move
- H2 Ambulance service across Dhaka → H3 Dhaka areas · H3 From Dhaka to districts
- H2 What families say *(if rendered)*
- H2 Inside our ambulances *(if rendered)*
- H2 লাশবাহী ফ্রিজিং গাড়ি — …
- H2 Questions families ask
- H2 Need an ambulance now? → H3 Planning a discharge or district trip?

## 5. Internal links from the homepage
| Anchor | Target |
|---|---|
| ICU ambulance in Dhaka | /icu-ambulance-service-dhaka/ |
| NICU ambulance service | /nicu-ambulance-service-dhaka/ |
| AC ambulance in Dhaka | /ac-ambulance-service/ |
| Freezer van (লাশবাহী ফ্রিজিং গাড়ি) / লাশবাহী ফ্রিজিং গাড়ি সম্পর্কে বিস্তারিত | /freezer-ambulance-service/ |
| Dhaka to district ambulance | /inter-district-ambulance-service/ |
| Ambulance in {Area} | area pages (existing only) |
| Dhaka to {District} ambulance | district pages (existing only) |
| বাংলা | /bn/ |

## 6. Schema (one `@graph`, generated from `business.ts` + FAQ data)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ambulancebd24.com/#org",
      "name": "Ambulance BD 24",
      "url": "https://ambulancebd24.com/",
      "logo": "https://ambulancebd24.com/logo.png",
      "telephone": "+8801919339689",
      "email": "hello@ambulancebd24.com",
      "sameAs": [
        "https://www.facebook.com/AmbulanceBD24Service",
        "https://x.com/BdAmbulance",
        "https://www.youtube.com/@ambulancebd24"
      ]
    },
    {
      "@type": "EmergencyService",
      "@id": "https://ambulancebd24.com/#business",
      "name": "Ambulance BD 24",
      "url": "https://ambulancebd24.com/",
      "telephone": "+8801919339689",
      "parentOrganization": { "@id": "https://ambulancebd24.com/#org" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mohakhali",
        "addressLocality": "Dhaka",
        "postalCode": "1212",
        "addressCountry": "BD"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 23.7776294, "longitude": 90.4042711 },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "areaServed": [
        { "@type": "City", "name": "Dhaka" },
        { "@type": "Country", "name": "Bangladesh" }
      ],
      "hasMap": "[VERIFY GBP map URL]",
      "image": "[VERIFY real fleet photo URL]"
    },
    {
      "@type": "WebSite",
      "@id": "https://ambulancebd24.com/#website",
      "url": "https://ambulancebd24.com/",
      "name": "Ambulance BD 24",
      "inLanguage": ["en-BD", "bn-BD"],
      "publisher": { "@id": "https://ambulancebd24.com/#org" }
    },
    {
      "@type": "FAQPage",
      "@id": "https://ambulancebd24.com/#faq",
      "mainEntity": "[generated from the same faqs[] array rendered in section 10]"
    }
  ]
}
```
- Update `streetAddress` once [VERIFY] is cleared. Drop `hasMap`/`image` keys if values are not confirmed at build time (the linter blocks `[VERIFY]`).
- No `aggregateRating`, no `Review`.

## 7. Bangla homepage `/bn/`
Same structure and components with `lang="bn"`. H1: `ঢাকায় ২৪ ঘণ্টা অ্যাম্বুলেন্স সার্ভিস`. Lede: `দ্রুত অ্যাম্বুলেন্স, ভাড়া আগেই নিশ্চিত।` Primary CTA: `এখনই কল করুন: 01919-339689`. WhatsApp CTA: `হোয়াটসঅ্যাপে ভাড়া জানুন`. Form button: `কল ব্যাক চাই`. Bangla digits in copy (২৪ ঘণ্টা, ৳), Latin digits for the phone. Full Bangla copy is a separate task; write it natively, do not machine-translate.

## 8. Acceptance checklist
- [ ] Exactly one H1; heading order as in §4
- [ ] Phone appears in header, hero, fare section, final CTA, footer and mobile bar, all from `business.ts`
- [ ] No `#` links, no `[VERIFY]` in rendered HTML, no banned words (linter passes)
- [ ] Sections 7, 8, the rating line, the fare table, Non-AC/Air render only via verified flags
- [ ] JSON-LD validates in Google Rich Results Test and Schema.org validator
- [ ] Lighthouse mobile: Performance ≥ 95, SEO 100, Accessibility ≥ 95; LCP < 2.5s on simulated 4G
- [ ] Tap targets ≥ 48px; red/white contrast passes WCAG AA
- [ ] GA4 events fire on `tel:` and `wa.me` clicks
- [ ] Mobile bar never covers content; works at 360px width
