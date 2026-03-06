"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RentCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState("5000");
  const [monthlyDebts, setMonthlyDebts] = useState("500");

  const [result, setResult] = useState({
    recommendedRent: 0,
    maxRent: 0,
    incomeRequired30X: 0,
  });

  useEffect(() => {
    calculateRent();
  }, [monthlyIncome, monthlyDebts]);

  const calculateRent = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const debts = parseFloat(monthlyDebts) || 0;

    // 30% rule: standard recommended rent is 30% of gross income
    const recommendedRent = income * 0.3;

    // 43% DTI rule: max rent + debts should not exceed 43% of gross income
    const maxDTI = income * 0.43;
    let maxRent = maxDTI - debts;
    if (maxRent < 0) maxRent = 0;

    // 30x rule: Annual rent should be no more than 1/30th of annual income
    // Or your annual income must be 40x your monthly rent to get approved anywhere natively
    const incomeRequired30X = recommendedRent * 40; // the 40x rule

    setResult({
      recommendedRent,
      maxRent,
      incomeRequired30X,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-sky-800 border-b pb-4">
        Rent Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Discover exactly how much rent you can afford based on the 30% rule and
        your debt-to-income ratio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gross Monthly Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-600 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="0"
                step="100"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-sky-500 font-bold text-2xl text-gray-800"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1">
              Before taxes and deductions
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Monthly Debts
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-600 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="0"
                step="50"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-sky-500 font-bold text-2xl text-gray-800"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1">
              Minimum payments on student loans, CCs, car loans, etc.
            </p>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-sky-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          <div className="w-full flex flex-col h-full">
            <div className="p-8 pb-6 text-center bg-sky-600 border-b border-sky-700 text-white">
              <h3 className="text-sky-200 font-bold uppercase tracking-widest text-[11px] mb-2">
                Recommended Rent Target
              </h3>
              <div className="text-5xl font-black drop-shadow-sm">
                <span className="text-3xl text-sky-300 mr-1">$</span>
                {result.recommendedRent.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-sky-200 text-sm mt-2 font-medium">
                per month (30% Rule)
              </div>
            </div>

            <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                <div>
                  <span className="block font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                    Absolute Maximum Rent
                  </span>
                  <span className="text-[9px] text-gray-400">
                    Based on 43% max DTI
                  </span>
                </div>
                <span className="font-black text-2xl text-rose-600">
                  $
                  {result.maxRent.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border flex-col sm:flex-row border-gray-200">
                <div>
                  <span className="block font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                    Annual Income Required
                  </span>
                  <span className="text-[9px] text-gray-400">
                    For landlord's 40x rule check
                  </span>
                </div>
                <span className="font-bold text-xl text-sky-800 mt-2 sm:mt-0">
                  $
                  {result.incomeRequired30X.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Rent Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Rent Affordability Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Rent Affordability Calculator</strong> removes the
                guessing game from apartment hunting by calculating your exact
                maximum budget based on the industry-standard "30% Rule" and
                corporate landlord Debt-to-Income (DTI) requirements.
              </p>
              <p>
                When applying for an apartment, property managers do not care
                how much money you have saved; they strictly analyze your
                monthly cash flow metrics to ensure the rent is mathematically
                sustainable for your budget.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Property managers use two distinct mathematical hurdles to
                approve tenant applications:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="bg-sky-50 p-4 rounded-lg font-mono text-[14px] text-sky-900 border border-sky-100">
                  <strong>The Landlord 40x Rule:</strong>
                  <br />
                  Annual Income ≥ (Monthly Rent × 40)
                </div>
                <div className="bg-sky-50 p-4 rounded-lg font-mono text-[14px] text-sky-900 border border-sky-100">
                  <strong>The 43% DTI Ceiling:</strong>
                  <br />
                  (Rent + Minimum Debt Payments) ÷ Gross Income ≤ 43%
                </div>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's assume you make <strong>$6,000</strong> a month gross
                (before taxes) but have a <strong>$400</strong> monthly car
                payment and <strong>$300</strong> in minimum student loan
                payments.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The 30% Recommended Target:</strong> 30% of $6,000 is{" "}
                  <strong>$1,800</strong>. This is the financial "sweet spot" to
                  avoid being house-poor.
                </li>
                <li>
                  <strong>The DTI Ceiling:</strong> Your maximum allowed DTI is
                  43% of $6,000, which is $2,580.
                </li>
                <li>
                  <strong>Debt Subtraction:</strong> Because your existing debts
                  eat up $700 of that buffer, your absolute max rent ceiling
                  drops from $2,580 to <strong>$1,880</strong>.
                </li>
                <li>
                  <strong>The Reality Check:</strong> Even though you make $72k
                  a year, applying for a $2,200/mo luxury apartment will result
                  in an automatic algorithmic denial due to your debt load.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Pre-Qualifying Yourself:</strong> Stop throwing away $50
                application fees by running the landlord's math on yourself{" "}
                <em>before</em> applying.
              </li>
              <li>
                <strong>Budget Consolidation:</strong> Realizing that if you pay
                off that $200/month credit card minimum, your maximum approvable
                rent limit instantly jumps by exactly $200.
              </li>
              <li>
                <strong>Roommate Math:</strong> Determining if you absolutely
                need a roommate to qualify for a specific complex by running
                your combined incomes through the 40x multiplier.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Is the 30% rule based on gross income or net income?",
              answer:
                "Landlords and bank algorithms strictly use GROSS income (before taxes and deductions). However, for your personal financial safety, many advisors recommend calculating it based on NET (take-home) pay, especially if you live in a high-tax state.",
            },
            {
              question: "What if I don't meet the 40x rule?",
              answer:
                "You generally have three options: bring in a guarantor (co-signer) who usually needs to meet an 80x income rule, provide massive cash deposits upfront, or find a cheaper unit.",
            },
            {
              question: "Should I include utility costs in this calculator?",
              answer:
                "No. The 40x rule and the 43% DTI ceiling used by leasing agents strictly look at the base lease rent. Utilities, even if required, are rarely factored into the algorithmic approval matrix.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Debt-to-Income (DTI) Calculator",
              path: "/dti-calculator",
              desc: "Evaluate your overall debt profile exactly how mortgage lenders do.",
            },
            {
              name: "Salary Calculator",
              path: "/salary-calculator",
              desc: "Break down your exact gross and net paycheck amounts.",
            },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Compare what buying a house would cost monthly versus renting.",
            },
          ]}
        />
      </div>
    </div>
  );
}
