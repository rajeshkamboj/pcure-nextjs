/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow WordPress and placeholder image hosts
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Allow any remote host for legacy compatibility; restrict in production if desired
    unoptimized: false,
  },
  // Required for Next 15/16 to handle async headers etc; keep default
  experimental: {
    // empty
  },
};

export default nextConfig;
