"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("25000");
  const [annualRate, setAnnualRate] = useState("6.5");
  const [loanTermYears, setLoanTermYears] = useState("5");
  const [extraPayment, setExtraPayment] = useState("0");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    payoffMonths: number;
    interestSaved: number;
    schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[];
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(loanAmount) || 0;
    const r = (parseFloat(annualRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTermYears) || 0) * 12;
    const extra = parseFloat(extraPayment) || 0;

    if (P <= 0 || r <= 0 || n <= 0) return;

    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentNoExtra = monthlyPayment * n;
    const totalInterestNoExtra = totalPaymentNoExtra - P;

    // Build amortization schedule with extra payments
    const schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
    let balance = P;
    let totalPaid = 0;
    let totalInt = 0;
    let month = 0;

    while (balance > 0.01 && month < 600) {
      month++;
      const interestCharge = balance * r;
      let principalPart = monthlyPayment - interestCharge + extra;
      if (principalPart > balance) principalPart = balance;
      const actualPayment = interestCharge + principalPart;
      balance -= principalPart;
      if (balance < 0) balance = 0;
      totalPaid += actualPayment;
      totalInt += interestCharge;

      if (month <= 12 || month % 12 === 0 || balance <= 0.01) {
        schedule.push({
          month,
          payment: actualPayment,
          principal: principalPart,
          interest: interestCharge,
          balance,
        });
      }
    }

    setResult({
      monthlyPayment,
      totalPayment: totalPaid,
      totalInterest: totalInt,
      payoffMonths: month,
      interestSaved: totalInterestNoExtra - totalInt,
      schedule,
    });
  };

  const fmt = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-emerald-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Repayment Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate your loan payoff schedule with extra payments.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shrink-0">
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">Financial</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Amount ($)</label>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border text-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Interest Rate (%)</label>
              <input type="number" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border text-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Term (Years)</label>
              <input type="number" value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border text-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Extra Monthly Payment ($)</label>
              <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border text-lg" />
            </div>
          </div>
          <button onClick={calculate}
            className="w-full bg-emerald-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-emerald-700 transition shadow-lg text-lg uppercase tracking-wide">
            Calculate Repayment
          </button>
        </div>

        <div className="lg:col-span-7 bg-emerald-50 rounded-xl p-8 border border-emerald-200 shadow-inner flex flex-col justify-center">
          {result ? (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-emerald-900 text-center uppercase tracking-wider">Repayment Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-emerald-100 text-center">
                  <div className="text-xs text-emerald-600 font-bold uppercase mb-1">Monthly Payment</div>
                  <div className="text-2xl font-black text-emerald-700">{fmt(result.monthlyPayment)}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 text-center">
                  <div className="text-xs text-emerald-600 font-bold uppercase mb-1">Total Interest</div>
                  <div className="text-2xl font-black text-emerald-700">{fmt(result.totalInterest)}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 text-center">
                  <div className="text-xs text-emerald-600 font-bold uppercase mb-1">Total Payment</div>
                  <div className="text-2xl font-black text-emerald-700">{fmt(result.totalPayment)}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 text-center">
                  <div className="text-xs text-emerald-600 font-bold uppercase mb-1">Payoff Time</div>
                  <div className="text-2xl font-black text-emerald-700">{Math.floor(result.payoffMonths / 12)}y {result.payoffMonths % 12}m</div>
                </div>
              </div>
              {result.interestSaved > 0.01 && (
                <div className="bg-green-100 border border-green-300 rounded-xl p-4 text-center">
                  <span className="text-green-800 font-bold">💰 You save {fmt(result.interestSaved)} in interest with extra payments!</span>
                </div>
              )}
              {result.schedule.length > 0 && (
                <div className="overflow-x-auto max-h-64 overflow-y-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-emerald-100 sticky top-0">
                      <tr>
                        <th className="p-2 font-bold">Month</th>
                        <th className="p-2 font-bold">Payment</th>
                        <th className="p-2 font-bold">Principal</th>
                        <th className="p-2 font-bold">Interest</th>
                        <th className="p-2 font-bold">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.month} className="border-b border-emerald-50">
                          <td className="p-2">{row.month}</td>
                          <td className="p-2">{fmt(row.payment)}</td>
                          <td className="p-2">{fmt(row.principal)}</td>
                          <td className="p-2">{fmt(row.interest)}</td>
                          <td className="p-2">{fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-emerald-800 opacity-60 font-medium p-8">
              Enter your loan details to see a full repayment breakdown.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Loan Repayment Calculator"
        whatIsIt={<p>A <strong>Repayment Calculator</strong> helps you determine your monthly loan payment, total interest paid, and the impact of extra payments on your payoff timeline. It&apos;s essential for managing debt efficiently.</p>}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Repayment Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Repayment results.
            </p>
          </>
        }
        example={<><p>A $25,000 loan at 6.5% for 5 years:</p><ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700"><li>Monthly Payment: $489.15</li><li>Total Interest: $4,349.09</li><li>Adding $100/month extra saves ~$615 in interest and pays off 10 months early.</li></ul></>}
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Debt Management:</strong> Understand exactly how long it takes to pay off a loan.</li><li><strong>Extra Payment Analysis:</strong> See the savings impact of adding extra monthly payments.</li></ul>}
        faqs={[
          { question: "How accurate is this calculator?", answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only." },
          { question: "Is this tool free to use?", answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions." },
        ]}
        relatedCalculators={[
          { name: "Mortgage Calculator", path: "/mortgage-calculator/", desc: "Estimate monthly mortgage payments including taxes and insurance." },
          { name: "Loan Payment Calculator", path: "/loan-payment-calculator/", desc: "Calculate your monthly loan payments and total interest cost." },
          { name: "Debt Payoff Calculator", path: "/debt-payoff-calculator/", desc: "Discover how long it will take to become debt-free." },
          { name: "Amortization Calculator", path: "/amortization-calculator/", desc: "View a detailed month-by-month breakdown of your loan payoff schedule." },
        ]}
      />
    </div>
  );
}
