"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function StockReturnCalculator() {
  const [shares, setShares] = useState("100");
  const [buyPrice, setBuyPrice] = useState("50.00");
  const [buyCommission, setBuyCommission] = useState("4.95");

  const [sellPrice, setSellPrice] = useState("75.00");
  const [sellCommission, setSellCommission] = useState("4.95");

  const [dividends, setDividends] = useState("125.00");

  // Results
  const [initialCost, setInitialCost] = useState<number | null>(null);
  const [grossProceeds, setGrossProceeds] = useState<number | null>(null);
  const [netProceeds, setNetProceeds] = useState<number | null>(null);
  const [netProfit, setNetProfit] = useState<number | null>(null);
  const [roi, setRoi] = useState<number | null>(null);

  const calculateReturn = () => {
    const s = parseFloat(shares) || 0;
    const bp = parseFloat(buyPrice) || 0;
    const bc = parseFloat(buyCommission) || 0;

    const sp = parseFloat(sellPrice) || 0;
    const sc = parseFloat(sellCommission) || 0;

    const d = parseFloat(dividends) || 0;

    if (s <= 0 || bp <= 0) return;

    // Total Cost Basis
    const costBasis = s * bp + bc;

    // Raw sale value
    const rawProceeds = s * sp;

    // Net Proceeds (After commission, before cost basis)
    const proceedsAfterFees = rawProceeds + d - sc;

    // Net Profit
    const profit = proceedsAfterFees - costBasis;

    // Return on Investment (ROI)
    const returnPct = costBasis > 0 ? (profit / costBasis) * 100 : 0;

    setInitialCost(costBasis);
    setGrossProceeds(rawProceeds);
    setNetProceeds(proceedsAfterFees);
    setNetProfit(profit);
    setRoi(returnPct);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">📈</span> Stock Return Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate your exact Net Profit and Return on Investment (ROI) for
          individual stock trades.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-zinc-200 shadow-sm relative h-max">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-l-2xl"></div>

          {/* Buy Section */}
          <div>
            <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-2 mb-4 uppercase tracking-wider flex items-center">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs mr-2">
                1
              </span>
              Purchase Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                  Shares
                </label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 p-3 shadow-sm focus:border-emerald-500 font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                  Buy Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    className="w-full rounded-xl border-zinc-300 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                  Buy Fee/Commission
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={buyCommission}
                    onChange={(e) => setBuyCommission(e.target.value)}
                    className="w-full rounded-xl border-zinc-300 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold text-zinc-500 bg-zinc-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sell Section */}
          <div>
            <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-2 mb-4 uppercase tracking-wider flex items-center">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs mr-2">
                2
              </span>
              Sale Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                  Sell Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="w-full rounded-xl border-zinc-300 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                  Sell Fee/Commission
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={sellCommission}
                    onChange={(e) => setSellCommission(e.target.value)}
                    className="w-full rounded-xl border-zinc-300 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold text-zinc-500 bg-zinc-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Extras */}
          <div>
            <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-2 mb-4 uppercase tracking-wider flex items-center">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs mr-2">
                3
              </span>
              Dividends (Optional)
            </h3>

            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                Total Dividends Received
              </label>
              <div className="relative md:w-1/2">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={dividends}
                  onChange={(e) => setDividends(e.target.value)}
                  className="w-full rounded-xl border-emerald-200 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold bg-emerald-50/30"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateReturn}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm mt-4"
          >
            Calculate Return
          </button>
        </div>

        {/* Dashboard Output */}
        <div className="lg:col-span-2">
          {netProfit !== null && roi !== null ? (
            <div
              className={`h-full rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-white border ${netProfit >= 0 ? "bg-emerald-950 border-emerald-800" : "bg-red-950 border-red-800"}`}
            >
              {/* Decorative element */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none ${netProfit >= 0 ? "bg-emerald-600" : "bg-red-600"}`}
              ></div>

              <div className="relative z-10 w-full text-center">
                <h2
                  className={`font-bold uppercase tracking-widest text-xs mb-4 ${netProfit >= 0 ? "text-emerald-300" : "text-red-300"}`}
                >
                  Net Profit/Loss
                </h2>

                <div className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg break-all">
                  $
                  {Math.abs(netProfit).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>

                <div
                  className={`text-lg font-bold mb-8 flex items-center justify-center space-x-2 ${netProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}
                >
                  {netProfit >= 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  )}
                  <span>
                    {roi > 0 ? "+" : ""}
                    {roi.toFixed(2)}% ROI
                  </span>
                </div>

                <div
                  className={`space-y-4 w-full pt-6 border-t ${netProfit >= 0 ? "border-emerald-800/50" : "border-red-800/50"}`}
                >
                  <div className="flex justify-between items-center text-sm px-2">
                    <span className="text-zinc-300 font-medium">
                      Initial Cost Basis
                    </span>
                    <span className="font-bold font-mono text-zinc-100">
                      $
                      {(initialCost || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm px-2">
                    <span className="text-zinc-300 font-medium">
                      Gross Return
                    </span>
                    <span className="font-bold font-mono text-zinc-100">
                      $
                      {(grossProceeds || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div
                    className={`mt-4 pt-4 border-t ${netProfit >= 0 ? "border-emerald-800/30" : "border-red-800/30"} flex justify-between items-center`}
                  >
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${netProfit >= 0 ? "text-emerald-200" : "text-red-200"}`}
                    >
                      Net Proceeds (incl. div)
                    </span>
                    <span className="font-bold font-mono text-lg text-white">
                      $
                      {(netProceeds || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 flex flex-col items-center justify-center p-8 text-center text-emerald-600">
              <span className="text-6xl mb-4 opacity-50 grayscale pt-6">
                📊
              </span>
              <h3 className="font-bold text-xl mb-2 text-emerald-800">
                Ready to Trade
              </h3>
              <p className="text-sm font-medium opacity-80">
                Enter your trade details to evaluate your performance.
              </p>
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Stock Return Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Stock Return Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Stock Return Calculator</strong> is a specialized
                investment tool designed to reveal the exact, true profitability
                of an individual stock or equity trade.
              </p>
              <p>
                Most basic portfolio apps show raw percentages, but they often
                ignore hidden costs like buying/selling commission fees and
                completely exclude the positive compounding effect of collected
                dividend payouts. Our calculator factors in every variable to
                give you your true Net Profit and precise Return on Investment
                (ROI).
              </p>
            </>
          }
          formula={
            <>
              <p>
                To accurately determine the true net profit and ROI of a stock
                trade, multiple financial variables must be calculated together:
              </p>
              <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-[15px] sm:text-lg shadow-inner my-4 overflow-x-auto text-zinc-800 border border-zinc-200">
                Net Profit = (Sell Price × Shares) + Dividends - (Buy Price ×
                Shares) - Buy Fee - Sell Fee
                <br />
                <br />
                ROI = (Net Profit / Cost Basis) × 100
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-emerald-800">
                <li>
                  <strong>Cost Basis:</strong> The total original amount spent
                  (Shares × Buy Price) + Buy Fee.
                </li>
                <li>
                  <strong>Gross Proceeds:</strong> Raw sale value (Shares × Sell
                  Price).
                </li>
                <li>
                  <strong>Dividends:</strong> Total cash paid out to you by the
                  company while you held the stock.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                You purchase <strong>100 shares</strong> of a company at{" "}
                <strong>$50.00</strong> per share. Your broker charges a{" "}
                <strong>$4.95</strong> commission. Over a year, you collect{" "}
                <strong>$125.00</strong> in cash dividends.
              </p>
              <p>
                You decide to sell all 100 shares at <strong>$75.00</strong>{" "}
                each, paying another <strong>$4.95</strong> sell commission.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Cost Basis:</strong> (100 × $50.00) + $4.95 ={" "}
                  <strong>$5,004.95</strong>
                </li>
                <li>
                  <strong>Gross Sale:</strong> 100 × $75.00 ={" "}
                  <strong>$7,500.00</strong>
                </li>
                <li>
                  <strong>Net Proceeds (incl. dividends & fees):</strong>{" "}
                  $7,500.00 + $125.00 - $4.95 = <strong>$7,620.05</strong>
                </li>
                <li>
                  <strong>Net Profit:</strong> $7,620.05 - $5,004.95 ={" "}
                  <strong>$2,615.10</strong>
                </li>
              </ul>
              <p className="mt-4 font-bold text-emerald-700">
                Your final Return on Investment (ROI) is exactly 52.25%!
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Trade Post-Mortems:</strong> After exiting a position,
                use the calculator to evaluate your exact performance, heavily
                factoring in the impact of broker fees and taxes on smaller,
                high-frequency trades.
              </li>
              <li>
                <strong>Dividend Tracking:</strong> Proving the immense value of
                "Total Return" (Capital Gains + Dividends) for conservative,
                income-focused dividend portfolios over time.
              </li>
              <li>
                <strong>Breakeven Analysis:</strong> Adjusting the "Sell Price"
                slider to figure out exactly what price the stock needs to hit
                for you to just break even after dealing with broker
                commissions.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does this calculator account for capital gains tax?",
              answer:
                "Currently, this specific calculator determines pre-tax net profit. Capital gains taxes heavily depend on your specific income bracket and whether your trade was a Short-Term (< 1 year) or Long-Term (> 1 year) hold. Keep in mind you will owe taxes on the Net Profit.",
            },
            {
              question:
                "Why does the ROI include the buy commission in the cost basis?",
              answer:
                "In real accounting and tax law, your 'Cost Basis' isn't just the price of the shares; it's the total capital you had to deploy in order to acquire the asset. The buy commission was money out of your pocket required to start the investment, so it reduces your overall ROI.",
            },
          ]}
          relatedCalculators={[
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "A generalized return on investment calculator for any asset class.",
            },
            {
              name: "Compound Interest Calculator",
              path: "/compound-interest-calculator",
              desc: "Calculate how those stock returns compound into immense wealth over decades.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator",
              desc: "Project the future value of a diversified portfolio.",
            },
          ]}
        />
      </div>
    </div>
  );
}
