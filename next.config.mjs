/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["images.unsplash.com", "plus.unsplash.com", "pixabay.com", "cdn.pixabay.com", "storage.googleapis.com"],
   },
   async rewrites() {
      return [
         {
            // Intercepts frontend calls to /api/proxy/...
            source: '/api/proxy/:path*',
            // Redirects them cleanly to your Express server IP behind the scenes
            destination: `${process.env.NEXT_PUBLIC_BACKEND}/api/:path*`,
         },
      ];
   },
};

export default nextConfig;