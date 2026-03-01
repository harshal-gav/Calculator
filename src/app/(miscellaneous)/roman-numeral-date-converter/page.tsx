'use client';

import { useState } from 'react';

export default function RomanNumeralDateConverter() {
    const [month, setMonth] = useState('1');
    const [day, setDay] = useState('1');
    const [year, setYear] = useState('2024');
    const [format, setFormat] = useState('MM.DD.YYYY'); // MM.DD.YYYY, DD.MM.YYYY, YYYY.MM.DD

    const toRoman = (num: number): string => {
        if (num < 1 || num >= 4000) return num.toString();
        const romanNumerals: { value: number; numeral: string }[] = [
            { value: 1000, numeral: 'M' },
            { value: 900, numeral: 'CM' },
            { value: 500, numeral: 'D' },
            { value: 400, numeral: 'CD' },
            { value: 100, numeral: 'C' },
            { value: 90, numeral: 'XC' },
            { value: 50, numeral: 'L' },
            { value: 40, numeral: 'XL' },
            { value: 10, numeral: 'X' },
            { value: 9, numeral: 'IX' },
            { value: 5, numeral: 'V' },
            { value: 4, numeral: 'IV' },
            { value: 1, numeral: 'I' }
        ];

        let result = '';
        for (let i = 0; i < romanNumerals.length; i++) {
            while (num >= romanNumerals[i].value) {
                result += romanNumerals[i].numeral;
                num -= romanNumerals[i].value;
            }
        }
        return result;
    };

    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);

    let result = '';
    let isValid = false;

    if (!isNaN(m) && !isNaN(d) && !isNaN(y) && m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1 && y <= 3999) {
        isValid = true;
        const rm = toRoman(m);
        const rd = toRoman(d);
        const ry = toRoman(y);

        if (format === 'MM.DD.YYYY') {
            result = `${rm} . ${rd} . ${ry}`;
        } else if (format === 'DD.MM.YYYY') {
            result = `${rd} . ${rm} . ${ry}`;
        } else if (format === 'YYYY.MM.DD') {
            result = `${ry} . ${rm} . ${rd}`;
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-stone-50 rounded-2xl shadow-xl border border-stone-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-stone-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🏛️</span> Roman Numeral Date
                </h1>
                <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                    Convert any date from standard numbers into elegant Roman numerals for tattoos, engravings, and designs.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">

                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Format</label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="w-full rounded-xl border-stone-200 p-3 shadow-sm focus:border-stone-500 font-semibold bg-stone-50 cursor-pointer"
                        >
                            <option value="MM.DD.YYYY">MM . DD . YYYY (US)</option>
                            <option value="DD.MM.YYYY">DD . MM . YYYY (EU/Global)</option>
                            <option value="YYYY.MM.DD">YYYY . MM . DD (ISO)</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Month (1-12)</label>
                            <input
                                type="number" min="1" max="12"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="w-full rounded-xl border-stone-200 p-3 shadow-sm focus:border-stone-500 font-bold bg-stone-50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Day (1-31)</label>
                            <input
                                type="number" min="1" max="31"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="w-full rounded-xl border-stone-200 p-3 shadow-sm focus:border-stone-500 font-bold bg-stone-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">Year (1-3999)</label>
                        <input
                            type="number" min="1" max="3999"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full rounded-xl border-stone-200 p-3 shadow-sm focus:border-stone-500 font-bold bg-stone-50 text-lg tracking-wider"
                        />
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-3">
                    {isValid ? (
                        <div className="h-full bg-stone-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-stone-100 border border-stone-700">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <span className="font-serif text-9xl">V</span>
                            </div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-stone-400 font-bold uppercase tracking-[0.3em] text-xs mb-8 border-b border-stone-700/50 pb-4">Converted Date</h2>

                                <div className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif tracking-[0.2em] text-amber-50 leading-relaxed py-8">
                                    {result}
                                </div>

                                <div className="mt-8 pt-6 border-t border-stone-700/50">
                                    <div className="flex justify-center space-x-6 text-stone-400 text-xs font-mono">
                                        <div>M = 1000</div>
                                        <div>D = 500</div>
                                        <div>C = 100</div>
                                        <div>L = 50</div>
                                    </div>
                                    <div className="flex justify-center space-x-6 text-stone-400 text-xs font-mono mt-2">
                                        <div>X = 10</div>
                                        <div>V = 5</div>
                                        <div>I = 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-stone-300 bg-stone-100 flex flex-col items-center justify-center p-8 text-center">
                            <h3 className="text-stone-500 font-bold text-xl mb-2">Invalid Date</h3>
                            <p className="text-stone-400 text-sm">Please provide a valid month, day, and year.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Roman Numeral Date Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
