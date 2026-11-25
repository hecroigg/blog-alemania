import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Emit canonical URLs and hreflang in the initial head for every crawler.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
