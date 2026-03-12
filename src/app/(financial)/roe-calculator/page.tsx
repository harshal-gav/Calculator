"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ROECalculator() {
  const [netIncome, setNetIncome] = useState("500000");
  const [shareholderEquity, setShareholderEquity] = useState("2500000");

  const [result, setResult] = useState<{
    roe: number;
    analysis: string;
  } | null>(null);

  const evaluateROE = (roe: number) => {
    if (roe < 0) return "Negative ROE: The company is operating at a net loss.";
    if (roe < 10)
      return "Below Average: Less efficient at generating profits from equity.";
    if (roe >= 10 && roe <= 15)
      return "Average: Generating decent returns, standard for many industries.";
    if (roe > 15 && roe <= 20)
      return "Good: Efficiently using shareholder capital to generate profits.";
    return "Excellent: Highly efficient capital management or potentially high leverage (debt).";
  };

  const calculate = () => {
    const income = parseFloat(netIncome);
    const equity = parseFloat(shareholderEquity);

    if (isNaN(income) || isNaN(equity) || equity === 0) {
      setResult(null);
      return;
    }

    const roe = (income / equity) * 100;

    setResult({
      roe,
      analysis: evaluateROE(roe),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">📈</span> ROE Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate Return on Equity to evaluate how efficiently a company
          generates profits from shareholder capital.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Net Income (Annual)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-zinc-400 font-bold">
                $
              </span>
              <input
                type="number"
                step="any"
                value={netIncome}
                onChange={(e) => setNetIncome(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold font-mono text-xl transition-all outline-none focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Average Shareholder's Equity
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-zinc-400 font-bold">
                $
              </span>
              <input
                type="number"
                step="any"
                value={shareholderEquity}
                onChange={(e) => setShareholderEquity(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold font-mono text-xl transition-all outline-none focus:ring-4 focus:ring-emerald-100"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
        >
          Calculate ROE
        </button>
      </div>

      {result !== null && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Return on Equity
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-full aspect-square border-4 bg-emerald-900/40 border-emerald-400/30 shadow-inner flex flex-col items-center justify-center">
              <div className="font-bold text-6xl text-emerald-400 text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                {result.roe.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                %
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg z-10 bg-black/40 border border-emerald-500/30 p-6 rounded-xl text-center">
            <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Performance Analysis
            </span>
            <p className="text-emerald-100 font-medium">{result.analysis}</p>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "ROE Calculator",
            operatingSystem: "All",
            applicationCategory: "FinancialApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Return on Equity (ROE) Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Return on Equity (ROE) Calculator</strong> measures
                a corporation's ultimate profitability by revealing exactly how
                much net income they generated using the money invested by their
                shareholders.
              </p>
              <p>
                Think of ROE as the ultimate indicator of "Management
                Efficiency." If you give the CEO of a company $100 in equity,
                what do they do with it? If the company generates $20 in profit
                that year, their ROE is 20%. Highly successful, dominant
                companies like Apple or Microsoft often boast massive ROE
                percentages, meaning they are incredibly efficient at turning
                shareholder cash into compounding profits.
              </p>
            </>
          }
          formula={
            <>
              <p>
                ROE is calculated by dividing annual Net Income by the total
                Shareholder's Equity.
              </p>
              <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-200 text-zinc-900">
                <p>
                  <strong>
                    ROE = (Net Income / Shareholder's Equity) × 100
                  </strong>
                </p>
                <p className="border-t border-zinc-200 pt-3 mt-2 text-sm font-sans text-left text-zinc-700">
                  <strong>Where:</strong>
                  <br />
                  Net Income = The company's total profit after all taxes and
                  expenses (found on the Income Statement).
                  <br />
                  Shareholder's Equity = Total Assets minus Total Liabilities
                  (found on the Balance Sheet).
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's evaluate the management efficiency of a mid-sized retail
                corporation.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                <li>
                  <strong>Variables:</strong> Looking at their annual 10-K
                  report, the company reported exactly <strong>$500,000</strong>{" "}
                  in Net Income. Their total Shareholder's Equity is reported as{" "}
                  <strong>$2,500,000</strong>.
                </li>
                <li>
                  <strong>The Math:</strong> $500,000 / $2,500,000 = 0.20
                </li>
                <li>
                  <strong>Percentage Conversion:</strong> 0.20 × 100 = 20.
                </li>
                <li>
                  <strong>Result:</strong> The company boasts a{" "}
                  <strong>20% ROE</strong>. This means that for every $1 of
                  equity they hold, they generated exactly $0.20 of pure profit
                  this year. This is considered an excellent rate of return in
                  most industries.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Warren Buffett's Moat Strategy:</strong> Legendary value
                investors filter for companies that have maintained a +15% ROE
                consistently for over 10 years. A consistently high ROE strongly
                suggests the company has an unbreakable "economic moat"
                protecting it from competitors.
              </li>
              <li>
                <strong>DuPont Analysis:</strong> Advanced analysts break the
                ROE formula down into three distinct parts (Profit Margin, Asset
                Turnover, and Financial Leverage) to pinpoint exactly{" "}
                <em>why</em> the ROE is going up or down.
              </li>
              <li>
                <strong>Identifying Dangerous Debt:</strong> Because Equity =
                Assets - Liabilities, a company can artificially "juice" their
                ROE by taking on massive amounts of debt (Liabilities) to shrink
                their Equity. If a company has a 40% ROE but a mountain of debt,
                it is a massive red flag.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is a 'Good' ROE?",
              answer:
                "It is highly dependent on the industry. A 10% ROE is incredible for a heavily regulated utility company, but terrible for a nimble software company. As a very rough baseline, the long-term historical average for the S&P 500 is roughly 14%. Consistently beating 15% to 20% is generally considered excellent.",
            },
            {
              question:
                "Why do some mature companies have negative Shareholder Equity?",
              answer:
                "Companies like Home Depot, Starbucks, or McDonald's sometimes aggressively buy back their own stock while simultaneously taking on cheap debt. This can technically push their Shareholder's Equity below zero. In these rare cases, calculating ROE breaks mathematically and provides a meaningless negative percentage, even though the company is highly profitable.",
            },
            {
              question: "How is ROE different from ROA?",
              answer:
                "Return on Assets (ROA) measures profit against the TOTAL assets the company controls (including debt). Return on Equity (ROE) measures profit against ONLY the money that belongs to the shareholders. Therefore, ROE is almost always a higher percentage than ROA because of leverage.",
            },
          ]}
          relatedCalculators={[
            {
              name: "P/E Ratio Calculator",
              path: "/pe-ratio-calculator",
              desc: "Evaluate if a high-ROE stock is currently trading at a fair price.",
            },
            {
              name: "Dividend Yield Calculator",
              path: "/dividend-yield-calculator",
              desc: "See what percentage of those profits are returned directly to you.",
            },
            {
              name: "Leverage Ratio Calculator",
              path: "/leverage-ratio-calculator",
              desc: "Ensure the high ROE is not just a dangerous illusion created by massive debt.",
            },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            }]}
        />
      </div>
    </div>
  );
}
