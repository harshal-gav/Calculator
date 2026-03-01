'use client';

import { useState } from 'react';

const ROMAN_MAP: [string, number][] = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1]
];

export default function RomanNumeralConverter() {
    const [numberInput, setNumberInput] = useState('2024');
    const [romanInput, setRomanInput] = useState('MMXXIV');
    const [error, setError] = useState('');

    const convertToRoman = (numStr: string) => {
        setNumberInput(numStr);
        setError('');

        if (!numStr) {
            setRomanInput('');
            return;
        }

        const num = parseInt(numStr, 10);
        if (isNaN(num) || num < 1) {
            setError('Please enter a positive integer greater than 0.');
            setRomanInput('');
            return;
        }
        if (num > 3999) {
            setError('Standard Roman numerals only support up to 3999.');
            setRomanInput('');
            return;
        }

        let tempNum = num;
        let result = '';

        for (const [roman, value] of ROMAN_MAP) {
            while (tempNum >= value) {
                result += roman;
                tempNum -= value;
            }
        }

        setRomanInput(result);
    };

    const convertToNumber = (romStr: string) => {
        const cleanStr = romStr.toUpperCase().replace(/[^IVXLCDM]/g, '');
        setRomanInput(cleanStr);
        setError('');

        if (!cleanStr) {
            setNumberInput('');
            return;
        }

        // Basic Roman validation regex
        const validRomanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        if (!validRomanRegex.test(cleanStr)) {
            setError('Invalid Roman numeral sequence.');
            setNumberInput('');
            return;
        }

        let result = 0;
        let p = 0;

        for (const [roman, value] of ROMAN_MAP) {
            while (cleanStr.substring(p, p + roman.length) === roman) {
                result += value;
                p += roman.length;
            }
        }

        setNumberInput(result.toString());
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-amber-50 rounded-xl shadow-lg border border-amber-200">
            <h1 className="text-4xl font-extrabold mb-4 text-amber-900 border-b border-amber-200 pb-4 flex items-center">
                <span className="mr-3">🏛️</span> Roman Numeral Converter
            </h1>
            <p className="mb-8 text-amber-800 text-lg">
                Convert standard numbers to Roman numerals (I, V, X, L, C, D, M) and vice versa instantly.
            </p>

            <div className="bg-white p-6 md:p-10 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
                {/* Ancient Rome columns background design */}
                <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between px-8">
                    <div className="w-12 h-full border-x-4 border-amber-900 flex justify-center">
                        <div className="w-4 h-full border-x-2 border-amber-900"></div>
                    </div>
                    <div className="w-12 h-full border-x-4 border-amber-900 flex justify-center">
                        <div className="w-4 h-full border-x-2 border-amber-900"></div>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                    {/* Arabic Number Input */}
                    <div>
                        <label className="block text-sm font-bold text-amber-700 uppercase tracking-widest text-center mb-4 border-b border-amber-100 pb-2">Number Input (1 - 3999)</label>
                        <input
                            type="number" min="1" max="3999"
                            value={numberInput}
                            onChange={(e) => convertToRoman(e.target.value)}
                            className="w-full rounded-xl border-4 border-amber-100 p-6 text-5xl font-black text-slate-800 outline-none focus:border-amber-400 transition-colors text-center shadow-inner"
                            placeholder="e.g. 2024"
                        />
                    </div>

                    {/* Roman Numeral Input */}
                    <div>
                        <label className="block text-sm font-bold text-amber-700 uppercase tracking-widest text-center mb-4 border-b border-amber-100 pb-2">Roman Numeral Input</label>
                        <input
                            type="text"
                            value={romanInput}
                            onChange={(e) => convertToNumber(e.target.value)}
                            className="w-full rounded-xl border-4 border-amber-100 p-6 text-5xl font-black text-slate-800 outline-none focus:border-amber-400 transition-colors text-center shadow-inner uppercase tracking-widest font-serif"
                            placeholder="e.g. MMXXIV"
                        />
                    </div>

                </div>

                {error && (
                    <div className="mt-8 text-center text-red-600 bg-red-50 p-4 rounded-xl border border-red-200 font-bold">
                        {error}
                    </div>
                )}
            </div>

            {/* Reference Table */}
            <div className="mt-8 bg-white p-6 rounded-2xl border border-amber-200 shadow-sm">
                <h3 className="font-bold text-amber-900 mb-4 uppercase tracking-wider text-sm border-b border-amber-100 pb-2">Roman Numeral Values</h3>
                <div className="grid grid-cols-7 gap-2 text-center">
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                        <div className="font-serif text-2xl font-black text-amber-900 mb-1">M</div>
                        <div className="text-xs font-bold text-amber-700">1000</div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                        <div className="font-serif text-2xl font-black text-amber-900 mb-1">D</div>
                        <div className="text-xs font-bold text-amber-700">500</div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                        <div className="font-serif text-2xl font-black text-amber-900 mb-1">C</div>
                        <div className="text-xs font-bold text-amber-700">100</div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                        <div className="font-serif text-2xl font-black text-amber-900 mb-1">L</div>
                        <div className="text-xs font-bold text-amber-700">50</div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                        <div className="font-serif text-2xl font-black text-amber-900 mb-1">X</div>
                        <div className="text-xs font-bold text-amber-700">10</div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                        <div className="font-serif text-2xl font-black text-amber-900 mb-1">V</div>
                        <div className="text-xs font-bold text-amber-700">5</div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                        <div className="font-serif text-2xl font-black text-amber-900 mb-1">I</div>
                        <div className="text-xs font-bold text-amber-700">1</div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Roman Numeral Converter", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
