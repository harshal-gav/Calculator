"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DividendYieldCalculator() {
  const [annualDividend, setAnnualDividend] = useState("2.50");
  const [stockPrice, setStockPrice] = useState("50.00");

  const [result, setResult] = useState<{
    yieldPercent: number;
    yieldMsg: string;
    investmentExample: number;
    payoutRatio: number;
  } | null>(null);

  const evaluateYield = (y: number) => {
    if (y === 0)
      return "No Dividend: This company does not currently pay a dividend, focusing on growth or recovering from losses.";
    if (y < 2)
      return "Low Yield: Common for high-growth tech firms (like Apple or Microsoft) that prioritize reinvesting profits.";
    if (y >= 2 && y <= 5)
      return "Healthy Yield: The 'sweet spot' for blue-chip companies; historically sustainable and stable.";
    if (y > 5 && y <= 8)
      return "High Yield: Attractive for income, but often found in heavy industries, utilities, or REITs.";
    return "Ultra-High Yield: Warning. This could indicate a 'Yield Trap' where the stock price has crashed, suggesting a possible dividend cut.";
  };

  const calculate = () => {
    const div = parseFloat(annualDividend);
    const price = parseFloat(stockPrice);

    if (isNaN(div) || isNaN(price) || price === 0) {
      setResult(null);
      return;
    }

    const y = (div / price) * 100;
    const income = (10000 / price) * div;

    setResult({
      yieldPercent: y,
      yieldMsg: evaluateYield(y),
      investmentExample: income,
      payoutRatio: 50, // Conceptual placeholder for the detailed content
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-neutral-50 rounded-2xl shadow-xl border border-neutral-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 font-serif tracking-tight">
          💵 Dividend Yield Master Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto italic">
          Valuate stock income. Compare yields across sectors and find sustainable cash flow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input UI */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-neutral-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3">Annual Dividend Per Share ($)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 font-black">$</span>
                <input 
                  type="number" 
                  step="0.01" 
                  value={annualDividend} 
                  onChange={(e) => setAnnualDividend(e.target.value)} 
                  className="w-full rounded-2xl border-neutral-100 bg-neutral-50/50 p-5 pl-10 font-black text-2xl text-emerald-900 focus:ring-4 focus:ring-emerald-100 focus:bg-white transition-all shadow-inner" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3">Current Stock Price ($)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 font-black">$</span>
                <input 
                  type="number" 
                  step="0.01" 
                  value={stockPrice} 
                  onChange={(e) => setStockPrice(e.target.value)} 
                  className="w-full rounded-2xl border-neutral-100 bg-neutral-50/50 p-5 pl-10 font-black text-2xl text-slate-800 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all shadow-inner" 
                />
              </div>
            </div>
          </div>

          <button onClick={calculate} className="w-full bg-emerald-600 text-white font-black py-6 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 text-sm uppercase tracking-[0.3em] mt-10 hover:scale-[1.01] active:scale-95">
            Calculate Yield
          </button>
        </div>

        {/* Output UI */}
        <div className="lg:col-span-12 xl:col-span-7">
          {result !== null ? (
            <div className="bg-slate-900 rounded-[3rem] h-full p-8 md:p-12 text-white relative shadow-2xl overflow-hidden border border-slate-800">
               <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
               
               <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="mb-8">
                    <span className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">Calculated Yield</span>
                  </div>

                  <div className="text-8xl md:text-9xl font-black mb-10 tracking-tighter tabular-nums drop-shadow-[0_10px_10px_rgba(16,185,129,0.3)]">
                    {result.yieldPercent.toLocaleString(undefined, { maximumFractionDigits: 2 })}<span className="text-emerald-500">%</span>
                  </div>

                  <div className="w-full bg-black/30 backdrop-blur-md rounded-3xl p-6 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">Market Analysis</span>
                      <span className="text-emerald-400 font-black bg-emerald-500/10 px-3 py-1 rounded-lg">{result.yieldMsg.split(':')[0]}</span>
                    </div>
                    <p className="text-slate-300 text-xs italic leading-relaxed pt-2 border-t border-white/5">{result.yieldMsg.split(':')[1]}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-4 w-full text-center">
                    <div className="p-4 bg-emerald-900/20 rounded-2xl border border-emerald-500/10">
                      <span className="block text-[8px] text-emerald-300 font-black uppercase mb-1">Portfolio Projection</span>
                      <span className="text-lg font-bold">Invest $10k Earn <span className="text-emerald-400">${result.investmentExample.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>/yr</span>
                    </div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-full bg-emerald-50 border-4 border-double border-emerald-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center text-emerald-200 group transition-all duration-500">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-5xl">💶</span>
              </div>
              <h3 className="text-emerald-900 font-black text-2xl mb-2">Passive Income Matrix</h3>
              <p className="max-w-xs text-sm text-emerald-600/60 font-medium">Input any ticker's dividend and price to see its exact yield and income potential across different investment tiers.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="High-Yield Dividend Strategy: The Investor's Guide to Cash Flow Analysis"
        whatIsIt={
          <div className="space-y-6">
            <p className="text-xl font-medium leading-relaxed">
              A <strong>Dividend Yield Calculator</strong> is a fundamental technical indicator used by income investors to evaluate the "cash-on-cash" return of a stock investment relative to its current market price. While growth investors focus on capital appreciation (stock price increases), dividend investors focus on the distribution of corporate profits directly to shareholders.
            </p>
            <p className="leading-relaxed">
              The dividend yield is essentially the interest rate on your stock. It allows for an apples-to-apples comparison between disparate asset classes; for instance, comparing a 4.5% yield on a utility stock to a 5.0% yield on a high-yield savings account or a 3.5% yield on a corporate bond. It is the core metric for those seeking <strong>Financial Independence, Retire Early (FIRE)</strong>, as it determines exactly how much capital is required to replace a labor-based salary with passive cash flow.
            </p>
            <p className="leading-relaxed">
               However, dividend yield is a dynamic number. Because the denominator (stock price) changes every second the market is open, the yield is constantly in flux. Our calculator provides a "point-in-time" snapshot, helping you identify if a recent stock price drop has pushed a favorite company into "Value Territory" or if a skyrocketing price has made the yield too low for your income needs.
            </p>
          </div>
        }
        comparisonTable={{
          title: "S&P 500 Sector Average Yields (Market Benchmarks)",
          headers: ["Sector", "Avg. Dividend Yield", "Primary Characteristic"],
          rows: [
            ["Information Technology", "0.7% - 1.2%", "Growth-focused, low payout."],
            ["Utilities", "3.1% - 4.5%", "Stable, regulated, high payout."],
            ["Financials", "2.2% - 3.4%", "Cyclical, consistent payers."],
            ["Real Estate (REITs)", "3.8% - 6.5%", "Income-mandated by law."],
            ["Energy", "3.0% - 5.1%", "High cash flow, commodity-linked."],
            ["Consumer Staples", "2.1% - 3.2%", "Defensive, reliable income."],
          ]
        }}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Dividend Yield Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Dividend Yield results.
            </p>
          </>
        }
          example={
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-200">
             <h5 className="font-black text-emerald-900 uppercase tracking-widest text-[10px] mb-8">Scenario: Comparative Yield Analysis</h5>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-r-0 md:border-r border-neutral-100 pr-0 md:pr-8">
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase mb-4 tracking-tighter">Growth Stock (e.g. NVIDIA)</span>
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-sm">Price: $900</span>
                     <span className="text-sm font-bold">$0.16 Div</span>
                  </div>
                  <div className="text-3xl font-black text-slate-400">0.02% Yield</div>
                  <p className="text-[10px] mt-4 text-neutral-500">Capital is reinvested into AI chips rather than paid to you.</p>
                </div>
                <div className="pl-0 md:pl-8">
                  <span className="block text-[10px] font-bold text-emerald-600 uppercase mb-4 tracking-tighter">Income Stock (e.g. Realty Income)</span>
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-sm">Price: $52</span>
                     <span className="text-sm font-bold">$3.08 Div</span>
                  </div>
                  <div className="text-3xl font-black text-emerald-600">5.92% Yield</div>
                  <p className="text-[10px] mt-4 text-emerald-500">90% of taxable income is mandated to be paid to you monthly.</p>
                </div>
             </div>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
               <h6 className="font-black text-emerald-900 text-[10px] uppercase mb-3">Retirement Sizing</h6>
               <p className="text-xs text-emerald-800 leading-relaxed">Calculate if your $1M portfolio yielding 4% ($40k/yr) is enough to cover your basic living expenses without selling shares.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
               <h6 className="font-black text-slate-900 text-[10px] uppercase mb-3">Dividend Reinvestment (DRIP)</h6>
               <p className="text-xs text-slate-600 leading-relaxed">Determine how many "free shares" you will earn each year by reinvesting dividends back into the stock at the current yield.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
               <h6 className="font-black text-slate-900 text-[10px] uppercase mb-3">Bond Parity Checks</h6>
               <p className="text-xs text-slate-600 leading-relaxed">Compare the yield of a "Dividend King" stock to current 10-year Treasury yields to see which provides better risk-adjusted income.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Dividend Yield", definition: "The ratio of a company's annual dividend compared to its share price." },
          { term: "Dividend Aristocrat", definition: "An S&P 500 company that has increased its dividend payout for at least 25 consecutive years." },
          { term: "Payout Ratio", definition: "The percentage of a company's net income paid out as dividends to shareholders." },
          { term: "Ex-Dividend Date", definition: "The date by which you must own the stock to be eligible for the next dividend payment." },
          { term: "DRIP", definition: "Dividend Reinvestment Plan; an arrangement where dividends are automatically used to buy more shares." },
          { term: "Yield Trap", definition: "A high-yielding stock where the yield is high only because the stock price has fallen drastically due to poor fundamentals." },
          { term: "Special Dividend", definition: "A non-recurring one-time payment made by a company to its shareholders, often after a record-breaking year." },
          { term: "REIT", definition: "Real Estate Investment Trust; a company that owns or finances income-producing real estate and must pay out 90% of profits." },
          { term: "Dividend Growth", definition: "The annual percentage increase in the dividend payment amount." },
          { term: "Qualified Dividend", definition: "A dividend that meets specific IRS criteria to be taxed at the lower capital gains rate." },
        ]}
        faqs={[
          {
            question: "Is a higher dividend yield always better?",
            answer: "No. Very high yields (8%+) are often unsustainable and may precede a dividend cut. A moderate, growing dividend is usually better for long-term total return."
          },
          {
            question: "Do I lose the dividend if I sell the stock?",
            answer: "If you sell after the 'Ex-Dividend' date, you still receive the upcoming dividend even if you no longer own the stock on the payout date."
          },
          {
            question: "Why don't all companies pay dividends?",
            answer: "Growth companies (like Tesla) believe they can create more value for shareholders by reinvesting all profits back into the business rather than paying them out as cash."
          },
          {
            question: "How is dividend yield different from the interest on a bond?",
            answer: "Bond interest is high-priority and legally mandated; if not paid, the company is in default. Dividends are discretionary and can be cut by the board of directors at any time."
          },
          {
            question: "What is the 'Rule of 4%' in dividend investing?",
            answer: "It is a guideline used in retirement planning suggesting that if your portfolio yields 4%, you can live off the income without ever touching the principal investment."
          },
          {
            question: "Can dividend yield be negative?",
            answer: "No. A company either pays a dividend (positive yield) or it doesn't (0% yield). You cannot be charged a dividend for owning a stock."
          }
        ]}
        relatedCalculators={[
          {
            name: "Investment Calculator",
            path: "/investment-calculator/",
            desc: "Project the long-term compounding growth of your reinvested dividends.",
          },
          {
            name: "ROI Calculator",
            path: "/roi-calculator/",
            desc: "Calculate your total return including both stock appreciation and dividends.",
          },
          {
            name: "Net Worth Calculator",
            path: "/net-worth-calculator/",
            desc: "Track your total asset growth over time.",
          },
          {
            name: "Savings Goal Calculator",
            path: "/savings-goal-calculator/",
            desc: "Figure out how much to save to hit a target income goal.",
          }
        ]}
      />
    </div>
  );
}
