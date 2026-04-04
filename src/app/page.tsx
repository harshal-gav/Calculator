import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";
import HomeSEOWrapper from "@/components/HomeSEOWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

import ChapterNavbar from "@/components/ChapterNavbar";

import { categories } from "@/data/homepage/categories";

export default function Home() {
  return (
    <>
      <ChapterNavbar />
      <div className="py-8">
        <div className="text-center mb-12 px-4">
          <header>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tightest tracking-tightest">
              The World's Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Powerful</span> Calculators
            </h1>
            <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Calculator All delivers expert-grade precision across 280+ financial, health, and scientific tools. Engineered for accuracy, built for enlightenment.
            </p>
          </header>
        </div>

        <HomeSearch categories={categories} />
        <HomeSEOWrapper />
      </div>
    </>
  );
}
