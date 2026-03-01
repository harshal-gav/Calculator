'use client';

import { useState } from 'react';

export default function AreaCalculator() {
    const [shape, setShape] = useState('rectangle');
    // Inputs
    const [length, setLength] = useState('10');
    const [width, setWidth] = useState('5');
    const [base, setBase] = useState('10');
    const [height, setHeight] = useState('8');
    const [radius, setRadius] = useState('5');

    const [result, setResult] = useState<number | null>(null);

    const calculateArea = () => {
        let area = 0;
        if (shape === 'rectangle') {
            const l = parseFloat(length) || 0;
            const w = parseFloat(width) || 0;
            area = l * w;
        } else if (shape === 'triangle') {
            const b = parseFloat(base) || 0;
            const h = parseFloat(height) || 0;
            area = 0.5 * b * h;
        } else if (shape === 'circle') {
            const r = parseFloat(radius) || 0;
            area = Math.PI * Math.pow(r, 2);
        } else if (shape === 'square') {
            const s = parseFloat(length) || 0;
            area = s * s;
        }

        setResult(area);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-purple-900 border-b pb-4">Area Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Quickly find the surface area of common 2D geometric shapes including rectangles, triangles, and circles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Shape</label>
                        <select value={shape} onChange={(e) => { setShape(e.target.value); setResult(null); }} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold bg-white cursor-pointer">
                            <option value="rectangle">Rectangle</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle</option>
                            <option value="circle">Circle</option>
                        </select>
                    </div>

                    {shape === 'rectangle' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Length</label>
                                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Width</label>
                                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                            </div>
                        </div>
                    )}

                    {shape === 'square' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Side Length</label>
                            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                        </div>
                    )}

                    {shape === 'triangle' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Base Length</label>
                                <input type="number" value={base} onChange={(e) => setBase(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Height</label>
                                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                            </div>
                        </div>
                    )}

                    {shape === 'circle' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Radius (r)</label>
                            <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-medium" />
                        </div>
                    )}

                    <button onClick={calculateArea} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Area
                    </button>

                    <div className="text-center pt-2">
                        <span className="text-xs font-bold text-purple-600 uppercase tracking-widest whitespace-pre-wrap">
                            {shape === 'rectangle' && 'Formula: A = L × W'}
                            {shape === 'square' && 'Formula: A = S²'}
                            {shape === 'triangle' && 'Formula: A = ½ × B × H'}
                            {shape === 'circle' && 'Formula: A = π × R²'}
                        </span>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-purple-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-4">
                            <h3 className="text-purple-800 font-semibold uppercase tracking-wider text-sm mb-2">Total Surface Area</h3>
                            <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                                {result.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                            <p className="text-gray-500 font-medium text-lg mt-2">square units²</p>
                        </div>
                    ) : (
                        <div className="text-center text-purple-300 font-medium">
                            Select a shape and enter the dimensions to calculate the area.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Area Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
