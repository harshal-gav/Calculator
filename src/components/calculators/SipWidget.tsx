"use client"

import { useState } from 'react';
import { calculateSIP } from '@/lib/calculations/sip';

type Props = {
  initialAmount: number;
  initialDuration: number;
  resultData: { totalInvested: number, estimatedReturns: number, futureValue: number };
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export function SipWidget({ initialAmount, initialDuration, resultData }: Props) {
  const [amount, setAmount] = useState(initialAmount);
  const [duration, setDuration] = useState(initialDuration);
  const [rate, setRate] = useState(12);

  // Derive real-time data if slider is dragged, otherwise use server props
  const currentResult = (amount === initialAmount && duration === initialDuration && rate === 12) 
    ? resultData 
    : calculateSIP(amount, duration, rate);

  return (
    <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-2xl flex flex-col md:flex-row gap-8">
      
      {/* Input Sliders */}
      <div className="flex-1 space-y-6">
        <div>
          <label className="flex justify-between font-bold text-gray-700 mb-2">
            <span>Monthly Investment</span>
            <span className="text-blue-700">{formatCurrency(amount)}</span>
          </label>
          <input 
            type="range" min="500" max="100000" step="500" 
            value={amount} onChange={e => setAmount(Number(e.target.value))}
            className="w-full cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <label className="flex justify-between font-bold text-gray-700 mb-2">
            <span>Investment Period (Years)</span>
            <span className="text-blue-700">{duration} Yr</span>
          </label>
          <input 
            type="range" min="1" max="40" step="1" 
            value={duration} onChange={e => setDuration(Number(e.target.value))}
            className="w-full cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <label className="flex justify-between font-bold text-gray-700 mb-2">
            <span>Expected Return Rate (p.a)</span>
            <span className="text-blue-700">{rate} %</span>
          </label>
          <input 
            type="range" min="1" max="30" step="0.5" 
            value={rate} onChange={e => setRate(Number(e.target.value))}
            className="w-full cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      {/* Interactive Display */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl flex flex-col justify-center space-y-6">
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-sm font-semibold uppercase tracking-wider">Invested Amount</span>
          <span className="text-xl font-bold">{formatCurrency(currentResult.totalInvested)}</span>
        </div>
        <div className="flex justify-between items-center text-green-700">
          <span className="text-sm font-semibold uppercase tracking-wider">Est. Returns</span>
          <span className="text-xl font-bold">+{formatCurrency(currentResult.estimatedReturns)}</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between items-center text-blue-900">
          <span className="text-sm font-bold uppercase tracking-wider">Total Value</span>
          <span className="text-3xl font-black">{formatCurrency(currentResult.futureValue)}</span>
        </div>
      </div>
      
    </div>
  );
}
