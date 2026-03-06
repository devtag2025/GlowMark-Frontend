const nextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/wp-json/:path*",
        destination: "https://www.glowmarkagency.be/wp-json/:path*",
      },
    ];
  },

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
      {
        protocol: "https",
        hostname: "cms.glowmarkagency.be",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
