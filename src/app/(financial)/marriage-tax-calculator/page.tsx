"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MarriageTaxCalculator() {
  const [person1Income, setPerson1Income] = useState("75000");
  const [person2Income, setPerson2Income] = useState("45000");
  const [standardDeduction, setStandardDeduction] = useState(true);

  const [result, setResult] = useState<{
    filingJointly: number;
    filingSeparately: number;
    difference: number;
    type: "penalty" | "bonus" | "neutral";
  } | null>(null);

  // 2024 Simplified Federal Tax Brackets (Marginal Rates)
  const calculateFederalTax = (taxableIncome: number, filingStatus: "single" | "joint") => {
    const brackets = filingStatus === "single" 
      ? [
          { limit: 11600, rate: 0.10 },
          { limit: 47150, rate: 0.12 },
          { limit: 100525, rate: 0.22 },
          { limit: 191950, rate: 0.24 },
          { limit: 243725, rate: 0.32 },
          { limit: 609350, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
        ]
      : [
          { limit: 23200, rate: 0.10 },
          { limit: 94300, rate: 0.12 },
          { limit: 201050, rate: 0.22 },
          { limit: 383900, rate: 0.24 },
          { limit: 487450, rate: 0.32 },
          { limit: 731200, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
        ];

    let tax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
      if (taxableIncome > previousLimit) {
        const taxableInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
        tax += taxableInBracket * bracket.rate;
        previousLimit = bracket.limit;
      } else {
        break;
      }
    }
    return tax;
  };

  const calculate = () => {
    const p1 = parseFloat(person1Income);
    const p2 = parseFloat(person2Income);
    
    // 2024 Standard Deductions
    const singleDeduction = 14600;
    const jointDeduction = 29200;

    const deduction1 = standardDeduction ? singleDeduction : 0;
    const deduction2 = standardDeduction ? singleDeduction : 0;
    const deductionJoint = standardDeduction ? jointDeduction : 0;

    const taxable1 = Math.max(0, p1 - deduction1);
    const taxable2 = Math.max(0, p2 - deduction2);
    const taxableJoint = Math.max(0, (p1 + p2) - deductionJoint);

    const tax1 = calculateFederalTax(taxable1, "single");
    const tax2 = calculateFederalTax(taxable2, "single");
    const taxJoint = calculateFederalTax(taxableJoint, "joint");

    const filingSeparately = tax1 + tax2;
    const difference = Math.abs(filingSeparately - taxJoint);
    
    let type: "penalty" | "bonus" | "neutral" = "neutral";
    if (taxJoint < filingSeparately) type = "bonus";
    else if (taxJoint > filingSeparately) type = "penalty";

    setResult({
      filingJointly: taxJoint,
      filingSeparately,
      difference,
      type
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight text-nowrap">Marriage Tax Calculator</h1>
          <p className="text-indigo-600 font-medium mt-1">Estimate the tax impact of filing jointly vs. separately.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shrink-0">
          <span className="text-indigo-700 font-bold text-sm uppercase tracking-wider">2024 Federal Brackets</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Partner 1 Annual Income ($)</label>
              <input type="number" value={person1Income} onChange={(e) => setPerson1Income(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Partner 2 Annual Income ($)</label>
              <input type="number" value={person2Income} onChange={(e) => setPerson2Income(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
              <input type="checkbox" checked={standardDeduction} onChange={(e) => setStandardDeduction(e.target.checked)} className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
              <label className="text-sm font-bold text-slate-700 cursor-pointer">Use 2024 Standard Deduction</label>
            </div>

            <button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]">
              Analyze Tax Impact
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className={`grow rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center relative overflow-hidden ${
                result.type === "bonus" ? "bg-gradient-to-br from-emerald-500 to-teal-700" : 
                result.type === "penalty" ? "bg-gradient-to-br from-rose-500 to-red-700" : 
                "bg-gradient-to-br from-slate-600 to-slate-800"
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2 font-mono">
                    Marriage {result.type === "bonus" ? "Bonus" : result.type === "penalty" ? "Penalty" : "Neutral Impact"}
                </div>
                <div className="text-7xl font-black mb-6">
                  ${result.difference.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-white/90 text-sm font-medium leading-relaxed max-w-[300px]">
                    By filing jointly, you pay ${result.difference.toLocaleString()} {result.type === "bonus" ? "less" : "more"} tax than if you were both single.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Joint Tax Bill</div>
                  <div className="text-xl font-black text-slate-800">${result.filingJointly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Combined Single Bill</div>
                  <div className="text-xl font-black text-slate-800">${result.filingSeparately.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-indigo-50/5">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Bonus vs. Penalty</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">The "Marriage Bonus" typically occurs when one spouse earns significantly more. A "Penalty" is more common when both spouses have high, similar incomes.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Marriage Tax Calculator"
        whatIsIt={
          <p>
            A <strong>Marriage Tax Calculator</strong> determines if a couple will pay more (Marriage Penalty) or less (Marriage Bonus) federal income tax by filing jointly compared to filing as two single individuals. It uses the current year's IRS tax brackets and standard deductions to simulate both scenarios.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The calculation follows a binary comparison path:</p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600">
              <li>Calculate single tax for Partner A and Partner B independently using single brackets.</li>
              <li>Calculate joint tax for the combined household income using married filing jointly brackets.</li>
              <li>Subtract Joint Tax from (Tax A + Tax B) to find the delta.</li>
            </ol>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-indigo-700">
              Tax Impact = (Single Tax A + Single Tax B) - Joint Tax
            </div>
          </div>
        }
        example={
          <p>
            If Spouse A earns $100,000 and Spouse B earns $0, they will likely see a significant <strong>Marriage Bonus</strong> because the joint standard deduction and wider brackets are applied to a single income. If both earn $100,000, the benefit is usually neutral at the federal level.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Wedding Planning:</strong> Understanding the financial shift that happens after marriage.</li>
            <li><strong>Filing Strategy:</strong> Deciding whether to file "Married Filing Jointly" or "Married Filing Separately" (though separately is rarely better).</li>
            <li><strong>Withholding Adjustment:</strong> Updating W-4 forms after marriage to avoid underpayment.</li>
          </ul>
        }
        faqs={[
          {
            question: "Is Filing Separately ever better?",
            answer: "Rarely for federal tax alone. It is sometimes beneficial if one spouse has very high medical expenses or student loan payments based on Income-Driven Repayment (IDR) plans."
          },
          {
            question: "What is the standard deduction for 2024?",
            answer: "For Single filers it is $14,600. For Married Filing Jointly, it is $29,200."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
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
            }
          ]}
      />
    </div>
  );
}
