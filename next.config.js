/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")

const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    importScripts: ["/webpush-worker.js"],
    disable: process.env.NODE_ENV === 'development'
  },
  tsconfigPaths: true,
  images: {
    domains: ["lh3.googleusercontent.com"]
  }
})

module.exports = nextConfig
