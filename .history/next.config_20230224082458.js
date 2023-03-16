/** @type {import('next').NextConfig} */

const server = dev
  ? "http://localhost:3000"
  : "https://hr-platform-extramus.vercel.app";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["demos.creative-tim.com"],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config;
  },
  server
};

const dev = process.env.NODE_ENV !== "production";


module.exports = nextConfig;
/*module.exports = {
  nextConfig,
  images: {
    domains: ["demos.creative-tim.com"],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config;
  },
  server,
};*/
