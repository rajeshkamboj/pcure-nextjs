import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * On-demand revalidation webhook. Call it from WordPress whenever content is
 * published/updated/deleted so the site shows the change immediately instead of
 * waiting for the 60 s ISR window.
 *
 *   POST https://<your-site>/api/revalidate
 *   header  x-revalidate-secret: <REVALIDATION_SECRET>      (or ?secret=… in the URL)
 *
 * Requires the REVALIDATION_SECRET environment variable (set it on Vercel and in .env.local).
 */
export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATION_SECRET;

  if (!expected) {
    return NextResponse.json(
      { revalidated: false, error: 'REVALIDATION_SECRET is not configured' },
      { status: 503 }
    );
  }

  const provided =
    request.headers.get('x-revalidate-secret') ??
    request.nextUrl.searchParams.get('secret');

  if (provided !== expected) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  // Expire every cached WordPress response immediately (all fetches are tagged 'wordpress')…
  revalidateTag('wordpress', { expire: 0 });
  // …and drop every cached page so the next request re-renders with fresh data.
  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
