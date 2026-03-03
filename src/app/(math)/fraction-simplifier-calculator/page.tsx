'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function FractionSimplifierCalculator() {
    const [numerator, setNumerator] = useState('24');
    const [denominator, setDenominator] = useState('36');

    const [result, setResult] = useState<{
        simpleNum: number;
        simpleDen: number;
        gcf: number;
        decimal: number;
        isMixed: boolean;
        wholeVal: number;
        remNum: number;
    } | null>(null);

    // Euclidean algorithm for GCF
    const getGCF = (a: number, b: number): number => {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            let t = b;
            b = a % b;
            a = t;
        }
        return Math.max(a, 1);
    };

    const calculate = () => {
        const num = parseInt(numerator);
        const den = parseInt(denominator);

        if (isNaN(num) || isNaN(den) || den === 0) {
            setResult(null);
            return;
        }

        const gcf = getGCF(num, den);

        // Handle negative signs (standardize so den is positive)
        let finalNum = num / gcf;
        let finalDen = den / gcf;
        if (finalDen < 0) {
            finalNum *= -1;
            finalDen *= -1;
        }

        const decimal = num / den;

        let wholeVal = 0;
        let remNum = 0;
        let isMixed = false;

        if (Math.abs(finalNum) > finalDen && finalNum !== 0 && finalDen !== 1) {
            isMixed = true;
            wholeVal = Math.trunc(finalNum / finalDen);
            remNum = Math.abs(finalNum % finalDen);
        }

        setResult({
            simpleNum: finalNum,
            simpleDen: finalDen,
            gcf,
            decimal,
            isMixed,
            wholeVal,
            remNum
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
                    <span className="mr-3">➗</span> Fraction Simplifier
                </h1>
                <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
                    Reduce any fraction to its lowest terms instantly.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto flex flex-col items-center">

                <div className="flex flex-col items-center gap-4 mb-8">
                    <input
                        type="number" value={numerator} onChange={(e) => setNumerator(e.target.value)}
                        className="w-32 md:w-48 text-center rounded-xl py-4 text-3xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-indigo-500 focus:outline-none transition-colors"
                        placeholder="Numerator"
                    />
                    <div className="w-full h-2 bg-indigo-900 rounded-full my-1"></div>
                    <input
                        type="number" value={denominator} onChange={(e) => setDenominator(e.target.value)}
                        className="w-32 md:w-48 text-center rounded-xl py-4 text-3xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-indigo-500 focus:outline-none transition-colors"
                        placeholder="Denominator"
                        onKeyDown={(e) => e.key === 'Enter' && calculate()}
                    />
                </div>

                <button
                    onClick={calculate}
                    className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-lg"
                >
                    Simplify Fraction
                </button>
            </div>

            {result !== null && (
                <div className="bg-indigo-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Reduced Form</h2>

                    <div className="z-10 flex gap-8 items-center mb-10">
                        {/* Original */}
                        <div className="hidden md:flex flex-col items-center opacity-40 grayscale">
                            <span className="text-white text-3xl font-bold font-mono">{numerator}</span>
                            <div className="w-16 h-1 bg-white my-2 rounded"></div>
                            <span className="text-white text-3xl font-bold font-mono">{denominator}</span>
                        </div>

                        <div className="hidden md:block text-indigo-400 text-4xl">=</div>

                        {/* Simplified */}
                        {result.simpleDen === 1 ? (
                            <div className="p-8 rounded-3xl border border-indigo-500/30 bg-black/40 shadow-inner flex flex-col items-center justify-center">
                                <span className="text-white font-mono font-black text-6xl md:text-8xl">{result.simpleNum}</span>
                            </div>
                        ) : (
                            <div className="p-8 rounded-3xl border border-indigo-500/30 bg-black/40 shadow-inner flex flex-col items-center">
                                <span className="text-white font-mono font-black text-6xl md:text-8xl">{result.simpleNum}</span>
                                <div className="w-full min-w-[120px] h-2 bg-indigo-500 my-4 rounded-full"></div>
                                <span className="text-white font-mono font-black text-6xl md:text-8xl">{result.simpleDen}</span>
                            </div>
                        )}

                    </div>

                    <div className="w-full max-w-2xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {result.isMixed && (
                            <div className="bg-black/30 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center col-span-1 md:col-span-2">
                                <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3">Improper to Mixed Number</span>
                                <div className="flex items-center text-white font-mono font-bold text-4xl">
                                    <span className="text-5xl mr-3">{result.wholeVal}</span>
                                    <div className="flex flex-col items-center">
                                        <span>{result.remNum}</span>
                                        <div className="w-8 h-1 bg-white my-1 rounded"></div>
                                        <span>{result.simpleDen}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-center">
                            <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Greatest Common Factor</span>
                            <div className="font-mono text-white text-2xl font-bold">GCF = {result.gcf}</div>
                            <p className="text-white/40 text-xs mt-2 leading-tight">We divided top & bottom by {result.gcf} to simplify.</p>
                        </div>
                        <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-center">
                            <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Decimal Value</span>
                            <div className="font-mono text-white text-2xl font-bold">≈ {result.decimal.toLocaleString('en-US', { maximumFractionDigits: 6 })}</div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Fraction Simplifier Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Fraction Simplifier & Reducer"
                    whatIsIt={
                        <>
                            <p>Our <strong>Fraction Simplifier</strong> takes any complex mathematical fraction and instantly reduces it to its lowest, simplest possible terms. It automatically identifies the Greatest Common Factor (GCF) between the top number (numerator) and bottom number (denominator) to perfectly scale down the fraction without changing its absolute mathematical value.</p>
                            <p>Additionally, if the top number is larger than the bottom number (meaning it is an "improper fraction"), this tool will automatically convert it into a clean, easy-to-read "Mixed Number" (a whole number combined with a remainder fraction).</p>
                        </>
                    }
                    formula={
                        <>
                            <p>Fractions are simplified using the Greatest Common Factor (GCF) method via the Euclidean Algorithm:</p>
                            <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
                                <strong>Step 1:</strong> Find the GCF of the Numerator and Denominator.<br /><br />
                                <strong>Step 2:</strong> Numerator ÷ GCF = New Simplified Numerator<br /><br />
                                <strong>Step 3:</strong> Denominator ÷ GCF = New Simplified Denominator
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Let's simplify a heavy fraction like <strong>24 / 36</strong>:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>The absolute largest number that divides evenly into both 24 and 36 is <strong>12</strong> (This is the GCF).</li>
                                <li><strong>Numerator Math:</strong> 24 ÷ 12 = 2.</li>
                                <li><strong>Denominator Math:</strong> 36 ÷ 12 = 3.</li>
                                <li><strong>Result:</strong> 24 / 36 perfectly simplifies down to exactly <strong>2 / 3</strong>.</li>
                                <li>The fraction is now in lowest terms because 2 and 3 share no common factors other than 1.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4">
                            <li><strong>Middle School Math Homework:</strong> Teachers universally deduct points if a final test answer is left as 50/100 instead of being properly reduced down to 1/2.</li>
                            <li><strong>Baking and Cooking Measurements:</strong> Scaling recipes up or down. If a recipe calls for 6/8 of a cup of flour, it is vastly easier to simply use a standard 3/4 measuring cup from your drawer.</li>
                            <li><strong>Carpentry and Woodworking:</strong> Converting strange fractional tape measure readings (like 12/16 of an inch) down into standard shop terminology (3/4 of an inch).</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "What is an 'Improper' Fraction?",
                            answer: "An improper fraction is simply a fraction where the top number is mathematically larger than the bottom number (e.g., 5/4 or 11/3). It means the overall value of the fraction is strictly greater than 1 whole."
                        },
                        {
                            question: "What is a 'Mixed Number'?",
                            answer: "A mixed number is an improper fraction rewritten as a whole integer plus a smaller, proper fraction. For example, the improper fraction 5/4 is rewritten as the mixed number '1 and 1/4'."
                        },
                        {
                            question: "Can a fraction be simplified if the GCF is 1?",
                            answer: "No. If the Greatest Common Factor between the top and bottom number is exactly 1 (e.g., 7/9), the fraction is already completely simplified to its absolute lowest terms. It cannot be reduced any further."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Fraction to Decimal", path: "/fraction-to-decimal-calculator", desc: "Easily convert fractions into standard decimals." },
                        { name: "Mixed Number Calculator", path: "/mixed-number-calculator", desc: "Add, subtract, and multiply mixed numbers." },
                        { name: "Proportion Calculator", path: "/proportion-calculator", desc: "Solve algebraic equations involving two set fractions." }
                    ]}
                />
            </div>
        </div>
    );
}
