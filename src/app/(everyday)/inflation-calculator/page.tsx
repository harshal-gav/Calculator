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
      const purchasingPower = A / Math.pow(1 + r, t);

      setResult({
        futureCost,
        purchasingPower,
        totalIncrease: futureCost - A,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 bg-slate-50 rounded-3xl shadow-2xl border border-slate-200">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-4 text-slate-900 tracking-tight">
          Inflation & Purchasing Power
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          The "Invisible Tax" decoder. Calculate how price increases erode your wealth and project the future cost of today's essentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        {/* Input Panel */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16"></div>
          
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Starting Capital ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-2xl border-slate-200 p-4 shadow-inner focus:ring-4 focus:ring-red-500/10 focus:border-red-500 font-black text-2xl text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Avg. Annual Inflation (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-2xl border-slate-200 p-4 shadow-inner focus:ring-4 focus:ring-red-500/10 focus:border-red-500 font-bold text-xl text-red-600"
            />
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[10px] text-slate-400 font-bold italic">US Historical Avg: ~3.2%</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Horizon (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-2xl border-slate-200 p-4 shadow-inner focus:ring-4 focus:ring-red-500/10 focus:border-red-500 font-bold text-xl text-slate-700"
            />
          </div>

          <button
            onClick={calculateInflation}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest text-xs active:scale-95"
          >
            Measure Erosion
          </button>
        </div>

        {/* Results Screen */}
        <div className="lg:col-span-8">
          {result !== null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm">
                <div>
                   <h3 className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-6">Future Cost Prediction</h3>
                   <div className="text-5xl lg:text-6xl font-black text-slate-900 tabular-nums">
                     $
                     {result.futureCost.toLocaleString("en-US", {
                       minimumFractionDigits: 0,
                       maximumFractionDigits: 0,
                     })}
                   </div>
                </div>
                <div className="bg-red-50 p-4 rounded-2xl mt-8">
                    <p className="text-[10px] font-black text-red-600 uppercase mb-1">Price Delta</p>
                    <span className="text-lg font-bold text-red-700">+{((result.futureCost/parseFloat(amount) - 1) * 100).toFixed(1)}% Cost Hike</span>
                </div>
              </div>

              <div className="bg-slate-950 text-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-transparent opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-10">
                   <h3 className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-6">Real Value (Today's $)</h3>
                   <div className="text-5xl lg:text-6xl font-black text-white tabular-nums">
                     $
                     {result.purchasingPower.toLocaleString("en-US", {
                       minimumFractionDigits: 0,
                       maximumFractionDigits: 0,
                     })}
                   </div>
                </div>
                <div className="relative z-10 border-t border-slate-800 pt-6 mt-8">
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      Your saved <span className="text-white font-bold">${parseFloat(amount).toLocaleString()}</span> effectively becomes <span className="text-red-400 font-bold">${result.purchasingPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> in buying power.
                    </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-white border border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center group">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-6 group-hover:rotate-12 transition-transform duration-500">📉</div>
               <h3 className="text-xl font-black text-slate-900 mb-2">Model Macroeconomic Shifts</h3>
               <p className="text-slate-400 text-sm max-w-xs font-medium leading-relaxed">Input your capital and expected inflation rate to visualize the velocity of purchasing power decay.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="The Ultimate Guide to Inflation & Purchasing Power Economics"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-6">
              The <strong>Inflation Calculator</strong> is a specialized macroeconomic auditing tool designed to quantify the rate at which fiat currency loses its exchange value relative to goods and services. Commonly referred to as the "silent thief" of the financial world, inflation is the process where the general level of prices rises, and consequently, the purchasing power of your money falls.
            </p>
            <p className="leading-relaxed mb-6">
              In an environment of positive inflation, a dollar today is objectively more valuable than a dollar tomorrow. This calculator models that decay across any time horizon, allowing you to project what the "real" value of your savings will be in 10, 20, or 30 years. It serves as a stark reminder that simply "saving" money in cash is often a mathematically losing strategy if those savings are not earning a return that exceeds the Consumer Price Index (CPI).
            </p>
            <p className="leading-relaxed">
              Understanding inflation is paramount for retirement planning, as it dictates the "real wealth" you will possess when you stop earning an active income. This tool provides the clarity needed to adjust your investment targets and lifestyle expectations for the economic realities of the future.
            </p>
          </>
        }
        comparisonTable={{
          title: "Historical Impact of Inflation (The 100-Year Perspective)",
          headers: ["Decade Group", "Avg. Inflation Rate", "Purchasing Power Loss ($10k)", "Economic Context"],
          rows: [
            ["1920s - 1930s", "-1.5% (Deflation)", "+$15,000", "Post-WWI boom followed by Great Depression."],
            ["1940s - 1950s", "4.0%", "-$4,500", "Post-WWII reconstruction and industrial surge."],
            ["1970s - 1980s", "7.1%", "-$1,200", "Stagflation, oil shocks, and high interest rates."],
            ["1990s - 2010s", "2.1%", "-$8,100", "The 'Great Moderation' and tech expansion."],
            ["2020s - Present", "4.5% - 8.0%", "-$6,500", "Supply chain shocks and monetary expansion."],
          ]
        }}
        formula={
          <div className="space-y-8">
            <div>
              <p className="font-bold text-slate-900 mb-4">I. The Future Cost Formula (Standard Compounding)</p>
              <div className="bg-slate-900 text-white p-8 rounded-3xl font-mono text-center text-2xl shadow-xl border border-red-500/20">
                P_future = P_today × (1 + i)ᵗ
              </div>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-4">II. The Purchasing Power Formula (Degradation)</p>
              <div className="bg-slate-950 text-white p-8 rounded-3xl font-mono text-center text-2xl shadow-xl border border-slate-800">
                Value_real = P_today ÷ (1 + i)ᵗ
              </div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-500">
              <li className="p-4 bg-white rounded-xl border border-slate-200">P = Principal Amount</li>
              <li className="p-4 bg-white rounded-xl border border-slate-200">i = Inflation Rate (decimal)</li>
              <li className="p-4 bg-white rounded-xl border border-slate-200">t = Time (Years)</li>
            </ul>
          </div>
        }
        deepDive={
          <div className="space-y-12">
            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6 underline decoration-red-500 decoration-4">The Mechanisms of Price Inflation</h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                Inflation is rarely caused by a single factor. Economists generally group inflation into three distinct categories: <strong>Demand-Pull</strong> (when consumers want more than the economy can produce), <strong>Cost-Push</strong> (when the cost of raw materials or labor rises, forcing companies to raise prices), and <strong>Built-In</strong> (when workers expect higher prices and demand higher wages, creating a self-fulfilling loop).
              </p>
            </section>

            <section className="bg-red-50 border border-red-100 p-10 rounded-[3rem] shadow-inner">
               <h4 className="text-2xl font-black text-red-950 mb-4">Why Modern Governments Target 2% Inflation</h4>
               <p className="text-red-900/80 leading-relaxed">
                 You might wonder why we want inflation at all. Most central banks, like the Federal Reserve, target a 2% inflation rate because it encourages spending. If consumers believe prices will be slightly higher next year, they are incentivized to buy goods and invest their money today. Conversely, <strong>Deflation</strong> (falling prices) is considered more dangerous, as it leads to consumers delaying purchases, causing businesses to shrink and unemployment to rise.
               </p>
            </section>

            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6">Inflation as an Asset Class Filter</h4>
              <p className="text-slate-600 leading-relaxed">
                When inflation is high, not all assets are created equal. Fixed-income assets like bonds suffer because their "fixed" interest payments become worth less in real terms. <strong>Hard Assets</strong> like real estate, gold, and established commodity-producing companies often perform better, as their intrinsic value tends to rise alongside the general price level. This calculator helps you see why your "Real Return" is the only number that truly matters in wealth building.
              </p>
            </section>
          </div>
        }
        example={
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl">
             <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl">1</div>
                <h5 className="font-black text-slate-900 uppercase tracking-widest text-sm">Scenario: The $100 Grocery Habit</h5>
             </div>
             <p className="text-slate-600 mb-8 leading-relaxed">
               If your weekly grocery bill is <strong>$100</strong> today, and we experience a period of <strong>4.5% annual inflation</strong> (similar to the 2021-2023 surge), here is what that exact same basket of milk, bread, and meat will cost you:
             </p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="block text-[10px] font-black text-slate-400 mb-2 uppercase">In 5 Years</span>
                    <div className="text-3xl font-black text-slate-900">$124.62</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="block text-[10px] font-black text-slate-400 mb-2 uppercase">In 10 Years</span>
                    <div className="text-3xl font-black text-slate-900">$155.30</div>
                </div>
                <div className="p-6 bg-red-600 text-white rounded-2xl shadow-lg">
                    <span className="block text-[10px] font-black text-red-200 mb-2 uppercase">In 20 Years</span>
                    <div className="text-3xl font-black">$241.17</div>
                </div>
             </div>
             <p className="mt-8 text-sm text-slate-400 font-medium italic">
                Insight: In 20 years, you will need to spend $2.41 for every $1.00 you spend today just to maintain your current diet.
             </p>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div className="p-8 group hover:bg-white hover:shadow-xl transition-all rounded-[2rem]">
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition">💰</div>
                <h6 className="font-black text-slate-900 mb-4 uppercase text-xs">Retirement Planning</h6>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Estimate what your current 'dream lifestyle' cost will actually be by the time you stop working.</p>
             </div>
             <div className="p-8 group hover:bg-white hover:shadow-xl transition-all rounded-[2rem]">
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition">📈</div>
                <h6 className="font-black text-slate-900 mb-4 uppercase text-xs">Salary Benchmarking</h6>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Verify if your cost-of-living adjustments (COLA) are keeping pace with your regional inflation.</p>
             </div>
             <div className="p-8 group hover:bg-white hover:shadow-xl transition-all rounded-[2rem]">
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition">🏦</div>
                <h6 className="font-black text-slate-900 mb-4 uppercase text-xs">Debt Evaluation</h6>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Understand why inflation benefits debtors (like mortgage holders) as they pay back loans with cheaper dollars.</p>
             </div>
          </div>
        }
        glossary={[
          { term: "CPI (Consumer Price Index)", definition: "The official measure of the average change over time in the prices paid by urban consumers for a market basket of goods and services." },
          { term: "Purchasing Power", definition: "The amount of goods or services that one unit of currency can buy." },
          { term: "Real Interest Rate", definition: "The nominal interest rate minus the rate of inflation." },
          { term: "Nominal Value", definition: "The value of an asset or income in current dollars, without adjusting for price changes." },
          { term: "Hyperinflation", definition: "An extremely rapid and out-of-control inflation, usually exceeding 50% per month." },
          { term: "Deflation", definition: "A general decline in prices across an economy, often associated with severe economic contraction." },
          { term: "Stagflation", definition: "A rare and difficult economic period characterized by both high inflation and stagnant economic growth/high unemployment." },
          { term: "Personal Inflation Rate", definition: "The specific rate of inflation an individual experiences based on their unique spending habits (e.g., high gas usage vs. high healthcare usage)." },
          { term: "Fixed Income", definition: "An investment that yields regular, fixed payments, such as a traditional pension or a corporate bond." },
          { term: "Fiat Currency", definition: "Money that has value because a government maintains its value, rather than being backed by a physical commodity like gold." },
        ]}
        faqs={[
          {
            question: "Is inflation always a bad thing?",
            answer: "For savers holding cash, yes. However, for the economy as a whole, moderate inflation (2%) is considered healthy because it encourages investment and keeps the credit market functioning. It also benefits borrowers (like people with fixed-rate mortgages) because the real value of their debt shrinks over time."
          },
          {
            question: "How can I protect my savings from inflation?",
            answer: "The primary protection is investing in assets that historically appreciate faster than the CPI. This includes broadly diversified stock market index funds, real estate (which allows for rental increases), and TIPS (Treasury Inflation-Protected Securities), which are specifically indexed to inflation."
          },
          {
            question: "What is 'Lifestyle Creep' vs Inflation?",
            answer: "Inflation is the increase in the price of the same goods. Lifestyle Creep is when you choose to buy more expensive goods because your income increased. If your bills went up 10%, but your grocery items are the same, that's inflation. If you started buying organic steak instead of ground beef, that's lifestyle creep."
          },
          {
            question: "Why does the government print money if it causes inflation?",
            answer: "Governments often expand the money supply to stimulate economic growth, provide liquidity during crises, or fund government spending. While this can cause inflation, central banks attempt to balance this against the risk of high unemployment or a deflationary spiral."
          },
          {
            question: "How long does it take for money to lose half its value?",
            answer: "Using the 'Rule of 70', you can estimate this by dividing 70 by the inflation rate. At a 3% inflation rate, your money will lose half its purchasing power in approximately 23.3 years (70 / 3 = 23.3)."
          }
        ]}
        relatedCalculators={[
          { name: "Salary Calculator", path: "/salary-calculator", desc: "Compare your take-home pay across different years to see your real income growth." },
          { name: "Retirement Calculator", path: "/retirement-calculator", desc: "Model your full retirement nest egg with inflation-adjusted withdrawal rates." },
          { name: "Compound Interest Calculator", path: "/compound-interest-calculator", desc: "See how investing your cash can help you stay ahead of the inflation curve." },
          { name: "Mortgage Calculator", path: "/mortgage-calculator", desc: "Understand how fixed-rate debt acts as a hedge against rising prices." }
        ]}
      />
    </div>
  );
}
