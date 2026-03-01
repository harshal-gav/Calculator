'use client';

import { useState, useEffect } from 'react';

export default function CatAgeCalculator() {
    const [catYears, setCatYears] = useState('3');

    // We can add months for cats since they age rapidly early on
    const [catMonths, setCatMonths] = useState('0');

    const [result, setResult] = useState({
        humanYears: 0,
        explanation: ''
    });

    useEffect(() => {
        calculateAge();
    }, [catYears, catMonths]);

    const calculateAge = () => {
        const years = parseInt(catYears) || 0;
        const months = parseInt(catMonths) || 0;
        const totalMonths = (years * 12) + months;

        let humanYears = 0;
        let explanation = '';

        if (totalMonths <= 0) {
            setResult({ humanYears: 0, explanation: '' });
            return;
        }

        // Standard AAHA methodology
        // 1 month = 1 human year
        // 3 months = 4 human years
        // 6 months = 10 human years
        // 1 year = 15 human years
        // 2 years = 24 human years
        // Every year after 2 adds exactly 4 human years

        if (totalMonths === 1) humanYears = 1;
        else if (totalMonths === 2) humanYears = 2;
        else if (totalMonths === 3) humanYears = 4;
        else if (totalMonths === 4) humanYears = 6;
        else if (totalMonths === 5) humanYears = 8;
        else if (totalMonths === 6) humanYears = 10;
        else if (totalMonths < 12) {
            // Interpolate roughly between 6 mo (10) and 12 mo (15)
            humanYears = 10 + ((totalMonths - 6) * (5 / 6));
        }
        else if (totalMonths <= 24) {
            const extraMonths = totalMonths - 12;
            humanYears = 15 + (extraMonths * (9 / 12)); // Year 2 adds 9 years (24 total at 2yr)
        }
        else {
            const decimalYears = totalMonths / 12;
            humanYears = 24 + ((decimalYears - 2) * 4);
        }

        if (totalMonths < 12) {
            explanation = "Kittens age extremely rapidly. A 6-month-old kitten is roughly comparable to a 10-year-old child.";
        } else if (totalMonths < 24) {
            explanation = "At age 1, a cat is about 15 human years old. Year 2 adds an additional 9 human years.";
        } else {
            explanation = "After age 2, a cat ages consistently at a rate of exactly 4 human years per calendar year.";
        }

        setResult({
            humanYears: parseFloat(humanYears.toFixed(1)),
            explanation
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-fuchsia-800 border-b pb-4 flex items-center">
                <span className="mr-3">🐱</span> Cat Age Calculator
            </h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your feline friend's true equivalent age in human years using scientific veterinary guidelines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-fuchsia-50 p-6 rounded-xl border border-fuchsia-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Age in Years</label>
                        <div className="flex items-center">
                            <button onClick={() => setCatYears(Math.max(0, parseInt(catYears || '0') - 1).toString())} className="bg-fuchsia-200 text-fuchsia-800 p-4 rounded-l-xl hover:bg-fuchsia-300 font-black text-xl w-14 transition">-</button>
                            <input
                                type="number" min="0" step="1"
                                value={catYears}
                                onChange={(e) => setCatYears(e.target.value)}
                                className="w-full border-y border-gray-300 p-4 text-center focus:outline-none focus:ring-0 font-black text-2xl text-gray-800"
                            />
                            <button onClick={() => setCatYears((parseInt(catYears || '0') + 1).toString())} className="bg-fuchsia-200 text-fuchsia-800 p-4 rounded-r-xl hover:bg-fuchsia-300 font-black text-xl w-14 transition">+</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Extra Months (0-11)</label>
                        <div className="flex items-center">
                            <button onClick={() => setCatMonths(Math.max(0, parseInt(catMonths || '0') - 1).toString())} className="bg-fuchsia-200 text-fuchsia-800 p-3 rounded-l-xl hover:bg-fuchsia-300 font-black text-xl w-14 transition">-</button>
                            <input
                                type="number" min="0" max="11" step="1"
                                value={catMonths}
                                onChange={(e) => setCatMonths(Math.min(11, Math.max(0, parseInt(e.target.value) || 0)).toString())}
                                className="w-full border-y border-gray-300 p-3 text-center focus:outline-none focus:ring-0 font-bold text-xl text-gray-800"
                            />
                            <button onClick={() => setCatMonths(Math.min(11, parseInt(catMonths || '0') + 1).toString())} className="bg-fuchsia-200 text-fuchsia-800 p-3 rounded-r-xl hover:bg-fuchsia-300 font-black text-xl w-14 transition">+</button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 pl-1">Important for kittens under 1 year old</p>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-fuchsia-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center text-center">
                    <div className="p-8 pb-6 bg-gradient-to-br from-fuchsia-600 to-purple-700 text-white h-full flex flex-col justify-center">
                        <h3 className="text-fuchsia-200 font-bold uppercase tracking-widest text-xs mb-4">Cat's Age in Human Years</h3>
                        <div className="text-8xl font-black drop-shadow-md mb-2">
                            {result.humanYears}
                        </div>
                        <div className="text-fuchsia-200 font-medium text-lg">Human Years Old</div>

                        <div className="mt-8 bg-black/25 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-sm leading-relaxed">
                            {result.explanation}
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Cat Age Calculator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
