'use client';

import { useState, useEffect } from 'react';

// Simplified periodic table with common atomic weights
const ATOMIC_WEIGHTS: Record<string, number> = {
    'H': 1.008, 'He': 4.0026, 'Li': 6.94, 'Be': 9.0122, 'B': 10.81, 'C': 12.011, 'N': 14.007, 'O': 15.999,
    'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974, 'S': 32.06,
    'Cl': 35.45, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078, 'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996,
    'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.38, 'Ga': 69.723, 'Ge': 72.630,
    'As': 74.922, 'Se': 78.971, 'Br': 79.904, 'Kr': 83.798, 'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224,
    'Nb': 92.906, 'Mo': 95.95, 'Tc': 98, 'Ru': 101.07, 'Rh': 102.91, 'Pd': 106.42, 'Ag': 107.87, 'Cd': 112.41,
    'In': 114.82, 'Sn': 118.71, 'Sb': 121.76, 'Te': 127.60, 'I': 126.90, 'Xe': 131.29, 'Cs': 132.91, 'Ba': 137.33,
    'La': 138.91, 'Ce': 140.12, 'Pr': 140.91, 'Nd': 144.24, 'Pm': 145, 'Sm': 150.36, 'Eu': 151.96, 'Gd': 157.25,
    'Tb': 158.93, 'Dy': 162.50, 'Ho': 164.93, 'Er': 167.26, 'Tm': 168.93, 'Yb': 173.05, 'Lu': 174.97, 'Hf': 178.49,
    'Ta': 180.95, 'W': 183.84, 'Re': 186.21, 'Os': 190.23, 'Ir': 192.22, 'Pt': 195.08, 'Au': 196.97, 'Hg': 200.59,
    'Tl': 204.38, 'Pb': 207.2, 'Bi': 208.98, 'Po': 209, 'At': 210, 'Rn': 222, 'Fr': 223, 'Ra': 226,
    'Ac': 227, 'Th': 232.04, 'Pa': 231.04, 'U': 238.03, 'Np': 237, 'Pu': 244, 'Am': 243, 'Cm': 247,
    'Bk': 247, 'Cf': 251, 'Es': 252, 'Fm': 257, 'Md': 258, 'No': 259, 'Lr': 262
};

export default function MolarMassCalculator() {
    const [formula, setFormula] = useState('H2O');
    const [error, setError] = useState('');

    const calculateMolarMass = (f: string) => {
        let totalMass = 0;
        let elements: { symbol: string, count: number, mass: number }[] = [];

        try {
            // Very simple parser for chemical formulas like C6H12O6, H2O, NaCl
            // Note: Does not currently support parentheses like Ca(OH)2

            // Check for parentheses (not supported in this simple parser)
            if (f.includes('(') || f.includes(')')) {
                throw new Error("Parentheses are not currently supported by this simple parser.");
            }

            const regex = /([A-Z][a-z]*)(\d*)/g;
            let match;
            let matchFound = false;

            // Validate characters first
            if (!/^[A-Za-z0-9]+$/.test(f) && f !== '') {
                throw new Error("Invalid characters in formula. Use valid element symbols (e.g., C, H, O, Na).");
            }

            while ((match = regex.exec(f)) !== null) {
                matchFound = true;
                const symbol = match[1];
                const count = match[2] ? parseInt(match[2], 10) : 1;

                const weight = ATOMIC_WEIGHTS[symbol];
                if (!weight) {
                    throw new Error(`Unknown element: ${symbol}`);
                }

                const mass = weight * count;
                totalMass += mass;

                // Add to breakdown
                const existingIndex = elements.findIndex(e => e.symbol === symbol);
                if (existingIndex >= 0) {
                    elements[existingIndex].count += count;
                    elements[existingIndex].mass += mass;
                } else {
                    elements.push({ symbol, count, mass });
                }
            }

            if (!matchFound && f.length > 0) {
                throw new Error("Could not parse formula. Example: H2O");
            }

            return { totalMass, elements, error: '' };
        } catch (e: any) {
            return { totalMass: 0, elements: [], error: e.message };
        }
    };

    const { totalMass, elements, error: parseError } = calculateMolarMass(formula.trim());

    // Allow user to see error or result
    useEffect(() => {
        setError(parseError);
    }, [parseError]);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center">
                    <span className="mr-3">🧪</span> Molar Mass Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the molar mass (molecular weight) of a chemical compound and analyze its elemental composition.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Inputs */}
                <div className="space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-l-2xl"></div>
                    <div>
                        <label className="block text-sm font-bold text-emerald-800 mb-2 uppercase tracking-wide">Chemical Formula</label>
                        <input
                            type="text"
                            value={formula}
                            onChange={(e) => setFormula(e.target.value)}
                            className={`w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all font-bold text-2xl tracking-widest ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
                            placeholder="e.g., C6H12O6"
                            autoComplete="off"
                        />
                        {error && (
                            <p className="mt-2 text-sm text-red-600 font-medium flex items-center">
                                <span className="mr-1">⚠</span> {error}
                            </p>
                        )}
                        {!error && (
                            <p className="mt-2 text-xs text-zinc-500 uppercase font-bold tracking-wider">
                                Note: Case sensitive (Co = Cobalt, CO = Carbon Monoxide)
                            </p>
                        )}
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="h-full bg-emerald-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-emerald-800">
                    {/* Decorative element map dots */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 4px 4px, white 2px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                    <div className="relative z-10 text-center">
                        <h2 className="text-emerald-200 font-bold uppercase tracking-widest text-xs mb-4 border-b border-emerald-800/50 pb-4">Total Molar Mass</h2>

                        <div className="text-5xl md:text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg break-all">
                            {totalMass > 0 ? totalMass.toFixed(4) : '0.0000'}
                        </div>
                        <div className="text-emerald-400 font-bold text-lg md:text-xl tracking-wide mb-8">
                            g/mol
                        </div>

                        {totalMass > 0 && elements.length > 0 && (
                            <div className="bg-emerald-950/60 backdrop-blur-sm rounded-xl p-4 border border-emerald-800/50 text-left">
                                <div className="text-xs text-emerald-400 uppercase font-bold tracking-wider mb-2 border-b border-emerald-800/50 pb-2">Elemental Breakdown</div>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                    {elements.map((el, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm font-mono border-b border-emerald-800/30 pb-1 last:border-0 last:pb-0">
                                            <div>
                                                <span className="text-white font-bold">{el.symbol}</span>
                                                <span className="text-emerald-500 text-xs ml-1">x{el.count}</span>
                                            </div>
                                            <div className="text-emerald-200">
                                                {el.mass.toFixed(3)} <span className="text-[10px] opacity-70">g/mol</span>
                                                <span className="ml-2 text-emerald-400 font-bold">
                                                    ({((el.mass / totalMass) * 100).toFixed(1)}%)
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Molar Mass Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
