"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function InterestRateCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5.0"); // Annual rate percentage
  const [time, setTime] = useState("10"); // Years
  const [compound, setCompound] = useState("12"); // Times per year (12 = monthly)

  const [result, setResult] = useState<{
    futureValue: number;
    totalInterest: number;
  } | null>(null);

  const calculateInterest = () => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;
    const n = parseInt(compound) || 1;

    if (P > 0 && t > 0) {
      // Compound Interest Formula: A = P(1 + r/n)^(nt)
      const A = P * Math.pow(1 + r / n, n * t);
      const interestEarned = A - P;

      setResult({
        futureValue: A,
        totalInterest: interestEarned,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-indigo-900 border-b pb-4">
        Interest Rate Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the future accumulated value of an investment or loan with
        compound interest.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Principal Amount ($)
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500 text-lg font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Time (Years)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Compound Frequency
              </label>
              <select
                value={compound}
                onChange={(e) => setCompound(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500"
              >
                <option value="365">Daily (365/yr)</option>
                <option value="12">Monthly (12/yr)</option>
                <option value="4">Quarterly (4/yr)</option>
                <option value="1">Annually (1/yr)</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateInterest}
            className="mt-6 w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg uppercase tracking-wide"
          >
            Calculate Future Value
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-8 flex flex-col justify-center items-center shadow-sm">
          {result !== null ? (
            <div className="w-full text-center space-y-6">
              <div>
                <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-2">
                  Total Accumulated Value
                </h3>
                <div className="text-5xl font-black text-indigo-700">
                  $
                  {result.futureValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              <div className="h-px bg-indigo-100 w-full"></div>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="text-gray-400 text-sm font-medium">
                    Starting Principal
                  </h4>
                  <p className="text-xl font-bold text-gray-800">
                    ${parseFloat(principal).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm font-medium">
                    Total Interest Earned
                  </h4>
                  <p className="text-xl font-bold text-green-600">
                    $
                    {result.totalInterest.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-indigo-300 font-medium text-center">
              Results will appear here
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
            name: "Interest Rate Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Interest Rate & Compound Growth Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Interest Rate Calculator</strong> allows you to
                forecast the future value of a principal investment (or debt)
                dynamically based on annual percentage yields (APY) and
                compounding frequencies.
              </p>
              <p>
                Einstein famously called compound interest the "Eighth Wonder of
                the World." Understanding exactly how your money scales when the
                interest itself begins earning interest is the foundational core
                of modern wealth building.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Interest Calculator, Interest
                Rate Calculator, Savings Account Interest Calculator, Interest
                Calculator Savings, Bank Interest Calculator, Rate Of Return
                Calculator, Simple Interest Calculator, Monthly Interest
                Calculator, Rental Yield Calculator, Bankrate Calculator,
                Interest Only Calculator, Cap Rate Calculator, Effective Tax
                Rate Calculator, Tax Rate Calculator, Rate Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                This calculator utilizes the standard mathematical formula for
                compound interest:
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-indigo-900 border border-indigo-100">
                <strong>A = P × (1 + r/n)^(n×t)</strong>
              </div>
              <p className="text-sm mt-2">
                <strong>A</strong> = Final Amount, <strong>P</strong> = Starting
                Principal, <strong>r</strong> = Annual Interest Rate (decimal),{" "}
                <strong>n</strong> = Compounding frequency per year,{" "}
                <strong>t</strong> = Time in years.
              </p>
            </>
          }
          example={
            <>
              <p>
                Let's simulate a <strong>$10,000</strong> baseline investment
                growing at an aggressively consistent <strong>8%</strong> annual
                rate, compounding <strong>monthly</strong> for{" "}
                <strong>30 years</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Input:</strong> P=$10k, r=0.08, n=12, t=30
                </li>
                <li>
                  <strong>Total Interest Earned:</strong> $99,357.30
                </li>
                <li>
                  <strong>Final Value:</strong> $109,357.30
                </li>
                <li>
                  <strong>Takeaway:</strong> Even without adding a single extra
                  dollar to the original $10k, the sheer mathematical force of
                  monthly compounding 10x'd the account balance over a 30-year
                  timeframe.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Retirement Projections:</strong> Estimating if an
                existing 401k or IRA balance will reach a required target based
                on historical S&P 500 average returns (roughly 7-10%).
              </li>
              <li>
                <strong>Loan Comparisons:</strong> Banks often state loan rates
                as APYs but compound them daily. You can use this to see the
                exact penalty of daily compounding on an auto loan versus
                monthly compounding.
              </li>
              <li>
                <strong>CDs and High-Yield Savings (HYSA):</strong> Quickly
                validating whether a 5% promotional APY on a CD will yield
                enough raw cash to lock your money up for 12 months.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Does compounding frequency really make a big difference?",
              answer:
                "It depends heavily on the timeframe and the rate. At low rates over short periods, daily vs monthly is negligible (pennies). But at higher rates over decades, daily compounding can generate thousands of dollars in extra yield compared to annual compounding.",
            },
            {
              question: "What is the Rule of 72?",
              answer:
                "It's a mathematical shortcut to estimate compounding. Divide 72 by your expected interest rate to see how many years it will take to double your money. (e.g., 72 ÷ 8% = 9 years to double).",
            },
            {
              question: "Can I use this for credit card debt?",
              answer:
                "Yes, but credit cards compound DAILY. To see how much interest a carried credit card balance of $5,000 at 24% APR generates, set the frequency to 'Daily'.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Compound Interest Calculator",
              path: "/compound-interest-calculator/",
              desc: "For running projections that include regular monthly deposits on top of the principal.",
            },
            {
              name: "Debt Payoff Calculator",
              path: "/debt-payoff-calculator/",
              desc: "Build a structured amortization schedule to mathematically kill high-interest debt.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator/",
              desc: "Analyze the total inflation-adjusted returns of a diversified ETF portfolio.",
            },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            }]}
        />
      </div>
    </div>
  );
}
