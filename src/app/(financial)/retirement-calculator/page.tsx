'use client';

import { useState } from 'react';

export default function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState('30');
    const [retirementAge, setRetirementAge] = useState('65');
    const [currentSavings, setCurrentSavings] = useState('50000');
    const [monthlyContribution, setMonthlyContribution] = useState('500');
    const [annualReturn, setAnnualReturn] = useState('7'); // e.g. 7% post-inflation
    const [annualWithdrawal, setAnnualWithdrawal] = useState('40000');

    const curAge = parseInt(currentAge, 10);
    const retAge = parseInt(retirementAge, 10);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualReturn) / 100 / 12; // monthly rate
    const withdrawal = parseFloat(annualWithdrawal);

    let finalNestEgg = 0;
    let yearsWorking = 0;
    let totalContributed = 0;
    let totalInterest = 0;
    let theFourPercentRule = 0;
    let isEnough = false;
    let isValid = false;

    if (!isNaN(curAge) && !isNaN(retAge) && !isNaN(savings) && !isNaN(monthly) && !isNaN(rate) && !isNaN(withdrawal) && retAge > curAge) {
        isValid = true;
        yearsWorking = retAge - curAge;
        const totalMonths = yearsWorking * 12;

        // Future Value Calculation (Compound Interest + PMT)
        // Basic FV = P(1+r)^n + PMT [ ((1+r)^n - 1) / r ]
        const compoundFactor = Math.pow(1 + rate, totalMonths);

        finalNestEgg = savings * compoundFactor;

        if (rate > 0) {
            finalNestEgg += monthly * ((compoundFactor - 1) / rate);
        } else {
            finalNestEgg += monthly * totalMonths;
        }

        totalContributed = savings + (monthly * totalMonths);
        totalInterest = finalNestEgg - totalContributed;

        // Will it last? Basic 4% rule check.
        theFourPercentRule = finalNestEgg * 0.04;
        isEnough = theFourPercentRule >= withdrawal;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-blue-50 rounded-xl shadow-lg border border-blue-100">
            <h1 className="text-4xl font-extrabold mb-4 text-slate-800 border-b border-blue-200 pb-4 flex items-center">
                <span className="mr-3">🏖️</span> Retirement Calculator
            </h1>
            <p className="mb-8 text-slate-600 text-lg">
                Project your retirement nest egg and see if it safely covers your estimated annual expenses.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">

                {/* Inputs */}
                <div className="lg:col-span-2 bg-white flex flex-col space-y-6 p-6 md:p-8 rounded-xl border border-blue-200 shadow-sm">
                    <h3 className="font-bold text-blue-900 border-b border-blue-100 pb-2 uppercase tracking-wide text-sm">Your Information</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Current Age</label>
                            <input
                                type="number" min="1" max="100"
                                value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
                                className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Retirement Age</label>
                            <input
                                type="number" min={parseInt(currentAge, 10) + 1 || 2} max="100"
                                value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)}
                                className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Current Savings ($)</label>
                        <input
                            type="number" min="0" step="1000"
                            value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)}
                            className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Monthly Contribution ($)</label>
                        <input
                            type="number" min="0" step="100"
                            value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)}
                            className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest flex justify-between">
                            <span>Annual Return (%)</span>
                            <span className="text-blue-600 font-black">{annualReturn}%</span>
                        </label>
                        <input
                            type="range" min="1" max="15" step="0.5"
                            value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="text-[10px] text-slate-400 mt-1 italic text-right">* Consider using a post-inflation rate (e.g. 6-7%)</div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Estimated Annual Expenses in Retirement ($)</label>
                        <input
                            type="number" min="0" step="5000"
                            value={annualWithdrawal} onChange={(e) => setAnnualWithdrawal(e.target.value)}
                            className="w-full rounded-lg border-slate-200 p-3 bg-slate-50 focus:border-blue-500 font-bold"
                        />
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-3">
                    {isValid ? (
                        <div className="h-full bg-slate-900 rounded-xl p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between border border-slate-800">

                            {/* Abstract decorative graph */}
                            <div className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none">
                                <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="w-full h-full text-blue-500" fill="currentColor">
                                    <polygon points="0,100 0,80 20,70 40,60 60,30 80,40 100,0 100,100" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex flex-col h-full space-y-8">
                                <div>
                                    <h3 className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-2">Estimated Nest Egg at Age {retAge}</h3>
                                    <div className="text-5xl md:text-7xl font-black text-white tracking-tight">
                                        <span className="text-blue-500 text-4xl align-top mr-1">$</span>
                                        {finalNestEgg > 1000000 ? (finalNestEgg / 1000000).toFixed(2) + 'M' : finalNestEgg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                    <div className="text-sm text-slate-400 mt-2 font-medium">
                                        After {yearsWorking} years of saving and investing.
                                    </div>
                                </div>

                                {/* Status banner */}
                                <div className={`p-5 rounded-xl border ${isEnough ? 'bg-emerald-900 border-emerald-700' : 'bg-rose-900 border-rose-700'}`}>
                                    <div className="flex items-start">
                                        <div className="text-3xl mr-4">{isEnough ? '✅' : '⚠️'}</div>
                                        <div>
                                            <h4 className={`font-bold text-lg ${isEnough ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {isEnough ? 'You are on track!' : 'There may be a shortfall.'}
                                            </h4>
                                            <p className="text-sm text-slate-300 mt-1">
                                                Based on the classic 4% withdrawal rule, your nest egg provides a safe annual withdrawal of <strong className="text-white">${theFourPercentRule.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>.
                                                You specified needing <strong className="text-white">${withdrawal.toLocaleString()}</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Contributions</div>
                                        <div className="text-2xl font-black text-white">${totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                    </div>
                                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Interest Earned</div>
                                        <div className="text-2xl font-black text-emerald-400">+ ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-xl border-2 border-dashed border-blue-200 bg-white flex items-center justify-center p-8 text-center">
                            <div>
                                <div className="text-6xl mb-4 opacity-50">🏖️</div>
                                <h3 className="text-blue-900 font-bold text-xl mb-2">Ready to plan your future?</h3>
                                <p className="text-slate-500">Ensure your retirement age is greater than your current age to see your projection.</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Retirement Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />
        </div>
    );
}
