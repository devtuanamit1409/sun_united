/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'sununited.demo-amit.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sununitedtech.com',
        port: '',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['demo-amit.com', '*.demo-amit.com', 'sununitedtech.com'],
    },
  },
  async headers() {
    return [
      {
        source: '/project/:slug',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  output: 'standalone',
};

module.exports = nextConfig;
