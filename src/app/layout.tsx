import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

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
    default: "Free Online Calculators - Math, Health, Financial | Calculators All",
  },
  description: "A comprehensive collection of free online calculators for math, health, financial, and more. Fast, easy, and accurate.",
  keywords: ["calculator", "online calculator", "free calculator", "math", "finance", "health", "BMI", "mortgage"],
  authors: [{ name: "Calculators All" }],
  openGraph: {
    title: "Free Online Calculators - Math, Health, Financial",
    description: "A comprehensive collection of free online calculators for math, health, financial, and more.",
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
        {/* Global Google AdSense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1126148240601289" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50`}
      >
        <FirebaseAnalytics />
        <Navbar />
        <AdSpace slot="header-ad" format="auto" className="my-2 max-w-7xl mx-auto" />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full bg-white shadow-sm rounded-lg my-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
