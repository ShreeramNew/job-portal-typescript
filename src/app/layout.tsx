import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "@/components/reduxProvider/ReduxProvider";

const geistSans = localFont({
   src: "./fonts/GeistVF.woff",
   variable: "--font-geist-sans",
   weight: "100 900",
});
const geistMono = localFont({
   src: "./fonts/GeistMonoVF.woff",
   variable: "--font-geist-mono",
   weight: "100 900",
});

// ✅ Updated: Metadata now includes structured references to favicon files inside your public folder
export const metadata: Metadata = {
   title: "JobNow",
   description: "A latest Job Portal",
   icons: {
      icon: [
         { url: "/favicon.ico" }, // Default legacy favicon path
         { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }, // Standard browser tab icon
         { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }  // Small fallback browser tab icon
      ],
      apple: [
         { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" } // iOS Home screen thumbnail asset
      ]
   }
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ReduxProvider>{children}</ReduxProvider>
         </body>
      </html>
   );
}