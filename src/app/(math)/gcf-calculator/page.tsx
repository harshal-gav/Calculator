"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function GcfCalculator() {
  const [inputData, setInputData] = useState("24, 36, 60");

  const [result, setResult] = useState<{
    gcf: number;
    numbers: number[];
  } | null>(null);

  // Euclidean algorithm for Greatest Common Divisor
  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  };

  const calculateGCF = () => {
    // Parse input safely
    const rawValues = inputData.split(/[\s,]+/).filter(Boolean);
    // Only keep integers. Float GCF is non-standard.
    const numbers = [
      ...new Set(
        rawValues.map((v) => parseInt(v)).filter((v) => !isNaN(v) && v !== 0),
      ),
    ];

    if (numbers.length === 0) {
      setResult(null);
      return;
    }

    let currentGCF = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      currentGCF = gcd(currentGCF, numbers[i]);
    }

    setResult({
      gcf: currentGCF,
      numbers,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-cyan-700 border-b pb-4">
        GCF / HCF Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculates the Greatest Common Factor (also known as the Highest Common
        Factor) of a dataset of integers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 space-y-6 flex flex-col justify-center">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Integers (separated by commas or spaces)
            </label>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-cyan-500 font-mono text-lg text-gray-800 h-32 resize-none"
              placeholder="e.g. 15, 20, 25"
            ></textarea>
          </div>

          <button
            onClick={calculateGCF}
            className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Target GCF
          </button>
          <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest px-4 mt-2">
            Iteratively applies the Euclidean Algorithm.
          </p>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-cyan-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result !== null ? (
            <div className="w-full h-full flex flex-col items-center">
              <div className="p-10 w-full text-center bg-cyan-50 border-b border-cyan-100 shadow-inner flex-grow flex flex-col justify-center">
                <h3 className="text-cyan-800 font-bold uppercase tracking-widest text-[11px] mb-4">
                  Greatest Common Factor
                </h3>
                <div className="text-7xl font-black text-gray-900 drop-shadow-sm break-all max-w-[90%] mx-auto">
                  {result.gcf.toLocaleString("en-US")}
                </div>
              </div>

              <div className="p-4 w-full bg-gray-50 text-center border-t border-gray-200">
                <span className="block font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-1">
                  Evaluated Elements
                </span>
                <span className="font-mono text-sm text-gray-700 font-medium break-all">
                  GCF({result.numbers.join(", ")})
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-cyan-300 font-medium px-8 text-lg leading-relaxed py-10">
              Enter two or more non-zero integers to calculate the largest
              positive integer that divides all of them without a remainder.
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "GCF Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Greatest Common Factor (GCF) Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Greatest Common Factor (GCF) Calculator</strong>
                —also known universally as the Highest Common Factor
                (HCF)—determines the largest possible positive integer that can
                evenly divide into every number within your provided dataset
                without leaving a remainder.
              </p>
              <p>
                GCF is a foundational mathematical concept used globally to
                simplify algebraic fractions, factor polynomials, and determine
                perfect distribution ratios without fracturing the original
                items.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Factoring Calculator, Factoring
                Polynomials Calculator, Scale Factor Calculator, Gcf Calculator
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              GCF(a, b)
            </div>
            <p className="text-sm text-slate-500 text-center">
              Greatest Common Factor using Euclidean Algorithm.
            </p>
          </>
        }
          example={
            <>
              <p>
                Let's look at how GCF applies to an event-planning scenario.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> You are packing identical gift
                  bags for a party. You have exactly <strong>24</strong> candy
                  bars and <strong>36</strong> pieces of fruit. You want every
                  bag to be identical with nothing leftover. What is the maximum
                  number of bags you can make?
                </li>
                <li>
                  <strong>The Calculation:</strong> We need to find the GCF of{" "}
                  <strong>24</strong> and <strong>36</strong>.
                </li>
                <li>
                  <strong>The Factors:</strong> Factors of 24 are
                  (1,2,3,4,6,8,12,24). Factors of 36 are (1,2,3,4,6,9,12,18,36).
                </li>
                <li>
                  <strong>Result:</strong> The largest number in both lists is{" "}
                  <strong>12</strong>. You can make exactly 12 gift bags (each
                  containing perfectly 2 candy bars and 3 pieces of fruit).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Simplifying Fractions:</strong> To reduce the fraction
                42/56 to its absolute simplest form, you find the GCF of 42 and
                56 (which is 14). You then divide both the top and bottom by 14,
                resulting in the clean, simplified fraction of 3/4.
              </li>
              <li>
                <strong>Woodworking & Architecture:</strong> A carpenter needs
                to cut two different boards (one 60 inches, one 72 inches) into
                equal-length pieces without wasting any wood. Finding the GCF
                (12 inches) tells them exactly how long to make every cut.
              </li>
              <li>
                <strong>Polynomial Factoring:</strong> In advanced algebra and
                calculus, extracting the GCF from complex equations (e.g.,
                pulling '2x' out of '4x² + 6x') is the required first step
                before graphing a parabola or finding a derivative.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is the difference between GCF, GCD, and HCF?",
              answer:
                "Nothing. Greatest Common Factor (GCF), Greatest Common Divisor (GCD), and Highest Common Factor (HCF) are the exact same mathematical concept, just taught under different names depending on your global region.",
            },
            {
              question: "What if the GCF is just 1?",
              answer:
                "If the absolute Highest Common Factor between your numbers is 1, those numbers are mathematically considered 'Coprime' or 'Relatively Prime'. This means they share zero other divisors.",
            },
            {
              question: "Can GCF be a negative number?",
              answer:
                "No. By international mathematical definition, the Greatest Common Factor/Divisor is always strictly expressed as a positive integer, even if the numbers you are analyzing are negative.",
            },
          ]}
          relatedCalculators={[
            {
              name: "LCM Calculator",
              path: "/lcm-calculator/",
              desc: "Calculate the exact opposite: the lowest common multiple.",
            },
            {
              name: "Fraction Simplifier",
              path: "/fraction-simplifier-calculator/",
              desc: "Instantly reduce complex fractions using hidden GCF logic.",
            },
            {
              name: "Prime Factorization",
              path: "/prime-factorization-calculator/",
              desc: "See the exact prime building blocks of any number.",
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
