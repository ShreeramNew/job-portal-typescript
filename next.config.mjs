/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["images.unsplash.com", "plus.unsplash.com", "pixabay.com", "cdn.pixabay.com", "storage.googleapis.com"],
   },
   async headers() {
      return [
         {
            // This applies the header to every outgoing request your app makes
            source: "/:path*",
            headers: [
               {
                  key: "ngrok-skip-browser-warning",
                  value: "true",
               },
            ],
         },
      ];
   },
};

export default nextConfig;