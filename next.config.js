/** @type {import('next').NextConfig} */

const path = require('path')


const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '.'),
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'wedding-backend.songbooksofpraise.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
