/** @type {import('next').NextConfig} */

// Parse STRAPI_BASE_URL for image remote pattern
const strapiUrl = process.env.STRAPI_BASE_URL || "http://localhost:1337";
let strapiHost = "localhost";
let strapiProtocol = "http";
try {
  const parsed = new URL(strapiUrl);
  strapiHost = parsed.hostname;
  strapiProtocol = parsed.protocol.replace(":", "");
} catch {}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: strapiProtocol,
        hostname: strapiHost,
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "*.medusajs.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL:
      process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
  },
};

export default nextConfig;