'use client';

import { useState } from 'react';

export default function CylinderCalculator() {
    const [radius, setRadius] = useState('5');
    const [height, setHeight] = useState('10');

    const r = parseFloat(radius);
    const h = parseFloat(height);

    let volume = 0;
    let surfaceArea = 0;
    let baseArea = 0;
    let lateralArea = 0;
    let isValid = false;

    if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
        isValid = true;
        baseArea = Math.PI * r * r;
        lateralArea = 2 * Math.PI * r * h;
        surfaceArea = 2 * baseArea + lateralArea;
        volume = baseArea * h;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-cyan-700 border-b pb-4 flex items-center">
                <span className="mr-3">🛢️</span> Cylinder Calculator
            </h1>
            <p className="mb-8 text-gray-600 text-lg">
                Enter the radius and height of a cylinder to calculate its volume, surface area, and lateral area.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Radius (r)</label>
                        <input
                            type="number" min="0" step="any"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-cyan-500 font-bold text-xl text-gray-800"
                            placeholder="e.g. 5"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Height (h)</label>
                        <input
                            type="number" min="0" step="any"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-cyan-500 font-bold text-xl text-gray-800"
                            placeholder="e.g. 10"
                        />
                    </div>
                </div>

                {/* Visualization / Diagram placeholder */}
                <div className="bg-white border-2 border-dashed border-cyan-200 rounded-xl p-6 flex items-center justify-center min-h-[250px] relative overflow-hidden">
                    <div className="opacity-10 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400 to-transparent"></div>
                    <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-xl text-cyan-600 z-10" fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Top ellipse */}
                        <ellipse cx="50" cy="20" rx="30" ry="10" />
                        {/* Bottom ellipse */}
                        <ellipse cx="50" cy="80" rx="30" ry="10" strokeDasharray="2,2" />
                        <path d="M20 80 C20 85.5 33.4 90 50 90 C66.6 90 80 85.5 80 80" />
                        {/* Sides */}
                        <path d="M20 20 L20 80" />
                        <path d="M80 20 L80 80" />
                        {/* Height line */}
                        <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="4,4" className="text-cyan-400" />
                        {/* Radius line */}
                        <line x1="50" y1="80" x2="80" y2="80" strokeDasharray="4,4" className="text-cyan-400" />
                    </svg>
                </div>
            </div>

            {/* Results */}
            {isValid ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-cyan-600 text-white p-5 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-1 text-cyan-200">Volume</div>
                        <div className="text-2xl font-black">{volume.toFixed(2)}</div>
                        <div className="text-xs mt-1 text-cyan-200 font-mono">V = πr²h</div>
                    </div>
                    <div className="bg-cyan-700 text-white p-5 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-1 text-cyan-200">Total Surface Area</div>
                        <div className="text-2xl font-black">{surfaceArea.toFixed(2)}</div>
                        <div className="text-xs mt-1 text-cyan-200 font-mono">A = 2πr(r + h)</div>
                    </div>
                    <div className="bg-cyan-800 text-white p-5 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-1 text-cyan-200">Lateral Surface Area</div>
                        <div className="text-2xl font-black">{lateralArea.toFixed(2)}</div>
                        <div className="text-xs mt-1 text-cyan-200 font-mono">L = 2πrh</div>
                    </div>
                    <div className="bg-cyan-900 text-white p-5 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-1 text-cyan-200">Base Area (single)</div>
                        <div className="text-2xl font-black">{baseArea.toFixed(2)}</div>
                        <div className="text-xs mt-1 text-cyan-200 font-mono">B = πr²</div>
                    </div>
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 font-medium border border-gray-200">
                    Please enter positive numbers for both radius and height to see results.
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Cylinder Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
