/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export in production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
};

module.exports = nextConfig;
