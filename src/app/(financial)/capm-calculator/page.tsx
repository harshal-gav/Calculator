"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CAPMCalculator() {
  const [riskFree, setRiskFree] = useState("4.0");
  const [beta, setBeta] = useState("1.2");
  const [marketReturn, setMarketReturn] = useState("10.0");

  const [result, setResult] = useState<{
    expectedReturn: number;
    riskPremium: number;
  } | null>(null);

  const calculate = () => {
    const rf = parseFloat(riskFree) / 100;
    const b = parseFloat(beta);
    const rm = parseFloat(marketReturn) / 100;

    if (isNaN(rf) || isNaN(b) || isNaN(rm)) {
      setResult(null);
      return;
    }

    // CAPM Formula: Er = Rf + Beta(Rm - Rf)
    const rp = rm - rf;
    const er = rf + b * rp;

    setResult({
      expectedReturn: er * 100,
      riskPremium: rp * 100,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
          <span className="mr-3">📊</span> CAPM Calculator
        </h1>
        <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
          Calculate the expected return on an asset using the Capital Asset
          Pricing Model.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Risk-Free Rate (Rf)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={riskFree}
                onChange={(e) => setRiskFree(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pr-10 border focus:border-indigo-500 font-bold font-mono text-xl transition-all"
              />
              <span className="absolute right-4 top-4 text-zinc-400 font-bold">
                %
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-2 font-medium">
              Typically the yield on a 10-year Treasury bond.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Beta (β)
            </label>
            <input
              type="number"
              step="any"
              value={beta}
              onChange={(e) => setBeta(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-indigo-500 font-bold font-mono text-xl transition-all"
            />
            <p className="text-xs text-zinc-500 mt-2 font-medium">
              Measure of the asset's volatility compared to the market.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Expected Market Return (Rm)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={marketReturn}
                onChange={(e) => setMarketReturn(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pr-10 border focus:border-indigo-500 font-bold font-mono text-xl transition-all"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
              <span className="absolute right-4 top-4 text-zinc-400 font-bold">
                %
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-2 font-medium">
              Historical average return of the broad market (e.g., S&P 500).
            </p>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-lg"
        >
          Calculate CAPM
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Valuation Results
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-3xl border-4 bg-indigo-900/40 border-indigo-500/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-indigo-500/50 pb-2 w-full text-center">
                Expected Return
              </span>
              <div className="font-mono font-black text-5xl md:text-6xl text-white break-all tracking-tight drop-shadow-lg p-2">
                {result.expectedReturn.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                %
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-center flex flex-col items-center z-10 w-full max-w-sm">
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Market Risk Premium
            </span>
            <div className="font-mono text-indigo-200 text-2xl font-bold">
              {result.riskPremium.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
              %
            </div>
            <span className="text-white/30 text-[10px] mt-2 block">
              (Rm - Rf)
            </span>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "CAPM Calculator",
            operatingSystem: "All",
            applicationCategory: "FinancialApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Capital Asset Pricing Model (CAPM) Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>CAPM Calculator</strong> uses the
                Nobel-prize-winning Capital Asset Pricing Model to
                mathematically determine exactly what return an investor{" "}
                <em>should</em> demand when buying a specific stock, given the
                amount of risk they are taking on.
              </p>
              <p>
                The core philosophy of CAPM is simple: Investors must be
                compensated for taking risks and dealing with the time value of
                money. If a completely safe, risk-free asset (like US Government
                Treasury Bonds) pays a guaranteed 4% return, an investor would
                only buy a risky technology stock if they mathematical expect to
                earn <em>more</em> than 4%. CAPM calculates exactly what that
                target return needs to be by evaluating the stock's volatility
                (Beta) against the overall stock market.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The classic CAPM equation models Expected Return as the
                Risk-Free Rate plus a Risk Premium.
              </p>
              <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-200 text-zinc-900">
                <p>
                  <strong>
                    E(R) = R<sub>f</sub> + β × (R<sub>m</sub> - R<sub>f</sub>)
                  </strong>
                </p>
                <p className="border-t border-zinc-200 pt-3 mt-2 text-sm font-sans text-left text-zinc-700">
                  <strong>Where:</strong>
                  <br />
                  E(R) = Expected Return of the investment
                  <br />R<sub>f</sub> = Risk-Free Rate
                  <br />β = Beta of the investment
                  <br />R<sub>m</sub> = Expected Market Return
                  <br />
                  (R<sub>m</sub> - R<sub>f</sub>) = Market Risk Premium
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's evaluate a high-growth technology stock that is
                historically very volatile compared to the broader market.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                <li>
                  <strong>Variables:</strong> The current yield on a 10-Year
                  Treasury (Risk-Free Rate) is <strong>4%</strong>. The stock
                  has a Beta of <strong>1.5</strong> (meaning it is 50% more
                  volatile than the S&P 500). Historically, the S&P 500 (Market
                  Return) returns roughly <strong>10%</strong> annually.
                </li>
                <li>
                  <strong>The Math (Risk Premium):</strong> First, calculate the
                  Market Risk Premium: 10% - 4% = 6%.
                </li>
                <li>
                  <strong>The Math (Expected Return):</strong> 4% + [1.5 × 6%] =
                  4% + 9% = 13%.
                </li>
                <li>
                  <strong>Result:</strong> According to CAPM, you should demand
                  an <strong>Expected Return of 13%</strong> before you buy this
                  stock to properly compensate you for the extreme volatility.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Discounted Cash Flow (DCF) Models:</strong> Investment
                bankers use CAPM to calculate a company's Cost of Equity. This
                cost of equity is then used directly in DCF models to determine
                the fair valuation of the entire corporation.
              </li>
              <li>
                <strong>Portfolio Construction:</strong> Finding stocks with a
                very low Beta (like utilities or consumer staples) to lower the
                total expected risk of a portfolio during turbulent,
                recessionary market periods.
              </li>
              <li>
                <strong>Setting Hurdle Rates:</strong> Private equity firms use
                CAPM to set minimum "hurdle rates" that a new project or
                acquisition must definitively cross before they agree to invest
                cash.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What exactly is Beta?",
              answer:
                "Beta measures how wildly a stock historically swings up and down compared to the overall market (S&P 500). The market has a Beta of exactly 1.0. If a stock has a Beta of 1.2, it is 20% more volatile than the market. If it has a Beta of 0.8, it is 20% less volatile. Some rare stocks even have negative Betas, meaning they historically go up when the market crashes.",
            },
            {
              question: "What should I use for the Risk-Free Rate?",
              answer:
                "In the United States, financial analysts almost universally use the current yield on the 10-Year U.S. Treasury Bond as the baseline Risk-Free Rate. It represents an investment the market considers to have a 0% chance of default.",
            },
            {
              question: "What are the flaws of CAPM?",
              answer:
                "CAPM relies entirely on historical data to predict the future. A stock's Beta over the last 5 years might not be an accurate reflection of how volatile it will be over the next 5 years. CAPM also assumes that investors are perfectly rational and risk-averse, which is rarely true in the real world.",
            },
          ]}
          relatedCalculators={[
            {
              name: "WACC Calculator",
              path: "/wacc-calculator",
              desc: "Calculate a firm's Weighted Average Cost of Capital using CAPM.",
            },
            {
              name: "Expected Return Calculator",
              path: "/expected-return-calculator",
              desc: "Calculate the probability-weighted return of an asset.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator",
              desc: "Project the growth of a portfolio over decades.",
            },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            }]}
        />
      </div>
    </div>
  );
}
