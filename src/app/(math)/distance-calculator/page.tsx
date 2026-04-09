"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import distanceSeoData from "@/data/seo-content/official/distance-calculator.json";

export default function DistanceCalculator() {
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("3");
  const [y2, setY2] = useState("4");

  const [result, setResult] = useState<{
    distance: number;
    steps: string;
  } | null>(null);

  const calculate = () => {
    const p1x = parseFloat(x1);
    const p1y = parseFloat(y1);
    const p2x = parseFloat(x2);
    const p2y = parseFloat(y2);

    if (isNaN(p1x) || isNaN(p1y) || isNaN(p2x) || isNaN(p2y)) {
      setResult(null);
      return;
    }

    const dx = p2x - p1x;
    const dy = p2y - p1y;
    const obj = Math.sqrt(dx * dx + dy * dy);

    const steps = `d = √[(${p2x} - ${p1x})² + (${p2y} - ${p1y})²]
d = √[(${dx})² + (${dy})²]
d = √[${dx * dx} + ${dy * dy}]
d = √${dx * dx + dy * dy}
d ≈ ${obj.toFixed(4)}`;

    setResult({
      distance: obj,
      steps: steps,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-sky-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-sky-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Distance Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate the exact linear distance between two coordinates.</p>
        </div>
        <div className="bg-sky-50 px-4 py-2 rounded-full border border-sky-100 shrink-0">
          <span className="text-sky-600 font-bold text-sm uppercase tracking-wider font-mono">Cartesian Geometry</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-6 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-sky-100 shadow-sm space-y-8">
            <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100/50 relative">
              <span className="absolute -top-3 left-4 bg-sky-100 text-sky-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-sky-200">Point A</span>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest text-center">x₁</label>
                  <input
                    type="number"
                    step="any"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                    className="w-full rounded-xl border-zinc-200 p-4 shadow-sm focus:border-sky-500 bg-white font-black text-xl text-center outline-none transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest text-center">y₁</label>
                  <input
                    type="number"
                    step="any"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                    className="w-full rounded-xl border-zinc-200 p-4 shadow-sm focus:border-sky-500 bg-white font-black text-xl text-center outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 relative">
               <span className="absolute -top-3 left-4 bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-rose-200">Point B</span>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest text-center">x₂</label>
                  <input
                    type="number"
                    step="any"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                    className="w-full rounded-xl border-zinc-200 p-4 shadow-sm focus:border-sky-500 bg-white font-black text-xl text-center outline-none transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest text-center">y₂</label>
                  <input
                    type="number"
                    step="any"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && calculate()}
                    className="w-full rounded-xl border-zinc-200 p-4 shadow-sm focus:border-sky-500 bg-white font-black text-xl text-center outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-sky-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-sky-700 transition shadow-xl shadow-sky-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Calculate Distance
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-6 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="relative z-10 w-full space-y-6">
              <div className="bg-sky-600/20 border border-sky-500/30 p-8 rounded-2xl text-center">
                <span className="block text-[10px] font-bold text-sky-300 uppercase tracking-widest mb-2">Linear Distance (d)</span>
                <div className="text-5xl md:text-6xl font-black text-white font-mono break-all drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                   {result.distance.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
              </div>

              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Algebraic Breakdown</span>
                <pre className="font-mono text-sky-200/80 text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                  {result.steps}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 opacity-40 uppercase italic font-black text-4xl text-sky-400 tracking-tighter">
              Map the Coordinates
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={distanceSeoData.title}
        whatIsIt={distanceSeoData.whatIsIt}
        formula={distanceSeoData.formula}
        example={distanceSeoData.example}
        useCases={distanceSeoData.useCases}
        faqs={distanceSeoData.faqs}
        deepDive={distanceSeoData.deepDive}
        glossary={distanceSeoData.glossary}
        relatedCalculators={[
          {
            name: "Midpoint Calculator",
            path: "/midpoint-calculator/",
            desc: "Find the exact halfway coordinate located between these two same points.",
          },
          {
            name: "Pythagorean Theorem Calculator",
            path: "/pythagorean-calculator/",
            desc: "Explore the core geometric concept that powers the distance formula.",
          },
          {
            name: "Slope Calculator",
            path: "/slope-calculator/",
            desc: "Determine the angle and absolute steepness of the line connecting your two points.",
          },
          {
            name: "Circle Calculator",
            path: "/circle-calculator/",
            desc: "Use your calculated distance as a radius to map a perfect geometric circle.",
          }
        ]}
      />
    </div>
  );
}
