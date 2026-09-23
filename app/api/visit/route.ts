import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type RedisResult = { result?: number | string | null; error?: string };
const pageViewsKey = 'retenir-blog:v1:pageviews';
const visitorsKey = 'retenir-blog:v1:visitors';
const visitorCookie = 'retenir_visitor';

async function redis(commands: (string | number)[][]): Promise<RedisResult[]> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('Visit storage is not configured');

  const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Visit storage returned ${response.status}`);
  const results = (await response.json()) as RedisResult[];
  if (!Array.isArray(results) || results.some((item) => item.error)) {
    throw new Error('Visit storage command failed');
  }
  return results;
}

export async function POST(request: NextRequest) {
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const existing = request.cookies.get(visitorCookie)?.value;
  const visitorId = existing && /^[a-f\d-]{36}$/i.test(existing)
    ? existing
    : crypto.randomUUID();

  try {
    const [views, newVisitor] = await redis([
      ['INCR', pageViewsKey],
      ['SET', `retenir-blog:v1:browser:${visitorId}`, '1', 'EX', 60 * 60 * 24 * 365, 'NX'],
    ]);
    const visitorCount = newVisitor.result === 'OK'
      ? Number((await redis([['INCR', visitorsKey]]))[0].result)
      : Number((await redis([['GET', visitorsKey]]))[0].result ?? 0);
    const response = NextResponse.json({
      pageViews: Number(views.result),
      visitors: visitorCount,
    });
    response.headers.set('Cache-Control', 'no-store');
    if (existing !== visitorId) {
      response.cookies.set(visitorCookie, visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  } catch (error) {
    console.error('Unable to update visit counts:', error);
    return NextResponse.json({ error: 'Stats unavailable' }, { status: 503 });
  }
}
