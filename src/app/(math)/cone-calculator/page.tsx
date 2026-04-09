"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import coneSeoData from "@/data/seo-content/official/cone-calculator.json";

export default function ConeCalculator() {
  const [radius, setRadius] = useState("5");
  const [height, setHeight] = useState("10");

  const r = parseFloat(radius);
  const h = parseFloat(height);

  let volume = 0;
  let surfaceArea = 0;
  let slantHeight = 0;
  let baseArea = 0;
  let lateralArea = 0;
  let isValid = false;

  if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
    isValid = true;
    slantHeight = Math.sqrt(r * r + h * h);
    baseArea = Math.PI * r * r;
    lateralArea = Math.PI * r * slantHeight;
    surfaceArea = baseArea + lateralArea;
    volume = (1 / 3) * Math.PI * r * r * h;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">▲</span> Cone Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the volume, total surface area, and slant height of a right circular cone instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Inputs */}
        <div className="md:col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                Base Radius (r)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-emerald-500 font-black text-2xl text-gray-800 bg-zinc-50 outline-none transition-all"
                placeholder="e.g. 5"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                Vertical Height (h)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-emerald-500 font-black text-2xl text-gray-800 bg-zinc-50 outline-none transition-all"
                placeholder="e.g. 10"
              />
            </div>
          </div>

          <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 flex items-center justify-center min-h-[200px] relative overflow-hidden shadow-inner">
            <svg
              viewBox="0 0 100 100"
              className="w-40 h-40 drop-shadow-xl text-emerald-600 z-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <ellipse cx="50" cy="80" rx="30" ry="10" strokeDasharray="2,2" />
              <path d="M20 80 C20 85.5 33.4 90 50 90 C66.6 90 80 85.5 80 80" />
              <path d="M20 80 L50 20 L80 80" />
              <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="4,4" className="text-emerald-400" />
              <line x1="50" y1="80" x2="80" y2="80" strokeDasharray="4,4" className="text-emerald-400" />
            </svg>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-12 lg:col-span-7 bg-slate-900 border border-white/5 rounded-3xl shadow-2xl p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          
          {isValid ? (
            <div className="z-10 space-y-6">
              <div className="bg-emerald-600 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2 text-emerald-200">
                  Total Capacity (Volume)
                </div>
                <div className="text-6xl font-black text-white font-mono">
                  {volume.toLocaleString(undefined, { maximumFractionDigits: 3 })}
                </div>
                <div className="text-[10px] mt-2 text-emerald-200 font-bold uppercase tracking-tighter">
                  Cubic Units³ (V = ⅓πr²h)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">Total Surface Area</div>
                  <div className="text-2xl font-black text-white">{surfaceArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">Slant Height (s)</div>
                  <div className="text-2xl font-black text-white">{slantHeight.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">Lateral Area (L)</div>
                  <div className="text-2xl font-black text-white">{lateralArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/5 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">Base Area (B)</div>
                  <div className="text-2xl font-black text-white">{baseArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-10 py-20 border border-white/5 bg-black/20 rounded-2xl">
              <div className="text-emerald-500/50 font-black text-7xl mb-6 font-serif">V?</div>
              <div className="text-emerald-200/40 font-bold text-lg tracking-widest uppercase">Input dimensions to solve the cone.</div>
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cone Calculator",
            operatingSystem: "All",
            applicationCategory: "CalculationApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title={coneSeoData.title}
          whatIsIt={coneSeoData.whatIsIt}
          formula={coneSeoData.formula}
          example={coneSeoData.example}
          useCases={coneSeoData.useCases}
          faqs={coneSeoData.faqs}
          deepDive={coneSeoData.deepDive}
          glossary={coneSeoData.glossary}
          relatedCalculators={[
            {
              name: "Cylinder Calculator",
              path: "/cylinder-calculator/",
              desc: "Compare the volume of a cone with its surrounding cylindrical bounds.",
            },
            {
              name: "Sphere Calculator",
              path: "/sphere-calculator/",
              desc: "Calculate the surface and volumetric properties of a perfect round ball.",
            },
            {
              name: "Average Calculator",
              path: "/average-calculator/",
              desc: "Find the mean of your industrial measurements for quality control verification.",
            },
            {
              name: "Circle Calculator",
              path: "/circle-calculator/",
              desc: "Focus strictly on the 2D cross-section and base geometry of your conical structure.",
            }
          ]}
        />
      </div>
    </div>
  );
}
