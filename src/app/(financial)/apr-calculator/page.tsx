"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function APRCalculator() {
  const [loanAmount, setLoanAmount] = useState("250000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [fees, setFees] = useState("5000");

  const [result, setResult] = useState<{
    apr: number;
    monthlyPayment: number;
    totalInterest: number;
    baseMonthly: number;
  } | null>(null);

  const calculateAPR = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;
    const upfrontFees = parseFloat(fees);

    if (!isNaN(principal) && principal > 0 && !isNaN(rate)) {
      // Base monthly payment (without fees)
      const baseMonthly = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      
      // Calculate APR: we need to find the rate 'r' such that NPV(r) = 0
      // Net Loan = Principal - Fees
      const netPrincipal = principal - upfrontFees;
      
      // Binary search for the APR
      let low = 0;
      let high = 1; // 100%
      let apr = 0;

      for (let i = 0; i < 40; i++) {
        const mid = (low + high) / 2;
        const monthlyRate = mid / 12;
        
        // PVC = MonthlyPayment * (1 - (1+r)^-n) / r
        const pvc = baseMonthly * (1 - Math.pow(1 + monthlyRate, -term)) / monthlyRate;
        
        if (pvc > netPrincipal) {
          low = mid;
        } else {
          high = mid;
        }
        apr = mid;
      }

      setResult({
        apr: apr * 100,
        monthlyPayment: baseMonthly,
        totalInterest: (baseMonthly * term) - principal,
        baseMonthly: baseMonthly
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Effective APR Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Don't get fooled by base rates. Calculate the true Annual Percentage Rate (APR) by including upfront loan fees and closing costs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Amount ($):</label>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Rate (%):</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Years:</label>
                  <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm" />
                </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Total Fees & Costs ($):</label>
              <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm border-2 border-amber-200 focus:border-amber-400" />
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Includes origination, points, processing fees</p>
            </div>
          </div>

          <button
            onClick={calculateAPR}
            className="mt-8 w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition shadow-lg text-lg uppercase"
          >
            Solve for APR
          </button>
        </div>

        <div className="space-y-4">
          {result !== null ? (
            <>
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 text-center shadow-inner">
                    <span className="block text-xs font-bold text-amber-800 uppercase mb-2 tracking-widest">Effective APR</span>
                    <div className="text-6xl font-black text-amber-900 mb-2">
                        {result.apr.toFixed(3)}%
                    </div>
                    <p className="text-amber-700 text-sm font-medium italic">Compared to {interestRate}% nominal rate</p>
                </div>

                <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-sm">
                    <h3 className="font-extrabold text-gray-800 mb-4 border-b pb-2">Loan Summary</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Monthly Payment:</span>
                            <span className="font-bold text-gray-900">${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total Interest:</span>
                            <span className="font-bold text-gray-900">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>
            </>
          ) : (
             <div className="h-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center text-gray-400">
                 <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                 Find the hidden cost of your loan fees.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="APR Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>APR Calculator</strong> (Annual Percentage Rate) helps you compare loans fairly. While an interest rate only accounts for the cost of borrowing the principal, the APR includes points, origination fees, and other mandatory closing costs.
            </p>
          </>
        }
        formula={
          <>
            <p className="text-sm border-l-4 border-amber-500 pl-4 py-2 italic bg-gray-50">
                It is calculated by solving for the internal rate of return (IRR) where the Net Loan Amount equals the present value of all future payments.
            </p>
          </>
        }
        example={
          <>
            <p>If you take a $100,000 loan at 6% interest with $3,000 in upfront fees:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Your nominal rate is 6.00%.</li>
              <li>Your <strong>effective APR will be approximately 6.25%</strong> because you effectively only "received" $97,000 to start.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Comparing Lenders:</strong> Lender A might offer 6.5% with $0 fees, while Lender B offers 6.3% with $10,000 in fees. The APR tool helps you see that Lender A is actually cheaper over the long run.</li></ul>}
        faqs={[
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            },
            {
              question: "Is this tool free to use?",
              answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions.",
            },
            {
              question: "Can I use this on my mobile device?",
              answer: "Absolutely! Our website is fully responsive and optimized for all screen sizes, including smartphones and tablets, so you can calculate on the go.",
            }]}
        relatedCalculators={[
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your exact annualized percentage returns.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator",
              desc: "Project your portfolio growth over time with compound interest.",
            },
            {
              name: "Loan Payment Calculator",
              path: "/loan-payment-calculator",
              desc: "Estimate your monthly loan payments and total interest cost.",
            }]}
      />
    </div>
  );
}
