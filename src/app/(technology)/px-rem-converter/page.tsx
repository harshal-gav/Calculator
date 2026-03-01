'use client';

import { useState, useEffect } from 'react';

export default function PxRemConverter() {
    const [baseSize, setBaseSize] = useState('16'); // Default root font size is 16px
    const [pxValue, setPxValue] = useState('16');
    const [remValue, setRemValue] = useState('1');
    const [activeInput, setActiveInput] = useState<'px' | 'rem'>('px');

    useEffect(() => {
        calculateConversion();
    }, [baseSize, pxValue, remValue, activeInput]);

    const calculateConversion = () => {
        const root = parseFloat(baseSize) || 16;

        if (activeInput === 'px') {
            const px = parseFloat(pxValue);
            if (!isNaN(px)) {
                setRemValue((px / root).toString());
            } else {
                setRemValue('');
            }
        } else if (activeInput === 'rem') {
            const rem = parseFloat(remValue);
            if (!isNaN(rem)) {
                setPxValue((rem * root).toString());
            } else {
                setPxValue('');
            }
        }
    };

    const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPxValue(e.target.value);
        setActiveInput('px');
    };

    const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRemValue(e.target.value);
        setActiveInput('rem');
    };

    const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBaseSize(e.target.value);
        // Recalculate based on whichever input was last active
    };

    const presetPx = [8, 12, 14, 16, 20, 24, 32, 40, 48, 64];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-50 rounded-xl shadow-lg border border-slate-200">
            <h1 className="text-4xl font-extrabold mb-4 text-slate-800 border-b pb-4 flex items-center">
                <span className="mr-3">📏</span> PX to REM Converter
            </h1>
            <p className="mb-8 text-slate-600 text-lg">
                Convert CSS pixels (px) to relative root ems (rem) based on your project's root font size.
            </p>

            <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200 shadow-sm mb-8">
                {/* Base Size Selector */}
                <div className="mb-8 border-b border-slate-100 pb-8">
                    <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider text-center">
                        Root Font Size (Base Value)
                    </label>
                    <div className="flex justify-center flex-wrap gap-2 mb-4">
                        {[10, 14, 16, 18, 20].map(val => (
                            <button
                                key={val}
                                onClick={() => setBaseSize(val.toString())}
                                className={`px-4 py-2 rounded-lg font-bold transition-all text-sm ${parseFloat(baseSize) === val ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                {val}px
                            </button>
                        ))}
                    </div>
                    <div className="max-w-xs mx-auto relative group flex items-center">
                        <span className="bg-slate-100 border border-slate-300 border-r-0 rounded-l-lg p-3 text-slate-500 font-mono text-sm leading-none flex items-center">1 REM =</span>
                        <input
                            type="number"
                            min="1"
                            value={baseSize}
                            onChange={handleBaseChange}
                            className="w-full border border-slate-300 p-3 bg-white focus:border-indigo-500 text-xl font-mono font-bold text-center text-slate-800 outline-none transition-all leading-none m-0"
                            style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                        />
                        <span className="bg-slate-100 border border-slate-300 border-l-0 rounded-r-lg p-3 text-slate-500 font-bold text-sm leading-none flex items-center">px</span>
                    </div>
                </div>

                {/* Conversion Grid */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">

                    {/* PX Input */}
                    <div>
                        <label className="block text-sm font-bold text-indigo-600 mb-3 uppercase tracking-wider text-center">Pixels (PX)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={pxValue}
                                onChange={handlePxChange}
                                className={`w-full rounded-xl border-2 p-4 pr-16 text-3xl font-mono font-black text-slate-800 outline-none transition-all ${activeInput === 'px' ? 'bg-indigo-50 border-indigo-400 ring-4 ring-indigo-500/10' : 'bg-slate-50 border-slate-200 focus:border-indigo-400'}`}
                                placeholder="16"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold uppercase tracking-widest text-sm">px</span>
                        </div>
                    </div>

                    {/* Swap Icon */}
                    <div className="flex justify-center py-4">
                        <div className="bg-slate-100 rounded-full p-3 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                    </div>

                    {/* REM Input */}
                    <div>
                        <label className="block text-sm font-bold text-emerald-600 mb-3 uppercase tracking-wider text-center">Relative Ems (REM)</label>
                        <div className="relative">
                            <input
                                type="number" step="any"
                                value={remValue}
                                onChange={handleRemChange}
                                className={`w-full rounded-xl border-2 p-4 pr-16 text-3xl font-mono font-black text-slate-800 outline-none transition-all ${activeInput === 'rem' ? 'bg-emerald-50 border-emerald-400 ring-4 ring-emerald-500/10' : 'bg-slate-50 border-slate-200 focus:border-emerald-400'}`}
                                placeholder="1"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold uppercase tracking-widest text-sm">rem</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Quick Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-700 tracking-wider text-sm mb-4 border-b border-slate-100 pb-2">Quick Reference (Base {baseSize}px)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {presetPx.map(px => {
                        const root = parseFloat(baseSize) || 16;
                        return (
                            <div key={px} className="bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200 text-center cursor-pointer transition-colors"
                                onClick={() => { setPxValue(px.toString()); setActiveInput('px'); }}>
                                <div className="font-black text-slate-800 font-mono text-lg">{px}px</div>
                                <div className="text-emerald-600 font-bold text-xs font-mono">{parseFloat((px / root).toFixed(4))}rem</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "PX to REM Converter", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
