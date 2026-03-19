"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DepreciationCalculator() {
  const [cost, setCost] = useState("10000");
  const [salvageValue, setSalvageValue] = useState("1000");
  const [usefulLife, setUsefulLife] = useState("5"); // Years
  const [method, setMethod] = useState("straightLine"); // straightLine, decliningBalance

  const [result, setResult] = useState<{
    annualDepreciation?: number; // For straight line
    rate?: number; // For declining
    schedule: {
      year: number;
      depExpense: number;
      accDep: number;
      bookValue: number;
    }[];
  } | null>(null);

  const calculate = () => {
    const c = parseFloat(cost);
    const s = parseFloat(salvageValue);
    const l = parseInt(usefulLife, 10);

    if (isNaN(c) || isNaN(s) || isNaN(l) || l <= 0 || c <= s) {
      setResult(null);
      return;
    }

    const schedule = [];
    let bookValue = c;
    let accDep = 0;

    if (method === "straightLine") {
      const annualDepreciation = (c - s) / l;

      for (let i = 1; i <= l; i++) {
        accDep += annualDepreciation;
        bookValue -= annualDepreciation;

        // Address floating point precision on last year
        if (i === l) {
          bookValue = s;
        }

        schedule.push({
          year: i,
          depExpense: annualDepreciation,
          accDep: accDep,
          bookValue: bookValue,
        });
      }

      setResult({
        annualDepreciation,
        schedule,
      });
    } else if (method === "decliningBalance") {
      // Double Declining Balance
      const rate = (1 / l) * 2; // 200% declining

      for (let i = 1; i <= l; i++) {
        let depExpense = bookValue * rate;

        // Do not depreciate below salvage value
        if (bookValue - depExpense < s) {
          depExpense = bookValue - s;
        }

        // If it's the last year and we haven't hit salvage, force it (switch to straight-line technically, but we'll force final plug)
        if (i === l) {
          depExpense = bookValue - s;
        }

        accDep += depExpense;
        bookValue -= depExpense;

        schedule.push({
          year: i,
          depExpense: depExpense,
          accDep: accDep,
          bookValue: bookValue,
        });

        if (bookValue <= s && i < l) {
          // Fill remaining years with 0 depreciation
          for (let j = i + 1; j <= l; j++) {
            schedule.push({
              year: j,
              depExpense: 0,
              accDep: accDep,
              bookValue: s,
            });
          }
          break;
        }
      }

      setResult({
        rate: rate * 100,
        schedule,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">📉</span> Depreciation Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate asset depreciation using Straight-Line or Double Declining
          Balance methods.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="mb-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col md:flex-row items-center gap-4">
          <label className="font-bold text-emerald-900 whitespace-nowrap uppercase tracking-widest text-sm">
            Method:
          </label>
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-zinc-200 w-full">
            <button
              onClick={() => {
                setMethod("straightLine");
                setResult(null);
              }}
              className={`flex-[1.5] py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${method === "straightLine" ? "bg-emerald-600 text-white shadow-md" : "text-zinc-500 hover:bg-zinc-50"}`}
            >
              Straight-Line
            </button>
            <button
              onClick={() => {
                setMethod("decliningBalance");
                setResult(null);
              }}
              className={`flex-[2] py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${method === "decliningBalance" ? "bg-emerald-600 text-white shadow-md" : "text-zinc-500 hover:bg-zinc-50"}`}
            >
              Double Declining
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Initial Asset Cost
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Salvage Value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={salvageValue}
                onChange={(e) => setSalvageValue(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Useful Life
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                min="1"
                value={usefulLife}
                onChange={(e) => setUsefulLife(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-xl"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                Yrs
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Generate Schedule
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
          <div className="bg-emerald-950 p-6 flex flex-col items-center border-b-4 border-emerald-500 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
            <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 z-10">
              Depreciation Overview
            </h2>

            <div className="flex gap-8 z-10 text-center">
              {result.annualDepreciation !== undefined && (
                <div>
                  <div className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">
                    Annual Expense
                  </div>
                  <div className="font-mono text-white font-bold text-3xl">
                    $
                    {result.annualDepreciation.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              )}
              {result.rate !== undefined && (
                <div>
                  <div className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">
                    DDB Rate
                  </div>
                  <div className="font-mono text-white font-bold text-3xl">
                    {result.rate.toFixed(2)}%
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto p-4 md:p-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-3 text-xs font-bold text-emerald-900 uppercase tracking-wider border-b-2 border-zinc-200">
                    Year
                  </th>
                  <th className="py-3 text-xs font-bold text-emerald-900 uppercase tracking-wider border-b-2 border-zinc-200">
                    Depreciation Expense
                  </th>
                  <th className="py-3 text-xs font-bold text-emerald-900 uppercase tracking-wider border-b-2 border-zinc-200">
                    Accumulated Dep.
                  </th>
                  <th className="py-3 text-xs font-bold text-emerald-900 uppercase tracking-wider border-b-2 border-zinc-200">
                    Ending Book Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-zinc-50 transition-colors border-b border-zinc-100">
                  <td className="py-3 px-2 font-bold text-zinc-500">0</td>
                  <td className="py-3 px-2 font-mono text-zinc-700">-</td>
                  <td className="py-3 px-2 font-mono text-zinc-700">$0.00</td>
                  <td className="py-3 px-2 font-mono text-emerald-700 font-bold">
                    $
                    {parseFloat(cost).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                {result.schedule.map((row) => (
                  <tr
                    key={row.year}
                    className="hover:bg-zinc-50 transition-colors border-b border-zinc-100"
                  >
                    <td className="py-3 px-2 font-bold text-zinc-500">
                      {row.year}
                    </td>
                    <td className="py-3 px-2 font-mono text-rose-600 font-bold">
                      -$
                      {row.depExpense.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-2 font-mono text-zinc-700">
                      $
                      {row.accDep.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-2 font-mono text-emerald-700 font-bold">
                      $
                      {row.bookValue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Depreciation Calculator",
            operatingSystem: "All",
            applicationCategory: "FinancialApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Depreciation Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Depreciation Calculator</strong> allows businesses
                and accountants to accurately generate a year-by-year schedule
                of how an asset loses value over time. Depreciation represents
                the "wear and tear" on large physical purchases, allowing a
                business to spread the massive upfront cost of an asset over its
                entire useful life for accounting and tax purposes.
              </p>
              <p>
                This tool supports the two most common accounting methods:{" "}
                <strong>Straight-Line Depreciation</strong> (where the asset
                loses the exact same amount of value every single year) and{" "}
                <strong>Double Declining Balance</strong> (an accelerated method
                where the asset loses the majority of its value in the first few
                years).
              </p>
            </>
          }
          formula={
            <>
              <p>
                The standard <strong>Straight-Line</strong> depreciation formula
                is straightforward algebra:
              </p>
              <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-200 text-zinc-900">
                <p>
                  <strong>Annual Expense</strong> = (Asset Cost - Salvage Value)
                  / Useful Life
                </p>
              </div>
              <p>
                The <strong>Double Declining Balance</strong> method is slightly
                more aggressive, calculating the straight-line percentage rate,
                doubling it, and applying that percentage to the remaining book
                value every year.
              </p>
            </>
          }
          example={
            <>
              <p>
                Let's map out a standard business purchase: A company buys a{" "}
                <strong>$50,000 delivery van</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                <li>
                  <strong>Variables:</strong> The van cost $50,000. It has an
                  expected "Useful Life" of 5 years. After 5 years, the company
                  expects to sell it for scrap for a "Salvage Value" of $5,000.
                </li>
                <li>
                  <strong>Straight-Line Math:</strong> ($50,000 - $5,000) / 5
                  years = $9,000 per year.
                </li>
                <li>
                  <strong>Straight-Line Result:</strong> Every year for 5 years,
                  the company will report exactly <strong>$9,000</strong> in
                  depreciation expense on their income statement.
                </li>
                <li>
                  <strong>Double Declining Result:</strong> If using DDB, the
                  company would take a massive <strong>$20,000</strong> expense
                  in Year 1, $12,000 in Year 2, and so on until it hits the $5k
                  salvage value.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Corporate Tax Strategy:</strong> By front-loading
                depreciation using the Double Declining method (or Section
                179/Bonus Depreciation), profitable businesses can artificially
                lower their taxable income significantly in the current year to
                lower their tax bill.
              </li>
              <li>
                <strong>Accurate Profitability Tracking:</strong> If a bakery
                buys a massive $100,000 oven in January, they shouldn't log a
                -$100,000 loss for January and wildly inflated profits for the
                rest of the decade. Straight-line depreciation smooths out that
                cost so they can accurately track month-over-month
                profitability.
              </li>
              <li>
                <strong>Asset Management:</strong> Tracking exactly what a fleet
                of company vehicles or heavy machinery is currently worth on the
                company's official balance sheet (Book Value).
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is 'Salvage Value'?",
              answer:
                "Salvage value is the estimated resale value of the asset at the end of its useful life. For example, a laptop might be bought for $2000, used for 4 years, and then sold for parts for $200. $200 is the salvage value. You never depreciate an asset below its salvage value.",
            },
            {
              question:
                "Why would I choose Double Declining instead of Straight-Line?",
              answer:
                "Mostly for tax benefits. Double Declining is an 'accelerated' depreciation method. It gives you massive tax write-offs in the first few years, which is highly advantageous for reducing your current tax burden. It's also more realistic for assets like cars or computers that lose most of their real-world value immediately after purchase.",
            },
            {
              question: "Can I depreciate land?",
              answer:
                "No. Under US GAAP and IRS rules, land is not considered a depreciable asset because it does not theoretically suffer from 'wear and tear' and has an infinite useful life. You can only depreciate what is built on the land (buildings, fences, roads).",
            },
          ]}
          relatedCalculators={[
            {
              name: "ROI Calculator",
              path: "/roi-calculator/",
              desc: "Calculate your return on investment to see if the asset purchase was profitable.",
            },
            {
              name: "Net Worth Calculator",
              path: "/net-worth-calculator/",
              desc: "Track how your physical assets affect your total net worth.",
            },
            {
              name: "Auto Lease Calculator",
              path: "/auto-lease-calculator/",
              desc: "Calculate monthly payments based heavily on a vehicle's estimated depreciation.",
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
