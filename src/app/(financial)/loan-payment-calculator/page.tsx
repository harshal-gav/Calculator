"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("30000");
  const [loanTerm, setLoanTerm] = useState("60");
  const [interestRate, setInterestRate] = useState("7.5");
  const [termUnit, setTermUnit] = useState("months");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPaid: number;
  } | null>(null);

  useEffect(() => {
    calculatePayment();
  }, [loanAmount, loanTerm, interestRate, termUnit]);

  const calculatePayment = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    let n = parseFloat(loanTerm);

    if (termUnit === "years") {
      n = n * 12;
    }

    if (p > 0 && n > 0) {
      let m = 0;
      if (r > 0) {
        m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        m = p / n;
      }

      const total = m * n;
      const interest = total - p;

      setResult({
        monthlyPayment: m,
        totalInterest: interest,
        totalPaid: total,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-blue-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-900 tracking-tight">
          Loan Payment Calculator
        </h1>
        <p className="text-blue-600 text-lg">
          Determine your monthly loan payments and the total interest cost over time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left Col: Inputs */}
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-6">
          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full bg-white rounded-xl border-blue-200 p-4 pl-8 shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-xl text-blue-900 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
              Interest Rate (APR)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full bg-white rounded-xl border-blue-200 p-4 shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-xl text-blue-900 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold">%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
                Loan Term
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full bg-white rounded-xl border-blue-200 p-4 shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-xl text-blue-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
                Unit
              </label>
              <select
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value)}
                className="w-full bg-white rounded-xl border-blue-200 p-4 shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-xl text-blue-900 transition-all appearance-none"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Col: Output */}
        <div className="flex flex-col justify-center">
          {result ? (
            <div className="bg-blue-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center border border-blue-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none"></div>
              
              <div className="text-center mb-8 relative z-10">
                <h2 className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-2">
                  Monthly Payment
                </h2>
                <div className="text-6xl font-black tracking-tighter">
                  ${result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="space-y-4 relative z-10 w-full">
                <div className="flex justify-between items-center bg-blue-800/50 p-4 rounded-xl border border-blue-700">
                  <span className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Total Interest Paid</span>
                  <span className="text-xl font-bold font-mono text-blue-100">
                    ${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-blue-800/50 p-4 rounded-xl border border-blue-700">
                  <span className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Total Cost of Loan</span>
                  <span className="text-xl font-bold font-mono text-blue-100">
                    ${result.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full border-4 border-dashed border-blue-100 rounded-2xl flex items-center justify-center p-8 text-center bg-blue-50/20">
              <p className="text-blue-400 font-bold text-lg italic uppercase tracking-widest">
                Enter details to view your payment schedule
              </p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Loan Payment & Amortization Calculator"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-4">
              A <strong>Loan Payment Calculator</strong> is an essential tool for navigating the complexities of modern personal finance. It provides an immediate, mathematically precise estimate of your periodic financial obligations when borrowing capital. By calculating the <strong>fixed monthly payment</strong> required to retire a debt, this tool empowers you to make informed decisions about major purchases, debt consolidation, and long-term budgeting.
            </p>
            <p className="leading-relaxed mb-4">
              Modern lending relies on the concept of <strong>amortization</strong>, where each payment is partitioned between interest (the cost of borrowing) and principal (the actual balance). Understanding this breakdown is critical for anyone considering a <strong>personal loan</strong>, <strong>auto loan</strong>, or <strong>student loan</strong>. Our calculator strips away the mystery of banking formulas, giving you the same clarity as a professional loan officer.
            </p>
            <p className="leading-relaxed">
              Whether you are evaluating a low-interest bank offer or considering consolidating high-interest credit card debt into a single, manageable monthly sum, this calculator serves as your primary diagnostic tool for financial health.
            </p>
          </>
        }
        comparisonTable={{
          title: "Loan Term Impact: Total Interest vs. Payment Flexibility",
          headers: ["Loan Term", "Monthly Payment", "Total Interest Paid", "Speed of Payoff", "Best For"],
          rows: [
            ["36 Months (3yr)", "Highest", "Lowest", "Very Fast", "Minimizing total cost"],
            ["48 Months (4yr)", "Moderate", "Moderate", "Average", "Balanced budgets"],
            ["60 Months (5yr)", "Lower", "Higher", "Slow", "Standard auto/personal loans"],
            ["72 Months (6yr)", "Lowest", "Very High", "Very Slow", "Maximum cash flow flexibility"],
          ]
        }}
        formula={
          <div className="space-y-6 text-gray-700">
            <p>
              The calculation of a fixed-rate amortized loan payment is based on the <strong>Periodic Payment Formula</strong>. This formula assumes a fixed interest rate and equal payments over the life of the loan:
            </p>
            <div className="bg-blue-900 p-8 rounded-2xl font-mono text-center text-white shadow-xl my-6">
              <div className="text-xl mb-2 text-blue-300">M = P [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]</div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <li className="bg-blue-50 p-3 rounded-lg border border-blue-100 italic"><strong>M</strong> = Your total monthly payment</li>
              <li className="bg-blue-50 p-3 rounded-lg border border-blue-100 italic"><strong>P</strong> = Principal loan amount (Actual money borrowed)</li>
              <li className="bg-blue-50 p-3 rounded-lg border border-blue-100 italic"><strong>r</strong> = Monthly interest rate (Annual APR / 12 / 100)</li>
              <li className="bg-blue-50 p-3 rounded-lg border border-blue-100 italic"><strong>n</strong> = Number of monthly payments in the total term</li>
            </ul>
            <p className="text-sm border-l-4 border-blue-200 pl-4 py-2 bg-gray-50 uppercase tracking-tighter font-bold">
              Mathematical Fact: Even a 1% reduction in APR can save thousands of dollars on a 5-year loan.
            </p>
          </div>
        }
        deepDive={
          <div className="space-y-10 text-gray-700">
            <section>
              <h4 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">1</span>
                The Mechanics of Loan Amortization
              </h4>
              <p className="leading-relaxed">
                Amortization is the process of gradually reducing the principal balance of a loan over its term. In the early stages of your loan, a high percentage of each payment is allocated toward <strong>interest</strong>. This is because interest is calculated based on the outstanding balance, which is at its highest at the start of the loan. As you make payments and the balance decreases, the interest portion shrinks, allowing more of your money to go directly toward the <strong>principal</strong>.
              </p>
              <p className="mt-4">
                By our calculations, on a 5-year loan at 10%, you don't start paying more principal than interest until roughly the second year of the term.
              </p>
            </section>

            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 shadow-sm transition hover:shadow-md">
              <h4 className="text-xl font-bold text-blue-900 mb-4">The "Prepayment Power" Strategy</h4>
              <p className="leading-relaxed mb-4">
                One of the most effective ways to build wealth is to pay off debt faster than the scheduled term. If your loan has no <strong>prepayment penalties</strong>, adding just $50 or $100 to your principal payment each month can:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-medium">
                <li>Reduce your total interest paid by 15-20%</li>
                <li>Shorten a 60-month loan by nearly a full year</li>
                <li>Improve your credit score by lowering your credit utilization</li>
              </ul>
            </section>

            <section>
              <h4 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">2</span>
                Secured vs. Unsecured Loans
              </h4>
              <p className="leading-relaxed">
                When using this calculator, it's important to know which type of loan you are applying for. <strong>Secured loans</strong> (like auto loans or mortgages) use the asset as collateral, typically resulting in lower interest rates. <strong>Unsecured loans</strong> (like personal loans for travel or debt consolidation) rely solely on your creditworthiness and usually carry higher rates to compensate the lender for the increased risk.
              </p>
            </section>
          </div>
        }
        example={
          <div className="bg-white p-8 rounded-3xl border border-blue-50 shadow-sm transition hover:scale-[1.01]">
            <h5 className="font-black text-blue-900 uppercase tracking-widest text-sm mb-6 border-b pb-4">
              Real-World Case Study: Consolidating $30,000 in Debt
            </h5>
            <div className="flex flex-col md:flex-row gap-8 items-center text-gray-700">
              <div className="flex-1">
                <p className="mb-4">
                  Imagine you have <strong>$30,000</strong> in credit card debt with an average <strong>22% APR</strong>. Your minimum payments are huge, and most goes to interest.
                </p>
                <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-red-900 font-bold mb-4">
                  Monthly Min: ~$800 | Time to Payoff: 20+ years
                </div>
                <p>
                  By taking a <strong>consolidation loan</strong> at <strong>8.5% APR</strong> for <strong>5 years</strong>:
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 gap-3">
                <div className="bg-blue-900 text-white p-5 rounded-2xl shadow-lg text-center">
                  <div className="text-[10px] uppercase font-bold text-blue-300">New Monthly Payment</div>
                  <div className="text-3xl font-black">$615.47</div>
                </div>
                <div className="bg-green-600 text-white p-4 rounded-2xl shadow-md text-center">
                  <div className="text-[10px] uppercase font-bold text-green-100">Interest Saved</div>
                  <div className="text-2xl font-black">$25,000+</div>
                </div>
              </div>
            </div>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-300 transition group text-gray-700">
              <h6 className="font-bold mb-2 group-hover:text-blue-700">Vehicle Financing</h6>
              <p className="text-[11px] leading-relaxed italic">Compare dealer financing vs bank loans to find the highest savings.</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-300 transition group text-gray-700">
              <h6 className="font-bold mb-2 group-hover:text-blue-700">Home Improvement</h6>
              <p className="text-[11px] leading-relaxed italic">Plan the budget for your next kitchen remodel or pool installation.</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-300 transition group text-gray-700">
              <h6 className="font-bold mb-2 group-hover:text-blue-700">Wedding Planning</h6>
              <p className="text-[11px] leading-relaxed italic">Ensure your celebratory spending doesn't lead to long-term stress.</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-300 transition group text-gray-700">
              <h6 className="font-bold mb-2 group-hover:text-blue-700">Major Electronics</h6>
              <p className="text-[11px] leading-relaxed italic">Is that 0% for 12 months offer actually better than a small personal loan?</p>
            </div>
          </div>
        }
        glossary={[
          { term: "APR", definition: "Annual Percentage Rate – Includes interest plus any lender fees for the true cost." },
          { term: "Principal", definition: "The original amount of money borrowed, excluding all interest." },
          { term: "Amortization", definition: "The predictable schedule of paying off debt through installment payments." },
          { term: "Prepayment Penalty", definition: "A fee charged by some lenders if you pay off the loan before the scheduled time." },
          { term: "Secured Loan", definition: "A loan backed by collateral (like a car or house) that the lender can seize if you default." },
          { term: "Unsecured Loan", definition: "A signature loan based on your credit score, without physical collateral." },
          { term: "Default", definition: "Failing to make payments according to the legal terms of the loan agreement." },
          { term: "Term", definition: "The duration of the loan, usually expressed in months (e.g., 60 months)." },
          { term: "Fix-Rate", definition: "An interest rate that remains constant throughout the entire life of the loan." },
          { term: "Loan-to-Value (LTV)", definition: "The ratio of the loan amount to the value of the asset being purchased." },
        ]}
        faqs={[
          {
            question: "Can I use this for any type of loan?",
            answer: "Yes, this calculator works for any loan with a fixed interest rate and equal monthly payments, such as personal, auto, student, or appliance loans."
          },
          {
            question: "How is interest calculated?",
            answer: "Interest is typically calculated 'in arrears' on the remaining principal balance. Each month, the lender takes the APR / 12 and multiplies it by your balance to determine the interest for that month."
          },
          {
            question: "Does my credit score affect my monthly payment?",
            answer: "Directly. Your credit score determines the interest rate (APR) you are offered. A 'Poor' credit score might result in a 25% APR, while an 'Excellent' score might get you 6% for the same loan amount."
          },
          {
            question: "What is the benefit of a shorter loan term?",
            answer: "Lower total interest cost. While the monthly payments are higher, you stop paying interest much sooner, often saving thousands of dollars compared to a longer term."
          },
          {
            question: "What if my loan has a variable interest rate?",
            answer: "This calculator assumes a fixed rate. If you have a variable rate (ARM), your payments will change whenever the underlying index (like the Prime Rate) changes."
          },
          {
            question: "Are there fees not shown in this calculator?",
            answer: "Yes. Lenders often charge 'Origination Fees' or 'Doc Fees' at the start of the loan. These are usually subtracted from the principal you receive but don't change the monthly payment calculation."
          }
        ]}
        relatedCalculators={[
          { name: "Personal Loan Calculator", path: "/personal-loan-calculator/", desc: "Specialized for bank-issued signature loans." },
          { name: "Debt Consolidation", path: "/debt-consolidation-calculator/", desc: "See if combining your bills into one loan saves you money." },
          { name: "Auto Loan Calculator", path: "/auto-loan-calculator/", desc: "Calculates payments specifically for vehicle purchases." },
          { name: "Amortization Table", path: "/amortization-calculator/", desc: "View the full month-by-month repayment schedule." },
        ]}
      />
    </div>
  );
}
