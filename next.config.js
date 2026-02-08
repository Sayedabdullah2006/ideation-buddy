/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // RTL Support
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: false,
  },

  // Image optimization
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Environment variables exposed to the client (minimal)
  env: {
    NEXT_PUBLIC_APP_NAME: 'IdeaFlow AI',
  },

  // Webpack configuration for RTL support
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
