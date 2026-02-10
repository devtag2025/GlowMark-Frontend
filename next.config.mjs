/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.glowmarkagency.be",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "glowmarkagency.be",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
