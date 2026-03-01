'use client';

import { useState } from 'react';

export default function HexagonCalculator() {
    const [inputType, setInputType] = useState('side'); // side, area, perimeter, inradius, circumradius
    const [inputValue, setInputValue] = useState('5');

    const [results, setResults] = useState<{
        side: number;
        area: number;
        perimeter: number;
        inradius: number; // apothem
        circumradius: number;
        diagonalLong: number;
        diagonalShort: number;
    } | null>(null);

    const parseInput = () => {
        const val = parseFloat(inputValue);
        if (isNaN(val) || val <= 0) return null;
        return val;
    };

    const calculate = () => {
        const val = parseInput();
        if (val === null) {
            setResults(null);
            return;
        }

        const sqrt3 = Math.sqrt(3);
        let s = 0; // side length (a)

        switch (inputType) {
            case 'side':
                s = val;
                break;
            case 'area':
                s = Math.sqrt(val / ((3 * sqrt3) / 2));
                break;
            case 'perimeter':
                s = val / 6;
                break;
            case 'inradius': // apothem
                s = val / (sqrt3 / 2);
                break;
            case 'circumradius':
                s = val;
                break;
            default:
                s = val;
        }

        const area = ((3 * sqrt3) / 2) * s * s;
        const perimeter = 6 * s;
        const inradius = (sqrt3 / 2) * s;
        const circumradius = s;
        const diagonalLong = 2 * s;
        const diagonalShort = sqrt3 * s;

        setResults({
            side: s,
            area,
            perimeter,
            inradius,
            circumradius,
            diagonalLong,
            diagonalShort
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🛑</span> Hexagon Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the area, perimeter, side length, and radii of a regular hexagon.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Calculate given</label>
                        <select
                            value={inputType}
                            onChange={(e) => { setInputType(e.target.value); setResults(null); }}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50"
                        >
                            <option value="side">Side Length (a)</option>
                            <option value="area">Area (A)</option>
                            <option value="perimeter">Perimeter (P)</option>
                            <option value="inradius">Inradius / Apothem (r)</option>
                            <option value="circumradius">Circumradius (R)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Value</label>
                        <input
                            type="number" step="any" min="0"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest"
                    >
                        Calculate Hexagon Properties
                    </button>
                </div>
            </div>

            {results && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full z-10">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Side (a)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.side.toFixed(4)}</span>
                        </div>
                        <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center shadow-inner">
                            <span className="text-emerald-400 text-sm font-bold uppercase tracking-wide">Area (A)</span>
                            <span className="font-mono text-white font-bold text-2xl">{results.area.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Perimeter (P)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.perimeter.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Inradius/Apothem (r)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.inradius.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Circumradius (R)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.circumradius.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Short Diagonal (d)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.diagonalShort.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center md:col-span-2">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Long Diagonal (D)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.diagonalLong.toFixed(4)}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">Formulas (Regular Hexagon)</p>
                <ul className="list-disc pl-5 space-y-1 font-mono">
                    <li>Area = (3√3 / 2) × a²</li>
                    <li>Perimeter = 6a</li>
                    <li>Inradius (apothem) = (√3 / 2) × a</li>
                    <li>Long Diagonal = 2a</li>
                    <li>Short Diagonal = √3 × a</li>
                </ul>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Hexagon Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
