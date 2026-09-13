import type { NextConfig } from "next";

const cloudflareWebAnalyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN: cloudflareWebAnalyticsToken,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
