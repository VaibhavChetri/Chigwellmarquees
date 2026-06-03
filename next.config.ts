import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Seed/stub media hosts. Replace with the real CDN (Mux/Cloudinary) later.
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "image.mux.com" },
    ],
  },
  experimental: {
    // PPR + typed routes are part of the §4 stack; enable when on a canary that supports them.
    optimizePackageImports: ["geist"],
  },
};

export default nextConfig;
