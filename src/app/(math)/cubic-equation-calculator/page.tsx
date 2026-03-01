'use client';

import { useState } from 'react';

export default function CubicEquationCalculator() {
    const [aVal, setAVal] = useState('1');
    const [bVal, setBVal] = useState('-6');
    const [cVal, setCVal] = useState('11');
    const [dVal, setDVal] = useState('-6');

    const [result, setResult] = useState<{
        roots: string[];
    } | null>(null);

    const calculate = () => {
        const a = parseFloat(aVal);
        const b = parseFloat(bVal);
        const c = parseFloat(cVal);
        const d = parseFloat(dVal);

        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || a === 0) {
            setResult(null);
            return;
        }

        // Cubic formula using Cardano's method
        // x^3 + cx^2 + dx + e = 0
        const C = b / a;
        const D = c / a;
        const E = d / a;

        // Substitute x = y - C/3 to eliminate x^2 term
        // y^3 + py + q = 0
        const p = (3 * D - C * C) / 3;
        const q = (2 * C * C * C - 9 * C * D + 27 * E) / 27;

        // Discriminant
        const disc = (q * q) / 4 + (p * p * p) / 27;

        let roots = [];
        const C3 = C / 3;

        if (Math.abs(disc) < 1e-10) {
            // disc == 0, real roots, at least two equal
            if (Math.abs(p) < 1e-10) {
                // p == 0 => y^3 = 0, y = 0
                roots.push((-C3).toString());
                roots.push((-C3).toString());
                roots.push((-C3).toString());
            } else {
                const y1 = 3 * q / p;
                const y2 = -3 * q / (2 * p);
                roots.push((y1 - C3).toFixed(4));
                roots.push((y2 - C3).toFixed(4));
                roots.push((y2 - C3).toFixed(4));
            }
        } else if (disc > 0) {
            // One real root, two complex conjugate roots
            const u = Math.cbrt(-q / 2 + Math.sqrt(disc));
            const v = Math.cbrt(-q / 2 - Math.sqrt(disc));

            const y1 = u + v;
            const yReal = -0.5 * (u + v) - C3;
            const yImag = (Math.sqrt(3) / 2) * (u - v);

            roots.push((y1 - C3).toFixed(4));

            const imagStr = Math.abs(yImag).toFixed(4);
            roots.push(`${yReal.toFixed(4)} + ${imagStr}i`);
            roots.push(`${yReal.toFixed(4)} - ${imagStr}i`);
        } else {
            // Three distinct real roots
            const r = Math.sqrt(-(p * p * p) / 27);
            const phi = Math.acos(-q / (2 * r));

            const sqrtP = Math.sqrt(-p / 3);
            const y1 = 2 * sqrtP * Math.cos(phi / 3);
            const y2 = 2 * sqrtP * Math.cos((phi + 2 * Math.PI) / 3);
            const y3 = 2 * sqrtP * Math.cos((phi + 4 * Math.PI) / 3);

            roots.push((y1 - C3).toFixed(4));
            roots.push((y2 - C3).toFixed(4));
            roots.push((y3 - C3).toFixed(4));
        }

        setResult({
            roots: roots
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
                    <span className="mr-3">³</span> Cubic Equation Calculator
                </h1>
                <p className="text-rose-700 text-lg max-w-2xl mx-auto border-b border-rose-200 pb-4">
                    Find the real and complex roots of any cubic equation in the form <span className="font-mono bg-rose-100 px-1 rounded">ax³ + bx² + cx + d = 0</span>.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                    <div className="flex items-center gap-2">
                        <input type="number" step="any" value={aVal} onChange={(e) => setAVal(e.target.value)} className="w-20 text-center rounded-lg border-zinc-300 p-2 font-bold text-lg focus:border-rose-500" />
                        <span className="font-bold text-zinc-500 text-xl font-mono">x³ +</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" step="any" value={bVal} onChange={(e) => setBVal(e.target.value)} className="w-20 text-center rounded-lg border-zinc-300 p-2 font-bold text-lg focus:border-rose-500" />
                        <span className="font-bold text-zinc-500 text-xl font-mono">x² +</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" step="any" value={cVal} onChange={(e) => setCVal(e.target.value)} className="w-20 text-center rounded-lg border-zinc-300 p-2 font-bold text-lg focus:border-rose-500" />
                        <span className="font-bold text-zinc-500 text-xl font-mono">x +</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" step="any" value={dVal} onChange={(e) => setDVal(e.target.value)} className="w-20 text-center rounded-lg border-zinc-300 p-2 font-bold text-lg focus:border-rose-500" onKeyDown={(e) => e.key === 'Enter' && calculate()} />
                        <span className="font-bold text-zinc-500 text-xl font-mono">= 0</span>
                    </div>
                </div>

                <div>
                    <button
                        onClick={calculate}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
                    >
                        Solve for x
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-rose-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Equation Roots (x₁, x₂, x₃)</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full z-10 relative">
                        {result.roots.map((root, i) => (
                            <div key={i} className="bg-black/30 p-6 rounded-xl border border-rose-500/20 shadow-inner flex flex-col items-center">
                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wide mb-2"><span className="text-rose-400">Root</span> {i + 1}</span>
                                <div className="font-mono text-white tracking-tight font-bold text-2xl md:text-3xl mt-2 break-words text-center">
                                    {root}
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-rose-300/60 text-xs mt-8 z-10 italic">
                        Real and complex roots evaluated automatically via exact Cardano derivation.
                    </p>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Cubic Equation Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
