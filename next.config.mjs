/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['via.placeholder.com', 'i.imgur.com', 'res.cloudinary.com'],
  },
};

export default nextConfig;
