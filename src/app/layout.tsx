import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import StickyBottomAd from "@/components/StickyBottomAd";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Calculators All",
    default: "Free Online Calculators for Everything",
  },
  description: "Discover a comprehensive collection of free online calculators for math, health, finance, and technology. Our fast, easy-to-use, and highly accurate tools are designed to help you solve everyday problems instantly.",
  keywords: ["calculator", "online calculator", "free calculator", "math", "finance", "health", "BMI", "mortgage"],
  authors: [{ name: "Calculators All" }],
  openGraph: {
    title: "Free Online Calculators for Everything",
    description: "Discover a comprehensive collection of free online calculators for math, health, finance, and technology.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50`}
      >
        <FirebaseAnalytics />
        <Analytics />
        <SpeedInsights />
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full bg-white shadow-sm rounded-lg my-4 mb-24">
          {children}
        </main>
        <Footer />
        <StickyBottomAd />
        {/* Global Google AdSense Script using Next.js Script for async non-blocking load */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1126148240601289"
        />
      </body>
    </html>
  );
}
