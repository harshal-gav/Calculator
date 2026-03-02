'use client';

import { useState } from 'react';

export default function PermutationCalculator() {
    const [nVal, setNVal] = useState('10');
    const [rVal, setRVal] = useState('3');
    const [allowRepetition, setAllowRepetition] = useState(false);

    const [result, setResult] = useState<{
        permutations: string;
        formulaStr: string;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');
        const n = parseInt(nVal);
        const r = parseInt(rVal);

        if (isNaN(n) || isNaN(r)) {
            setResult(null);
            return;
        }

        if (n < 0 || r < 0) {
            setError("n and r must be non-negative integers.");
            setResult(null);
            return;
        }

        if (!allowRepetition && r > n) {
            setError("Without repetition, r cannot be greater than n.");
            setResult(null);
            return;
        }

        if (n > 1000 || (allowRepetition && r > 1000)) {
            setError("For performance reasons, digits are limited to 1000.");
            setResult(null);
            return;
        }

        try {
            let perms = BigInt(1);
            let formula = '';

            if (allowRepetition) {
                // n^r
                perms = BigInt(n) ** BigInt(r);
                formula = `n^r = ${n}^${r}`;
            } else {
                // nPr = n! / (n-r)!
                // Can optimize as n * (n-1) * ... * (n-r+1)
                for (let i = 0; i < r; i++) {
                    perms *= BigInt(n - i);
                }
                formula = `P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!}`;
            }

            let displayVal = perms.toString();
            if (displayVal.length > 25) {
                const num = Number(perms);
                displayVal = num.toExponential(6) + ` (Exact: ${displayVal})`;
            } else if (displayVal.length > 3) {
                displayVal = displayVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            setResult({
                permutations: displayVal,
                formulaStr: formula
            });

        } catch (e) {
            setError("Error calculating permutations. Result may be too large.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🔢</span> Permutations
                </h1>
                <p className="text-purple-700 text-lg max-w-2xl mx-auto">
                    Calculate nPr: The number of ways to arrange <span className="font-bold italic">r</span> items from a set of <span className="font-bold italic">n</span> items, where order <strong className="uppercase underline">does</strong> matter.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
                <div className="flex justify-center items-center gap-6 mb-8 mt-4">
                    <div className="text-center font-mono font-bold text-4xl md:text-6xl text-purple-300">
                        {allowRepetition ? 'N(' : 'P('}
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-full">
                            <label className="block text-[10px] font-bold text-zinc-500 mb-1 text-center uppercase tracking-widest">Total Items (n)</label>
                            <input
                                type="number" step="1" min="0" value={nVal} onChange={(e) => setNVal(e.target.value)}
                                className="w-24 text-center rounded-xl py-3 text-2xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-purple-500 outline-none"
                            />
                        </div>
                        <div className="text-zinc-400 font-bold text-xl">,</div>
                        <div className="w-full">
                            <label className="block text-[10px] font-bold text-zinc-500 mb-1 text-center uppercase tracking-widest">Arrange (r)</label>
                            <input
                                type="number" step="1" min="0" value={rVal} onChange={(e) => setRVal(e.target.value)}
                                className="w-24 text-center rounded-xl py-3 text-2xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-purple-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="text-center font-mono font-bold text-4xl md:text-6xl text-purple-300">
                        )
                    </div>
                </div>

                <div className="mb-8 flex justify-center">
                    <label className="flex items-center cursor-pointer bg-zinc-100 px-6 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-200 transition-colors">
                        <div className="relative">
                            <input
                                type="checkbox" className="sr-only"
                                checked={allowRepetition} onChange={(e) => { setAllowRepetition(e.target.checked); setResult(null); }}
                            />
                            <div className="block bg-zinc-300 w-10 h-6 rounded-full transition-colors"></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${allowRepetition ? 'transform translate-x-4 bg-purple-500' : ''}`}></div>
                        </div>
                        <div className="ml-3 text-zinc-700 font-bold text-sm select-none">
                            Allow Repetition (Replacement)
                        </div>
                    </label>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-purple-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate nPr
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Total Permutations</h2>

                    <div className="z-10 relative mb-8 w-full max-w-lg bg-black/40 border border-purple-500/30 p-8 rounded-3xl shadow-inner text-center">
                        <div className="font-mono font-black text-4xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg flex flex-col items-center">
                            {result.permutations}
                        </div>
                    </div>

                    {!allowRepetition && (
                        <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-center flex flex-col items-center z-10">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 block">Formula Notation</span>
                            <div className="flex items-center text-white/80 font-mono text-xl">
                                <span className="mr-4">P({nVal}, {rVal}) = </span>
                                <div className="flex flex-col items-center">
                                    <span>{nVal}!</span>
                                    <div className="w-full h-px bg-white/50 my-1"></div>
                                    <span>({nVal}-{rVal})!</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {allowRepetition && (
                        <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-center flex flex-col items-center z-10">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 block">Formula Notation</span>
                            <div className="flex items-center text-white/80 font-mono text-xl">
                                <span className="mr-4">N^R = </span>
                                <span>{nVal}<sup>{rVal}</sup></span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                input:checked + div { background-color: #a855f7; }
                input:checked + div + div { transform: translateX(100%); border-color: white; }
            `}} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Permutation Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
