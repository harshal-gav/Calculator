"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function InflationCalculator() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("3.0"); // Avg annual inflation
  const [years, setYears] = useState("10"); // Number of years

  const [result, setResult] = useState<{
    futureCost: number;
    purchasingPower: number;
    totalIncrease: number;
  } | null>(null);

  const calculateInflation = () => {
    const A = parseFloat(amount) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseInt(years) || 0;

    if (A > 0 && t > 0) {
      // Future cost of an item that costs A today
      const futureCost = A * Math.pow(1 + r, t);

      // What A dollars today will be worth in t years (Purchasing Power)
      // It degrades by inflation rate
      const purchasingPower = A / Math.pow(1 + r, t);

      setResult({
        futureCost,
        purchasingPower,
        totalIncrease: futureCost - A,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">
        Inflation Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate how inflation impacts the future cost of goods and degrades
        your purchasing power over time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="md:col-span-5 bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Starting Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Average Annual Inflation Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-medium"
            />
            <p className="text-xs text-gray-500 mt-1">
              Historically averages 2-3% per year.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-medium"
            />
          </div>

          <button
            onClick={calculateInflation}
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Impact
          </button>
        </div>

        {/* Results Screen */}
        <div className="md:col-span-7 bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
          {result !== null ? (
            <div className="space-y-8">
              <div>
                <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-xs mb-2">
                  Cost of the same item in {years} years
                </h3>
                <div className="text-5xl font-black text-gray-900 border-b border-emerald-100 pb-4">
                  $
                  {result.futureCost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-sm font-bold text-red-600 mt-2 uppercase">
                  +$
                  {result.totalIncrease.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  Price Increase
                </div>
              </div>

              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-inner">
                <h3 className="text-emerald-800 font-bold uppercase tracking-wider text-xs mb-2">
                  Future Purchasing Power
                </h3>
                <p className="text-gray-700 leading-snug font-medium mb-3">
                  Your currently saved{" "}
                  <strong className="text-gray-900">
                    ${parseFloat(amount).toLocaleString()}
                  </strong>{" "}
                  will only have the purchasing power of:
                </p>
                <div className="text-4xl font-black text-emerald-700">
                  $
                  {result.purchasingPower.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-3 font-medium uppercase">
                  Using today's value baseline
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-emerald-400 font-medium">
              Enter an amount and an inflation rate to model its future
              financial impact.
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
            name: "Inflation Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Inflation & Purchasing Power Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Inflation Calculator</strong> measures how the cost
                of living increases over time and how that macroeconomic shift
                actively degrades the purchasing power of your saved money.
              </p>
              <p>
                Inflation is the silent tax. A $100 bill locked in a safe for 20
                years will still be a $100 bill when you open it, but the amount
                of groceries it can actually buy will have plummeted. This
                calculator helps you forecast that loss so you can plan
                investments that outpace it.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The calculation uses the standard compound interest formula, but
                applies it to the cost of goods rather than the growth of an
                investment:
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-emerald-900 border border-emerald-100">
                <strong>Future Cost</strong> = Current Price × (1 + Inflation
                Rate)<sup>Years</sup>
              </div>
              <p className="mt-4">
                Conversely, to calculate how much today's money will be worth in
                the future (Purchasing Power):
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-emerald-900 border border-emerald-100">
                <strong>Future Purchasing Power</strong> = Current Savings ÷ (1
                + Inflation Rate)<sup>Years</sup>
              </div>
            </>
          }
          example={
            <>
              <p>
                Suppose you have <strong>$10,000</strong> sitting in a
                zero-interest checking account, and the average annual inflation
                rate is <strong>3%</strong> for the next{" "}
                <strong>10 years</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  A car that costs $10,000 today will cost{" "}
                  <strong>$13,439</strong> in ten years due to inflation.
                </li>
                <li>
                  Because your money didn't grow, that $10,000 in your checking
                  account will only have the purchasing power of{" "}
                  <strong>$7,440</strong> in today's terms.
                </li>
                <li>
                  <strong>The Reality Check:</strong> By "playing it safe" in
                  cash, you actually lost over 25% of your true wealth.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Retirement Planning:</strong> Realizing that needing
                "$5,000 a month" to live comfortably today actually means you
                will need $9,000 a month to maintain the exact same lifestyle 20
                years from now.
              </li>
              <li>
                <strong>Salary Negotiations:</strong> Calculating if your 2%
                annual raise actually outpaced the 3.5% inflation rate of the
                previous year (if it didn't, you took a mathematical pay cut).
              </li>
              <li>
                <strong>Real Return on Investment:</strong> Realizing that a
                high-yield savings account paying 4% while inflation is 5% still
                yields a <i>negative</i> real return.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is a 'normal' inflation rate?",
              answer:
                "The U.g., Federal Reserve formally targets an average annual inflation rate of 2%. Historically over the last century, it has averaged closer to 3% to 3.5%.",
            },
            {
              question: "How is official inflation actually measured?",
              answer:
                "Governments track the Consumer Price Index (CPI), which represents a fixed 'basket' of everyday goods and services (like milk, gasoline, housing, and healthcare). They physically track the price of this exact basket month over month.",
            },
            {
              question: "What is Hyperinflation?",
              answer:
                "Hyperinflation occurs when price increases spiral completely out of a central bank's control, typically defined as exceeding 50% per month. This usually happens when a government prints massive amounts of fiat currency to cover unpayable debts.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Salary Calculator",
              path: "/salary-calculator",
              desc: "See your precise take-home pay to determine if your income is outpacing inflation.",
            },
            {
              name: "Compound Interest Calculator",
              path: "/compound-interest-calculator",
              desc: "Model an investment portfolio designed to grow faster than inflation.",
            },
            {
              name: "Retirement Calculator",
              path: "/retirement-calculator",
              desc: "Calculate your full macroeconomic life plan including inflation adjustments.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator",
              desc: "Calculate your exact age in years, months, and days.",
            }]}
        />
      </div>
    </div>
  );
}
