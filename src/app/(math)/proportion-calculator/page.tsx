'use client';

import { useState } from 'react';

export default function ProportionCalculator() {
    const [a, setA] = useState('2');
    const [b, setB] = useState('4');
    const [c, setC] = useState('3');
    const [d, setD] = useState('');

    const [result, setResult] = useState<{
        value: number;
        variable: string;
        step1: string;
        step2: string;
        step3: string;
    } | null>(null);

    const calculate = () => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        const numC = parseFloat(c);
        const numD = parseFloat(d);

        let missingCount = 0;
        let missingVar = '';

        if (isNaN(numA)) { missingCount++; missingVar = 'A'; }
        if (isNaN(numB)) { missingCount++; missingVar = 'B'; }
        if (isNaN(numC)) { missingCount++; missingVar = 'C'; }
        if (isNaN(numD)) { missingCount++; missingVar = 'D'; }

        if (missingCount !== 1) {
            setResult(null);
            return;
        }

        let ans = 0;
        let step1 = "";
        let step2 = "";
        let step3 = "";

        if (missingVar === 'A') {
            ans = (numB * numC) / numD;
            step1 = `A / ${numB} = ${numC} / ${numD}`;
            step2 = `A × ${numD} = ${numB} × ${numC}`;
            step3 = `A = ${numB * numC} / ${numD} = ${ans}`;
        } else if (missingVar === 'B') {
            ans = (numA * numD) / numC;
            step1 = `${numA} / B = ${numC} / ${numD}`;
            step2 = `B × ${numC} = ${numA} × ${numD}`;
            step3 = `B = ${numA * numD} / ${numC} = ${ans}`;
        } else if (missingVar === 'C') {
            ans = (numA * numD) / numB;
            step1 = `${numA} / ${numB} = C / ${numD}`;
            step2 = `C × ${numB} = ${numA} × ${numD}`;
            step3 = `C = ${numA * numD} / ${numB} = ${ans}`;
        } else if (missingVar === 'D') {
            ans = (numB * numC) / numA;
            step1 = `${numA} / ${numB} = ${numC} / D`;
            step2 = `D × ${numA} = ${numB} × ${numC}`;
            step3 = `D = ${numB * numC} / ${numA} = ${ans}`;
        }

        setResult({
            value: ans,
            variable: missingVar,
            step1, step2, step3
        });
    };

    const clearField = (field: string) => {
        if (field === 'A') setA('');
        if (field === 'B') setB('');
        if (field === 'C') setC('');
        if (field === 'D') setD('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⚖️</span> Proportion Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Solve ratio and proportion equations instantly. Leave exactly one field blank to calculate its value.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 text-emerald-900 font-bold text-3xl">

                    <div className="flex flex-col items-center gap-3">
                        <div className="relative group">
                            <input
                                type="number" step="any" value={a} onChange={(e) => setA(e.target.value)}
                                className="w-24 md:w-32 text-center rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 bg-zinc-50"
                                placeholder="A"
                            />
                            {a && <button onClick={() => clearField('A')} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>}
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded"></div>
                        <div className="relative group">
                            <input
                                type="number" step="any" value={b} onChange={(e) => setB(e.target.value)}
                                className="w-24 md:w-32 text-center rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 bg-zinc-50"
                                placeholder="B"
                            />
                            {b && <button onClick={() => clearField('B')} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>}
                        </div>
                    </div>

                    <div className="text-4xl px-4">=</div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="relative group">
                            <input
                                type="number" step="any" value={c} onChange={(e) => setC(e.target.value)}
                                className="w-24 md:w-32 text-center rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 bg-zinc-50"
                                placeholder="C"
                            />
                            {c && <button onClick={() => clearField('C')} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>}
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded"></div>
                        <div className="relative group">
                            <input
                                type="number" step="any" value={d} onChange={(e) => setD(e.target.value)}
                                className="w-24 md:w-32 text-center rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 bg-zinc-50"
                                placeholder={d === '' && parseFloat(a) > 0 && parseFloat(b) > 0 && parseFloat(c) > 0 ? "?" : "D"}
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                            {d && <button onClick={() => clearField('D')} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>}
                        </div>
                    </div>

                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => { setA(''); setB(''); setC(''); setD(''); setResult(null); }}
                        className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-4 px-6 rounded-xl transition-colors w-1/3"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={calculate}
                        className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Solve Proportion
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="w-full md:w-1/2 z-10 flex flex-col items-center justify-center">
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Calculated Variable ({result.variable})</span>
                        <div className="font-mono text-white tracking-tight font-black text-6xl md:text-7xl break-all drop-shadow-lg">
                            {Number.isInteger(result.value) ? result.value : result.value.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 z-10 bg-black/40 p-6 rounded-xl border border-emerald-500/30">
                        <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-3 block">Step-by-Step Solution</span>
                        <div className="space-y-3 font-mono text-emerald-100 text-sm">
                            <div className="flex gap-4">
                                <span className="text-emerald-500">1.</span>
                                <span>{result.step1}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-emerald-500">2.</span>
                                <span>{result.step2} <span className="text-emerald-500/50 italic text-xs ml-2">(Cross Multiply)</span></span>
                            </div>
                            <div className="flex gap-4 items-center bg-emerald-900/50 p-2 rounded border border-emerald-700/50">
                                <span className="text-white font-bold">3.</span>
                                <span className="text-white font-bold">{result.step3}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Proportion Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
