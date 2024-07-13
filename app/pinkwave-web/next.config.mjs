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
  // ...other config settings
};

export default nextConfig;
