'use client';

import { useState } from 'react';

export default function DepreciationCalculator() {
    const [cost, setCost] = useState('10000');
    const [salvageValue, setSalvageValue] = useState('1000');
    const [usefulLife, setUsefulLife] = useState('5'); // Years
    const [method, setMethod] = useState('straightLine'); // straightLine, decliningBalance

    const [result, setResult] = useState<{
        annualDepreciation?: number; // For straight line
        rate?: number; // For declining
        schedule: { year: number; depExpense: number; accDep: number; bookValue: number }[];
    } | null>(null);

    const calculate = () => {
        const c = parseFloat(cost);
        const s = parseFloat(salvageValue);
        const l = parseInt(usefulLife, 10);

        if (isNaN(c) || isNaN(s) || isNaN(l) || l <= 0 || c <= s) {
            setResult(null);
            return;
        }

        const schedule = [];
        let bookValue = c;
        let accDep = 0;

        if (method === 'straightLine') {
            const annualDepreciation = (c - s) / l;

            for (let i = 1; i <= l; i++) {
                accDep += annualDepreciation;
                bookValue -= annualDepreciation;

                // Address floating point precision on last year
                if (i === l) {
                    bookValue = s;
                }

                schedule.push({
                    year: i,
                    depExpense: annualDepreciation,
                    accDep: accDep,
                    bookValue: bookValue
                });
            }

            setResult({
                annualDepreciation,
                schedule
            });

        } else if (method === 'decliningBalance') {
            // Double Declining Balance
            const rate = (1 / l) * 2; // 200% declining

            for (let i = 1; i <= l; i++) {
                let depExpense = bookValue * rate;

                // Do not depreciate below salvage value
                if (bookValue - depExpense < s) {
                    depExpense = bookValue - s;
                }

                // If it's the last year and we haven't hit salvage, force it (switch to straight-line technically, but we'll force final plug)
                if (i === l) {
                    depExpense = bookValue - s;
                }

                accDep += depExpense;
                bookValue -= depExpense;

                schedule.push({
                    year: i,
                    depExpense: depExpense,
                    accDep: accDep,
                    bookValue: bookValue
                });

                if (bookValue <= s && i < l) {
                    // Fill remaining years with 0 depreciation
                    for (let j = i + 1; j <= l; j++) {
                        schedule.push({
                            year: j,
                            depExpense: 0,
                            accDep: accDep,
                            bookValue: s
                        });
                    }
                    break;
                }
            }

            setResult({
                rate: rate * 100,
                schedule
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📉</span> Depreciation Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate asset depreciation using Straight-Line or Double Declining Balance methods.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="mb-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col md:flex-row items-center gap-4">
                    <label className="font-bold text-emerald-900 whitespace-nowrap uppercase tracking-widest text-sm">Method:</label>
                    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-zinc-200 w-full">
                        <button
                            onClick={() => { setMethod('straightLine'); setResult(null); }}
                            className={`flex-[1.5] py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${method === 'straightLine' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-50'}`}
                        >
                            Straight-Line
                        </button>
                        <button
                            onClick={() => { setMethod('decliningBalance'); setResult(null); }}
                            className={`flex-[2] py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${method === 'decliningBalance' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-50'}`}
                        >
                            Double Declining
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Initial Asset Cost</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">$</span>
                            <input
                                type="number" step="any" min="0"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Salvage Value</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">$</span>
                            <input
                                type="number" step="any" min="0"
                                value={salvageValue}
                                onChange={(e) => setSalvageValue(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Useful Life</label>
                        <div className="relative">
                            <input
                                type="number" step="1" min="1"
                                value={usefulLife}
                                onChange={(e) => setUsefulLife(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-xl"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Yrs</span>
                        </div>
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Generate Schedule
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
                    <div className="bg-emerald-950 p-6 flex flex-col items-center border-b-4 border-emerald-500 relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                        <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 z-10">Depreciation Overview</h2>

                        <div className="flex gap-8 z-10 text-center">
                            {result.annualDepreciation !== undefined && (
                                <div>
                                    <div className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Annual Expense</div>
                                    <div className="font-mono text-white font-bold text-3xl">${result.annualDepreciation.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                                </div>
                            )}
                            {result.rate !== undefined && (
                                <div>
                                    <div className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">DDB Rate</div>
                                    <div className="font-mono text-white font-bold text-3xl">{result.rate.toFixed(2)}%</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto p-4 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 text-xs font-bold text-emerald-900 uppercase tracking-wider border-b-2 border-zinc-200">Year</th>
                                    <th className="py-3 text-xs font-bold text-emerald-900 uppercase tracking-wider border-b-2 border-zinc-200">Depreciation Expense</th>
                                    <th className="py-3 text-xs font-bold text-emerald-900 uppercase tracking-wider border-b-2 border-zinc-200">Accumulated Dep.</th>
                                    <th className="py-3 text-xs font-bold text-emerald-900 uppercase tracking-wider border-b-2 border-zinc-200">Ending Book Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-zinc-50 transition-colors border-b border-zinc-100">
                                    <td className="py-3 px-2 font-bold text-zinc-500">0</td>
                                    <td className="py-3 px-2 font-mono text-zinc-700">-</td>
                                    <td className="py-3 px-2 font-mono text-zinc-700">$0.00</td>
                                    <td className="py-3 px-2 font-mono text-emerald-700 font-bold">${parseFloat(cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>
                                {result.schedule.map((row) => (
                                    <tr key={row.year} className="hover:bg-zinc-50 transition-colors border-b border-zinc-100">
                                        <td className="py-3 px-2 font-bold text-zinc-500">{row.year}</td>
                                        <td className="py-3 px-2 font-mono text-rose-600 font-bold">
                                            -${row.depExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-3 px-2 font-mono text-zinc-700">
                                            ${row.accDep.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-3 px-2 font-mono text-emerald-700 font-bold">
                                            ${row.bookValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Depreciation Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
