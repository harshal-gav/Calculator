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
        title="Annual Percentage Rate (APR) Calculator: Find the True Cost of Your Debt"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-4">
              An <strong>Annual Percentage Rate (APR) Calculator</strong> is a mandatory financial transparency tool used to reveal the "all-in" cost of a loan. While the interest rate (nominal rate) tells you the cost of borrowing the principal amount, the APR provides a standardized mathematical representation that includes the base interest rate plus upfront fees, closing costs, points, and other mandatory financial charges.
            </p>
            <p className="leading-relaxed mb-4">
              The APR exists because of the <strong>Truth in Lending Act (TILA)</strong> in the United States and similar consumer protection laws globally. Without APR, lenders could advertise a "low" 3% interest rate while charging $20,000 in upfront fees, making the loan significantly more expensive than a 5% rate with $0 fees. By converting those upfront fees into a percentage and spreading them across the life of the loan, the APR allows borrowers to make accurate, "apples-to-apples" comparisons between different lending offers.
            </p>
            <p className="leading-relaxed">
              Use this calculator to detect hidden costs in mortgages, auto loans, personal loans, and credit cards. If you see a large gap between your interest rate and your APR, it means the upfront fees are high.
            </p>
          </>
        }
        comparisonTable={{
          title: "Representative APR Samples by Loan Type (Market Averages)",
          headers: ["Loan Product", "Nominal Rate", "Estimated Fees", "Monthly Payment", "Effective APR"],
          rows: [
            ["30-Year Mortgage", "6.50%", "$6,000", "$1,580", "6.68%"],
            ["15-Year Mortgage", "5.90%", "$5,500", "$2,100", "6.12%"],
            ["New Auto Loan", "7.20%", "$499", "$580", "7.45%"],
            ["Used Auto Loan", "8.50%", "$250", "$610", "8.65%"],
            ["Personal Loan", "11.00%", "3% Origination", "$220", "11.85%"],
            ["Credit Card", "21.00%", "$0 (Standard)", "Varies", "21.00%"],
          ]
        }}
        formula={
          <>
            <p className="mb-4">
              Unlike the simple interest formula, calculating APR is mathematically complex and usually requires an iterative numerical method (like the binary search used in our tool) to find the <strong>Internal Rate of Return (IRR)</strong>.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-center text-lg mb-4">
                ∑[P / (1 + i)^n] = Net Loan Amount
              </p>
              <p className="text-sm font-sans text-gray-700">
                <strong>Where:</strong>
                <br />P = Monthly Payment amount
                <br />i = Periodic rate (APR / 12)
                <br />n = Total number of payments
                <br />Net Loan Amount = Principal - (Points + Origination Fees + Closing Costs)
              </p>
            </div>
            <p>
              Internally, the calculator looks for the "i" value that makes the present value of all future payments exactly equal to the amount of cash you actually received on day one of the loan.
            </p>
          </>
        }
        deepDive={
          <>
            <h3 className="text-xl font-bold mb-4">APR vs. APY: The Lender's Shell Game</h3>
            <p className="mb-4">
              It is critical to distinguish between <strong>Annual Percentage Rate (APR)</strong> and <strong>Annual Percentage Yield (APY)</strong>. APR is used for borrowing (mortgages, car loans, credit cards). It does <em>not</em> account for compounding interest within the year—it only accounts for upfront costs.
            </p>
            <p className="mb-4">
              APY, on the other hand, is used for savings and investments. APY <em>does</em> account for compounding. Because compounding adds to the cost, the APY of a loan is always higher than its APR if interest is compounded more than once per year. Lenders quote APR because the number looks smaller, and banks quote APY for savings because the number looks larger.
            </p>
            <h3 className="text-xl font-bold mb-4">What Fees Are Included in APR?</h3>
            <p className="mb-4">
              Under federal guidelines, certain fees <strong>must</strong> be included in the APR calculation for mortgages:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
              <li><strong>Points:</strong> Discount points paid to lower the interest rate.</li>
              <li><strong>Origination Fees:</strong> Charges for processing the loan application.</li>
              <li><strong>Underwriting Fees:</strong> Costs for evaluating your creditworthiness.</li>
              <li><strong>Mortgage Insurance (PMI):</strong> Required if your down payment is less than 20%.</li>
            </ul>
            <p>
              Note that "pass-through" costs like title insurance, appraisal fees, and credit report fees are usually <em>excluded</em> from the APR because they are paid to third parties, not kept as profit by the lender.
            </p>
          </>
        }
        example={
          <>
            <p className="mb-4 font-semibold">Scenario: The 3% Loan Trap</p>
            <p className="mb-4">
              Imagine you are borrowing $100,000 for 10 years.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-red-50 rounded shadow-sm">
                <p className="font-bold text-red-800">Lender A (The "Cheap" One)</p>
                <p>Interest Rate: 3.00%</p>
                <p>Upfront Fees: $10,000</p>
                <p className="mt-2 text-red-900 font-bold">Effective APR: 5.12%</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded shadow-sm">
                <p className="font-bold text-emerald-800">Lender B (The "Honest" One)</p>
                <p>Interest Rate: 4.50%</p>
                <p>Upfront Fees: $0</p>
                <p className="mt-2 text-emerald-900 font-bold">Effective APR: 4.50%</p>
              </div>
            </div>
            <p>
              Despite Lender A advertising a rate that is 1.5% lower, the high upfront fees make it significantly more expensive. Over 10 years, you would pay thousands of dollars more to Lender A. Standardizing to APR reveals this hidden cost instantly.
            </p>
          </>
        }
        useCases={
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-800">1. Shopping for Mortgages</h4>
              <p className="text-gray-600">The most common use. Lenders use APR to disclose the cost of "buying down the rate." If you plan to stay in your home for 30 years, paying points for a lower APR makes sense. If you move in 3 years, a higher rate with $0 fees (lower APR) might be better.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">2. Comparing Credit Cards</h4>
              <p className="text-gray-600">Credit cards use APR to describe the interest charged on balances. Note that credit cards often have different APRs for purchases, cash advances, and balance transfers.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">3. Personal and Payday Loans</h4>
              <p className="text-gray-600">Payday loans can have APRs exceeding 400% when fees are annualized. Always use an APR calculator to see the triple-digit reality of short-term lending.</p>
            </div>
          </div>
        }
        glossary={[
          {
            term: "Nominal Interest Rate",
            definition: "The periodic interest rate multiplied by the number of periods per year. This does not include fees or the effects of compounding."
          },
          {
            term: "Internal Rate of Return (IRR)",
            definition: "The discount rate that makes the net present value (NPV) of all cash flows from a project equal to zero. APR is fundamentally an IRR calculation."
          },
          {
            term: "Discount Points",
            definition: "Fees paid directly to the lender at closing in exchange for a reduced interest rate. One point typically equals 1% of the loan amount."
          },
          {
            term: "Amortization",
            definition: "The process of spreading out a loan into a series of fixed payments over time."
          },
          {
            term: "Truth in Lending Act (TILA)",
            definition: "A 1968 federal law designed to promote the informed use of consumer credit by requiring disclosures about its terms and cost."
          }
        ]}
        faqs={[
          {
            question: "Why is my APR higher than my interest rate?",
            answer: "If your APR is higher than your interest rate, it means the lender is charging you extra fees upfront (like origination, processing, or points) that are being 'financed' into the cost of the loan."
          },
          {
            question: "Can APR be lower than the interest rate?",
            answer: "In rare cases, yes. This occurs if the lender provides a 'negative point' or credit toward closing costs. However, this usually results in a higher interest rate to compensate the lender over time."
          },
          {
            question: "Does APR include mortgage insurance?",
            answer: "Yes, under federal law, private mortgage insurance (PMI) or FHA mortgage insurance premiums must be included in the APR calculation because they are a cost of obtaining the credit."
          },
          {
            question: "What is a fixed APR?",
            answer: "A fixed APR means the rate will not change over the life of the loan. This is standard for 30-year mortgages and many personal loans."
          }
        ]}
        relatedCalculators={[
          {
            name: "Mortgage Calculator",
            path: "/mortgage-calculator",
            desc: "Calculate your monthly mortgage payments and amortization schedule."
          },
          {
            name: "APY Calculator",
            path: "/apy-calculator",
            desc: "Calculate the Annual Percentage Yield to see the effect of compounding on savings."
          },
          {
            name: "Loan Payment Calculator",
            path: "/loan-payment-calculator",
            desc: "Estimate your monthly loan payments and total interest cost."
          },
          {
            name: "Personal Loan Calculator",
            path: "/personal-loan-calculator",
            desc: "Calculate payments and see if consolidation makes sense for you."
          }
        ]}
      />
    </div>
  );
}
