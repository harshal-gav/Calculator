"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function FractionToDecimalCalculator() {
  const [numerator, setNumerator] = useState("3");
  const [denominator, setDenominator] = useState("4");

  const [result, setResult] = useState<{
    decimal: number;
    percentage: number;
  } | null>(null);

  const calculate = () => {
    const n = parseFloat(numerator);
    const d = parseFloat(denominator);

    if (isNaN(n) || isNaN(d) || d === 0) {
      setResult(null);
      return;
    }

    const decimal = n / d;
    const percentage = decimal * 100;

    setResult({
      decimal,
      percentage,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">➗</span> Fraction to Decimal
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Instantly convert any fraction into a decimal number and a percentage.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <input
            type="number"
            step="any"
            value={numerator}
            onChange={(e) => setNumerator(e.target.value)}
            className="w-32 text-center rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-3xl"
            placeholder="Top"
          />
          <div className="w-40 h-1 bg-zinc-800 my-4 rounded"></div>
          <input
            type="number"
            step="any"
            value={denominator}
            onChange={(e) => setDenominator(e.target.value)}
            className="w-32 text-center rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-3xl"
            placeholder="Bot"
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Convert to Decimal
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl z-10 relative">
            <div className="bg-black/40 p-8 rounded-2xl border border-emerald-500/30 flex flex-col items-center text-center shadow-inner">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
                Decimal Result
              </span>
              <div className="font-mono text-white tracking-tight font-black text-4xl mt-2 break-all w-full">
                {result.decimal.toLocaleString("en-US", {
                  maximumFractionDigits: 6,
                })}
              </div>
            </div>

            <div className="bg-emerald-800/60 p-8 rounded-2xl border border-emerald-500/30 flex flex-col items-center text-center shadow-inner">
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2">
                Percentage Equivalent
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-4xl mt-2 truncate w-full">
                {result.percentage.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
                %
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
            name: "Fraction to Decimal Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <CalculatorSEO
        title="Fraction to Decimal Calculator"
        whatIsIt={
          <p>
            The <strong>Fraction to Decimal Calculator</strong> is an instant
            conversion tool that translates any mathematical fraction into its
            exact decimal equivalent and percentage form.
          </p>
        }
        formula={
          <>
            <p>
              Converting a fraction to a decimal is simply the process of
              division:
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
              <strong>Decimal = Numerator (Top) ÷ Denominator (Bottom)</strong>
              <br />
              <strong>Percentage = Decimal × 100</strong>
            </div>
          </>
        }
        example={
          <>
            <p>
              Take the fraction <strong>3/4</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                Divide the top by the bottom: 3 ÷ 4 = <strong>0.75</strong>
              </li>
              <li>
                Multiply by 100 for percentage: 0.75 × 100 ={" "}
                <strong>75%</strong>
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Students & Math Homework:</strong> Quickly verify manual
              long division calculations when learning fractions.
            </li>
            <li>
              <strong>Baking & Cooking:</strong> Convert standard recipe
              fractions (like 1/3 cup) into decimals for precise digital scale
              measurements.
            </li>
            <li>
              <strong>Construction & Carpentry:</strong> Translate fractional
              inch measurements on tape measures into decimal form for
              computer-aided tools.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "What is a repeating decimal?",
            answer:
              "A repeating decimal happens when a fraction cannot be perfectly divided without an infinite sequence. For example, 1/3 equals 0.333333... repeating infinitely.",
          },
          {
            question: "How do I convert a mixed number to a decimal?",
            answer:
              "First, keep the whole number exactly as it is. Then, convert the fraction part to a decimal by dividing the numerator by the denominator. Finally, add the two together. (e.g., 2 1/4 = 2 + 0.25 = 2.25).",
          },
        ]}
        relatedCalculators={[
          {
            name: "Mixed Number Calculator",
            path: "/mixed-number-calculator",
            desc: "Convert mixed numbers into decimals and improper fractions.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator",
            desc: "Easily calculate percentages, increases, and differences.",
          },
          {
            name: "Fraction Simplifier",
            path: "/fraction-simplifier-calculator",
            desc: "Reduce fractions to their simplest form instantly.",
          },
        ]}
      />
    </div>
  );
}
