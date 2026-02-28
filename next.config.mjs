/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
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