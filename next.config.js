/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // https://github.com/privateOmega/html-to-docx/issues/129
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'licensebuttons.net',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_HOST,
      },
    ],
    minimumCacheTTL: 1500000,
  },

  i18n: {
    locales: ['en', 'es-ES'],
    defaultLocale: 'en',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
