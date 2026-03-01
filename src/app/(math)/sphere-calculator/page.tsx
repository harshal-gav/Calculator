'use client';

import { useState } from 'react';

export default function SphereCalculator() {
    const [radius, setRadius] = useState('5');

    const r = parseFloat(radius);

    let volume = 0;
    let surfaceArea = 0;
    let circumference = 0;
    let diameter = 0;
    let isValid = false;

    if (!isNaN(r) && r > 0) {
        isValid = true;
        diameter = 2 * r;
        circumference = 2 * Math.PI * r;
        surfaceArea = 4 * Math.PI * r * r;
        volume = (4 / 3) * Math.PI * Math.pow(r, 3);
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-violet-700 border-b pb-4 flex items-center">
                <span className="mr-3">🌍</span> Sphere Calculator
            </h1>
            <p className="mb-8 text-gray-600 text-lg">
                Enter the radius of a sphere to calculate its volume, surface area, and circumference instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="bg-violet-50 p-6 rounded-xl border border-violet-100 flex flex-col justify-center space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Radius (r)</label>
                        <input
                            type="number" min="0" step="any"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-violet-500 font-bold text-2xl text-gray-800"
                            placeholder="e.g. 5"
                        />
                    </div>
                </div>

                {/* Visualization / Diagram placeholder */}
                <div className="bg-white border-2 border-dashed border-violet-200 rounded-xl p-6 flex items-center justify-center min-h-[250px] relative overflow-hidden">
                    <div className="opacity-10 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-400 to-transparent"></div>
                    <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-2xl text-violet-600 z-10" fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Outer circle */}
                        <circle cx="50" cy="50" r="40" />
                        {/* Equator */}
                        <ellipse cx="50" cy="50" rx="40" ry="12" strokeDasharray="3,3" />
                        <path d="M10 50 C10 56.6 27.9 62 50 62 C72.1 62 90 56.6 90 50" strokeWidth="2" />

                        {/* Radius line */}
                        <line x1="50" y1="50" x2="90" y2="50" strokeDasharray="4,4" className="text-violet-400" />
                        <circle cx="50" cy="50" r="2" fill="currentColor" />
                    </svg>
                </div>
            </div>

            {/* Results */}
            {isValid ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-violet-600 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-violet-200">Volume</div>
                        <div className="text-4xl font-black">{volume.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-violet-200 font-mono">V = ⁴/₃πr³</div>
                    </div>
                    <div className="bg-violet-700 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-violet-200">Surface Area</div>
                        <div className="text-4xl font-black">{surfaceArea.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-violet-200 font-mono">A = 4πr²</div>
                    </div>
                    <div className="bg-violet-800 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-violet-200">Circumference</div>
                        <div className="text-4xl font-black">{circumference.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-violet-200 font-mono">C = 2πr</div>
                    </div>
                    <div className="bg-violet-900 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-violet-200">Diameter</div>
                        <div className="text-4xl font-black">{diameter.toFixed(2)}</div>
                        <div className="text-sm mt-2 text-violet-200 font-mono">d = 2r</div>
                    </div>
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 font-medium border border-gray-200">
                    Please enter a positive number for the radius to see results.
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Sphere Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
