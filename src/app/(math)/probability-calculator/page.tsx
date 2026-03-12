"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ProbabilityCalculator() {
  const [calcType, setCalcType] = useState("single"); // 'single', 'multiple'

  // Single Event
  const [outcomesA, setOutcomesA] = useState("1");
  const [totalOutcomes, setTotalOutcomes] = useState("6"); // e.g. rolling a specific number on a 6 sided die

  // Multiple Events
  const [probA, setProbA] = useState("0.5"); // Probability of A
  const [probB, setProbB] = useState("0.5"); // Probability of B

  const [singleResult, setSingleResult] = useState<{
    prob: number;
    notProb: number;
    odds: string;
  } | null>(null);

  const [multiResult, setMultiResult] = useState<{
    both: number; // P(A and B) = P(A) * P(B) assuming independent
    either: number; // P(A or B) = P(A) + P(B) - P(both)
    onlyA: number; // P(A) * P(!B)
    onlyB: number; // P(!A) * P(B)
    neither: number; // P(!A) * P(!B)
  } | null>(null);

  const calculateProb = () => {
    if (calcType === "single") {
      const a = parseFloat(outcomesA) || 0;
      const t = parseFloat(totalOutcomes) || 0;

      if (t > 0 && a >= 0 && a <= t) {
        const p = a / t;
        const notP = 1 - p;

        // Odds ratio A : !A
        let oddsStr = "";
        if (a === 0) oddsStr = "0 : 1";
        else if (a === t) oddsStr = "1 : 0";
        else oddsStr = `${a} : ${t - a}`;

        setSingleResult({
          prob: p,
          notProb: notP,
          odds: oddsStr,
        });
        setMultiResult(null);
      } else {
        setSingleResult(null);
      }
    } else {
      // Assume independent events
      const pa = parseFloat(probA) || 0;
      const pb = parseFloat(probB) || 0;

      if (pa >= 0 && pa <= 1 && pb >= 0 && pb <= 1) {
        const both = pa * pb;
        const either = pa + pb - both;
        const onlyA = pa * (1 - pb);
        const onlyB = (1 - pa) * pb;
        const neither = (1 - pa) * (1 - pb);

        setMultiResult({
          both,
          either,
          onlyA,
          onlyB,
          neither,
        });
        setSingleResult(null);
      } else {
        setMultiResult(null);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-purple-900 border-b pb-4">
        Probability Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the likelihood of single events, independent multi-event
        scenarios, and associated odds.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Calculation Type
            </label>
            <select
              value={calcType}
              onChange={(e) => {
                setCalcType(e.target.value);
                setSingleResult(null);
                setMultiResult(null);
              }}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold bg-white text-gray-800"
            >
              <option value="single">Single Event Probabilities</option>
              <option value="multiple">
                Two Independent Events P(A) & P(B)
              </option>
            </select>
          </div>

          {calcType === "single" ? (
            <div className="space-y-4 pt-4 border-t border-purple-100">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Number of Target Outcomes
                </label>
                <input
                  type="number"
                  value={outcomesA}
                  onChange={(e) => setOutcomesA(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Total Possible Outcomes
                </label>
                <input
                  type="number"
                  value={totalOutcomes}
                  onChange={(e) => setTotalOutcomes(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-purple-100">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Probability of Event A (0 to 1)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={probA}
                  onChange={(e) => setProbA(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Probability of Event B (0 to 1)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={probB}
                  onChange={(e) => setProbB(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium"
                />
              </div>
            </div>
          )}

          <button
            onClick={calculateProb}
            className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Probabilities
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-purple-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {calcType === "single" && singleResult !== null ? (
            <div className="w-full flex flex-col h-full">
              <div className="p-8 pb-6 text-center bg-purple-50 border-b border-purple-100">
                <h3 className="text-purple-800 font-bold uppercase tracking-widest text-[11px] mb-2">
                  Probability of Occurring
                </h3>
                <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                  {(singleResult.prob * 100).toFixed(2)}
                  <span className="text-3xl text-gray-500">%</span>
                </div>
                <div className="text-gray-500 font-medium mt-1">
                  or{" "},
                  {singleResult.prob.toLocaleString("en-US", {
                    maximumFractionDigits: 4,
                  })}
                </div>
              </div>

              <div className="p-6 flex-grow space-y-4 bg-gray-50">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                  <span className="font-bold text-purple-600 uppercase text-[10px] tracking-widest">
                    Does Not Occur (Complement)
                  </span>
                  <span className="font-black text-xl text-gray-800">
                    {(singleResult.notProb * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-inner">
                  <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                    Odds (For : Against)
                  </span>
                  <span className="font-black text-xl text-gray-800">
                    {singleResult.odds}
                  </span>
                </div>
              </div>
            </div>
          ) : calcType === "multiple" && multiResult !== null ? (
            <div className="w-full flex flex-col h-full bg-gray-50">
              <div className="p-6 grid grid-cols-1 gap-3 h-full overflow-y-auto">
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-600 shadow-sm flex justify-between items-center">
                  <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">
                    Both Occur P(A∩B)
                  </span>
                  <span className="font-black text-lg text-purple-700">
                    {(multiResult.both * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-emerald-500 shadow-sm flex justify-between items-center">
                  <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">
                    Either Occurs P(A∪B)
                  </span>
                  <span className="font-black text-lg text-emerald-700">
                    {(multiResult.either * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-sky-400 shadow-sm flex justify-between items-center">
                  <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">
                    Only A Occurs P(A∩!B)
                  </span>
                  <span className="font-black text-lg text-sky-700">
                    {(multiResult.onlyA * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-sky-400 shadow-sm flex justify-between items-center">
                  <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">
                    Only B Occurs P(!A∩B)
                  </span>
                  <span className="font-black text-lg text-sky-700">
                    {(multiResult.onlyB * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-gray-400 shadow-sm flex justify-between items-center">
                  <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">
                    Neither Occurs P(!A∩!B)
                  </span>
                  <span className="font-black text-lg text-gray-800">
                    {(multiResult.neither * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-purple-300 font-medium px-8 text-lg py-10">
              Enter target criteria to see complete percentage breakdowns based
              on classical set theory.
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
            name: "Probability Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Statistical Probability Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Probability Calculator</strong> is a mathematical
                engine designed to determine the precise likelihood of specific
                events occurring. It evaluates both single isolated events (like
                rolling a standard die) and independent multiple-event scenarios
                (like rolling two dice sequentially).
              </p>
              <p>
                By translating raw outcomes into exact percentages and
                real-world odds, this calculator removes the guesswork from
                statistics, helping students, poker players, data scientists,
                and risk-managers make mathematically sound predictions based on
                classical probability theory.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Probability Distribution
                Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                Classical probability represents the total number of ways a
                specific target can happen, divided by every possible thing that
                could happen.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-purple-100 text-purple-900">
                <p>
                  <strong>
                    Probability (P) = Target Outcomes ÷ Total Possible Outcomes
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-purple-200">
                  <strong>
                    Odds = Target Outcomes : Remaining Not-Target Outcomes
                  </strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the exact probability of drawing a specific card
                from a standard deck.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> You need to draw an "Ace" from
                  a standard 52-card poker deck.
                </li>
                <li>
                  <strong>The Parameters:</strong> There are exactly{" "}
                  <strong>4</strong> Aces in the deck (Target Outcomes) and{" "}
                  <strong>52</strong> total cards (Total Possible Outcomes).
                </li>
                <li>
                  <strong>The Calculation:</strong> 4 ÷ 52 ={" "}
                  <strong>0.0769</strong>.
                </li>
                <li>
                  <strong>The Result:</strong> The probability of pulling an Ace
                  is exactly <strong>7.69%</strong>. The odds are{" "}
                  <strong>4 : 48</strong> (which simplifies down to 1 : 12).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Tabletop Gaming & Casinos:</strong> Board games,
                Dungeons & Dragons, and casino math rely entirely on independent
                probability. Knowing the exact percentage chance of hitting a
                "Natural 20" or drawing a flush changes how players interact
                with risk.
              </li>
              <li>
                <strong>Insurance & Risk Management:</strong> Actuaries
                calculate the statistical probability of independent negative
                events occurring (like a multi-car accident) to design pricing
                structures that mathematically guarantee the insurance company
                remains profitable.
              </li>
              <li>
                <strong>Medical Diagnoses:</strong> When analyzing testing
                results, doctors look at "P(A and B)" to evaluate the
                probability of a patient both having a specific underlying
                condition AND catching a secondary infection.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What does 'Independent Events' mean?",
              answer:
                "Two events are independent if the outcome of the first has zero mathematical effect on the second. For example, flipping a coin twice. The coin landing on 'Heads' first does not change the physical fact that the second flip still has a 50/50 chance.",
            },
            {
              question: "What is the difference between Probability and Odds?",
              answer:
                "Probability compares the specific target against the ENTIRE whole (4 parts out of 52 total). Odds compare the target against only the failures (4 parts vs 48 remaining parts). They represent the exact same mathematical reality, just formatted differently.",
            },
            {
              question: "How do you calculate 'Both Occur' P(A∩B)?",
              answer:
                "When assuming two events are completely independent, you calculate the probability of them BOTH occurring by multiplying their decimal probabilities together. If Event A is 50% (0.5) and Event B is 50% (0.5), the chance of both hitting is 0.5 × 0.5 = 25%.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Standard Deviation Calculator",
              path: "/standard-deviation-calculator",
              desc: "Calculate the exact mathematical variance within a set of data.",
            },
            {
              name: "Random Number Generator",
              path: "/random-number-generator",
              desc: "Simulate random probability rolls instantly.",
            },
            {
              name: "Z-Score Calculator",
              path: "/z-score-calculator",
              desc: "Determine the probability of an event falling along a normal distribution curve.",
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
