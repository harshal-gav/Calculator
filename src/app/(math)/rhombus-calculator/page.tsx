'use client';

import { useState } from 'react';

export default function RhombusCalculator() {
    const [d1, setD1] = useState('10');
    const [d2, setD2] = useState('8');

    const p = parseFloat(d1); // Diagonal 1
    const q = parseFloat(d2); // Diagonal 2

    let area = 0;
    let perimeter = 0;
    let sideLine = 0;
    let isValid = false;

    if (!isNaN(p) && !isNaN(q) && p > 0 && q > 0) {
        isValid = true;
        area = (p * q) / 2;
        // Side = √( (p/2)² + (q/2)² )
        sideLine = Math.sqrt(Math.pow(p / 2, 2) + Math.pow(q / 2, 2));
        perimeter = 4 * sideLine;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-fuchsia-700 border-b pb-4 flex items-center">
                <span className="mr-3">💠</span> Rhombus Calculator
            </h1>
            <p className="mb-8 text-gray-600 text-lg">
                Enter the two diagonals of a rhombus to instantly calculate its area, side length, and perimeter.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="bg-fuchsia-50 p-6 rounded-xl border border-fuchsia-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Diagonal 1 (p)</label>
                        <input
                            type="number" min="0" step="any"
                            value={d1}
                            onChange={(e) => setD1(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-fuchsia-500 font-bold text-xl text-gray-800"
                            placeholder="e.g. 10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Diagonal 2 (q)</label>
                        <input
                            type="number" min="0" step="any"
                            value={d2}
                            onChange={(e) => setD2(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-fuchsia-500 font-bold text-xl text-gray-800"
                            placeholder="e.g. 8"
                        />
                    </div>
                </div>

                {/* Visualization / Diagram placeholder */}
                <div className="bg-white border-2 border-dashed border-fuchsia-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
                    <div className="opacity-10 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-fuchsia-400 to-transparent"></div>
                    <svg viewBox="0 0 100 100" className="w-full max-w-[200px] h-48 drop-shadow-xl text-fuchsia-600 z-10" fill="none" stroke="currentColor" strokeWidth="2" preserveAspectRatio="xMidYMid meet">
                        {/* Rhombus - scale to box */}
                        <polygon points="50,10 90,50 50,90 10,50" fill="currentColor" fillOpacity="0.1" />

                        {/* Diagonals */}
                        <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="4,4" className="text-fuchsia-400" />
                        <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="4,4" className="text-fuchsia-400" />

                        {/* Labels */}
                        <text x="60" y="30" fontSize="8" fill="currentColor" className="font-bold">q</text>
                        <text x="30" y="45" fontSize="8" fill="currentColor" className="font-bold">p</text>
                    </svg>
                </div>
            </div>

            {/* Results */}
            {isValid ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-fuchsia-600 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-fuchsia-200">Area</div>
                        <div className="text-4xl font-black">{area.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-fuchsia-200 font-mono">A = (p × q) / 2</div>
                    </div>
                    <div className="bg-fuchsia-700 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-fuchsia-200">Side Length</div>
                        <div className="text-4xl font-black">{sideLine.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-fuchsia-200 font-mono">a = √((p/2)² + (q/2)²)</div>
                    </div>
                    <div className="bg-fuchsia-800 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-fuchsia-200">Perimeter</div>
                        <div className="text-4xl font-black">{perimeter.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-fuchsia-200 font-mono">P = 4a</div>
                    </div>
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 font-medium border border-gray-200">
                    Please enter positive numbers for both diagonals to see results.
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Rhombus Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
