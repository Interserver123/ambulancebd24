/**
 * GET /api/reviews: our own live Google reviews feed (no third-party script in the browser).
 *
 * Reads the Google Business Profile place through the Places API (New) on the server, keeps only
 * recent 4-5 star reviews, and caches the answer at the edge for one hour (so Google is called about
 * once an hour, not once per visitor). The page (src/layouts/SiteLayout.astro) renders the cards
 * with textContent only. Never review or rating schema.
 *
 * Settings in Cloudflare Pages > Settings > Environment variables (never in the repo):
 *   GOOGLE_PLACES_API_KEY  required  Places API (New) key, restricted to that API
 *   GOOGLE_PLACE_ID        optional  defaults to the Ambulance BD 24 place (business.ts gbp.reviewUrl)
 *
 * Without the key it answers 503 and the page keeps its plain "reviews on Google" link.
 */

const DEFAULT_PLACE_ID = 'ChIJ4RUtzdyTfYcR3KkqAqu2f3E';
const MIN_STARS = 4;
const MAX_REVIEWS = 3;
const EDGE_SECONDS = 3600;

const json = (body, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache, 'x-robots-tag': 'noindex' },
  });

export async function onRequestGet({ request, env, waitUntil }) {
  const key = env.GOOGLE_PLACES_API_KEY;
  if (!key) return json({ error: 'not-configured' }, 503);

  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/reviews', request.url).toString());
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const placeId = env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;
  let data;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'reviews' },
    });
    if (!res.ok) return json({ error: 'upstream' }, 502);
    data = await res.json();
  } catch {
    return json({ error: 'upstream' }, 502);
  }

  const reviews = (data.reviews ?? [])
    .map((r) => ({
      author: String(r.authorAttribution?.displayName ?? '').slice(0, 60),
      rating: Number(r.rating) || 0,
      text: String((r.originalText ?? r.text)?.text ?? '').slice(0, 500),
      lang: String((r.originalText ?? r.text)?.languageCode ?? 'en').slice(0, 8),
      time: String(r.publishTime ?? ''),
    }))
    .filter((r) => r.author && r.text && r.rating >= MIN_STARS)
    .sort((a, b) => b.time.localeCompare(a.time))
    .slice(0, MAX_REVIEWS);

  const res = json({ reviews }, 200, `public, max-age=300, s-maxage=${EDGE_SECONDS}`);
  waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}
