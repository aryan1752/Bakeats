import "@/lib/polyfill";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/ui/Footer";
import BakeatsNavbar from "@/components/ui/BakeatsNavbar";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
import { NotificationProvider } from "@/components/ui/NotificationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Coaching Centre in Hari Nagar, Jaitpur & Badarpur | Knowledge Venture Institute (KVI)",
  description: "Knowledge Venture Institute (KVI) is the #1 Coaching Centre in Hari Nagar, Jaitpur & Badarpur, New Delhi 110044. Expert tuition for Class 9-10th Foundations (Science & Maths), Class 11-12th Commerce & Humanities (Arts) by senior faculty. Call 7011731649.",
  keywords: [
    "Best coaching center in Hari Nagar Jaitpur",
    "Best coaching center in Badarpur New Delhi",
    "Class 9th 10th Science Maths tuition Jaitpur Badarpur",
    "Class 11th 12th Commerce coaching Hari Nagar",
    "Class 11th 12th Arts Humanities coaching Badarpur",
    "Accounts Economics Business Studies tuition Jaitpur",
    "Knowledge Venture Institute KVI Delhi",
    "Top tuition center near me Hari Nagar Jaitpur 110044",
    "Coaching center in Jaitpur Badarpur Delhi"
  ],
  authors: [{ name: "Knowledge Venture Institute (KVI)" }],
  creator: "Knowledge Venture Institute",
  publisher: "Knowledge Venture Institute",
  metadataBase: new URL("https://bakeats-blond.vercel.app/"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Best Coaching Centre in Hari Nagar, Jaitpur & Badarpur | KVI Delhi",
    description: "Top Coaching Centre for Class 6th-10th Foundations, 11th-12th Commerce & Arts in Hari Nagar, Jaitpur & Badarpur, New Delhi. Small batches & 100% conceptual clarity.",
    url: "https://bakeats-blond.vercel.app/",
    siteName: "Knowledge Venture Institute (KVI)",
    images: [
      {
        url: "/newlogo.png",
        width: 1200,
        height: 630,
        alt: "Knowledge Venture Institute Hari Nagar Jaitpur Badarpur Delhi"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Coaching Centre in Hari Nagar, Jaitpur & Badarpur | KVI",
    description: "Top Coaching for Class 6-10th Foundations, 11-12th Science, Commerce & Arts Stream in Jaitpur, Badarpur, Hari Nagar Delhi.",
    images: ["/newlogo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Knowledge Venture Institute",
    "alternateName": "KVI Coaching Institute",
    "url": "https://bakeats-blond.vercel.app/",
    "logo": "https://bakeats-blond.vercel.app/newlogo.png",
    "description": "Leading coaching institute in Hari Nagar, Jaitpur & Badarpur, New Delhi offering Class 6-10th Foundations, Class 11-12th Commerce and Humanities (Arts) programs.",
    "telephone": "+91-7011731649",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "I-49A, above Dabra Medical Center, Hari Nagar, Jaitpur",
      "addressLocality": "Badarpur, New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110044",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.5085,
      "longitude": 77.3090
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "248"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Academic Coaching Batches",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Class 6th to 10th Foundations (Maths & Science)",
          "description": "Comprehensive school and board conceptual prep for Class 6th, 7th, 8th, 9th & 10th in Hari Nagar Jaitpur Badarpur."
        },
        {
          "@type": "Course",
          "name": "Class 11th & 12th Commerce Stream",
          "description": "Specialized coaching in Accountancy, Economics & Business Studies by CS & CA faculty in Badarpur Jaitpur."
        },
        {
          "@type": "Course",
          "name": "Class 11th & 12th Humanities (Arts) Stream",
          "description": "Expert guidance in History, Political Science, Geography & Economics in Hari Nagar Jaitpur Badarpur."
        }
      ]
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#071728] text-white min-h-screen flex flex-col`}
      >
        <NotificationProvider>
          <BakeatsNavbar />

          {/* MAIN CONTENT */}
          <main className="flex-1 w-full pt-20 sm:pt-20 md:pt-24 pb-16 md:pb-0">
            {children}
          </main>

          <Footer />
          <MobileBottomNav />
        </NotificationProvider>
      </body>
    </html>
  );
}