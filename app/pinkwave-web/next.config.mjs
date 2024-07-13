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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // ...other config settings
};

export default nextConfig;
