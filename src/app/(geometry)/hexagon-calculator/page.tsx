'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';
export default function HexagonCalculator() {
    const [inputType, setInputType] = useState('side'); // side, area, perimeter, inradius, circumradius
    const [inputValue, setInputValue] = useState('5');

    const [results, setResults] = useState<{
        side: number;
        area: number;
        perimeter: number;
        inradius: number; // apothem
        circumradius: number;
        diagonalLong: number;
        diagonalShort: number;
    } | null>(null);

    const parseInput = () => {
        const val = parseFloat(inputValue);
        if (isNaN(val) || val <= 0) return null;
        return val;
    };

    const calculate = () => {
        const val = parseInput();
        if (val === null) {
            setResults(null);
            return;
        }

        const sqrt3 = Math.sqrt(3);
        let s = 0; // side length (a)

        switch (inputType) {
            case 'side':
                s = val;
                break;
            case 'area':
                s = Math.sqrt(val / ((3 * sqrt3) / 2));
                break;
            case 'perimeter':
                s = val / 6;
                break;
            case 'inradius': // apothem
                s = val / (sqrt3 / 2);
                break;
            case 'circumradius':
                s = val;
                break;
            default:
                s = val;
        }

        const area = ((3 * sqrt3) / 2) * s * s;
        const perimeter = 6 * s;
        const inradius = (sqrt3 / 2) * s;
        const circumradius = s;
        const diagonalLong = 2 * s;
        const diagonalShort = sqrt3 * s;

        setResults({
            side: s,
            area,
            perimeter,
            inradius,
            circumradius,
            diagonalLong,
            diagonalShort
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🛑</span> Hexagon Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the area, perimeter, side length, and radii of a regular hexagon.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Calculate given</label>
                        <select
                            value={inputType}
                            onChange={(e) => { setInputType(e.target.value); setResults(null); }}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50"
                        >
                            <option value="side">Side Length (a)</option>
                            <option value="area">Area (A)</option>
                            <option value="perimeter">Perimeter (P)</option>
                            <option value="inradius">Inradius / Apothem (r)</option>
                            <option value="circumradius">Circumradius (R)</option>
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

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest"
                    >
                        Calculate Hexagon Properties
                    </button>
                </div>
            </div>

            {results && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full z-10">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Side (a)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.side.toFixed(4)}</span>
                        </div>
                        <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center shadow-inner">
                            <span className="text-emerald-400 text-sm font-bold uppercase tracking-wide">Area (A)</span>
                            <span className="font-mono text-white font-bold text-2xl">{results.area.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Perimeter (P)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.perimeter.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Inradius/Apothem (r)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.inradius.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Circumradius (R)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.circumradius.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Short Diagonal (d)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.diagonalShort.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center md:col-span-2">
                            <span className="text-zinc-400 text-sm font-bold uppercase tracking-wide">Long Diagonal (D)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.diagonalLong.toFixed(4)}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">Formulas (Regular Hexagon)</p>
                <ul className="list-disc pl-5 space-y-1 font-mono">
                    <li>Area = (3√3 / 2) × a²</li>
                    <li>Perimeter = 6a</li>
                    <li>Inradius (apothem) = (√3 / 2) × a</li>
                    <li>Long Diagonal = 2a</li>
                    <li>Short Diagonal = √3 × a</li>
                </ul>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Hexagon Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Hexagon Calculator"
                    whatIsIt={
                        <>
                            <p>A <strong>Hexagon Calculator</strong> is a specialized geometry tool used to find all the key metric properties of a regular hexagon instantly.</p>
                            <p>By entering just a single known measurement—like the side length, area, perimeter, inradius (apothem), or circumradius—the calculator automatically computes every other geometric property of the six-sided shape. It's built specifically for <em>regular</em> hexagons, where all six sides and all six interior angles are perfectly equal to one another.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>A regular hexagon is mathematically unique because it can be divided into exactly six equilateral triangles. This gives rise to several constants involving the square root of 3 (√3).</p>
                            <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                                <li><strong>Area (A):</strong> <br /> <code className="bg-zinc-100 p-1 px-2 rounded font-bold">A = (3√3 / 2) × a²</code> (where <em>a</em> is the side length)</li>
                                <li><strong>Perimeter (P):</strong> <br /> <code className="bg-zinc-100 p-1 px-2 rounded font-bold">P = 6 × a</code></li>
                                <li><strong>Inradius / Apothem (r):</strong> The distance from the center to the midpoint of any side. <br /> <code className="bg-zinc-100 p-1 px-2 rounded font-bold">r = (√3 / 2) × a</code></li>
                                <li><strong>Circumradius (R):</strong> The distance from the center to any vertex. In a regular hexagon, this is exactly equal to the side length. <br /> <code className="bg-zinc-100 p-1 px-2 rounded font-bold">R = a</code></li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>Let’s calculate the properties of a regular hexagon with a <strong>Side Length (a) of 5 cm</strong>:</p>
                            <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-zinc-50 p-4 rounded-xl border border-zinc-200 shadow-inner">
                                <li className="flex justify-between border-b border-zinc-200 pb-2"><span>1. Perimeter:</span> <span>6 × 5 = <strong className="text-emerald-700">30 cm</strong></span></li>
                                <li className="flex justify-between border-b border-zinc-200 py-2"><span>2. Area:</span> <span>(3√3 / 2) × 5² ≈ <strong className="text-emerald-700">64.9519 cm²</strong></span></li>
                                <li className="flex justify-between border-b border-zinc-200 py-2"><span>3. Inradius (Apothem):</span> <span>(√3 / 2) × 5 ≈ <strong className="text-emerald-700">4.3301 cm</strong></span></li>
                                <li className="flex justify-between pt-2"><span>4. Circumradius:</span> <span>Equal to a = <strong className="text-emerald-700">5 cm</strong></span></li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4">
                            <li><strong>Architecture & Tiling:</strong> Hexagrams tessellate perfectly (they interlock without gaps), making them ideal for floor tiling, honeycomb structures, and patio layouts.</li>
                            <li><strong>Manufacturing:</strong> Calculating the exact cross-sectional area and wrench clearances required for hexagonal nuts and bolts.</li>
                            <li><strong>Tabletop Gaming:</strong> Designing hex-grid maps for strategy games where exact cell area and distance between hex centers (the Apothem) must be known.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "What is the difference between a long diagonal and short diagonal?",
                            answer: "A regular hexagon has two types of diagonals. The Long Diagonal (D) connects opposite vertices and passes straight through the center (length = 2a). The Short Diagonal (d) connects two non-adjacent vertices, bypassing the center entirely (length = √3 × a)."
                        },
                        {
                            question: "What is an Apothem?",
                            answer: "The apothem is the geometric term for the 'Inradius'. It is the perpendicular distance starting from the exact center of the hexagon and ending at the midpoint of any of its six flat sides. It is crucial for calculating the area."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Octagon Calculator", path: "/octagon-calculator", desc: "Calculate properties of 8-sided regular polygons." },
                        { name: "Polygon Calculator", path: "/polygon-calculator", desc: "Calculate properties for an n-sided regular polygon." },
                        { name: "Area Calculator", path: "/area-calculator", desc: "Find the surface area of various standard 2D shapes." }
                    ]}
                />
            </div>
        </div>
    );
}
