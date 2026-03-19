"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("5000");
  const [tradeInValue, setTradeInValue] = useState("2000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [loanTerm, setLoanTerm] = useState("60");
  const [salesTaxRate, setSalesTaxRate] = useState("7");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalLoanAmount: number;
    totalPayment: number;
  } | null>(null);

  const calculateLoan = () => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeInValue) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 0;
    const tax = parseFloat(salesTaxRate) || 0;

    const taxAmount = price * (tax / 100);
    const principal = price - down - trade + taxAmount;

    if (principal <= 0 || rate < 0 || term <= 0) {
      setResult(null);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);

    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalInterest,
      totalLoanAmount: principal,
      totalPayment,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 font-serif">
          🚗 Auto Loan Calculator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto italic">
          Master the math of your next vehicle purchase. Calculate monthly payments, interest totals, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Controls */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6 bg-white p-6 md:p-10 rounded-3xl border border-zinc-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Vehicle Price ($)</label>
              <input 
                type="number" 
                value={vehiclePrice} 
                onChange={(e) => setVehiclePrice(e.target.value)} 
                className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-slate-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Down Payment ($)</label>
              <input 
                type="number" 
                value={downPayment} 
                onChange={(e) => setDownPayment(e.target.value)} 
                className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-slate-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Trade-In ($)</label>
              <input 
                type="number" 
                value={tradeInValue} 
                onChange={(e) => setTradeInValue(e.target.value)} 
                className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-slate-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sales Tax (%)</label>
              <input 
                type="number" 
                value={salesTaxRate} 
                onChange={(e) => setSalesTaxRate(e.target.value)} 
                className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-slate-900" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Interest Rate (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(e.target.value)} 
                    className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-blue-700 bg-blue-50/30" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 font-black">%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Term (Months)</label>
                <select 
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(e.target.value)} 
                  className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl bg-white"
                >
                  {[24, 36, 48, 60, 72, 84].map(m => (
                    <option key={m} value={m}>{m} Months ({m/12} years)</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateLoan}
            className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-slate-800 transition shadow-2xl shadow-slate-900/40 text-lg uppercase tracking-widest mt-4"
          >
            Calculate Payment
          </button>
        </div>

        {/* Dashboard/Results */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col space-y-6">
          {result !== null ? (
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <div className="text-center">
                <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Monthly Obligation</span>
                <div className="text-7xl md:text-8xl font-black mb-10 tabular-nums tracking-tighter drop-shadow-lg">
                  ${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase mb-2">Loan Amount</span>
                  <div className="text-xl font-bold">${result.totalLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase mb-2">Total Interest</span>
                  <div className="text-xl font-bold text-blue-400">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <span className="block text-[9px] font-bold text-blue-300 uppercase mb-2">Total Payment</span>
                  <div className="text-xl font-bold text-white">${result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>

              <div className="mt-10 px-4">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-slate-500" style={{ width: `${(result.totalLoanAmount / result.totalPayment) * 100}%` }}></div>
                  <div className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mt-2">
                  <span>Principal</span>
                  <span className="text-blue-400">Pure Interest</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] h-full flex flex-col items-center justify-center p-12 text-center text-slate-300 group hover:border-blue-400 transition-colors">
              <span className="text-7xl mb-6 opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">🛒</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Drive?</h3>
              <p className="max-w-xs text-sm text-slate-400 font-medium">Input your financing details to see exactly how your choices affect your long-term wealth.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Comprehensive Auto Loan Calculator: Mastering the Math of Vehicle Financing"
        whatIsIt={
          <div className="space-y-6">
            <p className="text-xl font-medium leading-relaxed">
              The <strong>Auto Loan Calculator</strong> is a specialized financial instrument designed to decode the complex relationship between vehicle prices, interest rates, and loan durations. In the modern automotive market, where the average new car price exceeds $48,000, understanding the "Time Value of Money" (TVM) is no longer a luxury—it is a critical survival skill for your personal balance sheet.
            </p>
            <p className="leading-relaxed">
              Car ownership is typically the second-largest expense for a household, yet most buyers focus exclusively on the "Monthly Payment" while ignoring the <strong>Total Cost of Borrowing</strong>. This calculator shifts the perspective from short-term cash flow to long-term net worth. It meticulously calculates your monthly principal and interest, the total interest paid over the life of the loan, and the impact of sales tax and trade-ins on your final obligation.
            </p>
            <p className="leading-relaxed">
              Whether you are shopping for a nimble commuter car, a rugged pickup truck, or searching for the best financing on a pre-owned sedan, this tool provides the mathematical clarity needed to navigate dealership F&I (Finance and Insurance) offices with confidence. It empowers you to see exactly how a 1% shift in interest rates or a $5,000 increase in your down payment changes your financial trajectory over the next 3 to 7 years.
            </p>
            <p className="leading-relaxed">
              By simulating various scenarios—such as the "60-month vs. 72-month" debate—you can identify the exact "inflection point" where the convenience of lower payments turns into the liability of negative equity (being "underwater" on your loan). This calculator is your primary defense against predatory lending practices and poorly structured debt.
            </p>
          </div>
        }
        comparisonTable={{
          title: "Credit Score Tiers & Estimated Interest Rates (2024 Market Data)",
          headers: ["Credit Category", "Score Range", "Avg. New Car Rate", "Avg. Used Car Rate"],
          rows: [
            ["Super Prime", "781 - 850", "4.9% - 5.5%", "6.2% - 6.8%"],
            ["Prime", "661 - 780", "5.8% - 6.4%", "8.1% - 8.9%"],
            ["Non-Prime", "601 - 660", "8.9% - 9.7%", "12.5% - 13.5%"],
            ["Subprime", "501 - 600", "11.5% - 12.8%", "17.9% - 18.9%"],
            ["Deep Subprime", "300 - 500", "14.2% - 16.5%", "20.5% - 22.0%"],
          ]
        }}
        formula={
          <div className="space-y-6">
            <p>
              The engine of this calculator uses the <strong>Standard Amortization Formula</strong>, which calculates the fixed payment required to bring a loan balance to zero over a specific number of periods:
            </p>
            <div className="bg-slate-900 p-8 rounded-3xl text-center shadow-2xl border border-blue-500/30">
              <code className="text-2xl md:text-3xl text-blue-300 font-mono">
                M = P [ i(1 + i)ⁿ ] / [ (1 + i)ⁿ – 1 ]
              </code>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-blue-400">M</span> = Total Monthly Payment
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-blue-400">P</span> = Principal Loan Amount (Price - Down Payment + Tax)
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-blue-400">i</span> = Monthly Interest Rate (Annual Rate / 12)
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-blue-400">n</span> = Total Number of Months (Term)
              </div>
            </div>
            <p className="text-sm italic text-slate-400">
              *Note: The principal (P) is adjusted by subtracting the down payment and trade-in value, and adding sales tax (expressed as a percentage of the purchase price).
            </p>
          </div>
        }
        deepDive={
          <div className="space-y-12">
            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6 border-l-8 border-blue-600 pl-6">I. The Psychology of the 'Monthly Payment' Trap</h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                Dealerships often employ a tactic known as "Four-Square" selling, where they focus almost exclusively on a monthly payment target. If you tell a seller you want to pay "$500 a month," they can achieve that goal by extending the loan term to 84 or even 96 months. This is a mathematical sleight-of-hand. 
              </p>
              <p className="text-lg text-slate-700 mt-4 leading-relaxed">
                While your monthly cash flow feels manageable, the <strong>Total Interest Cost</strong> explodes. A $30,000 loan at 7% for 60 months costs you ~$5,600 in interest. Stretching that same loan to 84 months (7 years) to lower the payment might cost you over $8,000 in interest. Even worse, you are likely to owe more than the car is worth for almost the entire duration of the loan.
              </p>
            </section>

            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6 border-l-8 border-blue-600 pl-6">II. The 20/4/10 Rule of Thumb</h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                Financial experts often suggest the "20/4/10 Rule" to ensure you aren't "car poor":
              </p>
              <ul className="list-disc pl-8 mt-6 space-y-4 text-slate-700 font-medium">
                <li><strong className="text-blue-700">20% Down Payment:</strong> Protects you from instant depreciation and helps you avoid negative equity.</li>
                <li><strong className="text-blue-700">4-Year Term (48 Months):</strong> Keeps interest costs low and aligns the loan payoff with the vehicle's highest-value years.</li>
                <li><strong className="text-blue-700">10% of Income:</strong> Your total vehicle costs (Loan, Insurance, Fuel, Maintenance) should not exceed 10% of your gross monthly income.</li>
              </ul>
            </section>

            <section className="bg-blue-50 p-10 rounded-[40px] border border-blue-100 italic shadow-inner">
              <h4 className="text-2xl font-bold text-blue-900 mb-4 not-italic">III. Depreciation: The Invisible Cost</h4>
              <p className="text-blue-800 leading-relaxed">
                Unlike a mortgage, an auto loan is financing a <strong>depreciating asset</strong>. Most new cars lose 20% of their value in the first year and 60% after five years. This is why credit score matters differently here. If your rate is high (above 10%), you aren't just paying for the car; you are racing against the car's vanishing value. If the car depreciates faster than you pay down the principal, you become "upside down," making it impossible to sell or trade the vehicle without paying the lender out of your own pocket.
              </p>
            </section>

            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6 border-l-8 border-blue-600 pl-6">IV. New vs. Used: The Interest Rate Delta</h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                Used car loans almost always carry higher interest rates than new car loans—often 2% to 4% higher. This is because lenders view used cars as higher-risk collateral; if you default, the bank has a harder time auctioning a used vehicle for a predictable price. When using this calculator, ensure you toggle between "New" and "Used" market rates to see if buying a slightly more expensive new car with a promotional 0.9% or 1.9% APR might actually be cheaper than a "bargain" used car at 8.5% APR.
              </p>
            </section>
          </div>
        }
        example={
          <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <h5 className="text-blue-400 font-black uppercase tracking-[0.2em] text-sm mb-10 flex items-center">
              <span className="w-10 h-10 rounded-full border border-blue-500 flex items-center justify-center mr-4 text-xs font-mono">01</span>
              Case Study: The Impact of the Down Payment
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-slate-300 text-lg">
                  Consider a <strong>$40,000 SUV</strong> with a <strong>6.5% interest rate</strong> for <strong>60 months</strong>.
                </p>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <span className="block text-xs font-bold text-slate-500 uppercase mb-2">Scenario A: Zero Down</span>
                  <div className="text-3xl font-black">$783/month</div>
                  <p className="text-xs text-slate-400 mt-2">Total Interest: $6,980</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-slate-300 text-lg">
                  Now, apply a <strong>$10,000 down payment</strong> (or trade-in) to that same $40,000 SUV.
                </p>
                <div className="p-6 bg-blue-600/20 rounded-2xl border border-blue-500/30">
                  <span className="block text-xs font-bold text-blue-400 uppercase mb-2">Scenario B: $10k Down</span>
                  <div className="text-3xl font-black text-blue-400">$587/month</div>
                  <p className="text-xs text-blue-300 mt-2">Total Interest: $5,235</p>
                </div>
              </div>
            </div>
            <p className="mt-12 text-sm text-slate-400 leading-relaxed pt-8 border-t border-white/10">
              <strong>Conclusion:</strong> Putting $10,000 down didn't just lower the monthly bill by $196; it saved you <strong>$1,745 in pure interest</strong>. That's effectively a 17% "return" on your $10k in the form of avoided costs.
            </p>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="text-xl">💼</span>
              </div>
              <h5 className="font-black text-slate-900 mb-3 uppercase text-xs tracking-widest">Pre-Approval Comparison</h5>
              <p className="text-sm text-slate-600 leading-relaxed">Before visiting a dealership, use this tool to compare loan offers from your local credit union against national banks. Knowing your "floor" APR is your best leverage.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <span className="text-xl">⚖️</span>
              </div>
              <h5 className="font-black text-slate-900 mb-3 uppercase text-xs tracking-widest">Trade-In Evaluator</h5>
              <p className="text-sm text-slate-600 leading-relaxed">Determine how much your current vehicle's trade-in value (equity) actually affects your new monthly obligation versus just selling it privately.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <span className="text-xl">🎯</span>
              </div>
              <h5 className="font-black text-slate-900 mb-3 uppercase text-xs tracking-widest">Target Budgeting</h5>
              <p className="text-sm text-slate-600 leading-relaxed">If you know you have a hard limit of $450/month, work backward to see exactly what purchase price and interest rate combo fits your reality.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "APR (Annual Percentage Rate)", definition: "The total yearly cost of a loan, including interest and fees, expressed as a percentage." },
          { term: "Amortization", definition: "The process of paying off a debt over time through regular payments of principal and interest." },
          { term: "Negative Equity", definition: "Often called being 'underwater' or 'upside down,' this occurs when you owe more on a loan than the asset's current market value." },
          { term: "Loan-to-Value (LTV)", definition: "The ratio of the loan amount divided by the vehicle's value, used by lenders to determine risk and rates." },
          { term: "Principal", definition: "The actual amount of money borrowed, excluding the interest you pay on that money." },
          { term: "Trade-In Equity", definition: "The difference between the market value of your current car and the remaining balance of any loan on it." },
          { term: "Sales Tax", definition: "A state or local government tax on the purchase of a vehicle, which can often be rolled into the loan amount." },
          { term: "Gap Insurance", definition: "Insurance that covers the difference between what the car is worth and what you owe if the car is totaled while you have negative equity." },
          { term: "Prepayment Penalty", definition: "A fee charged by some lenders if you pay off your loan earlier than the agreed term." },
          { term: "Resale Value", definition: "The estimated amount a vehicle can be sold for at a future date, highly dependent on brand, mileage, and condition." },
        ]}
        faqs={[
          {
            question: "Is it better to get a longer loan for a lower payment?",
            answer: "While it helps cash flow, it is almost always more expensive. A 72-month loan will cost thousands more in interest and keep you in a negative equity position (owing more than the car's worth) for much longer than a 48 or 60-month loan."
          },
          {
            question: "How much down payment should I really put down?",
            answer: "The 'gold standard' is 20%. This typically covers the first year's depreciation and immediately puts you in a positive equity position, which makes selling or trading the car much easier later."
          },
          {
            question: "Can I include sales tax in the loan?",
            answer: "Most lenders allow you to roll taxes, titles, and fees into the total loan amount. However, this increases your Loan-to-Value (LTV) ratio and might result in a slightly higher interest rate."
          },
          {
            question: "How does my credit score affect the auto loan rate?",
            answer: "Your credit score is the single biggest factor. A 'Super Prime' score (780+) can get rates near 5%, while a 'Subprime' score (under 600) might face rates of 15% to 20%, dramatically increasing the total cost of the car."
          },
          {
            question: "What is a 'Good' APR for an auto loan right now?",
            answer: "As of 2024, a 'good' rate for a new car is between 5% and 7% for those with excellent credit. Used car rates are typically 2% to 4% higher than new car rates."
          },
          {
            question: "Should I pay off my car loan early?",
            answer: "If your interest rate is high (above 6%), paying it off early is like getting a guaranteed return on your money. However, if you have a 0.9% promotional rate, you are better off keeping the cash in a high-yield savings account earning 4-5%."
          }
        ]}
        relatedCalculators={[
          {
            name: "Auto Lease Calculator",
            path: "/auto-lease-calculator/",
            desc: "Compare the costs of leasing versus buying to see which fits your lifestyle and financial goals.",
          },
          {
            name: "Fuel Cost Calculator",
            path: "/fuel-cost-calculator/",
            desc: "Estimate your monthly and annual gas expenses based on your vehicle's MPG and your driving habits.",
          },
          {
            name: "Loan Payoff Calculator",
            path: "/loan-payoff-calculator/",
            desc: "See how much time and money you can save by making extra payments toward your principal.",
          },
          {
            name: "Car Depreciation Calculator",
            path: "/car-depreciation-calculator/",
            desc: "Predict how much your vehicle will be worth in 3, 5, or 10 years based on historical data.",
          }
        ]}
      />
    </div>
  );
}
