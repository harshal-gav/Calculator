"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import estateSeoData from "@/data/seo-content/official/estate-tax-calculator.json";

export default function EstateTaxCalculator() {
  const [estateValue, setEstateValue] = useState("15000000"); // 15M
  const [maritalStatus, setMaritalStatus] = useState<"single" | "married">("single");
  const [passingToSpouse, setPassingToSpouse] = useState(false);

  const [result, setResult] = useState<{
    totalEstate: number;
    exemptionAmount: number;
    taxableEstate: number;
    estimatedTax: number;
  } | null>(null);

  const calculateEstateTax = () => {
    const total = parseFloat(estateValue);
    
    if (!isNaN(total) && total >= 0) {
      // 2024 Federal Exemption is roughly $13,610,000 per individual
      const baseExemption = 13610000;
      let actualExemption = maritalStatus === "married" ? baseExemption * 2 : baseExemption;

      let taxable = 0;
      let tax = 0;

      if (maritalStatus === "married" && passingToSpouse) {
         // Unlimited marital deduction
         taxable = 0;
         tax = 0;
         actualExemption = total; // effectively all exempt
      } else {
         taxable = Math.max(0, total - actualExemption);
         
         // Simplified Federal Estate Tax calculation (usually 40% on amounts significantly over the exemption)
         if (taxable > 1000000) {
             tax = 345800 + (taxable - 1000000) * 0.40; 
         } else if (taxable > 0) {
             // simplified blended rate for smaller non-exempt estates
             tax = taxable * 0.35; 
         }
      }

      setResult({
        totalEstate: total,
        exemptionAmount: actualExemption,
        taxableEstate: taxable,
        estimatedTax: tax,
      });
    } else {
       setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Federal Estate Tax Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Determine if your net worth exceeds the federal estate tax exemption limit and estimate the potential liability for your heirs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Total Estimated Estate Value ($):
              </label>
              <input
                type="number"
                value={estateValue}
                onChange={(e) => setEstateValue(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border text-lg"
                placeholder="e.g. 15000000"
              />
              <p className="text-xs text-gray-500 mt-2">Includes real estate, cash, stocks, and business assets.</p>
            </div>

            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">
                 Marital Status:
               </label>
               <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                 <button
                    className={`flex-1 py-3 text-sm font-bold transition ${maritalStatus === "single" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => { setMaritalStatus("single"); setPassingToSpouse(false); }}
                 >
                   Single
                 </button>
                 <button
                    className={`flex-1 py-3 text-sm font-bold transition ${maritalStatus === "married" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                    onClick={() => setMaritalStatus("married")}
                 >
                   Married
                 </button>
               </div>
            </div>

            {maritalStatus === "married" && (
              <div className="bg-white p-4 rounded border border-emerald-100 shadow-sm">
                 <label className="flex items-center space-x-3 cursor-pointer">
                   <input
                     type="checkbox"
                     checked={passingToSpouse}
                     onChange={(e) => setPassingToSpouse(e.target.checked)}
                     className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
                   />
                   <span className="text-sm font-medium text-gray-700">Are all assets passing directly to a U.S. citizen spouse?</span>
                 </label>
                 <p className="text-xs text-gray-500 mt-2 ml-8">This activates the unlimited marital deduction.</p>
              </div>
            )}
          </div>

          <button
            onClick={calculateEstateTax}
            className="mt-8 w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Estate Tax
          </button>
        </div>

        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div className="w-full">
                <div className="text-sm text-gray-500 font-bold uppercase mb-2 text-center tracking-wider text-emerald-800">
                    Estimated Federal Tax
                </div>
                <div className="text-5xl md:text-6xl font-black text-center text-rose-600 bg-white py-6 rounded-lg shadow-sm border border-rose-100 mb-6 break-words">
                    ${result.estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm bg-white p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Total Estate Value:</span>
                      <span className="font-bold text-gray-800">
                         ${result.totalEstate.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-emerald-100 p-3 rounded shadow-sm border border-emerald-200 text-emerald-800">
                      <span className="font-semibold">Federal Exemption (2024):</span>
                      <span className="font-bold">
                         - ${result.exemptionAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-white p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Taxable Estate Subject to 40%:</span>
                      <span className="font-bold text-rose-600">
                         ${result.taxableEstate.toLocaleString()}
                      </span>
                    </div>
                </div>

                <div className="mt-6 text-xs text-emerald-800 text-center bg-emerald-100/50 p-3 rounded border border-emerald-200">
                    * This is a simplified estimate for 2024 federal rates. State-level estate or inheritance taxes may apply separately and are not included here.
                </div>
            </div>
          ) : (
             <div className="text-center text-emerald-800 opacity-60 font-medium px-4">
                Enter your total net worth to see if your heirs will face the 40% federal estate tax upon passing.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={estateSeoData.title}
        whatIsIt={estateSeoData.whatIsIt}
        formula={estateSeoData.formula}
        example={estateSeoData.example}
        useCases={estateSeoData.useCases}
        faqs={estateSeoData.faqs}
        deepDive={estateSeoData.deepDive}
        glossary={estateSeoData.glossary}
        relatedCalculators={[
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Calculate your return on investment for asset purchases.",
          },
          {
            name: "Mortgage",
            path: "/mortgage-calculator/",
            desc: "Calculate your monthly mortgage payments and amortization schedule.",
          },
          {
            name: "Investment",
            path: "/investment-calculator/",
            desc: "Project your portfolio growth over time with compound interest.",
          },
          {
            name: "Loan Payment",
            path: "/loan-payment-calculator/",
            desc: "Estimate your monthly loan payments and total interest cost.",
          },
        ]}
      />
    </div>
  );
}
