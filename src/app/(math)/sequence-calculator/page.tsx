'use client';

import { useState } from 'react';

export default function SequenceCalculator() {
    const [seqType, setSeqType] = useState('arithmetic'); // arithmetic, geometric
    const [firstTerm, setFirstTerm] = useState('2');
    const [commonDiffRatio, setCommonDiffRatio] = useState('3');
    const [termN, setTermN] = useState('10');

    const [result, setResult] = useState<{
        nthTerm: number;
        sumToN: number;
        sequencePoints: number[];
        formula: string;
    } | null>(null);

    const calculate = () => {
        const a1 = parseFloat(firstTerm);
        const d_r = parseFloat(commonDiffRatio);
        const n = parseInt(termN);

        if (isNaN(a1) || isNaN(d_r) || isNaN(n) || n < 1) {
            setResult(null);
            return;
        }

        let nth = 0;
        let sum = 0;
        let formula = '';
        const pts: number[] = [];

        if (seqType === 'arithmetic') {
            // Arithmetic: an = a1 + (n-1)d
            nth = a1 + (n - 1) * d_r;
            // Sn = n/2 * (a1 + an)
            sum = (n / 2) * (a1 + nth);
            formula = `aₙ = ${a1} + (n-1)(${d_r})`;

            for (let i = 1; i <= Math.min(n, 10); i++) {
                pts.push(a1 + (i - 1) * d_r);
            }
        } else {
            // Geometric: an = a1 * r^(n-1)
            nth = a1 * Math.pow(d_r, n - 1);
            // Sn = a1(1-r^n)/(1-r)
            if (d_r === 1) {
                sum = a1 * n;
            } else {
                sum = a1 * (1 - Math.pow(d_r, n)) / (1 - d_r);
            }
            formula = `aₙ = ${a1} × (${d_r})ⁿ⁻¹`;

            for (let i = 1; i <= Math.min(n, 10); i++) {
                pts.push(a1 * Math.pow(d_r, i - 1));
            }
        }

        setResult({
            nthTerm: nth,
            sumToN: sum,
            sequencePoints: pts,
            formula
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🔢</span> Sequence Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the Nth term and the sum of the first N terms for Arithmetic and Geometric sequences.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
                <div className="mb-8 p-2 bg-zinc-100/80 rounded-xl flex justify-center gap-2 max-w-sm mx-auto p-1">
                    <button
                        onClick={() => { setSeqType('arithmetic'); setResult(null); }}
                        className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all uppercase tracking-wider ${seqType === 'arithmetic' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-800'}`}
                    >
                        Arithmetic
                    </button>
                    <button
                        onClick={() => { setSeqType('geometric'); setResult(null); }}
                        className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all uppercase tracking-wider ${seqType === 'geometric' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-800'}`}
                    >
                        Geometric
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">First Term (a₁)</label>
                        <input
                            type="number" step="any" value={firstTerm} onChange={(e) => setFirstTerm(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-lg transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                            {seqType === 'arithmetic' ? 'Common Diff. (d)' : 'Common Ratio (r)'}
                        </label>
                        <input
                            type="number" step="any" value={commonDiffRatio} onChange={(e) => setCommonDiffRatio(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-lg transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Nth Term to Find (n)</label>
                        <input
                            type="number" step="1" min="1" value={termN} onChange={(e) => setTermN(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-lg transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Sequence
                </button>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Results</h2>

                    <div className="w-full max-w-3xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-black/40 border border-emerald-500/30 p-8 rounded-3xl shadow-inner text-center">
                            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Nth Term (aₙ)</span>
                            <div className="font-mono font-black text-4xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg">
                                {Number.isInteger(result.nthTerm) ? result.nthTerm : result.nthTerm.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>

                        <div className="bg-black/40 border border-emerald-500/30 p-8 rounded-3xl shadow-inner text-center">
                            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Sum of N Terms (Sₙ)</span>
                            <div className="font-mono font-black text-4xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg">
                                {Number.isInteger(result.sumToN) ? result.sumToN : result.sumToN.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl z-10 space-y-4">
                        <div className="bg-emerald-900/40 p-5 rounded-2xl border border-emerald-500/20 text-center">
                            <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-2 block">Explicit Formula</span>
                            <div className="font-mono text-emerald-100 text-xl font-bold bg-black/30 inline-block px-4 py-2 rounded-lg border border-white/5">
                                {result.formula}
                            </div>
                        </div>

                        <div className="bg-emerald-900/40 p-5 rounded-2xl border border-emerald-500/20 text-center">
                            <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-3 block">First few terms</span>
                            <div className="flex flex-wrap justify-center gap-2">
                                {result.sequencePoints.map((val, idx) => (
                                    <span key={idx} className="bg-emerald-950/80 text-white font-mono text-sm px-3 py-1 rounded border border-emerald-700/50">
                                        {Number.isInteger(val) ? val : Number(val.toPrecision(4))}
                                    </span>
                                ))}
                                {parseInt(termN) > 10 && <span className="text-emerald-500 px-2 py-1">...</span>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Sequence Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
