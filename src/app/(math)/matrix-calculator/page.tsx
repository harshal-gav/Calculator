'use client';

import { useState } from 'react';

export default function MatrixCalculator() {
    // 2x2 Matrix A
    const [a, setA] = useState([['1', '2'], ['3', '4']]);
    // 2x2 Matrix B
    const [b, setB] = useState([['2', '0'], ['1', '2']]);

    const [operation, setOperation] = useState('add');
    const [result, setResult] = useState<number[][] | null>(null);
    const [scalarRes, setScalarRes] = useState<number | null>(null);

    const parseMat = (m: string[][]) => [
        [parseFloat(m[0][0]) || 0, parseFloat(m[0][1]) || 0],
        [parseFloat(m[1][0]) || 0, parseFloat(m[1][1]) || 0]
    ];

    const calculate = () => {
        const matA = parseMat(a);
        const matB = parseMat(b);

        if (operation === 'add') {
            setResult([
                [matA[0][0] + matB[0][0], matA[0][1] + matB[0][1]],
                [matA[1][0] + matB[1][0], matA[1][1] + matB[1][1]]
            ]);
            setScalarRes(null);
        } else if (operation === 'sub') {
            setResult([
                [matA[0][0] - matB[0][0], matA[0][1] - matB[0][1]],
                [matA[1][0] - matB[1][0], matA[1][1] - matB[1][1]]
            ]);
            setScalarRes(null);
        } else if (operation === 'mult') {
            // Dot product
            setResult([
                [
                    matA[0][0] * matB[0][0] + matA[0][1] * matB[1][0],
                    matA[0][0] * matB[0][1] + matA[0][1] * matB[1][1]
                ],
                [
                    matA[1][0] * matB[0][0] + matA[1][1] * matB[1][0],
                    matA[1][0] * matB[0][1] + matA[1][1] * matB[1][1]
                ]
            ]);
            setScalarRes(null);
        } else if (operation === 'detA') {
            setScalarRes((matA[0][0] * matA[1][1]) - (matA[0][1] * matA[1][0]));
            setResult(null);
        } else if (operation === 'detB') {
            setScalarRes((matB[0][0] * matB[1][1]) - (matB[0][1] * matB[1][0]));
            setResult(null);
        }
    };

    const handleAChange = (row: number, col: number, val: string) => {
        const newA = [...a];
        newA[row][col] = val;
        setA(newA);
    };

    const handleBChange = (row: number, col: number, val: string) => {
        const newB = [...b];
        newB[row][col] = val;
        setB(newB);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 font-serif">
                    <span className="mr-3">🔢</span> 2x2 Matrix Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Add, subtract, multiply, and find the determinant of 2x2 matrices instantly.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">

                    {/* Matrix A */}
                    <div className="flex flex-col items-center">
                        <div className="text-emerald-800 font-bold mb-2 tracking-widest text-sm uppercase">Matrix A</div>
                        <div className="relative p-2 flex">
                            {/* Brackets */}
                            <div className="border-l-4 border-t-4 border-b-4 border-zinc-800 w-4 rounded-l"></div>
                            <div className="grid grid-cols-2 gap-2 px-2">
                                <input type="number" step="any" value={a[0][0]} onChange={e => handleAChange(0, 0, e.target.value)} className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500" />
                                <input type="number" step="any" value={a[0][1]} onChange={e => handleAChange(0, 1, e.target.value)} className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500" />
                                <input type="number" step="any" value={a[1][0]} onChange={e => handleAChange(1, 0, e.target.value)} className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500" />
                                <input type="number" step="any" value={a[1][1]} onChange={e => handleAChange(1, 1, e.target.value)} className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div className="border-r-4 border-t-4 border-b-4 border-zinc-800 w-4 rounded-r"></div>
                        </div>
                    </div>

                    {/* Operator Select */}
                    <div className="flex flex-col">
                        <select
                            value={operation}
                            onChange={(e) => setOperation(e.target.value)}
                            className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 font-bold text-emerald-900 shadow-sm cursor-pointer hover:border-emerald-400 transition"
                        >
                            <option value="add">A + B</option>
                            <option value="sub">A - B</option>
                            <option value="mult">A × B</option>
                            <option value="detA">Determinant |A|</option>
                            <option value="detB">Determinant |B|</option>
                        </select>
                    </div>

                    {/* Matrix B */}
                    <div className={`flex flex-col items-center transition-opacity ${(operation === 'detA' || operation === 'detB') ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
                        <div className="text-emerald-800 font-bold mb-2 tracking-widest text-sm uppercase">Matrix B</div>
                        <div className="relative p-2 flex">
                            <div className="border-l-4 border-t-4 border-b-4 border-zinc-800 w-4 rounded-l"></div>
                            <div className="grid grid-cols-2 gap-2 px-2">
                                <input type="number" step="any" value={b[0][0]} onChange={e => handleBChange(0, 0, e.target.value)} className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500" />
                                <input type="number" step="any" value={b[0][1]} onChange={e => handleBChange(0, 1, e.target.value)} className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500" />
                                <input type="number" step="any" value={b[1][0]} onChange={e => handleBChange(1, 0, e.target.value)} className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500" />
                                <input type="number" step="any" value={b[1][1]} onChange={e => handleBChange(1, 1, e.target.value)} className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div className="border-r-4 border-t-4 border-b-4 border-zinc-800 w-4 rounded-r"></div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center border-t border-zinc-100 pt-8 mt-2">
                    <button
                        onClick={calculate}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded-xl transition-colors shadow-xl shadow-emerald-600/30 uppercase tracking-widest text-sm group"
                    >
                        Calculate <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>

            {(result || scalarRes !== null) && (
                <div className="mt-8 bg-zinc-900 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden text-center flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-6 relative z-10">Result</h2>

                    <div className="relative z-10 flex text-white">
                        {result && (
                            <div className="flex items-center text-3xl md:text-5xl font-mono">
                                <div className="border-l-[6px] border-t-[6px] border-b-[6px] border-emerald-500 w-4 md:w-6 h-full rounded-l"></div>
                                <div className="grid grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4 px-4 py-2 bg-black/30 backdrop-blur-md font-bold">
                                    <div className="text-right">{Number.isInteger(result[0][0]) ? result[0][0] : result[0][0].toFixed(3)}</div>
                                    <div className="text-right">{Number.isInteger(result[0][1]) ? result[0][1] : result[0][1].toFixed(3)}</div>
                                    <div className="text-right">{Number.isInteger(result[1][0]) ? result[1][0] : result[1][0].toFixed(3)}</div>
                                    <div className="text-right">{Number.isInteger(result[1][1]) ? result[1][1] : result[1][1].toFixed(3)}</div>
                                </div>
                                <div className="border-r-[6px] border-t-[6px] border-b-[6px] border-emerald-500 w-4 md:w-6 h-full rounded-r"></div>
                            </div>
                        )}

                        {scalarRes !== null && (
                            <div className="text-6xl font-black font-mono tracking-tight text-white drop-shadow-xl p-8 bg-black/40 rounded-3xl border border-white/10">
                                {Number.isInteger(scalarRes) ? scalarRes : scalarRes.toFixed(4)}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Matrix Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
