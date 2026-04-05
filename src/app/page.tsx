import { Metadata } from "next";
import dynamic from 'next/dynamic';
import ChapterNavbar from "@/components/ChapterNavbar";
import { categories } from "@/data/homepage/categories";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const HomeSearch = dynamic(() => import("@/components/HomeSearch"), { ssr: true });
const HomeSEOWrapper = dynamic(() => import("@/components/HomeSEOWrapper"), { ssr: true });

export default function Home() {
  return (
    <div className="py-8">
      <div className="text-center mb-12 px-4">
        <header>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tightest tracking-tightest">
            The World's Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Powerful</span> Calculators
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Calculator All delivers expert-grade precision across 280+ tools. Fast, accurate, and built for discovery.
          </p>
        </header>
      </div>

      <ChapterNavbar />
      <HomeSearch categories={categories} />
      <HomeSEOWrapper />
    </div>
  );
}
