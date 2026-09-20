/**
 * Decides whether an image URL can safely go through the Next.js image
 * optimizer. Must stay in sync with `images.remotePatterns` in next.config.mjs
 * (both are derived from the same env vars).
 *
 * NOTE: `process.env.NEXT_PUBLIC_*` must be referenced literally so Next can
 * inline the values into the client bundle.
 */
const allowedHosts = new Set<string>(
  [
    (() => {
      try {
        return new URL(process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '').hostname;
      } catch {
        return '';
      }
    })(),
    ...(process.env.NEXT_PUBLIC_IMAGE_HOSTS || '').split(',').map((h) => h.trim()),
  ].filter(Boolean)
);

/** Local dev hosts (Laragon *.test, localhost, raw IPs) are blocked by the optimizer. */
const isLocalHost = (host: string) =>
  host === 'localhost' ||
  host.endsWith('.test') ||
  host.endsWith('.local') ||
  /^\d{1,3}(\.\d{1,3}){3}$/.test(host) ||
  host.includes(':');

export const canOptimizeImage = (src: string | undefined | null): boolean => {
  if (!src) return false;
  if (src.startsWith('/')) return true;

  try {
    const { hostname } = new URL(src);
    return !isLocalHost(hostname) && allowedHosts.has(hostname);
  } catch {
    return false;
  }
};
