'use client';

import { useState } from 'react';

// Simplified approximate conversion chart for adults
const SIZES = [
    { us_m: 6.0, us_w: 7.5, uk: 5.5, eu: 38.5, cm: 24.0 },
    { us_m: 6.5, us_w: 8.0, uk: 6.0, eu: 39.0, cm: 24.5 },
    { us_m: 7.0, us_w: 8.5, uk: 6.5, eu: 40.0, cm: 25.0 },
    { us_m: 7.5, us_w: 9.0, uk: 7.0, eu: 40.5, cm: 25.5 },
    { us_m: 8.0, us_w: 9.5, uk: 7.5, eu: 41.0, cm: 26.0 },
    { us_m: 8.5, us_w: 10.0, uk: 8.0, eu: 42.0, cm: 26.5 },
    { us_m: 9.0, us_w: 10.5, uk: 8.5, eu: 42.5, cm: 27.0 },
    { us_m: 9.5, us_w: 11.0, uk: 9.0, eu: 43.0, cm: 27.5 },
    { us_m: 10.0, us_w: 11.5, uk: 9.5, eu: 44.0, cm: 28.0 },
    { us_m: 10.5, us_w: 12.0, uk: 10.0, eu: 44.5, cm: 28.5 },
    { us_m: 11.0, us_w: 12.5, uk: 10.5, eu: 45.0, cm: 29.0 },
    { us_m: 11.5, us_w: 13.0, uk: 11.0, eu: 45.5, cm: 29.5 },
    { us_m: 12.0, us_w: 13.5, uk: 11.5, eu: 46.0, cm: 30.0 },
    { us_m: 13.0, us_w: 14.5, uk: 12.5, eu: 47.5, cm: 31.0 },
    { us_m: 14.0, us_w: 15.5, uk: 13.5, eu: 48.5, cm: 32.0 },
    { us_m: 15.0, us_w: 16.5, uk: 14.5, eu: 49.5, cm: 33.0 }
];

export default function ShoeSizeConverter() {
    const [selectedSystem, setSelectedSystem] = useState<'us_m' | 'us_w' | 'uk' | 'eu' | 'cm'>('us_m');
    const [inputValue, setInputValue] = useState('9.0');

    // Find the closest match to the input
    const findClosestSize = (targetVal: number, system: keyof typeof SIZES[0]) => {
        let closest = SIZES[0];
        let minDiff = Math.abs(SIZES[0][system] - targetVal);

        for (let i = 1; i < SIZES.length; i++) {
            const diff = Math.abs(SIZES[i][system] - targetVal);
            if (diff < minDiff) {
                minDiff = diff;
                closest = SIZES[i];
            }
        }
        return closest;
    };

    const currentValue = parseFloat(inputValue);
    const result = isNaN(currentValue) ? null : findClosestSize(currentValue, selectedSystem);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-neutral-900 rounded-xl shadow-2xl border border-neutral-800 text-neutral-200">
            <h1 className="text-4xl font-extrabold mb-4 text-purple-400 border-b border-neutral-800 pb-4 flex items-center">
                <span className="mr-3">👟</span> Shoe Size Converter
            </h1>
            <p className="mb-8 text-neutral-400 text-lg">
                Instantly convert adult shoe sizes between US (Men/Women), UK, EU, and measurement in Centimeters (CM).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                {/* Input Section */}
                <div className="bg-neutral-800 p-6 md:p-8 rounded-2xl border border-neutral-700 shadow-inner">
                    <label className="block text-sm font-bold text-neutral-400 mb-4 uppercase tracking-wider">Select Your Starting Size</label>
                    <div className="space-y-6">

                        <div className="flex">
                            <select
                                value={selectedSystem}
                                onChange={(e) => setSelectedSystem(e.target.value as any)}
                                className="w-1/3 bg-neutral-900 text-neutral-100 font-bold p-4 rounded-l-xl border-y border-l border-neutral-700 outline-none focus:border-purple-500 transition-colors shadow-sm"
                            >
                                <option value="us_m">US Men</option>
                                <option value="us_w">US Women</option>
                                <option value="uk">UK</option>
                                <option value="eu">EU</option>
                                <option value="cm">CM / JP</option>
                            </select>
                            <input
                                type="number" step="0.5"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-2/3 rounded-r-xl border-2 border-l-0 border-neutral-700 p-4 text-2xl font-black text-white bg-neutral-950 outline-none focus:border-purple-500 transition-colors shadow-inner"
                                placeholder="9.0"
                            />
                        </div>

                        <div className="flex items-start gap-3 bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-blue-200/70">Shoe sizing varies heavily by brand (Nike, Adidas, etc.). These conversions represent the most common international standard equivalents used by major manufacturers.</p>
                        </div>
                    </div>
                </div>

                {/* Output Display */}
                <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 md:p-8 rounded-2xl border border-neutral-700 shadow-lg relative overflow-hidden">

                    {/* Background decor */}
                    <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6c-0.11,0.26-0.11,0.55,0,0.81C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.59 C22.03,12.15,22.03,11.86,21.92,11.6z M12,18c-3.17,0-6.17-2.29-7.9-6c1.73-3.71,4.73-6,7.9-6s6.17,2.29,7.9,6 C18.17,15.71,15.17,18,12,18z M12,6.5c-3.03,0-5.5,2.47-5.5,5.5s2.47,5.5,5.5,5.5s5.5-2.47,5.5-5.5S15.03,6.5,12,6.5z M12,15.5 c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z" />
                        </svg>
                    </div>

                    <div className="relative z-10 w-full h-full flex flex-col justify-center">
                        <h3 className="font-bold text-neutral-500 uppercase tracking-widest text-xs mb-6 text-center border-b border-neutral-700 pb-2">Equivalent Sizes</h3>

                        {result ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`bg-neutral-900 p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${selectedSystem === 'us_m' ? 'border-purple-500 bg-purple-900/10' : 'border-neutral-800'}`}>
                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">US Men</div>
                                    <div className="text-3xl font-black text-white">{result.us_m.toFixed(1)}</div>
                                </div>
                                <div className={`bg-neutral-900 p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${selectedSystem === 'us_w' ? 'border-purple-500 bg-purple-900/10' : 'border-neutral-800'}`}>
                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">US Women</div>
                                    <div className="text-3xl font-black text-white">{result.us_w.toFixed(1)}</div>
                                </div>
                                <div className={`bg-neutral-900 p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${selectedSystem === 'uk' ? 'border-purple-500 bg-purple-900/10' : 'border-neutral-800'}`}>
                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">UK</div>
                                    <div className="text-3xl font-black text-white">{result.uk.toFixed(1)}</div>
                                </div>
                                <div className={`bg-neutral-900 p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${selectedSystem === 'eu' ? 'border-purple-500 bg-purple-900/10' : 'border-neutral-800'}`}>
                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">EU</div>
                                    <div className="text-3xl font-black text-white">{result.eu.toFixed(1)}</div>
                                </div>
                                <div className={`col-span-2 bg-neutral-950 p-4 rounded-xl border flex justify-between items-center px-8 transition-all ${selectedSystem === 'cm' ? 'border-purple-500 bg-purple-900/10' : 'border-neutral-800'}`}>
                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">CM / JP (Length)</div>
                                    <div className="text-2xl font-black text-purple-400 font-mono">{result.cm.toFixed(1)} cm</div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-neutral-500 italic py-12">
                                Please enter a valid size number.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Shoe Size Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
