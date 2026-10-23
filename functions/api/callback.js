/**
 * POST /api/callback — Cloudflare Pages Function for the call-back form.
 *
 * 1. Rejects bots: hidden "company" honeypot, and Cloudflare Turnstile when TURNSTILE_SECRET is set.
 * 2. Validates the 3 fields (name, phone, pickup).
 * 3. Emails the request through Resend to CALLBACK_TO.
 * 4. Optionally alerts dispatch on Telegram (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID).
 *
 * Settings live in Cloudflare Pages > Settings > Environment variables (never in the repo):
 *   RESEND_API_KEY      required  Resend API key
 *   CALLBACK_TO         required  where requests go (comma-separate several addresses)
 *   CALLBACK_FROM       required  sender on a domain verified in Resend, e.g. "Ambulance BD 24 <forms@ambulancebd24.com>"
 *   TURNSTILE_SECRET    optional  Turnstile secret key (pair with PUBLIC_TURNSTILE_SITE_KEY at build time)
 *   TELEGRAM_BOT_TOKEN  optional
 *   TELEGRAM_CHAT_ID    optional
 *
 * Fetch requests get JSON; a plain form post (no JavaScript) gets a short HTML page.
 */

const LIMITS = { name: 80, phone: 20, pickup: 160, source: 60 };

const clean = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

function reply(request, ok, status, message) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify({ ok, message }), { status, headers: { 'content-type': 'application/json' } });
  }
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${ok ? 'Request received' : 'Request not sent'} | Ambulance BD 24</title></head><body style="font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 20px;line-height:1.5"><h1 style="font-size:1.6rem">${ok ? 'Thank you.' : 'Sorry, that did not go through.'}</h1><p>${message}</p><p><a href="/">Back to the homepage</a></p></body></html>`;
  return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

async function turnstileOk(secret, token, ip) {
  if (!secret) return true; // Turnstile not configured yet: honeypot only.
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = await res.json().catch(() => ({}));
  return Boolean(data.success);
}

export async function onRequestPost({ request, env }) {
  const fail = 'We could not send your request. Please call the hotline.';
  let form;
  try {
    form = await request.formData();
  } catch {
    return reply(request, false, 400, fail);
  }

  // Bots fill the hidden field; pretend success so they learn nothing.
  if (clean(form.get('company'), 100)) return reply(request, true, 200, 'A dispatcher will call you shortly.');

  const name = clean(form.get('name'), LIMITS.name);
  const phone = clean(form.get('phone'), LIMITS.phone);
  const pickup = clean(form.get('pickup'), LIMITS.pickup);
  const source = clean(form.get('source'), LIMITS.source) || 'website';
  if (!name || !pickup || !/^[+\d][\d\s()-]{5,19}$/.test(phone)) return reply(request, false, 400, fail);

  const ip = request.headers.get('cf-connecting-ip') || '';
  if (!(await turnstileOk(env.TURNSTILE_SECRET, form.get('cf-turnstile-response'), ip))) {
    return reply(request, false, 400, fail);
  }

  if (!env.RESEND_API_KEY || !env.CALLBACK_TO || !env.CALLBACK_FROM) {
    console.error('callback: RESEND_API_KEY, CALLBACK_TO or CALLBACK_FROM is not set');
    return reply(request, false, 500, fail);
  }

  const when = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka', dateStyle: 'medium', timeStyle: 'short' });
  const page = request.headers.get('referer') || '';
  const text = [
    'New call-back request from the website',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Pickup location: ${pickup}`,
    '',
    `Sent: ${when} (Dhaka time)`,
    `Form: ${source}`,
    page ? `Page: ${page}` : '',
  ]
    .filter((l, i, a) => l || a[i - 1])
    .join('\n');

  const mail = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CALLBACK_FROM,
      to: env.CALLBACK_TO.split(',').map((s) => s.trim()).filter(Boolean),
      subject: `Call-back request: ${name}, ${phone}`,
      text,
    }),
  });
  if (!mail.ok) {
    console.error('callback: Resend failed', mail.status, await mail.text().catch(() => ''));
    return reply(request, false, 502, fail);
  }

  // Telegram alert is a bonus: never fail the request because of it.
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
    }).catch(() => {});
  }

  return reply(request, true, 200, 'A dispatcher will call you shortly.');
}

export function onRequest() {
  return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
}
