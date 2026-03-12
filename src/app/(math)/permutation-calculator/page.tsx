"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PermutationCalculator() {
  const [nVal, setNVal] = useState("10");
  const [rVal, setRVal] = useState("3");
  const [allowRepetition, setAllowRepetition] = useState(false);

  const [result, setResult] = useState<{
    permutations: string;
    formulaStr: string;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const n = parseInt(nVal);
    const r = parseInt(rVal);

    if (isNaN(n) || isNaN(r)) {
      setResult(null);
      return;
    }

    if (n < 0 || r < 0) {
      setError("n and r must be non-negative integers.");
      setResult(null);
      return;
    }

    if (!allowRepetition && r > n) {
      setError("Without repetition, r cannot be greater than n.");
      setResult(null);
      return;
    }

    if (n > 1000 || (allowRepetition && r > 1000)) {
      setError("For performance reasons, digits are limited to 1000.");
      setResult(null);
      return;
    }

    try {
      let perms = BigInt(1);
      let formula = "";

      if (allowRepetition) {
        // n^r
        perms = BigInt(n) ** BigInt(r);
        formula = `n^r = ${n}^${r}`;
      } else {
        // nPr = n! / (n-r)!
        // Can optimize as n * (n-1) * ... * (n-r+1)
        for (let i = 0; i < r; i++) {
          perms *= BigInt(n - i);
        }
        formula = `P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!}`;
      }

      let displayVal = perms.toString();
      if (displayVal.length > 25) {
        const num = Number(perms);
        displayVal = num.toExponential(6) + ` (Exact: ${displayVal})`;
      } else if (displayVal.length > 3) {
        displayVal = displayVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      setResult({
        permutations: displayVal,
        formulaStr: formula,
      });
    } catch (e) {
      setError("Error calculating permutations. Result may be too large.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center font-serif">
          <span className="mr-3">🔢</span> Permutations
        </h1>
        <p className="text-purple-700 text-lg max-w-2xl mx-auto">
          Calculate nPr: The number of ways to arrange{" "}
          <span className="font-bold italic">r</span> items from a set of{" "}
          <span className="font-bold italic">n</span> items, where order{" "}
          <strong className="uppercase underline">does</strong> matter.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
        <div className="flex justify-center items-center gap-6 mb-8 mt-4">
          <div className="text-center font-mono font-bold text-4xl md:text-6xl text-purple-300">
            {allowRepetition ? "N(" : "P("}
          </div>

          <div className="flex flex-col gap-4 items-center">
            <div className="w-full">
              <label className="block text-[10px] font-bold text-zinc-500 mb-1 text-center uppercase tracking-widest">
                Total Items (n)
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={nVal}
                onChange={(e) => setNVal(e.target.value)}
                className="w-24 text-center rounded-xl py-3 text-2xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-purple-500 outline-none"
              />
            </div>
            <div className="text-zinc-400 font-bold text-xl">,</div>
            <div className="w-full">
              <label className="block text-[10px] font-bold text-zinc-500 mb-1 text-center uppercase tracking-widest">
                Arrange (r)
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={rVal}
                onChange={(e) => setRVal(e.target.value)}
                className="w-24 text-center rounded-xl py-3 text-2xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="text-center font-mono font-bold text-4xl md:text-6xl text-purple-300">
            )
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <label className="flex items-center cursor-pointer bg-zinc-100 px-6 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-200 transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={allowRepetition}
                onChange={(e) => {
                  setAllowRepetition(e.target.checked);
                  setResult(null);
                }}
              />
              <div className="block bg-zinc-300 w-10 h-6 rounded-full transition-colors"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${allowRepetition ? "transform translate-x-4 bg-purple-500" : ""}`}
              ></div>
            </div>
            <div className="ml-3 text-zinc-700 font-bold text-sm select-none">
              Allow Repetition (Replacement)
            </div>
          </label>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center">
            {error}
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-purple-600/30 uppercase tracking-widest text-lg"
        >
          Calculate nPr
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Total Permutations
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-lg bg-black/40 border border-purple-500/30 p-8 rounded-3xl shadow-inner text-center">
            <div className="font-mono font-black text-4xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg flex flex-col items-center">
              {result.permutations}
            </div>
          </div>

          {!allowRepetition && (
            <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-center flex flex-col items-center z-10">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Formula Notation
              </span>
              <div className="flex items-center text-white/80 font-mono text-xl">
                <span className="mr-4">
                  P({nVal}, {rVal}) ={" "}
                </span>
                <div className="flex flex-col items-center">
                  <span>{nVal}!</span>
                  <div className="w-full h-px bg-white/50 my-1"></div>
                  <span>
                    ({nVal}-{rVal})!
                  </span>
                </div>
              </div>
            </div>
          )}
          {allowRepetition && (
            <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-center flex flex-col items-center z-10">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Formula Notation
              </span>
              <div className="flex items-center text-white/80 font-mono text-xl">
                <span className="mr-4">N^R = </span>
                <span>
                  {nVal}
                  <sup>{rVal}</sup>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
                input:checked + div { background-color: #a855f7; }
                input:checked + div + div { transform: translateX(100%); border-color: white; }
            `,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Permutation Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Permutation Calculator (nPr)"
          whatIsIt={
            <>
              <p>
                The <strong>Permutation Calculator</strong> determines the total
                number of unique ways exactly <em>r</em> items can be arranged
                from a larger pool of <em>n</em> total items, specifically under
                the rule that <strong>order mathematically matters</strong>.
              </p>
              <p>
                For example, if you are assigning the roles of President, Vice
                President, and Treasurer to three people (Alice, Bob, and
                Charlie), "President Alice, VP Bob" is a completely different
                outcome than "President Bob, VP Alice."
              </p>
            </>
          }
          formula={
            <>
              <p>
                Because every microscopic change in order creates a brand-new
                permutation, the formula utilizes factorials (!) but does not
                divide out the duplicates. It is written as:
              </p>
              <div className="bg-purple-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-purple-900 border border-purple-100">
                P(n, r) = n! / (n - r)!
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>n:</strong> The total number of unique items available
                  to pick from in the set.
                </li>
                <li>
                  <strong>r:</strong> The number of items you are actually
                  selecting and arranging.
                </li>
                <li>
                  <strong>!:</strong> The factorial symbol (e.g., 5! = 5 × 4 × 3
                  × 2 × 1).
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Imagine there are <strong>8 runners (n)</strong> in the final
                heat of an Olympic sprint, but the judges only award medals for{" "}
                <strong>Gold, Silver, and Bronze (r = 3)</strong>. How many
                unique ways can the podium be filled?
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Setup:</strong> P(8, 3) = 8! / (8 - 3)!
                </li>
                <li>
                  <strong>Simplifying:</strong> 8! / 5! = (8 × 7 × 6 × 5 × 4 × 3
                  × 2 × 1) / (5 × 4 × 3 × 2 × 1)
                </li>
                <li>
                  <strong>The Math:</strong> The 5! perfectly cancels itself
                  out. You are left with just 8 × 7 × 6.
                </li>
                <li>
                  <strong>The Result:</strong> There are exactly{" "}
                  <strong>336 unique ways</strong> the Gold, Silver, and Bronze
                  medals could be distributed among the 8 runners.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Cybersecurity & Passwords:</strong> Calculating the
                exact number of possible brute-force attempts required to crack
                a 6-digit PIN code or a 12-character alphanumeric password.
              </li>
              <li>
                <strong>Scheduling & Logistics:</strong> Determining how many
                unique ways a delivery truck could sequence its 10 specific
                stops throughout a city.
              </li>
              <li>
                <strong>Lottery & Gaming:</strong> Calculating the odds of games
                that require exact sequence matching (e.g., horse racing exactas
                or trifectas).
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is 'Repetition' / 'Replacement'?",
              answer:
                "Without repetition, once an item is used, it's gone (e.g., Alice cannot be both President AND Vice President). With repetition, you put the item back in the pool (e.g., a 4-digit PIN code can absolutely be 9-9-9-9). Repetition exponentially grows the permutations.",
            },
            {
              question: "Why is a 'Combination Lock' named incorrectly?",
              answer:
                "Because order matters! If your lock code is 1-2-3, entering 3-2-1 will not open it. Mathematically speaking, it should be called a 'Permutation Lock.' Combinations do not care about order.",
            },
            {
              question: "What does P(n, n) equal?",
              answer:
                "Exactly n!. If you have 5 books and you want to arrange all 5 of them on a shelf, the math is 5! = 120 ways. You don't leave any items behind.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Combinations Calculator",
              path: "/combinations-calculator",
              desc: "Calculate groupings where the internal order does not matter.",
            },
            {
              name: "Factorial Calculator",
              path: "/factorial-calculator",
              desc: "Calculate the base n! values that power these statistical probability formulas.",
            },
            {
              name: "Probability Calculator",
              path: "/probability-calculator",
              desc: "Turn these raw permutation counts into actual percentage odds of winning or losing.",
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
