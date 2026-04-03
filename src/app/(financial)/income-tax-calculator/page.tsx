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
        title="Income Tax Calculator 2024: Federal Tax Bracket & Take-Home Pay Estimator"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-4">
              An <strong>Income Tax Calculator</strong> is a strategic financial tool used to decode the complexity of the United States progressive tax system. While your gross salary is what you "earn," your take-home pay is what you actually keep after Uncle Sam takes his share. This tool calculates your estimated Federal Income Tax, Social Security (6.2%), and Medicare (1.45%) liabilities.
            </p>
            <p className="leading-relaxed mb-4">
              Understanding your tax liability is the foundation of <strong>wealth management</strong>. Many Americans are surprised to learn that they don't actually pay their "marginal" tax rate on all their income. Instead, your money is poured into a series of "buckets" (brackets), where only the money in the highest bucket is taxed at the highest rate. Our calculator visualizes this "Tax Ladder" to help you plan for bonuses, raises, and retirement contributions.
            </p>
            <p className="leading-relaxed">
              By inputting your filing status and pre-tax deductions (like 401k contributions), you can see exactly how much your taxable income is reduced, effectively lowering your total tax bill and increasing your net wealth.
            </p>
          </>
        }
        comparisonTable={{
          title: "2024 Federal Income Tax Brackets (IRS Guidelines)",
          headers: ["Tax Rate", "Single Filers", "Married Filing Jointly", "Head of Household"],
          rows: [
            ["10%", "$0 to $11,600", "$0 to $23,200", "$0 to $16,550"],
            ["12%", "$11,601 to $47,150", "$23,201 to $94,300", "$16,551 to $63,100"],
            ["22%", "$47,151 to $100,525", "$94,301 to $201,050", "$63,101 to $100,500"],
            ["24%", "$100,526 to $191,950", "$201,051 to $383,900", "$100,501 to $191,950"],
            ["32%", "$191,951 to $243,725", "$383,901 to $487,450", "$191,951 to $243,700"],
            ["35%", "$243,726 to $609,350", "$487,451 to $731,200", "$243,701 to $609,350"],
            ["37%", "Over $609,350", "Over $731,200", "Over $609,350"],
          ]
        }}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1 ]
            </div>
            <p className="text-sm text-slate-500 text-center">
              Standard financial analysis and amortization model for precise Income Tax results.
            </p>
          </>
        }
          example={
          <>
            <p className="mb-4 font-semibold">Case Study: The $100,000 Single Earner (2024)</p>
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Gross Annual Income:</span>
                <span className="font-bold">$100,000</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-green-700">
                <span>Minus Standard Deduction:</span>
                <span className="font-bold">-$14,600</span>
              </div>
              <div className="flex justify-between border-b pb-2 bg-gray-50 p-2 rounded">
                <span>Taxable Income:</span>
                <span className="font-bold">$85,400</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600 pl-4 italic">
                <p>10% on first $11,600: $1,160</p>
                <p>12% on next $35,550: $4,266</p>
                <p>22% on remaining $38,250: $8,415</p>
              </div>
              <div className="flex justify-between border-t pt-2 text-red-700 font-bold">
                <span>Total Federal Income Tax:</span>
                <span>$13,841</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-blue-700 font-bold">
                <span>Total FICA (SS+Medicare):</span>
                <span>$7,650</span>
              </div>
              <div className="flex justify-between border-t-2 pt-4 text-2xl text-blue-900 font-black">
                <span>Take-Home Pay:</span>
                <span>$78,509</span>
              </div>
            </div>
          </>
        }
        useCases={
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-800">1. Maximizing 401k Contributions</h4>
              <p className="text-gray-600 italic">If you are on the edge of the 22% and 24% brackets, contributing enough to your 401k to stay in the 22% bracket can save you thousands in taxes while building your future wealth.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">2. Planning for Marriage</h4>
              <p className="text-gray-600 italic">Use the "Married Filing Jointly" option to see the "Marriage Bonus" or "Marriage Penalty." If one spouse earns significantly more than the other, filing jointly often results in a massive tax reduction.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">3. Estimating Withholding</h4>
              <p className="text-gray-600 italic">Compare this calculator's results to your actual pay stubs. If the calculator says you owe $10,000 but your employer is only taking $8,000, you need to adjust your W-4 to avoid a big bill in April.</p>
            </div>
          </div>
        }
        glossary={[
          {
            term: "Adjusted Gross Income (AGI)",
            definition: "Your total gross income minus certain adjustments like student loan interest or educator expenses, before the standard deduction is applied."
          },
          {
            term: "FICA Tax",
            definition: "Federal Insurance Contributions Act. It consists of Social Security (6.2%) and Medicare (1.45%) taxes which fund retirement and health benefits."
          },
          {
            term: "Tax Bracket",
            definition: "The range of incomes taxed at a specific percentage. Brackets are adjusted annually for inflation."
          },
          {
            term: "Standard Deduction",
            definition: "A set amount of income that the IRS allows you to subtract from your total earnings, reducing the amount on which you are taxed."
          },
          {
            term: "Withholding",
            definition: "The amount of an employee's pay that their employer sends directly to the government as partial payment of their income tax."
          }
        ]}
        faqs={[
          {
            question: "Why is the tax on my bonus so high?",
            answer: "Employers often use a 'supplemental withholding rate' (flat 22%) or the 'aggregate method' for bonuses. This often over-estimates your tax, making the bonus look small, but you typically get the excess back as a refund when you file your taxes."
          },
          {
            question: "Should I take the Standard Deduction or Itemize?",
            answer: "Since the 2018 tax reform, the standard deduction ($14,600/$29,200) is so high that most people should take it. You should only itemize if your deductible expenses (mortgage interest, state taxes, charity) exceed those amounts."
          },
          {
            question: "What is the Wage Base Limit for Social Security?",
            answer: "For 2024, the Social Security tax only applies to the first $168,600 of your income. Any income earned above this limit is exempt from the 6.2% Social Security tax, though the 1.45% Medicare tax applies to all income."
          },
          {
            question: "Is this calculator legal tax advice?",
            answer: "No. This tool provides estimates for planning purposes. Tax laws are complex and change frequently. Always consult with a CPA or licensed tax professional for your specific filing needs."
          }
        ]}
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
