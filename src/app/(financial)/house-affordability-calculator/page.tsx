"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function HouseAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState("100000");
  const [monthlyDebts, setMonthlyDebts] = useState("500");
  const [downPayment, setDownPayment] = useState("50000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("1.2"); // percentage
  const [homeInsurance, setHomeInsurance] = useState("1500"); // annual

  const [result, setResult] = useState<{
    affordableHomePrice: number;
    loanAmount: number;
    maxMonthlyPayment: number;
    principalAndInterest: number;
    monthlyTaxes: number;
    monthlyInsurance: number;
  } | null>(null);

  const calculateAffordability = () => {
    const income = parseFloat(annualIncome) || 0;
    const debts = parseFloat(monthlyDebts) || 0;
    const dp = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTerm) || 30;
    const taxRate = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;

    if (income > 0) {
      const monthlyIncome = income / 12;

      // 28/36 Rule
      // Front-end limit: 28% of gross
      const frontEndLimit = monthlyIncome * 0.28;
      // Back-end limit: 36% of gross minus existing debts
      const backEndLimit = (monthlyIncome * 0.36) - debts;

      const maxPiti = Math.min(frontEndLimit, backEndLimit);

      if (maxPiti <= 0) {
        setResult(null);
        return;
      }

      const r = rate / 100 / 12;
      const n = years * 12;
      const monthlyInsur = insurance / 12;

      // Mortgage constant C
      let C = 0;
      if (r > 0) {
        C = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        C = 1 / n;
      }

      // H = (Max PITI - insurance/12 + D*C) / (C + taxRate/100/12)
      const monthlyTaxPercentage = taxRate / 100 / 12;
      
      let affordableHomePrice = (maxPiti - monthlyInsur + dp * C) / (C + monthlyTaxPercentage);
      
      // If affordable home price is less than Down Payment, something is wrong or debt is too high.
      if (affordableHomePrice < dp) {
        affordableHomePrice = dp;
      }

      const loanAmount = affordableHomePrice - dp;
      const pi = loanAmount * C;
      const monthlyTaxes = affordableHomePrice * monthlyTaxPercentage;

      setResult({
        affordableHomePrice,
        loanAmount,
        maxMonthlyPayment: pi + monthlyTaxes + monthlyInsur,
        principalAndInterest: pi,
        monthlyTaxes,
        monthlyInsurance: monthlyInsur
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        House Affordability Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Find out exactly how much house you can afford. Our calculator uses the standard 36% debt-to-income (DTI) rule favored by most mortgage lenders.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Form */}
        <div className="lg:col-span-7 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Financial Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Annual Gross Income ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Monthly Debts ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">e.g. car payments, student loans, credit cards.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cash Down Payment ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Mortgage Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 font-bold">%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Loan Term (Years)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
              >
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="30">30 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Property Tax (% / year)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Home Insurance ($ / year)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateAffordability}
            className="mt-8 w-full bg-green-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-green-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Affordability
          </button>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-5 bg-green-50 rounded-xl p-8 border border-green-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-xl font-bold text-green-900 mb-2 text-center">
                Max Home Price
              </h2>
              <div className="text-4xl sm:text-5xl font-black text-center text-green-700 mb-8 pb-8 border-b border-green-200">
                ${result.affordableHomePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="flex items-center gap-2">Max Mortgage Amount:</span>
                  <span className="font-bold text-gray-800">
                    ${result.loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                
                <h3 className="font-bold text-green-800 mt-6 mb-2 border-b border-green-200 pb-2">Target Monthly Payment: ${result.maxMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                
                <div className="flex justify-between items-center text-base">
                  <span className="flex items-center gap-2 text-gray-600">Principal & Interest</span>
                  <span className="font-semibold text-gray-800">
                    ${result.principalAndInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base">
                  <span className="flex items-center gap-2 text-gray-600">Property Taxes</span>
                  <span className="font-semibold text-gray-800">
                    ${result.monthlyTaxes.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base">
                  <span className="flex items-center gap-2 text-gray-600">Home Insurance</span>
                  <span className="font-semibold text-gray-800">
                    ${result.monthlyInsurance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-center text-green-800 opacity-60 font-medium">
                Enter your income and current debts to see exactly how much house you can afford.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="House Affordability Calculator"
        whatIsIt={
          <>
            <p>
              When considering buying a home, the first vital question is usually, "<strong>How much house can I afford?</strong>". A <strong>House Affordability Calculator</strong> answers this precisely by analyzing your current annual salary, existing monthly debt obligations, and down payment savings.
            </p>
            <p>
              Instead of guessing a house price, our home affordability tool reverse-engineers the mortgage equation to find your maximum allowable purchasing power without breaking the bank or being denied by lenders.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Related terms:</strong> home affordability calculator, mortgage affordability calculator, income vs home price, 28/36 rule calculator, debt to income ratio calculator.
            </p>
          </>
        }
        formula={
          <>
            <p>Mortgage lenders generally adhere to the <strong>28/36 Rule</strong> to determine your affordability capacity:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>The Front-End Ratio (28%):</strong> Your total monthly housing cost (Principal, Interest, Taxes, and Insurance) should not exceed 28% of your gross monthly income.</li>
              <li><strong>The Back-End Ratio (36%):</strong> Your total monthly housing cost PLUS all your other existing monthly debt payments (student loans, credit cards, auto loans) should not exceed 36% of your gross monthly income.</li>
            </ul>
            <p className="mt-4 text-gray-700">Our calculator evaluates both limits to establish the strict ceiling of your affordability known as Debt-to-Income (DTI).</p>
          </>
        }
        example={
          <>
            <p>If you earn a gross salary of <strong>$100,000 per year</strong> (~$8,333/month) and have <strong>$500 in monthly auto and student loan debts</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Your front-end limit allows: $8,333 * 0.28 = <strong>$2,333/month</strong> for housing.</li>
              <li>Your back-end limit allows: ($8,333 * 0.36) - $500 = <strong>$2,500/month</strong> for housing.</li>
              <li>Your effective maximum housing payment is the lesser of the two: <strong>$2,333/month</strong>.</li>
            </ul>
            <p className="mt-4 text-gray-700">Assuming current interest rates and local property taxes, that $2,333 monthly payment could translate to an affordable home price of roughly <strong>$320,000 to $350,000</strong> depending on your down payment size.</p>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Pre-Approval Confidence:</strong> Understanding your real buying power before submitting to a hard credit pull for a mortgage pre-approval.</li>
            <li><strong>Budgeting:</strong> Determining if you need to pay off existing credit card debt before applying for a loan to increase your back-end DTI.</li>
            <li><strong>Saving:</strong> Seeing exactly how increasing your liquid down payment directly raises the ceiling on your total home price.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is DTI (Debt-to-Income Ratio)?",
            answer: "Debt-to-Income (DTI) is the percentage of your gross monthly income that goes toward paying your monthly debt obligations. Lenders use this ratio as the main measuring stick for loan approval."
          },
          {
            question: "Does this affordability calculator guarantee loan approval?",
            answer: "No. Affordability strictly estimates your borrowing limit based on income and debts (DTI). Lenders also require a healthy credit score (FICO), a history of employment, and adequate cash reserves."
          },
          {
            question: "Why does the interest rate affect affordability?",
            answer: "A higher interest rate exponentially increases the monthly cost to borrow money. If interest rates rise, your $2,000 monthly allowance pays for a much smaller principal mortgage amount, shrinking your affordability."
          }
        ]}
        relatedCalculators={[
          {
            name: "Mortgage Calculator",
            path: "/mortgage-calculator",
            desc: "Estimate your monthly mortgage payments including taxes and insurance."
          },
          {
            name: "Debt Payoff Calculator",
            path: "/debt-payoff-calculator",
            desc: "Discover how long it will take to become debt-free."
          }
        ]}
      />
    </div>
  );
}
