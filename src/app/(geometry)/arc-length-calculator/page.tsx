'use client';

import { useState } from 'react';

export default function ArcLengthCalculator() {
    const [radius, setRadius] = useState('10');
    const [angle, setAngle] = useState('90');
    const [angleUnit, setAngleUnit] = useState('degrees');

    const [results, setResults] = useState<{
        arcLength: number;
        sectorArea: number;
        chordLength: number;
    } | null>(null);

    const calculate = () => {
        const r = parseFloat(radius);
        let a = parseFloat(angle);

        if (isNaN(r) || isNaN(a) || r <= 0 || a <= 0) {
            setResults(null);
            return;
        }

        // Convert angle to radians for internal math
        let angleInRadians = a;
        if (angleUnit === 'degrees') {
            angleInRadians = a * (Math.PI / 180);
        }

        // Prevent absurd circles
        if (angleInRadians > 2 * Math.PI) {
            angleInRadians = angleInRadians % (2 * Math.PI);
            // Handle edge case of exactly representing full circles if modding
            if (angleInRadians === 0) angleInRadians = 2 * Math.PI;
        }

        const arcLength = r * angleInRadians;
        const sectorArea = 0.5 * r * r * angleInRadians;
        const chordLength = 2 * r * Math.sin(angleInRadians / 2);

        setResults({
            arcLength,
            sectorArea,
            chordLength
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📏</span> Arc Length Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Instantly calculate arc length, sector area, and chord length of a circle.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Radius (r)</label>
                        <input
                            type="number" step="any" min="0"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Central Angle (θ)</label>
                            <input
                                type="number" step="any" min="0"
                                value={angle}
                                onChange={(e) => setAngle(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                        <div className="w-32">
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Unit</label>
                            <select
                                value={angleUnit}
                                onChange={(e) => setAngleUnit(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white"
                            >
                                <option value="degrees">Degrees</option>
                                <option value="radians">Radians</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest"
                    >
                        Calculate Arc Properties
                    </button>
                </div>
            </div>

            {results && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full z-10">
                        <div className="bg-emerald-900/60 p-6 rounded-xl border border-emerald-500/30 flex flex-col items-center text-center justify-center shadow-inner md:col-span-3">
                            <span className="text-emerald-400 text-sm font-bold uppercase tracking-wide mb-2">Arc Length (s)</span>
                            <span className="font-mono text-white font-bold text-4xl">{results.arcLength.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-6 rounded-xl border border-white/10 flex flex-col items-center text-center justify-center md:col-span-1.5 md:col-start-1">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-2">Sector Area</span>
                            <span className="font-mono text-emerald-100 font-bold text-2xl">{results.sectorArea.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-6 rounded-xl border border-white/10 flex flex-col items-center text-center justify-center md:col-span-1.5">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-2">Chord Length</span>
                            <span className="font-mono text-emerald-100 font-bold text-2xl">{results.chordLength.toFixed(4)}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">Formulas (Angle θ in Radians)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-1 font-mono">
                        <li>Arc Length = r × θ</li>
                        <li>Sector Area = ½ × r² × θ</li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-1 font-mono">
                        <li>Chord Length = 2r × sin(θ/2)</li>
                        <li>1 Radian ≈ 57.2958 Degrees</li>
                    </ul>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Arc Length Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
