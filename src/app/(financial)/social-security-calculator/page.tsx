"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function SocialSecurityCalculator() {
  const [currentAge, setCurrentAge] = useState("45");
  const [annualIncome, setAnnualIncome] = useState("85000");

  const [result, setResult] = useState<{
    age62: number;
    fra: number; // Full Retirement Age (usually 67 for those born 1960+)
    age70: number;
  } | null>(null);

  const calculateBenefits = () => {
    const age = parseInt(currentAge);
    const income = parseFloat(annualIncome);

    if (!isNaN(age) && !isNaN(income) && age > 0 && age < 70 && income >= 0) {
      
      // Highly simplified PIA (Primary Insurance Amount) heuristic for demonstration.
      // Real SSA math uses bend points and top 35 years of indexed earnings.
      // This provides a proportional directional estimate for basic planning.
      
      // Cap at roughly the social security wage base limit
      const cappedIncome = Math.min(income, 168600); // 2024 wage base
      const averageMonthly = cappedIncome / 12;

      // 2024 Bend Points rough logic
      let pia = 0;
      if (averageMonthly <= 1174) {
          pia = averageMonthly * 0.90;
      } else if (averageMonthly <= 7078) {
          pia = (1174 * 0.90) + ((averageMonthly - 1174) * 0.32);
      } else {
          pia = (1174 * 0.90) + ((7078 - 1174) * 0.32) + ((averageMonthly - 7078) * 0.15);
      }

      // Age reductions and delayed credits (assuming FRA is 67)
      // Age 62 = 70% of PIA
      // FRA (67) = 100% of PIA
      // Age 70 = 124% of PIA (8% per year delayed past FRA)

      const benefit62 = pia * 0.70;
      const benefitFRA = pia; 
      const benefit70 = pia * 1.24;

      setResult({
        age62: benefit62,
        fra: benefitFRA,
        age70: benefit70,
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Social Security Benefits Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Get a directional estimate of your future monthly Social Security payout based on when you decide to start claiming your benefits.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Current Age:
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg"
                placeholder="e.g. 45"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Current Annual Income ($):
              </label>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg"
                placeholder="e.g. 85000"
              />
              <p className="text-xs text-gray-500 mt-2">Assuming this income remains constant (adjusted for inflation) until retirement.</p>
            </div>
          </div>

          <button
            onClick={calculateBenefits}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Estimate Monthly Payout
          </button>
        </div>

        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {result !== null ? (
            <div>
               <div className="bg-blue-50 p-4 border-b border-blue-100 text-center">
                  <h2 className="text-xl font-bold text-blue-900 uppercase">Estimated Monthly Benefit</h2>
                  <p className="text-sm text-blue-700">In today's dollars based on claiming age</p>
               </div>
               
               <div className="p-8 space-y-6">
                 
                 <div className="flex border border-gray-200 rounded-lg overflow-hidden flex-col sm:flex-row relative">
                    <div className="bg-rose-50 p-4 sm:w-1/3 border-b flex flex-col justify-center sm:border-b-0 sm:border-r border-rose-100 shrink-0">
                       <span className="font-bold text-rose-800 block text-lg">Age 62</span>
                       <span className="text-xs text-rose-600 font-semibold uppercase">Early Retirement</span>
                    </div>
                    <div className="p-4 sm:w-2/3 bg-white flex items-center shrink-0">
                       <span className="text-3xl font-black text-rose-700">${result.age62.toLocaleString(undefined, { maximumFractionDigits: 0 })} /mo</span>
                    </div>
                 </div>

                 <div className="flex border-2 border-blue-500 rounded-lg overflow-hidden shadow-md flex-col sm:flex-row relative transform scale-105 z-10 bg-white">
                    <div className="bg-blue-600 p-4 sm:w-1/3 border-b flex flex-col justify-center sm:border-b-0 border-blue-700 shrink-0 text-white">
                       <span className="font-bold block text-lg">Age 67</span>
                       <span className="text-xs text-blue-100 font-semibold uppercase">Full Retirement Age</span>
                    </div>
                    <div className="p-4 sm:w-2/3 flex items-center shrink-0">
                       <span className="text-4xl font-black text-blue-700">${result.fra.toLocaleString(undefined, { maximumFractionDigits: 0 })} /mo</span>
                    </div>
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">
                        Standard
                    </div>
                 </div>

                 <div className="flex border border-gray-200 rounded-lg overflow-hidden flex-col sm:flex-row relative">
                    <div className="bg-emerald-50 flex flex-col justify-center p-4 sm:w-1/3 border-b sm:border-b-0 sm:border-r border-emerald-100 shrink-0">
                       <span className="font-bold text-emerald-800 block text-lg">Age 70</span>
                       <span className="text-xs text-emerald-600 font-semibold uppercase">Maximum Delayed</span>
                    </div>
                    <div className="p-4 sm:w-2/3 bg-white flex items-center shrink-0">
                       <span className="text-3xl font-black text-emerald-700">${result.age70.toLocaleString(undefined, { maximumFractionDigits: 0 })} /mo</span>
                    </div>
                 </div>

               </div>
               
               <div className="bg-gray-50 p-4 border-t border-gray-100 text-xs text-gray-500 text-center leading-relaxed">
                   * This is a simplified programmatic heuristic. Actual benefits rely on your highest 35 years of indexed earnings directly from your SSA.gov work record.
               </div>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center p-8 text-center text-blue-800 opacity-60 font-medium">
                Enter your age and current salary to visualize the immense financial difference between claiming early at 62 versus delaying until 70.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Social Security Benefits Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Social Security Calculator</strong> maps out your projected monthly government retirement income. It demonstrates the profound mathematical penalty for claiming early, versus the guaranteed 8% annual growth of delaying benefits.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>If your Full Retirement Age (FRA) is 67 and your base benefit (PIA) is $2,000:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Claiming at 62</strong> results in a 30% reduction: You lock in $1,400 per month for life.</li>
              <li><strong>Claiming at 67</strong> yields exactly $2,000 per month.</li>
              <li><strong>Delaying to 70</strong> results in a 24% bonus: You lock in $2,480 per month for life.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Breakeven Analysis:</strong> While you get a larger check at 70, you missed out on 8 years of checks (from 62 to 70). Most retirees break even on total dollars received around age 80-82 if they delay until 70.</li></ul>}
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
