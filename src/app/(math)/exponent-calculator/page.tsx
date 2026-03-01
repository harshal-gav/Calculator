'use client';

import { useState } from 'react';

export default function ExponentCalculator() {
    const [base, setBase] = useState('2');
    const [exponent, setExponent] = useState('8');

    const [result, setResult] = useState<{
        value: number;
        isInfinity: boolean;
    } | null>(null);

    const calculate = () => {
        const b = parseFloat(base);
        const e = parseFloat(exponent);

        if (isNaN(b) || isNaN(e)) {
            setResult(null);
            return;
        }

        const val = Math.pow(b, e);

        setResult({
            value: val,
            isInfinity: !isFinite(val)
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-violet-900 flex items-center justify-center font-serif">
                    <span className="mr-3">xⁿ</span> Exponent Calculator
                </h1>
                <p className="text-violet-700 text-lg max-w-2xl mx-auto">
                    Calculate exactly how powerful your base becomes when multiplied by itself n times.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Base (x)</label>
                        <input
                            type="number" step="any"
                            value={base} onChange={(e) => setBase(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-violet-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Exponent (n)</label>
                        <input
                            type="number" step="any"
                            value={exponent} onChange={(e) => setExponent(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-violet-500 font-bold bg-zinc-50 text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>

                </div>

                <div className="mt-8 text-center text-4xl font-mono text-zinc-300 font-bold">
                    ({base || 'x'})<sup className="text-2xl text-violet-600">{exponent || 'n'}</sup>
                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-violet-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Value
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-violet-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-violet-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Result (y)</h2>

                    {result.isInfinity ? (
                        <div className="text-white text-3xl font-bold bg-black/40 px-10 py-6 rounded-2xl border border-rose-500/30 z-10">
                            Result is too large (Infinity)
                        </div>
                    ) : (
                        <div className="font-mono text-white font-black text-5xl md:text-7xl break-all z-10 tracking-tight bg-black/40 px-10 py-6 rounded-2xl border border-violet-500/30 shadow-inner">
                            {result.value.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                        </div>
                    )}

                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">Exponent Rules</p>
                <div className="inline-block text-left text-zinc-500">
                    <ul className="list-disc list-inside">
                        <li>x² = x × x</li>
                        <li>x⁻ⁿ = 1 / xⁿ</li>
                        <li>x⁰ = 1 (for x ≠ 0)</li>
                        <li>x¹/² = √x</li>
                    </ul>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Exponent Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
