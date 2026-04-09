"use client";

import CalculatorSEO from "@/components/CalculatorSEO";
import DotProductTool from "@/components/calculators/DotProductTool";
import dotSeoData from "@/data/seo-content/official/dot-product-calculator.json";

export default function DotProductCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-emerald-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dot Product Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate the scalar product, magnitudes, and angular separation of two vectors.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shrink-0">
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider font-mono">Vector Operations</span>
        </div>
      </div>

      <DotProductTool />

      <CalculatorSEO
        title={dotSeoData.title}
        whatIsIt={dotSeoData.whatIsIt}
        formula={dotSeoData.formula}
        example={dotSeoData.example}
        useCases={dotSeoData.useCases}
        faqs={dotSeoData.faqs}
        deepDive={dotSeoData.deepDive}
        glossary={dotSeoData.glossary}
        relatedCalculators={[
          {
            name: "Cross Product Calculator",
            path: "/cross-product-calculator/",
            desc: "Calculate the perpendicular 3D resultant vector built from your two geometric bases.",
          },
          {
            name: "Vector Addition Calculator",
            path: "/vector-addition-calculator/",
            desc: "Add multiple vectors together to find their specific resultant trajectory.",
          },
          {
            name: "Unit Vector Calculator",
            path: "/unit-vector-calculator/",
            desc: "Normalize these vectors to a magnitude of exactly 1 to isolate pure direction.",
          },
          {
            name: "Scientific Calculator",
            path: "/scientific-calculator/",
            desc: "Perform manual trigonometric checks on your calculated angular separation.",
          }
        ]}
      />
    </div>
  );
}
