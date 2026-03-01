'use client';

import { useState } from 'react';

export default function HalfLifeCalculator() {
    const [calcType, setCalcType] = useState('remainingAmount'); // remainingAmount, halfLife, initialAmount, time
    const [initialAmount, setInitialAmount] = useState('100');
    const [finalAmount, setFinalAmount] = useState('25');
    const [time, setTime] = useState('4');
    const [halfLife, setHalfLife] = useState('2');

    const computeResult = () => {
        const n0 = parseFloat(initialAmount);
        const nt = parseFloat(finalAmount);
        const t = parseFloat(time);
        const hl = parseFloat(halfLife);

        if (calcType === 'remainingAmount') {
            if (!isNaN(n0) && !isNaN(t) && !isNaN(hl) && hl > 0) {
                // N_t = N_0 * (1/2)^(t / t_1/2)
                const result = n0 * Math.pow(0.5, t / hl);
                return { value: result, label: 'Remaining Amount (Nₜ)' };
            }
        } else if (calcType === 'halfLife') {
            if (!isNaN(n0) && !isNaN(nt) && !isNaN(t) && n0 > 0 && nt > 0 && n0 > nt && t > 0) {
                // t_1/2 = t * ln(2) / ln(N_0 / N_t)
                const result = (t * Math.LN2) / Math.log(n0 / nt);
                return { value: result, label: 'Half-Life (t₁/₂)' };
            }
        } else if (calcType === 'initialAmount') {
            if (!isNaN(nt) && !isNaN(t) && !isNaN(hl) && hl > 0) {
                // N_0 = N_t / (1/2)^(t / t_1/2)
                const result = nt / Math.pow(0.5, t / hl);
                return { value: result, label: 'Initial Amount (N₀)' };
            }
        } else if (calcType === 'time') {
            if (!isNaN(n0) && !isNaN(nt) && !isNaN(hl) && n0 > 0 && nt > 0 && n0 > nt && hl > 0) {
                // t = t_1/2 * ln(N_0 / N_t) / ln(2)
                const result = (hl * Math.log(n0 / nt)) / Math.LN2;
                return { value: result, label: 'Elapsed Time (t)' };
            }
        }
        return { value: null, label: 'Result' };
    };

    const resultData = computeResult();

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center">
                    <span className="mr-3">☢️</span> Half-Life Calculator
                </h1>
                <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                    Calculate radioactive decay factors including remaining quantity, time elapsed, initial quantity, or half-life duration.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-500 rounded-l-2xl"></div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">What do you want to calculate?</label>
                        <select
                            value={calcType}
                            onChange={(e) => setCalcType(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all font-bold bg-zinc-50 cursor-pointer"
                        >
                            <option value="remainingAmount">Remaining Amount (Nₜ)</option>
                            <option value="halfLife">Half-Life (t₁/₂)</option>
                            <option value="initialAmount">Initial Amount (N₀)</option>
                            <option value="time">Elapsed Time (t)</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {calcType !== 'initialAmount' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Initial Amount (N₀)</label>
                                <input
                                    type="number" step="any" min="0"
                                    value={initialAmount}
                                    onChange={(e) => setInitialAmount(e.target.value)}
                                    className="w-full rounded-xl border-zinc-200 p-3 shadow-sm focus:border-purple-500 font-mono font-bold"
                                />
                            </div>
                        )}
                        {calcType !== 'remainingAmount' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Remaining Amount (Nₜ)</label>
                                <input
                                    type="number" step="any" min="0"
                                    value={finalAmount}
                                    onChange={(e) => setFinalAmount(e.target.value)}
                                    className="w-full rounded-xl border-zinc-200 p-3 shadow-sm focus:border-purple-500 font-mono font-bold"
                                />
                            </div>
                        )}
                        {calcType !== 'halfLife' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Half-Life (t₁/₂)</label>
                                <input
                                    type="number" step="any" min="0"
                                    value={halfLife}
                                    onChange={(e) => setHalfLife(e.target.value)}
                                    className="w-full rounded-xl border-zinc-200 p-3 shadow-sm focus:border-purple-500 font-mono font-bold"
                                />
                            </div>
                        )}
                        {calcType !== 'time' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Elapsed Time (t)</label>
                                <input
                                    type="number" step="any" min="0"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full rounded-xl border-zinc-200 p-3 shadow-sm focus:border-purple-500 font-mono font-bold"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {resultData.value !== null ? (
                        <div className="h-full bg-slate-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-purple-800">
                            {/* Decorative element map dots */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-purple-300 font-bold uppercase tracking-widest text-xs mb-8 border-b border-purple-800/50 pb-4">{resultData.label}</h2>

                                <div className="text-5xl lg:text-5xl font-black tracking-tight text-white mb-2 drop-shadow-lg break-all font-mono py-6">
                                    {(resultData.value > 10000 || resultData.value < 0.0001)
                                        ? resultData.value.toExponential(4)
                                        : parseFloat(resultData.value.toPrecision(7))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-purple-800/50">
                                    <div className="text-purple-300 text-[10px] uppercase font-bold tracking-widest text-center">Formula Used</div>
                                    <div className="text-purple-100 font-mono mt-2 bg-black/40 p-3 rounded text-sm text-center">
                                        {calcType === 'remainingAmount' && 'Nₜ = N₀ × (1/2)^(t/t₁/₂)'}
                                        {calcType === 'halfLife' && 't₁/₂ = t × ln(2) / ln(N₀/Nₜ)'}
                                        {calcType === 'initialAmount' && 'N₀ = Nₜ / (1/2)^(t/t₁/₂)'}
                                        {calcType === 'time' && 't = t₁/₂ × ln(N₀/Nₜ) / ln(2)'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
                            <span className="text-5xl mb-4 opacity-50 grayscale filter pt-10">☢️</span>
                            <h3 className="text-zinc-700 font-bold text-lg mb-2">Awaiting Values</h3>
                            <p className="text-sm">Enter all required parameters to see the calculation result.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Half-Life Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
