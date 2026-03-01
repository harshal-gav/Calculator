'use client';

import { useState } from 'react';

export default function ProbabilityCalculator() {
    const [calcType, setCalcType] = useState('single'); // 'single', 'multiple'

    // Single Event
    const [outcomesA, setOutcomesA] = useState('1');
    const [totalOutcomes, setTotalOutcomes] = useState('6'); // e.g. rolling a specific number on a 6 sided die

    // Multiple Events
    const [probA, setProbA] = useState('0.5'); // Probability of A
    const [probB, setProbB] = useState('0.5'); // Probability of B

    const [singleResult, setSingleResult] = useState<{
        prob: number;
        notProb: number;
        odds: string;
    } | null>(null);

    const [multiResult, setMultiResult] = useState<{
        both: number;     // P(A and B) = P(A) * P(B) assuming independent
        either: number;   // P(A or B) = P(A) + P(B) - P(both)
        onlyA: number;    // P(A) * P(!B)
        onlyB: number;    // P(!A) * P(B)
        neither: number;  // P(!A) * P(!B)
    } | null>(null);

    const calculateProb = () => {
        if (calcType === 'single') {
            const a = parseFloat(outcomesA) || 0;
            const t = parseFloat(totalOutcomes) || 0;

            if (t > 0 && a >= 0 && a <= t) {
                const p = a / t;
                const notP = 1 - p;

                // Odds ratio A : !A
                let oddsStr = '';
                if (a === 0) oddsStr = '0 : 1';
                else if (a === t) oddsStr = '1 : 0';
                else oddsStr = `${a} : ${t - a}`;

                setSingleResult({
                    prob: p,
                    notProb: notP,
                    odds: oddsStr
                });
                setMultiResult(null);
            } else {
                setSingleResult(null);
            }
        } else {
            // Assume independent events
            const pa = parseFloat(probA) || 0;
            const pb = parseFloat(probB) || 0;

            if (pa >= 0 && pa <= 1 && pb >= 0 && pb <= 1) {
                const both = pa * pb;
                const either = pa + pb - both;
                const onlyA = pa * (1 - pb);
                const onlyB = (1 - pa) * pb;
                const neither = (1 - pa) * (1 - pb);

                setMultiResult({
                    both, either, onlyA, onlyB, neither
                });
                setSingleResult(null);
            } else {
                setMultiResult(null);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-purple-900 border-b pb-4">Probability Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the likelihood of single events, independent multi-event scenarios, and associated odds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Calculation Type</label>
                        <select value={calcType} onChange={(e) => { setCalcType(e.target.value); setSingleResult(null); setMultiResult(null); }} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold bg-white text-gray-800">
                            <option value="single">Single Event Probabilities</option>
                            <option value="multiple">Two Independent Events P(A) & P(B)</option>
                        </select>
                    </div>

                    {calcType === 'single' ? (
                        <div className="space-y-4 pt-4 border-t border-purple-100">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Number of Target Outcomes</label>
                                <input type="number" value={outcomesA} onChange={(e) => setOutcomesA(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Possible Outcomes</label>
                                <input type="number" value={totalOutcomes} onChange={(e) => setTotalOutcomes(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 pt-4 border-t border-purple-100">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Probability of Event A (0 to 1)</label>
                                <input type="number" step="0.01" min="0" max="1" value={probA} onChange={(e) => setProbA(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Probability of Event B (0 to 1)</label>
                                <input type="number" step="0.01" min="0" max="1" value={probB} onChange={(e) => setProbB(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                            </div>
                        </div>
                    )}

                    <button onClick={calculateProb} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Probabilities
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-purple-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {calcType === 'single' && singleResult !== null ? (
                        <div className="w-full flex flex-col h-full">
                            <div className="p-8 pb-6 text-center bg-purple-50 border-b border-purple-100">
                                <h3 className="text-purple-800 font-bold uppercase tracking-widest text-[11px] mb-2">Probability of Occurring</h3>
                                <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                                    {(singleResult.prob * 100).toFixed(2)}<span className="text-3xl text-gray-500">%</span>
                                </div>
                                <div className="text-gray-500 font-medium mt-1">or {(singleResult.prob).toLocaleString('en-US', { maximumFractionDigits: 4 })}</div>
                            </div>

                            <div className="p-6 flex-grow space-y-4 bg-gray-50">
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                    <span className="font-bold text-purple-600 uppercase text-[10px] tracking-widest">Does Not Occur (Complement)</span>
                                    <span className="font-black text-xl text-gray-800">{(singleResult.notProb * 100).toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-inner">
                                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Odds (For : Against)</span>
                                    <span className="font-black text-xl text-gray-800">{singleResult.odds}</span>
                                </div>
                            </div>
                        </div>
                    ) : calcType === 'multiple' && multiResult !== null ? (
                        <div className="w-full flex flex-col h-full bg-gray-50">
                            <div className="p-6 grid grid-cols-1 gap-3 h-full overflow-y-auto">
                                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-600 shadow-sm flex justify-between items-center">
                                    <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">Both Occur P(A∩B)</span>
                                    <span className="font-black text-lg text-purple-700">{(multiResult.both * 100).toFixed(2)}%</span>
                                </div>
                                <div className="bg-white p-4 rounded-lg border-l-4 border-emerald-500 shadow-sm flex justify-between items-center">
                                    <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">Either Occurs P(A∪B)</span>
                                    <span className="font-black text-lg text-emerald-700">{(multiResult.either * 100).toFixed(2)}%</span>
                                </div>
                                <div className="bg-white p-4 rounded-lg border-l-4 border-sky-400 shadow-sm flex justify-between items-center">
                                    <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">Only A Occurs P(A∩!B)</span>
                                    <span className="font-black text-lg text-sky-700">{(multiResult.onlyA * 100).toFixed(2)}%</span>
                                </div>
                                <div className="bg-white p-4 rounded-lg border-l-4 border-sky-400 shadow-sm flex justify-between items-center">
                                    <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">Only B Occurs P(!A∩B)</span>
                                    <span className="font-black text-lg text-sky-700">{(multiResult.onlyB * 100).toFixed(2)}%</span>
                                </div>
                                <div className="bg-white p-4 rounded-lg border-l-4 border-gray-400 shadow-sm flex justify-between items-center">
                                    <span className="font-bold text-gray-600 uppercase tracking-widest text-[10px]">Neither Occurs P(!A∩!B)</span>
                                    <span className="font-black text-lg text-gray-800">{(multiResult.neither * 100).toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-purple-300 font-medium px-8 text-lg py-10">
                            Enter target criteria to see complete percentage breakdowns based on classical set theory.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Probability Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
