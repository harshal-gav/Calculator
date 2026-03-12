"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function VAMortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("450000");
  const [downPayment, setDownPayment] = useState("0");
  const [interestRate, setInterestRate] = useState("7.0");
  const [loanTerm, setLoanTerm] = useState("30");
  const [vaStatus, setVaStatus] = useState("first_time"); // first_time, subsequent, disability
  const [rollFee, setRollFee] = useState(true);

  const [result, setResult] = useState<{
    monthlyPayment: number;
    fundingFeeAmount: number;
    totalLoanAmount: number;
    fundingFeePct: number;
  } | null>(null);

  const calculateVA = () => {
    const price = parseFloat(purchasePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;

    if (!isNaN(price) && price > 0) {
      const downPct = (down / price) * 100;
      
      // VA Funding Fee logic (Simplified 2024 tables)
      let feePct = 0;
      if (vaStatus === "disability") {
        feePct = 0;
      } else if (vaStatus === "first_time") {
        if (downPct >= 10) feePct = 1.25;
        else if (downPct >= 5) feePct = 1.5;
        else feePct = 2.15;
      } else {
        // Subsequent
        if (downPct >= 10) feePct = 1.25;
        else if (downPct >= 5) feePct = 1.5;
        else feePct = 3.3;
      }

      const fundingFee = (price - down) * (feePct / 100);
      const loanAmount = (price - down) + (rollFee ? fundingFee : 0);
      
      let monthly = 0;
      if (rate > 0) {
        monthly = loanAmount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      } else {
        monthly = loanAmount / term;
      }

      setResult({
        monthlyPayment: monthly,
        fundingFeeAmount: fundingFee,
        totalLoanAmount: loanAmount,
        fundingFeePct: feePct
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-slate-900 border-b pb-4 flex items-center">
        <span className="bg-blue-800 text-white px-3 py-1 rounded-md text-2xl mr-3 font-black">VA</span>
        Mortgage Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Customized for US Military Veterans. Estimate your specialized monthly payment including the VA Funding Fee and $0 down payment options.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Purchase Price ($):</label>
              <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="w-full rounded border-slate-300 p-2 font-bold" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Down Payment ($):</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded border-slate-300 p-2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Interest (%):</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded border-slate-300 p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Years:</label>
                <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded border-slate-300 p-2 text-sm" />
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-200">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Service History / Status</label>
                <select value={vaStatus} onChange={(e) => setVaStatus(e.target.value)} className="w-full rounded border-slate-300 p-2 text-sm">
                    <option value="first_time">First-Time Use</option>
                    <option value="subsequent">Subsequent Use</option>
                    <option value="disability">Service-Connected Disability (Fee Exempt)</option>
                </select>
            </div>

            <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" checked={rollFee} onChange={(e) => setRollFee(e.target.checked)} className="rounded text-blue-800" />
                <label className="text-xs font-medium text-slate-700 font-bold uppercase">Roll Funding Fee into Loan?</label>
            </div>
          </div>

          <button
            onClick={calculateVA}
            className="mt-8 w-full bg-blue-800 text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition shadow-lg text-lg uppercase tracking-tight"
          >
            Calculate Payment
          </button>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          {result !== null ? (
            <div className="h-full space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl p-8 text-center shadow-xl border-t-8 border-blue-600">
                    <span className="block text-xs font-bold text-blue-300 uppercase mb-2 tracking-widest font-mono">Principal & Interest</span>
                    <div className="text-7xl font-black mb-1">
                        ${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <span className="text-blue-200 text-sm italic font-medium">Estimated Monthly Payment</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl">
                        <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">VA Funding Fee</span>
                        <div className="text-2xl font-black text-rose-600">${result.fundingFeeAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <p className="text-[10px] text-gray-500 leading-tight">({result.fundingFeePct}% of loan amount)</p>
                    </div>
                    <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl">
                        <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Total Financed Amount</span>
                        <div className="text-2xl font-black text-slate-900">${result.totalLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <p className="text-[10px] text-gray-500 leading-tight">(Price - Down + {rollFee ? 'Fee' : '0'})</p>
                    </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-black">!</div>
                    <p className="text-xs text-blue-800">VA loans do not require conventional Private Mortgage Insurance (PMI), saving you hundreds per month compared to FHA or conventional 0-down loans.</p>
                </div>
            </div>
          ) : (
             <div className="h-full border-4 border-double border-slate-100 rounded-3xl flex flex-col items-center justify-center p-12 text-center text-slate-300">
                <div className="text-5xl mb-4">🏠</div>
                <p className="font-bold text-lg uppercase tracking-widest mb-2">Estimate Your Benefit</p>
                <p className="max-w-xs text-xs">US Veterans pay no PMI and often $0 down. Run the numbers to see your monthly savings.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="VA Mortgage Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>VA Mortgage Calculator</strong> is a specialized tool for US active-duty service members, veterans, and eligible surviving spouses. Unlike conventional mortgages, VA loans are backed by the Department of Veterans Affairs and do not require a down payment or PMI.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>If you are a first-time VA user buying a $400,000 home with $0 down:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700 text-sm">
              <li>VA Funding Fee (2.15%): $8,600</li>
              <li>Total Loan Amount: $408,600</li>
              <li>Benefit: You walk into the home with <strong>$0 out of pocket</strong> for the down payment.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Relocation Analysis:</strong> For service members PCSing to a new Duty Station, use this tool to compare the cost of "On-Base" living versus using your BAH (Basic Allowance for Housing) to buy a home with a VA loan.</li></ul>}
        faqs={[]}
        relatedCalculators={[]}
      />
    </div>
  );
}
