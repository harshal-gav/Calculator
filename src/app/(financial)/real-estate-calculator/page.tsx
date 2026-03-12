"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RealEstateCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("300000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [monthlyRent, setMonthlyRent] = useState("2500");
  
  // Expenses
  const [propertyTax, setPropertyTax] = useState("300");
  const [insurance, setInsurance] = useState("100");
  const [hoa, setHoa] = useState("0");
  const [maintenancePercent, setMaintenancePercent] = useState("5");
  const [managementPercent, setManagementPercent] = useState("10");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalExpenses: number;
    cashFlow: number;
    capRate: number;
    cocReturn: number;
    grm: number;
  } | null>(null);

  const calculateROI = () => {
    const price = parseFloat(purchasePrice);
    const downPct = parseFloat(downPaymentPercent) / 100;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;
    const rent = parseFloat(monthlyRent);
    
    const tax = parseFloat(propertyTax);
    const ins = parseFloat(insurance);
    const h = parseFloat(hoa);
    const maint = rent * (parseFloat(maintenancePercent) / 100);
    const mgmt = rent * (parseFloat(managementPercent) / 100);

    if (!isNaN(price) && !isNaN(rent) && price > 0) {
      const downAmount = price * downPct;
      const loanAmount = price - downAmount;
      
      let monthlyMortgage = 0;
      if (rate > 0) {
        monthlyMortgage = loanAmount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      } else {
        monthlyMortgage = loanAmount / term;
      }

      const totalMonthlyExpenses = tax + ins + h + maint + mgmt + monthlyMortgage;
      const cashFlow = rent - totalMonthlyExpenses;
      
      // Annualized
      const netOperatingIncome = (rent - (tax + ins + h + maint + mgmt)) * 12;
      const capRate = (netOperatingIncome / price) * 100;
      
      const annualCashFlow = cashFlow * 12;
      const totalInvestment = downAmount; // Simplified, excluding closing costs
      const cocReturn = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
      
      const grm = rent > 0 ? price / (rent * 12) : 0;

      setResult({
        monthlyPayment: monthlyMortgage,
        totalExpenses: totalMonthlyExpenses,
        cashFlow: cashFlow,
        capRate: capRate,
        cocReturn: cocReturn,
        grm: grm
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Real Estate Investment Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Analyze the profitability of a rental property. Calculate cash flow, cap rate, and cash-on-cash return to make data-driven investment decisions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider border-b pb-2">Purchase Info</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Purchase Price ($):</label>
              <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Down Pmt (%):</label>
                  <input type="number" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Interest (%):</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
            </div>

            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider border-b pb-2 pt-4">Income & Expenses</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Monthly Rent ($):</label>
              <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm font-bold text-green-700" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Tax/Mo ($):</label>
                  <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ins/Mo ($):</label>
                  <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Maint (%):</label>
                  <input type="number" value={maintenancePercent} onChange={(e) => setMaintenancePercent(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Mgmt (%):</label>
                  <input type="number" value={managementPercent} onChange={(e) => setManagementPercent(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
            </div>
          </div>

          <button
            onClick={calculateROI}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg uppercase"
          >
            Run Property Analysis
          </button>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {result !== null ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center">
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Monthly Cash Flow</span>
                        <span className={`text-3xl font-black ${result.cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${result.cashFlow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center">
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Cap Rate</span>
                        <span className="text-3xl font-black text-gray-900">{result.capRate.toFixed(2)}%</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center">
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Cash on Cash</span>
                        <span className="text-3xl font-black text-blue-600">{result.cocReturn.toFixed(2)}%</span>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Monthly Breakdown</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 italic">Expected Rental Income:</span>
                            <span className="font-bold text-green-700">+ ${parseFloat(monthlyRent).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Mortgage (P&I):</span>
                            <span className="font-semibold text-rose-600">- ${result.monthlyPayment.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Operating Expenses (Tax, Ins, Maint, Mgmt):</span>
                            <span className="font-semibold text-rose-600">- ${(result.totalExpenses - result.monthlyPayment).toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between font-black text-lg">
                            <span>Net Monthly Cash Flow:</span>
                            <span className={result.cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
                                ${result.cashFlow.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center justify-between text-blue-800">
                    <span className="text-sm font-bold uppercase tracking-wider">Gross Rent Multiplier (GRM):</span>
                    <span className="text-xl font-black">{result.grm.toFixed(2)}</span>
                </div>
            </>
          ) : (
             <div className="h-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-8 text-center text-gray-500">
                Input your property details to visualize potential returns and cash flow expectations.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Real Estate Investment Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Real Estate Calculator</strong> is an essential tool for investors to evaluate the financial viability of rental properties. It provides critical metrics like Cap Rate (internal asset performance) and Cash on Cash Return (leverage-adjusted performance).
            </p>
          </>
        }
        formula={
          <>
            <p className="font-mono bg-gray-50 p-4 rounded-lg text-sm mb-2 font-bold">Cap Rate = (Annual NOI / Purchase Price) × 100</p>
          </>
        }
        example={
          <>
            <p>If you buy a $300,000 property that generates $24,000 in net operating income (NOI) annually:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Cap Rate = 24,000 ÷ 300,000</li>
              <li>Cap Rate = <strong>8.0%</strong></li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Comparative Analysis:</strong> Use this tool to compare a 4-unit dwelling in a low-growth area against a luxury condo in a high-growth city to see which offers better immediate cash flow versus equity potential.</li></ul>}
        faqs={[]}
        relatedCalculators={[]}
      />
    </div>
  );
}
