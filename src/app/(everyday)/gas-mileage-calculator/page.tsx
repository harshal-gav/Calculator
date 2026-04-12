"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

import gasMileageSeoData from "@/data/seo-content/official/gas-mileage-calculator.json";

export default function GasMileageCalculator() {
  const [distance, setDistance] = useState("350");
  const [gasUsed, setGasUsed] = useState("14");

  const [result, setResult] = useState<{
    mpg: number;
    lp100km: number;
    kmpl: number;
  } | null>(null);

  const calculate = () => {
    const d = parseFloat(distance); // typically miles
    const g = parseFloat(gasUsed); // typically gallons

    if (isNaN(d) || isNaN(g) || d <= 0 || g <= 0) {
      setResult(null);
      return;
    }

    // Base: miles per gallon (US)
    const mpg = d / g;

    // Convert miles to km (1 mile = 1.60934 km)
    const km = d * 1.60934;

    // Convert US gallons to Liters (1 gal = 3.78541 L)
    const liters = g * 3.78541;

    // Derived metrics
    const lp100km = (liters / km) * 100;
    const kmpl = km / liters;

    setResult({
      mpg,
      lp100km,
      kmpl,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 flex items-center justify-center font-serif">
          <span className="mr-3">⛽</span> Gas Mileage Calculator
        </h1>
        <p className="text-slate-700 text-lg max-w-2xl mx-auto">
          Calculate your exact vehicle fuel efficiency (MPG, L/100km, km/L)
          based on distance driven and gas consumed.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto border-t-8 border-t-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Distance Driven (Miles)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-slate-500 font-bold bg-zinc-50 text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Gas Consumed (Gallons)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={gasUsed}
              onChange={(e) => setGasUsed(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-slate-500 font-bold bg-zinc-50 text-xl"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-slate-800/30 uppercase tracking-widest text-lg"
          >
            Calculate Mileage
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-700 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="bg-black/40 p-10 w-full max-w-md rounded-2xl border border-slate-700 flex flex-col items-center text-center shadow-inner z-10 mb-6">
            <span className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Fuel Efficiency
            </span>
            <div className="font-mono text-white tracking-tight font-black text-6xl mt-2 truncate w-full">
              {result.mpg.toLocaleString("en-US", { maximumFractionDigits: 1 })}{" "}
              <span className="text-2xl text-slate-400 ml-1">MPG</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl z-10 relative">
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-600/30 flex justify-between items-center px-8 shadow-sm">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wide">
                Litres per 100km
              </span>
              <div className="font-mono text-zinc-100 font-bold text-2xl truncate">
                {result.lp100km.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                L
              </div>
            </div>
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-600/30 flex justify-between items-center px-8 shadow-sm">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wide">
                Kilometers per Litre
              </span>
              <div className="font-mono text-zinc-100 font-bold text-2xl truncate">
                {result.kmpl.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                km/L
              </div>
            </div>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gas Mileage Calculator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title={gasMileageSeoData.title}
        whatIsIt={gasMileageSeoData.whatIsIt}
        formula={gasMileageSeoData.formula}
        example={gasMileageSeoData.example}
        useCases={gasMileageSeoData.useCases}
        faqs={gasMileageSeoData.faqs}
        deepDive={gasMileageSeoData.deepDive}
        glossary={gasMileageSeoData.glossary}
        relatedCalculators={[
          {
            name: "Fuel Cost Calculator",
            path: "/fuel-cost-calculator/",
            desc: "Estimate total trip expenses using your MPG and gas prices.",
          },
          {
            name: "Speed Calculator",
            path: "/speed-calculator/",
            desc: "Calculate travel time based on distance and average speed.",
          },
          {
            name: "Car Loan Calculator",
            path: "/auto-loan-calculator/",
            desc: "Budget for a more fuel-efficient vehicle upgrade.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Analyze efficiency improvements as percentages.",
          }]}
      />
    </div>
  );
}
