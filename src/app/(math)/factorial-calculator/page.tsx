"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function FactorialCalculator() {
  const [nValue, setNValue] = useState("5");

  const [result, setResult] = useState<{
    n: number;
    factorial: string; // Stored as string because factorials get massive quickly (170! is roughly infinity in standard JS floats)
    isInfinity: boolean;
  } | null>(null);

  const calculateFactorial = () => {
    const n = parseInt(nValue);

    if (isNaN(n) || n < 0) {
      setResult(null);
      return;
    }

    // Use BigInt for massive factorials to avoid floating point infinity or scientific notation
    let fact = BigInt(1);
    for (let i = 1; i <= n; i++) {
      fact *= BigInt(i);
    }

    let factStr = fact.toString();
    let isInf = false;

    // JS max length string safeguard
    if (n > 50000) {
      factStr =
        "Number too large to render accurately. Infinity boundary reached for raw text UI.";
      isInf = true;
    }

    setResult({
      n,
      factorial: factStr,
      isInfinity: isInf,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-pink-700 border-b pb-4">
        Factorial Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the exact factorial (n!) of any whole number down to its
        precise individual digits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 space-y-6 flex flex-col justify-center">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Number (n)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={nValue}
              onChange={(e) => setNValue(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-pink-500 font-black text-4xl text-gray-800"
            />
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Must be a non-negative integer.
            </p>
          </div>

          <button
            onClick={calculateFactorial}
            className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Target n!
          </button>
          <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest px-4 mt-2">
            Utilizes BigInt Architecture to prevent overflow. Note: Values past
            10,000! take longer to process.
          </p>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-pink-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result !== null ? (
            <div className="w-full h-full flex flex-col items-center">
              <div className="p-8 w-full bg-pink-50 border-b border-pink-100 text-center">
                <h3 className="text-pink-800 font-bold uppercase tracking-widest text-[11px] mb-2">
                  {result.n}! equals
                </h3>
              </div>
              <div className="flex-grow p-6 w-full bg-gray-50 flex items-center justify-center">
                <div
                  className={`text-gray-900 font-mono ${result.factorial.length > 50 ? "text-sm" : "text-3xl font-black"} break-all w-full leading-relaxed bg-white border border-gray-200 p-4 rounded-xl shadow-inner max-h-64 overflow-y-auto`}
                >
                  {result.isInfinity ? (
                    <span className="text-red-500 italic font-sans">
                      {result.factorial}
                    </span>
                  ) : (
                    // Insert commas manually into standard string for big integers
                    result.factorial.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  )}
                </div>
              </div>
              {!result.isInfinity && (
                <div className="p-4 w-full bg-pink-600 text-white text-center">
                  <span className="block font-bold text-pink-200 uppercase text-[10px] tracking-widest mb-1">
                    Total Digits
                  </span>
                  <span className="font-bold text-lg">
                    {result.factorial.length.toLocaleString("en-US")} digits
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-pink-300 font-medium px-8 text-lg leading-relaxed py-10">
              Enter an integer (n) to instantly calculate the product of all
              positive integers less than or equal to n.
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
            name: "Factorial Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Mathematical Factorial (n!) Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Factorial Calculator</strong> instantly computes the
                exact sequential product of an integer and all positive integers
                below it. Denoted algebraically by an exclamation mark (e.g.,{" "}
                <strong>n!</strong>), factorials are the foundational
                cornerstone of the mathematics governing probability and
                permutations.
              </p>
              <p>
                Because multiplying sequences grows exponentially fast (for
                example, just 10! is already over 3.6 million), standard
                physical calculators and simple computer scripts will error out
                or return "Infinity." Our tool utilizes specialized BigInt
                architecture to return the absolute precise digit of massive
                factorials.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Factorial Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                The mathematical formula for a factorial is expanding the number
                backwards down to 1, multiplying every digit together.
              </p>
              <div className="bg-pink-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-pink-100 text-pink-900">
                <p>
                  <strong>n! = n × (n - 1) × (n - 2) × ... × 1</strong>
                </p>
              </div>
              <p>
                The sole exception to this rule is the number 0. By universal
                mathematical convention, <strong>0! = 1</strong>. This is
                required to prevent permutation fractions from dividing by zero.
              </p>
            </>
          }
          example={
            <>
              <p>
                Let's look at a common scenario in probability: determining
                possible arrangements.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> You have 5 different books and
                  you want to know exactly how many different ways you can
                  arrange them side-by-side on exactly one shelf.
                </li>
                <li>
                  <strong>The Formula:</strong> The number of possible
                  arrangements for 'n' unique items is always{" "}
                  <strong>n!</strong>.
                </li>
                <li>
                  <strong>The Calculation:</strong> We need to find the
                  factorial of 5 (written as 5!).
                </li>
                <li>
                  <strong>The Math:</strong> 5! = 5 × 4 × 3 × 2 × 1.
                </li>
                <li>
                  <strong>Result:</strong> 5! = <strong>120</strong>. There are
                  exactly 120 unique ways to organize those five books.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Combinatorics & Passwords:</strong> Cybersecurity
                experts use factorials to calculate permutations. If you have a
                password that must be exactly 10 unique non-repeating digits
                long, there are exactly 10! (3,628,800) possible combinations a
                hacker must guess.
              </li>
              <li>
                <strong>Advanced Calculus & Physics:</strong> Taylor Series
                expansions—the formulas computers use to calculate Sine, Cosine,
                and Pi perfectly—rely infinitely on factorials in their
                denominators to slowly converge on exact irrational numbers.
              </li>
              <li>
                <strong>Poker Odds & Card Games:</strong> To calculate the exact
                odds of being dealt a Royal Flush, you must calculate the total
                possible poker hands using the mathematical "Choose" formula,
                which heavily utilizes factorials. The total ways to shuffle a
                52-card deck is 52! (an astronomically massive number).
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why does 0! equal 1?",
              answer:
                "It is an agreed-upon universal definition. In combinatorics, 'n!' represents how many ways there are to arrange 'n' items. If you have 0 items, there is exactly 1 way to arrange them: an empty set. Setting 0! to 1 also ensures that critical algebraic formulas (like permutations) don't crash by dividing by zero.",
            },
            {
              question: "Can you calculate the factorial of a negative number?",
              answer:
                "No. Standard factorials are strictly defined for non-negative integers only. There is an advanced calculus function called the 'Gamma Function' that can extend factorial-like logic to real and complex numbers, but true factorials require positive whole numbers.",
            },
            {
              question:
                "Can you calculate the factorial of a decimal or fraction?",
              answer:
                "Not using the standard 'n!' notation. Similar to negative numbers, you must use the advanced Gamma Function to evaluate the mathematical equivalent of something like 3.5!.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Permutation Calculator",
              path: "/permutation-calculator",
              desc: "Calculate exact ordered arrangements using factorial logic.",
            },
            {
              name: "Combinations Calculator",
              path: "/combinations-calculator",
              desc: "Determine unordered groups utilizing divided factorials.",
            },
            {
              name: "Probability Calculator",
              path: "/probability-calculator",
              desc: "Determine exact statistical likelihoods utilizing combinatorics.",
            },
          ]}
        />
      </div>
    </div>
  );
}
