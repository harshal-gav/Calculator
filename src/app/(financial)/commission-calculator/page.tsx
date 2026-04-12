"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import commissionSeoData from "@/data/seo-content/official/commission-calculator.json";

export default function CommissionCalculator() {
  const [salesAmount, setSalesAmount] = useState("10000");
  const [commissionRate, setCommissionRate] = useState("5");
  const [bonusAmount, setBonusAmount] = useState("500");
  const [useTiers, setUseTiers] = useState(false);

  const [result, setResult] = useState({
    commission: 0,
    totalPay: 0,
    effectiveRate: 0,
  });

  useEffect(() => {
    calculateCommission();
  }, [salesAmount, commissionRate, bonusAmount, useTiers]);

  const calculateCommission = () => {
    const s = parseFloat(salesAmount) || 0;
    const r = parseFloat(commissionRate) || 0;
    const b = parseFloat(bonusAmount) || 0;

    let commission = 0;

    if (useTiers) {
      // Simple tiered logic: 5% on first 5k, 10% on anything over
      if (s <= 5000) {
        commission = s * 0.05;
      } else {
        commission = 5000 * 0.05 + (s - 5000) * (r / 100);
      }
    } else {
      commission = s * (r / 100);
    }

    const totalPay = commission + b;
    const effectiveRate = s > 0 ? (totalPay / s) * 100 : 0;

    setResult({
      commission,
      totalPay,
      effectiveRate,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-indigo-800 border-b pb-4">
        Commission Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your earnings based on sales volume, commission rates, and flat bonuses.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 space-y-6 text-gray-800">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Sales Volume
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 font-bold text-lg border-r pr-3 border-indigo-200">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={salesAmount}
                onChange={(e) => setSalesAmount(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-14 shadow-sm focus:border-indigo-500 font-bold text-2xl text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Commission Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.1"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pr-14 shadow-sm focus:border-indigo-500 font-bold text-2xl text-gray-900"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg border-l pl-3 border-gray-200">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Flat Bonus / Base Pay
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 font-bold text-lg border-r pr-3 border-indigo-200">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-14 shadow-sm focus:border-indigo-500 font-bold text-2xl text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="space-y-4">
          <div className="bg-indigo-600 p-8 rounded-xl text-white shadow-xl text-center">
            <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-xs mb-2">
              Total Earnings
            </h3>
            <div className="text-5xl font-black mb-2">
              ${result.totalPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-indigo-100 font-medium">
              Effective Rate: {result.effectiveRate.toFixed(2)}%
            </p>
          </div>

          <div className="bg-white border-2 border-indigo-100 p-6 rounded-xl shadow-inner space-y-4">
            <div className="flex justify-between items-center bg-indigo-50 p-3 rounded-lg">
              <span className="font-bold text-indigo-800 text-sm">Commission Only</span>
              <span className="font-black text-xl text-indigo-900">
                ${result.commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-bold text-gray-600 text-sm">Base / Bonus</span>
              <span className="font-black text-xl text-gray-800">
                ${parseFloat(bonusAmount || "0").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <CalculatorSEO
          title={commissionSeoData.title}
          whatIsIt={commissionSeoData.whatIsIt}
          formula={commissionSeoData.formula}
          example={commissionSeoData.example}
          useCases={commissionSeoData.useCases}
          faqs={commissionSeoData.faqs}
          deepDive={commissionSeoData.deepDive}
          glossary={commissionSeoData.glossary}
          relatedCalculators={[
            {
              name: "Salary",
              path: "/salary-calculator/",
              desc: "Convert your annual earnings into hourly rates.",
            },
            {
              name: "Markup",
              path: "/markup-calculator/",
              desc: "Calculate profit based on cost-above-wholesale.",
            },
            {
              name: "Margin",
              path: "/margin-calculator/",
              desc: "Find your gross profit percentage on sales.",
            },
            {
              name: "Mortgage",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
          ]}
        />
      </div>
    </div>
  );
}
