"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import decimalSeoData from "@/data/seo-content/official/decimal-to-fraction-calculator.json";

export default function DecimalToFractionCalculator() {
  const [decimalInput, setDecimalInput] = useState("0.875");

  const [result, setResult] = useState<{
    numerator: number;
    denominator: number;
    wholePart: number;
    isRepeating: boolean;
    error?: string;
  } | null>(null);

  // Helper: Greatest Common Divisor
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculate = () => {
    let inputStr = decimalInput.trim();
    
    if (!inputStr) {
      setResult({ numerator: 0, denominator: 0, wholePart: 0, isRepeating: false, error: "Please enter a value." });
      return;
    }

    // Check for repeating decimal syntax (e.g., "0.333..." or "0.3...")
    const isRepeating = inputStr.includes("...");
    if (isRepeating) {
      inputStr = inputStr.replace(/\.\.\./g, ""); // Remove the dots for parsing
    }

    const num = parseFloat(inputStr);

    if (isNaN(num)) {
      setResult({ numerator: 0, denominator: 0, wholePart: 0, isRepeating: false, error: "Invalid decimal format." });
      return;
    }

    const isNegative = num < 0;
    const absNum = Math.abs(num);
    const wholePart = Math.floor(absNum);
    const decimalPartStr = inputStr.includes(".") ? inputStr.split(".")[1] : "";
    
    let numerator = 0;
    let denominator = 1;

    if (isRepeating && decimalPartStr) {
      // Logic for pure repeating decimals like 0.333... -> 3/9
      // This is a simplified version (assumes the whole decimal part repeats)
      numerator = parseInt(decimalPartStr, 10);
      denominator = Math.pow(10, decimalPartStr.length) - 1;
    } else if (decimalPartStr) {
      // Standard terminating decimal
      const decimalPlaces = decimalPartStr.length;
      denominator = Math.pow(10, decimalPlaces);
      numerator = Math.round((absNum - wholePart) * denominator);
    } else {
      // Whole number
      setResult({
          numerator: 0,
          denominator: 1,
          wholePart: isNegative ? -wholePart : wholePart,
          isRepeating: false
      });
      return;
    }

    if (numerator === 0) {
       setResult({
          numerator: 0,
          denominator: 1,
          wholePart: isNegative ? -wholePart : wholePart,
          isRepeating: false
      });
      return;
    }

    // Simplify fraction
    const divisor = gcd(numerator, denominator);
    numerator = numerator / divisor;
    denominator = denominator / divisor;

    setResult({
      numerator: numerator,
      denominator: denominator,
      wholePart: isNegative ? -wholePart : wholePart, // keep sign on whole part
      isRepeating: isRepeating
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-blue-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Decimal to Fraction</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Convert base-10 decimals into exact, simplified fractional ratios.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shrink-0">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider font-mono">Conversion</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest flex justify-between">
                <span>Enter Decimal</span>
                <span className="text-blue-400 italic">e.g. 0.875 or 0.333...</span>
              </label>
              <input
                type="text"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && calculate()}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-blue-500 bg-zinc-50 font-black text-3xl text-center outline-none transition-all placeholder-zinc-300"
                placeholder="0.00"
              />
            </div>
            
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
              <p className="text-xs text-blue-800/60 font-medium leading-relaxed">
                <strong className="text-blue-600">Tip:</strong> For repeating decimals, add an ellipsis to the end of your string (e.g., <code className="bg-white px-1 py-0.5 rounded text-blue-600">0.666...</code>).
              </p>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-blue-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Reduce to Fraction
            </button>

            {result?.error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-center text-sm">
                {result.error}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[350px]">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          
          {result && !result.error ? (
            <div className="relative z-10 w-full space-y-8 flex flex-col items-center">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest opacity-60">Simplified Form</h2>
              
              <div className="flex items-center justify-center gap-6">
                {/* Whole Number Part */}
                {result.wholePart !== 0 && (
                   <div className="text-7xl md:text-8xl font-black text-white font-serif drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                     {result.wholePart}
                   </div>
                )}
                
                {/* Fraction Part */}
                {result.numerator !== 0 && (
                  <div className="flex flex-col items-center justify-center font-mono drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <span className="text-5xl md:text-7xl font-black text-blue-300">{result.numerator}</span>
                    <div className="w-full h-1.5 bg-blue-500/50 my-2 rounded-full"></div>
                    <span className="text-5xl md:text-7xl font-black text-sky-200">{result.denominator}</span>
                  </div>
                )}

                {/* Case: Input was just a 0 */}
                {result.wholePart === 0 && result.numerator === 0 && (
                    <div className="text-7xl md:text-8xl font-black text-white font-serif drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                     0
                   </div>
                )}
              </div>

              {result.isRepeating && (
                  <div className="mt-8 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-lg text-amber-200/80 text-[10px] font-bold uppercase tracking-widest">
                      Repeating Decimal Evaluated
                  </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 opacity-40 uppercase italic font-black text-4xl text-blue-400 tracking-tighter">
              Convert Value
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={decimalSeoData.title}
        whatIsIt={decimalSeoData.whatIsIt}
        formula={decimalSeoData.formula}
        example={decimalSeoData.example}
        useCases={decimalSeoData.useCases}
        faqs={decimalSeoData.faqs}
        deepDive={decimalSeoData.deepDive}
        glossary={decimalSeoData.glossary}
        relatedCalculators={[
          {
            name: "Fraction to Decimal Calculator",
            path: "/fraction-to-decimal-calculator/",
            desc: "Convert physical fractional ratios back into digital decimal readouts.",
          },
          {
            name: "Fraction Simplifier",
            path: "/fraction-simplifier-calculator/",
            desc: "Reduce complex fractions down to their lowest common denominator.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Understand how these decimals and fractions map exactly to percentages.",
          },
          {
            name: "Mixed Number Calculator",
            path: "/mixed-number-calculator/",
            desc: "Perform arithmetic directly on the mixed numbers generated here.",
          }
        ]}
      />
    </div>
  );
}
