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
    <div className="max-w-5xl mx-auto p-4 md:p-12 bg-white rounded-[3.5rem] shadow-2xl border border-emerald-50">
      <div className="text-center mb-16 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-emerald-950 tracking-tight relative z-10">
          ROI <span className="text-emerald-500 italic">Forecaster</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          The ultimate yardstick for capital efficiency. Measure absolute returns and annualized performance (CAGR) across any asset class.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Input Matrix */}
        <div className="lg:col-span-5 bg-emerald-50/50 p-10 rounded-[3rem] border border-emerald-100 shadow-inner space-y-10">
          <div>
            <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-4">
              Initial Capital Invested ($)
            </label>
            <input
              type="number"
              value={amountInvested}
              onChange={(e) => setAmountInvested(e.target.value)}
              className="w-full rounded-[1.5rem] border-emerald-100 p-5 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-black text-3xl text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-4">
              Final Value / Amount Returned ($)
            </label>
            <input
              type="number"
              value={amountReturned}
              onChange={(e) => setAmountReturned(e.target.value)}
              className="w-full rounded-[1.5rem] border-emerald-100 p-5 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-2xl text-emerald-600"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-4">
              Time Horizon (Total Years)
            </label>
            <input
              type="number"
              step="0.1"
              value={investmentTimeYears}
              onChange={(e) => setInvestmentTimeYears(e.target.value)}
              className="w-full rounded-[1.5rem] border-emerald-100 p-5 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-xl text-slate-700"
            />
            <p className="text-[10px] text-slate-400 mt-3 font-bold italic text-right">Crucial for Annualized ROI (CAGR) accuracy.</p>
          </div>

          <button
            onClick={calculateROI}
            className="w-full bg-emerald-950 text-white font-black py-6 rounded-[2rem] hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-900/20 uppercase tracking-[0.25em] text-xs active:scale-95 flex items-center justify-center gap-3"
          >
            Execute Performance Audit <span>→</span>
          </button>
        </div>

        {/* Analytical Results Grid */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {result !== null ? (
            <>
              <div className="bg-white border-2 border-emerald-50 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -mr-20 -mb-20 blur-2xl"></div>
                <div>
                  <h3 className="text-slate-400 font-black uppercase tracking-widest text-[11px] mb-8 flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-emerald-500"></span> Total Absolute ROI
                  </h3>
                  <div className={`text-7xl lg:text-8xl font-black tabular-nums tracking-tighter ${result.roi >= 0 ? "text-slate-900" : "text-red-600"}`}>
                    {result.roi > 0 && "+"}
                    {result.roi.toLocaleString("en-US", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}%
                  </div>
                </div>
                <div className="mt-12 bg-emerald-900 text-white p-6 rounded-2xl flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Net Capital Gain</span>
                   <span className="text-2xl font-black">${result.netReturn.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                </div>
              </div>

              <div className="bg-emerald-950 text-white rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 grayscale opacity-10 group-hover:opacity-100 transition duration-500">📈</div>
                <div>
                   <h3 className="text-emerald-500 font-black uppercase tracking-widest text-[11px] mb-6">Annualized ROI (CAGR)</h3>
                   <div className="text-5xl font-black text-white tabular-nums tracking-tighter">
                     {result.annualizedRoi.toLocaleString("en-US", {
                       minimumFractionDigits: 2,
                       maximumFractionDigits: 2,
                     })}%
                     <span className="text-xl text-emerald-500 font-bold ml-2">/yr</span>
                   </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                   <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                      This investment grew by an average of <strong>{result.annualizedRoi.toFixed(2)}%</strong> every single year. For context, the S&P 500 historical average is ~10%.
                   </p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center group">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl group-hover:rotate-12 transition-transform duration-700">📊</div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Portfolio Data Requested</h3>
               <p className="text-slate-400 text-sm max-w-xs font-medium leading-relaxed">Input your cost basis and exit value to visualize your real-world alpha generation and capital velocity.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Professional ROI Analysis: Mastering Capital Efficiency and CAGR"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-6">
              The <strong>Return on Investment (ROI) Calculator</strong> is the foundational analytical instrument for assessing the profitability and efficiency of capital allocation. In the simplest terms, ROI measures the magnitude of profit or loss relative to the capital invested. It is the primary metric used by venture capitalists, real estate investors, and corporate finance officers to perform "apples-to-apples" comparisons between vastly different opportunities.
            </p>
            <p className="leading-relaxed mb-6">
              Critical to professional analysis is the distinction between <strong>Nominal Return</strong> and <strong>Annualized ROI (CAGR)</strong>. While a raw percentage tells you how much money you made, it ignores the element of time. An investment that returns 50% in one year is fundamentally superior to one that returns 50% over five years. This calculator provides both figures, allowing you to bridge the gap between simple gains and professional performance tracking.
            </p>
            <p className="leading-relaxed">
              Whether you are evaluating a stock trade, a crypto venture, or a house flip, understanding your ROI is the only way to verify if your strategy is actually generating <strong>Alpha</strong> (outperformance) or if you would have been better served by a passive index fund.
            </p>
          </>
        }
        comparisonTable={{
          title: "Benchmarking Your ROI: Typical Returns by Asset Class",
          headers: ["Asset Category", "Annualized Target", "Risk Profile", "Typical Lead Time"],
          rows: [
            ["Broad Market Index (S&P 500)", "8% - 10%", "Medium-High", "10+ Years"],
            ["Real Estate Rental (Cash Flow)", "6% - 12%", "Medium", "5-7 Years"],
            ["Venture Capital (Early Stage)", "25% - 40%", "Extremely High", "7-10 Years"],
            ["U.S. Treasury Bonds (Safe)", "3% - 5%", "Very Low", "2-20 Years"],
            ["High Yield Savings (Cash)", "0.5% - 4.5%", "Negligible", "Liquid (Daily)"],
          ]
        }}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              ROI = [(Gain - Cost) / Cost] × 100
            </div>
            <p className="text-sm text-slate-500 text-center">
              Net return expressed as a percentage of initial cost.
            </p>
          </>
        }
          example={
          <div className="bg-slate-950 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
             <div className="relative z-10">
                <h5 className="font-black text-emerald-500 uppercase tracking-widest text-[10px] mb-8">Scenario: The 3-Year Growth Play</h5>
                <p className="text-xl font-medium leading-relaxed mb-10 text-slate-300">
                  You invested <strong>$25,000</strong> into a diversified crypto-tech fund. After exactly <strong>36 months (3 years)</strong>, you exited the position with <strong>$44,500</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center">
                      <span className="block text-[10px] font-black text-slate-500 uppercase mb-2">Absolute Gain</span>
                      <div className="text-3xl font-black text-white">+$19,500</div>
                   </div>
                   <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center">
                      <span className="block text-[10px] font-black text-slate-500 uppercase mb-2">Total ROI</span>
                      <div className="text-3xl font-black text-emerald-500">78.00%</div>
                   </div>
                   <div className="p-8 bg-emerald-600 rounded-3xl text-center shadow-lg">
                      <span className="block text-[10px] font-black text-emerald-100 uppercase mb-2 text-center">CAGR (Annualized)</span>
                      <div className="text-3xl font-black text-white">21.19%</div>
                   </div>
                </div>
                <p className="mt-10 text-slate-500 text-xs italic font-medium leading-relaxed">
                   Analysis: While 78% is the headline number, the 21.19% Annualized ROI is what professional managers look at. It indicates that you doubled the typical stock market return every year for three years.
                </p>
             </div>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: "🏛️", title: "Real Estate", text: "Evaluate house flips or rental yield efficiency." },
               { icon: "💹", title: "Stock Options", text: "Track high-velocity returns on derivative strategies." },
               { icon: "📢", title: "Marketing Spend", text: "Measure CAC vs LTV via campaign ROI." },
               { icon: "🎓", title: "Education", text: "Estimate ROI on degree tuition vs. salary lift." }
             ].map((u, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 hover:bg-white hover:shadow-xl hover:border-emerald-200 transition-all duration-500 group">
                   <div className="text-3xl mb-4 group-hover:scale-125 transition duration-500">{u.icon}</div>
                   <h6 className="font-black text-slate-900 mb-2 uppercase text-[10px] tracking-widest">{u.title}</h6>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{u.text}</p>
                </div>
             ))}
          </div>
        }
        glossary={[
          { term: "Alpha", definition: "A measure of the active return on an investment, the performance above a market index benchmark (β)." },
          { term: "Cost Basis", definition: "The original value of an asset for tax purposes, adjusted for splits, dividends, and return of capital distributions." },
          { term: "Unrealized Gain", definition: "A profit that exists on paper resulting from an investment which has not yet been sold for cash." },
          { term: "Holding Period", definition: "The total amount of time an investment is held by an investor, between the purchase and sale." },
          { term: "Hurdle Rate", definition: "The minimum rate of return on a project or investment required by a manager or investor." },
          { term: "Beta (β)", definition: "A measure of an investment's volatility or systemic risk in comparison to the market as a whole." },
          { term: "Realized ROI", definition: "Profit earned from an investment that has been sold and converted to cash." },
          { term: "Soft Costs", definition: "Non-transactional expenses like time, research, and legal overhead that impact true investment efficiency." },
          { term: "Exit Value", definition: "The total price at which an investment is sold, or the projected market value at a future date." },
          { term: "Geometric Return", definition: "The average compound return rate of an investment over multiple periods (CAGR)." },
        ]}
        faqs={[
          {
            question: "What is a 'Good' ROI for an individual investor?",
            answer: "For passive public market investing (stocks/bonds), a 7-10% annualized ROI is considered the gold standard. For active real estate or small business ventures, you should generally target 15-25% to account for the increased labor and risk."
          },
          {
            question: "How do I calculate ROI with dividends?",
            answer: "Add the total cash received from dividends during the hold period to the final sale price (Amount Returned). For example, if you sell for $100 and got $5 in dividends, your returned amount is $105."
          },
          {
            question: "Is ROI the same as Profit Margin?",
            answer: "No. Profit margin measures how much of your revenue you keep on a single sale. ROI measures how much money you made relative to the total capital you put into the project or asset."
          },
          {
            question: "Does this calculator account for compounding?",
            answer: "The 'Total ROI' is a simple percentage. However, the 'Annualized ROI' (CAGR) mathematically treats the return as if it were compounded annually, providing a consistent yearly growth rate."
          },
          {
            question: "What is the 'Rule of 72'?",
            answer: "A quick mental math trick: Divide 72 by your expected Annualized ROI to find how many years it will take for your money to double. (e.g., 72 / 10% = 7.2 years)."
          }
        ]}
        relatedCalculators={[
          { name: "Compound Interest Calculator", path: "/compound-interest-calculator/", desc: "Project how consistent returns turn a small sum into millions over decades." },
          { name: "Investment Calculator", path: "/investment-calculator/", desc: "Model your portfolio growth based on specific ROI and contribution targets." },
          { name: "Inflation Calculator", path: "/inflation-calculator/", desc: "Calculate your 'Real' ROI after accounting for currency devaluation." },
          { name: "Salary Calculator", path: "/salary-calculator/", desc: "Analyze the ROI on your time—calculate your true hourly net rate." }
        ]}
      />
    </div>
  );
}
