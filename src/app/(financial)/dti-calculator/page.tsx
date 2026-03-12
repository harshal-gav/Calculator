"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DTICalculator() {
  // Income
  const [grossIncome, setGrossIncome] = useState("6000");
  const [otherIncome, setOtherIncome] = useState("0");

  // Debts
  const [mortgageRent, setMortgageRent] = useState("1500");
  const [autoLoans, setAutoLoans] = useState("350");
  const [studentLoans, setStudentLoans] = useState("250");
  const [creditCards, setCreditCards] = useState("150");
  const [otherDebts, setOtherDebts] = useState("0");

  const [result, setResult] = useState<{
    dti: number;
    totalIncome: number;
    totalDebts: number;
    frontEndDti: number;
    status: "excellent" | "good" | "fair" | "poor";
  } | null>(null);

  const calculate = () => {
    const income = parseFloat(grossIncome) + parseFloat(otherIncome);
    const frontEndDebts = parseFloat(mortgageRent);
    const backEndDebts =
      parseFloat(autoLoans) +
      parseFloat(studentLoans) +
      parseFloat(creditCards) +
      parseFloat(otherDebts);
    const totalDebts = frontEndDebts + backEndDebts;

    if (isNaN(income) || income <= 0 || isNaN(totalDebts)) {
      setResult(null);
      return;
    }

    const dti = (totalDebts / income) * 100;
    const frontEndDti = (frontEndDebts / income) * 100;

    let status: "excellent" | "good" | "fair" | "poor" = "poor";
    if (dti <= 36) status = "excellent";
    else if (dti <= 43) status = "good";
    else if (dti <= 50) status = "fair";

    setResult({
      dti,
      totalIncome: income,
      totalDebts,
      frontEndDti,
      status,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">⚖️</span> DTI Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate your Debt-to-Income (DTI) ratio to evaluate your financial
          health and see if you qualify to buy a home or get a loan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Income */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200">
          <h2 className="text-xl font-bold border-b-2 border-emerald-500 pb-2 inline-block text-emerald-900 mb-6 w-full">
            Gross Monthly Income (Before Taxes)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Base Salary / Wages
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 shrink-0"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Other Income (Bonuses, Side Hustle)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-100 flex justify-between items-center text-emerald-800 font-bold bg-emerald-50 p-4 rounded-xl">
            <span>Total Income:</span>
            <span className="text-xl">
              $
              {(
                parseFloat(grossIncome || "0") + parseFloat(otherIncome || "0")
              ).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Debts */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200">
          <h2 className="text-xl font-bold border-b-2 border-rose-500 pb-2 inline-block text-rose-900 mb-6 w-full">
            Monthly Debt Payments
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Mortgage or Rent
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={mortgageRent}
                  onChange={(e) => setMortgageRent(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-rose-500 font-bold bg-zinc-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Auto Loans
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={autoLoans}
                  onChange={(e) => setAutoLoans(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-rose-500 font-bold bg-zinc-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Student Loans
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={studentLoans}
                  onChange={(e) => setStudentLoans(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-rose-500 font-bold bg-zinc-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Credit Card Minimums
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={creditCards}
                  onChange={(e) => setCreditCards(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-rose-500 font-bold bg-zinc-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Other Debts (Child Support, etc)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={otherDebts}
                  onChange={(e) => setOtherDebts(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-rose-500 font-bold bg-zinc-50"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={calculate}
          className="w-full max-w-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
        >
          Calculate DTI Ratio
        </button>
      </div>

      {result !== null && (
        <div
          className={`rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center border ${
            result.status === "excellent"
              ? "bg-emerald-950 border-emerald-800"
              : result.status === "good"
                ? "bg-green-950 border-green-800"
                : result.status === "fair"
                  ? "bg-amber-950 border-amber-800"
                  : "bg-rose-950 border-rose-800"
          }`}
        >
          <h2 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Your Debt-to-Income Ratio
          </h2>

          <div className="z-10 relative mb-10 w-full max-w-sm">
            <div
              className={`p-8 rounded-full aspect-square border-4 flex flex-col items-center justify-center shadow-inner ${
                result.status === "excellent"
                  ? "bg-emerald-900/40 border-emerald-500/30 shadow-emerald-900/50"
                  : result.status === "good"
                    ? "bg-green-900/40 border-green-500/30 shadow-green-900/50"
                    : result.status === "fair"
                      ? "bg-amber-900/40 border-amber-500/30 shadow-amber-900/50"
                      : "bg-rose-900/40 border-rose-500/30 shadow-rose-900/50"
              }`}
            >
              <div
                className={`font-mono font-black text-6xl md:text-7xl break-all drop-shadow-lg ${
                  result.status === "excellent"
                    ? "text-emerald-400"
                    : result.status === "good"
                      ? "text-green-400"
                      : result.status === "fair"
                        ? "text-amber-400"
                        : "text-rose-400"
                }`}
              >
                {result.dti.toFixed(1)}
                <span className="text-3xl">%</span>
              </div>
              <div
                className={`uppercase tracking-widest font-bold text-sm mt-2 rounded-full px-3 py-1 ${
                  result.status === "excellent"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : result.status === "good"
                      ? "bg-green-500/20 text-green-300"
                      : result.status === "fair"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-rose-500/20 text-rose-300"
                }`}
              >
                {result.status.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="w-full max-w-3xl z-10 bg-black/30 p-6 rounded-2xl border border-white/10 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center">
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">
                Total Monthly Debts
              </span>
              <span className="font-mono text-rose-300 font-bold text-2xl">
                ${result.totalDebts.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col items-center text-center border-t border-white/10 pt-4 md:border-t-0 md:border-l md:pt-0">
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">
                Total Monthly Income
              </span>
              <span className="font-mono text-emerald-300 font-bold text-2xl">
                ${result.totalIncome.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="z-10 w-full max-w-3xl bg-black/40 p-6 rounded-xl border border-white/5 data-table">
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
              Lender Guidelines Reference
            </h3>
            <div className="space-y-3 font-mono text-sm">
              <div
                className={`flex justify-between items-center p-2 rounded border ${result.status === "excellent" ? "bg-emerald-900/50 border-emerald-500" : "border-transparent text-white/50"}`}
              >
                <span>&le; 36% (Excellent)</span>
                <span
                  className={
                    result.status === "excellent" ? "text-emerald-300" : ""
                  }
                >
                  Easily qualifies for best rates
                </span>
              </div>
              <div
                className={`flex justify-between items-center p-2 rounded border ${result.status === "good" ? "bg-green-900/50 border-green-500" : "border-transparent text-white/50"}`}
              >
                <span>37% - 43% (Good)</span>
                <span
                  className={result.status === "good" ? "text-green-300" : ""}
                >
                  Standard maximum for most mortgages (QMs)
                </span>
              </div>
              <div
                className={`flex justify-between items-center p-2 rounded border ${result.status === "fair" ? "bg-amber-900/50 border-amber-500" : "border-transparent text-white/50"}`}
              >
                <span>44% - 50% (Fair)</span>
                <span
                  className={result.status === "fair" ? "text-amber-300" : ""}
                >
                  Might require manual underwriting / higher rates
                </span>
              </div>
              <div
                className={`flex justify-between items-center p-2 rounded border ${result.status === "poor" ? "bg-rose-900/50 border-rose-500" : "border-transparent text-white/50"}`}
              >
                <span>&gt; 50% (Poor)</span>
                <span
                  className={result.status === "poor" ? "text-rose-300" : ""}
                >
                  Likely denial; focus on reducing debt
                </span>
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
            name: "DTI Calculator",
            operatingSystem: "All",
            applicationCategory: "FinancialApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Debt-to-Income (DTI) Ratio Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Debt-to-Income (DTI) Calculator</strong> is the
                exact tool used by mortgage lenders, banks, and auto financiers
                to determine if you can safely afford a new loan. It rigidly
                compares how much money you earn each month against how much
                money you are legally obligated to pay toward debts.
              </p>
              <p>
                Your DTI ratio is arguably more important than your credit score
                when applying for a mortgage. Even with a perfect 800 credit
                score, an overly high DTI will result in your loan application
                being instantly denied because the math proves you do not have
                enough cash flow to handle another monthly payment.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The DTI calculation is a simple percentage equation utilizing
                your gross income (before taxes are taken out):
              </p>
              <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
                <strong>DTI Ratio</strong> = (Total Monthly Debt Payments ÷
                Gross Monthly Income) × 100
              </div>
            </>
          }
          example={
            <>
              <p>Let's evaluate a standard American household:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>Income:</strong> You earn a heavily taxed $5,000 per
                  month <em>gross</em> (before taxes).
                </li>
                <li>
                  <strong>Debts:</strong> You pay $1,500 in rent/mortgage, a
                  $400 car payment, and $100 in minimum credit card payments.
                  Total Debts = $2,000.
                </li>
                <li>
                  <strong>Calculation:</strong> ($2,000 ÷ $5,000) × 100 ={" "}
                  <strong>40%</strong>.
                </li>
                <li>
                  <strong>Result:</strong> Your DTI is 40%. This is generally
                  considered "Good" and will comfortably qualify you for most
                  conventional loans.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Mortgage Pre-Approval:</strong> The absolute maximum DTI
                allowed for a conventional "Qualified Mortgage" (QM) is strictly
                capped at 43% by federal guidelines, though many conservative
                lenders prefer 36% or lower.
              </li>
              <li>
                <strong>Auto Loan Approvals:</strong> Car dealerships
                aggressively check your DTI to ensure you aren't over-leveraged
                before allowing you to drive a depreciating asset off the lot.
              </li>
              <li>
                <strong>Personal Finance Auditing:</strong> Identifying if you
                are living beyond your means. If your DTI climbs above 50%, you
                are in the "danger zone" where a single medical emergency or job
                loss will immediately trigger bankruptcy.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does my DTI include my groceries or utility bills?",
              answer:
                "No. Lenders ONLY care about rigidly contracted, legally binding debts that show up on your credit report. This includes mortgages, car loans, student loans, child support, and credit card minimums. Food, gas, health insurance, and electricity bills are explicitly NOT included in a DTI calculation.",
            },
            {
              question: "Do I use my gross income or my net (take-home) pay?",
              answer:
                "You strictly use your Gross Income (your salary BEFORE taxes and 401k contributions are removed). This confuses many people, but lenders intentionally use gross income because tax brackets and deductions are highly subjective and easily manipulated.",
            },
            {
              question: "What is the 'Front-End' vs 'Back-End' DTI?",
              answer:
                "Front-End DTI only looks at housing costs (Mortgage + Property Taxes + Home Insurance) divided by your income. Back-End DTI includes housing costs PLUS all other recurring debts (auto, student loans, credit cards). This calculator computes your Back-End DTI, which is the primary number lenders use.",
            },
          ]}
          relatedCalculators={[
            {
              name: "LTV Calculator",
              path: "/ltv-calculator",
              desc: "Calculate your Loan-to-Value ratio for mortgages.",
            },
            {
              name: "Net Worth Calculator",
              path: "/net-worth-calculator",
              desc: "Determine your true financial health by balancing assets and debts.",
            },
            {
              name: "Debt Payoff",
              path: "/debt-payoff-calculator",
              desc: "Strategize the fastest way to lower your DTI.",
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
