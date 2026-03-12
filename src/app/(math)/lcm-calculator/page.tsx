"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LcmCalculator() {
  const [inputData, setInputData] = useState("12, 18, 30");

  const [result, setResult] = useState<{
    lcm: number;
    numbers: number[];
  } | null>(null);

  // Euclidean algorithm for Greatest Common Divisor
  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  };

  // LCM(a,b) = (|a * b|) / GCD(a,b)
  const lcmOfTwo = (a: number, b: number): number => {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / gcd(a, b));
  };

  const calculateLCM = () => {
    // Parse input safely
    const rawValues = inputData.split(/[\s,]+/).filter(Boolean);
    // Only keep integers. Float LCM is non-standard for basic math.
    const numbers = [
      ...new Set(
        rawValues.map((v) => parseInt(v)).filter((v) => !isNaN(v) && v !== 0),
      ),
    ];

    if (numbers.length === 0) {
      setResult(null);
      return;
    }

    let currentLCM = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      currentLCM = lcmOfTwo(currentLCM, numbers[i]);
      // Safety break for insanely large calculations causing infinity
      if (!isFinite(currentLCM)) {
        setResult(null);
        return;
      }
    }

    setResult({
      lcm: currentLCM,
      numbers,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-cyan-700 border-b pb-4">
        LCM Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Instantly compute the Least Common Multiple (LCM) for a dataset of two
        or more integers.
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
            onClick={calculateLCM}
            className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Target LCM
          </button>
          <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest px-4 mt-2">
            Utilizes prime factorization reduction via the Euclidean algorithm
          </p>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-cyan-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result !== null ? (
            <div className="w-full h-full flex flex-col items-center">
              <div className="p-10 w-full text-center bg-cyan-50 border-b border-cyan-100 shadow-inner flex-grow flex flex-col justify-center">
                <h3 className="text-cyan-800 font-bold uppercase tracking-widest text-[11px] mb-4">
                  Least Common Multiple
                </h3>
                <div className="text-7xl font-black text-gray-900 drop-shadow-sm break-all max-w-[90%] mx-auto">
                  {result.lcm.toLocaleString("en-US")}
                </div>
              </div>

              <div className="p-4 w-full bg-gray-50 text-center border-t border-gray-200">
                <span className="block font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-1">
                  Evaluated Elements
                </span>
                <span className="font-mono text-sm text-gray-700 font-medium break-all">
                  LCM({result.numbers.join(", ")})
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-cyan-300 font-medium px-8 text-lg leading-relaxed py-10">
              Enter two or more non-zero integers to calculate the smallest
              positive integer perfectly divisible by all of them.
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
            name: "LCM Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Least Common Multiple (LCM) Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Least Common Multiple (LCM) Calculator</strong>{" "}
                instantly computes the absolute lowest positive integer that is
                perfectly divisible by a provided sequence of numbers. By
                utilizing the ultra-efficient Euclidean algorithm under the
                hood, it processes massive integers in milliseconds.
              </p>
              <p>
                Finding the LCM is a foundational component of algebra and
                fractions. Without knowing the exact lowest common multiple, you
                cannot accurately add, subtract, or systematically scale
                fractions with mismatched denominators in academics or
                structural engineering.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Lcm Calculator, Least Common
                Multiple Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                The most programmatically efficient way to find the Lowest
                Common Multiple of two numbers is to calculate their Greatest
                Common Divisor (GCD) first, and then apply this reduction
                formula.
              </p>
              <div className="bg-cyan-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-cyan-100 text-cyan-900">
                <p>
                  <strong>LCM(a, b) = (a × b) ÷ GCD(a, b)</strong>
                </p>
              </div>
              <p>
                For more than two numbers, this exact algorithmic formula is
                iterated sequentially against the running total until the entire
                dataset has been successfully processed.
              </p>
            </>
          }
          example={
            <>
              <p>
                Here is how finding the LCM applies to resolving misaligned
                cyclic events.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> Bus Route A arrives precisely
                  every 15 minutes. Bus Route B arrives precisely every 25
                  minutes. They both just arrived at the terminal together. When
                  exactly will they both arrive simultaneously again?
                </li>
                <li>
                  <strong>The Calculation:</strong> We need to find the LCM of{" "}
                  <strong>15</strong> and <strong>25</strong>.
                </li>
                <li>
                  <strong>The Math:</strong> The multiples of 15 are (15, 30,
                  45, 60, 75). The multiples of 25 are (25, 50, 75).
                </li>
                <li>
                  <strong>Result:</strong> They intersect exactly at{" "}
                  <strong>75</strong>. Therefore, both buses will arrive at the
                  terminal simultaneously again in 75 minutes.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Algebra & Fractions:</strong> When attempting to
                mathematically add ½ and ⅓, students must find the lowest common
                denominator. The LCM of 2 and 3 is 6. You adjust the fraction to
                3/6 + 2/6 to easily solve the equation as 5/6.
              </li>
              <li>
                <strong>Cryptographic Logistics:</strong> Certain encryption
                models and computer networking packet routing rely heavily on
                calculating intersections between massive prime numbers using
                cyclical LCM loops.
              </li>
              <li>
                <strong>Shift Scheduling:</strong> Plant managers use LCM to
                determine exact intersections of rotating shift workers (e.g.,
                Worker A works exactly 4 days on, Worker B works 5 days on). LCM
                dictates the perfect overarching shift cycle.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why can't you find the LCM of Zero?",
              answer:
                "Any number multiplied by zero is simply zero. Therefore, technically, all numbers share '0' as a multiple. Because this breaks algebraic equations (specifically causing division by zero), LCM is strictly calculated using positive integers.",
            },
            {
              question:
                "Is the LCM ever just the two numbers multiplied together?",
              answer:
                "Yes. If the two numbers share absolutely no common factors (other than 1), they are considered 'Coprime'. For Coprimes (like 5 and 7), their LCM is just 5 × 7 = 35.",
            },
            {
              question: "What is the Euclidean Algorithm?",
              answer:
                "It is an ancient, incredibly fast mathematical method dating back to 300 BC used to find the Greatest Common Divisor inside our code. By repeatedly finding the remainder of division, it prevents computers from having to manually check millions of individual factors.",
            },
          ]}
          relatedCalculators={[
            {
              name: "GCF Calculator",
              path: "/gcf-calculator",
              desc: "Calculate the exact Greatest Common Factor used inside LCM equations.",
            },
            {
              name: "Fraction Calculator",
              path: "/fraction-calculator",
              desc: "Directly add and subtract fractions utilizing hidden LCM logic.",
            },
            {
              name: "Prime Factorization",
              path: "/prime-factorization-calculator",
              desc: "Break down integers precisely into their core prime multiplicative roots.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator",
              desc: "Easily calculate percentages, increases, and decreases.",
            }]}
        />
      </div>
    </div>
  );
}
