"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("100");
  const [tipPercent, setTipPercent] = useState("15");
  const [splitCount, setSplitCount] = useState("1");

  const [result, setResult] = useState({
    tipAmount: 0,
    totalAmount: 0,
    tipPerPerson: 0,
    totalPerPerson: 0,
  });

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercent, splitCount]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tipPct = parseFloat(tipPercent) || 0;
    let split = parseInt(splitCount) || 1;
    if (split < 1) split = 1;

    const tipAmount = bill * (tipPct / 100);
    const totalAmount = bill + tipAmount;
    const tipPerPerson = tipAmount / split;
    const totalPerPerson = totalAmount / split;

    setResult({
      tipAmount,
      totalAmount,
      tipPerPerson,
      totalPerPerson,
    });
  };

  const presetTips = [10, 15, 18, 20, 25];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-700 border-b pb-4">
        Tip Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate gratuity instantly, split the bill evenly among your party,
        and find the exact per-person cost.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-xl">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-emerald-500 font-black text-2xl text-gray-800"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tip Percentage (%)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {presetTips.map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPercent(pct.toString())}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition ${parseFloat(tipPercent) === pct ? "bg-emerald-600 text-white shadow-md" : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100"}`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <input
              type="number"
              min="0"
              step="1"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Split Count (Number of People)
            </label>
            <div className="flex items-center">
              <button
                onClick={() =>
                  setSplitCount(
                    Math.max(1, parseInt(splitCount || "1") - 1).toString(),
                  )
                }
                className="bg-emerald-100 text-emerald-700 p-3 rounded-l-lg hover:bg-emerald-200 font-black text-xl w-12"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                step="1"
                value={splitCount}
                onChange={(e) =>
                  setSplitCount(
                    Math.max(1, parseInt(e.target.value) || 1).toString(),
                  )
                }
                className="w-full border-y border-gray-300 p-3 text-center focus:outline-none focus:ring-0 font-bold text-xl text-gray-800"
              />
              <button
                onClick={() =>
                  setSplitCount((parseInt(splitCount || "1") + 1).toString())
                }
                className="bg-emerald-100 text-emerald-700 p-3 rounded-r-lg hover:bg-emerald-200 font-black text-xl w-12"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-emerald-900 border-2 border-emerald-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-center text-white">
          <div className="w-full h-full flex flex-col">
            <div className="p-8 pb-6 border-b border-emerald-700/50">
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-emerald-300 font-bold uppercase tracking-widest text-xs">
                  Tip Amount
                </h3>
                {parseInt(splitCount) > 1 && (
                  <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest">
                    / person
                  </span>
                )}
              </div>
              <div className="text-5xl font-black text-white drop-shadow-md">
                $
                {parseInt(splitCount) > 1
                  ? result.tipPerPerson.toFixed(2)
                  : result.tipAmount.toFixed(2)}
              </div>
              {parseInt(splitCount) > 1 && (
                <div className="text-emerald-400 font-medium text-sm mt-1">
                  Total Tip: ${result.tipAmount.toFixed(2)}
                </div>
              )}
            </div>

            <div className="p-8 pt-6 flex-grow bg-emerald-800/30">
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-emerald-300 font-bold uppercase tracking-widest text-xs">
                  Total Bill
                </h3>
                {parseInt(splitCount) > 1 && (
                  <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest">
                    / person
                  </span>
                )}
              </div>
              <div className="text-4xl font-black text-zinc-100 drop-shadow-md">
                $
                {parseInt(splitCount) > 1
                  ? result.totalPerPerson.toFixed(2)
                  : result.totalAmount.toFixed(2)}
              </div>
              {parseInt(splitCount) > 1 && (
                <div className="text-emerald-400 font-medium text-sm mt-1">
                  Grand Total: ${result.totalAmount.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Tip Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Tip & Gratuity Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Tip Calculator</strong> provides an instant,
                mathematically perfect way to calculate gratuity, add it to your
                total bill, and split the final cost evenly among a group of
                people.
              </p>
              <p>
                Whether dining out at a restaurant, paying a delivery driver, or
                tipping a hairstylist, understanding exactly how much to leave
                as a tip (and how much each person owes) ensures both fair
                compensation for service workers and an equitable split among
                friends.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Tip Calculator, Electricity Bill
                Calculator, Multiplication Calculator, Matrix Multiplication
                Calculator
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Tip = Total × %
            </div>
            <p className="text-sm text-slate-500 text-center">
              Standard service gratuity calculation.
            </p>
          </>
        }
          example={
            <>
              <p>
                Here is exactly how the math works when splitting a dinner bill.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Bill:</strong> A dinner for 4 people costs
                  $120.00. You want to leave a 20% tip.
                </li>
                <li>
                  <strong>The Tip Calculation:</strong> $120.00 × 0.20 ={" "}
                  <strong>$24.00</strong> tip.
                </li>
                <li>
                  <strong>The Grand Total:</strong> $120.00 + $24.00 ={" "}
                  <strong>$144.00</strong> total.
                </li>
                <li>
                  <strong>The Split:</strong> $144.00 ÷ 4 people ={" "}
                  <strong>$36.00 per person</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Group Dining:</strong> The most common use case. Four
                friends go out to dinner, the bill arrives as a single check,
                and nobody wants to do mental math to figure out exactly what
                their fair share of the 18% tip is.
              </li>
              <li>
                <strong>Travel & Hospitality:</strong> Calculating tips for
                hotel bellhops, tour guides, and rideshare drivers. Many
                countries have different standard tipping percentages, requiring
                quick calculations on the fly.
              </li>
              <li>
                <strong>Catering Events:</strong> Event planners often need to
                calculate and budget for a mandatory 15% to 22% gratuity charge
                on multi-thousand dollar catering contracts.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Should I calculate the tip before or after taxes?",
              answer:
                "Etiquette experts generally agree that you should calculate your tip based on the pre-tax subtotal. You are tipping on the cost of the food and service, not tipping on the government's tax. However, many people tip on the final post-tax total simply for convenience.",
            },
            {
              question: "What is a standard tipping percentage?",
              answer:
                "In the United States, 15% to 20% is considered standard for sit-down restaurant service. 10% is often used for poor service or takeout, while 20%+ is reserved for excellent service.",
            },
            {
              question: "How do I calculate a 20% tip in my head?",
              answer:
                "Move the decimal point one place to the left to find 10%, then simply double that number. For a $45.00 bill, 10% is $4.50. Double that ($4.50 + $4.50) to get a 20% tip of $9.00.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Discount Calculator",
              path: "/discount-calculator/",
              desc: "Calculate savings before figuring out the tip.",
            },
            {
              name: "Sales Tax Calculator",
              path: "/sales-tax-calculator/",
              desc: "Determine exact tax amounts on your purchases.",
            },
            {
              name: "Salary Calculator",
              path: "/salary-calculator/",
              desc: "Convert your hourly wages (including tips) into an annual salary.",
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
