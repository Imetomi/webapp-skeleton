/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'webapp-skeleton-cms-1',
        port: '1337',
        pathname: '/uploads/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/strapi/:path*',
        destination: 'http://webapp-skeleton-cms-1:1337/api/:path*',
      },
    ];
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: 'http://webapp-skeleton-cms-1:1337',
    STRAPI_INTERNAL_URL: 'http://webapp-skeleton-cms-1:1337',
  },
};

module.exports = nextConfig;
