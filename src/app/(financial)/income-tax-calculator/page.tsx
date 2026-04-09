"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import incomeTaxSeoData from "@/data/seo-content/official/income-tax-calculator.json";

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
        title={incomeTaxSeoData.title}
        whatIsIt={incomeTaxSeoData.whatIsIt}
        formula={incomeTaxSeoData.formula}
        example={incomeTaxSeoData.example}
        useCases={incomeTaxSeoData.useCases}
        faqs={incomeTaxSeoData.faqs}
        deepDive={incomeTaxSeoData.deepDive}
        glossary={incomeTaxSeoData.glossary}
        relatedCalculators={[
          {
            name: "Salary Calculator",
            path: "/salary-calculator/",
            desc: "Convert your annual take-home pay into hourly, weekly, or bi-weekly amounts."
          },
          {
            name: "401k Calculator",
            path: "/401k-calculator/",
            desc: "See exactly how much a pre-tax contribution will lower your tax bill."
          },
          {
            name: "ROI Calculator",
            path: "/roi-calculator/",
            desc: "Calculate the after-tax returns on your investment portfolio."
          },
          {
            name: "Net Worth Calculator",
            path: "/net-worth-calculator/",
            desc: "Track your total financial health across assets and liabilities."
          }
        ]}
      />
    </div>
  );
}
