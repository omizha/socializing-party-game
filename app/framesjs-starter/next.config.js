/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*',
        protocol: 'http',
      },
      {
        hostname: '*',
        protocol: 'https',
      },
    ],
  },
  // prevent double render on dev mode, which causes 2 frames to exist
  reactStrictMode: false,
};

export default nextConfig;
