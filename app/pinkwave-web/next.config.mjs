/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'static.palete.me',
        protocol: 'https',
      },
      {
        hostname: 'static.palete.me',
        protocol: 'http',
      },
    ],
  },
  transpilePackages: ['frames.js', 'frames.js/next', 'next/server', 'next/server.js'],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // ignoreBuildErrors: true,
  },
  // ...other config settings
};

export default nextConfig;
