'use client';

import { useState } from 'react';

export default function LcmCalculator() {
    const [inputData, setInputData] = useState('12, 18, 30');

    const [result, setResult] = useState<{
        lcm: number;
        numbers: number[];
    } | null>(null);

    // Euclidean algorithm for Greatest Common Divisor
    const gcd = (a: number, b: number): number => {
        return b === 0 ? Math.abs(a) : gcd(b, a % b);
    };

    // LCM(a,b) = (|a * b|) / GCD(a,b)
    const lcmOfTwo = (a: number, b: number): number => {
        if (a === 0 || b === 0) return 0;
        return Math.abs((a * b) / gcd(a, b));
    };

    const calculateLCM = () => {
        // Parse input safely
        const rawValues = inputData.split(/[\s,]+/).filter(Boolean);
        // Only keep integers. Float LCM is non-standard for basic math.
        const numbers = [...new Set(rawValues.map(v => parseInt(v)).filter(v => !isNaN(v) && v !== 0))];

        if (numbers.length === 0) {
            setResult(null);
            return;
        }

        let currentLCM = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            currentLCM = lcmOfTwo(currentLCM, numbers[i]);
            // Safety break for insanely large calculations causing infinity
            if (!isFinite(currentLCM)) {
                setResult(null);
                return;
            }
        }

        setResult({
            lcm: currentLCM,
            numbers
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-cyan-700 border-b pb-4">LCM Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Instantly compute the Least Common Multiple (LCM) for a dataset of two or more integers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 space-y-6 flex flex-col justify-center">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Integers (separated by commas or spaces)</label>
                        <textarea
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-cyan-500 font-mono text-lg text-gray-800 h-32 resize-none"
                            placeholder="e.g. 15, 20, 25"
                        ></textarea>
                    </div>

                    <button onClick={calculateLCM} className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Target LCM
                    </button>
                    <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest px-4 mt-2">
                        Utilizes prime factorization reduction via the Euclidean algorithm
                    </p>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-cyan-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result !== null ? (
                        <div className="w-full h-full flex flex-col items-center">
                            <div className="p-10 w-full text-center bg-cyan-50 border-b border-cyan-100 shadow-inner flex-grow flex flex-col justify-center">
                                <h3 className="text-cyan-800 font-bold uppercase tracking-widest text-[11px] mb-4">Least Common Multiple</h3>
                                <div className="text-7xl font-black text-gray-900 drop-shadow-sm break-all max-w-[90%] mx-auto">
                                    {result.lcm.toLocaleString('en-US')}
                                </div>
                            </div>

                            <div className="p-4 w-full bg-gray-50 text-center border-t border-gray-200">
                                <span className="block font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-1">Evaluated Elements</span>
                                <span className="font-mono text-sm text-gray-700 font-medium break-all">LCM({result.numbers.join(', ')})</span>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-cyan-300 font-medium px-8 text-lg leading-relaxed py-10">
                            Enter two or more non-zero integers to calculate the smallest positive integer perfectly divisible by all of them.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "LCM Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
