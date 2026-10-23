# Photos

Name each file after its slot, optionally followed by `--` and a descriptive name (e.g. `icu--icu-ccu-ambulance-dhaka.jpg`); the descriptive part carries into the optimised file names. The site picks it up on the next build and converts it to AVIF/WebP.

**Image rule (approved 22 Oct 2026):** vehicles, crew, equipment and the base are real photos of our own only, never vehicles of other companies (check for other phone numbers or names on the body). Scene slots (`cta`, `base` until a real base photo exists, `air`) may use licensed stock or AI images that show no branded vehicle and no crew presented as ours; their alt text describes the scene only. ICU interior and equipment slots stay infographics until real photos exist (an image would claim equipment we have not confirmed).

## Sources

| File | Source | License |
|---|---|---|
| `inter-district--ambulance-for-district-trips.jpg` | Client's own site (wp-content/uploads/2023/04/Khulna-Ambulance-Service.jpg) | Client's photo |
| `cta--emergency-light-at-night.jpg` | Pexels photo 532001 | Pexels License (free commercial use) |
| `base--dispatcher-taking-an-ambulance-call.jpg` | Pexels photo 8204396 | Pexels License (free commercial use) |
| `air--air-ambulance-jet-on-the-tarmac.jpg` | Pexels photo 28776068 | Pexels License (free commercial use) |

Not usable from the old site: `ICU-Ambulance-Service-Dhaka.jpeg` (another company's phone numbers on the body), `AmbulanceBD24-Team.png` and `Ambulance-Service-Technology.jpg` (foreign stock, not our crew or fleet).

| File name (any of .jpg .png .webp .avif) | Where it shows | Size (at least) |
|---|---|---|
| `hero` | Homepage hero background (desktop only) | 1920×1080 |
| `dispatch` | "What happens when you call" | 1200×1500 (portrait) |
| `icu` | ICU Ambulance card | 1200×900 |
| `nicu` | NICU Ambulance card | 1200×900 |
| `ac` | AC Ambulance card | 1200×900 |
| `freezer` | Freezer Van card and the freezer van block (exterior only, never a body) | 1200×900 |
| `inter-district` | Inter-District card | 1200×900 |
| `non-ac` | Non-AC card (shows only once Non-AC is confirmed) | 1200×900 |
| `fare` | Fare promise section | 1200×900 |
| `cta` | "Need an ambulance now?" banner background | 1920×800 |
| `base` | Contact block (Mohakhali base) | 1200×900 |

Until a real photo is added, these slots show a built-in infographic instead of a blank tile (src/components/infographics): `inter-district` (route map), `base` (Mohakhali map), `cta` ("When you call us"), `air` (transfer steps), `icu-interior` (AC or ICU decision chart), `icu-equipment` (ICU transfer steps). A real photo always replaces the infographic.

Keep each original under about 2 MB. Alt text is set in `src/lib/photos.ts`.
