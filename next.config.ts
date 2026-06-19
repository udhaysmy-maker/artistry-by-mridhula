import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sharp loads libvips via dlopen() which Next.js file tracing doesn't follow.
  // Explicitly include the libvips shared libraries so they land in the Vercel bundle.
  outputFileTracingIncludes: {
    "/api/admin/gallery": ["./node_modules/@img/**/*"],
    "/api/admin/blog-images": ["./node_modules/@img/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
