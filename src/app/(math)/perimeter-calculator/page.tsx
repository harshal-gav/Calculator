'use client';

import { useState } from 'react';

export default function PerimeterCalculator() {
    const [shape, setShape] = useState('rectangle');
    // Inputs
    const [length, setLength] = useState('10');
    const [width, setWidth] = useState('5');

    // Triangle
    const [sideA, setSideA] = useState('3');
    const [sideB, setSideB] = useState('4');
    const [sideC, setSideC] = useState('5');

    // Circle (Circumference instead of Perimeter technically)
    const [radius, setRadius] = useState('5');

    // Polygon
    const [sidesCount, setSidesCount] = useState('5');
    const [sideLength, setSideLength] = useState('10');

    const [result, setResult] = useState<number | null>(null);

    const calculatePerimeter = () => {
        let perimeter = 0;

        if (shape === 'rectangle') {
            const l = parseFloat(length) || 0;
            const w = parseFloat(width) || 0;
            perimeter = 2 * (l + w);
        } else if (shape === 'square') {
            const s = parseFloat(length) || 0;
            perimeter = 4 * s;
        } else if (shape === 'triangle') {
            const a = parseFloat(sideA) || 0;
            const b = parseFloat(sideB) || 0;
            const c = parseFloat(sideC) || 0;
            perimeter = a + b + c;
        } else if (shape === 'circle') {
            const r = parseFloat(radius) || 0;
            perimeter = 2 * Math.PI * r; // Circumference
        } else if (shape === 'polygon') {
            const n = parseFloat(sidesCount) || 0;
            const s = parseFloat(sideLength) || 0;
            perimeter = n * s;
        }

        setResult(perimeter);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-900 border-b pb-4">Perimeter Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the total perimeter (or circumference) of 2D shapes like rectangles, circles, and regular polygons.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Shape</label>
                        <select value={shape} onChange={(e) => { setShape(e.target.value); setResult(null); }} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold bg-white cursor-pointer">
                            <option value="rectangle">Rectangle</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle</option>
                            <option value="circle">Circle (Circumference)</option>
                            <option value="polygon">Regular Polygon</option>
                        </select>
                    </div>

                    {shape === 'rectangle' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Length</label>
                                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Width</label>
                                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                            </div>
                        </div>
                    )}

                    {shape === 'square' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Side Length</label>
                            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                        </div>
                    )}

                    {shape === 'triangle' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Side a</label>
                                <input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Side b</label>
                                <input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Side c</label>
                                <input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                            </div>
                        </div>
                    )}

                    {shape === 'circle' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Radius (r)</label>
                            <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                        </div>
                    )}

                    {shape === 'polygon' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Sides (n)</label>
                                <input type="number" step="1" value={sidesCount} onChange={(e) => setSidesCount(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Side Length</label>
                                <input type="number" value={sideLength} onChange={(e) => setSideLength(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium" />
                            </div>
                        </div>
                    )}

                    <button onClick={calculatePerimeter} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Perimeter
                    </button>

                    <div className="text-center pt-2">
                        <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest whitespace-pre-wrap">
                            {shape === 'rectangle' && 'Formula: P = 2(L + W)'}
                            {shape === 'square' && 'Formula: P = 4S'}
                            {shape === 'triangle' && 'Formula: P = a + b + c'}
                            {shape === 'circle' && 'Formula: C = 2πr'}
                            {shape === 'polygon' && 'Formula: C = n × S'}
                        </span>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-4">
                            <h3 className="text-orange-800 font-semibold uppercase tracking-wider text-sm mb-2">Total {shape === 'circle' ? 'Circumference' : 'Perimeter'}</h3>
                            <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                                {result.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                            <p className="text-gray-500 font-medium text-lg mt-2">linear units</p>
                        </div>
                    ) : (
                        <div className="text-center text-orange-300 font-medium p-4">
                            Select a shape and enter the dimensions to calculate the outer boundary.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Perimeter Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
