"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import expectedReturnSeoData from "@/data/seo-content/official/expected-return-calculator.json";

type Scenario = {
  prob: string;
  return: string;
};

export default function ExpectedReturnCalculator() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { prob: "25", return: "20" }, // Bull case
    { prob: "50", return: "8" }, // Base case
    { prob: "25", return: "-5" }, // Bear case
  ]);

  const [result, setResult] = useState<{
    expectedReturn: number;
    totalProb: number;
  } | null>(null);

  const [error, setError] = useState("");

  const addScenario = () => {
    if (scenarios.length < 10) {
      setScenarios([...scenarios, { prob: "", return: "" }]);
      setResult(null);
    }
  };

  const removeScenario = (index: number) => {
    if (scenarios.length > 2) {
      const newScenarios = [...scenarios];
      newScenarios.splice(index, 1);
      setScenarios(newScenarios);
      setResult(null);
    }
  };

  const updateScenario = (
    index: number,
    field: keyof Scenario,
    value: string,
  ) => {
    const newScenarios = [...scenarios];
    newScenarios[index][field] = value;
    setScenarios(newScenarios);
  };

  const calculate = () => {
    setError("");

    let expectedValue = 0;
    let totalProb = 0;

    for (const s of scenarios) {
      const p = parseFloat(s.prob);
      const r = parseFloat(s.return);

      if (isNaN(p) || isNaN(r)) {
        setError("All fields must contain valid numbers.");
        setResult(null);
        return;
      }

      if (p < 0 || p > 100) {
        setError("Probabilities must be between 0 and 100%.");
        setResult(null);
        return;
      }

      expectedValue += (p / 100) * (r / 100);
      totalProb += p;
    }

    // Warning if probabilities don't perfectly add up to 100 (floating point tolerance)
    if (Math.abs(totalProb - 100) > 0.1) {
      setError(
        `Warning: Probabilities add up to ${totalProb.toFixed(1)}%, not 100%. Results are mathematically valid based on what you entered, but usually they should equal 100%.`,
      );
    }

    setResult({
      expectedReturn: expectedValue * 100,
      totalProb: totalProb,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">🎯</span> Expected Return
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the expected return of an investment based on
          probability-weighted future scenarios.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-zinc-700 uppercase tracking-wide">
            Investment Scenarios
          </h3>
          <span className="text-xs text-zinc-500 font-medium bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
            Probabilities should sum to 100%
          </span>
        </div>

        <div className="space-y-4 mb-8">
          {scenarios.map((scenario, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase tracking-widest pl-1">
                  Probability (%)
                </label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  value={scenario.prob}
                  onChange={(e) => updateScenario(idx, "prob", e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold font-mono"
                  placeholder="e.g. 50"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-500 mb-1 uppercase tracking-widest pl-1">
                  Expected Return (%)
                </label>
                <input
                  type="number"
                  step="any"
                  value={scenario.return}
                  onChange={(e) =>
                    updateScenario(idx, "return", e.target.value)
                  }
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold font-mono"
                  placeholder="e.g. 8.5"
                />
              </div>
              <div className="pt-5">
                <button
                  onClick={() => removeScenario(idx)}
                  disabled={scenarios.length <= 2}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {scenarios.length < 10 && (
            <button
              onClick={addScenario}
              className="w-full mt-4 py-3 border-2 border-dashed border-zinc-300 text-zinc-500 font-bold rounded-xl hover:bg-zinc-50 hover:border-zinc-400 transition-colors uppercase tracking-widest text-sm"
            >
              + Add Scenario
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl font-bold text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
        >
          Calculate Expected Return
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Probability-Weighted Return
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-3xl border-4 bg-emerald-900/40 border-emerald-500/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-emerald-500/50 pb-2 w-full text-center">
                Expected Rate
              </span>
              <div className="font-mono font-black text-5xl md:text-6xl text-white break-all tracking-tight drop-shadow-lg p-2">
                {result.expectedReturn.toLocaleString("en-US", {
                  maximumFractionDigits: 3,
                })}
                %
              </div>
            </div>
          </div>

          <div className="bg-black/30 px-6 py-3 rounded-xl border border-white/5 text-center flex flex-col items-center z-10 text-xs">
            <span className="text-white/40 uppercase font-bold tracking-widest">
              Calculated across {result.totalProb.toFixed(1)}% total probability
              matrix
            </span>
          </div>
        </div>
      )}

      <CalculatorSEO
        title={expectedReturnSeoData.title}
        whatIsIt={expectedReturnSeoData.whatIsIt}
        formula={expectedReturnSeoData.formula}
        example={expectedReturnSeoData.example}
        useCases={expectedReturnSeoData.useCases}
        faqs={expectedReturnSeoData.faqs}
        deepDive={expectedReturnSeoData.deepDive}
        glossary={expectedReturnSeoData.glossary}
        relatedCalculators={[
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Calculate your historical cash return on an investment.",
          },
          {
            name: "Standard Deviation",
            path: "/standard-deviation-calculator/",
            desc: "Calculate the exact mathematical volatility and risk of your past returns.",
          },
          {
            name: "Mortgage",
            path: "/mortgage-calculator/",
            desc: "Calculate your monthly mortgage payments and amortization schedule.",
          },
          {
            name: "Investment",
            path: "/investment-calculator/",
            desc: "Project your portfolio growth over time with compound interest.",
          },
        ]}
      />
    </div>
  );
}
