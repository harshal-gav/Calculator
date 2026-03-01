'use client';

import { useState } from 'react';

export default function FractionCalculator() {
    const [num1, setNum1] = useState('');
    const [den1, setDen1] = useState('');
    const [num2, setNum2] = useState('');
    const [den2, setDen2] = useState('');
    const [operation, setOperation] = useState('+');

    const [result, setResult] = useState<{
        numerator: number;
        denominator: number;
        decimal: number;
        mixedWhole?: number;
        mixedNumerator?: number;
    } | null>(null);

    // Helper: Greatest Common Divisor
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const calculateFraction = () => {
        const n1 = parseInt(num1) || 0;
        const d1 = parseInt(den1) || 1;
        const n2 = parseInt(num2) || 0;
        const d2 = parseInt(den2) || 1;

        if (d1 === 0 || d2 === 0) return; // Prevent division by zero

        let rn = 0;
        let rd = 0;

        switch (operation) {
            case '+':
                rn = n1 * d2 + n2 * d1;
                rd = d1 * d2;
                break;
            case '-':
                rn = n1 * d2 - n2 * d1;
                rd = d1 * d2;
                break;
            case '×':
                rn = n1 * n2;
                rd = d1 * d2;
                break;
            case '÷':
                rn = n1 * d2;
                rd = d1 * n2;
                break;
        }

        if (rd === 0) return;

        // Simplify
        const divisor = Math.abs(gcd(rn, rd));
        rn = rn / divisor;
        rd = rd / divisor;

        // Ensure denominator is positive
        if (rd < 0) {
            rn = -rn;
            rd = -rd;
        }

        const decimal = rn / rd;
        let mixedWhole = 0;
        let mixedNumerator = 0;

        if (Math.abs(rn) >= Math.abs(rd) && rd !== 1 && rn !== 0) {
            mixedWhole = Math.trunc(rn / rd);
            mixedNumerator = Math.abs(rn % rd);
        }

        setResult({
            numerator: rn,
            denominator: rd,
            decimal,
            mixedWhole: mixedWhole !== 0 ? mixedWhole : undefined,
            mixedNumerator: mixedNumerator !== 0 ? mixedNumerator : undefined
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-900 border-b pb-4">Fraction Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Add, subtract, multiply, and divide fractions. Results are provided in simplified, mixed, and decimal forms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-4 text-2xl font-bold">
                        {/* Fraction 1 */}
                        <div className="flex flex-col items-center gap-2">
                            <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} className="w-20 text-center rounded-lg border-gray-300 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="0" />
                            <div className="w-full h-1 bg-gray-400 rounded-full"></div>
                            <input type="number" value={den1} onChange={(e) => setDen1(e.target.value)} className="w-20 text-center rounded-lg border-gray-300 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="1" />
                        </div>

                        {/* Operation */}
                        <select value={operation} onChange={(e) => setOperation(e.target.value)} className="text-3xl bg-transparent border-none focus:ring-0 cursor-pointer text-orange-600 px-2 outline-none">
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="×">×</option>
                            <option value="÷">÷</option>
                        </select>

                        {/* Fraction 2 */}
                        <div className="flex flex-col items-center gap-2">
                            <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} className="w-20 text-center rounded-lg border-gray-300 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="0" />
                            <div className="w-full h-1 bg-gray-400 rounded-full"></div>
                            <input type="number" value={den2} onChange={(e) => setDen2(e.target.value)} className="w-20 text-center rounded-lg border-gray-300 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="1" />
                        </div>
                    </div>

                    <button onClick={calculateFraction} className="mt-8 w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide">
                        Calculate Fraction
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-orange-100 rounded-xl p-8 flex flex-col justify-center items-center shadow-sm">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8 text-orange-900">

                            <div>
                                <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs mb-4">Simplified Result</h3>
                                <div className="text-5xl font-black flex items-center justify-center gap-4">
                                    {result.denominator === 1 ? (
                                        <span>{result.numerator}</span>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span>{result.numerator}</span>
                                            <div className="w-16 h-1 bg-orange-900 rounded-full my-1"></div>
                                            <span>{result.denominator}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {result.mixedWhole !== undefined && result.mixedNumerator !== undefined && (
                                <div className="pt-6 border-t border-orange-100">
                                    <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs mb-2">Mixed Number</h3>
                                    <div className="text-3xl font-bold flex items-center justify-center gap-2">
                                        <span>{result.mixedWhole}</span>
                                        <div className="flex flex-col items-center text-xl">
                                            <span>{result.mixedNumerator}</span>
                                            <div className="w-8 h-px bg-orange-900 my-1"></div>
                                            <span>{result.denominator}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-orange-100">
                                <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs mb-1">Decimal Form</h3>
                                <div className="text-2xl font-bold text-gray-700">
                                    {parseFloat(result.decimal.toFixed(6))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-orange-300 font-medium text-center">
                            Enter your fractions to see the step-by-step simplification.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Fraction Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
