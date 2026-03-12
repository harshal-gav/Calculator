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
  } | null>(null);

  const evaluateYield = (y: number) => {
    if (y === 0)
      return "No Dividend: This company does not currently pay a dividend.";
    if (y < 2)
      return "Low Yield: Typical for growth-oriented companies that reinvest profits.";
    if (y >= 2 && y <= 6)
      return "Moderate Yield: Common for established, stable companies.";
    if (y > 6 && y <= 10)
      return "High Yield: Attractive for income investors, but may carry higher risk.";
    return "Very High Yield: Proceed with caution. Extremely high yields can sometimes indicate a dividend cut is imminent or the stock price has dropped significantly due to underlying issues.";
  };

  const calculate = () => {
    const div = parseFloat(annualDividend);
    const price = parseFloat(stockPrice);

    if (isNaN(div) || isNaN(price) || price === 0) {
      setResult(null);
      return;
    }

    const y = (div / price) * 100;

    // Example: If I invest $10,000, what is my annual income?
    const income = (10000 / price) * div;

    setResult({
      yieldPercent: y,
      yieldMsg: evaluateYield(y),
      investmentExample: income,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">💵</span> Dividend Yield
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the dividend yield of a stock to evaluate its annual return
          on investment from dividends alone.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Annual Dividend Per Share
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-zinc-400 font-bold">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={annualDividend}
                onChange={(e) => setAnnualDividend(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 font-bold font-mono text-xl transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Current Stock Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-zinc-400 font-bold">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={stockPrice}
                onChange={(e) => setStockPrice(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 font-bold font-mono text-xl transition-all"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Yield
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Dividend Yield Result
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-full aspect-square border-4 bg-emerald-900/40 border-emerald-400/30 shadow-inner flex flex-col items-center justify-center">
              <div className="font-bold text-6xl text-white text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                {result.yieldPercent.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                %
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl z-10 flex flex-col gap-6 ">
            <div className="bg-black/40 border border-emerald-500/30 p-6 rounded-xl text-center">
              <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                Yield Analysis
              </span>
              <p className="text-emerald-100 font-medium">{result.yieldMsg}</p>
            </div>

            <div className="bg-emerald-900/30 border border-emerald-500/20 p-6 rounded-xl text-center">
              <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Perspective
              </span>
              <div className="text-white/80">
                If you invested{" "}
                <strong className="text-emerald-400 font-mono">$10,000</strong>{" "}
                today, you would receive approximately{" "}
                <strong className="text-emerald-400 font-mono text-xl">
                  $
                  {result.investmentExample.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </strong>{" "}
                per year in dividend income.
              </div>
            </div>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Dividend Yield Calculator",
            operatingSystem: "All",
            applicationCategory: "FinancialApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Dividend Yield Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Dividend Yield Calculator</strong> measures exactly
                how much "cash flow" you receive for every dollar you invest in
                a specific stock. While stock prices constantly fluctuate up and
                down, a dividend is a hard, cash payment deposited directly into
                your brokerage account by the company, simply as a reward for
                owning their shares.
              </p>
              <p>
                The <em>yield</em> is expressed as a percentage. It tells you
                exactly what your annual return on investment (ROI) will be from
                dividends alone, completely ignoring whether the stock price
                goes up or down. Income investors rely heavily on this metric to
                build portfolios that pay their living expenses.
              </p>
            </>
          }
          formula={
            <>
              <p>
                To calculate the yield, you simply divide the company's total
                annual dividend payout by its current stock price.
              </p>
              <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-200 text-zinc-900">
                <p>
                  <strong>Dividend Yield</strong> = (Annual Dividend / Stock
                  Price) × 100
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's look at a classic blue-chip dividend stock. Assume the
                company pays a <strong>$2.50 annual dividend</strong> per share,
                and the stock is currently trading for exactly{" "}
                <strong>$50.00</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                <li>
                  <strong>Step 1 (The Math):</strong> $2.50 ÷ $50.00 = 0.05.
                </li>
                <li>
                  <strong>Step 2 (Formatting):</strong> 0.05 × 100 = 5%.
                </li>
                <li>
                  <strong>Result:</strong> The stock has a{" "}
                  <strong>5.00% Dividend Yield</strong>.
                </li>
                <li>
                  <strong>Meaning:</strong> If you buy $10,000 worth of this
                  stock today, you are guaranteed roughly $500 in pure cash
                  income this year, regardless of what the stock market does.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Passive Income Planning:</strong> Calculating exactly
                how large your portfolio needs to be to generate enough dividend
                cash flow to completely cover your monthly rent or mortgage
                payment.
              </li>
              <li>
                <strong>Comparing Investments:</strong> Deciding whether to put
                $50,000 into a risky 6% yielding stock, or a perfectly safe 4.5%
                yielding high-yield savings account (HYSA).
              </li>
              <li>
                <strong>Evaluating "Yield Traps":</strong> A stock might have a
                massive 15% yield. However, if the stock price recently crashed
                from $100 down to $10, the mathematical yield temporarily spikes
                to 15% right before the company goes bankrupt and cuts the
                dividend entirely.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is a 'Good' Dividend Yield?",
              answer:
                "Generally, a yield between 2% and 6% is considered healthy and sustainable. Anything below 2% is typical for massive tech companies (like Apple or Microsoft) that prefer to use their cash to grow the company rather than pay shareholders. Anything above 8% is highly risky and often unsustainable.",
            },
            {
              question: "How often are dividends paid?",
              answer:
                "In the United States, the vast majority of companies pay dividends quarterly (every 3 months). If a company has a $4.00 annual dividend, you will receive a $1.00 cash deposit into your account four times a year.",
            },
            {
              question: "Why does the yield change every day?",
              answer:
                "Because the stock price changes every day. If a company pays a fixed $5 annual dividend, and the stock price crashes from $100 to $50, the yield mathematically instantly skyrockets from 5% to 10%.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Investment Calculator",
              path: "/investment-calculator",
              desc: "Project the long-term compounding growth of your reinvested dividends.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your total return including both stock appreciation and dividends.",
            },
            {
              name: "Net Worth Calculator",
              path: "/net-worth-calculator",
              desc: "Track your total asset growth over time.",
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
