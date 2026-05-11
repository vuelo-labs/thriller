// Cloudflare Pages Function: POST /api/subscribe
// Adds a contact to a Resend segment.
// Env vars (set in Cloudflare dashboard → Pages → vuelolabs → Settings → Variables):
//   RESEND_API_KEY     (secret)
//   RESEND_SEGMENT_ID  (plain)

interface Env {
  RESEND_API_KEY: string;
  RESEND_SEGMENT_ID: string;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY || !env.RESEND_SEGMENT_ID) {
    return json({ error: 'Server not configured' }, 500);
  }

  let email = '';
  let firstName = '';

  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    email = String(body.email ?? '').trim();
    firstName = String(body.firstName ?? '').trim();
  } else {
    const form = await request.formData();
    email = String(form.get('email') ?? '').trim();
    firstName = String(form.get('firstName') ?? '').trim();
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'A valid email is required.' }, 400);
  }

  const res = await fetch('https://api.resend.com/contacts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      first_name: firstName || undefined,
      unsubscribed: false,
      segments: [{ id: env.RESEND_SEGMENT_ID }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    if (res.status === 409 || /already exists/i.test(detail)) {
      return json({ ok: true, alreadySubscribed: true });
    }
    return json({ error: 'Could not subscribe right now.', detail }, 502);
  }

  return json({ ok: true });
};
