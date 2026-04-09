"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import seoData from "@/data/seo-content/official/compound-interest-calculator.json";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7"); // Annual Interest Rate %
  const [years, setYears] = useState("10");

  // Compounding frequency
  const [compoundFreq, setCompoundFreq] = useState("12"); // Monthly

  // Additional Contributions
  const [contribution, setContribution] = useState("500");
  const [contributionFreq, setContributionFreq] = useState("12"); // Monthly
  const [contributionTiming, setContributionTiming] = useState("end"); // end or beginning

  // Result
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(
    null,
  );
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  // Series data for charting (optional conceptual use)
  const [growthData, setGrowthData] = useState<
    { year: number; balance: number; interest: number; contributions: number }[]
  >([]);

  const calculateCompound = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const y = parseFloat(years) || 0;
    const n = parseInt(compoundFreq) || 12; // Compounds per year

    const c = parseFloat(contribution) || 0;
    const f = parseInt(contributionFreq) || 12; // Contributions per year

    if (p < 0 || y <= 0 || r < 0) return;

    let periodBalance = p;
    let periodContribs = p;
    let data = [];

    for (let year = 1; year <= y; year++) {
      for (let month = 1; month <= 12; month++) {
        // Determine if a contribution happens this month
        let contribThisMonth = 0;
        if (c > 0) {
          if (f === 12) contribThisMonth = c; // Monthly
          if (f === 4 && month % 3 === 0) contribThisMonth = c; // Quarterly
          if (f === 2 && month % 6 === 0) contribThisMonth = c; // Semi-annual
          if (f === 1 && month === 12) contribThisMonth = c; // Annual
        }

        if (contributionTiming === "beginning") {
          periodBalance += contribThisMonth;
          periodContribs += contribThisMonth;
        }

        // Determine compounding
        let interestThisMonth = 0;
        if (n === 12) {
          interestThisMonth = periodBalance * (r / 100 / 12);
        } else if (n === 4 && month % 3 === 0) {
          interestThisMonth = periodBalance * (r / 100 / 4);
        } else if (n === 2 && month % 6 === 0) {
          interestThisMonth = periodBalance * (r / 100 / 2);
        } else if (n === 1 && month === 12) {
          interestThisMonth = periodBalance * (r / 100 / 1);
        } else if (n === 365) {
          interestThisMonth = periodBalance * (Math.pow(1 + r / 100 / 365, 365 / 12) - 1);
        }

        periodBalance += interestThisMonth;

        if (contributionTiming === "end") {
          periodBalance += contribThisMonth;
          periodContribs += contribThisMonth;
        }
      }

      data.push({
        year,
        balance: periodBalance,
        interest: periodBalance - periodContribs,
        contributions: periodContribs,
      });
    }

    setFutureValue(periodBalance);
    setTotalContributions(periodContribs);
    setTotalInterest(periodBalance - periodContribs);
    setGrowthData(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-stone-50 rounded-2xl shadow-xl border border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-2">Initial Principal ($)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full rounded-2xl border-stone-200 p-4 text-2xl font-black text-stone-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-2">Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-2xl border-stone-200 p-4 font-bold text-emerald-600 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-2">Years</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full rounded-2xl border-stone-200 p-4 font-bold text-stone-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-2">Monthly Contribution ($)</label>
            <input
              type="number"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="w-full rounded-2xl border-stone-200 p-4 font-black text-blue-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-2">Compounding</label>
              <select
                value={compoundFreq}
                onChange={(e) => setCompoundFreq(e.target.value)}
                className="w-full rounded-2xl border-stone-200 p-4 text-xs font-bold text-stone-700 bg-stone-50"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="365">Daily</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-2">Contribution Freq</label>
              <select
                value={contributionFreq}
                onChange={(e) => setContributionFreq(e.target.value)}
                className="w-full rounded-2xl border-stone-200 p-4 text-xs font-bold text-stone-700 bg-stone-50"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateCompound}
            className="w-full bg-emerald-900 text-white font-black py-5 rounded-2xl hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20 text-lg uppercase tracking-widest active:scale-95"
          >
            Calculate Growth
          </button>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {futureValue !== null ? (
            <>
              <div className="bg-emerald-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-4xl opacity-20 transition group-hover:rotate-12">💰</div>
                <span className="block text-sm font-bold text-emerald-400 uppercase tracking-[0.3em] mb-4">Future Investment Value</span>
                <div className="text-7xl md:text-8xl font-black mb-6 tabular-nums tracking-tighter">
                  ${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="flex items-center gap-2 text-emerald-200/60 font-medium italic text-sm">
                  <span>Based on a {rate}% annual return over {years} years.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Total Contributions</span>
                    <div className="text-4xl font-black text-stone-900">${totalContributions?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full mt-6">
                    <div className="h-full bg-stone-300 rounded-full" style={{ width: `${(totalContributions! / futureValue) * 100}%` }}></div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Interest Earned</span>
                    <div className="text-4xl font-black text-emerald-600">${totalInterest?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full mt-6">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(totalInterest! / futureValue) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full bg-stone-100/50 border-4 border-dashed border-stone-200 rounded-[3rem] flex flex-col items-center justify-center p-20 text-center opacity-40 group">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500">⏳</div>
              <h3 className="text-2xl font-black text-stone-900 uppercase tracking-widest mb-3">Awaiting Variables</h3>
              <p className="max-w-xs text-sm text-stone-500 font-medium">Define your principal, rate, and time horizon to visualize your exponential growth curve.</p>
            </div>
          )}
        </div>
      </div>


      <CalculatorSEO
        title={seoData.title}
        whatIsIt={seoData.whatIsIt}
        formula={seoData.formula}
        example={seoData.example}
        useCases={seoData.useCases}
        faqs={seoData.faqs}
        deepDive={seoData.deepDive}
        glossary={seoData.glossary}
        relatedCalculators={[
          { name: "Investment Calculator", path: "/investment-calculator/", desc: "A broader tool for modeling stock market portfolios with varying risk levels." },
          { name: "Savings Goal Calculator", path: "/savings-goal-calculator/", desc: "Work backwards from your target amount to find the required monthly savings." },
          { name: "Retirement Calculator", path: "/retirement-calculator/", desc: "Advanced tool including social security and safe withdrawal rate modeling." },
          { name: "Inflation Calculator", path: "/inflation-calculator/", desc: "See how much the value of your dollar has changed over historic time periods." }
        ]}
      />

    </div>
  );
}
