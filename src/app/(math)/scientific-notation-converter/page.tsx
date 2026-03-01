'use client';

import { useState } from 'react';

export default function ScientificNotationConverter() {
    const [standardInput, setStandardInput] = useState('0.000345');
    const [sciInputBase, setSciInputBase] = useState('3.45');
    const [sciInputPower, setSciInputPower] = useState('-4');

    // Convert Standard to Sci
    const handleStandardChange = (val: string) => {
        setStandardInput(val);
        const num = parseFloat(val);

        if (isNaN(num)) {
            setSciInputBase('');
            setSciInputPower('');
            return;
        }

        if (num === 0) {
            setSciInputBase('0');
            setSciInputPower('0');
            return;
        }

        // e.g. "3.45e-4"
        const exponentialStr = num.toExponential();
        const parts = exponentialStr.split('e');

        setSciInputBase(parseFloat(parts[0]).toString()); // Clean format
        setSciInputPower(parts[1].replace('+', ''));
    };

    // Convert Sci to Standard
    const handleSciChange = (base: string, power: string) => {
        setSciInputBase(base);
        setSciInputPower(power);

        const b = parseFloat(base);
        const p = parseInt(power, 10);

        if (isNaN(b) || isNaN(p)) {
            setStandardInput('');
            return;
        }

        // calculate standard format reliably
        // parseFloat limits JS precision, handle big/small nicely
        const calc = b * Math.pow(10, p);

        // Prevent JS from auto-formatting it back into e notation if possible
        if (Math.abs(p) > 20) {
            setStandardInput(calc.toString());
        } else {
            // We can reconstruct string or let JS handle it
            setStandardInput(calc.toString().replace('e+', 'e').replace('e', ' x 10^')); // Fallback
            // A more elegant solution for normal range numbers
            let s = calc.toString();
            if (s.includes('e')) {
                // Actually if it's too big, JS uses e anyway. We will use Intl.NumberFormat roughly or raw calc
                // Actually JS converts to big string precisely via strings:
                if (p >= 0) {
                    const absBase = Math.abs(b);
                    const isNeg = b < 0;
                    const bStrParts = absBase.toString().split('.');
                    let intPart = bStrParts[0] || '0';
                    let fracPart = bStrParts[1] || '';

                    if (p >= fracPart.length) {
                        const trailingZeros = '0'.repeat(p - fracPart.length);
                        setStandardInput((isNeg ? '-' : '') + intPart + fracPart + trailingZeros);
                    } else {
                        // Needs moving decimal right
                        const newInt = intPart + fracPart.substring(0, p);
                        const newFrac = fracPart.substring(p);
                        setStandardInput((isNeg ? '-' : '') + newInt + '.' + newFrac);
                    }
                } else {
                    const absBase = Math.abs(b);
                    const isNeg = b < 0;
                    const bStrParts = absBase.toString().split('.');
                    let intPart = bStrParts[0] || '0';
                    let fracPart = bStrParts[1] || '';

                    const pAbs = Math.abs(p);
                    if (pAbs >= intPart.length) {
                        const leadingZeros = '0'.repeat(pAbs - intPart.length);
                        setStandardInput((isNeg ? '-' : '') + '0.' + leadingZeros + intPart + fracPart);
                    } else {
                        // Needs moving decimal left
                        const newInt = intPart.substring(0, intPart.length - pAbs);
                        const newFrac = intPart.substring(intPart.length - pAbs) + fracPart;
                        setStandardInput((isNeg ? '-' : '') + newInt + '.' + newFrac);
                    }
                }
            } else {
                setStandardInput(s);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 font-serif">
                    <span className="mr-3">🔬</span> Scientific Notation
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Convert instantly between standard decimal format and scientific exponential notation.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">

                {/* Visual Arrow connector purely for desktop */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-emerald-500 rounded-full items-center justify-center text-white shadow-lg border-4 border-zinc-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                </div>

                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 relative overflow-hidden group hover:border-emerald-300 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 rounded-t-2xl"></div>
                    <label className="block text-sm font-bold text-zinc-500 mb-6 uppercase tracking-widest text-center">Standard Decimal Notation</label>
                    <div className="flex justify-center">
                        <textarea
                            value={standardInput}
                            onChange={(e) => handleStandardChange(e.target.value)}
                            placeholder="e.g. 1250000 or 0.0045"
                            className="w-full text-center rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-2xl md:text-3xl font-bold bg-zinc-50 resize-none h-40 flex items-center p-4"
                        />
                    </div>
                </div>

                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 relative overflow-hidden group hover:border-emerald-300 transition-colors flex flex-col justify-center min-h-[14rem]">
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 rounded-t-2xl"></div>
                    <label className="block text-sm font-bold text-zinc-500 mb-8 uppercase tracking-widest text-center">Scientific Notation</label>
                    <div className="flex items-end justify-center gap-2 font-mono text-3xl font-bold text-emerald-900 pb-4">
                        <input
                            type="number" step="any"
                            value={sciInputBase}
                            onChange={(e) => handleSciChange(e.target.value, sciInputPower)}
                            className="w-24 md:w-32 text-center rounded-lg border-zinc-300 focus:border-emerald-500 bg-zinc-50 py-2 shadow-inner"
                        />
                        <span className="pb-3 text-zinc-400">×</span>
                        <span className="pb-3 text-zinc-800">10</span>
                        <input
                            type="number" step="1"
                            value={sciInputPower}
                            onChange={(e) => handleSciChange(sciInputBase, e.target.value)}
                            className="w-16 md:w-24 text-center rounded-lg border-zinc-300 focus:border-emerald-500 bg-emerald-100 text-emerald-800 py-1 shadow-inner text-xl mb-6 relative bottom-4 -ml-1 border"
                            title="Exponent"
                        />
                    </div>
                </div>

            </div>

            <div className="mt-8 text-center bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <p className="text-emerald-700 text-sm">Valid format in scientific notation is: <strong className="font-mono bg-emerald-200/50 px-2 py-1 rounded">a × 10ⁿ</strong> where 1 ≤ |a| &lt; 10</p>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Scientific Notation Converter", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
