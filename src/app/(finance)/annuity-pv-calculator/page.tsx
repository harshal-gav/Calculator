'use client';

import { useState } from 'react';

export default function AnnuityPVCalculator() {
    const [payment, setPayment] = useState('1000');
    const [rate, setRate] = useState('5');
    const [periods, setPeriods] = useState('10');
    const [isDue, setIsDue] = useState(false); // Ordinary vs Due

    const [result, setResult] = useState<{
        pv: number;
        totalPayout: number;
    } | null>(null);

    const calculate = () => {
        const pmt = parseFloat(payment);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(periods);

        if (isNaN(pmt) || isNaN(r) || isNaN(t) || r === 0 || t === 0) {
            setResult(null);
            return;
        }

        // PV = PMT * [1 - (1 + r)^-n] / r
        let pv = pmt * ((1 - Math.pow(1 + r, -t)) / r);

        // Annuity Due: multiply by (1 + r)
        if (isDue) {
            pv = pv * (1 + r);
        }

        setResult({
            pv,
            totalPayout: pmt * t
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⏱️</span> Annuity PV Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the Present Value of an annuity, representing the current total value of a future stream of payments.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Payment Amount per Period (PMT)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" min="0" value={payment} onChange={(e) => setPayment(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold font-mono text-xl transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Interest Rate per Period (%)</label>
                            <input
                                type="number" step="any" min="0" value={rate} onChange={(e) => setRate(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-xl transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Number of Periods (N)</label>
                            <input
                                type="number" step="any" min="1" value={periods} onChange={(e) => setPeriods(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-xl transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="block text-sm font-bold text-zinc-700 mb-4 uppercase tracking-wide">Payment Timing</label>
                        <div className="flex bg-zinc-100 rounded-xl p-1">
                            <button
                                onClick={() => { setIsDue(false); setResult(null); }}
                                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${!isDue ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200' : 'text-zinc-500 hover:bg-zinc-200'}`}
                            >
                                Ordinary Annuity (End of Period)
                            </button>
                            <button
                                onClick={() => { setIsDue(true); setResult(null); }}
                                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${isDue ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200' : 'text-zinc-500 hover:bg-zinc-200'}`}
                            >
                                Annuity Due (Beginning of Period)
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Present Value
                </button>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Results</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-3xl border-4 bg-emerald-900/60 border-emerald-400/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-white/60 text-[10px] uppercase tracking-widest mb-2 font-bold block text-center border-b border-emerald-800 pb-2 w-3/4">Present Value (PV)</span>
                            <div className="font-bold text-4xl md:text-5xl text-white text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                                ${result.pv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-lg z-10 bg-black/40 border border-emerald-500/30 p-5 rounded-xl flex justify-between items-center">
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Total Nominal Payout</span>
                        <div className="font-mono text-white text-xl font-bold">
                            ${result.totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Annuity Present Value Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
