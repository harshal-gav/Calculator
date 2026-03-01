'use client';

import { useState } from 'react';

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState('10000');
    const [rate, setRate] = useState('7'); // Annual Interest Rate %
    const [years, setYears] = useState('10');

    // Compounding frequency
    const [compoundFreq, setCompoundFreq] = useState('12'); // Monthly

    // Additional Contributions
    const [contribution, setContribution] = useState('500');
    const [contributionFreq, setContributionFreq] = useState('12'); // Monthly
    const [contributionTiming, setContributionTiming] = useState('end'); // end or beginning

    // Result
    const [futureValue, setFutureValue] = useState<number | null>(null);
    const [totalContributions, setTotalContributions] = useState<number | null>(null);
    const [totalInterest, setTotalInterest] = useState<number | null>(null);

    // Series data for charting (optional conceptual use)
    const [growthData, setGrowthData] = useState<{ year: number, balance: number, interest: number, contributions: number }[]>([]);

    const calculateCompound = () => {
        const p = parseFloat(principal) || 0;
        const r = parseFloat(rate) || 0;
        const y = parseFloat(years) || 0;
        const n = parseInt(compoundFreq) || 12; // Compounds per year

        const c = parseFloat(contribution) || 0;
        const f = parseInt(contributionFreq) || 12; // Contributions per year

        if (p < 0 || y <= 0 || r < 0) return;

        // Interest rate per compounding period
        const r_n = r / 100 / n;

        let currentBalance = p;
        let totalContribs = p;
        let totInterest = 0;
        let data = [];

        // Simulating step by step to allow for complex contribution frequencies matching compounding
        // Note: For absolute precision using exact math formulas is preferred, but iterative works well for typical investment boundaries.
        // We will project monthly if possible, or yearly for simplicity in loops.
        // Doing a generic iterative approach:

        const periodsPerYear = 12; // Iterate monthly for highest fidelity
        let periodBalance = p;
        let periodContribs = p;

        for (let year = 1; year <= y; year++) {
            for (let month = 1; month <= 12; month++) {
                // Determine if a contribution happens this month
                let contribThisMonth = 0;
                if (c > 0) {
                    if (f === 12) contribThisMonth = c; // Monthly
                    if (f === 26 && month % 0.5 === 0) contribThisMonth = c; // Bi-weekly approx - simplify to monthly equivalent or iterative
                    if (f === 4 && month % 3 === 0) contribThisMonth = c; // Quarterly
                    if (f === 2 && month % 6 === 0) contribThisMonth = c; // Semi-annual
                    if (f === 1 && month === 12) contribThisMonth = c; // Annual
                }

                if (contributionTiming === 'beginning') {
                    periodBalance += contribThisMonth;
                    periodContribs += contribThisMonth;
                }

                // Determine compounding
                let interestThisMonth = 0;
                if (n === 12) {
                    // Compound monthly
                    interestThisMonth = periodBalance * (r / 100 / 12);
                } else if (n === 4 && month % 3 === 0) {
                    interestThisMonth = periodBalance * (r / 100 / 4);
                } else if (n === 2 && month % 6 === 0) {
                    interestThisMonth = periodBalance * (r / 100 / 2);
                } else if (n === 1 && month === 12) {
                    interestThisMonth = periodBalance * (r / 100 / 1);
                } else if (n === 365) {
                    // Daily approx - applying monthly equivalent
                    interestThisMonth = periodBalance * (Math.pow(1 + r / 100 / 365, 365 / 12) - 1);
                }

                periodBalance += interestThisMonth;

                if (contributionTiming === 'end') {
                    periodBalance += contribThisMonth;
                    periodContribs += contribThisMonth;
                }
            }

            data.push({
                year,
                balance: periodBalance,
                interest: periodBalance - periodContribs,
                contributions: periodContribs
            });
        }

        setFutureValue(periodBalance);
        setTotalContributions(periodContribs);
        setTotalInterest(periodBalance - periodContribs);
        setGrowthData(data);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-stone-50 rounded-2xl shadow-xl border border-stone-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📈</span> Compound Interest
                </h1>
                <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                    Visualize the magic of compound interest. See how your investments grow over time with regular contributions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-l-2xl"></div>

                    <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2 mb-4">Initial Investment</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Starting Balance</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-bold">$</span>
                                <input
                                    type="number" step="1000" min="0"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    className="w-full rounded-xl border-stone-300 pl-8 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Investment Time Span</label>
                            <div className="relative">
                                <input
                                    type="number" step="1" min="1" max="100"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    className="w-full rounded-xl border-stone-300 p-3 pr-16 shadow-sm focus:border-emerald-500 font-bold text-lg"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-bold text-sm">Years</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2 mt-8 mb-4">Interest Rate</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Expected Annual Return</label>
                            <div className="relative">
                                <input
                                    type="number" step="0.1"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full rounded-xl border-stone-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg text-emerald-800 bg-emerald-50/50"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-600 font-bold text-lg">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Compound Frequency</label>
                            <select
                                value={compoundFreq}
                                onChange={(e) => setCompoundFreq(e.target.value)}
                                className="w-full rounded-xl border-stone-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-[15px] bg-white"
                            >
                                <option value="1">Annually (1/yr)</option>
                                <option value="2">Semi-Annually (2/yr)</option>
                                <option value="4">Quarterly (4/yr)</option>
                                <option value="12">Monthly (12/yr)</option>
                                <option value="365">Daily (365/yr)</option>
                            </select>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2 mt-8 mb-4">Regular Additions</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Contribution</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-bold">$</span>
                                <input
                                    type="number" step="50" min="0"
                                    value={contribution}
                                    onChange={(e) => setContribution(e.target.value)}
                                    className="w-full rounded-xl border-stone-300 pl-8 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Frequency</label>
                            <select
                                value={contributionFreq}
                                onChange={(e) => setContributionFreq(e.target.value)}
                                className="w-full rounded-xl border-stone-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-sm bg-white"
                            >
                                <option value="12">Monthly</option>
                                <option value="4">Quarterly</option>
                                <option value="2">Semi-Annually</option>
                                <option value="1">Annually</option>
                            </select>
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Timing</label>
                            <select
                                value={contributionTiming}
                                onChange={(e) => setContributionTiming(e.target.value)}
                                className="w-full rounded-xl border-stone-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-sm bg-white"
                            >
                                <option value="end">End of Period</option>
                                <option value="beginning">Beginning of Period</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={calculateCompound}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm mt-8"
                    >
                        Calculate Growth
                    </button>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {futureValue !== null ? (
                        <div className="h-full bg-emerald-950 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-white border border-emerald-800">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                            <div className="relative z-10 w-full text-center">
                                <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-4">Future Value</h2>

                                <div className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg">
                                    ${futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <p className="text-emerald-400 text-sm font-semibold mb-8 border-b border-emerald-800/50 pb-8">After {years} years</p>

                                <div className="space-y-4 w-full">
                                    <div className="flex justify-between items-center text-sm mb-1 px-2">
                                        <span className="text-zinc-300">Total Principal</span>
                                        <span className="font-bold font-mono text-white">${(totalContributions || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm mb-4 px-2">
                                        <span className="text-emerald-300">Total Interest Earned</span>
                                        <span className="font-bold font-mono text-emerald-400">${(totalInterest || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>

                                    {/* Mini visual bar representing breakdown */}
                                    <div className="h-4 w-full rounded-full flex overflow-hidden">
                                        <div
                                            className="h-full bg-stone-500"
                                            style={{ width: `${((totalContributions || 0) / futureValue) * 100}%` }}
                                            title="Principal"
                                        ></div>
                                        <div
                                            className="h-full bg-emerald-500"
                                            style={{ width: `${((totalInterest || 0) / futureValue) * 100}%` }}
                                            title="Interest"
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 pt-1">
                                        <span>Initial/Contribs</span>
                                        <span className="text-emerald-500">Interest</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 flex flex-col items-center justify-center p-8 text-center text-emerald-600">
                            <span className="text-6xl mb-4 opacity-50 grayscale pt-6">🌱</span>
                            <h3 className="font-bold text-xl mb-2 text-emerald-800">Grow Your Wealth</h3>
                            <p className="text-sm font-medium opacity-80">Enter your investment strategy to see the exponential power of compounding over time.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Compound Interest Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />
        </div>
    );
}
