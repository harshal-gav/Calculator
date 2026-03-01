'use client';

import { useState } from 'react';

export default function RectangleCalculator() {
    const [length, setLength] = useState('10');
    const [width, setWidth] = useState('5');

    const l = parseFloat(length);
    const w = parseFloat(width);

    let area = 0;
    let perimeter = 0;
    let diagonal = 0;
    let isValid = false;

    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
        isValid = true;
        area = l * w;
        perimeter = 2 * (l + w);
        diagonal = Math.sqrt(l * l + w * w);
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-rose-700 border-b pb-4 flex items-center">
                <span className="mr-3">📏</span> Rectangle Calculator
            </h1>
            <p className="mb-8 text-gray-600 text-lg">
                Enter the length and width of a rectangle to instantly find its area, perimeter, and diagonal length.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Length (l)</label>
                        <input
                            type="number" min="0" step="any"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
                            placeholder="e.g. 10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Width (w)</label>
                        <input
                            type="number" min="0" step="any"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
                            placeholder="e.g. 5"
                        />
                    </div>
                </div>

                {/* Visualization / Diagram placeholder */}
                <div className="bg-white border-2 border-dashed border-rose-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
                    <div className="opacity-10 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-400 to-transparent"></div>
                    <svg viewBox="0 0 100 100" className="w-full max-w-[200px] h-48 drop-shadow-xl text-rose-600 z-10" fill="none" stroke="currentColor" strokeWidth="2" preserveAspectRatio="xMidYMid meet">
                        {/* Rectangle */}
                        <rect x="5" y="25" width="90" height="50" fill="currentColor" fillOpacity="0.1" />

                        {/* Diagonal */}
                        <line x1="5" y1="75" x2="95" y2="25" strokeDasharray="4,4" className="text-rose-400" />

                        {/* Labels */}
                        <text x="50" y="20" fontSize="8" fill="currentColor" textAnchor="middle" className="font-bold">Length (l)</text>
                        <text x="100" y="50" fontSize="8" fill="currentColor" textAnchor="middle" transform="rotate(-90 95 50)" className="font-bold">Width (w)</text>
                    </svg>
                </div>
            </div>

            {/* Results */}
            {isValid ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-rose-600 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-rose-200">Area</div>
                        <div className="text-4xl font-black">{area.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-rose-200 font-mono">A = l × w</div>
                    </div>
                    <div className="bg-rose-700 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-rose-200">Perimeter</div>
                        <div className="text-4xl font-black">{perimeter.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-rose-200 font-mono">P = 2(l + w)</div>
                    </div>
                    <div className="bg-rose-800 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-rose-200">Diagonal</div>
                        <div className="text-4xl font-black">{diagonal.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-rose-200 font-mono">d = √(l² + w²)</div>
                    </div>
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 font-medium border border-gray-200">
                    Please enter positive numbers for both length and width to see results.
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Rectangle Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
