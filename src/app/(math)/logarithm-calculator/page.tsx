"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LogarithmCalculator() {
  const [base, setBase] = useState("10");
  const [value, setValue] = useState("100");

  const [result, setResult] = useState<{
    logValue: number;
    naturalLog?: boolean;
  } | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const v = parseFloat(value);

    // Value must be strictly greater than 0
    if (isNaN(v) || v <= 0) {
      setResult(null);
      return;
    }

    // Base must be > 0 and != 1 (unless 'e' is handled, but here we require numeric input)
    // We will treat 'e' virtually if strictly typed, but here it's purely numeric.
    if (isNaN(b) || b <= 0 || b === 1) {
      setResult(null);
      return;
    }

    // Log_b(x) = ln(x) / ln(b)
    const logVal = Math.log(v) / Math.log(b);

    setResult({
      logValue: logVal,
      naturalLog: Math.abs(b - Math.E) < 0.0001,
    });
  };

  const setE = () => setBase(Math.E.toString());

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">㏒</span> Logarithm Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the logarithm of any positive real number using a custom
          base, base 10, or base e (ln).
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="block text-sm font-bold text-zinc-600 uppercase tracking-wide">
                Base (b)
              </label>
              <button
                onClick={setE}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors uppercase bg-emerald-50 px-2 py-1 rounded"
              >
                Use e (ln)
              </button>
            </div>
            <input
              type="number"
              step="any"
              min="0"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
            />
            <p className="text-xs text-zinc-400 mt-2">Must be &gt; 0 and ≠ 1</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Number (x)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
            <p className="text-xs text-zinc-400 mt-2">Must be &gt; 0</p>
          </div>
        </div>

        <div className="mt-8 text-center text-3xl font-mono text-zinc-300 font-bold">
          log<sub className="text-xl text-emerald-600">{base || "b"}</sub>(
          {value || "x"})
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Logarithm
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">
            Calculated Exponent (y)
          </h2>

          <div className="font-mono text-white font-black text-5xl md:text-7xl break-all z-10 tracking-tight bg-black/40 px-10 py-6 rounded-2xl border border-emerald-500/30 shadow-inner">
            {result.logValue.toLocaleString("en-US", {
              maximumFractionDigits: 6,
            })}
          </div>

          <p className="text-emerald-200 mt-6 z-10 font-bold italic">
            {parseFloat(base) !== Math.E
              ? parseFloat(base).toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })
              : "e"}
            <sup className="text-xs">
              {result.logValue.toLocaleString("en-US", {
                maximumFractionDigits: 4,
              })}
            </sup>{" "}
            = {parseFloat(value).toLocaleString("en-US")}
          </p>
        </div>
      )}

      <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
        <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">
          The Logarithm Rule
        </p>
        <div className="inline-block bg-white p-4 rounded-lg shadow-sm font-mono text-lg border border-zinc-200 mb-2">
          y = log<sub className="text-sm">b</sub>(x) ⟺ b
          <sup className="text-sm">y</sup> = x
        </div>
        <p>
          A logarithm is the exponent to which the chosen base must be raised to
          obtain the given number.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Logarithm Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Logarithm & Natural Log (ln) Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Logarithm Calculator</strong> performs the inverse
                mathematical operation of exponentiation. It calculates exactly
                what exponent a specific base number must be raised to in order
                to produce your target number.
              </p>
              <p>
                This tool seamlessly handles standard Base-10 logarithms, Base-2
                computer science logarithms, and the highly essential Base-e
                Natural Logarithm (ln) used extensively in physics and calculus.
              </p>
            </>
          }
          formula={
            <>
              <p>
                A logarithm asks one fundamental question: "
                <i>Base (b) raised to what power (y) equals number (x)?</i>".
                This relationship is written as:
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-emerald-900 border border-emerald-100">
                y = log<sub className="text-[10px]">b</sub>(x) &nbsp;&nbsp; ⟺
                &nbsp;&nbsp; b<sup className="text-[10px]">y</sup> = x
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Base (b):</strong> The underlying number being
                  multiplied by itself. It must be greater than 0, and not equal
                  to 1.
                </li>
                <li>
                  <strong>Number (x):</strong> The target product you are trying
                  to reach. It must be greater than 0.
                </li>
                <li>
                  <strong>Exponent (y):</strong> The result calculated by this
                  tool. The number of times the base must multiply itself.
                </li>
              </ul>
              <p className="mt-4 text-sm bg-zinc-100 p-3 rounded">
                <strong>Note:</strong> To calculate uncommon custom bases across
                different programming systems, this calculator internally
                utilizes the <i>Change of Base Formula</i>:{" "}
                <code>log_b(x) = ln(x) / ln(b)</code>.
              </p>
            </>
          }
          example={
            <>
              <p>
                Let's map out a classic example using <strong>Base 10</strong>{" "}
                with a target <strong>Number of 1000</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Question:</strong> log<sub>10</sub>(1000) = ? (10
                  raised to <i>what power</i> equals 1000?)
                </li>
                <li>
                  <strong>The Math:</strong> 10 × 10 = 100. Then 100 × 10 =
                  1000. It required 3 multiplications.
                </li>
                <li>
                  <strong>The Result:</strong> The calculator correctly
                  identifies the logarithm as <strong>3</strong>.
                </li>
                <li>
                  <strong>Verification:</strong> 10³ = 1000.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Chemistry:</strong> Using Base-10 logarithms to
                calculate the pH and acidity levels of liquid chemical solutions
                based on hydrogen ion concentration.
              </li>
              <li>
                <strong>Acoustics & Seismology:</strong> Measuring the intensity
                of earthquakes on the Richter scale, or the loudness of sound in
                Decibels (dB), both of which are Base-10 logarithmic scales.
              </li>
              <li>
                <strong>Computer Science:</strong> Using Base-2 logarithms to
                calculate data storage metrics (bits and bytes) and measure the
                time complexity of sorting algorithms (Big O Notation).
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is the Natural Log (ln)?",
              answer:
                "The Natural Logarithm (written as 'ln') is simply a normal logarithm that explicitly uses Euler's constant 'e' (approximately 2.71828) as its base. It appears incredibly frequently in formulas relating to compound interest, biology, and thermodynamics.",
            },
            {
              question: "Why can't the target number be zero or negative?",
              answer:
                "Because you cannot multiply a positive base by itself any number of times to reach 0 or a negative number. For example, 2 raised to a positive exponent gets bigger, and 2 raised to a negative exponent becomes a fraction. It never hits exactly 0.",
            },
            {
              question: "Why can't the base be 1?",
              answer:
                "Because 1 multiplied by itself any number of times is always going to just equal 1 (1¹ = 1, 1² = 1, 1³ = 1). Therefore, a logarithm with a base of 1 trying to reach any target other than 1 is mathematically impossible.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Exponent Calculator",
              path: "/exponent-calculator",
              desc: "Perform the exact mathematical inverse operation of a logarithm.",
            },
            {
              name: "Compound Interest Calculator",
              path: "/compound-interest-calculator",
              desc: "See where the natural logarithm 'e' applies to continuous compounding finance.",
            },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator",
              desc: "Access comprehensive trig, root, and log functions on a digital keypad.",
            },
          ]}
        />
      </div>
    </div>
  );
}
