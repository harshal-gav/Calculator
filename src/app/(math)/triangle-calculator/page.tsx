'use client';

import { useState } from 'react';

export default function TriangleCalculator() {
    const [a, setA] = useState('3');
    const [b, setB] = useState('4');
    const [c, setC] = useState('5');

    // Output state
    const [result, setResult] = useState<{
        area: number;
        perimeter: number;
        isValid: boolean;
        type: string;
        angleA: number;
        angleB: number;
        angleC: number;
    } | null>(null);

    const calculateTriangle = () => {
        const sideA = parseFloat(a) || 0;
        const sideB = parseFloat(b) || 0;
        const sideC = parseFloat(c) || 0;

        // Check Triangle Inequality Theorem
        if (sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA) {

            // Perimeter
            const perimeter = sideA + sideB + sideC;
            const s = perimeter / 2; // Semi-perimeter

            // Area using Heron's formula
            const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));

            // Angles using Law of Cosines
            // A = arccos((b² + c² - a²) / 2bc)
            const angleARad = Math.acos((Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) / (2 * sideB * sideC));
            const angleBRad = Math.acos((Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) / (2 * sideA * sideC));
            const angleCRad = Math.acos((Math.pow(sideA, 2) + Math.pow(sideB, 2) - Math.pow(sideC, 2)) / (2 * sideA * sideB));

            const toDeg = (rad: number) => rad * (180 / Math.PI);

            // Determine type by sides
            let type = "Scalene";
            if (sideA === sideB && sideB === sideC) {
                type = "Equilateral";
            } else if (sideA === sideB || sideB === sideC || sideA === sideC) {
                type = "Isosceles";
            }

            // Determine if right triangle
            if (Math.abs(Math.pow(sideA, 2) + Math.pow(sideB, 2) - Math.pow(sideC, 2)) < 0.001 ||
                Math.abs(Math.pow(sideA, 2) + Math.pow(sideC, 2) - Math.pow(sideB, 2)) < 0.001 ||
                Math.abs(Math.pow(sideB, 2) + Math.pow(sideC, 2) - Math.pow(sideA, 2)) < 0.001) {
                type += " (Right-Angled)";
            }

            setResult({
                area,
                perimeter,
                isValid: true,
                type,
                angleA: toDeg(angleARad),
                angleB: toDeg(angleBRad),
                angleC: toDeg(angleCRad)
            });

        } else {
            // Invalid Triangle
            setResult({
                area: 0, perimeter: 0, isValid: false, type: '', angleA: 0, angleB: 0, angleC: 0
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-purple-900 border-b pb-4">Triangle Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Enter the three side lengths of a triangle to instantly calculate its area, perimeter, and all three internal angles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Side a</label>
                        <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Side b</label>
                        <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Side c</label>
                        <input type="number" value={c} onChange={(e) => setC(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold" />
                    </div>

                    <button onClick={calculateTriangle} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Solve Triangle
                    </button>

                    <p className="text-xs text-gray-400 text-center font-medium px-4">Utilizes Heron's Formula and the Law of Cosines to solve the geometry.</p>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-purple-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        result.isValid ? (
                            <div className="w-full text-center space-y-6">
                                <div className="bg-purple-100 text-purple-800 font-bold uppercase tracking-widest text-xs py-2 px-4 rounded-full inline-block mb-2 shadow-sm">
                                    {result.type}
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-left border-b border-gray-100 pb-6">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">Total Area</h4>
                                        <p className="text-2xl font-black text-gray-900">{result.area.toLocaleString('en-US', { maximumFractionDigits: 3 })}<span className="text-sm text-gray-500 font-normal"> units²</span></p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">Perimeter</h4>
                                        <p className="text-2xl font-black text-gray-900">{result.perimeter.toLocaleString('en-US', { maximumFractionDigits: 3 })}</p>
                                    </div>
                                </div>

                                <h3 className="text-left text-sm font-bold text-gray-600 uppercase tracking-widest pt-2">Internal Angles</h3>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 shadow-inner">
                                        <span className="block text-xs text-purple-600 font-bold mb-1">Angle A</span>
                                        <span className="font-bold text-gray-800">{result.angleA.toFixed(2)}°</span>
                                    </div>
                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 shadow-inner">
                                        <span className="block text-xs text-purple-600 font-bold mb-1">Angle B</span>
                                        <span className="font-bold text-gray-800">{result.angleB.toFixed(2)}°</span>
                                    </div>
                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 shadow-inner">
                                        <span className="block text-xs text-purple-600 font-bold mb-1">Angle C</span>
                                        <span className="font-bold text-gray-800">{result.angleC.toFixed(2)}°</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-center text-red-500 font-bold text-lg bg-red-50 rounded-xl p-6 border border-red-200">
                                Invalid Triangle. The sum of any two sides must be greater than the third side (Triangle Inequality Theorem).
                            </div>
                        )
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-purple-300 font-medium">
                            Enter three valid side lengths to solve for area and angles.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Triangle Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
