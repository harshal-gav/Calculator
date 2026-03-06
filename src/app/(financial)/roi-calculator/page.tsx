"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ROICalculator() {
  const [amountInvested, setAmountInvested] = useState("10000");
  const [amountReturned, setAmountReturned] = useState("12500");
  const [investmentTimeYears, setInvestmentTimeYears] = useState("2");

  const [result, setResult] = useState<{
    roi: number;
    netReturn: number;
    annualizedRoi: number;
  } | null>(null);

  const calculateROI = () => {
    const invested = parseFloat(amountInvested) || 0;
    const returned = parseFloat(amountReturned) || 0;
    const years = parseFloat(investmentTimeYears) || 0;

    if (invested > 0) {
      const netReturn = returned - invested;
      const roi = (netReturn / invested) * 100;

      let annualizedRoi = 0;
      if (years > 0) {
        // Annualized ROI = [(Ending / Beginning) ^ (1 / Years)] - 1
        annualizedRoi = (Math.pow(returned / invested, 1 / years) - 1) * 100;
      }

      setResult({
        roi,
        netReturn,
        annualizedRoi,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">
        ROI Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your exact Return on Investment and Annualized ROI across any
        time period.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Amount Invested ($)
            </label>
            <input
              type="number"
              value={amountInvested}
              onChange={(e) => setAmountInvested(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Amount Returned ($)
            </label>
            <input
              type="number"
              value={amountReturned}
              onChange={(e) => setAmountReturned(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Investment Duration (Years)
            </label>
            <input
              type="number"
              step="0.5"
              value={investmentTimeYears}
              onChange={(e) => setInvestmentTimeYears(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-medium"
            />
            <p className="text-xs text-gray-500 mt-1">
              Required to calculate annualized ROI.
            </p>
          </div>

          <button
            onClick={calculateROI}
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate ROI
          </button>
        </div>

        {/* Results */}
        <div className="bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
          {result !== null ? (
            <div className="w-full text-center space-y-8">
              <div>
                <h3 className="text-emerald-800 font-semibold uppercase tracking-wider text-sm mb-2">
                  Total ROI
                </h3>
                <div
                  className={`text-6xl font-black ${result.roi >= 0 ? "text-emerald-600" : "text-red-500"} border-b border-emerald-100 pb-4`}
                >
                  {result.roi > 0 && "+"}
                  {result.roi.toFixed(2)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">
                    Net Investment Gain
                  </h4>
                  <p
                    className={`text-2xl font-bold ${result.netReturn >= 0 ? "text-emerald-700" : "text-red-600"}`}
                  >
                    {result.netReturn >= 0 ? "+" : "-"}$
                    {Math.abs(result.netReturn).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <h4 className="text-emerald-800 font-bold uppercase text-[11px] tracking-wide mb-1">
                    Annualized ROI
                  </h4>
                  <p
                    className={`text-2xl font-bold ${result.annualizedRoi >= 0 ? "text-gray-900" : "text-red-600"}`}
                  >
                    {result.annualizedRoi > 0 && "+"}
                    {result.annualizedRoi.toFixed(2)}%{" "}
                    <span className="text-xs text-gray-500 font-normal">
                      /yr
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-emerald-400 font-medium">
              Enter your initial investment and final return to view your exact
              ROI.
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
            name: "ROI Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="ROI Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Return on Investment (ROI) Calculator</strong> is a
              core financial benchmark tool allowing investors to evaluate the
              absolute performance and profitability of an investment relative
              to its initial cost. A positive ROI indicates financial gain,
              while a negative ROI signifies a loss.
            </p>
            <p>
              Crucially, this tool goes beyond simple ROI by calculating your{" "}
              <strong>Annualized ROI</strong>. Earning a 50% return is
              incredible if it happens in 1 year, but terrible if it took 30
              years to achieve. Annualized ROI mathematically smooths your
              return over the lifespan of the investment to give you a true
              apples-to-apples comparison metric.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Roi Calculator
            </p>
          </>
        }
        formula={
          <>
            <p>
              ROI is calculated by taking the net profit of an investment,
              dividing it by the initial cost, and multiplying by 100 to get a
              percentage.
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 text-emerald-900 border border-emerald-100">
              <p>
                <strong>Total ROI</strong> = [(Final Value - Initial Cost) ÷
                Initial Cost] × 100
              </p>
              <p className="border-t border-emerald-100 pt-4 mt-4 text-sm font-sans text-left text-gray-700">
                <strong>Annualized ROI Formula:</strong>
                <br />
                Annualized ROI = [(Final Value ÷ Initial Cost) ^ (1 ÷ Years)] -
                1
              </p>
            </div>
          </>
        }
        example={
          <>
            <p>
              Imagine you buy stock for <strong>$10,000</strong>. You hold that
              stock and reinvest dividends for exactly <strong>2 years</strong>,
              and then sell it all for <strong>$12,500</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Step 1 (Find Net Return):</strong> $12,500 - $10,000 ={" "}
                <strong>$2,500</strong>.
              </li>
              <li>
                <strong>Step 2 (Find Total ROI):</strong> ($2,500 ÷ $10,000) ×
                100 = <strong>25%</strong>.
              </li>
              <li>
                <strong>Step 3 (Find Annualized ROI):</strong> Using the formula
                [(12,500 ÷ 10,000)^(1/2)] - 1.
              </li>
              <li>
                <strong>Result:</strong> Your Total ROI was 25%, but your real
                Annualized ROI was exactly <strong>11.80% per year</strong>.
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Stock Market Analysis:</strong> Reviewing your brokerage
              statements to determine if your mutual funds are beating the
              standard S&P 500 average benchmark (typically around 9-10%
              annualized).
            </li>
            <li>
              <strong>Real Estate Flipping:</strong> Calculating whether the
              capital gained from renovating and selling a distressed property
              was actually worth the capital and time invested.
            </li>
            <li>
              <strong>Business Marketing:</strong> Determining if a $5,000
              advertising campaign that generated $8,000 in new sales was a
              successful allocation of marketing budget.
            </li>
          </ul>
        }
        faqs={[
          {
            question:
              "Why is Annualized ROI lower than dividing Total ROI by the years?",
            answer:
              "If you have a 25% Total ROI over 2 years, dividing by 2 gives you 12.5%. However, the true Annualized ROI is 11.80%. This is because of the mathematical effect of Compound Growth. You have more money working for you in year 2 than you did in year 1, meaning the growth curve is exponential, not perfectly linear.",
          },
          {
            question: "What is a 'Good' ROI?",
            answer:
              "A 'good' ROI depends entirely on your risk tolerance. Historically, the US Stock Market (S&P 500) returns about 9% to 10% annually before inflation. Therefore, passive investors usually consider an Annualized ROI of 10% to be excellent. High-risk investments, like crypto or startup angel investing, expect significantly higher potential ROIs to justify the heavy risk of losing the entire principle.",
          },
          {
            question: "Does this calculator account for inflation?",
            answer:
              "No. This tool calculates 'Nominal ROI' (the raw numbers). To find your 'Real ROI', you would need to manually subtract the national inflation rate from your Annualized ROI result.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator",
            desc: "Project future investment growth using recursive compound interest.",
          },
          {
            name: "Investment Calculator",
            path: "/investment-calculator",
            desc: "Predict future portfolio values based on recurring monthly contributions.",
          },
          {
            name: "Present Value Calculator",
            path: "/present-value-calculator",
            desc: "Calculate what a future sum of money is actually worth in today's dollars.",
          },
        ]}
      />
    </div>
  );
}
