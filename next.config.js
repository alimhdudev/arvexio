const rewrites = () => {
  return [
    {
      source: "/api/:path*",
      // destination: "http://127.0.0.1:8000/api/:path*",
      // destination: "http://93.127.215.81:8000/api/:path*",
      // destination: "http://54.226.207.28:8000/api/:path*",
      // destination: "http://54.226.92.226:8000/api/:path*",
      destination: "http://89.116.23.112:8000/api/:path*",
    },
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      type: 'asset/resource',
    });
    return config;
  },
  async rewrites() {
    return rewrites();
  },
};

module.exports = nextConfig;