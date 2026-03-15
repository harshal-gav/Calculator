"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.5");

  const [propertyTax, setPropertyTax] = useState("1.2"); // percentage
  const [homeInsurance, setHomeInsurance] = useState("1500"); // annual
  const [hoaFees, setHoaFees] = useState("0"); // monthly

  const [result, setResult] = useState<{
    principalInterest: number;
    taxes: number;
    insurance: number;
    hoa: number;
    total: number;
    totalInterest: number;
  } | null>(null);

  const calculateMortgage = () => {
    const p = parseFloat(homePrice) - parseFloat(downPayment);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (p > 0 && n > 0) {
      const pi =
        r === 0
          ? p / n
          : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

      const taxes =
        (parseFloat(homePrice) * (parseFloat(propertyTax) / 100)) / 12;
      const insurance = parseFloat(homeInsurance) / 12;
      const hoa = parseFloat(hoaFees) || 0;

      const totalMonthly = pi + taxes + insurance + hoa;
      const totalInt = pi * n - p;

      setResult({
        principalInterest: pi,
        taxes: taxes || 0,
        insurance: insurance || 0,
        hoa: hoa || 0,
        total: totalMonthly,
        totalInterest: totalInt || 0,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-emerald-950 tracking-tighter italic">
            Mortgage <span className="text-emerald-500">Expert</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed">
            Architect your home financing. Calculate monthly PITI payments, analyze interest lifecycles, and stress-test your homeownership budget.
          </p>
        </div>
        <div className="mt-6 md:mt-0 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 hidden lg:block">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Standard Rate Forecast</span>
            <div className="text-xl font-bold text-emerald-900">Current Market: ~6.5% - 7.5%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        {/* Input Control Center */}
        <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 space-y-8 shadow-sm">
          <div className="space-y-6">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Primary Financing</h2>
            
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Home Purchase Price ($)
              </label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full rounded-2xl border-slate-200 p-4 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-black text-2xl text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Down Payment ($)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full rounded-2xl border-slate-200 p-4 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-xl text-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  Term (Yrs)
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full rounded-2xl border-slate-200 p-4 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold"
                >
                  <option value="10">10 Years</option>
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="30">30 Years</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full rounded-2xl border-slate-200 p-4 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest pb-2">Escrow & Fees</h2>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Tax/yr (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(e.target.value)}
                    className="w-full rounded-xl border-slate-200 p-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Insur/yr ($)</label>
                  <input
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(e.target.value)}
                    className="w-full rounded-xl border-slate-200 p-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
               </div>
            </div>

            <div>
               <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Monthly HOA ($)</label>
               <input
                 type="number"
                 value={hoaFees}
                 onChange={(e) => setHoaFees(e.target.value)}
                 className="w-full rounded-xl border-slate-200 p-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
               />
            </div>
          </div>

          <button
            onClick={calculateMortgage}
            className="w-full bg-emerald-600 text-white font-black py-5 rounded-[2rem] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-[0.2em] text-xs active:scale-95"
          >
            Generate Forecast
          </button>
        </div>

        {/* Results Analytical Dashboard */}
        <div className="lg:col-span-8 space-y-8">
          {result !== null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 grayscale opacity-10 group-hover:opacity-100 transition duration-500">🏠</div>
                <div>
                  <h3 className="text-slate-400 font-black uppercase tracking-widest text-[11px] mb-8">Total Monthly Commitment</h3>
                  <div className="text-7xl font-black text-slate-950 tabular-nums tracking-tighter">
                    $
                    {result.total.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                      <p className="text-xs font-bold text-emerald-600 uppercase">Approval Zone Estimated</p>
                  </div>
                </div>
                
                <div className="mt-12 space-y-4 pt-8 border-t border-slate-50">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Principal & Interest</span>
                      <span className="font-black text-slate-900">${result.principalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                   </div>
                   <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{width: `${(result.principalInterest / result.total) * 100}%`}}></div>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>P&I Contribution</span>
                      <span>{Math.round((result.principalInterest / result.total) * 100)}%</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl flex-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
                    <div>
                       <h3 className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-4">Lifecycle Interest</h3>
                       <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
                         $
                         {result.totalInterest.toLocaleString("en-US", {
                           minimumFractionDigits: 0,
                           maximumFractionDigits: 0,
                         })}
                       </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-4 italic">
                        Estimated total interest paid over {loanTerm} years. Making extra principal payments can slash this figure.
                    </p>
                 </div>

                 <div className="bg-emerald-50 rounded-[2.5rem] p-8 flex flex-col justify-between border border-emerald-100 flex-1">
                    <div className="grid grid-cols-2 gap-4 h-full">
                       <div className="flex flex-col justify-center">
                          <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-1">Taxes</h4>
                          <span className="text-xl font-black text-slate-900">${result.taxes.toLocaleString(undefined, {maximumFractionDigits: 0})}/mo</span>
                       </div>
                       <div className="flex flex-col justify-center border-l border-emerald-200 pl-4">
                          <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-1">Insur/HOA</h4>
                          <span className="text-xl font-black text-slate-900">${(result.insurance + result.hoa).toLocaleString(undefined, {maximumFractionDigits: 0})}/mo</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center group">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl group-hover:scale-110 transition-transform duration-700">📜</div>
               <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight italic">Financial Blueprint Required</h3>
               <p className="text-slate-400 text-sm max-w-sm font-medium leading-relaxed">Enter your property valuation and loan parameters to unlock an advanced breakdown of your homeownership liability.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Comprehensive Mortgage Financing & Homeownership Economics"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-6">
              A <strong>Mortgage Calculator</strong> is more than just a payment estimator; it is a vital architectural tool for modern financial planning. Navigating the real estate market requires an objective understanding of how <strong>interest rates</strong>, <strong>down payments</strong>, and <strong>loan terms</strong> interact to create your monthly budget. This calculator provides a granular deconstruction of your potential "PITI" payment—Principal, Interest, Taxes, and Insurance.
            </p>
            <p className="leading-relaxed mb-6">
              The goal of this tool is to provide <strong>mathematical transparency</strong> in a process that is often clouded by emotion and sales tactics. Whether you are a first-time homebuyer testing "affordability zones" or a seasoned homeowner considering a strategic refinance, the data provided here serves as the bedrock for your decision-making process. By projecting not just the monthly commitment, but the <strong>total interest lifecycle</strong>, you can truly see the cost of borrowing over 10, 15, or 30 years.
            </p>
            <p className="leading-relaxed">
              In a volatile market, knowing your exact numbers is your greatest hedge against over-leveraging. Use this tool to stress-test your household cash flow against various interest rate scenarios and localized tax property rates.
            </p>
          </>
        }
        comparisonTable={{
          title: "Structural Impact of Loan Duration: 15-Year vs. 30-Year Mortgage",
          headers: ["Financial Metric", "15-Year Fixed", "30-Year Fixed", "Long-Term Strategy"],
          rows: [
            ["Monthly Obligation", "High (~30-40% more)", "Low / Flexible", "30-year is standard for cash-flow protection."],
            ["Total Interest Cost", "Minimal", "Extremely High", "15-year loans typically save 60% in total interest."],
            ["Base Interest Rate", "Lower (0.50% - 1.0% diff)", "Standard Market Rate", "Shorter durations represent lower risk for banks."],
            ["Equity Formation", "Aggressive", "Back-loaded (Slow)", "15-year builds wealth through home value faster."],
            ["Ideal Scenario", "Wealth Acceleration", "Budget Maxing", "Depends on your 'Real' net income availability."],
          ]
        }}
        formula={
          <div className="space-y-12">
            <section>
              <h4 className="text-2xl font-black text-slate-900 mb-6">The Standard Amortization Formula</h4>
              <p className="text-slate-600 leading-relaxed mb-8 italic">
                The core of every fixed-rate mortgage calculation is based on the compounding annuity formula, which determines the specific payment required to reduce the loan balance to exactly zero over a set number of periods.
              </p>
              <div className="bg-emerald-950 text-white p-12 rounded-[2.5rem] font-mono text-center text-3xl shadow-2xl border border-emerald-500/30 overflow-x-auto">
                M = P [ i(1 + i)ⁿ ] / [ (1 + i)ⁿ - 1 ]
              </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "M", desc: "Total Monthly Principal & Interest" },
                { label: "P", desc: "Principal Amount (Home Price - Down)" },
                { label: "i", desc: "Monthly Interest Rate (Annual Rate / 12)" },
                { label: "n", desc: "Total Payments (Years × 12)" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                   <div className="text-2xl font-black text-emerald-600 mb-2">{item.label}</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 text-center font-medium">
                *Note: The total payment displayed by our calculator adds linear monthly estimates for property taxes, insurance, and HOA fees to this base mathematical result.
            </p>
          </div>
        }
        deepDive={
          <div className="space-y-16">
            <section>
                <h4 className="text-4xl font-black text-slate-950 mb-8 border-l-8 border-emerald-500 pl-8">The Lifecycle of an Interest-Heavy Loan</h4>
                <p className="text-slate-600 leading-relaxed text-lg first-letter:text-5xl first-letter:font-black first-letter:text-emerald-600 first-letter:float-left first-letter:mr-3">
                    During the initial phase of a 30-year mortgage, the majority of your payment—often as much as 80%—is allocated to <strong>interest</strong>. This is because interest is calculated on the remaining principal balance. As you "amortize" the loan, your payments slowly shift to favor the principal. Our calculator provides the "Interest Lifecycle" figure to help you visualize the cost of the bank's capital across the decades.
                </p>
            </section>

            <section className="bg-slate-50 p-12 rounded-[4rem] border border-slate-200 shadow-inner">
               <h4 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Understanding 'Escrow' and PITI Complexity</h4>
               <p className="text-slate-700 leading-relaxed mb-8">
                 Lenders often manage your property taxes and insurance via an **escrow account**. This means you pay 1/12th of your annual bills to the lender each month, and they pay the government on your behalf.
               </p>
               <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <li className="flex space-x-4 italic">
                    <span className="text-emerald-500 font-black">●</span>
                    <span className="text-sm font-medium"><strong>Variable Taxes:</strong> Your payment may rise even if interest rates stay flat, as cities reassess home values and property taxes.</span>
                  </li>
                  <li className="flex space-x-4 italic">
                    <span className="text-emerald-500 font-black">●</span>
                    <span className="text-sm font-medium"><strong>Insurance Adjustments:</strong> Rising construction costs often lead to higher homeowner insurance premiums, further inflating the "PITI" total.</span>
                  </li>
               </ul>
            </section>

            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6">PMI: The Small Down Payment Penalty</h4>
              <p className="text-slate-600 leading-relaxed">
                If your down payment is less than <strong>20%</strong> of the home value, lenders generally require <strong>Private Mortgage Insurance</strong>. This protects the lender, not you. This fee can add $100 - $300 to your monthly payment but can usually be removed once you achieve 20% equity (Loan-to-Value ratio). Use this calculator to see how saving for a larger down payment changes your long-term wealth trajectory.
              </p>
            </section>
          </div>
        }
        example={
          <div className="bg-emerald-950 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 rounded-full filter blur-[120px] opacity-10 group-hover:opacity-20 transition duration-700"></div>
             <div className="relative z-10">
                <h5 className="font-black text-emerald-400 uppercase tracking-widest text-xs mb-10">Case Study: The $500,000 Portfolio Addition</h5>
                <p className="text-xl font-medium leading-relaxed mb-12 text-slate-300">
                  Imagine purchasing a home for <strong>$500,000</strong> with a 10% <strong>($50,000)</strong> down payment on a <strong>30-year term at 7.00%</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                   <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                      <span className="block text-[10px] font-black text-slate-500 uppercase mb-2">Loan Amount</span>
                      <div className="text-4xl font-black text-white">$450,000</div>
                   </div>
                   <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                      <span className="block text-[10px] font-black text-slate-500 uppercase mb-2">P&I Payment</span>
                      <div className="text-4xl font-black text-emerald-400">$2,993.86</div>
                   </div>
                   <div className="p-8 bg-emerald-600 shadow-xl rounded-3xl">
                      <span className="block text-[10px] font-black text-emerald-100 uppercase mb-2">Total (with Escrow)</span>
                      <div className="text-4xl font-black text-white">$3,500+</div>
                   </div>
                </div>
                <div className="border-t border-white/10 pt-8">
                   <p className="text-slate-400 text-sm leading-relaxed max-w-2xl italic font-medium">
                      Outcome: In this scenario, you will pay <strong>$627,789 in total interest</strong> over 30 years—significantly more than the actual price of the house. This demonstrates why the "True Cost" of homeownership is vastly different from the purchase price.
                   </p>
                </div>
             </div>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { icon: "📉", title: "Refinance Analysis", text: "Compare your current rate vs. new terms. Calculate exactly when your monthly savings will exceed the closing costs of the new loan." },
               { icon: "🚜", title: "Equity Projection", text: "Estimate how making an extra $500/month payment reduces your term and saves years of interest." },
               { icon: "🏛️", title: "Investment Flipping", text: "Quickly gauge the carriage costs (holding costs) of a property to ensure your project ROI remains positive." }
             ].map((card, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                   <div className="text-4xl mb-6 group-hover:scale-125 transition duration-500">{card.icon}</div>
                   <h6 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-widest">{card.title}</h6>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">{card.text}</p>
                </div>
             ))}
          </div>
        }
        glossary={[
          { term: "Amortization Schedule", definition: "A table detailing each periodic payment on an amortizing loan (typically a mortgage), showing principal and interest." },
          { term: "LTV (Loan-to-Value)", definition: "The ratio of a loan to the value of an asset purchased, often used to determine PMI status." },
          { term: "Fixed-Rate Mortgage", definition: "A loan where the interest rate remains the same for the entire term of the loan." },
          { term: "ARM (Adjustable-Rate Mortgage)", definition: "A mortgage with an interest rate that is linked to an economic index and adjusts periodically." },
          { term: "Escrow Account", definition: "A separate account held by the lender to pay property taxes and insurance on behalf of the homeowner." },
          { term: "Closing Costs", definition: "Fees associated with the finalization of a real estate transaction, usually 2-5% of the purchase price." },
          { term: "DTI (Debt-to-Income)", definition: "The percentage of gross monthly income used to pay all monthly debt obligations." },
          { term: "Points (Discount Points)", definition: "Fees paid directly to the lender at closing in exchange for a reduced interest rate." },
          { term: "Principal", definition: "The original amount of money borrowed on a loan, separate from interest." },
          { term: "Equity", definition: "The difference between the market value of a property and the outstanding mortgage balance." },
        ]}
        faqs={[
          {
            question: "How do I avoid paying PMI?",
            answer: "The most direct way is to provide a down payment of at least 20% of the home's purchase price. If you already have a mortgage with PMI, you can request its removal once your loan balance reaches 80% of the home's original value (or current appraised value)."
          },
          {
            question: "Does a 15-year mortgage always make sense?",
            answer: "While it saves massive amounts in interest, the much higher monthly payment can be risky if your income is volatile. Many experts suggest taking a 30-year mortgage for safety but paying it as if it were a 15-year loan when cash flow allows."
          },
          {
            question: "What is an 'Escrow Shortage'?",
            answer: "This occurs when your property tax or insurance increases beyond what the lender expected. To compensate, the lender will usually increase your monthly payment to cover the new higher rate AND catch up on the previous underpayment."
          },
          {
            question: "Should I pay 'Points' to lower my rate?",
            answer: "This is a 'break-even' calculation. If the points cost $5,000 but save you $100/month, you must stay in the home for at least 50 months to break even. If you plan to sell in 3 years, points are a waste of money."
          },
          {
            question: "How does a Cash-Out Refinance work?",
            answer: "You take out a new mortgage for more than you owe on your current house and keep the difference in cash. This is essentially 'withdrawing' your home equity, but it increases your total debt and monthly payment."
          }
        ]}
        relatedCalculators={[
          { name: "Rent vs Buy Calculator", path: "/rent-vs-buy", desc: "The definitive analysis to see if owning actually beats renting in your market." },
          { name: "Amortization Schedule", path: "/amortization-calculator", desc: "View the granular month-by-month breakdown of every payment over 30 years." },
          { name: "ROI Calculator", path: "/roi-calculator", desc: "Measure the investment performance of your property after upgrades and repairs." },
          { name: "Income Tax Calculator", path: "/income-tax-calculator", desc: "Estimate how mortgage interest deductions might impact your annual tax liability." }
        ]}
      />
    </div>
  );
}
