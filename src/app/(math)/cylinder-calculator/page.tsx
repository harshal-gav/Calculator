"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import cylinderSeoData from "@/data/seo-content/official/cylinder-calculator.json";

export default function CylinderCalculator() {
  const [radius, setRadius] = useState("5");
  const [height, setHeight] = useState("10");

  const r = parseFloat(radius);
  const h = parseFloat(height);

  let volume = 0;
  let surfaceArea = 0;
  let baseArea = 0;
  let lateralArea = 0;
  let isValid = false;

  if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
    isValid = true;
    baseArea = Math.PI * r * r;
    lateralArea = 2 * Math.PI * r * h;
    surfaceArea = 2 * baseArea + lateralArea;
    volume = baseArea * h;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-cyan-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Cylinder Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate the volumetric and surface properties of a right cylinder.</p>
        </div>
        <div className="bg-cyan-50 px-4 py-2 rounded-full border border-cyan-100 shrink-0">
          <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider font-mono">3D Geometry</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-cyan-100 shadow-sm space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Base Radius (r)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-cyan-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
                placeholder="e.g. 5"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Height (h)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-cyan-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
                placeholder="e.g. 10"
              />
            </div>
          </div>

          <div className="bg-white border border-cyan-100 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden shadow-sm">
            <svg
              viewBox="0 0 100 100"
              className="w-40 h-40 drop-shadow-xl text-cyan-600 z-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <ellipse cx="50" cy="20" rx="30" ry="10" />
              <ellipse cx="50" cy="80" rx="30" ry="10" strokeDasharray="2,2" />
              <path d="M20 80 C20 85.5 33.4 90 50 90 C66.6 90 80 85.5 80 80" />
              <path d="M20 20 L20 80" />
              <path d="M80 20 L80 80" />
              <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="4,4" className="text-cyan-400" />
              <line x1="50" y1="80" x2="80" y2="80" strokeDasharray="4,4" className="text-cyan-400" />
            </svg>
            <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mt-4">Structural Diagram</div>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          
          {isValid ? (
            <div className="relative z-10 w-full space-y-6">
              <div className="bg-cyan-600 p-8 rounded-2xl shadow-xl text-center group transition-all">
                <span className="block text-[10px] font-bold text-cyan-200 uppercase tracking-widest mb-2">Total Internal Volume</span>
                <div className="text-5xl md:text-6xl font-black text-white font-mono break-all drop-shadow-lg">
                  {volume.toLocaleString(undefined, { maximumFractionDigits: 3 })}
                </div>
                <div className="text-[10px] font-bold text-cyan-200 uppercase tracking-widest mt-2">{`V = πr²h`}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center">
                  <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Surface Area</span>
                  <span className="text-2xl font-black text-white font-mono">{surfaceArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest mt-1">A = 2πr(r + h)</span>
                </div>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center">
                  <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Lateral Surface Area</span>
                  <span className="text-2xl font-black text-white font-mono">{lateralArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest mt-1">L = 2πrh</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-center flex justify-between items-center px-8">
                  <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">Base Cap Area</span>
                  <span className="text-xl font-black text-white font-mono">{baseArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">B = πr²</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 px-8">
              <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-cyan-400 text-6xl font-serif border border-cyan-500/20">
                V
              </div>
              <div className="text-cyan-200/50 uppercase tracking-widest font-bold text-sm">Target absolute physical metrics to evaluate geometry.</div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={cylinderSeoData.title}
        whatIsIt={cylinderSeoData.whatIsIt}
        formula={cylinderSeoData.formula}
        example={cylinderSeoData.example}
        useCases={cylinderSeoData.useCases}
        faqs={cylinderSeoData.faqs}
        deepDive={cylinderSeoData.deepDive}
        glossary={cylinderSeoData.glossary}
        relatedCalculators={[
          {
            name: "Circle Calculator",
            path: "/circle-calculator/",
            desc: "Isolate the geometric properties of the cylinder's completely flat 2D base endpoints.",
          },
          {
            name: "Cone Calculator",
            path: "/cone-calculator/",
            desc: "Understand how tapering the cylinder into a point affects its exact volumetric displacement.",
          },
          {
            name: "Sphere Calculator",
            path: "/sphere-calculator/",
            desc: "Measure the properties of a perfectly rounded 3D structure with no flat bases.",
          },
          {
            name: "Average Calculator",
            path: "/average-calculator/",
            desc: "Analyze tank capacities across your facility by calculating the systemic mean volume.",
          }
        ]}
      />
    </div>
  );
}
