"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PrimeNumberCalculator() {
  const [number, setNumber] = useState("101");
  const [rangeStart, setRangeStart] = useState("1");
  const [rangeEnd, setRangeEnd] = useState("100");
  
  const [testResult, setTestResult] = useState<{
    isPrime: boolean;
    divisors: number[];
    isPerfect?: boolean;
    factors: string;
  } | null>(null);

  const [rangePrimes, setRangePrimes] = useState<number[] | null>(null);

  const isPrimeNumber = (num: number) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const getDivisors = (num: number) => {
    const divisors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        divisors.push(i);
        if (i !== num / i) divisors.push(num / i);
      }
    }
    return divisors.sort((a, b) => a - b);
  };

  const getPrimeFactorization = (num: number) => {
    if (num <= 1) return num.toString();
    let n = num;
    const factors: Record<number, number> = {};
    let d = 2;
    while (n >= d * d) {
      if (n % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        n /= d;
      } else {
        d++;
      }
    }
    if (n > 1) factors[n] = (factors[n] || 0) + 1;

    return Object.entries(factors)
      .map(([base, exp]) => (exp > 1 ? `${base}^${exp}` : base))
      .join(" × ");
  };

  const calculateTest = () => {
    const n = parseInt(number);
    if (isNaN(n) || n < 1) return;

    const isP = isPrimeNumber(n);
    const divs = getDivisors(n);
    const factors = getPrimeFactorization(n);
    
    // Perfect check: sum of proper divisors equals number
    const propDivsSum = divs.filter(d => d < n).reduce((a, b) => a + b, 0);

    setTestResult({
      isPrime: isP,
      divisors: divs,
      isPerfect: propDivsSum === n && n > 0,
      factors: factors
    });
  };

  const calculateRange = () => {
    const start = Math.max(1, parseInt(rangeStart));
    const end = Math.min(10000, parseInt(rangeEnd)); // Limit to prevent crash
    if (isNaN(start) || isNaN(end) || start > end) return;

    const primes: number[] = [];
    for (let i = start; i <= end; i++) {
      if (isPrimeNumber(i)) primes.push(i);
    }
    setRangePrimes(primes);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-2">
          Prime Number Calculator
        </h1>
        <p className="text-slate-500">Primality testing and prime list generator.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Primality Test */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">1</span>
            Primality Test
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Check Number</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full rounded-xl border-slate-300 p-4 shadow-sm focus:border-slate-500 font-bold text-2xl"
              />
            </div>
            <button
              onClick={calculateTest}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition"
            >
              Test Number
            </button>
          </div>

          {testResult && (
            <div className="mt-8 pt-8 border-t border-slate-200 text-center">
              <div className={`text-2xl font-black mb-2 ${testResult.isPrime ? 'text-emerald-600' : 'text-rose-600'}`}>
                {number} is {testResult.isPrime ? 'PRIME' : 'COMPOSITE'}
              </div>
              <p className="text-sm text-slate-500 mb-6 italic">
                {testResult.isPrime 
                  ? `${number} only has two divisors: 1 and itself.`
                  : `${number} has ${testResult.divisors.length} divisors.`}
              </p>

              <div className="grid grid-cols-1 gap-3 text-left">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm transition hover:shadow-md">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-widest">Divisors</div>
                  <div className="text-sm break-all font-mono text-slate-700">{testResult.divisors.join(", ")}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm transition hover:shadow-md">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-widest">Prime Factorization</div>
                  <div className="text-lg font-black text-slate-800">{testResult.factors}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Range Generator */}
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h2 className="text-xl font-bold text-indigo-900 mb-6 flex items-center">
            <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
            Prime List Generator
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">From</label>
              <input
                type="number"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                className="w-full rounded-xl border-indigo-200 p-3 shadow-inner focus:border-indigo-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">To</label>
              <input
                type="number"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                className="w-full rounded-xl border-indigo-200 p-3 shadow-inner focus:border-indigo-400 font-bold"
              />
            </div>
          </div>

          <button
            onClick={calculateRange}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition"
          >
            Generate Primes
          </button>

          {rangePrimes && (
            <div className="mt-8 pt-8 border-t border-indigo-100">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Found {rangePrimes.length} Primes</span>
              </div>
              <div className="max-h-[250px] overflow-y-auto bg-white p-4 rounded-xl border border-indigo-200 font-mono text-sm text-indigo-900 leading-loose">
                 {rangePrimes.join(", ")}
              </div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Prime Number Calculator & Test"
        whatIsIt={<p>A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. This calculator helps you determine if any large number is prime, breaks down its prime factorization (e.g., 28 = 2^2 × 7), and generates lists of primes within specified numerical ranges.</p>}
        formula={<p>The calculator uses an optimized primality test (trial division) which checks for divisibility by 2, 3, and then uses a 6k ± 1 pattern to eliminate most composites quickly, significantly reducing the required calculations compared to basic trial division.</p>}
        example={<p>Testing <strong>101</strong>: The calculator checks divisors and finds none other than 1 and 101. It confirms 101 is prime. Testing <strong>45</strong>: The calculator finds divisors [1, 3, 5, 9, 15, 45] and prime factorization 3^2 × 5, confirming 45 is composite.</p>}
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Cryptography:</strong> Modern security relies on the difficulty of factoring extremely large prime numbers.</li><li><strong>Mathematics Homework:</strong> Quickly check work on factor trees and prime factorization.</li><li><strong>Programming:</strong> Benchmarking logical efficiency in software algorithms.</li></ul>}
        faqs={[
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            },
            {
              question: "Is this tool free to use?",
              answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions.",
            },
            {
              question: "Can I use this on my mobile device?",
              answer: "Absolutely! Our website is fully responsive and optimized for all screen sizes, including smartphones and tablets, so you can calculate on the go.",
            }]}
          relatedCalculators={[
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator/",
              desc: "Easily calculate percentages, increases, and decreases.",
            },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator/",
              desc: "Perform advanced mathematical operations and functions.",
            },
            {
              name: "Quadratic Formula Calculator",
              path: "/quadratic-formula-calculator/",
              desc: "Solve quadratic equations instantly.",
            },
            {
              name: "Matrix Calculator",
              path: "/matrix-calculator/",
              desc: "Perform addition, subtraction, and multiplication on matrices.",
            }
          ]}
      />
    </div>
  );
}
