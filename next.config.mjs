/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // geoip-lite loads its .dat files via __dirname-relative paths at runtime;
  // letting webpack bundle it breaks that resolution, so keep it external.
  experimental: {
    serverComponentsExternalPackages: ["geoip-lite"],
  },
};

export default nextConfig;
