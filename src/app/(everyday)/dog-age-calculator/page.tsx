'use client';

import { useState, useEffect } from 'react';

export default function DogAgeCalculator() {
    const [dogYears, setDogYears] = useState('3');
    const [dogSize, setDogSize] = useState('medium');

    const [result, setResult] = useState({
        humanYears: 0,
        explanation: ''
    });

    useEffect(() => {
        calculateAge();
    }, [dogYears, dogSize]);

    const calculateAge = () => {
        const years = parseFloat(dogYears) || 0;
        let humanYears = 0;
        let explanation = '';

        if (years <= 0) {
            setResult({ humanYears: 0, explanation: '' });
            return;
        }

        // Standard AVMA/AKC methodology
        // Year 1 is 15 human years across all sizes
        // Year 2 adds 9 human years across all sizes
        // Years 3+ vary by size

        let multiplier = 5; // Medium default
        if (dogSize === 'small') multiplier = 4;
        else if (dogSize === 'large') multiplier = 6;
        else if (dogSize === 'giant') multiplier = 7; // Giant breeds age faster

        if (years <= 1) {
            humanYears = years * 15;
            explanation = "The first year of a dog's life equals roughly 15 human years.";
        } else if (years <= 2) {
            humanYears = 15 + ((years - 1) * 9);
            explanation = "Year 2 adds about 9 human years to a dog's age.";
        } else {
            humanYears = 24 + ((years - 2) * multiplier);
            explanation = `After year 2, a ${dogSize} dog ages approximately ${multiplier} human years for every dog year.`;
        }

        setResult({
            humanYears: parseFloat(humanYears.toFixed(1)),
            explanation
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-amber-800 border-b pb-4 flex items-center">
                <span className="mr-3">🐶</span> Dog Age Calculator
            </h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your dog's true age in human years using precise veterinary mathematics (not just multiplying by 7)!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Dog's Age (Years)</label>
                        <div className="flex items-center">
                            <input
                                type="number" min="0" step="0.5"
                                value={dogYears}
                                onChange={(e) => setDogYears(e.target.value)}
                                className="w-full rounded-l-xl border-gray-300 p-4 shadow-sm focus:border-amber-500 font-black text-2xl text-gray-800"
                            />
                            <div className="bg-amber-200 p-4 rounded-r-xl font-bold border-y border-r border-gray-300 text-amber-800 uppercase text-sm tracking-wider flex items-center h-full">Years</div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Dog Size / Breed Weight</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={() => setDogSize('small')}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${dogSize === 'small' ? 'border-amber-500 bg-amber-100' : 'border-gray-200 bg-white hover:border-amber-300'}`}
                            >
                                <div className="font-bold text-gray-800 text-sm">Small (≤20 lbs)</div>
                                <div className="text-[10px] text-gray-500 mt-1">Chihuahuas, Pugs</div>
                            </button>
                            <button
                                onClick={() => setDogSize('medium')}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${dogSize === 'medium' ? 'border-amber-500 bg-amber-100' : 'border-gray-200 bg-white hover:border-amber-300'}`}
                            >
                                <div className="font-bold text-gray-800 text-sm">Medium (21-50 lbs)</div>
                                <div className="text-[10px] text-gray-500 mt-1">Beagles, Spaniels</div>
                            </button>
                            <button
                                onClick={() => setDogSize('large')}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${dogSize === 'large' ? 'border-amber-500 bg-amber-100' : 'border-gray-200 bg-white hover:border-amber-300'}`}
                            >
                                <div className="font-bold text-gray-800 text-sm">Large (51-100 lbs)</div>
                                <div className="text-[10px] text-gray-500 mt-1">Retrievers, Shepherds</div>
                            </button>
                            <button
                                onClick={() => setDogSize('giant')}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${dogSize === 'giant' ? 'border-amber-500 bg-amber-100' : 'border-gray-200 bg-white hover:border-amber-300'}`}
                            >
                                <div className="font-bold text-gray-800 text-sm">Giant (100+ lbs)</div>
                                <div className="text-[10px] text-gray-500 mt-1">Mastiffs, Great Danes</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-amber-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center text-center">
                    <div className="p-8 pb-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white h-full flex flex-col justify-center">
                        <h3 className="text-amber-100 font-bold uppercase tracking-widest text-xs mb-4">Dog's Age in Human Years</h3>
                        <div className="text-8xl font-black drop-shadow-md mb-2">
                            {result.humanYears}
                        </div>
                        <div className="text-amber-200 font-medium text-lg">Human Years Old</div>

                        <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-sm">
                            {result.explanation}
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Dog Age Calculator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
