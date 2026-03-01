'use client';

import { useState } from 'react';

export default function HexCalculator() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('+');

    const [result, setResult] = useState<{
        hex: string;
        decimal: number;
    } | null>(null);

    const calculate = () => {
        if (!num1 || (!num2 && operation !== 'NOT')) {
            setResult(null);
            return;
        }

        try {
            const val1 = parseInt(num1, 16);
            const val2 = parseInt(num2, 16);

            if (isNaN(val1) || (isNaN(val2) && operation !== 'NOT')) {
                setResult(null);
                return;
            }

            let decResult = 0;

            switch (operation) {
                case '+':
                    decResult = val1 + val2;
                    break;
                case '-':
                    decResult = val1 - val2;
                    break;
                case '*':
                    decResult = val1 * val2;
                    break;
                case '/':
                    if (val2 === 0) return setResult(null); // div by zero
                    decResult = Math.floor(val1 / val2);
                    break;
                case 'AND':
                    decResult = val1 & val2;
                    break;
                case 'OR':
                    decResult = val1 | val2;
                    break;
                case 'XOR':
                    decResult = val1 ^ val2;
                    break;
                case 'NOT':
                    // Bitwise NOT in 32-bit signed int, then map back to positive hex representation
                    decResult = ~val1 >>> 0;
                    break;
            }

            // Handle negative values for display if needed
            let hexResult = '';
            if (decResult < 0) {
                // Return 32-bit two's complement hex
                hexResult = (decResult >>> 0).toString(16).toUpperCase();
            } else {
                hexResult = decResult.toString(16).toUpperCase();
            }

            setResult({
                hex: hexResult,
                decimal: decResult
            });
        } catch (error) {
            setResult(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center font-serif">
                    <span className="mr-3">#️⃣</span> Hex Calculator
                </h1>
                <p className="text-purple-700 text-lg max-w-2xl mx-auto">
                    Perform addition, subtraction, multiplication, division, and bitwise operations on Hexadecimal numbers.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="flex flex-col md:flex-row gap-4 items-center">

                    <div className="w-full">
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Hex Value 1</label>
                        <input
                            type="text"
                            value={num1}
                            onChange={(e) => setNum1(e.target.value.replace(/[^0-9a-fA-F]/g, ''))}
                            placeholder="e.g. 1A3F"
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-bold bg-zinc-50 text-xl font-mono uppercase"
                        />
                    </div>

                    <div className="w-full md:w-auto shrink-0 flex flex-col justify-end h-full pt-8 md:pt-0">
                        <select
                            value={operation}
                            onChange={(e) => setOperation(e.target.value)}
                            className="w-full md:w-32 rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-bold bg-purple-50 text-purple-900 text-center text-xl cursor-pointer"
                        >
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">×</option>
                            <option value="/">÷</option>
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                            <option value="XOR">XOR</option>
                            <option value="NOT">NOT</option>
                        </select>
                    </div>

                    <div className={`w-full ${operation === 'NOT' ? 'opacity-30 pointer-events-none' : ''}`}>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Hex Value 2</label>
                        <input
                            type="text"
                            value={num2}
                            onChange={(e) => setNum2(e.target.value.replace(/[^0-9a-fA-F]/g, ''))}
                            placeholder={operation === 'NOT' ? 'N/A' : 'e.g. B2C'}
                            disabled={operation === 'NOT'}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-bold bg-zinc-50 text-xl font-mono uppercase"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-purple-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Hex
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-purple-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Equivalent Values</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl z-10">
                        <div className="bg-purple-900/60 p-6 rounded-xl border border-purple-500/30 shadow-inner flex flex-col items-center">
                            <span className="text-purple-300 text-xs font-bold uppercase tracking-wide mb-2">Hexadecimal (Base 16)</span>
                            <div className="font-mono text-white font-bold text-4xl mt-2 break-all">{result.hex}</div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-white/10 flex flex-col items-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-2">Decimal (Base 10)</span>
                            <div className="font-mono text-zinc-300 font-bold text-4xl mt-2 break-all">{result.decimal}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">Hexadecimal Info</p>
                <p>Hexadecimal represents numbers using base 16. It uses digits 0-9 and letters A-F to represent 10-15.</p>
                <p>This calculator supports standard arithmetic (+, -, ×, ÷) as well as bitwise operations (AND, OR, XOR, NOT).</p>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Hex Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
