"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState("75000");
  const [filingStatus, setFilingStatus] = useState("single");
  const [retirementContribution, setRetirementContribution] = useState("0");

  const [result, setResult] = useState<{
    federalTax: number;
    ficaTax: number;
    totalTax: number;
    effectiveRate: number;
    takeHomePay: number;
  } | null>(null);

  // 2024 Rough Tax Brackets (Standard Deduction built-in approximately for demonstration)
  const calculateTax = () => {
    const grossIncome = parseFloat(income);
    const retirement = parseFloat(retirementContribution) || 0;
    
    if (grossIncome > 0) {
      // Standard deductions (2024)
      const standardDeduction = filingStatus === "single" ? 14600 : 29200;
      const taxableIncome = Math.max(0, grossIncome - retirement - standardDeduction);

      let federalTax = 0;
      
      // Single Brackets 2024
      if (filingStatus === "single") {
        const brackets = [
          { limit: 11600, rate: 0.10 },
          { limit: 47150, rate: 0.12 },
          { limit: 100525, rate: 0.22 },
          { limit: 191950, rate: 0.24 },
          { limit: 243725, rate: 0.32 },
          { limit: 609350, rate: 0.35 },
          { limit: Infinity, rate: 0.37 },
        ];
        
        let remaining = taxableIncome;
        let prevLimit = 0;
        
        for (const bracket of brackets) {
          const chunk = Math.min(remaining, bracket.limit - prevLimit);
          if (chunk > 0) {
            federalTax += chunk * bracket.rate;
            remaining -= chunk;
            prevLimit = bracket.limit;
          } else {
            break;
          }
        }
      } else {
        // Married Filing Jointly 2024
        const brackets = [
          { limit: 23200, rate: 0.10 },
          { limit: 94300, rate: 0.12 },
          { limit: 201050, rate: 0.22 },
          { limit: 383900, rate: 0.24 },
          { limit: 487450, rate: 0.32 },
          { limit: 731200, rate: 0.35 },
          { limit: Infinity, rate: 0.37 },
        ];
        
        let remaining = taxableIncome;
        let prevLimit = 0;
        
        for (const bracket of brackets) {
          const chunk = Math.min(remaining, bracket.limit - prevLimit);
          if (chunk > 0) {
            federalTax += chunk * bracket.rate;
            remaining -= chunk;
            prevLimit = bracket.limit;
          } else {
            break;
          }
        }
      }

      // FICA Taxes (Social Security 6.2% up to $168,600 + Medicare 1.45%)
      const ssTax = Math.min(grossIncome, 168600) * 0.062;
      const medicareTax = grossIncome * 0.0145;
      const ficaTax = ssTax + medicareTax;

      const totalTax = federalTax + ficaTax;
      const takeHomePay = grossIncome - totalTax - retirement;
      const effectiveRate = (totalTax / grossIncome) * 100;

      setResult({
        federalTax,
        ficaTax,
        totalTax,
        effectiveRate,
        takeHomePay
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Income Tax Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Estimate your Federal Income Tax, FICA deductions, and exact Take-Home Pay using the newest 2024 IRS Tax Brackets.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Form */}
        <div className="lg:col-span-7 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Income Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Annual Gross Income ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg font-medium bg-white"
              >
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pre-Tax Deductions (401k / IRA)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={retirementContribution}
                  onChange={(e) => setRetirementContribution(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg font-medium"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Reduces your taxable income.</p>
            </div>
          </div>

          <button
            onClick={calculateTax}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Taxes
          </button>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-5 bg-blue-50 rounded-xl p-8 border border-blue-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-2 text-center">
                Estimated Take-Home Pay
              </h2>
              <div className="text-4xl sm:text-5xl font-black text-center text-blue-700 mb-8 pb-8 border-b border-blue-200">
                ${result.takeHomePay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div> Federal Income Tax
                  </span>
                  <span className="font-bold text-gray-800">
                    ${result.federalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div> FICA (SS & Medicare)
                  </span>
                  <span className="font-bold text-gray-800">
                    ${result.ficaTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {parseFloat(retirementContribution) > 0 && (
                  <div className="flex justify-between items-center text-lg">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div> Pre-Tax Contributions
                    </span>
                    <span className="font-bold text-gray-800">
                      ${parseFloat(retirementContribution).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-blue-200 flex justify-between font-bold text-lg text-gray-700">
                <span>Effective Tax Rate:</span>
                <span>{result.effectiveRate.toFixed(2)}%</span>
              </div>
            </div>
          ) : (
            <div className="text-center text-blue-800 opacity-60 font-medium">
              Enter your income and filing status, then click calculate to view your tax breakdown.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Income Tax Calculator"
        whatIsIt={
          <>
            <p>
              An <strong>Income Tax Calculator</strong> is a specialized financial tool that estimates the amount of Federal Income Tax and FICA tax (Social Security and Medicare) you owe based on your annual gross income. It also determines your net <strong>Take-Home Pay</strong> after all taxes have been deducted.
            </p>
            <p>
              By using our up-to-date IRS progressive tax brackets, this tax refund estimator acts almost like a simplified H&R Block Tax Calculator or standard IRS Tax Calculator, determining how much of your paycheck ends up in your pocket.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Related terms:</strong> hr block tax calculator, irs tax calculator, federal tax calculator, net pay calculator, take-home paycheck calculator, tax refund estimator, single filer tax return calculator.
            </p>
          </>
        }
        formula={
          <>
            <p>The United States uses a <strong>progressive tax system</strong>, meaning your income is taxed at different rates across different bracket levels.</p>
            <ol className="list-decimal pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Find Taxable Income:</strong> Gross Income - Pre-Tax Deductions (like a 401k Calculator) - Standard Deduction.</li>
              <li><strong>Calculate Brackets:</strong> Taxable Income is filtered through the 10%, 12%, 22%, 24%, 32%, 35%, and 37% brackets depending on how high the income reaches.</li>
              <li><strong>Calculate FICA:</strong> 6.2% for Social Security (up to the wage base limit) and 1.45% for Medicare.</li>
              <li><strong>Net Take Home:</strong> Gross Income - Federal Tax - FICA Tax.</li>
            </ol>
          </>
        }
        example={
          <>
            <p>If you are a <strong>Single</strong> filer earning <strong>$75,000</strong> per year in 2024 with no 401k deductions:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Your Gross Income is $75,000.</li>
              <li>You take the Standard Deduction of $14,600, bringing your Taxable Income to $60,400.</li>
              <li>You pay 10% on the first $11,600.</li>
              <li>You pay 12% on the income up to $47,150.</li>
              <li>You pay 22% on the income above $47,150 up to $60,400.</li>
              <li>You pay a separate flat 7.65% FICA tax on your full $75,000 ($5,737.50).</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Job Offers:</strong> Transitioning to a new role and wanting to see your actual post-tax take home pay rather than just the gross salary.</li>
            <li><strong>Tax Prep:</strong> Roughly predicting if you will owe the IRS money during tax season or if you're due for a refund.</li>
            <li><strong>Retirement Planning:</strong> Seeing exactly how much adjusting your 401k contribution will lower your tax liability.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is the Standard Deduction?",
            answer: "The Standard Deduction is a specific dollar amount that reduces your taxable income, depending on your filing status. For 2024, it is $14,600 for Single filers and $29,200 for Married Filing Jointly."
          },
          {
            question: "Does this calculator include State Taxes?",
            answer: "No, this calculator strictly estimates Federal Income Tax and Federal FICA taxes. State income taxes vary drastically depending on your location, with some states having zero income tax and others having complex progressive rates of their own."
          },
          {
            question: "How do 401k deductions affect my taxes?",
            answer: "Traditional 401k or IRA contributions (pre-tax) directly reduce your taxable income. For example, if you make $80,000 but put $5,000 into a 401k, the IRS only taxes you as if you made $75,000."
          }
        ]}
        relatedCalculators={[
          {
            name: "Salary Calculator",
            path: "/salary-calculator",
            desc: "Convert your salary equivalent between hourly, daily, weekly, and annual amounts."
          },
          {
            name: "401k Calculator",
            path: "/401k-calculator",
            desc: "Estimate the future value of your retirement savings."
          },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your exact annualized percentage returns.",
            }]}
      />
    </div>
  );
}
