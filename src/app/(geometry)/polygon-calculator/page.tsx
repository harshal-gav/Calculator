'use client';

import { useState } from 'react';

export default function PolygonCalculator() {
    const [sides, setSides] = useState('5'); // n (pentagon default)
    const [inputType, setInputType] = useState('side'); // side, inradius, circumradius, area, perimeter
    const [inputValue, setInputValue] = useState('10');

    const [results, setResults] = useState<{
        n: number;
        side: number;
        area: number;
        perimeter: number;
        inradius: number; // apothem
        circumradius: number;
        interiorAngle: number;
        exteriorAngle: number;
    } | null>(null);

    const [errorMsg, setErrorMsg] = useState('');

    const calculate = () => {
        setErrorMsg('');
        const n = parseInt(sides, 10);
        const val = parseFloat(inputValue);

        if (isNaN(n) || n < 3) {
            setErrorMsg('Number of sides must be an integer > 2.');
            setResults(null);
            return;
        }

        if (isNaN(val) || val <= 0) {
            setErrorMsg('Input value must be a positive number.');
            setResults(null);
            return;
        }

        const pi = Math.PI;
        let s = 0; // side length

        // For regular polygon with n sides:
        // angle (radians) = pi / n
        const angle = pi / n;

        // Area = (n * s^2) / (4 * tan(pi/n))
        // Inradius (Apothem) = s / (2 * tan(pi/n))
        // Circumradius = s / (2 * sin(pi/n))
        // Perimeter = n * s

        switch (inputType) {
            case 'side':
                s = val;
                break;
            case 'inradius':
                s = val * 2 * Math.tan(angle);
                break;
            case 'circumradius':
                s = val * 2 * Math.sin(angle);
                break;
            case 'area':
                s = Math.sqrt((4 * val * Math.tan(angle)) / n);
                break;
            case 'perimeter':
                s = val / n;
                break;
            default:
                s = val;
        }

        const area = (n * s * s) / (4 * Math.tan(angle));
        const perimeter = n * s;
        const inradius = s / (2 * Math.tan(angle));
        const circumradius = s / (2 * Math.sin(angle));
        const interiorAngle = ((n - 2) * 180) / n;
        const exteriorAngle = 360 / n;

        setResults({
            n,
            side: s,
            area,
            perimeter,
            inradius,
            circumradius,
            interiorAngle,
            exteriorAngle
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">💠</span> Polygon Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate precise properties for any regular polygon with 3 or more sides.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Number of Sides (n)</label>
                        <input
                            type="number" step="1" min="3"
                            value={sides}
                            onChange={(e) => setSides(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Calculate given</label>
                        <select
                            value={inputType}
                            onChange={(e) => { setInputType(e.target.value); setResults(null); }}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50"
                        >
                            <option value="side">Side Length (s)</option>
                            <option value="inradius">Apothem / Inradius</option>
                            <option value="circumradius">Circumradius</option>
                            <option value="area">Area (A)</option>
                            <option value="perimeter">Perimeter (P)</option>
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

                {errorMsg && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-bold text-center">
                        {errorMsg}
                    </div>
                )}

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest"
                    >
                        Calculate Regular Polygon
                    </button>
                </div>
            </div>

            {results && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Regular {results.n}-gon Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full z-10">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center text-center justify-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Side Length</span>
                            <span className="font-mono text-emerald-100 font-bold text-2xl">{results.side.toFixed(4)}</span>
                        </div>
                        <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-500/30 flex flex-col items-center text-center justify-center shadow-inner lg:col-span-2">
                            <span className="text-emerald-400 text-sm font-bold uppercase tracking-wide mb-1">Area</span>
                            <span className="font-mono text-white font-bold text-3xl">{results.area.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center text-center justify-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Perimeter</span>
                            <span className="font-mono text-emerald-100 font-bold text-2xl">{results.perimeter.toFixed(4)}</span>
                        </div>

                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center text-center justify-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Apothem (Inradius)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.inradius.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center text-center justify-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Circumradius</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.circumradius.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center text-center justify-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Interior Angle</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.interiorAngle.toFixed(2)}°</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center text-center justify-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Exterior Angle</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.exteriorAngle.toFixed(2)}°</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">Properties</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-1 font-mono">
                        <li>Area = (n × s²) / (4 × tan(π/n))</li>
                        <li>Perimeter = n × s</li>
                        <li>Sum of Interior Angles = (n-2) × 180°</li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-1 font-mono">
                        <li>Interior Angle = Sum / n</li>
                        <li>Exterior Angle = 360° / n</li>
                        <li>Central Angle = 360° / n</li>
                    </ul>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Polygon Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
