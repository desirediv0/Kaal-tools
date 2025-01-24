/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yes-book.com",
      },
      {
        protocol: "http",
        hostname: "yes-book.com",
      },
      {
        protocol: "https",
        hostname: "kaaltools.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
      
    ];
  },
};

export default nextConfig;
