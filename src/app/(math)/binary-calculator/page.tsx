'use client';

import { useState } from 'react';

export default function BinaryCalculator() {
    const [num1, setNum1] = useState('1010');
    const [num2, setNum2] = useState('1101');
    const [operation, setOperation] = useState('+');

    const [result, setResult] = useState<{
        binary: string;
        decimal: number;
        hex?: string;
    } | null>(null);

    const [errorMsg, setErrorMsg] = useState('');

    const calculateBinary = () => {
        setErrorMsg('');

        // Validate inputs are binary or empty
        if (!/^[01]*$/.test(num1) || !/^[01]*$/.test(num2)) {
            setErrorMsg('Inputs must only contain 0s and 1s.');
            return;
        }

        const dec1 = parseInt(num1 || '0', 2);
        const dec2 = parseInt(num2 || '0', 2);
        let decResult = 0;

        switch (operation) {
            case '+': decResult = dec1 + dec2; break;
            case '-': decResult = dec1 - dec2; break;
            case '×': decResult = dec1 * dec2; break;
            case '÷':
                if (dec2 === 0) {
                    setErrorMsg('Cannot divide by zero.');
                    return;
                }
                decResult = Math.floor(dec1 / dec2);
                break;
            case 'AND': decResult = dec1 & dec2; break;
            case 'OR': decResult = dec1 | dec2; break;
            case 'XOR': decResult = dec1 ^ dec2; break;
        }

        setResult({
            binary: (decResult >>> 0).toString(2), // Unsigned shift correctly formats negative to binary in JS if needed, though mostly standard 32 bit
            decimal: decResult,
            hex: decResult.toString(16).toUpperCase()
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-teal-900 border-b pb-4">Binary Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Perform addition, subtraction, multiplication, division, and logical operations on binary numbers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Binary Number 1</label>
                            <input
                                type="text"
                                value={num1}
                                onChange={(e) => setNum1(e.target.value.replace(/[^01]/g, ''))} // Auto-filter non-binary
                                className="w-full rounded-lg border-gray-300 p-3 font-mono text-xl shadow-sm focus:border-teal-500 tracking-widest"
                            />
                            <div className="text-xs text-gray-500 mt-1 text-right">Decimal: {num1 ? parseInt(num1, 2) : 0}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Operation</label>
                            <select value={operation} onChange={(e) => setOperation(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-teal-500 font-bold text-lg bg-white">
                                <option value="+">+ Add</option>
                                <option value="-">- Subtract</option>
                                <option value="×">× Multiply</option>
                                <option value="÷">÷ Divide</option>
                                <option value="AND">AND (Bitwise)</option>
                                <option value="OR">OR (Bitwise)</option>
                                <option value="XOR">XOR (Bitwise)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Binary Number 2</label>
                            <input
                                type="text"
                                value={num2}
                                onChange={(e) => setNum2(e.target.value.replace(/[^01]/g, ''))}
                                className="w-full rounded-lg border-gray-300 p-3 font-mono text-xl shadow-sm focus:border-teal-500 tracking-widest"
                            />
                            <div className="text-xs text-gray-500 mt-1 text-right">Decimal: {num2 ? parseInt(num2, 2) : 0}</div>
                        </div>

                        {errorMsg && <div className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg">{errorMsg}</div>}

                        <button onClick={calculateBinary} className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow-lg uppercase tracking-wide">
                            Calculate Binary
                        </button>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-teal-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center text-center p-8">
                    {result !== null ? (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-teal-800 font-semibold uppercase tracking-wider text-sm mb-2">Binary Result</h3>
                                <div className="text-3xl md:text-5xl font-black font-mono text-gray-900 break-all bg-gray-50 py-4 px-2 rounded-lg border border-gray-200">
                                    {result.binary}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">Decimal</h4>
                                    <div className="text-2xl font-bold text-gray-800">{result.decimal}</div>
                                </div>
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">Hexadecimal</h4>
                                    <div className="text-2xl font-bold font-mono text-gray-800">{result.hex}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-teal-300 font-medium opacity-50 text-xl">
                            Awaiting Computation
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Binary Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
