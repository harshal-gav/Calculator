"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PercentageCalculator() {
  const [whatIsVal1, setWhatIsVal1] = useState("");
  const [whatIsVal2, setWhatIsVal2] = useState("");
  const [whatIsRes, setWhatIsRes] = useState<number | null>(null);

  const [isWhatVal1, setIsWhatVal1] = useState("");
  const [isWhatVal2, setIsWhatVal2] = useState("");
  const [isWhatRes, setIsWhatRes] = useState<number | null>(null);

  const [changeVal1, setChangeVal1] = useState("");
  const [changeVal2, setChangeVal2] = useState("");
  const [changeRes, setChangeRes] = useState<{
    val: number;
    type: "Increase" | "Decrease" | "No Change";
  } | null>(null);

  const calcWhatIs = () => {
    const v1 = parseFloat(whatIsVal1);
    const v2 = parseFloat(whatIsVal2);
    setWhatIsRes(!isNaN(v1) && !isNaN(v2) ? (v1 / 100) * v2 : null);
  };

  const calcIsWhat = () => {
    const v1 = parseFloat(isWhatVal1);
    const v2 = parseFloat(isWhatVal2);
    setIsWhatRes(!isNaN(v1) && !isNaN(v2) && v2 !== 0 ? (v1 / v2) * 100 : null);
  };

  const calcChange = () => {
    const v1 = parseFloat(changeVal1);
    const v2 = parseFloat(changeVal2);
    if (!isNaN(v1) && !isNaN(v2) && v1 !== 0) {
      const diff = v2 - v1;
      const pct = (Math.abs(diff) / Math.abs(v1)) * 100;
      let type: "Increase" | "Decrease" | "No Change" = "No Change";
      if (diff > 0) type = "Increase";
      if (diff < 0) type = "Decrease";
      setChangeRes({ val: pct, type });
    } else {
      setChangeRes(null);
    }
  };

  const clearAll = () => {
    setWhatIsVal1("");
    setWhatIsVal2("");
    setWhatIsRes(null);
    setIsWhatVal1("");
    setIsWhatVal2("");
    setIsWhatRes(null);
    setChangeVal1("");
    setChangeVal2("");
    setChangeRes(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-end border-b pb-4 mb-4">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900">
            Percentage Calculator
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            Calculate all common percentage problems instantly.
          </p>
        </div>
        <button
          onClick={clearAll}
          className="text-gray-500 hover:text-red-500 transition font-medium text-sm"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-8">
        {/* Scenario 1 */}
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 flex flex-wrap items-center gap-4 text-xl font-medium text-gray-700">
            <span>What is</span>
            <input
              type="number"
              value={whatIsVal1}
              onChange={(e) => setWhatIsVal1(e.target.value)}
              className="w-24 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center"
              placeholder="%"
            />
            <span>% of</span>
            <input
              type="number"
              value={whatIsVal2}
              onChange={(e) => setWhatIsVal2(e.target.value)}
              className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center"
            />
            <span className="font-bold text-gray-400">?</span>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={calcWhatIs}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition w-full md:w-auto"
            >
              Calculate
            </button>
            {whatIsRes !== null && (
              <div className="min-w-[120px] bg-white border-2 border-green-400 text-green-700 font-bold p-3 rounded-lg text-center shadow-sm text-xl">
                {whatIsRes.toFixed(4).replace(/\.?0+$/, "")}
              </div>
            )}
          </div>
        </div>

        {/* Scenario 2 */}
        <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 flex flex-wrap items-center gap-4 text-xl font-medium text-gray-700">
            <input
              type="number"
              value={isWhatVal1}
              onChange={(e) => setIsWhatVal1(e.target.value)}
              className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 text-center"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={isWhatVal2}
              onChange={(e) => setIsWhatVal2(e.target.value)}
              className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 text-center"
            />
            <span className="font-bold text-gray-400">?</span>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={calcIsWhat}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition w-full md:w-auto"
            >
              Calculate
            </button>
            {isWhatRes !== null && (
              <div className="min-w-[120px] bg-white border-2 border-green-400 text-green-700 font-bold p-3 rounded-lg text-center shadow-sm text-xl flex items-center justify-center gap-1">
                {isWhatRes.toFixed(4).replace(/\.?0+$/, "")}{" "}
                <span className="text-gray-400 text-sm">%</span>
              </div>
            )}
          </div>
        </div>

        {/* Scenario 3 */}
        <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-100 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 flex flex-wrap items-center gap-4 text-xl font-medium text-gray-700">
            <div className="flex flex-col gap-1 w-full md:w-auto">
              <span className="text-sm text-gray-400">From Value</span>
              <input
                type="number"
                value={changeVal1}
                onChange={(e) => setChangeVal1(e.target.value)}
                className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500 text-center"
              />
            </div>
            <span className="mt-5 px-2 text-gray-400 font-bold">→</span>
            <div className="flex flex-col gap-1 w-full md:w-auto">
              <span className="text-sm text-gray-400">To Value</span>
              <input
                type="number"
                value={changeVal2}
                onChange={(e) => setChangeVal2(e.target.value)}
                className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500 text-center"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
            <button
              onClick={calcChange}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition w-full md:w-auto mt-4 md:mt-0"
            >
              Calculate
            </button>
            {changeRes !== null && (
              <div className="min-w-[180px] bg-white border-2 border-green-400 p-3 rounded-lg text-center shadow-sm flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-green-700 flex items-center gap-1">
                  {changeRes.val.toFixed(4).replace(/\.?0+$/, "")}{" "}
                  <span className="text-gray-400 text-sm">%</span>
                </div>
                <div
                  className={`text-xs font-bold uppercase tracking-wider ${changeRes.type === "Increase" ? "text-green-600" : changeRes.type === "Decrease" ? "text-red-500" : "text-gray-400"}`}
                >
                  {changeRes.type}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Percentage Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Percentage Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Percentage Calculator</strong> simplifies the three
              most common mathematical percentage problems people face every
              day: finding a percentage of a number, finding what percentage one
              number is of another, and calculating the percentage increase or
              decrease between two values.
            </p>
            <p>
              Instead of trying to remember which number to divide and where to
              move the decimal point, this tool instantly processes your raw
              numbers and returns mathematically perfect percentages.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Percentage Calculator, Percent Off
              Calculator, Weight Percentile Calculator, Decimal To Percent
              Calculator, Height Percentile Calculator, Percent Change, Percent
              Change Formula, Percent Difference, Percent Difference Formula,
              Percent Increase
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              P = (V / Total) × 100
            </div>
            <p className="text-sm text-slate-500 text-center">
              Expressing a number as a fraction of 100.
            </p>
          </>
        }
        example={
          <>
            <p>
              Let's calculate a <strong>Percentage Increase</strong>. You bought
              a stock for <strong>$50</strong>, and it is now worth{" "}
              <strong>$65</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Formula:</strong> (|New - Old| / |Old|) * 100
              </li>
              <li>
                <strong>Step 1 (Find the difference):</strong> $65 - $50 = $15
              </li>
              <li>
                <strong>Step 2 (Divide by original):</strong> $15 / $50 = 0.30
              </li>
              <li>
                <strong>Step 3 (Multiply by 100):</strong> 0.30 * 100 ={" "}
                <strong>30% Increase</strong>
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Retail Discounts:</strong> Quickly figuring out the final
              price of a $120 jacket when the store advertises "35% off all
              items".
            </li>
            <li>
              <strong>Test Scores:</strong> A student calculating their final
              grade by figuring out what percentage 43 correct answers is out of
              55 total questions.
            </li>
            <li>
              <strong>Business Metrics:</strong> Determining the
              month-over-month percentage growth in website traffic or gross
              sales.
            </li>
            <li>
              <strong>Tipping:</strong> Calculating exactly what a 20% gratuity
              looks like on a $84.50 restaurant bill.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "How do I calculate a percentage in my head?",
            answer:
              "The easiest trick is finding 10% first. To find 10% of any number, just move the decimal point one place to the left (10% of 450 is 45). Once you have 10%, you can double it to find 20%, or cut it in half to find 5%.",
          },
          {
            question: "Is 'X% of Y' the same as 'Y% of X'?",
            answer:
              "Yes! This is a fascinating mathematical property. 8% of 25 is exactly the same as 25% of 8. Since 25% is just one-quarter, and a quarter of 8 is 2, then 8% of 25 must also be 2.",
          },
          {
            question:
              "Why do I need to divide by the original number for percentage change?",
            answer:
              "Percentage change always measures growth or decay relative to your starting point. Going from $10 to $20 is a $10 increase, which is a massive 100% gain. Going from $1000 to $1010 is also a $10 increase, but relative to your starting point, it's only a tiny 1% gain. You must divide by the specific starting value.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Fraction Calculator",
            path: "/fraction-calculator/",
            desc: "Easily add, subtract, multiply, and divide standard fractions.",
          },
          {
            name: "Margin Calculator",
            path: "/margin-calculator/",
            desc: "Calculate your gross margin percentage and profit dollars.",
          },
          {
            name: "Sales Tax Calculator",
            path: "/sales-tax-calculator/",
            desc: "Calculate total costs by adding local percentage sales tax.",
          },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator/",
              desc: "Perform advanced mathematical operations and functions.",
            }]}
      />
    </div>
  );
}
