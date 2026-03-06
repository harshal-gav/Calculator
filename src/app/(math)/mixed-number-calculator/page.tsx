"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MixedNumberCalculator() {
  const [whole, setWhole] = useState("2");
  const [numerator, setNumerator] = useState("1");
  const [denominator, setDenominator] = useState("2");

  const [result, setResult] = useState<{
    improperNumerator: number;
    improperDenominator: number;
    decimal: number;
  } | null>(null);

  const calculate = () => {
    const w = parseInt(whole);
    const n = parseInt(numerator);
    const d = parseInt(denominator);

    if (isNaN(w) || isNaN(n) || isNaN(d) || d === 0) {
      setResult(null);
      return;
    }

    // Handle negative whole numbers correctly: e.g. -2 1/2 is -5/2
    const isNegative = w < 0;
    const absW = Math.abs(w);

    const improperNumerator = absW * d + n;
    const finalNum = isNegative ? -improperNumerator : improperNumerator;

    const decimal = finalNum / d;

    setResult({
      improperNumerator: finalNum,
      improperDenominator: Math.abs(d),
      decimal,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-orange-900 flex items-center justify-center font-serif">
          <span className="mr-3">➕</span> Mixed Number Calculator
        </h1>
        <p className="text-orange-700 text-lg max-w-2xl mx-auto">
          Convert mixed numbers (whole number + fraction) into improper
          fractions and decimals instantly.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-8">
          <div>
            <label className="block text-[10px] uppercase font-bold text-zinc-400 text-center mb-1">
              Whole
            </label>
            <input
              type="number"
              step="1"
              value={whole}
              onChange={(e) => setWhole(e.target.value)}
              className="w-24 md:w-32 text-center rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-orange-500 font-bold bg-zinc-50 text-4xl"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-400 text-center mb-1">
                Numerator
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={numerator}
                onChange={(e) => setNumerator(e.target.value)}
                className="w-20 md:w-24 text-center rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-orange-500 font-bold bg-zinc-50 text-xl"
              />
            </div>
            <div className="w-full h-1 bg-zinc-300 rounded"></div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-400 text-center mb-1">
                Denominator
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={denominator}
                onChange={(e) => setDenominator(e.target.value)}
                className="w-20 md:w-24 text-center rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-orange-500 font-bold bg-zinc-50 text-xl"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-orange-600/30 uppercase tracking-widest text-lg"
          >
            Convert Mixed Number
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-orange-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">
            Conversion Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl z-10 relative items-center">
            <div className="bg-black/40 p-8 rounded-2xl border border-orange-500/30 flex flex-col items-center justify-center text-center shadow-inner h-full">
              <span className="text-orange-300 text-[10px] font-bold uppercase tracking-widest mb-4">
                Improper Fraction
              </span>

              <div className="flex flex-col items-center w-full max-w-[120px]">
                <div className="font-mono text-white tracking-tight font-black text-4xl w-full text-center pb-2 border-b-4 border-white">
                  {result.improperNumerator}
                </div>
                <div className="font-mono text-white tracking-tight font-black text-4xl w-full text-center pt-2">
                  {result.improperDenominator}
                </div>
              </div>
            </div>

            <div className="bg-orange-900/60 p-8 rounded-2xl border border-orange-500/30 flex flex-col items-center justify-center text-center shadow-inner h-full">
              <span className="text-orange-300 text-[10px] font-bold uppercase tracking-widest mb-4">
                Decimal Equivalent
              </span>
              <div className="font-mono text-white tracking-tight font-black text-5xl break-all w-full text-center">
                {result.decimal.toLocaleString("en-US", {
                  maximumFractionDigits: 5,
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
            name: "Mixed Number Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <CalculatorSEO
        title="Mixed Number Calculator"
        whatIsIt={
          <p>
            The <strong>Mixed Number Calculator</strong> instantly converts
            mixed numbers (a whole number combined with a fraction) into their
            equivalent improper fraction and exact decimal formats.
          </p>
        }
        formula={
          <>
            <p>To convert a mixed number into an improper fraction:</p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
              <strong>
                New Numerator = (Whole Number × Denominator) + Numerator
              </strong>
              <br />
              <strong>Denominator stays the same.</strong>
            </div>
          </>
        }
        example={
          <>
            <p>
              Let's convert the mixed number <strong>2 3/4</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Multiply the Whole (2) by the Denominator (4): 2 × 4 = 8</li>
              <li>Add the original Numerator (3): 8 + 3 = 11</li>
              <li>
                Place over original Denominator: <strong>11/4</strong>
              </li>
              <li>
                To get the decimal: 11 ÷ 4 = <strong>2.75</strong>
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Advanced Math:</strong> You must convert mixed numbers to
              improper fractions before you can easily multiply or divide them
              in algebraic equations.
            </li>
            <li>
              <strong>Carpentry & DIY:</strong> Convert standard tape measure
              dimensions (like 5 7/8 inches) into decimals for ordering
              materials online or programming CNC routers.
            </li>
            <li>
              <strong>Baking Scaling:</strong> Turn recipes calling for 1 1/2
              cups of flour into decimals to easily multiply the recipe for
              larger batches.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "What is an improper fraction?",
            answer:
              "An improper fraction is simply any fraction where the top number (numerator) is equal to or larger than the bottom number (denominator), meaning the overall value is 1 or greater.",
          },
          {
            question: "How do negative mixed numbers work?",
            answer:
              "If you have a negative mixed number like -2 1/4, the entire value is negative. You convert it normally ignoring the sign (getting 9/4), and then apply the negative sign to the final result: -9/4.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Fraction to Decimal",
            path: "/fraction-to-decimal-calculator",
            desc: "Easily convert standard fractions to decimals and percentages.",
          },
          {
            name: "Fraction Simplifier",
            path: "/fraction-simplifier-calculator",
            desc: "Reduce complex fractions down to their lowest terms instantly.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator",
            desc: "Perform various percent-based math calculations.",
          },
        ]}
      />
    </div>
  );
}
