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
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'http',  
        hostname: '20.91.139.244',  
        port: '1337', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storageteachingkit.blob.core.windows.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'licensebuttons.net',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    minimumCacheTTL: 1500000,
  },

  i18n: {
    locales: ['en', 'es-ES', 'fr-FR'],
    defaultLocale: 'en',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
