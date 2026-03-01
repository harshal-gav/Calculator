'use client';

import { useState } from 'react';

export default function LogarithmCalculator() {
    const [base, setBase] = useState('10');
    const [value, setValue] = useState('100');

    const [result, setResult] = useState<{
        logValue: number;
        naturalLog?: boolean;
    } | null>(null);

    const calculate = () => {
        const b = parseFloat(base);
        const v = parseFloat(value);

        // Value must be strictly greater than 0
        if (isNaN(v) || v <= 0) {
            setResult(null);
            return;
        }

        // Base must be > 0 and != 1 (unless 'e' is handled, but here we require numeric input)
        // We will treat 'e' virtually if strictly typed, but here it's purely numeric.
        if (isNaN(b) || b <= 0 || b === 1) {
            setResult(null);
            return;
        }

        // Log_b(x) = ln(x) / ln(b)
        const logVal = Math.log(v) / Math.log(b);

        setResult({
            logValue: logVal,
            naturalLog: Math.abs(b - Math.E) < 0.0001
        });
    };

    const setE = () => setBase(Math.E.toString());

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">㏒</span> Logarithm Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the logarithm of any positive real number using a custom base, base 10, or base e (ln).
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">

                    <div>
                        <div className="flex justify-between items-baseline mb-2">
                            <label className="block text-sm font-bold text-zinc-600 uppercase tracking-wide">Base (b)</label>
                            <button onClick={setE} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors uppercase bg-emerald-50 px-2 py-1 rounded">
                                Use e (ln)
                            </button>
                        </div>
                        <input
                            type="number" step="any" min="0"
                            value={base} onChange={(e) => setBase(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                        />
                        <p className="text-xs text-zinc-400 mt-2">Must be &gt; 0 and ≠ 1</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Number (x)</label>
                        <input
                            type="number" step="any" min="0"
                            value={value} onChange={(e) => setValue(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                        <p className="text-xs text-zinc-400 mt-2">Must be &gt; 0</p>
                    </div>

                </div>

                <div className="mt-8 text-center text-3xl font-mono text-zinc-300 font-bold">
                    log<sub className="text-xl text-emerald-600">{base || 'b'}</sub>({value || 'x'})
                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Logarithm
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Exponent (y)</h2>

                    <div className="font-mono text-white font-black text-5xl md:text-7xl break-all z-10 tracking-tight bg-black/40 px-10 py-6 rounded-2xl border border-emerald-500/30 shadow-inner">
                        {result.logValue.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                    </div>

                    <p className="text-emerald-200 mt-6 z-10 font-bold italic">
                        {parseFloat(base) !== Math.E ? parseFloat(base).toLocaleString('en-US', { maximumFractionDigits: 4 }) : 'e'}<sup className="text-xs">{result.logValue.toLocaleString('en-US', { maximumFractionDigits: 4 })}</sup> = {parseFloat(value).toLocaleString('en-US')}
                    </p>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">The Logarithm Rule</p>
                <div className="inline-block bg-white p-4 rounded-lg shadow-sm font-mono text-lg border border-zinc-200 mb-2">
                    y = log<sub className="text-sm">b</sub>(x)  ⟺  b<sup className="text-sm">y</sup> = x
                </div>
                <p>A logarithm is the exponent to which the chosen base must be raised to obtain the given number.</p>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Logarithm Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
