"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function FHALoanCalculator() {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("3.5");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");

  // FHA specific standard values
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.2");
  const [homeInsurance, setHomeInsurance] = useState("1200"); // Annual

  const [result, setResult] = useState({
    principalAndInterest: 0,
    propertyTax: 0,
    homeownersInsurance: 0,
    monthlyMIP: 0,
    totalMonthlyPayment: 0,
    upfrontMIP: 0,
    totalLoanAmount: 0, // base + upfront MIP
  });

  useEffect(() => {
    calculateFHALoan();
  }, [
    homePrice,
    downPaymentPercent,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeInsurance,
  ]);

  const calculateFHALoan = () => {
    const price = parseFloat(homePrice) || 0;
    const downPct = parseFloat(downPaymentPercent) || 3.5;
    const rate = parseFloat(interestRate) || 0;
    const termYears = parseFloat(loanTerm) || 30;
    const propTaxRt = parseFloat(propertyTaxRate) || 1.2;
    const hoIns = parseFloat(homeInsurance) || 0;

    const downPayment = price * (downPct / 100);
    const baseLoanAmount = price - downPayment;

    // FHA Upfront Mortgage Insurance Premium (UFMIP) is typically 1.75% of the base loan amount
    const upfrontMIP = baseLoanAmount * 0.0175;

    // Total Loan Amount = Base Loan + UFMIP
    const totalLoanAmount = baseLoanAmount + upfrontMIP;

    // Monthly Principal & Interest Calculation
    const monthlyRate = rate / 100 / 12;
    const totalMonths = termYears * 12;
    let principalAndInterest = 0;
    if (monthlyRate === 0) {
      principalAndInterest = totalLoanAmount / totalMonths;
    } else {
      principalAndInterest =
        (totalLoanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // FHA Annual MIP calculation (Simplified: typically 0.55% for 30yr <95% LTV, or 0.80% for >95% LTV)
    // Note: New rules changed this to 0.55% for most borrowers (LTV > 95%), down from 0.85% for standard 30 year
    // We will default to 0.55% here as the standard new proxy.
    const annualMIPRate = downPct < 5 ? 0.0055 : 0.005;
    const annualMIP = baseLoanAmount * annualMIPRate;
    const monthlyMIP = annualMIP / 12;

    const propertyTax = (price * (propTaxRt / 100)) / 12;
    const homeownersInsurance = hoIns / 12;

    const totalMonthlyPayment =
      principalAndInterest + propertyTax + homeownersInsurance + monthlyMIP;

    setResult({
      principalAndInterest,
      propertyTax,
      homeownersInsurance,
      monthlyMIP,
      totalMonthlyPayment,
      upfrontMIP,
      totalLoanAmount,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-indigo-800 border-b pb-4">
        FHA Loan Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your precise FHA mortgage payment including Upfront MIP,
        Annual MIP, Taxes, and Insurance.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-7 bg-indigo-50 p-6 rounded-xl border border-indigo-100 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 font-bold text-lg">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                  className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-indigo-500 font-bold text-2xl text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Down Payment (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="3.5"
                  step="0.5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 pr-8 shadow-sm focus:border-indigo-500 font-bold text-gray-800"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  %
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1 pl-1">
                FHA Min is 3.5%
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 pr-8 shadow-sm focus:border-indigo-500 font-bold text-gray-800"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loan Term
              </label>
              <div className="relative">
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-indigo-500 font-bold bg-white text-gray-800"
                >
                  <option value="30">30 Years</option>
                  <option value="15">15 Years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prop. Tax Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={propertyTaxRate}
                  onChange={(e) => setPropertyTaxRate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 pr-8 shadow-sm focus:border-indigo-500 font-bold text-gray-800"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="lg:col-span-5 bg-white border-2 border-indigo-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-start">
          <div className="p-6 text-center bg-indigo-700 border-b border-indigo-800 text-white shadow-inner">
            <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-[11px] mb-2">
              Estimated Monthly Payment
            </h3>
            <div className="text-5xl font-black drop-shadow-md">
              <span className="text-3xl font-bold text-indigo-300 mr-1">$</span>
              {result.totalMonthlyPayment.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          </div>

          <div className="p-6 flex-grow bg-gray-50 flex flex-col justify-start space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-2">
              Payment Breakdown
            </h4>

            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="font-bold text-gray-600 text-sm">
                  Principal & Interest
                </span>
              </div>
              <span className="font-black text-gray-800">
                $
                {result.principalAndInterest.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="font-bold text-gray-600 text-sm">
                  Property Taxes
                </span>
              </div>
              <span className="font-black text-gray-800">
                $
                {result.propertyTax.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                <span className="font-bold text-gray-600 text-sm">
                  Home Insurance
                </span>
              </div>
              <span className="font-black text-gray-800">
                $
                {result.homeownersInsurance.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-indigo-200 bg-indigo-50/50">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
                <span className="font-bold text-indigo-800 text-sm">
                  FHA MIP (PMI)
                </span>
              </div>
              <span className="font-black text-indigo-800">
                $
                {result.monthlyMIP.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                FHA Cost Facts
              </h4>
              <div className="flex justify-between text-sm mb-1 text-gray-600">
                <span>Upfront MIP (+1.75%):</span>
                <span className="font-bold">
                  +$
                  {result.upfrontMIP.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Loan Amount:</span>
                <span className="font-bold">
                  $
                  {result.totalLoanAmount.toLocaleString("en-US", {
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
            name: "FHA Loan Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="FHA Mortgage Calculator (UFMIP & MIP)"
          whatIsIt={
            <>
              <p>
                The <strong>FHA Loan Calculator</strong> models exact monthly
                payments under the stricter financial mechanics of Federal
                Housing Administration loans. It automatically calculates the
                mandatory{" "}
                <strong>Upfront Mortgage Insurance Premium (UFMIP)</strong> and
                the ongoing <strong>Annual MIP</strong>.
              </p>
              <p>
                FHA loans are highly popular for first-time homebuyers because
                they only require a 3.5% down payment and permit lower credit
                scores. However, the Federal Government mandates strict
                insurance premiums to protect themselves from that higher
                default risk. A standard mortgage calculator will dangerously
                underestimate an FHA monthly payment.
              </p>
            </>
          }
          formula={
            <>
              <p>
                FHA loans have two unique layers of mandatory insurance that
                mathematically stack onto the standard Principal & Interest
                (P&I) calculations:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="bg-indigo-50 p-4 rounded-lg font-mono text-[14px] text-indigo-900 border border-indigo-100">
                  <strong>Upfront MIP (UFMIP):</strong>
                  <br />
                  1.75% × Base Loan Amount
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg font-mono text-[14px] text-indigo-900 border border-indigo-100">
                  <strong>Annual MIP (Monthly):</strong>
                  <br />
                  (0.55% × Base Loan) ÷ 12
                </div>
              </div>
              <p className="text-sm mt-2">
                <strong>Note on limits:</strong> The UFMIP is rarely paid out of
                pocket—it is financed directly onto your principal loan balance
                on day one, meaning you will pay interest on that 1.75% for 30
                years.
              </p>
            </>
          }
          example={
            <>
              <p>
                Let's calculate a <strong>$300,000</strong> home purchase using
                the FHA minimum <strong>3.5% down payment</strong> ($10,500).
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Base Loan:</strong> $289,500
                </li>
                <li>
                  <strong>The Hidden UFMIP Penalty:</strong> The FHA immediately
                  slaps a 1.75% premium onto that amount ($5,066) and rolls it
                  into your debt. Your <em>actual</em> starting loan balance is
                  now <strong>$294,566</strong>.
                </li>
                <li>
                  <strong>The Monthly MIP Penalty:</strong> You will be charged
                  an extra 0.55% annually just for having an FHA loan with
                  minimal down payment. That adds <strong>$132</strong> to your
                  mortgage bill every single month.
                </li>
                <li>
                  <strong>The Reality Check:</strong> While the 3.5% down
                  payment got you into the house, thousands of dollars in hidden
                  FHA insurance premiums silently inflate your actual borrowing
                  costs over the 30-year term.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>First-Time Buyers:</strong> Sizing up exactly how much
                house you can afford using the FHA 3.5% down program versus a
                Conventional 5% down program.
              </li>
              <li>
                <strong>FHA Down Payment Optimization:</strong> Seeing if making
                a 5% or 10% down payment significantly alters the Annual MIP
                tier compared to the bare minimum 3.5%.
              </li>
              <li>
                <strong>Refinance Checking:</strong> For current FHA homeowners
                wondering if they should refinance into a Conventional loan
                specifically to escape the permanent FHA MIP penalty.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does FHA Mortgage Insurance ever fall off?",
              answer:
                "Under current rules, if you put down LESS than 10% at closing, the FHA Annual MIP remains for the ENTIRE LIFE of the loan. The only way to remove it is to refinance into a Conventional loan once you hit 20% equity. If you put down 10% or more natively, the MIP falls off after 11 years.",
            },
            {
              question: "Is FHA MIP the same thing as PMI?",
              answer:
                "Conceptually, yes. They both protect the lender if you default. Technically, PMI (Private Mortgage Insurance) is for Conventional loans and can be cancelled at 20% equity. MIP (Mortgage Insurance Premium) is specific to government FHA loans and is often permanent.",
            },
            {
              question: "Can I pay the Upfront MIP in cash?",
              answer:
                "Yes, you are legally permitted to pay the 1.75% UFMIP out of your own pocket at closing, rather than rolling it into the loan. However, very few borrowers do this, as the main draw of an FHA loan is minimizing upfront cash requirements.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "For calculating standard Conventional loans without the mandatory FHA UFMIP layer.",
            },
            {
              name: "Refinance Calculator",
              path: "/refinance-calculator",
              desc: "Calculate if escaping your FHA MIP via refinancing mathematically justifies the closing costs.",
            },
            {
              name: "Rent Calculator",
              path: "/rent-calculator",
              desc: "Discover what maximum housing payment you can algorithmically afford.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your exact annualized percentage returns.",
            }]}
        />
      </div>
    </div>
  );
}
