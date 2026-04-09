"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import circleSeoData from "@/data/seo-content/official/circle-calculator.json";

export default function CircleCalculator() {
  const [inputType, setInputType] = useState("radius");
  const [inputValue, setInputValue] = useState("5");

  // Output state
  const [result, setResult] = useState<{
    radius: number;
    diameter: number;
    circumference: number;
    area: number;
  } | null>(null);

  const calculateCircle = () => {
    const val = parseFloat(inputValue) || 0;

    if (val > 0) {
      let r = 0;

      // Derive radius from whatever input they gave
      if (inputType === "radius") r = val;
      if (inputType === "diameter") r = val / 2;
      if (inputType === "circumference") r = val / (2 * Math.PI);
      if (inputType === "area") r = Math.sqrt(val / Math.PI);

      const d = 2 * r;
      const c = 2 * Math.PI * r;
      const a = Math.PI * Math.pow(r, 2);

      setResult({
        radius: r,
        diameter: d,
        circumference: c,
        area: a,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
          <span className="mr-3">◯</span> Circle Calculator
        </h1>
        <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
          Solve all geometric properties of a circle—radius, diameter, area, and circumference—from a single known value.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              I know the circle's:
            </label>
            <select
              value={inputType}
              onChange={(e) => {
                setInputType(e.target.value);
                setResult(null);
              }}
              className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-indigo-500 font-bold bg-zinc-50 text-indigo-900 cursor-pointer outline-none transition-all"
            >
              <option value="radius">Radius (r)</option>
              <option value="diameter">Diameter (d)</option>
              <option value="circumference">Circumference (C)</option>
              <option value="area">Area (A)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide capitalize">
              Enter {inputType} value
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-indigo-500 font-black text-2xl text-gray-800 bg-zinc-50 outline-none transition-all"
              placeholder="e.g. 5"
            />
          </div>

          <button
            onClick={calculateCircle}
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/30 uppercase tracking-widest text-lg"
          >
            Solve Geometry
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-slate-900 border border-white/5 rounded-2xl shadow-2xl flex flex-col p-8 space-y-4 justify-center relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="z-10 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <span className="font-bold text-zinc-500 uppercase text-[10px] tracking-widest">
                    Radius (r)
                  </span>
                  <span className="font-mono font-black text-xl text-white">
                    {result.radius.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <span className="font-bold text-zinc-500 uppercase text-[10px] tracking-widest">
                    Diameter (d)
                  </span>
                  <span className="font-mono font-black text-xl text-white">
                    {result.diameter.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-5 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
                  <span className="font-bold text-indigo-300 uppercase text-[10px] tracking-widest">
                    Circumference (C)
                  </span>
                  <span className="font-mono font-black text-2xl text-indigo-400">
                    {result.circumference.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-indigo-600 rounded-2xl shadow-xl mt-2">
                  <span className="font-bold text-indigo-200 uppercase text-xs tracking-widest mb-1 text-center">
                    Total Surface Area (A)
                  </span>
                  <span className="font-mono font-black text-4xl text-white">
                    {result.area.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-200 mt-1 uppercase tracking-widest">
                    Square Units²
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-indigo-400 opacity-40 font-bold p-10 tracking-tighter text-2xl uppercase italic">
              Solve the Circle
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
            name: "Circle Calculator",
            operatingSystem: "All",
            applicationCategory: "ResourceApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title={circleSeoData.title}
          whatIsIt={circleSeoData.whatIsIt}
          formula={circleSeoData.formula}
          example={circleSeoData.example}
          useCases={circleSeoData.useCases}
          faqs={circleSeoData.faqs}
          deepDive={circleSeoData.deepDive}
          glossary={circleSeoData.glossary}
          relatedCalculators={[
            {
              name: "Area Calculator",
              path: "/area-calculator/",
              desc: "Compare circular surface space with squares and rectangles for industrial layout.",
            },
            {
              name: "Cone Calculator",
              path: "/cone-calculator/",
              desc: "Extend your 2D circles into 3D space by calculating the volume of a cone.",
            },
            {
              name: "Average Calculator",
              path: "/average-calculator/",
              desc: "Find the mean of your geometric data sets for statistical verification.",
            },
            {
              name: "Perimeter Calculator",
              path: "/perimeter-calculator/",
              desc: "Calculate the boundary of any polygon compared to circular circumference.",
            }
          ]}
        />
      </div>
    </div>
  );
}
