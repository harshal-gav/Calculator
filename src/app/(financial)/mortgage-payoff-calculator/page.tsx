"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MortgagePayoffCalculator() {
  const [loanBalance, setLoanBalance] = useState("250000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [originalTerm, setOriginalTerm] = useState("30"); // total years of loan
  const [yearsRemaining, setYearsRemaining] = useState("25"); // years left

  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState("200");

  const [result, setResult] = useState<{
    standardMonthlyPayment: number;
    standardTotalInterest: number;
    standardMonthsToPayoff: number;
    newTotalInterest: number;
    newMonthsToPayoff: number;
    interestSaved: number;
    timeSavedMonths: number;
  } | null>(null);

  const calculatePayoff = () => {
    const balance = parseFloat(loanBalance);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const remainingMonths = parseFloat(yearsRemaining) * 12;
    const extraPay = parseFloat(extraMonthlyPayment) || 0;

    if (
      isNaN(balance) ||
      isNaN(rate) ||
      isNaN(remainingMonths) ||
      balance <= 0 ||
      remainingMonths <= 0
    ) {
      setResult(null);
      return;
    }

    // Calculate standard monthly payment based on current balance and remaining term
    // This simulates a loan where the user might have already paid off some.
    // Formula: P = r * PV / (1 - (1 + r)^-n)
    let standardPayment = 0;
    if (rate === 0) {
      standardPayment = balance / remainingMonths;
    } else {
      standardPayment =
        (rate * balance) / (1 - Math.pow(1 + rate, -remainingMonths));
    }

    // Standard Amortization Loop
    let stdBalance = balance;
    let stdTotalInterest = 0;
    let stdMonths = 0;

    while (stdBalance > 0 && stdMonths < remainingMonths + 1200) {
      // cap at 100 years
      stdMonths++;
      const interestPayment = stdBalance * rate;
      stdTotalInterest += interestPayment;
      const principalPayment = standardPayment - interestPayment;
      stdBalance = stdBalance - principalPayment;
    }

    // Accelerated Amortization Loop with Extra Payment
    let newBalance = balance;
    let newTotalInterest = 0;
    let newMonths = 0;
    const newPayment = standardPayment + extraPay;

    while (newBalance > 0 && newMonths < remainingMonths + 1200) {
      newMonths++;
      const interestPayment = newBalance * rate;
      newTotalInterest += interestPayment;

      // Final payment might be smaller
      let principalPayment = newPayment - interestPayment;
      if (principalPayment > newBalance) {
        principalPayment = newBalance;
      }

      newBalance = newBalance - principalPayment;
    }

    setResult({
      standardMonthlyPayment: standardPayment,
      standardTotalInterest: stdTotalInterest,
      standardMonthsToPayoff: stdMonths,
      newTotalInterest: newTotalInterest,
      newMonthsToPayoff: newMonths,
      interestSaved: stdTotalInterest - newTotalInterest,
      timeSavedMonths: stdMonths - newMonths,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Mortgage Payoff Calculator
      </h1>
      <p className="mb-4 text-gray-600 text-lg">
        Calculate exactly how much time and money you can save by adding extra
        payments to your mortgage every month.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Inputs */}
        <div className="lg:col-span-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Current Mortgage Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Current Loan Balance ($)
              </label>
              <input
                type="number"
                value={loanBalance}
                onChange={(e) => setLoanBalance(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 border focus:border-indigo-500 font-bold text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 border focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Years Remaining
              </label>
              <input
                type="number"
                step="0.5"
                value={yearsRemaining}
                onChange={(e) => setYearsRemaining(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 border focus:border-indigo-500"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-6 text-gray-800 border-t border-gray-200 pt-6">
            Payoff Strategy
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Extra Monthly Payment ($)
              </label>
              <input
                type="number"
                value={extraMonthlyPayment}
                onChange={(e) => setExtraMonthlyPayment(e.target.value)}
                className="w-full rounded-lg border-indigo-300 bg-indigo-50 p-3 border-2 focus:border-indigo-600 text-indigo-900 font-bold text-xl"
              />
            </div>
          </div>

          <button
            onClick={calculatePayoff}
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Savings
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {result !== null ? (
            <>
              <div className="bg-indigo-900 rounded-xl p-8 border border-indigo-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-screen filter blur-[40px] opacity-20 pointer-events-none"></div>
                <h2 className="text-indigo-100/70 font-bold uppercase tracking-widest text-xs mb-8">
                  Payoff Acceleration Results
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="text-indigo-300 text-sm font-semibold mb-1">
                      Interest Saved
                    </div>
                    <div className="text-4xl text-white font-black font-mono">
                      $
                      {result.interestSaved.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-indigo-300 text-sm font-semibold mb-1">
                      Time Saved
                    </div>
                    <div className="text-3xl text-green-400 font-bold">
                      {Math.floor(result.timeSavedMonths / 12)} years,{" "},
                      {result.timeSavedMonths % 12} months
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-gray-800 font-bold text-lg mb-4 border-b pb-2">
                  Standard vs. Accelerated
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-2">
                      Original Plan
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      Payoff Time:{" "}
                      <span className="font-bold text-gray-900">
                        {Math.floor(result.standardMonthsToPayoff / 12)} yrs{" "},
                        {result.standardMonthsToPayoff % 12} mo
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Interest:{" "}
                      <span className="font-bold text-gray-900">
                        $
                        {result.standardTotalInterest.toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="text-xs text-indigo-700 font-bold uppercase mb-2">
                      With Extra Payment
                    </div>
                    <div className="text-sm text-indigo-900 mb-1">
                      Payoff Time:{" "}
                      <span className="font-bold">
                        {Math.floor(result.newMonthsToPayoff / 12)} yrs{" "},
                        {result.newMonthsToPayoff % 12} mo
                      </span>
                    </div>
                    <div className="text-sm text-indigo-900">
                      Total Interest:{" "}
                      <span className="font-bold">
                        $
                        {result.newTotalInterest.toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100 h-full flex items-center justify-center text-center">
              <p className="text-indigo-800 opacity-60 font-medium">
                Enter your loan balance, interest rate, and extra monthly
                payment to see how much money and time you can save!
              </p>
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
            name: "Mortgage Payoff Calculator",
            operatingSystem: "All",
            applicationCategory: "FinancialApplication",
          }),
        }}
      />

      <div className="mt-12">
        <CalculatorSEO
          title="Mortgage Payoff Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Mortgage Payoff Calculator</strong> is a specialized
                financial tool designed to show you exactly how much time and
                interest you can save by overpaying your mortgage each month.
              </p>
              <p>
                Because mortgages are heavily front-loaded with interest
                (standard amortization), paying even slightly more than your
                required minimum payment applies 100% directly to your principal
                loan balance. Doing this consistently dramatically shortens the
                life of your loan and prevents thousands of dollars from being
                lost to interest over decades.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Mortgage Payoff Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                Mortgage interest is calculated monthly based on your
                outstanding principal balance at that exact moment in time.
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                <li>
                  <strong>Monthly Interest:</strong>{" "}
                  <code className="bg-zinc-100 px-2 rounded">
                    Remaining Balance × (Annual Yield / 12)
                  </code>
                </li>
                <li>
                  <strong>Principal Reduction:</strong>{" "}
                  <code className="bg-zinc-100 px-2 rounded">
                    Total Monthly Payment - Monthly Interest
                  </code>
                </li>
                <li>
                  By adding an <em>Extra Payment</em>, you permanently lower the
                  Remaining Balance for the next month. Because that balance is
                  lower, the bank charges you less interest in Month 2. Because
                  they charged less interest, even more of your standard payment
                  attacks the principal. This triggers an compounding effect of
                  savings!
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Imagine you have a <strong>$250,000 balance</strong> remaining
                on a 30-year mortgage at <strong>5.5% interest</strong> (with 25
                years left to pay).
              </p>
              <ul className="list-none space-y-2 mt-4 text-sm bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                <li>
                  <strong>Standard Plan:</strong> Your normal principal &
                  interest payment is roughly $1,535/mo. If you stick to this
                  for 25 years, you will pay exactly <strong>$210,612</strong>{" "}
                  in total interest.
                </li>
                <li className="font-bold pt-2 text-indigo-800">
                  The Power of $200 Extra per Month:
                </li>
                <li>
                  If you pay $1,735 instead of $1,535, you will pay off the loan
                  in just <strong>19 years and 3 months</strong> (saving almost
                  6 years).
                </li>
                <li>
                  Your total interest drops to <strong>$156,069</strong>.
                </li>
                <li className="text-emerald-700 font-bold border-t border-indigo-200 pt-2 mt-2 border-dashed">
                  Total Savings: $54,543 in cash kept in your pocket!
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Retirement Planning:</strong> Aggressively adding extra
                payments so your mortgage is 100% paid off before you transition
                to a fixed-income retirement.
              </li>
              <li>
                <strong>Bonus Allocation:</strong> Deciding whether a $5,000
                annual work bonus should be invested in the stock market or
                applied as a lump-sum payment against your mortgage principal.
              </li>
              <li>
                <strong>Bi-Weekly Payment Strategy:</strong> Simulating the
                effect of making half-payments every two weeks (which results in
                13 full payments a year) instead of 12 standard monthly
                payments.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Does an extra payment go towards interest or principal?",
              answer:
                "When you make an extra payment specifically designated as 'principal only', 100% of that money reduces your outstanding loan balance. However, you must inform your lender that you want the extra funds applied strictly to the principal, otherwise they might mistakenly hold it as a prepayment for next month's standard bill.",
            },
            {
              question:
                "Is it better to pay off my mortgage early or invest the extra cash?",
              answer:
                "This is a classic debate. Mathematically, it depends on the interest rate. If your mortgage rate is very low (e.g., 3%), you are usually better off investing the extra cash in an S&P 500 index fund, which historically returns 7-10%. However, if your mortgage rate is high (e.g., 7-8%), paying off the mortgage provides a guaranteed, risk-free 7-8% return on your money, which is exceptionally difficult to beat. There is also the significant psychological benefit of being completely debt-free.",
            },
            {
              question: "What is a prepayment penalty?",
              answer:
                "Some predatory or older loan contracts include a 'prepayment penalty' fee if you pay off the loan too quickly, because the bank loses out on the decades of interest they expected to collect. Fortunately, most modern conforming mortgages do not have prepayment penalties. You should check your specific loan documents to be sure.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Amortization Calculator",
              path: "/amortization-calculator",
              desc: "View the exact month-by-month breakdown of how your mortgage shrinks.",
            },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly PITI limits when purchasing a new home.",
            },
            {
              name: "Debt Payoff Calculator",
              path: "/debt-payoff-calculator",
              desc: "Calculate Snowball vs Avalanche methods for paying off multiple debts.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your exact annualized percentage returns.",
            }]}
        />
      </div>
    </div>
  );
}
