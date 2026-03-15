"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">📈</span> Compound Interest Calculator
        </h1>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Visualize the magic of compound interest. See how your investments
          grow over time with regular contributions and the power of interest on interest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-l-2xl"></div>

          <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2 mb-4">
            Initial Investment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Starting Balance
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="1000"
                  min="0"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full rounded-xl border-stone-300 pl-8 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Time Span
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="100"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full rounded-xl border-stone-300 p-3 pr-16 shadow-sm focus:border-emerald-500 font-bold text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-bold text-sm">
                  Years
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2 mt-8 mb-4">
            Interest Rate
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Annual Return
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full rounded-xl border-stone-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg text-emerald-800 bg-emerald-50/50"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-600 font-bold text-lg">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Compounding
              </label>
              <select
                value={compoundFreq}
                onChange={(e) => setCompoundFreq(e.target.value)}
                className="w-full rounded-xl border-stone-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-[15px] bg-white"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="365">Daily</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2 mt-8 mb-4">
            Additional Contributions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  className="w-full rounded-xl border-stone-300 pl-8 p-3 shadow-sm focus:border-emerald-500 font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Frequency
              </label>
              <select
                value={contributionFreq}
                onChange={(e) => setContributionFreq(e.target.value)}
                className="w-full rounded-xl border-stone-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-sm bg-white"
              >
                <option value="12">Monthly</option>
                <option value="4">Quarterly</option>
                <option value="2">Semi-Annually</option>
                <option value="1">Annually</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Timing
              </label>
              <select
                value={contributionTiming}
                onChange={(e) => setContributionTiming(e.target.value)}
                className="w-full rounded-xl border-stone-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-sm bg-white"
              >
                <option value="end">End</option>
                <option value="beginning">Start</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateCompound}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm mt-8"
          >
            Calculate Growth
          </button>
        </div>

        <div className="lg:col-span-2">
          {futureValue !== null ? (
            <div className="h-full bg-emerald-950 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-white border border-emerald-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

              <div className="relative z-10 w-full text-center">
                <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-4">
                  Estimated Future Value
                </h2>

                <div className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg">
                  $
                  {futureValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <p className="text-emerald-400 text-sm font-semibold mb-8 border-b border-emerald-800/50 pb-8">
                  Projected in {years} years
                </p>

                <div className="space-y-4 w-full">
                  <div className="flex justify-between items-center text-sm mb-1 px-2">
                    <span className="text-zinc-300">Total Contributions</span>
                    <span className="font-bold font-mono text-white">
                      $
                      {(totalContributions || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-4 px-2">
                    <span className="text-emerald-300">
                      Total Interest Earned
                    </span>
                    <span className="font-bold font-mono text-emerald-400">
                      $
                      {(totalInterest || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="h-4 w-full rounded-full flex overflow-hidden bg-stone-800">
                    <div
                      className="h-full bg-stone-500"
                      style={{
                        width: `${((totalContributions || 0) / futureValue) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="h-full bg-emerald-500"
                      style={{
                        width: `${((totalInterest || 0) / futureValue) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 pt-1">
                    <span>Principal</span>
                    <span className="text-emerald-500">Interest</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 flex flex-col items-center justify-center p-8 text-center text-emerald-600">
              <span className="text-6xl mb-4 opacity-50 grayscale pt-6">
                🌱
              </span>
              <h3 className="font-bold text-xl mb-2 text-emerald-800">
                Unlock Exponential Growth
              </h3>
              <p className="text-sm font-medium opacity-80">
                Enter your details to see how compounding transforms consistent savings into a substantial nest egg.
              </p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Comprehensive Guide to Compound Interest"
        whatIsIt={
          <>
            <p>
              Compound interest is essentially "interest on interest." It is the result of reinvesting interest rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest. This mathematical phenomenon creates an exponential growth curve, which is why it's the cornerstone of long-term wealth building.
            </p>
            <p>
              While simple interest remains constant, calculated only on the original principal, compound interest accelerates. The more frequent the compounding—whether daily, monthly, or annually—the more rapidly the investment grows. Our calculator is designed to help you simulate various scenarios, incorporating regular contributions to show the full potential of your financial strategy.
            </p>
            <p>
              Understanding the math behind compounding is crucial for anyone looking to save for retirement, buy a home, or build a college fund. It turns time into an asset, allowing even modest sums to grow into significant capital given enough duration.
            </p>
          </>
        }
        comparisonTable={{
          title: "The Impact of Time on $10,000 (at 8% return)",
          headers: ["Time Horizon", "Total Contributions", "Final Balance", "Interest as % of Total"],
          rows: [
            ["10 Years", "$10,000", "$21,589", "53.7%"],
            ["20 Years", "$10,000", "$46,610", "78.5%"],
            ["30 Years", "$10,000", "$100,626", "90.1%"],
            ["40 Years", "$10,000", "$217,245", "95.4%"],
            ["50 Years", "$10,000", "$469,016", "97.9%"],
          ]
        }}
        formula={
          <div className="space-y-6">
            <p>
              The basic formula for compound interest, without periodic contributions, is:
            </p>
            <div className="bg-stone-900 text-white p-6 rounded-2xl font-mono text-center text-2xl border border-emerald-500/30 my-6">
              A = P(1 + r/n)ⁿᵗ
            </div>
            <p>Where:</p>
            <ul className="list-disc pl-8 space-y-2 text-stone-700">
              <li><strong>A</strong> = the future value of the investment/loan, including interest</li>
              <li><strong>P</strong> = the principal investment amount (the initial deposit)</li>
              <li><strong>r</strong> = the annual interest rate (decimal)</li>
              <li><strong>n</strong> = the number of times that interest is compounded per unit t</li>
              <li><strong>t</strong> = the time the money is invested or borrowed for</li>
            </ul>
            <p>
              When you add regular monthly contributions, the formula becomes significantly more complex as it incorporates the future value of an ordinary annuity. Our calculator handles this summation automatically, providing precise results for any frequency you select.
            </p>
          </div>
        }
        deepDive={
          <>
            <h4 className="text-2xl font-black text-emerald-950 mb-6">Strategy 1: Starting Early (The Time Advantage)</h4>
            <p>
              The single most important factor in compounding is not the interest rate, but time. A 20-year-old who invests $200 a month until age 30 and then stops will often end up with more money at age 65 than someone who starts at age 30 and invests $200 a month for the next 35 years. This "head start" allows the interest to generate its own interest for an extra decade, creating a lead that is nearly impossible to catch.
            </p>

            <h4 className="text-2xl font-black text-emerald-950 mt-12 mb-6">Strategy 2: The Power of 'End vs. Start' Timing</h4>
            <p>
              Our calculator allows you to choose if you contribute at the 'Beginning' or 'End' of a compounding period. While it seems minor, contributing at the beginning of the month gives that specific deposit 30 extra days of compounding every single month. Over 30 years, this small change can result in a difference of thousands of dollars in your final nest egg.
            </p>

            <h4 className="text-2xl font-black text-emerald-950 mt-12 mb-6">Strategy 3: Managing Compounding Frequency</h4>
            <p>
              Banks and credit card companies often use daily compounding to maximize the amount of interest they collect. For investors, seeking accounts that compound monthly or daily (like some high-yield savings accounts) provides a marginal but meaningful boost over annual compounding. Our tool lets you toggle between these frequencies to see exactly how many extra dollars "Interest on Interest" generates in each scenario.
            </p>

            <h4 className="text-2xl font-black text-emerald-950 mt-12 mb-6">Strategy 4: The Impact of Taxes and Inflation</h4>
            <p>
              In the real world, you must account for "Real Rate of Return." If your investment grows at 7% but inflation is 3%, your actual purchasing power only grows by 4%. Additionally, if your money is in a taxable account, you must subtract taxes from your annual gains. This is why tax-advantaged accounts like IRAs and 401(k)s are so popular—they allow your money to compound without the friction of annual taxation.
            </p>
          </>
        }
        example={
          <div className="space-y-6">
            <p className="font-bold text-emerald-900 uppercase tracking-widest text-xs mb-4">Case Study: The Coffee Fund</p>
            <p>
              Imagine if instead of spending <strong>$5.00 a day</strong> on a premium coffee, you invested that <strong>$150.00 per month</strong> into a low-cost index fund averaging <strong>10% annual return</strong>.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-stone-600">Monthly Contribution:</span>
                  <span className="font-bold">$150.00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-stone-600">Duration:</span>
                  <span className="font-bold">35 Years</span>
                </li>
                <li className="flex justify-between border-t border-stone-100 pt-4">
                  <span className="text-emerald-900 font-bold">Total Interest Earned:</span>
                  <span className="text-emerald-600 font-black">$439,000+</span>
                </li>
                <li className="flex justify-between text-xl pt-2">
                  <span className="text-emerald-950 font-black">Final Wealth:</span>
                  <span className="text-emerald-700 font-black">$502,000+</span>
                </li>
              </ul>
            </div>
            <p className="text-sm italic text-stone-500 mt-6">
              Result: By sacrificing one daily luxury, you could retire with over half a million dollars. Note that only $63,000 of that came from your actual pockets; the other $439,000 was the "work" performed by compound interest.
            </p>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition">
              <h5 className="font-bold text-emerald-900 mb-3 uppercase text-xs tracking-widest">Retirement Modeling</h5>
              <p className="text-sm text-stone-600 leading-relaxed">Project how your current savings rate and expected stock market returns will translate into a monthly income stream during retirement.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition">
              <h5 className="font-bold text-emerald-900 mb-3 uppercase text-xs tracking-widest">Education Funds</h5>
              <p className="text-sm text-stone-600 leading-relaxed">Calculate the growth of 529 plans or other college savings vehicles to ensure tuition costs are covered by the time your child is 18.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition">
              <h5 className="font-bold text-emerald-900 mb-3 uppercase text-xs tracking-widest">Debt Reduction</h5>
              <p className="text-sm text-stone-600 leading-relaxed">See how compounding works against you in credit card debt and model how extra payments can 'reverse' the curve to save interest.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Principal", definition: "The original sum of money invested or borrowed, before any interest or additions." },
          { term: "APY", definition: "Annual Percentage Yield—the effective annual rate taking compounding into account." },
          { term: "Future Value (FV)", definition: "The value of a current asset at a specified date in the future based on an assumed rate of growth." },
          { term: "Nominal Rate", definition: "The stated interest rate of an investment, not reflecting compounding or inflation." },
          { term: "Real Rate", definition: "The rate of return after adjusting for the effects of inflation." },
          { term: "Annuity", definition: "A series of equal payments made at regular intervals (like your monthly contributions)." },
          { term: "Rule of 72", definition: "A quick way to estimate how long it takes for a sum to double: 72 divided by the interest rate." },
          { term: "Time Horizon", definition: "The total length of time an investor expects to hold an investment." },
          { term: "Volatility", definition: "The magnitude of price fluctuations in an investment over time." },
          { term: "Liquidity", definition: "How easily an asset can be converted into cash without significant loss in value." },
        ]}
        faqs={[
          {
            question: "What is the 'Rule of 72' exactly?",
            answer: "The Rule of 72 is a mental shortcut to estimate the doubling time of an investment. If your interest rate is 7%, you divide 72 by 7 to get ~10.2 years. This is a remarkably accurate approximation of the compound interest formula for standard growth rates."
          },
          {
            question: "Is compounding interest different from simple interest?",
            answer: "Yes. Simple interest is only calculated on the principal. If you have $1,000 at 10% simple interest, you earn $100 every year forever. With compound interest, the first year you earn $100, the second year you earn $110 (10% of $1,100), and so on."
          },
          {
            question: "How does inflation affect these numbers?",
            answer: "Inflation reduces the 'Purchasing Power' of your future money. While your calculator might show you have $1 million in 30 years, that $1 million might only buy what $500,000 buys today. Always use a 'Real Return' by subtracting inflation (~3%) for more realistic planning."
          },
          {
            question: "Which is better: Daily or Monthly compounding?",
            answer: "Daily compounding is slightly better for savers (it builds faster) and slightly worse for borrowers (it costs more). However, for most long-term investments, the difference between daily and monthly is less than 0.1% in final results."
          },
          {
            question: "What interest rate should I use for retirement projections?",
            answer: "The S&P 500 has historically returned about 10% annually before inflation. Most financial planners recommend using 6-7% for a more conservative and realistic 'real world' projection after accounting for fees and inflation."
          }
        ]}
        relatedCalculators={[
          { name: "Investment Calculator", path: "/investment-calculator", desc: "A broader tool for modeling stock market portfolios with varying risk levels." },
          { name: "Savings Goal Calculator", path: "/savings-goal-calculator", desc: "Work backwards from your target amount to find the required monthly savings." },
          { name: "Retirement Calculator", path: "/retirement-calculator", desc: "Advanced tool including social security and safe withdrawal rate modeling." },
          { name: "Inflation Calculator", path: "/inflation-calculator", desc: "See how much the value of your dollar has changed over historic time periods." }
        ]}
      />
    </div>
  );
}
