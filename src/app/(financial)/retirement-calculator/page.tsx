"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7"); // e.g. 7% post-inflation
  const [annualWithdrawal, setAnnualWithdrawal] = useState("40000");

  const curAge = parseInt(currentAge, 10);
  const retAge = parseInt(retirementAge, 10);
  const savings = parseFloat(currentSavings);
  const monthly = parseFloat(monthlyContribution);
  const rate = parseFloat(annualReturn) / 100 / 12; // monthly rate
  const withdrawal = parseFloat(annualWithdrawal);

  let finalNestEgg = 0;
  let yearsWorking = 0;
  let totalContributed = 0;
  let totalInterest = 0;
  let theFourPercentRule = 0;
  let isEnough = false;
  let isValid = false;

  if (
    !isNaN(curAge) &&
    !isNaN(retAge) &&
    !isNaN(savings) &&
    !isNaN(monthly) &&
    !isNaN(rate) &&
    !isNaN(withdrawal) &&
    retAge > curAge
  ) {
    isValid = true;
    yearsWorking = retAge - curAge;
    const totalMonths = yearsWorking * 12;

    // Future Value Calculation (Compound Interest + PMT)
    // Basic FV = P(1+r)^n + PMT [ ((1+r)^n - 1) / r ]
    const compoundFactor = Math.pow(1 + rate, totalMonths);

    finalNestEgg = savings * compoundFactor;

    if (rate > 0) {
      finalNestEgg += monthly * ((compoundFactor - 1) / rate);
    } else {
      finalNestEgg += monthly * totalMonths;
    }

    totalContributed = savings + monthly * totalMonths;
    totalInterest = finalNestEgg - totalContributed;

    // Will it last? Basic 4% rule check.
    theFourPercentRule = finalNestEgg * 0.04;
    isEnough = theFourPercentRule >= withdrawal;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-blue-50 rounded-xl shadow-lg border border-blue-100">
      <h1 className="text-4xl font-extrabold mb-4 text-slate-800 border-b border-blue-200 pb-4 flex items-center">
        <span className="mr-3">🏖️</span> Retirement Calculator
      </h1>
      <p className="mb-8 text-slate-600 text-lg">
        Project your retirement nest egg and see if it safely covers your
        estimated annual expenses.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* Inputs */}
        <div className="lg:col-span-2 bg-white flex flex-col space-y-6 p-6 md:p-8 rounded-xl border border-blue-200 shadow-sm">
          <h3 className="font-bold text-blue-900 border-b border-blue-100 pb-2 uppercase tracking-wide text-sm">
            Your Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                Current Age
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                Retirement Age
              </label>
              <input
                type="number"
                min={parseInt(currentAge, 10) + 1 || 2}
                max="100"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
              Current Savings ($)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest flex justify-between">
              <span>Annual Return (%)</span>
              <span className="text-blue-600 font-black">{annualReturn}%</span>
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-[10px] text-slate-400 mt-1 italic text-right">
              * Consider using a post-inflation rate (e.g. 6-7%)
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
              Estimated Annual Expenses in Retirement ($)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={annualWithdrawal}
              onChange={(e) => setAnnualWithdrawal(e.target.value)}
              className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold"
            />
          </div>
        </div>

        {/* Dashboard Output */}
        <div className="lg:col-span-3">
          {isValid ? (
            <div className="h-full bg-slate-900 rounded-xl p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between border border-slate-800">
              {/* Abstract decorative graph */}
              <div className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none">
                <svg
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                  className="w-full h-full text-blue-500"
                  fill="currentColor"
                >
                  <polygon points="0,100 0,80 20,70 40,60 60,30 80,40 100,0 100,100" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full space-y-8">
                <div>
                  <h3 className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-2">
                    Estimated Nest Egg at Age {retAge}
                  </h3>
                  <div className="text-5xl md:text-7xl font-black text-white tracking-tight">
                    <span className="text-blue-500 text-4xl align-top mr-1">
                      $
                    </span>
                    {finalNestEgg > 1000000
                      ? (finalNestEgg / 1000000).toFixed(2) + "M"
                      : finalNestEgg.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                  </div>
                  <div className="text-sm text-slate-400 mt-2 font-medium">
                    After {yearsWorking} years of saving and investing.
                  </div>
                </div>

                {/* Status banner */}
                <div
                  className={`p-5 rounded-xl border ${isEnough ? "bg-emerald-900 border-emerald-700" : "bg-rose-900 border-rose-700"}`}
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">
                      {isEnough ? "✅" : "⚠️"}
                    </div>
                    <div>
                      <h4
                        className={`font-bold text-lg ${isEnough ? "text-emerald-400" : "text-rose-400"}`}
                      >
                        {isEnough
                          ? "You are on track!"
                          : "There may be a shortfall."}
                      </h4>
                      <p className="text-sm text-slate-300 mt-1">
                        Based on the classic 4% withdrawal rule, your nest egg
                        provides a safe annual withdrawal of{" "}
                        <strong className="text-white">
                          $
                          {theFourPercentRule.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </strong>
                        . You specified needing{" "}
                        <strong className="text-white">
                          ${withdrawal.toLocaleString()}
                        </strong>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Total Contributions
                    </div>
                    <div className="text-2xl font-black text-white">
                      $
                      {totalContributed.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Total Interest Earned
                    </div>
                    <div className="text-2xl font-black text-emerald-400">
                      + $
                      {totalInterest.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-xl border-2 border-dashed border-blue-200 bg-white flex items-center justify-center p-8 text-center">
              <div>
                <div className="text-6xl mb-4 opacity-50">🏖️</div>
                <h3 className="text-blue-900 font-bold text-xl mb-2">
                  Ready to plan your future?
                </h3>
                <p className="text-slate-500">
                  Ensure your retirement age is greater than your current age to
                  see your projection.
                </p>
              </div>
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
            name: "Retirement Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Retirement Nest Egg & 4% Rule Calculator"
          whatIsIt={
            <p>
              The <strong>Retirement Calculator</strong> is a foundational,
              long-term financial modeling tool. By evaluating your current age,
              savings balance, monthly investment inputs, and expected market
              returns, it mathematically projects the geometric inflation of
              your portfolio over decades to determine the final size of your
              "Nest Egg"—and then tests if that sum is large enough to sustain
              your expected retirement lifestyle.
            </p>
          }
          formula={
            <>
              <p>
                This calculator relies heavily on the "Future Value of an
                Annuity" compound interest formula, married against the famous{" "}
                <strong>Trinity Study 4% Rule</strong> (which suggests retirees
                can safely withdraw 4% of their portfolio annually, adjusted for
                inflation, for 30 years without running out of money).
              </p>
              <div className="bg-slate-800 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-slate-700 text-slate-300">
                <p>
                  <strong>FV = P(1+r)ⁿ + PMT×[((1+r)ⁿ - 1) / r]</strong>
                </p>
                <p className="mt-2 text-xs italic text-slate-400">
                  P = Current Savings, PMT = Monthly Contribution
                  <br />r = Monthly Interest Rate, n = Total Months
                </p>
                <p className="mt-2 pt-2 border-t border-slate-600">
                  <strong>Safe Annual Withdrawal = FV × 0.04</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's map out an aggressive 30-year-old saver utilizing low-cost
                S&P 500 Index Funds (historically ~7% return after inflation).
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
                <li>
                  <strong>The Input:</strong> Age 30. Retiring at 65. Current
                  Savings: $10,000. Putting away $1,000 a month at a 7% real
                  return.
                </li>
                <li>
                  <strong>Total Contributed:</strong> Over 35 years (420
                  months), they will personally deposit $420,000.
                </li>
                <li>
                  <strong>Compound Magic:</strong> Because the interest is
                  constantly reinvesting into itself, the portfolio explodes to
                  roughly <strong>$1.9 Million</strong>.
                </li>
                <li>
                  <strong>The 4% Test:</strong> $1,900,000 × 0.04 = $76,000.
                  This person can safely withdraw $76,000 a year forever in
                  retirement!
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-slate-600">
              <li>
                <strong>
                  FIRE Movement (Financial Independence, Retire Early):
                </strong>{" "}
                Extreme savers calculating exactly how high they need to push
                their "Monthly Contribution" variable to artificially drag their
                "Retirement Age" variable down from 65 to 45.
              </li>
              <li>
                <strong>Catch-up Contributions:</strong> 50-year-olds realizing
                they are behind on 401(k) savings and modifying their inputs to
                find the mathematical 'catch-up' break-even point using IRS
                catch-up limit increases.
              </li>
              <li>
                <strong>Asset Allocation Shifting:</strong> Tweaking the "Annual
                Return" slider downward from 10% to 5% to simulate shifting a
                portfolio from aggressive volatile Tech Stocks into incredibly
                safe Government Treasury Bonds closer to retirement.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Should I use pre-inflation or post-inflation returns?",
              answer:
                "You should ALMOST ALWAYS use post-inflation (Real) returns. If the stock market historically averages 10% a year, but inflation averages 3%, you should input '7%' into the Annual Return slider. This ensures your final 'Nest Egg' is displayed in today's purchasing power dollars.",
            },
            {
              question: "What is the 4% Rule?",
              answer:
                "Stemming from the 1998 'Trinity Study', researchers ran historical market simulations and found that a retiree with a 50/50 stock/bond split could withdraw 4% of their initial portfolio value every year for 30 years and basically never go bankrupt, even during the Great Depression.",
            },
            {
              question: "Why does starting 10 years earlier matter so much?",
              answer:
                "Because compound interest is an exponential curve. Time in the market is drastically more powerful than money in the market. The money you invest at age 25 will go through so many 'doubling cycles' that it often out-earns the money you invest at age 45 by a completely massive margin.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Compound Interest Calculator",
              path: "/compound-interest-calculator",
              desc: "A deeper, pure mathematical dive into the core formula used here.",
            },
            {
              name: "Savings Goal Calculator",
              path: "/savings-goal-calculator",
              desc: "Work backward from the Nest Egg number you want to hit.",
            },
            {
              name: "Investment Return Calculator",
              path: "/investment-calculator",
              desc: "Compare different specific investment vehicles side-by-side.",
            },
          ]}
        />
      </div>
    </div>
  );
}
