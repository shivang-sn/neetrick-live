/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // geoip-lite loads its .dat files via __dirname-relative paths at runtime;
  // letting webpack bundle it breaks that resolution, so keep it external.
  experimental: {
    serverComponentsExternalPackages: ["geoip-lite"],
  },
  // /api/track writes to data/visitors.json on every page view. Without this,
  // webpack's dev watcher (which ignores .gitignore) sees that write, triggers
  // a recompile/reload, which remounts VisitorTracker, which writes again -
  // an infinite reload loop that made every page look hung.
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**", "**/data/**"],
    };
    return config;
  },
};

export default nextConfig;
