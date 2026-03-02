'use client';

import { useState } from 'react';

export default function BillSplitterCalculator() {
    const [totalBill, setTotalBill] = useState('120.00');
    const [tipPercent, setTipPercent] = useState('18');
    const [people, setPeople] = useState('4');

    const [result, setResult] = useState<{
        tipAmount: number;
        totalWithTip: number;
        perPerson: number;
    } | null>(null);

    const calculate = () => {
        const bill = parseFloat(totalBill);
        const tipPct = parseFloat(tipPercent);
        const numPeople = parseInt(people);

        if (isNaN(bill) || isNaN(tipPct) || isNaN(numPeople) || numPeople < 1) {
            setResult(null);
            return;
        }

        const tipAmount = bill * (tipPct / 100);
        const totalWithTip = bill + tipAmount;
        const perPerson = totalWithTip / numPeople;

        setResult({
            tipAmount,
            totalWithTip,
            perPerson
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-600 flex items-center justify-center font-serif">
                    <span className="mr-3">🧾</span> Bill Splitter
                </h1>
                <p className="text-rose-800/70 text-lg max-w-2xl mx-auto">
                    Quickly add tip and split the check evenly among your group.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Total Bill (Pre-Tip)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" min="0" value={totalBill} onChange={(e) => setTotalBill(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-rose-500 focus:ring-4 focus:ring-rose-100 font-bold font-mono text-xl transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Tip %</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0" value={tipPercent} onChange={(e) => setTipPercent(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 focus:ring-4 focus:ring-rose-100 font-bold font-mono text-xl transition-all"
                                />
                                <span className="absolute right-4 top-4 text-zinc-400 font-bold">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Number of People</label>
                            <div className="flex items-center">
                                <button
                                    onClick={() => setPeople(Math.max(1, parseInt(people) - 1).toString())}
                                    className="px-4 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-bold rounded-l-xl border-y border-l border-zinc-300 transition-colors"
                                >
                                    -
                                </button>
                                <input
                                    type="number" step="1" min="1" value={people} onChange={(e) => setPeople(e.target.value)}
                                    className="w-full border-y border-x-0 border-zinc-300 shadow-sm p-4 text-center focus:border-rose-500 focus:ring-0 font-bold font-mono text-xl"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                                <button
                                    onClick={() => setPeople((parseInt(people) + 1).toString())}
                                    className="px-4 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-bold rounded-r-xl border-y border-r border-zinc-300 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-between gap-2">
                        {[15, 18, 20, 25].map(pct => (
                            <button
                                key={pct}
                                onClick={() => setTipPercent(pct.toString())}
                                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors border ${tipPercent === pct.toString() ? 'bg-rose-100 border-rose-300 text-rose-700' : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'}`}
                            >
                                {pct}%
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
                    >
                        Split Bill
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-rose-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-rose-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Amount Per Person</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-full aspect-square border-4 bg-rose-900/60 border-rose-400/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-white/60 text-xs uppercase tracking-widest mb-2 font-bold block text-center border-b border-rose-800 pb-2 w-3/4">Each Pays</span>
                            <div className="font-bold text-5xl md:text-6xl text-white text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                                ${result.perPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-lg z-10 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 bg-black/40 border border-rose-500/20 p-5 rounded-xl text-center">
                            <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Total Tip</span>
                            <div className="font-mono text-white text-2xl font-bold">
                                ${result.tipAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div className="flex-1 bg-black/40 border border-rose-500/20 p-5 rounded-xl text-center">
                            <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Total Bill w/ Tip</span>
                            <div className="font-mono text-white text-2xl font-bold">
                                ${result.totalWithTip.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Bill Splitter Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
