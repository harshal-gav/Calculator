"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState("200000");
  const [loanTerm, setLoanTerm] = useState("15"); // Years
  const [interestRate, setInterestRate] = useState("5.0");

  const [schedule, setSchedule] = useState<
    {
      month: number;
      principal: number;
      interest: number;
      balance: number;
    }[]
  >([]);

  const [summary, setSummary] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  const calculateAmortization = () => {
    const pPrincipal = parseFloat(loanAmount) || 0;
    const pTermYears = parseInt(loanTerm) || 0;
    const pTermMonths = pTermYears * 12;
    const pRateAnnual = parseFloat(interestRate) || 0;
    const pRateMonthly = pRateAnnual / 100 / 12;

    if (pPrincipal > 0 && pTermMonths > 0) {
      let monthly = 0;
      if (pRateMonthly === 0) {
        monthly = pPrincipal / pTermMonths;
      } else {
        monthly =
          (pPrincipal *
            pRateMonthly *
            Math.pow(1 + pRateMonthly, pTermMonths)) /
          (Math.pow(1 + pRateMonthly, pTermMonths) - 1);
      }

      let balance = pPrincipal;
      let totalInterest = 0;
      const newSchedule = [];

      // Prevent massive array if user enters 100 years
      const maxMonths = Math.min(pTermMonths, 1200);

      for (let i = 1; i <= maxMonths; i++) {
        const interestPayment = balance * pRateMonthly;
        const principalPayment = monthly - interestPayment;
        balance = balance - principalPayment;

        totalInterest += interestPayment;

        newSchedule.push({
          month: i,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }

      setSummary({
        monthlyPayment: monthly,
        totalInterest: totalInterest,
        totalCost: pPrincipal + totalInterest,
      });

      setSchedule(newSchedule);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight text-nowrap">Amortization Calculator</h1>
          <p className="text-indigo-600 font-medium mt-1">Detailed month-by-month breakdown of your loan payoff.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shrink-0">
          <span className="text-indigo-700 font-bold text-sm uppercase tracking-wider">Loan Schedule</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Inputs */}
        <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 h-fit space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Loan Amount ($)</label>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Loan Term (Years)</label>
              <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Interest Rate (%)</label>
              <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>
            <button onClick={calculateAmortization} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]">
              Generate Schedule
            </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-2">
            {summary ? (
                <div className="h-full bg-gradient-to-br from-indigo-600 to-slate-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        <div className="space-y-1">
                            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest font-mono">Monthly Payment</span>
                            <div className="text-4xl font-black">${summary.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest font-mono">Total Interest</span>
                            <div className="text-4xl font-black text-rose-300">${summary.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest font-mono">Total Principal</span>
                            <div className="text-4xl font-black text-emerald-300">${parseFloat(loanAmount).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-indigo-50/5">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Amortization View</h3>
                    <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Enter your loan details to see exactly how each payment is split between principal and interest over time.</p>
                </div>
            )}
        </div>
      </div>

      {/* Schedule Table */}
      {schedule.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
            <table className="min-w-full text-sm text-left text-slate-600 border-collapse">
              <thead className="bg-slate-900 text-white sticky top-0 uppercase font-bold text-[10px] tracking-widest z-20">
                <tr>
                  <th className="px-6 py-4">Month</th>
                  <th className="px-6 py-4">Principal ($)</th>
                  <th className="px-6 py-4">Interest ($)</th>
                  <th className="px-6 py-4 text-indigo-300">Total Pmt ($)</th>
                  <th className="px-6 py-4 bg-indigo-950">Balance ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.map((row) => (
                  <tr key={row.month} className="hover:bg-indigo-50 transition-colors group">
                    <td className="px-6 py-3 font-bold text-slate-400 group-hover:text-indigo-600">{row.month}</td>
                    <td className="px-6 py-3 font-semibold text-emerald-600">${row.principal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-3 font-semibold text-rose-500">${row.interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-3 font-black text-slate-900">${(row.principal + row.interest).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-3 bg-slate-50 font-black text-indigo-900 group-hover:bg-indigo-100 transition-colors">${row.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Amortization Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Amortization Calculator"
        whatIsIt={
          <>
            <p>
              An <strong>Amortization Calculator</strong> provides a complete,
              month-by-month breakdown of your loan payoff schedule.
              "Amortization" is the financial process of gradually writing off
              the initial cost of an asset over time.
            </p>
            <p>
              When you take out an amortized loan (like a mortgage or car loan),
              your monthly payment remains fixed, but the <em>ratio</em> of
              principal to interest changes every single month. In the
              beginning, you pay mostly interest. Toward the end of the loan,
              your payments go almost entirely toward paying off the principal.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Amortization Calculator,
              Amortization Schedule, Loan Amortization Calculator, Amortization
              Schedule Calculator, Amortization Table, Loan Amortization
              Schedule, Amortization, Loan Amortization
            </p>
          </>
        }
        formula={
          <>
            <p>
              The mathematical generation of an amortization schedule requires
              iterative calculation. For a given month <em>m</em>:
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-xl shadow-sm my-4 overflow-x-auto space-y-2">
              <p>
                Interest Payment = Outstanding Balance * Monthly Interest Rate
              </p>
              <p>
                Principal Payment = Total Monthly Payment - Interest Payment
              </p>
              <p>New Balance = Outstanding Balance - Principal Payment</p>
            </div>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Outstanding Balance:</strong> The remaining principal
                from the previous month.
              </li>
              <li>
                <strong>Monthly Interest Rate:</strong> Your annual rate divided
                by 12.
              </li>
            </ul>
          </>
        }
        example={
          <>
            <p>
              Suppose you have a <strong>$200,000</strong> mortgage at exactly{" "}
              <strong>5.0%</strong> interest for <strong>15 years</strong>.
            </p>
            <p>
              Your fixed monthly payment is calculated to be{" "}
              <strong>$1,581.59</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Month 1:</strong> Interest is $833.33 ($200,000 * 0.05 /
                12). The remaining $748.26 goes to principal. Your new balance
                is $199,251.74.
              </li>
              <li>
                <strong>Month 2:</strong> Interest is $830.22 ($199,251.74 *
                0.05 / 12). Now, $751.37 goes to principal.
              </li>
              <li>
                <strong>Month 180 (Final):</strong> Interest is just $6.56. The
                remaining $1,575.03 completely wipes out the principal balance!
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Home Equity Tracking:</strong> Seeing exactly how much
              equity you will have in your home 5, 10, or 20 years from now.
            </li>
            <li>
              <strong>Extra Payments Impact:</strong> Visualizing how an extra
              $100 towards the principal each month dramatically shortens the
              amortization schedule and saves thousands in total interest.
            </li>
            <li>
              <strong>Refinance Strategy:</strong> Comparing your current
              position on the amortization curve vs restarting the curve with a
              new 30-year refinanced loan at a slightly lower rate.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "Why do I pay so much interest at the beginning?",
            answer:
              "Because interest is calculated based on the outstanding principal balance. In the first year, your balance is at its highest, so the interest charge is at its peak. As you slowly pay down the principal, the interest charge naturally drops, allowing more of your fixed payment to attack the principal.",
          },
          {
            question: "Does paying extra principal help?",
            answer:
              "Yes, immensely. Any extra money paid toward the principal strictly bypasses the interest calculation. This permanently reduces your outstanding balance, which means all future interest charges will be permanently lower.",
          },
          {
            question: "What is negative amortization?",
            answer:
              "Negative amortization occurs when your monthly payment isn't large enough to cover the interest due. The unpaid interest is added to your principal balance, meaning your debt actually grows each month instead of shrinking.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Mortgage Calculator",
            path: "/mortgage-calculator",
            desc: "Calculate your monthly mortgage payments including taxes and insurance.",
          },
          {
            name: "Auto Loan Calculator",
            path: "/auto-loan-calculator",
            desc: "Calculate your exact monthly car payment including dealer fees and taxes.",
          },
          {
            name: "Payment Calculator",
            path: "/payment-calculator",
            desc: "Determine your monthly payment for any standard amortized loan.",
          },
        ]}
      />
    </div>
  );
}
