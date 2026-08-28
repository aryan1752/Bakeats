import "@/lib/polyfill";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/ui/Footer";
import BakeatsNavbar from "@/components/ui/BakeatsNavbar";
import MobileBottomNav from "@/components/ui/MobileBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bakeats",
  description: "Bakeats Official Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800 min-h-screen flex flex-col`}
       >
        

        <BakeatsNavbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full pt-16 md:pt-20 pb-16 md:pb-0">
          {children}
        </main>

        
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}