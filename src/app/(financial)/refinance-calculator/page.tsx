"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RefinanceCalculator() {
  const [currentLoan, setCurrentLoan] = useState("200000");
  const [currentRate, setCurrentRate] = useState("6.5");
  const [currentMonthsRemaining, setCurrentMonthsRemaining] = useState("240");

  const [newRate, setNewRate] = useState("4.5");
  const [newTermMonths, setNewTermMonths] = useState("240"); // 20 years
  const [closingCosts, setClosingCosts] = useState("3000");

  const [result, setResult] = useState({
    currentPayment: 0,
    newPayment: 0,
    monthlySavings: 0,
    totalSavings: 0,
    breakEvenMonths: 0,
    shouldRefinance: false,
  });

  useEffect(() => {
    calculateRefi();
  }, [
    currentLoan,
    currentRate,
    currentMonthsRemaining,
    newRate,
    newTermMonths,
    closingCosts,
  ]);

  const PMT = (rateParams: number, nper: number, pv: number) => {
    if (rateParams === 0) return pv / nper;
    return (
      (pv * rateParams * Math.pow(1 + rateParams, nper)) /
      (Math.pow(1 + rateParams, nper) - 1)
    );
  };

  const calculateRefi = () => {
    const principal = parseFloat(currentLoan) || 0;
    const curRate = (parseFloat(currentRate) || 0) / 100 / 12;
    const curMonths = parseInt(currentMonthsRemaining) || 1;

    const nRate = (parseFloat(newRate) || 0) / 100 / 12;
    const nMonths = parseInt(newTermMonths) || 1;
    const fees = parseFloat(closingCosts) || 0;

    const currentPayment = PMT(curRate, curMonths, principal);
    const newPayment = PMT(nRate, nMonths, principal + fees); // Usually fees are rolled into the loan

    const monthlySavings = currentPayment - newPayment;

    // Total cost of remaining current loan
    const totalCurrentCost = currentPayment * curMonths;
    // Total cost of new loan
    const totalNewCost = newPayment * nMonths;

    // Note: the true total savings accounts for the fees if rolled in.
    // Here we just compare the total cash outlay over the life of both plans.
    const totalSavings = totalCurrentCost - totalNewCost;

    // Break even is Fees / Monthly Savings (assuming you pay fees upfront. If rolled in, you'll still use this as a proxy for timeline payoff)
    const breakEvenMonths = monthlySavings > 0 ? fees / monthlySavings : 0;

    setResult({
      currentPayment,
      newPayment,
      monthlySavings,
      totalSavings,
      breakEvenMonths,
      shouldRefinance: totalSavings > 0 && breakEvenMonths < nMonths,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-800 border-b pb-4">
        Refinance Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Determine if refinancing your mortgage or loan makes financial sense by
        analyzing your breakeven timeline and total savings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
          <h3 className="font-bold text-gray-800 border-b border-gray-300 pb-2">
            Current Loan
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Remaining Balance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={currentLoan}
                  onChange={(e) => setCurrentLoan(e.target.value)}
                  className="w-full rounded-md border-gray-300 p-2 pl-7 shadow-sm focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Interest Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(e.target.value)}
                  className="w-full rounded-md border-gray-300 p-2 pr-7 shadow-sm focus:border-emerald-500 font-bold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  %
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Months Left
              </label>
              <input
                type="number"
                value={currentMonthsRemaining}
                onChange={(e) => setCurrentMonthsRemaining(e.target.value)}
                className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-emerald-500 font-bold"
              />
            </div>
          </div>

          <h3 className="font-bold text-gray-800 border-b border-gray-300 pb-2 pt-2">
            Proposed New Loan
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Closing Costs / Fees
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(e.target.value)}
                  className="w-full rounded-md border-gray-300 p-2 pl-7 shadow-sm focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                New Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="w-full rounded-md border-gray-300 p-2 pr-7 shadow-sm focus:border-emerald-500 font-bold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  %
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                New Term (Mos)
              </label>
              <input
                type="number"
                value={newTermMonths}
                onChange={(e) => setNewTermMonths(e.target.value)}
                className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-emerald-500 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          <div className="w-full flex flex-col h-full">
            {result.monthlySavings > 0 ? (
              <div className="p-6 pb-6 text-center bg-emerald-600 border-b border-emerald-700 text-white shadow-inner">
                <h3 className="text-emerald-200 font-bold uppercase tracking-widest text-[11px] mb-1">
                  Monthly Payment Savings
                </h3>
                <div className="text-5xl font-black drop-shadow-md">
                  +${result.monthlySavings.toFixed(2)}
                </div>
                <div className="text-emerald-200 text-sm mt-2 font-medium">
                  New Payment: ${result.newPayment.toFixed(2)}/mo
                </div>
              </div>
            ) : (
              <div className="p-6 pb-6 text-center bg-red-600 border-b border-red-700 text-white shadow-inner">
                <h3 className="text-red-200 font-bold uppercase tracking-widest text-[11px] mb-1">
                  Monthly Payment Increase
                </h3>
                <div className="text-5xl font-black drop-shadow-md">
                  -${Math.abs(result.monthlySavings).toFixed(2)}
                </div>
                <div className="text-red-200 text-sm mt-2 font-medium">
                  New Payment: ${result.newPayment.toFixed(2)}/mo
                </div>
              </div>
            )}

            <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                  Total Lifetime Savings
                </span>
                <span
                  className={`font-black text-2xl ${result.totalSavings > 0 ? "text-emerald-600" : "text-red-600"}`}
                >
                  {result.totalSavings > 0 ? "+" : "-"}$
                  {Math.abs(result.totalSavings).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>

              {result.monthlySavings > 0 && result.breakEvenMonths > 0 && (
                <div className="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-white p-4 rounded-xl border border-emerald-200">
                  <div>
                    <span className="block font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                      Break-Even Timeline
                    </span>
                    <span className="text-[9px] text-gray-400 font-medium">
                      Time to recoup closing costs
                    </span>
                  </div>
                  <span className="font-bold text-lg text-emerald-800">
                    {Math.ceil(result.breakEvenMonths)} months
                  </span>
                </div>
              )}

              {result.shouldRefinance ? (
                <div className="text-center font-bold text-emerald-700 bg-emerald-100 p-3 rounded-lg mt-2">
                  ✅ Refinancing is a mathematically sound move.
                </div>
              ) : (
                <div className="text-center font-bold text-red-700 bg-red-100 p-3 rounded-lg mt-2">
                  ❌ Refinancing does not save you money.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Refinance Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Mortgage Refinance Break-Even Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Mortgage Refinance Calculator</strong> analyzes your
                current loan against a proposed new loan to tell you exactly how
                much money you will save (or lose) over the lifetime of the
                debt.
              </p>
              <p>
                Refinancing replaces your existing mortgage with a brand new
                one. Because banks charge thousands of dollars in closing costs
                to originate a new loan, a lower interest rate does <em>not</em>{" "}
                automatically guarantee you are saving money. This tool
                calculates your exact "Break-Even" timeline to determine if the
                move is actually profitable.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Refinance Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                The primary metric for analyzing a refinance is the{" "}
                <strong>Break-Even Timeline</strong>:
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-emerald-900 border border-emerald-100">
                <strong>Break-Even Months</strong> = Total Closing Costs ÷
                Monthly Payment Savings
              </div>
              <p className="text-sm mt-2">
                If you plan to sell the house or move <em>before</em> reaching
                that break-even month, refinancing is mathematically a
                guaranteed loss, despite the lower monthly payment.
              </p>
            </>
          }
          example={
            <>
              <p>
                Suppose you have <strong>20 years</strong> left on a{" "}
                <strong>$200,000</strong> loan at <strong>6.5%</strong>. A
                lender offers to drop your rate to <strong>4.5%</strong> for a
                new 20-year term, but charges <strong>$3,000</strong> in upfront
                closing costs.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Monthly Win:</strong> Your payment drops from
                  $1,491/mo to $1,265/mo (saving $226 every single month).
                </li>
                <li>
                  <strong>The Cost to Play:</strong> You must pay the bank
                  $3,000 to get that lower rate.
                </li>
                <li>
                  <strong>The Break-Even:</strong> $3,000 ÷ $226 ={" "}
                  <strong>13.2 months</strong>.
                </li>
                <li>
                  <strong>The Reality Check:</strong> If you stay in the house
                  for at least 14 months, the refinance pays for itself. If you
                  stay for the full 20 years, you will save a massive{" "}
                  <strong>$51k</strong> in total lifetime interest. Refinancing
                  here is a highly profitable, mathematically sound decision.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Rate Drop Capitalization:</strong> Quickly checking if
                the Fed dropping interest rates by 1.0% justifies sitting
                through the paperwork of refinancing your current home.
              </li>
              <li>
                <strong>Term Reduction:</strong> Refinancing from a 30-year to a
                15-year mortgage. Your monthly payment will likely go{" "}
                <em>up</em>, but you will shave over a decade off your debt
                sentence and massively reduce lifetime interest.
              </li>
              <li>
                <strong>Cash-Out Refi Analysis:</strong> Borrowing against your
                home equity. By increasing the new loan balance, you can see
                exactly how much extra interest that kitchen remodel is actually
                going to cost you over 30 years.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What if the calculator says my monthly payment goes UP?",
              answer:
                "This happens frequently when you refinance to a shorter term (e.g., going from 30 years to 15 years). Even though your monthly payment increases, your total lifetime savings might still be massive because you are paying the bank for 15 fewer years.",
            },
            {
              question: "Should I roll the closing costs into the new loan?",
              answer:
                "Yes, this is called 'financing the fees'. It prevents you from paying out of pocket, but you will pay interest on those fees for 30 years. Note: This calculator automatically accounts for financed fees by adding the closing costs to your proposed loan balance.",
            },
            {
              question: "Does refinancing restart my 30-year clock?",
              answer:
                "Yes. This is the biggest trap of refinancing. If you are 10 years into a 30-year mortgage and refinance into a NEW 30-year mortgage, you will now be paying for 40 total years. To do a true 'apples-to-apples' comparison, always match the new term to your CURRENT remaining months.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "For calculating initial purchase scenarios, taxes, and PMI.",
            },
            {
              name: "FHA Loan Calculator",
              path: "/fha-loan-calculator",
              desc: "Account for FHA-specific Upfront and Annual Mortgage Insurance Premiums.",
            },
            {
              name: "Debt Payoff Calculator",
              path: "/debt-payoff-calculator",
              desc: "See what happens if you just pay extra principal instead of refinancing.",
            },
          ]}
        />
      </div>
    </div>
  );
}
