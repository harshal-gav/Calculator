'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

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

            <div className="mt-8">
                <CalculatorSEO
                    title="Sequence Calculator (Arithmetic & Geometric)"
                    whatIsIt={
                        <>
                            <p>The <strong>Sequence Calculator</strong> mathematically projects and sums standard numerical progressions. It supports the two fundamental types of mathematical sequences: Arithmetic and Geometric.</p>
                            <p>An Arithmetic Sequence changes by consistently <em>adding or subtracting</em> the same value. A Geometric Sequence changes by consistently <em>multiplying or dividing</em> by the same value.</p>
                        </>
                    }
                    formula={
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                <div className="bg-emerald-50 p-4 rounded-lg font-mono text-[14px] shadow-sm text-emerald-900 border border-emerald-100 flex flex-col justify-center">
                                    <h4 className="font-bold text-center border-b border-emerald-200 pb-2 mb-2 font-sans tracking-wide">Arithmetic Formulas</h4>
                                    <p className="mb-2"><strong>Nth Term:</strong> aₙ = a₁ + (n - 1)d</p>
                                    <p><strong>Sum to N:</strong> Sₙ = (n/2) × (a₁ + aₙ)</p>
                                </div>
                                <div className="bg-emerald-50 p-4 rounded-lg font-mono text-[14px] shadow-sm text-emerald-900 border border-emerald-100 flex flex-col justify-center">
                                    <h4 className="font-bold text-center border-b border-emerald-200 pb-2 mb-2 font-sans tracking-wide">Geometric Formulas</h4>
                                    <p className="mb-2"><strong>Nth Term:</strong> aₙ = a₁ × r^(n-1)</p>
                                    <p><strong>Sum to N:</strong> Sₙ = a₁ × [ (1 - r^n) / (1 - r) ]</p>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600"><em>Where a₁ is the first term, d is the common difference, r is the common ratio, and n is the number of terms.</em></p>
                        </>
                    }
                    example={
                        <>
                            <h4 className="font-bold mb-2">Arithmetic Example</h4>
                            <p>You have a starting value of <strong>2</strong> and a common difference of <strong>+3</strong>. You want to find the 5th term in the sequence.</p>
                            <ul className="list-disc pl-6 space-y-1 mt-2 text-zinc-700 mb-4">
                                <li><strong>The Sequence:</strong> 2, 5, 8, 11, 14.</li>
                                <li>The 5th Term (a₅) is exactly <strong>14</strong>.</li>
                                <li>The Sum of those 5 terms (S₅) is 2+5+8+11+14 = <strong>40</strong>.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-zinc-700">
                            <li><strong>Compound Interest (Geometric):</strong> Calculating how an initial investment grows when multiplying by 1.05 (a 5% return) every year for 30 years.</li>
                            <li><strong>Depreciation Schedules (Arithmetic):</strong> Modeling the straight-line book value of heavy machinery losing exactly $1,500 of value every single month.</li>
                            <li><strong>Computer Algorithm Analysis:</strong> Using geometric sum formulas to calculate the O(N) memory complexity and branching limits of deeply recursive data structures like Binary Trees.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Can a Geometric Common Ratio be a fraction?",
                            answer: "Yes. If the Common Ratio (r) is between 0 and 1 (like 0.5), it means the sequence is shrinking multiplicatively. For example, a sequence starting at 100 with r=0.5 goes: 100, 50, 25, 12.5."
                        },
                        {
                            question: "What is the Fibonacci Sequence?",
                            answer: "The famous Fibonacci Sequence (1, 1, 2, 3, 5, 8, 13) is neither perfectly arithmetic nor geometric. It is a 'recursive' sequence where each term is generated by adding the two previous terms together."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Compound Interest Calculator", path: "/compound-interest-calculator", desc: "The most famous real-world application of Geometric Sequences." },
                        { name: "Fraction Simplifier", path: "/fraction-simplifier-calculator", desc: "Reduce complex mathematical fractions to their absolute lowest terms." },
                        { name: "Significant Figures", path: "/sig-fig-calculator", desc: "Identify valid structural digits within scientific sequence data." }
                    ]}
                />
            </div>
        </div>
    );
}
