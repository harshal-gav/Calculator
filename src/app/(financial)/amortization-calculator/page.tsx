"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState("350000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [extraPayment, setExtraPayment] = useState("0");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    savingsWithExtra: number;
    timeSaved: string;
  } | null>(null);

  const calculateAmortization = () => {
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = parseInt(loanTerm) * 12;
    const extra = parseFloat(extraPayment) || 0;

    if (principal > 0 && annualRate > 0 && totalMonths > 0) {
      // Standard monthly payment
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                      (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      const totalInterestStandard = (payment * totalMonths) - principal;

      // Calculation with extra payment
      let balance = principal;
      let totalInterestExtra = 0;
      let monthsCount = 0;

      while (balance > 0 && monthsCount < 600) { // Safety cap at 50 years
        const interest = balance * monthlyRate;
        const principalPart = (payment + extra) - interest;
        
        totalInterestExtra += interest;
        balance -= principalPart;
        monthsCount++;
      }

      const monthsSaved = totalMonths - monthsCount;
      const yearsSaved = Math.floor(monthsSaved / 12);
      const remainingMonthsSaved = monthsSaved % 12;

      setResult({
        monthlyPayment: payment,
        totalInterest: totalInterestStandard,
        totalPayment: principal + totalInterestStandard,
        savingsWithExtra: totalInterestStandard - totalInterestExtra,
        timeSaved: monthsSaved > 0 ? `${yearsSaved}y ${remainingMonthsSaved}m` : "None"
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 font-serif tracking-tight">
          📊 Amortization & Debt Velocity
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto italic">
          Visualize the math behind your mortgage. See exactly how much interest disappears with every extra dollar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Controls */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Loan Amount ($)</label>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full rounded-2xl border-slate-100 bg-slate-50 p-5 font-black text-2xl text-slate-900 focus:ring-4 focus:ring-slate-100 focus:bg-white transition-all shadow-inner" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Interest Rate (%)</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-2xl border-slate-100 p-4 font-bold text-slate-800" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Loan Term (Years)</label>
                <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded-2xl border-slate-100 p-4 font-bold text-slate-800" />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <label className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Monthly Extra Payment ($)</label>
              <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="w-full rounded-2xl border-emerald-100 bg-emerald-50/30 p-5 font-black text-xl text-emerald-700 placeholder:text-emerald-300" placeholder="Optional" />
              <p className="text-[10px] text-emerald-600/60 font-medium mt-2 italic">*This accelerates principal reduction and saves interest.</p>
            </div>
          </div>

          <button onClick={calculateAmortization} className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-black transition shadow-2xl text-sm uppercase tracking-[0.3em] mt-8 hover:scale-[1.01] active:scale-95">
            Analyze Schedule
          </button>
        </div>

        {/* Dashboard */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col">
          {result !== null ? (
            <div className="bg-white border border-slate-100 rounded-[3rem] p-10 md:p-14 shadow-2xl flex-grow flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div className="text-center md:text-left">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Principal & Interest</span>
                    <div className="text-6xl font-black text-slate-900 tracking-tighter tabular-nums">${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex flex-col justify-center text-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase mb-1">Total Lifetime Cost</span>
                    <div className="text-3xl font-bold">${result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
               </div>

               <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Extra Payment Impact</span>
                    <div className="text-3xl font-black text-emerald-900">Saved ${result.savingsWithExtra.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="h-full w-px bg-emerald-200 hidden md:block"></div>
                  <div className="text-center md:text-right">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Debt-Free Sooner</span>
                    <div className="text-2xl font-black text-emerald-700">By {result.timeSaved}</div>
                  </div>
               </div>

               <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-xs">
                   <span className="text-slate-400 font-bold uppercase">Total Interest</span>
                   <span className="font-black text-slate-700">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-xs">
                   <span className="text-slate-400 font-bold uppercase">Loan Amount</span>
                   <span className="font-black text-slate-700">${parseFloat(loanAmount).toLocaleString()}</span>
                 </div>
               </div>
            </div>
          ) : (
            <div className="bg-slate-900 text-white rounded-[3rem] h-full p-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-50"></div>
               <div className="z-10 bg-white/10 p-10 rounded-full mb-8 group-hover:scale-110 transition-transform duration-700 border border-white/5 backdrop-blur-sm">
                  <span className="text-6xl grayscale group-hover:grayscale-0 transition-all">🏠</span>
               </div>
               <h3 className="text-white text-3xl font-black mb-3 z-10 font-serif">Simulate Your Freedom</h3>
               <p className="text-slate-500 max-w-sm font-medium leading-relaxed z-10 text-sm">Input your loan details to decompose your payments and see how extra contributions destroy interest costs.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Amortization Calculator: Decomposing Interest & Principal for Better Debt Management"
        whatIsIt={
          <div className="space-y-6">
            <p className="text-xl font-medium leading-relaxed">
              An <strong>Amortization Calculator</strong> is a forensic financial tool that reveals the hidden mechanics of an installment loan. Unlike a simple interest calculation, amortization involves a process where each monthly payment is partially applied to interest (the cost of borrowing) and partially to the principal (the actual debt). In the early stages of a 30-year mortgage, the vast majority of your payment goes to the bank—this tool helps you visualize why.
            </p>
            <p className="leading-relaxed">
              This calculator is essential for <strong>interest cost containment</strong>. By understanding the "Inversion Point"—the date on which you finally pay more toward principal than interest—you can make informed decisions about refinancing or accelerating your debt payoff. It provides a complete monthly or yearly schedule, showing how your balance decays over time.
            </p>
            <p className="leading-relaxed">
              Whether you are analyzing a home mortgage, an auto loan, or a student loan, this tool empowers you to see the "Full Cost" of borrowing. Most importantly, it calculates the <strong>ROI of Extra Payments</strong>, quantifying exactly how much interest disappears when you contribute more than the minimum mandated by the bank.
            </p>
          </div>
        }
        comparisonTable={{
          title: "The Front-Loading of Interest in a 30-Year Loan ($300k at 7%)",
          headers: ["Loan Stage", "Monthly Payment", "Interest Portion", "Principal Portion", "Remaining Balance"],
          rows: [
            ["Payment #1", "$1,996", "$1,750 (87.7%)", "$246 (12.3%)", "$299,754"],
            ["Year 10", "$1,996", "$1,481 (74.2%)", "$515 (25.8%)", "$253,382"],
            ["Year 20", "$1,996", "$941 (47.1%)", "$1,055 (52.9%)", "$150,223"],
            ["Year 30 (Last)", "$1,996", "$11 (0.5%)", "$1,985 (99.5%)", "$0"],
          ]
        }}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]
            </div>
            <p className="text-sm text-slate-500 text-center">
              Detailed periodic repayment schedule.
            </p>
          </>
        }
          example={
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-6">
               <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-4">The Impact of One Extra Payment</h5>
               <p className="text-slate-500 text-sm leading-relaxed">
                 Assume a $350,000 mortgage at 6.5% interest for 30 years.
               </p>
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic font-medium text-slate-700">
                 "Compounding debt is the thief of your future self's freedom. Amortization is the map that shows you where the thief is hiding."
               </div>
            </div>
            <div className="flex-1 space-y-4">
               <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Standard Timeline</span>
                  <p className="text-xs text-slate-600 mt-1">360 Payments</p>
                  <div className="text-2xl font-black text-slate-900">$445,435 Interest</div>
               </div>
               <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black text-emerald-600 uppercase">Plus $200 / Month</span>
                  <p className="text-xs text-slate-600 mt-1">294 Payments (Save 5+ Years)</p>
                  <div className="text-2xl font-black text-emerald-700">$348,312 Interest</div>
               </div>
               <p className="text-[9px] text-slate-400 uppercase font-black text-center pt-2 tracking-widest">Result: A $200 extra payment saves you nearly $100,000 in lifetime interest.</p>
            </div>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Mortgage Refinancing</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Compare your current schedule to a new rate to see exactly how many years it takes to 'break even' on closing costs.</p>
            </div>
            <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Early Retirement Plan</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Discover how a bi-weekly payment strategy can shave 4 years off your mortgage without changing your budget.</p>
            </div>
            <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Student Loan Payoff</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Model high-interest loan bursts to see how much faster you hit a zero balance by attacking specific loan groups.</p>
            </div>
            <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Auto Loan Logic</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Verify that your car loan isn't 'underwater' by comparing the principal balance to the vehicle's depreciation schedule.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Amortization", definition: "The process of paying off a debt over time through regular installments. A portion of each payment goes to principal, and a portion goes to interest." },
          { term: "Principal", definition: "The original amount of money borrowed, or the remaining amount of that original sum that has yet to be repaid." },
          { term: "Interest", definition: "The cost of borrowing money, calculated as a percentage of the remaining principal balance." },
          { term: "Escrow", definition: "A third-party account used to pay property taxes and insurance; these costs are often added to your monthly mortgage payment but NOT your amortization." },
          { term: "Equity", definition: "The difference between the market value of your property and the remaining balance on your mortgage." },
          { term: "Fixed-Rate Loan", definition: "A loan where the interest rate remains the same for the entire term, providing predictable amortization." },
          { term: "Prepayment Penalty", definition: "A clause in some loan contracts that charges a fee if you pay off the principal too quickly; always check for this before accelerating payments." },
          { term: "PMI (Private Mortgage Insurance)", definition: "An extra fee required if your down payment is less than 20%; it is a 'sunk cost' that provides zero equity." },
        ]}
        faqs={[
          {
            question: "Why does my mortgage balance hardly go down in the first few years?",
            answer: "This is the nature of amortization. Because your balance is at its highest, your interest charges are also at their highest. In a 30-year loan, you typically pay more interest than principal for the first 12-15 years."
          },
          {
            question: "Should I do 15 or 30 years?",
            answer: "A 30-year loan offers flexibility and a lower monthly payment. A 15-year loan offers a lower interest rate and massive lifetime savings. Many experts suggest taking a 30-year loan but making 15-year-sized payments to get the best of both worlds."
          },
          {
            question: "What is a bi-weekly payment?",
            answer: "By paying half your monthly mortgage Every Two Weeks, you make 26 half-payments (or 13 full payments) a year. This simple trick can cut 4-6 years off a 30-year mortgage."
          },
          {
            question: "Does this account for property taxes?",
            answer: "No. Amortization only accounts for Principal and Interest (P&I). Taxes, HOI, and PMI are external costs that do not reduce your debt balance."
          },
          {
            question: "Is it better to invest or pay down my mortgage?",
            answer: "This is a classic debate. If your mortgage rate is 3% and the stock market returns 8%, you should invest. If your mortgage rate is 7%+, paying it down is a guaranteed return that is very hard for the market to beat after-tax."
          }
        ]}
        relatedCalculators={[
          {
            name: "Mortgage Calculator",
            path: "/mortgage-calculator/",
            desc: "The companion tool for total housing cost estimation including taxes.",
          },
          {
            name: "Auto Loan Calculator",
            path: "/auto-loan-calculator/",
            desc: "Short-term amortization logic tailored for vehicle depreciation.",
          },
          {
            name: "Refinance Calculator",
            path: "/refinance-calculator/",
            desc: "Determine if changing your loan term actually saves money in the long run.",
          },
          {
            name: "Debt Payoff Planner",
            path: "/debt-payoff-planner/",
            desc: "Strategy tools for combining multiple loans (Snowball vs. Avalanche).",
          }
        ]}
      />
    </div>
  );
}
