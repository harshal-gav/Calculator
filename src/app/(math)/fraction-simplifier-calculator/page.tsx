"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import fractionSimplifierSeoData from "@/data/seo-content/official/fraction-simplifier-calculator.json";

export default function FractionSimplifierCalculator() {
  const [numerator, setNumerator] = useState("24");
  const [denominator, setDenominator] = useState("36");

  const [result, setResult] = useState<{
    simpleNum: number;
    simpleDen: number;
    gcf: number;
    decimal: number;
    isMixed: boolean;
    wholeVal: number;
    remNum: number;
  } | null>(null);

  // Euclidean algorithm for GCF
  const getGCF = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      let t = b;
      b = a % b;
      a = t;
    }
    return Math.max(a, 1);
  };

  const calculate = () => {
    const num = parseInt(numerator);
    const den = parseInt(denominator);

    if (isNaN(num) || isNaN(den) || den === 0) {
      setResult(null);
      return;
    }

    const gcf = getGCF(num, den);

    // Handle negative signs (standardize so den is positive)
    let finalNum = num / gcf;
    let finalDen = den / gcf;
    if (finalDen < 0) {
      finalNum *= -1;
      finalDen *= -1;
    }

    const decimal = num / den;

    let wholeVal = 0;
    let remNum = 0;
    let isMixed = false;

    if (Math.abs(finalNum) > finalDen && finalNum !== 0 && finalDen !== 1) {
      isMixed = true;
      wholeVal = Math.trunc(finalNum / finalDen);
      remNum = Math.abs(finalNum % finalDen);
    }

    setResult({
      simpleNum: finalNum,
      simpleDen: finalDen,
      gcf,
      decimal,
      isMixed,
      wholeVal,
      remNum,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
          <span className="mr-3">➗</span> Fraction Simplifier
        </h1>
        <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
          Reduce any fraction to its lowest terms instantly.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 mb-8">
          <input
            type="number"
            value={numerator}
            onChange={(e) => setNumerator(e.target.value)}
            className="w-32 md:w-48 text-center rounded-xl py-4 text-3xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-indigo-500 focus:outline-none transition-colors"
            placeholder="Numerator"
          />
          <div className="w-full h-2 bg-indigo-900 rounded-full my-1"></div>
          <input
            type="number"
            value={denominator}
            onChange={(e) => setDenominator(e.target.value)}
            className="w-32 md:w-48 text-center rounded-xl py-4 text-3xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-indigo-500 focus:outline-none transition-colors"
            placeholder="Denominator"
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <button
          onClick={calculate}
          className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-lg"
        >
          Simplify Fraction
        </button>
      </div>

      {result !== null && (
        <div className="bg-indigo-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Reduced Form
          </h2>

          <div className="z-10 flex gap-8 items-center mb-10">
            {/* Original */}
            <div className="hidden md:flex flex-col items-center opacity-40 grayscale">
              <span className="text-white text-3xl font-bold font-mono">
                {numerator}
              </span>
              <div className="w-16 h-1 bg-white my-2 rounded"></div>
              <span className="text-white text-3xl font-bold font-mono">
                {denominator}
              </span>
            </div>

            <div className="hidden md:block text-indigo-400 text-4xl">=</div>

            {/* Simplified */}
            {result.simpleDen === 1 ? (
              <div className="p-8 rounded-3xl border border-indigo-500/30 bg-black/40 shadow-inner flex flex-col items-center justify-center">
                <span className="text-white font-mono font-black text-6xl md:text-8xl">
                  {result.simpleNum}
                </span>
              </div>
            ) : (
              <div className="p-8 rounded-3xl border border-indigo-500/30 bg-black/40 shadow-inner flex flex-col items-center">
                <span className="text-white font-mono font-black text-6xl md:text-8xl">
                  {result.simpleNum}
                </span>
                <div className="w-full min-w-[120px] h-2 bg-indigo-500 my-4 rounded-full"></div>
                <span className="text-white font-mono font-black text-6xl md:text-8xl">
                  {result.simpleDen}
                </span>
              </div>
            )}
          </div>

          <div className="w-full max-w-2xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.isMixed && (
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center col-span-1 md:col-span-2">
                <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                  Improper to Mixed Number
                </span>
                <div className="flex items-center text-white font-mono font-bold text-4xl">
                  <span className="text-5xl mr-3">{result.wholeVal}</span>
                  <div className="flex flex-col items-center">
                    <span>{result.remNum}</span>
                    <div className="w-8 h-1 bg-white my-1 rounded"></div>
                    <span>{result.simpleDen}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-center">
              <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                Greatest Common Factor
              </span>
              <div className="font-mono text-white text-2xl font-bold">
                GCF = {result.gcf}
              </div>
              <p className="text-white/40 text-xs mt-2 leading-tight">
                We divided top & bottom by {result.gcf} to simplify.
              </p>
            </div>
            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-center">
              <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                Decimal Value
              </span>
              <div className="font-mono text-white text-2xl font-bold">
                ≈{" "}
                {result.decimal.toLocaleString("en-US", {
                  maximumFractionDigits: 6,
                })}
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
            name: "Fraction Simplifier Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title={fractionSimplifierSeoData.title}
          whatIsIt={fractionSimplifierSeoData.whatIsIt}
          formula={fractionSimplifierSeoData.formula}
          example={fractionSimplifierSeoData.example}
          useCases={fractionSimplifierSeoData.useCases}
          faqs={fractionSimplifierSeoData.faqs}
          deepDive={fractionSimplifierSeoData.deepDive}
          glossary={fractionSimplifierSeoData.glossary}
          relatedCalculators={[
            {
              name: "Fraction to Decimal",
              path: "/fraction-to-decimal-calculator/",
              desc: "Easily convert fractions into standard decimals.",
            },
            {
              name: "Mixed Number Calculator",
              path: "/mixed-number-calculator/",
              desc: "Add, subtract, and multiply mixed numbers.",
            },
            {
              name: "Proportion Calculator",
              path: "/proportion-calculator/",
              desc: "Solve algebraic equations involving two set fractions.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator/",
              desc: "Easily calculate percentages, increases, and decreases.",
            }]}
        />
      </div>
    </div>
  );
}
