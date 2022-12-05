/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL,
  }
}

module.exports = nextConfig
