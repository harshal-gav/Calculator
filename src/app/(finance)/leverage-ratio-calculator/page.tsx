"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LeverageRatioCalculator() {
  const [totalDebt, setTotalDebt] = useState("500000");
  const [totalEquity, setTotalEquity] = useState("1000000");
  const [ebitda, setEbitda] = useState("200000");

  const [result, setResult] = useState<{
    debtToEquity: number;
    debtToEbitda: number;
    leverageMultiplier: number; // Assets / Equity = (Debt+Equity)/Equity
  } | null>(null);

  const calculate = () => {
    const debt = parseFloat(totalDebt);
    const equity = parseFloat(totalEquity);
    const earn = parseFloat(ebitda);

    if (isNaN(debt) || isNaN(equity) || isNaN(earn)) {
      setResult(null);
      return;
    }

    const devToEq = equity !== 0 ? debt / equity : 0;
    const devToEb = earn !== 0 ? debt / earn : 0;
    const assets = debt + equity; // Simplistic view: Assets = Liabilities + Equity
    const levMult = equity !== 0 ? assets / equity : 0; // Financial Leverage Ratio

    setResult({
      debtToEquity: devToEq,
      debtToEbitda: devToEb,
      leverageMultiplier: levMult,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 flex items-center justify-center font-serif">
          <span className="mr-3">⚖️</span> Leverage Ratio
        </h1>
        <p className="text-slate-700 text-lg max-w-2xl mx-auto">
          Evaluate financial risk and capital structure using core corporate
          leverage metrics.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Total Debt / Liabilities
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-zinc-400 font-bold">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={totalDebt}
                onChange={(e) => setTotalDebt(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-slate-500 font-bold font-mono text-xl transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Total Equity
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-zinc-400 font-bold">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={totalEquity}
                onChange={(e) => setTotalEquity(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-slate-500 font-bold font-mono text-xl transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Operating Earnings (EBITDA)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-zinc-400 font-bold">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={ebitda}
                onChange={(e) => setEbitda(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-slate-500 font-bold font-mono text-xl transition-all"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>
            <p className="text-xs text-zinc-400 mt-2 font-medium italic">
              Used to evaluate ability to pay down debt.
            </p>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-slate-800/30 uppercase tracking-widest text-lg"
        >
          Calculate Leverage
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>

          <h2 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Leverage Analysis
          </h2>

          <div className="w-full max-w-3xl z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/40 border border-slate-500/30 p-8 rounded-3xl shadow-inner text-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Debt-to-Equity
              </span>
              <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg">
                {result.debtToEquity.toFixed(2)}
              </div>
              <span className="text-white/40 text-[10px] mt-2 block">
                Standard target: 1.0 - 2.0
              </span>
            </div>

            <div className="bg-black/40 border border-slate-500/30 p-8 rounded-3xl shadow-inner text-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Debt/EBITDA
              </span>
              <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg">
                {result.debtToEbitda.toFixed(2)}x
              </div>
              <span className="text-white/40 text-[10px] mt-2 block">
                Years to pay off debt
              </span>
            </div>

            <div className="bg-black/40 border border-slate-500/30 p-8 rounded-3xl shadow-inner text-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Financial Leverage
              </span>
              <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg">
                {result.leverageMultiplier.toFixed(2)}
              </div>
              <span className="text-white/40 text-[10px] mt-2 block">
                Assets / Equity multiplier
              </span>
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
            name: "Leverage Ratio Calculator",
            operatingSystem: "All",
            applicationCategory: "FinancialApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Leverage Ratio Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Leverage Ratio Calculator</strong> evaluates a
                company's financial risk and capital structure by determining
                how heavily it relies on debt to finance its operations and
                assets.
              </p>
              <p>
                Leverage ratios are critical metrics used by investors, banks,
                and corporate management to assess solvency, creditworthiness,
                and the long-term sustainability of a business's debt load.
              </p>
            </>
          }
          formula={
            <>
              <p>This tool calculates three core leverage metrics:</p>
              <div className="bg-slate-100 p-4 rounded-lg font-mono text-center text-sm shadow-inner my-4 text-slate-900 border border-slate-200">
                <strong>Debt-to-Equity</strong> = Total Debt / Total Equity
                <br />
                <strong>Debt/EBITDA</strong> = Total Debt / EBITDA
                <br />
                <strong>Financial Leverage</strong> = (Total Debt + Total
                Equity) / Total Equity
              </div>
            </>
          }
          example={
            <>
              <p>
                Consider a company with <strong>$500,000</strong> in Total Debt,{" "}
                <strong>$1,000,000</strong> in Total Equity, and{" "}
                <strong>$200,000</strong> in EBITDA.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
                <li>
                  <strong>Debt-to-Equity:</strong> $500,000 / $1,000,000 ={" "}
                  <strong>0.50</strong>
                </li>
                <li>
                  <strong>Debt/EBITDA:</strong> $500,000 / $200,000 ={" "}
                  <strong>2.50x</strong> (It would take 2.5 years of current
                  earnings to pay off the debt).
                </li>
                <li>
                  <strong>Financial Leverage:</strong> $1,500,000 / $1,000,000 ={" "}
                  <strong>1.50</strong> multiplier.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-slate-700">
              <li>
                <strong>Credit Analysis:</strong> Banks use the Debt/EBITDA
                ratio deeply when deciding whether to issue a commercial loan or
                corporate bond.
              </li>
              <li>
                <strong>Investment Screening:</strong> Value investors analyze
                Debt-to-Equity to avoid companies that are heavily
                over-leveraged and at high risk of bankruptcy during economic
                downturns.
              </li>
              <li>
                <strong>DuPont Analysis:</strong> The Financial Leverage
                multiplier (Equity Multiplier) is a core component when breaking
                down a company's Return on Equity (ROE).
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is a safe Debt-to-Equity ratio?",
              answer:
                "It varies significantly by industry. Capital-intensive industries like manufacturing or utilities might comfortably operate with a ratio of 2.0 (meaning they have twice as much debt as equity). Software companies, however, often target a ratio below 0.5.",
            },
            {
              question: "Why is EBITDA used instead of Net Income?",
              answer:
                "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) represents pure operating cash flow. Since debt payments must be made before taxes and depreciation is a non-cash expense, EBITDA provides a much clearer picture of a company's ability to service its debt.",
            },
          ]}
          relatedCalculators={[
            {
              name: "ROE Calculator",
              path: "/roe-calculator",
              desc: "Calculate Return on Equity to see how leverage impacts shareholder returns.",
            },
            {
              name: "Debt-to-Income Calculator",
              path: "/dti-calculator",
              desc: "The personal finance equivalent of corporate leverage ratios.",
            },
            {
              name: "WACC Calculator",
              path: "/wacc-calculator",
              desc: "Determine how the mix of debt and equity affects a firm's average cost of capital.",
            },
          ]}
        />
      </div>
    </div>
  );
}
