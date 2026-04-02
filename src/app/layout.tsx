import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.calculator-all.com"),
  title: {
    template: "%s | Calculator All",
    default: "Free Online Calculators for Everything",
  },
  description:
    "Free online calculators for math, health, finance, and everyday utilities. Fast, easy-to-use tools to help you solve everyday calculations instantly.",
  keywords: [
    "calculator",
    "online calculator",
    "free calculator",
    "math",
    "finance",
    "health",
    "BMI",
    "mortgage",
  ],
  authors: [{ name: "Calculator All" }],
  openGraph: {
    title: "Free Online Calculators for Everything",
    description:
      "Discover a comprehensive collection of free online calculators for math, health, finance, and technology.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "Calculator All",
    statusBarStyle: "default",
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
        <Script
          id="adsterra-social-bar"
          src="https://pl29042747.profitablecpmratenetwork.com/7a/47/fd/7a47fd360cce722626d103ccace5d6f5.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
