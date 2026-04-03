"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function InvestmentCalculator() {
  const [startingAmount, setStartingAmount] = useState("10000");
  const [returnRate, setReturnRate] = useState("8");
  const [investmentLength, setInvestmentLength] = useState("20");
  const [contribution, setContribution] = useState("500");
  const [contributionFreq, setContributionFreq] = useState("monthly");

  const [result, setResult] = useState<{
    futureValue: number;
    totalContributed: number;
    totalInterest: number;
  } | null>(null);

  const calculateInvestment = () => {
    const principal = parseFloat(startingAmount) || 0;
    const rate = (parseFloat(returnRate) || 0) / 100 / 12;
    const years = parseFloat(investmentLength) || 0;
    const monthlyExtra = parseFloat(contribution) || 0;
    const freq = contributionFreq;

    const months = years * 12;
    let total = principal;
    let totalDeposited = principal;

    for (let i = 0; i < months; i++) {
      total = total * (1 + rate);

      if (freq === "monthly") {
        total += monthlyExtra;
        totalDeposited += monthlyExtra;
      } else if (freq === "annually" && (i + 1) % 12 === 0) {
        total += monthlyExtra;
        totalDeposited += monthlyExtra;
      }
    }

    setResult({
      futureValue: total,
      totalContributed: totalDeposited,
      totalInterest: total - totalDeposited
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4 shadow-sm inline-block px-2">
         Investment Strategy Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Master your financial destiny. Project the growth of your stock portfolio, mutual funds, and retirement accounts with our advanced modeling engine.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Starting Amount ($):</label>
              <input 
                type="number" 
                value={startingAmount} 
                onChange={(e) => setStartingAmount(e.target.value)} 
                className="w-full rounded-xl border-gray-300 p-4 font-black text-gray-900 focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Annual Return (%)</label>
                  <input 
                    type="number" 
                    value={returnRate} 
                    onChange={(e) => setReturnRate(e.target.value)} 
                    className="w-full rounded-xl border-gray-300 p-4 text-emerald-700 font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Horizon (Years)</label>
                  <input 
                    type="number" 
                    value={investmentLength} 
                    onChange={(e) => setInvestmentLength(e.target.value)} 
                    className="w-full rounded-xl border-gray-300 p-4 font-bold" 
                  />
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Periodic Deposit ($):</label>
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  value={contribution} 
                  onChange={(e) => setContribution(e.target.value)} 
                  className="flex-grow rounded-xl border-gray-300 p-4 font-black text-blue-700" 
                />
                <select 
                  value={contributionFreq} 
                  onChange={(e) => setContributionFreq(e.target.value)} 
                  className="rounded-xl border-gray-300 p-4 text-xs font-bold bg-white"
                >
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateInvestment}
            className="mt-8 w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl text-xl uppercase tracking-wider active:scale-95"
          >
            Run Projection
          </button>
        </div>

        <div className="lg:col-span-8 flex flex-col space-y-6">
          {result !== null ? (
            <>
                <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden group border border-blue-400/20">
                    <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                    <span className="block text-sm font-bold text-blue-300 uppercase mb-3 tracking-[0.3em] font-mono">Projected Net Worth</span>
                    <div className="text-7xl md:text-8xl font-black mb-4 tabular-nums drop-shadow-lg">
                        ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-blue-200/60 text-sm font-medium">After {investmentLength} years of execution</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border-2 border-gray-50 p-8 rounded-3xl shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                        <span className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest font-mono">Labor Yield (Principal)</span>
                        <div className="text-4xl font-black text-gray-900">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className="w-full h-2 bg-gray-100 rounded-full mt-6">
                            <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${(result.totalContributed / result.futureValue) * 100}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-white border-2 border-gray-50 p-8 rounded-3xl shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-100"></div>
                        <span className="block text-[10px] font-black text-emerald-400 uppercase mb-2 tracking-widest font-mono">Capital Yield (Interest)</span>
                        <div className="text-4xl font-black text-emerald-600">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className="w-full h-2 bg-gray-100 rounded-full mt-6">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${(result.totalInterest / result.futureValue) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </>
          ) : (
             <div className="h-full border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center p-20 text-center text-gray-200 group">
                <p className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-500">💎</p>
                <p className="font-black text-2xl uppercase tracking-[0.2em] mb-4 text-gray-400">Wealth Architecture</p>
                <p className="max-w-md text-sm text-gray-400 font-medium">Define your inputs to visualize the compounding avalanche that turns consistent labor into generational wealth.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Deep Dive: Advanced Investment Analysis & Projections"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-6">
              The <strong>Investment Calculator</strong> is a sophisticated modeling suite designed for forward-looking capital allocation. Unlike a standard savings tracker, this tool isolates the variables of market returns, time horizons, and contribution frequency to create a high-fidelity simulation of long-term wealth building.
            </p>
            <p className="leading-relaxed mb-6">
              In modern finance, the "Time Value of Money" (TVM) is the most critical concept. It posits that a dollar today is worth more than a dollar tomorrow due to its potential earning capacity. By leveraging this calculator, you are shifting from a passive accumulator of currency to an active architect of assets. You are modeling how consistent "dollar-cost averaging" (DCA) into income-producing vehicles can create a compounding engine that eventually outpaces your primary income.
            </p>
            <p className="leading-relaxed">
              Whether you are projecting the growth of a Roth IRA, a 401(k), or a taxable brokerage account, this tool provides the mathematical clarity needed to set realistic milestones. It serves as a digital roadmap for the "FIRE" (Financial Independence, Retire Early) movement and conventional retirement planning alike.
            </p>
          </>
        }
        comparisonTable={{
          title: "Historically Validated Asset Growth (Nominal Averages)",
          headers: ["Strategy Type", "Historical ROI", "Risk Delta", "Outcome Scenario"],
          rows: [
            ["Treasury Bills (Cash)", "3% - 4%", "Minimal", "Wealth Preservation; barely beats inflation."],
            ["Municipal Bonds", "4% - 5.5%", "Low", "Stable income; tax-efficient in high brackets."],
            ["Global Real Estate", "7% - 8.5%", "Moderate", "Diversified equity; hedge against currency decay."],
            ["Equity Index (S&P 500)", "9.5% - 11%", "High", "Aggressive growth; primary wealth generator."],
            ["Venture/Growth Equity", "15% - 25%", "Ultra-High", "Concentrated bets; potential for outlier returns."],
          ]
        }}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              FV = P(1 + r)^n + PMT[((1 + r)^n - 1) / r]
            </div>
            <p className="text-sm text-slate-500 text-center">
              Future value of investment with regular contributions.
            </p>
          </>
        }
          example={
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl relative">
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">Case Proof</div>
            <h5 className="font-black text-gray-900 uppercase tracking-widest text-sm mb-8">Scenario: The 'Late Starter' vs 'Early Bird'</h5>
            <p className="text-gray-700 mb-8 text-lg">
               Investor A starts with <strong>$5,000</strong> and adds <strong>$300/mo</strong> for <strong>30 years</strong>. Investor B waits 10 years to start, but adds <strong>$800/mo</strong> for <strong>20 years</strong>. At an 8% return:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 bg-blue-50/30 rounded-3xl border border-blue-100">
                <span className="block text-blue-600 font-bold uppercase text-[10px] mb-4">Investor A (30-Year Run)</span>
                <div className="text-5xl font-black text-gray-900 mb-2">$493,542</div>
                <p className="text-xs text-gray-500 font-medium italic">Total Put In: $113,000</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <span className="block text-gray-500 font-bold uppercase text-[10px] mb-4">Investor B (20-Year Run)</span>
                <div className="text-5xl font-black text-gray-400 mb-2">$460,253</div>
                <p className="text-xs text-gray-500 font-medium italic">Total Put In: $192,000</p>
              </div>
            </div>
            <p className="mt-10 text-base text-gray-600 leading-relaxed border-t pt-8">
              <strong>The Verdict:</strong> Even and Investor B put in <strong>$79,000 MORE</strong> of their own money, they still ended up with <strong>$33,000 LESS</strong> than Investor A. This is the "Procrastination Penalty" personified.
            </p>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🏝️</div>
              <h5 className="font-black text-gray-900 mb-4 text-sm uppercase">Retirement Planning</h5>
              <p className="text-sm text-gray-500 leading-relaxed">Determine if your current 401k/IRA contribution levels will fund your target lifestyle at age 65.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🎓</div>
              <h5 className="font-black text-gray-900 mb-4 text-sm uppercase">Education Fund</h5>
              <p className="text-sm text-gray-500 leading-relaxed">Project 529 plan growth across an 18-year horizon to ensure total college tuition coverage.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🏠</div>
              <h5 className="font-black text-gray-900 mb-4 text-sm uppercase">House Downpayment</h5>
              <p className="text-sm text-gray-500 leading-relaxed">Model a 5-year aggressive investment strategy to shorten the time to home ownership.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🔥</div>
              <h5 className="font-black text-gray-900 mb-4 text-sm uppercase">FIRE Milestone</h5>
              <p className="text-sm text-gray-500 leading-relaxed">Calculate the exact monthly contribution needed to retire in your 40s or early 50s.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Compound Interest", definition: "Interest earned on both the principal and the previous interest accumulated." },
          { term: "DCA (Dollar Cost Averaging)", definition: "Investing a fixed amount regularly, regardless of asset price, to reduce volatility impact." },
          { term: "Nominal Return", definition: "The raw percentage growth of an investment before adjusting for inflation or taxes." },
          { term: "Real Return", definition: "The actual growth in purchasing power (Nominal Return minus Inflation)." },
          { term: "Asset Allocation", definition: "The distribution of a portfolio among categories like Stocks, Bonds, and Cash." },
          { term: "Horizon", definition: "The total length of time an investor remains in a position before liquidating." },
          { term: "Liquidity", definition: "How quickly an investment can be converted to cash without losing market value." },
          { term: "Bear Market", definition: "A period where market prices decline by 20% or more from recent highs." },
          { term: "Dividend Reinvestment", definition: "The practice of using stock dividends to immediately buy more shares of the same stock." },
          { term: "Risk Premium", definition: "The additional return an investor requires to take on higher risk over a 'risk-free' rate." },
        ]}
        faqs={[
          {
            question: "Is it better to invest a lump sum or monthly?",
            answer: "Statistically, lump-sum investing wins ~66% of the time because your money is in the market longer. However, monthly investing (DCA) is easier to implement for most earners and reduces the emotional risk of investing right before a market crash."
          },
          {
            question: "How accurate are these projections for the next 20 years?",
            answer: "The projection is a mathematical certainty based on the inputs provided. However, real-world market returns fluctuate year-to-year. The '8%' you see here might be -15% one year and +25% the next. The math works over the 'long term,' not reliably year-to-year."
          },
          {
            question: "What is the 'Rule of 72' in simple terms?",
            answer: "A mental trick to see how fast your money doubles. Divide 72 by your return rate. At 9%, your money doubles every 8 years (72/9=8). At 6%, it doubles every 12 years."
          },
          {
            question: "Should I include my house as an investment in this calculator?",
            answer: "Ideally, no. While your home value grows, you cannot 'sell' your primary residence to pay for groceries without needing a new place to live. Only include assets that produce cash or can be liquidated purely for consumption."
          },
          {
            question: "What is a 'Safe Withdrawal Rate' after my investment grows?",
            answer: "Most planners use the 4% Rule. If your calculator shows you finished with $1,000,000, you can safely withdraw $40,000 a year for 30 years with a high probability of never running out of money."
          }
        ]}
        relatedCalculators={[
          { name: "Compound Interest Calculator", path: "/compound-interest-calculator/", desc: "Focus specifically on the frequency of interest-on-interest accumulation." },
          { name: "ROI Calculator", path: "/roi-calculator/", desc: "Calculate the specialized profit percentage of a completed investment." },
          { name: "Savings Goal Calculator", path: "/savings-goal-calculator/", desc: "Define your target and work backward to find the necessary savings velocity." },
          { name: "Retirement Calculator", path: "/retirement-calculator/", desc: "Advanced modeling for tax brackets, social security, and withdrawal phases." }
        ]}
      />
    </div>
  );
}
