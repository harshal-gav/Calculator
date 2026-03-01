'use client';

import { useState } from 'react';

export default function FactorialCalculator() {
    const [nValue, setNValue] = useState('5');

    const [result, setResult] = useState<{
        n: number;
        factorial: string; // Stored as string because factorials get massive quickly (170! is roughly infinity in standard JS floats)
        isInfinity: boolean;
    } | null>(null);

    const calculateFactorial = () => {
        const n = parseInt(nValue);

        if (isNaN(n) || n < 0) {
            setResult(null);
            return;
        }

        // Use BigInt for massive factorials to avoid floating point infinity or scientific notation
        let fact = BigInt(1);
        for (let i = 1; i <= n; i++) {
            fact *= BigInt(i);
        }

        let factStr = fact.toString();
        let isInf = false;

        // JS max length string safeguard
        if (n > 50000) {
            factStr = "Number too large to render accurately. Infinity boundary reached for raw text UI.";
            isInf = true;
        }

        setResult({
            n,
            factorial: factStr,
            isInfinity: isInf
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-pink-700 border-b pb-4">Factorial Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the exact factorial (n!) of any whole number down to its precise individual digits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 space-y-6 flex flex-col justify-center">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Number (n)</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={nValue}
                            onChange={(e) => setNValue(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-pink-500 font-black text-4xl text-gray-800"
                        />
                        <p className="text-xs text-gray-500 mt-2 font-medium">Must be a non-negative integer.</p>
                    </div>

                    <button onClick={calculateFactorial} className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Target n!
                    </button>
                    <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest px-4 mt-2">
                        Utilizes BigInt Architecture to prevent overflow. Note: Values past 10,000! take longer to process.
                    </p>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-pink-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result !== null ? (
                        <div className="w-full h-full flex flex-col items-center">
                            <div className="p-8 w-full bg-pink-50 border-b border-pink-100 text-center">
                                <h3 className="text-pink-800 font-bold uppercase tracking-widest text-[11px] mb-2">{result.n}! equals</h3>
                            </div>
                            <div className="flex-grow p-6 w-full bg-gray-50 flex items-center justify-center">
                                <div className={`text-gray-900 font-mono ${result.factorial.length > 50 ? 'text-sm' : 'text-3xl font-black'} break-all w-full leading-relaxed bg-white border border-gray-200 p-4 rounded-xl shadow-inner max-h-64 overflow-y-auto`}>
                                    {result.isInfinity ? (
                                        <span className="text-red-500 italic font-sans">{result.factorial}</span>
                                    ) : (
                                        // Insert commas manually into standard string for big integers
                                        result.factorial.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    )}
                                </div>
                            </div>
                            {!result.isInfinity && (
                                <div className="p-4 w-full bg-pink-600 text-white text-center">
                                    <span className="block font-bold text-pink-200 uppercase text-[10px] tracking-widest mb-1">Total Digits</span>
                                    <span className="font-bold text-lg">{result.factorial.length.toLocaleString('en-US')} digits</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-pink-300 font-medium px-8 text-lg leading-relaxed py-10">
                            Enter an integer (n) to instantly calculate the product of all positive integers less than or equal to n.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Factorial Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
