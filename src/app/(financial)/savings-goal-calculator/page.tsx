'use client';

import { useState } from 'react';

export default function SavingsGoalCalculator() {
    const [goalAmount, setGoalAmount] = useState('10000');
    const [currentSavings, setCurrentSavings] = useState('1000');
    const [monthlyContribution, setMonthlyContribution] = useState('300');
    const [annualInterestRate, setAnnualInterestRate] = useState('5');

    const goal = parseFloat(goalAmount);
    const initial = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualInterestRate) / 100 / 12; // Monthly interest rate

    let monthsToReach = 0;
    let years = 0;
    let totalContributed = 0;
    let totalInterest = 0;
    let isValid = false;

    if (!isNaN(goal) && !isNaN(initial) && !isNaN(monthly) && !isNaN(rate) && goal > initial && monthly > 0) {
        isValid = true;

        let currentBalance = initial;
        let months = 0;
        let interestEarned = 0;

        // Simulate month by month
        // In reality, we could use Math.log, but iterating is safer for exactly determining months without complex logarithm edge cases.
        // Cap at 1200 months (100 years) to prevent infinite loops in edge cases.
        while (currentBalance < goal && months < 1200) {
            months++;
            const monthlyInterest = currentBalance * rate;
            interestEarned += monthlyInterest;
            currentBalance += monthlyInterest + monthly;
        }

        monthsToReach = months;
        years = parseFloat((months / 12).toFixed(1));
        totalContributed = monthly * months;
        totalInterest = interestEarned;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-xl shadow-lg border border-zinc-200">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-800 border-b pb-4 flex items-center">
                <span className="mr-3">🎯</span> Savings Goal Calculator
            </h1>
            <p className="mb-8 text-zinc-600 text-lg">
                Find out exactly how long it will take to reach your savings goal via monthly contributions.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-zinc-200 shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Savings Goal ($)</label>
                        <input
                            type="number" min="0" step="100"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 p-4 shadow-inner focus:border-emerald-500 font-black text-2xl text-zinc-800 bg-zinc-50"
                            placeholder="10000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Current Saved ($)</label>
                        <input
                            type="number" min="0" step="100"
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 p-4 shadow-inner focus:border-emerald-500 font-bold text-xl text-zinc-800 bg-zinc-50"
                            placeholder="1000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Monthly Contribution ($)</label>
                        <input
                            type="number" min="1" step="50"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 p-4 shadow-inner focus:border-emerald-500 font-bold text-xl text-zinc-800 bg-zinc-50"
                            placeholder="300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 flex justify-between uppercase tracking-wide">
                            <span>Expected Annual Return (%)</span>
                            <span className="text-emerald-700 font-black">{annualInterestRate}%</span>
                        </label>
                        <input
                            type="range" min="0" max="15" step="0.5"
                            value={annualInterestRate}
                            onChange={(e) => setAnnualInterestRate(e.target.value)}
                            className="w-full h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 shadow-inner"
                        />
                    </div>
                </div>

                {/* Results breakdown */}
                <div className="bg-emerald-900 border border-emerald-800 rounded-xl p-6 md:p-8 text-white relative flex flex-col justify-center shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-bl-full -mr-4 -mt-4 opacity-50 z-0 pointer-events-none"></div>

                    {isValid ? (
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-emerald-300 font-bold uppercase tracking-widest text-sm border-b border-emerald-700 pb-2 mb-6">Time to Goal</h3>

                            <div className="flex items-baseline justify-center space-x-2">
                                <span className="text-7xl font-black text-white">{monthsToReach}</span>
                                <span className="text-emerald-400 font-bold text-xl uppercase tracking-wider">Months</span>
                            </div>
                            <div className="text-center font-bold text-emerald-200">
                                (~{years} years)
                            </div>

                            <div className="bg-emerald-950 p-6 rounded-xl border border-emerald-800 shadow-inner mt-8">
                                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 border-b border-emerald-900 pb-2">Breakdown</h4>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-emerald-300">Starting Balance</span>
                                        <span className="text-white">${initial.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-emerald-300">Total Contributions</span>
                                        <span className="text-white">${totalContributed.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-emerald-400 font-bold">+ Interest Earned</span>
                                        <span className="text-emerald-400 font-bold">${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10 text-center space-y-4">
                            <div className="text-6xl mb-4">📈</div>
                            <p className="text-emerald-300 font-bold text-xl">Almost there.</p>
                            <p className="text-emerald-400 text-sm">Ensure your goal is larger than your current savings, and you have a positive monthly contribution.</p>
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Savings Goal Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />
        </div>
    );
}
