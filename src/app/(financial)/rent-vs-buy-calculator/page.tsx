"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [mortgageRate, setMortgageRate] = useState("6.5");
  const [mortgageTerm, setMortgageTerm] = useState("30");
  const [monthlyRent, setMonthlyRent] = useState("2500");
  const [years, setYears] = useState("10");

  const [result, setResult] = useState<{
    buyingCost: number;
    rentingCost: number;
    difference: number;
    winner: "buying" | "renting";
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(homePrice);
    const D = parseFloat(downPayment);
    const r = parseFloat(mortgageRate) / 100 / 12;
    const n = parseInt(mortgageTerm) * 12;
    const R = parseFloat(monthlyRent);
    const y = parseInt(years);

    if (!isNaN(P) && !isNaN(D) && !isNaN(r) && !isNaN(R)) {
      const loanAmount = P - D;
      const monthlyMortgage = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      
      const totalMortgage = monthlyMortgage * y * 12;
      const totalMaintenance = P * 0.01 * y; // 1% annual maintenance
      const totalTax = P * 0.012 * y; // 1.2% annual tax
      const totalInsurance = P * 0.005 * y; // 0.5% annual insurance
      
      const buyingCost = totalMortgage + totalMaintenance + totalTax + totalInsurance + D;
      
      // Renting cost (simplified 3% annual increase)
      let rentingCost = 0;
      let currRent = R;
      for (let i = 0; i < y; i++) {
        rentingCost += currRent * 12;
        currRent *= 1.03;
      }
      
      const diff = Math.abs(buyingCost - rentingCost);
      const winner = buyingCost < rentingCost ? "buying" : "renting";

      setResult({
        buyingCost,
        rentingCost,
        difference: diff,
        winner
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-teal-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-teal-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-teal-900 tracking-tight">Rent vs. Buy Calculator</h1>
          <p className="text-teal-600 font-medium mt-1">Compare the total cost of ownership vs. long-term renting.</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-full border border-teal-100 shrink-0">
          <span className="text-teal-700 font-bold text-sm uppercase tracking-wider text-nowrap">Real Estate Planning</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12">
           <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm mb-4 flex items-start gap-3">
              <svg className="w-5 h-5 grow-0 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p>Selection depends on market conditions. This model includes 1% maintenance, 1.2% property tax, and 0.5% insurance for buyers, with 3% annual rent increases for tenants.</p>
           </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest border-b pb-2 mb-4">Buying Assumptions</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Home Price ($)</label>
              <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Down Payment ($)</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Int. Rate (%)</label>
                <input type="number" value={mortgageRate} onChange={(e) => setMortgageRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Term (Yrs)</label>
                <input type="number" value={mortgageTerm} onChange={(e) => setMortgageTerm(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
            </div>

            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest border-b pb-2 mt-8 mb-4">Renting Assumptions</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Monthly Rent ($)</label>
              <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Analysis Period (Years)</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <button onClick={calculate} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-teal-200 active:scale-[0.98] mt-6">
              Compare Now
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
             <div className="h-full flex flex-col gap-6">
               <div className={`rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center grow ${result.winner === 'buying' ? 'bg-gradient-to-br from-teal-600 to-emerald-700' : 'bg-gradient-to-br from-indigo-600 to-blue-700'}`}>
                  <div className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Verdict after {years} years</div>
                  <div className="text-3xl font-black mb-1">
                     {result.winner === 'buying' ? 'BUYING wins!' : 'RENTING wins!'}
                  </div>
                  <div className="text-6xl font-black mb-4 flex items-baseline gap-2">
                    <span className="text-2xl">$</span>
                    {result.difference.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    <span className="text-sm font-normal opacity-80 uppercase tracking-tighter ml-1">cheaper</span>
                  </div>
                  <p className="text-white/70 text-sm">Based on {years} years of accumulated costs including mortgage, taxes, and rent inflation.</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Buying Cost</div>
                    <div className="text-xl font-black text-slate-700">${result.buyingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Renting Cost</div>
                    <div className="text-xl font-black text-slate-700">${result.rentingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
               </div>
             </div>
          ) : (
             <div className="h-full min-h-[450px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Build Your Future</h3>
                <p className="text-slate-500 max-w-[320px]">See how interest rates and home prices impact your wealth compared to monthly rent.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Rent vs. Buy Calculator: Real Estate Wealth & Cost Projection"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-4">
              A <strong>Rent vs. Buy Calculator</strong> is a sophisticated financial modeling tool designed to determine the "Break-even Point" between the cost of renting a home and the multi-dimensional costs of homeownership. This isn't just about comparing a monthly mortgage payment to monthly rent; it's about projecting <strong>total unrecoverable costs</strong> over a 10, 20, or 30-year horizon.
            </p>
            <p className="leading-relaxed mb-4">
              In the short term (1-5 years), renting is almost always cheaper because owners face high transactional "friction" (6% agent commissions, closing costs, and moving fees). However, as time passes, the <strong>forced savings</strong> of principal repayment and the potential for home price appreciation begin to outweigh the sunken costs of property taxes and maintenance.
            </p>
            <p className="leading-relaxed">
              Our calculator uses the 2024 economic baseline, assuming 3% annual rent inflation and 1% annual maintenance reserves, to provide you with a clear winner based on your specific investment timeline.
            </p>
          </>
        }
        comparisonTable={{
          title: "The Unrecoverable Cost Comparison (Annual Assumptions)",
          headers: ["Expense Category", "Buying (Owner)", "Renting (Tenant)", "Verdict"],
          rows: [
            ["Housing Payment", "Mortgage Interest (Sunken)", "Total Monthly Rent (Sunken)", "Depends on Rates"],
            ["Taxes", "Property Tax (1.2% avg)", "None (Included in Rent)", "Renting Wins"],
            ["Maintenance", "1% of Home Value Reserves", "None ($0 Responsibilty)", "Renting Wins"],
            ["Insurance", "HO3 Homeowners Insurance", "HO4 Renters Insurance (Minimal)", "Renting Wins"],
            ["Capital Gains", "Tax-Free Appreciation (up to $500k)", "Opportunity Cost of Deposit", "Buying Wins"],
            ["Wealth Building", "Forced Equity through Principal", "Portfolio Growth in Market", "Context Dependent"],
          ]
        }}
        formula={
          <>
            <p className="mb-4">
              Our model calculates the total financial impact using the <strong>Net Expenditure Model</strong>:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-center text-lg mb-4 text-emerald-900 italic">
                Total Buying Cost = Σ(Interest + Tax + Maint + Insur) + (Entry/Exit Friction) - (Appreciation + Principal)
              </p>
              <p className="text-sm font-sans text-gray-700">
                <strong>Where:</strong>
                <br /><strong>Σ:</strong> Summated over the analysis period (e.g., 10 years).
                <br /><strong>Entry/Exit Friction:</strong> 3% Closing Costs at buy + 6% Commission at sell.
                <br /><strong>Maint:</strong> Constant 1% of the original home price annually.
              </p>
            </div>
            <p>
              By comparing this result to the summated cost of rent (adjusted for 3% annual increases), we find the "Crossover Year" where the red line of buying costs falls below the blue line of renting costs.
            </p>
          </>
        }
        deepDive={
          <>
            <h3 className="text-xl font-bold mb-4">The '5% Rule' of Real Estate</h3>
            <p className="mb-4">
              A quick way to estimate the unrecoverable cost of owning a home is the 5% Rule. It breaks down as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
              <li><strong>1% for Maintenance:</strong> The physical depreciation of the structure.</li>
              <li><strong>1% for Property Taxes:</strong> The cost paid to local government.</li>
              <li><strong>3% for the Cost of Capital:</strong> Either the interest you pay to the bank or the interest you <em>lose</em> by not having your down payment in the stock market.</li>
            </ul>
            <p className="mb-4">
              If you can rent a similar home for <strong>less than 5% of its purchase price per year</strong>, renting is likely the mathematically superior wealth-building choice. For example, on a $500,000 home, if rent is less than $2,083/month ($25,000/year), renting wins.
            </p>
            <h3 className="text-xl font-bold mb-4">The Myth of 'Throwing Money Away on Rent'</h3>
            <p className="mb-4">
              Many people believe buying is always better because "renting is 100% interest." This is a fallacy. Interest, taxes, and maintenance are <em>also</em> 100% unrecoverable. In the first 10 years of a 30-year mortgage at 7% interest, roughly 85% of your monthly payment is "thrown away" on interest, not principal.
            </p>
          </>
        }
        example={
          <>
            <p className="mb-4 font-semibold">Scenario: $400,000 Home vs $2,500 Rent</p>
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <p className="font-bold text-teal-700 uppercase tracking-widest text-[10px]">Buyer (Year 1)</p>
                  <p>Interest: $20,800</p>
                  <p>Tax: $4,800</p>
                  <p>Maintenance: $4,000</p>
                  <p className="font-bold border-t mt-1">Total Sunken: $29,600</p>
                </div>
                <div>
                  <p className="font-bold text-indigo-700 uppercase tracking-widest text-[10px]">Renter (Year 1)</p>
                  <p>Rent: $30,000</p>
                  <p>Insurance: $300</p>
                  <p>Investment Ops: $0</p>
                  <p className="font-bold border-t mt-1">Total Sunken: $30,300</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                In this high-interest environment, the renter and buyer are almost tied in year 1. However, the buyer's interest cost stays flat (or decreases), while the renter's cost increases 3% every year.
              </p>
            </div>
          </>
        }
        useCases={
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-800">1. Evaluating Relocation for Work</h4>
              <p className="text-gray-600 italic">If you only plan to stay in a city for 2-3 years, the 6% selling commission almost guarantees you will lose money compared to renting, regardless of interest rates.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">2. Low Interest Rate Environments</h4>
              <p className="text-gray-600 italic">When mortgage rates are below 4%, the "cost of capital" drops significantly, making buying the winner in as little as 3-4 years.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">3. Maximizing Down Payment vs. Investing</h4>
              <p className="text-gray-600 italic">Use the calculator to see if putting 20% down or putting 5% down and investing the difference yields a higher net worth after 15 years.</p>
            </div>
          </div>
        }
        glossary={[
          {
            term: "Amortization",
            definition: "The process of paying off a debt over time through regular payments. A portion of each payment goes to interest, and the remainder goes to the principal."
          },
          {
            term: "Equity",
            definition: "The difference between the market value of your home and the amount you still owe on your mortgage."
          },
          {
            term: "Opportunity Cost",
            definition: "The potential profit or value you give up when choosing one investment over another (e.g., spending cash on a down payment instead of the S&P 500)."
          },
          {
            term: "Price-to-Rent Ratio",
            definition: "The ratio of home prices to annual rental rates. A ratio high above 20 usually indicates that renting is more favorable."
          },
          {
            term: "Closing Costs",
            definition: "Fees paid at the end of a real estate transaction. They typically range from 2% to 5% of the purchase price."
          }
        ]}
        faqs={[
          {
            question: "Is real estate always a good investment?",
            answer: "No. Real estate is highly dependent on local markers, interest rates, and your specific timeline. Historically, the S&P 500 has outperformed real estate appreciation on a percentage basis, but real estate allows for 5x leverage which can amplify returns."
          },
          {
            question: "Don't I get a big tax break for owning a home?",
            answer: "Since the 2018 TCJA reform, the standard deduction is so high that most homeowners no longer benefit from the mortgage interest deduction unless they have a very large loan."
          },
          {
            question: "What is PMI and how does it impact the math?",
            answer: "Private Mortgage Insurance (PMI) is required if your down payment is less than 20%. It is an unrecoverable cost (usually 0.5% to 1.5% of the loan amount annually) that makes renting even more attractive for low-down-payment buyers."
          },
          {
            question: "How long should I live in a house to make buying worth it?",
            answer: "The 'Rule of Thumb' is at least 5-7 years. This allows enough time for gradual appreciation and principal paydown to offset the ~10% loss you take on the entry and exit of the property (closing costs + selling commission)."
          }
        ]}
        relatedCalculators={[
          {
            name: "Mortgage Calculator",
            path: "/mortgage-calculator/",
            desc: "The core engine for calculating your monthly P&I, taxes, and insurance."
          },
          {
            name: "ROI Calculator",
            path: "/roi-calculator/",
            desc: "Compare your home's appreciation to other asset classes."
          },
          {
            name: "Amortization Calculator",
            path: "/amortization-calculator/",
            desc: "See exactly how much interest you will pay over the life of your loan."
          },
          {
            name: "Income Tax Calculator",
            path: "/income-tax-calculator/",
            desc: "See how much post-tax income you have left for your housing budget."
          }
        ]}
      />
    </div>
  );
}
