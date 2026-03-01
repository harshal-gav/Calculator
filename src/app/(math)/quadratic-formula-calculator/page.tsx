'use client';

import { useState } from 'react';

export default function QuadraticFormulaCalculator() {
    const [a, setA] = useState('1');
    const [b, setB] = useState('5');
    const [c, setC] = useState('6');

    const [roots, setRoots] = useState<{ x1: string; x2: string; type: string } | null>(null);

    const calculate = () => {
        const valA = parseFloat(a);
        const valB = parseFloat(b);
        const valC = parseFloat(c);

        if (isNaN(valA) || isNaN(valB) || isNaN(valC)) {
            setRoots(null);
            return;
        }

        if (valA === 0) {
            // Not a quadratic equation, linear bx + c = 0 -> x = -c/b
            if (valB !== 0) {
                setRoots({ x1: (-valC / valB).toString(), x2: '', type: 'Linear Equation (a = 0)' });
            } else {
                setRoots({ x1: 'No solution', x2: '', type: 'Invalid Equation' });
            }
            return;
        }

        const discriminant = valB * valB - 4 * valA * valC;

        if (discriminant > 0) {
            const sqrtD = Math.sqrt(discriminant);
            const x1 = (-valB + sqrtD) / (2 * valA);
            const x2 = (-valB - sqrtD) / (2 * valA);
            setRoots({ x1: x1.toFixed(4), x2: x2.toFixed(4), type: 'Two Distinct Real Roots' });
        } else if (discriminant === 0) {
            const x1 = -valB / (2 * valA);
            setRoots({ x1: x1.toFixed(4), x2: x1.toFixed(4), type: 'One Real Root (Repeated)' });
        } else {
            // Complex roots
            const realPart = (-valB / (2 * valA)).toFixed(4);
            const imagPart = (Math.sqrt(Math.abs(discriminant)) / (2 * valA)).toFixed(4);
            setRoots({
                x1: `${realPart} + ${imagPart}i`,
                x2: `${realPart} - ${imagPart}i`,
                type: 'Two Complex Conjugate Roots'
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif flex-wrap gap-2">
                    <span className="text-emerald-500">x =</span>
                    <span className="flex flex-col items-center ml-2 border-l border-emerald-500 pl-4 py-1 text-3xl">
                        <span className="border-b-2 border-emerald-900 pb-1">-b ± √(b² - 4ac)</span>
                        <span className="pt-1">2a</span>
                    </span>
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto mt-6">
                    Solve quadratic equations in the form <strong>ax² + bx + c = 0</strong> to find real and complex roots completely instantly.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 text-2xl font-bold font-serif text-zinc-800">
                    <input type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} className="w-24 text-center rounded-xl border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500 bg-zinc-50 py-3 shadow-inner" aria-label="Value for a" />
                    <span>x²&nbsp;&nbsp;+</span>
                    <input type="number" step="any" value={b} onChange={(e) => setB(e.target.value)} className="w-24 text-center rounded-xl border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500 bg-zinc-50 py-3 shadow-inner" aria-label="Value for b" />
                    <span>x&nbsp;&nbsp;+</span>
                    <input type="number" step="any" value={c} onChange={(e) => setC(e.target.value)} className="w-24 text-center rounded-xl border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500 bg-zinc-50 py-3 shadow-inner" aria-label="Value for c" />
                    <span>= 0</span>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={calculate}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm"
                    >
                        Solve Equation
                    </button>
                </div>
            </div>

            {roots && (
                <div className="mt-8 bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center border border-emerald-800">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="relative z-10">
                        <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2">Equation Solution</h2>
                        <h3 className="text-emerald-200 font-medium mb-8 pb-4 border-b border-emerald-800/50 inline-block px-10">{roots.type}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                                <div className="text-emerald-500 font-serif font-bold text-xl mb-2">x₁</div>
                                <div className="text-3xl md:text-4xl font-bold font-mono text-white tracking-tight">{roots.x1}</div>
                            </div>

                            {roots.x2 && (
                                <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                                    <div className="text-emerald-500 font-serif font-bold text-xl mb-2">x₂</div>
                                    <div className="text-3xl md:text-4xl font-bold font-mono text-white tracking-tight">{roots.x2}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Quadratic Formula Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
