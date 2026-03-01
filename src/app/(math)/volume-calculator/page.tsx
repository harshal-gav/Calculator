'use client';

import { useState } from 'react';

export default function VolumeCalculator() {
    const [shape, setShape] = useState('cube'); // cube, cylinder, sphere, cone, rectangular

    // Inputs
    const [length, setLength] = useState('10');
    const [width, setWidth] = useState('10');
    const [height, setHeight] = useState('10');
    const [radius, setRadius] = useState('5');

    const [result, setResult] = useState<number | null>(null);

    const calculateVolume = () => {
        const l = parseFloat(length) || 0;
        const w = parseFloat(width) || 0;
        const h = parseFloat(height) || 0;
        const r = parseFloat(radius) || 0;

        let vol = 0;

        switch (shape) {
            case 'cube':
                vol = Math.pow(l, 3);
                break;
            case 'rectangular':
                vol = l * w * h;
                break;
            case 'cylinder':
                vol = Math.PI * Math.pow(r, 2) * h;
                break;
            case 'sphere':
                vol = (4 / 3) * Math.PI * Math.pow(r, 3);
                break;
            case 'cone':
                vol = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
                break;
        }

        setResult(vol);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-pink-900 border-b pb-4">Volume Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the internal space (volume) of common 3D geometric shapes instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-pink-50 p-6 rounded-xl border border-pink-100">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Shape</label>
                            <select value={shape} onChange={(e) => { setShape(e.target.value); setResult(null); }} className="w-full text-lg rounded-lg border-gray-300 p-3 shadow-sm focus:border-pink-500 cursor-pointer">
                                <option value="cube">Cube</option>
                                <option value="rectangular">Rectangular Prism</option>
                                <option value="cylinder">Cylinder</option>
                                <option value="sphere">Sphere</option>
                                <option value="cone">Cone</option>
                            </select>
                        </div>

                        {/* Conditional Inputs based on Shape */}
                        {shape === 'cube' && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Edge Length</label>
                                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 focus:border-pink-500" />
                            </div>
                        )}

                        {shape === 'rectangular' && (
                            <div className="space-y-4">
                                <div><label className="block text-sm text-gray-700 mb-1">Length</label><input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500" /></div>
                                <div><label className="block text-sm text-gray-700 mb-1">Width</label><input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500" /></div>
                                <div><label className="block text-sm text-gray-700 mb-1">Height</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500" /></div>
                            </div>
                        )}

                        {(shape === 'cylinder' || shape === 'cone') && (
                            <div className="space-y-4">
                                <div><label className="block text-sm text-gray-700 mb-1">Radius (r)</label><input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500" /></div>
                                <div><label className="block text-sm text-gray-700 mb-1">Height (h)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500" /></div>
                            </div>
                        )}

                        {shape === 'sphere' && (
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Radius (r)</label>
                                <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 focus:border-pink-500" />
                            </div>
                        )}

                        <button onClick={calculateVolume} className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition shadow-lg uppercase tracking-wide mt-4">
                            Calculate Volume
                        </button>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-pink-100 rounded-xl p-8 flex flex-col justify-center items-center shadow-sm min-h-[300px]">
                    {result !== null ? (
                        <div className="w-full text-center space-y-4 text-pink-900">
                            <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs">Total Volume</h3>
                            <div className="text-5xl md:text-6xl font-black break-all">
                                {Number.isInteger(result) ? result : parseFloat(result.toFixed(4))}
                            </div>
                            <p className="text-gray-500 font-medium">cubic units</p>
                        </div>
                    ) : (
                        <div className="text-pink-200 text-6xl font-black opacity-30 text-center animate-pulse">
                            V = ?
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Volume Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
