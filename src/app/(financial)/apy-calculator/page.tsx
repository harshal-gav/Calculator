"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function APYCalculator() {
  const [rate, setRate] = useState("5.0");
  const [compoundingFreq, setCompoundingFreq] = useState("12"); // Monthly default

  const [result, setResult] = useState<{
    apy: number;
    rate: number;
  } | null>(null);

  const calculate = () => {
    const r = parseFloat(rate) / 100;
    const n = parseInt(compoundingFreq, 10);

    if (isNaN(r) || isNaN(n) || n <= 0) {
      setResult(null);
      return;
    }

    // APY = (1 + r/n)^n - 1
    let apyValue = 0;

    if (n === -1) {
      // Continuous compounding: APY = e^r - 1
      apyValue = Math.exp(r) - 1;
    } else {
      apyValue = Math.pow(1 + r / n, n) - 1;
    }

    setResult({
      apy: apyValue * 100,
      rate: parseFloat(rate),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">🏦</span> APY Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate Annual Percentage Yield (APY) from quoted interest rate and
          compounding frequency.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Nominal Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                min="0"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Compounding Frequency
            </label>
            <select
              value={compoundingFreq}
              onChange={(e) => setCompoundingFreq(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-xl"
            >
              <option value="365">Daily (365/year)</option>
              <option value="52">Weekly (52/year)</option>
              <option value="12">Monthly (12/year)</option>
              <option value="4">Quarterly (4/year)</option>
              <option value="2">Semi-Annually (2/year)</option>
              <option value="1">Annually (1/year)</option>
              <option value="-1">Continuously</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Calculate APY
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 z-10">
            Real Returns
          </h2>
          <p className="text-emerald-200/60 text-sm z-10 mb-6">
            Annual Percentage Yield (APY)
          </p>

          <div className="flex items-baseline bg-emerald-900/60 px-8 py-6 rounded-2xl border border-emerald-500/30 z-10 shadow-inner mb-6">
            <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white">
              {result.apy.toFixed(3)}
            </span>
            <span className="text-3xl font-bold text-emerald-400 ml-2">%</span>
          </div>

          <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center w-full max-w-sm z-10">
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">
              Difference from Nominal
            </span>
            <span className="font-mono text-emerald-100 font-bold text-xl">
              +{Math.max(0, result.apy - result.rate).toFixed(3)}%
            </span>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "APY Calculator",
            operatingSystem: "All",
            applicationCategory: "FinancialApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Annual Percentage Yield (APY) Calculator: Maximize Your Compound Interest"
          whatIsIt={
            <>
              <p className="text-lg leading-relaxed mb-4">
                Our <strong>Annual Percentage Yield (APY) Calculator</strong> is a precise mathematical tool designed to reveal the true rate of return on your savings, CDs, and investment accounts. While a nominal interest rate tells you the "simple" interest earned, the APY factors in the powerful engine of <strong>compounding</strong>—the process where you earn interest on your interest.
              </p>
              <p className="leading-relaxed mb-4">
                In the financial world, there is a distinct bias in how rates are quoted. Lenders (who charge you money) typically quote the <strong>APR</strong> because it looks smaller by ignoring compounding. Banks (who pay you interest) quote the <strong>APY</strong> because it looks larger by including compounding. Our calculator levels the playing field, allowing you to see exactly how much cash will be in your account after 365 days of growth.
              </p>
              <p className="leading-relaxed">
                Whether you are comparing a High-Yield Savings Account (HYSA) with daily compounding versus a traditional savings account with monthly compounding, this tool provides the "apples-to-apples" comparison needed to maximize your wealth.
              </p>
            </>
          }
          comparisonTable={{
            title: "The Power of Compounding: 5.00% Nominal Rate vs. Frequencies",
            headers: ["Compounding Frequency", "Nominal Rate", "Yield Increment", "Effective APY"],
            rows: [
              ["Annually", "5.00%", "+0.000%", "5.000%"],
              ["Semi-Annually", "5.00%", "+0.063%", "5.063%"],
              ["Quarterly", "5.00%", "+0.095%", "5.095%"],
              ["Monthly", "5.00%", "+0.116%", "5.116%"],
              ["Weekly", "5.00%", "+0.125%", "5.125%"],
              ["Daily", "5.00%", "+0.127%", "5.127%"],
              ["Continuously", "5.00%", "+0.127%", "5.127%"],
            ]
          }}
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              APY = (1 + r/nⁿ) - 1
            </div>
            <p className="text-sm text-slate-500 text-center">
              Annualized yield of a compounding interest account.
            </p>
          </>
        }
          example={
            <>
              <p className="mb-4 font-semibold text-emerald-800">Scenario: Daily Compounding vs. Annual Compounding</p>
              <p className="mb-4">
                Let's compare two high-yield savings offers for a $50,000 deposit:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-5 bg-white border-2 border-zinc-100 rounded-xl">
                  <p className="font-bold text-zinc-800">Account A (Traditional Bank)</p>
                  <p className="text-zinc-600 text-sm mb-2">Compounded Annually</p>
                  <p className="text-2xl font-black text-zinc-900">5.00% APY</p>
                  <p className="mt-2 text-zinc-500 font-medium">Earnings: $2,500.00</p>
                </div>
                <div className="p-5 bg-emerald-50 border-2 border-emerald-100 rounded-xl">
                  <p className="font-bold text-emerald-800">Account B (Fintech Disruptor)</p>
                  <p className="text-emerald-600 text-sm mb-2">Compounded Daily</p>
                  <p className="text-2xl font-black text-emerald-900">5.127% APY</p>
                  <p className="mt-2 text-emerald-700 font-medium">Earnings: $2,563.50</p>
                </div>
              </div>
              <p>
                By choosing Account B (Daily Compounding), you earn an extra <strong>$63.50</strong> for absolutely no extra work or risk. Over 10 or 20 years, these fractions of a percent can lead to tens of thousands of dollars in additional wealth.
              </p>
            </>
          }
          useCases={
            <div className="space-y-6 text-zinc-700">
              <div>
                <h4 className="font-bold text-emerald-800 uppercase text-xs tracking-widest mb-1">High-Yield Savings Accounts</h4>
                <p>When shopping for HYSAs, look past the big bold number. If two banks offer 4.5%, check the fine print for compounding. Daily compounding always beats monthly compounding.</p>
              </div>
              <div>
                <h4 className="font-bold text-emerald-800 uppercase text-xs tracking-widest mb-1">Certificates of Deposit (CDs)</h4>
                <p>CDs often have fixed terms. Converting a 18-month CD rate into an APY allows you to compare it directly to your liquid savings account to see if locking up your money is actually worth it.</p>
              </div>
              <div>
                <h4 className="font-bold text-emerald-800 uppercase text-xs tracking-widest mb-1">Cryptocurrency Staking</h4>
                <p>Many crypto platforms offer "Daily Rewards." These often utilize continuous compounding math. Always use an APY calculator to find the real yield before committing your digital assets.</p>
              </div>
            </div>
          }
          glossary={[
            {
              term: "Compounding Interest",
              definition: "The addition of interest to the principal sum of a loan or deposit, so that interest in the next period is then earned on the principal sum plus previously-accumulated interest."
            },
            {
              term: "Euler's Number (e)",
              definition: "A mathematical constant approximately equal to 2.71828, used as the base for calculating continuous compounding return rates."
            },
            {
              term: "Nominal Rate",
              definition: "The advertised rate that does not account for compounding. Also known as the 'Stated Rate'."
            },
            {
              term: "Variable APY",
              definition: "An annual percentage yield that can change at any time, common in savings and money market accounts."
            }
          ]}
          faqs={[
            {
              question: "Will my APY ever change?",
              answer: "If you have a High-Yield Savings Account, the APY is variable and usually follows the Federal Funds Rate. If the Fed raises rates, your APY goes up. If they cut rates, your bank will likely lower your APY."
            },
            {
              question: "Is APY the same as ROI?",
              answer: "Not quite. ROI (Return on Investment) measures the total growth of an investment from start to finish, regardless of time. APY specifically measures the growth over a standardized 365-day period."
            },
            {
              question: "Does higher compounding frequency always mean more money?",
              answer: "Yes, but with diminishing returns. The jump from annual to monthly is big. The jump from daily to continuous is virtually imperceivable for most balances."
            },
            {
              question: "How do I calculate APY for a partial year?",
              answer: "APY is always annualized for a full year. If you hold an investment for 6 months, you would earn approximately half of the APY (slightly less due to the lack of compounding in the second half of the year)."
            }
          ]}
          relatedCalculators={[
            {
              name: "Compound Interest Calculator",
              path: "/compound-interest-calculator/",
              desc: "Project the exact dollar amounts you will earn over decades using your new APY."
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator/",
              desc: "Calculate your future net worth by combining your APY with monthly deposits."
            },
            {
              name: "Simple Interest Calculator",
              path: "/simple-interest-calculator/",
              desc: "See the massive mathematical difference between simple interest and APY."
            },
            {
              name: "APR Calculator",
              path: "/apr-calculator/",
              desc: "Compare your savings yield (APY) against your debt costs (APR)."
            }
          ]}
        />
      </div>
    </div>
  );
}
