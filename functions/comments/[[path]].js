/** 410 Gone: old WordPress URL that no longer exists. Tells crawlers to drop it for good. */
export const onRequest = () =>
  new Response('Gone', { status: 410, headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=86400' } });
