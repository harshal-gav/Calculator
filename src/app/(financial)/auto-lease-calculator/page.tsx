"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function AutoLeaseCalculator() {
  const [negotiatedPrice, setNegotiatedPrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("3000");
  const [tradeIn, setTradeIn] = useState("0");
  const [loanTerm, setLoanTerm] = useState("36");
  const [moneyFactor, setMoneyFactor] = useState("0.0025");
  const [residualValue, setResidualValue] = useState("60");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    depreciationCharge: number;
    rentCharge: number;
    totalLeaseCost: number;
  } | null>(null);

  const calculateLease = () => {
    const price = parseFloat(negotiatedPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const months = parseInt(loanTerm) || 0;
    const mf = parseFloat(moneyFactor) || 0;
    const residualPercent = parseFloat(residualValue) || 0;

    const capCost = price - down - trade;
    const residualAmt = price * (residualPercent / 100);

    if (capCost <= residualAmt || months <= 0) {
      setResult(null);
      return;
    }

    const depreciationCharge = (capCost - residualAmt) / months;
    const rentCharge = (capCost + residualAmt) * mf;
    const monthlyPayment = depreciationCharge + rentCharge;

    setResult({
      monthlyPayment,
      depreciationCharge,
      rentCharge,
      totalLeaseCost: (monthlyPayment * months) + down + trade,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-950 font-serif">
          🛋️ Auto Lease Calculator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto italic">
          Decode the fine print of your lease agreement. Calculate money factors, residual values, and monthly payments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Controls */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-10 -mt-10"></div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Negotiated Price ($)</label>
              <input type="number" value={negotiatedPrice} onChange={(e) => setNegotiatedPrice(e.target.value)} className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-xl text-indigo-950" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Down Payment ($)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded-2xl border-slate-200 p-4 font-black" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Trade-In ($)</label>
                <input type="number" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} className="w-full rounded-2xl border-slate-200 p-4 font-black" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Term (Mo)</label>
                  <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 font-bold bg-white text-sm">
                    {[24, 30, 36, 42, 48].map(m => <option key={m} value={m}>{m} Mo</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Money Factor</label>
                  <input type="number" step="0.0001" value={moneyFactor} onChange={(e) => setMoneyFactor(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 font-bold text-sm bg-indigo-50/50 text-indigo-700" title="Typical range: 0.001 to 0.004" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                <span>Residual Value (% of price)</span>
                <span className="text-indigo-600">{residualValue}%</span>
              </label>
              <input type="range" min="30" max="80" value={residualValue} onChange={(e) => setResidualValue(e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
          </div>

          <button onClick={calculateLease} className="w-full bg-indigo-950 text-white font-black py-5 rounded-2xl hover:bg-black transition shadow-xl text-sm uppercase tracking-[0.2em] mt-6">
            Calculate Lease
          </button>
        </div>

        {/* Output */}
        <div className="lg:col-span-12 xl:col-span-7">
          {result !== null ? (
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 -mr-16 -mt-16 rounded-full"></div>
              
              <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Estimated Monthly</span>
                <div className="text-7xl font-black text-slate-900 tabular-nums tracking-tighter">
                  ${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                    <span className="text-slate-500 font-medium">Depreciation Fee</span>
                    <span className="font-bold text-slate-900">${result.depreciationCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                    <span className="text-indigo-600 font-bold">Rent Charge (Interest)</span>
                    <span className="font-bold text-indigo-700">${result.rentCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center">
                    <span className="text-[9px] font-black uppercase text-slate-500 mb-1">Total Cost of Lease</span>
                    <span className="text-xl font-black">${result.totalLeaseCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-[10px] text-slate-400 bg-slate-50 p-4 rounded-xl italic">
                *Calculation excludes local sales tax, acquisition fees, and registration costs which vary by state.
              </div>
            </div>
          ) : (
            <div className="bg-indigo-950 rounded-[2.5rem] h-full flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
               <div className="z-10">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                  <span className="text-4xl">📄</span>
                </div>
                <h3 className="text-white font-black text-2xl mb-3">Analyze Your Agreement</h3>
                <p className="text-indigo-300 text-sm max-w-xs font-medium leading-relaxed">Leasing is often more opaque than buying. Our calculator reveals the hidden math behind the dealership's offer.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Mastering the Auto Lease: Why the Money Factor is Your Most Important Number"
        whatIsIt={
          <div className="space-y-6">
            <p className="text-xl font-medium leading-relaxed">
              An <strong>Auto Lease Calculator</strong> is a specialized financial modeling tool that computes the cost of "renting" a vehicle for a fixed period (typically 24 to 48 months). Unlike a traditional loan, where you pay and ultimately own the asset, a lease represents a contract to pay for the vehicle's <strong>projected depreciation</strong> plus a financing fee known as the "Rent Charge."
            </p>
            <p className="leading-relaxed">
              Leasing is frequently chosen by professionals and luxury vehicle enthusiasts who prioritize driving a new car every few years with minimal maintenance risk. However, it is also one of the most opaque financial transactions in the consumer market. Dealerships often present a single monthly payment while obscuring the three variables that actually dictate that cost: the negotiated price (gross capitalized cost), the residual value, and the money factor.
            </p>
            <p className="leading-relaxed">
              Our calculator empowers you to strip away the marketing jargon and see the mathematical reality. By understanding how these variables interact, you can determine if a $299/month lease is truly a "deal" or if the dealership has inflated the money factor to hide a poor negotiation on the vehicle's selling price. 
            </p>
            <p className="leading-relaxed italic">
              "In leasing, you aren't just paying for a car; you are paying for the time the car spend sitting in your driveway."
            </p>
          </div>
        }
        comparisonTable={{
          title: "Lease vs. Buy: The Ultimate Financial Trade-off",
          headers: ["Feature", "Leasing a Vehicle", "Buying with a Loan"],
          rows: [
            ["Monthly Cost", "Typically 30-50% lower than loan payments.", "Higher monthly out-of-pocket required."],
            ["Asset Ownership", "No equity; vehicle returned at end of term.", "You own the asset once the loan is repaid."],
            ["Maintenance", "Usually covered under manufacturer warranty.", "Long-term repairs are the owner's responsibility."],
            ["Mileage Limits", "Strict limits (e.g., 10k-15k miles/year).", "Drive as much as you want without penalty."],
            ["Customization", "Must return vehicle in original condition.", "Free to modify or upgrade as you see fit."],
            ["Long-Term Value", "Most expensive way to drive over 10+ years.", "Cheapest way to drive if car is kept 8+ years."],
          ]
        }}
        formula={
          <div className="space-y-8">
            <p>
              The math of a lease is unique because it combines two distinct charges:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h6 className="font-black text-indigo-950 text-xs mb-3 uppercase tracking-widest">1. The Depreciation Fee</h6>
                <div className="font-mono text-xs bg-slate-50 p-3 rounded-lg mb-3">
                  (Net Cap Cost - Residual Value) / Months
                </div>
                <p className="text-[10px] text-slate-500">You pay for the portion of the car's value you "use up" during the term.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h6 className="font-black text-indigo-950 text-xs mb-3 uppercase tracking-widest">2. The Rent Charge (Interest)</h6>
                <div className="font-mono text-xs bg-indigo-50 p-3 rounded-lg mb-3 text-indigo-700">
                  (Net Cap Cost + Residual Value) * Money Factor
                </div>
                <p className="text-[10px] text-slate-500">The fee paid to the bank for keeping their capital tied up in the vehicle.</p>
              </div>
            </div>
            <div className="p-6 bg-indigo-950 text-white rounded-3xl text-center">
              <span className="block text-[10px] font-bold text-indigo-400 uppercase mb-2">The Golden Formula</span>
              <div className="text-xl font-mono">Monthly Payment = Depreciation Fee + Rent Charge</div>
            </div>
          </div>
        }
        deepDive={
          <div className="space-y-12">
            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6 border-l-8 border-indigo-600 pl-6">I. Demystifying the 'Money Factor' (MF)</h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                Perhaps the most misunderstood term in finance is the <strong>Money Factor</strong>. It is simply the interest rate for a lease, but expressed in a different format. To convert a Money Factor to a standard APR (Annual Percentage Rate), you must multiply it by <strong>2400</strong>. 
              </p>
              <div className="my-6 p-6 bg-slate-100 rounded-2xl font-mono text-center flex justify-around">
                <div>MF: 0.0025</div>
                <div className="text-slate-400">× 2400 =</div>
                <div className="font-black text-indigo-600">6.0% APR</div>
              </div>
              <p className="text-slate-700">
                Lenders use this format because it simplifies the calculation of the "Rent Charge" on the average balance of the vehicle over the lease term. Always ask your dealer: "What is the money factor on this tier?" If they won't tell you, use this calculator to solve for it based on the APR they provide.
              </p>
            </section>

            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6 border-l-8 border-indigo-600 pl-6">II. Residual Value: The Hidden Anchor</h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                The <strong>Residual Value</strong> is the bank's guess of what the car will be worth at the end of the lease. This number is set by the manufacturer (captive finance company) and is non-negotiable. 
              </p>
              <p className="text-slate-700 mt-4">
                A high residual value is actually GOOD for a lease, because it means you aren't paying for as much depreciation. This is why vehicles that hold their value well (like SUVs, Trucks, and high-end German sedans) often have lower lease payments than cheaper cars that depreciate rapidly. Focus on vehicles with residuals between 55% and 65% for the best lease efficiency.
              </p>
            </section>

            <section className="bg-amber-50 p-10 rounded-[40px] border border-amber-100 shadow-inner">
               <h4 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                 <span className="mr-3">⚠️</span> Capitalized Cost Reduction: A Leasing Trap
               </h4>
               <p className="text-amber-800 leading-relaxed">
                 Experts strongly advise putting <strong>$0 down</strong> on a lease (no "Cap Cost Reduction"). If you put $5,000 down on a lease and the car is totaled or stolen one week later, that $5,000 is gone forever. Insurance pays the bank the value of the car, but they generally do not reimburse your down payment. In a lease, it is better to keep your cash in a high-yield savings account and pay a slightly higher monthly payment.
               </p>
            </section>

            <section>
              <h4 className="text-3xl font-black text-slate-900 mb-6 border-l-8 border-indigo-600 pl-6">III. The 'One-Pay' Lease Hack</h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                Some enthusiasts use a "Single Payment Lease" where they pay for the entire 36-month term upfront. In exchange, the bank usually offers a significant reduction in the Money Factor. This can save thousands in rent charges while still giving you the protection of a lease (such as returning a car with unexpected depreciation or accidents on its record).
              </p>
            </section>
          </div>
        }
        example={
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h5 className="text-indigo-600 font-black uppercase tracking-widest text-xs mb-8 flex items-center">
               Scenario Analysis: The 1% Money Factor Shift
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-50 rounded-3xl">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Negotiated Price: $40,000</p>
                <p className="text-xs font-bold text-slate-400 mb-6 uppercase">Residual: 60% ($24k)</p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Option A (4% APR)</span>
                    <span className="text-3xl font-black text-slate-900">$551/mo</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Negotiated Price: $40,000</p>
                <p className="text-xs font-bold text-slate-400 mb-6 uppercase">Residual: 60% ($24k)</p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[10px] text-indigo-500 font-bold uppercase">Option B (6% APR)</span>
                    <span className="text-3xl font-black text-indigo-700">$604/mo</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm text-slate-500 italic leading-relaxed">
              Perspective: A seemingly small 2% difference in interest rate (MF of 0.0016 vs 0.0025) results in a $53/month difference. Over a 36-month lease, that's <strong>$1,908 in extra rent charges</strong> for the exact same car.
            </p>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:translate-y-[-4px] transition-transform">
              <h5 className="font-black text-slate-900 mb-2 uppercase text-[10px] tracking-widest">Business Write-offs</h5>
              <p className="text-xs text-slate-600 leading-relaxed">Business owners often lease because their monthly payments can be fully or partially deducted as a business expense, providing a simpler tax benefit than traditional depreciation schedules.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:translate-y-[-4px] transition-transform">
              <h5 className="font-black text-slate-900 mb-2 uppercase text-[10px] tracking-widest">Avoiding Luxury Obsolescence</h5>
              <p className="text-xs text-slate-600 leading-relaxed">Leasing is ideal for high-tech vehicles (like EVs) where the technology advances rapidly. It allows you to "trial" the vehicle and return it before a major tech shift makes the resale value crash.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:translate-y-[-4px] transition-transform">
              <h5 className="font-black text-slate-900 mb-2 uppercase text-[10px] tracking-widest">Total Cost Protection</h5>
              <p className="text-xs text-slate-600 leading-relaxed">If a leased car is in an accident and repaired, the 'diminished value' is the bank's problem, not yours. You simply return the car at the end of the term (assuming it was professionally repaired).</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl shadow-sm hover:translate-y-[-4px] transition-transform">
              <h5 className="font-black text-indigo-900 mb-2 uppercase text-[10px] tracking-widest">Down Payment Preservation</h5>
              <p className="text-xs text-slate-600 leading-relaxed">Keep your capital liquid. Our calculator helps you realize that a $0-down lease is often the safest and most efficient way to manage your cash flow.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Money Factor", definition: "A fraction used to calculate the rent charge on a lease, equivalent to the interest rate divided by 2400." },
          { term: "Gross Capitalized Cost", definition: "The total negotiated price of the vehicle plus any added fees or prior loan balances." },
          { term: "Residual Value", definition: "The predicted value of the vehicle at the end of the lease term, usually set by the lessor." },
          { term: "Acquisition Fee", definition: "A fee charged by the leasing company to set up the lease, typically ranging from $500 to $900." },
          { term: "Disposition Fee", definition: "A fee paid at the end of the lease if you choose to return the car rather than buy it." },
          { term: "Gap Insurance", definition: "Insurance that covers the shortfall between the car's value and the lease payoff amount in case of a total loss." },
          { term: "Wear and Tear", definition: "The allowed usage of the vehicle; excessive damage usually results in penalties at the end of the lease." },
          { term: "Capitalized Cost Reduction", definition: "Essentially a down payment that reduces the amount being financed through the lease." },
          { term: "Lessor", definition: "The financial institution or dealership that actually owns the vehicle and leases it to you." },
          { term: "Lessee", definition: "The individual (you) who is using the vehicle under the lease agreement." },
        ]}
        faqs={[
          {
            question: "What is a good Money Factor for a lease?",
            answer: "A good money factor should roughly correspond to the best market interest rates. If prime auto rates are 6%, a good money factor would be 0.0025 (6 / 2400). If a dealer offers 0.0040 (9.6% APR), you should negotiate."
          },
          {
            question: "Can I negotiate the residual value?",
            answer: "No. The residual value is set by the manufacturer's finance arm and is standard across all dealers for that specific car model and term."
          },
          {
            question: "Should I lease if I drive a lot of miles?",
            answer: "Usually not. Standard leases limit you to 10k, 12k, or 15k miles per year. Over-mileage fees (e.g., $0.25 per mile) can be extremely expensive. If you drive 20k+ miles, buying is almost always better."
          },
          {
            question: "Is Gap Insurance necessary on a lease?",
            answer: "Yes, but it is often included for free in many standard lease agreements from major manufacturers. Always check your contract; without it, you are liable for thousands if the car is totaled."
          },
          {
            question: "What happens if I want to end my lease early?",
            answer: "Early termination is typically very difficult and expensive. Options include a 'lease buyout' where you purchase the car from the bank, or using services to 'swap' your lease to another person."
          },
          {
            question: "Can I buy the car at the end of the lease?",
            answer: "Yes, every standard lease includes a 'Purchase Option Price,' which is exactly equal to the Residual Value plus any small administrative fees."
          }
        ]}
        relatedCalculators={[
          {
            name: "Auto Loan Calculator",
            path: "/auto-loan-calculator/",
            desc: "The alternative to leasing: calculate the cost of buying a car with a traditional loan.",
          },
          {
            name: "Rent vs Buy Calculator",
            path: "/rent-vs-buy-calculator/",
            desc: "Explore the same financial logic applied to your primary residence.",
          },
          {
            name: "Loan Payoff Calculator",
            path: "/loan-payoff-calculator/",
            desc: "Determine how much you save by paying down debt earlier than scheduled.",
          },
          {
            name: "Gas Mileage Calculator",
            path: "/gas-mileage-calculator/",
            desc: "Consider the operational costs (fuel) in tandem with your lease payment.",
          }
        ]}
      />
    </div>
  );
}
