import CalculatorSEO from "@/components/CalculatorSEO";
import AgeCalculatorTool from "@/components/calculators/AgeCalculatorTool";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Age Calculator | Precision Chronometer',
  description: 'Calculate your exact age in years, months, and days with our professional-grade chronological engine. Detailed analysis of biological and historical timekeeping.',
};

import ageSeoData from "@/data/seo-content/official/age-calculator.json";

export default function AgeCalculatorPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
      {/* Premium Header */}
      <div className="relative mb-12 py-12 px-8 bg-gradient-to-br from-pink-600 via-rose-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">Professional Age Calculator</h1>
          <p className="text-pink-100 text-xl font-medium max-w-3xl opacity-90 leading-relaxed mx-auto md:mx-0">The world&apos;s most advanced chronological engine, designed for high-precision temporal analysis across centuries.</p>
        </div>
      </div>

      <AgeCalculatorTool />

      <CalculatorSEO
        title={ageSeoData.title}
        whatIsIt={ageSeoData.whatIsIt}
        formula={ageSeoData.formula}
        example={ageSeoData.example}
        useCases={ageSeoData.useCases}
        faqs={ageSeoData.faqs}
        deepDive={ageSeoData.deepDive}
        glossary={ageSeoData.glossary}
      />


      <footer className="mt-24 text-center py-10 border-t border-gray-100 grayscale hover:grayscale-0 transition-all">
         <p className="text-xs text-gray-400 font-bold tracking-widest italic opacity-50 uppercase leading-relaxed">&quot;Time is the longest distance between two places.&quot; — Tennessee Williams</p>
      </footer>
    </div>
  );
}
