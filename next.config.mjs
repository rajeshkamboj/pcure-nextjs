/** @type {import('next').NextConfig} */

/*
 * Remote image hosts that next/image may optimise.
 *
 * Previously this was a wildcard ('**') for http AND https, which turns the
 * Vercel image optimizer into an open proxy. Now only the WordPress host
 * (derived from NEXT_PUBLIC_WORDPRESS_API_URL) plus any hosts listed in the
 * optional NEXT_PUBLIC_IMAGE_HOSTS env var (comma separated, e.g. a CDN) are
 * allowed. <RemoteImage> falls back to an un-optimised <img> for any other
 * host, so nothing breaks if a WordPress image lives somewhere unexpected.
 */
const wpHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '').hostname;
  } catch {
    return null;
  }
})();

const extraHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS || '')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean);

const imageHosts = [...new Set([wpHost, ...extraHosts].filter(Boolean))];

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ hostname })),
    formats: ['image/avif', 'image/webp'],
    // WordPress media rarely changes once uploaded; cache optimised variants for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
