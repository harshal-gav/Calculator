'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function CrossProductCalculator() {
    // Vector 1: u = (u1, u2, u3)
    const [u1, setU1] = useState('1');
    const [u2, setU2] = useState('-7');
    const [u3, setU3] = useState('1');

    // Vector 2: v = (v1, v2, v3)
    const [v1, setV1] = useState('5');
    const [v2, setV2] = useState('2');
    const [v3, setV3] = useState('4');

    const [result, setResult] = useState<{
        i: number;
        j: number;
        k: number;
        magnitude: number;
    } | null>(null);

    const calculate = () => {
        const numU1 = parseFloat(u1);
        const numU2 = parseFloat(u2);
        const numU3 = parseFloat(u3);
        const numV1 = parseFloat(v1);
        const numV2 = parseFloat(v2);
        const numV3 = parseFloat(v3);

        if (isNaN(numU1) || isNaN(numU2) || isNaN(numU3) || isNaN(numV1) || isNaN(numV2) || isNaN(numV3)) {
            setResult(null);
            return;
        }

        // Cross Product: u x v = (u2v3 - u3v2)i - (u1v3 - u3v1)j + (u1v2 - u2v1)k
        const cx = (numU2 * numV3) - (numU3 * numV2);
        const cy = (numU3 * numV1) - (numU1 * numV3); // Note: standard is -(u1v3 - u3v1)
        const cz = (numU1 * numV2) - (numU2 * numV1);

        const magnitude = Math.sqrt((cx * cx) + (cy * cy) + (cz * cz));

        setResult({
            i: cx,
            j: cy,
            k: cz,
            magnitude: magnitude
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-violet-900 flex items-center justify-center font-serif">
                    <span className="mr-3">✖️</span> Cross Product
                </h1>
                <p className="text-violet-700 text-lg max-w-2xl mx-auto">
                    Calculate the cross product (vector product) of two 3D vectors.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">

                <div className="space-y-8 mb-8">
                    {/* Vector u */}
                    <div className="p-5 rounded-xl border border-violet-100 bg-violet-50/50">
                        <div className="font-bold text-violet-900 border-b border-violet-200 pb-2 mb-4 flex items-center">
                            <span className="bg-violet-600 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-2 italic">u</span>
                            Vector 1
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">x (i)</label>
                                <input type="number" step="any" value={u1} onChange={(e) => setU1(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-violet-500 font-bold bg-white text-center font-mono" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">y (j)</label>
                                <input type="number" step="any" value={u2} onChange={(e) => setU2(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-violet-500 font-bold bg-white text-center font-mono" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">z (k)</label>
                                <input type="number" step="any" value={u3} onChange={(e) => setU3(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-violet-500 font-bold bg-white text-center font-mono" />
                            </div>
                        </div>
                    </div>

                    {/* Vector v */}
                    <div className="p-5 rounded-xl border border-fuchsia-100 bg-fuchsia-50/50">
                        <div className="font-bold text-fuchsia-900 border-b border-fuchsia-200 pb-2 mb-4 flex items-center">
                            <span className="bg-fuchsia-600 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-2 italic">v</span>
                            Vector 2
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">x (i)</label>
                                <input type="number" step="any" value={v1} onChange={(e) => setV1(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-fuchsia-500 font-bold bg-white text-center font-mono" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">y (j)</label>
                                <input type="number" step="any" value={v2} onChange={(e) => setV2(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-fuchsia-500 font-bold bg-white text-center font-mono" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">z (k)</label>
                                <input type="number" step="any" value={v3} onChange={(e) => setV3(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-fuchsia-500 font-bold bg-white text-center font-mono" onKeyDown={(e) => e.key === 'Enter' && calculate()} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={calculate}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-violet-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate (u × v)
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Cross Product Result (w)</h2>

                    <div className="z-10 relative mb-8 w-full max-w-lg bg-black/40 border border-violet-500/30 p-8 rounded-3xl shadow-inner text-center">
                        <div className="text-violet-300 text-[10px] font-bold uppercase tracking-widest mb-3">Cartesian Vector Format</div>
                        <div className="font-mono font-black text-3xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg">
                            ( <span className="text-violet-400">{result.i.toLocaleString()}</span>, <span className="text-fuchsia-400">{result.j.toLocaleString()}</span>, <span className="text-sky-400">{result.k.toLocaleString()}</span> )
                        </div>
                    </div>

                    <div className="w-full max-w-2xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-center">
                            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2 block">Standard Unit Vector Notation</span>
                            <div className="font-mono text-white text-xl">
                                {result.i}i {result.j >= 0 ? '+' : ''} {result.j}j {result.k >= 0 ? '+' : ''} {result.k}k
                            </div>
                        </div>
                        <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-center">
                            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2 block">Magnitude |w|</span>
                            <div className="font-mono text-violet-300 font-bold text-2xl">
                                {result.magnitude.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Cross Product Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />

            <CalculatorSEO
                title="Cross Product Calculator"
                whatIsIt={
                    <p>
                        The <strong>Cross Product Calculator</strong> computes the exact orthogonal vector produced when two 3D vectors are multiplied together. Unlike the dot product (which returns a simple scalar number), the cross product fundamentally creates a brand new third vector that is perfectly perpendicular (at a 90-degree angle) to both original input vectors.
                    </p>
                }
                formula={
                    <>
                        <p>The cross product of vectors <strong>u = (u₁, u₂, u₃)</strong> and <strong>v = (v₁, v₂, v₃)</strong> is calculated by finding the determinant of a specific matrix:</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
                            <strong>w = u × v</strong><br />
                            <strong>w = (u₂v₃ - u₃v₂) i - (u₁v₃ - u₃v₁) j + (u₁v₂ - u₂v₁) k</strong>
                        </div>
                    </>
                }
                example={
                    <>
                        <p>Let's cross Vector <strong>u (1, -7, 1)</strong> with Vector <strong>v (5, 2, 4)</strong>:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>i component (x):</strong> (-7 × 4) - (1 × 2) = -28 - 2 = <strong>-30</strong></li>
                            <li><strong>j component (y):</strong> (1 × 4) - (1 × 5) = 4 - 5 = -1. Because of the formula's strictly alternating signs, we flip it: <strong>1</strong></li>
                            <li><strong>k component (z):</strong> (1 × 2) - (-7 × 5) = 2 - (-35) = <strong>37</strong></li>
                            <li><strong>Resultant Vector (w):</strong> <strong>(-30, 1, 37)</strong></li>
                        </ul>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Classical Mechanics (Torque):</strong> Calculating rotational force (torque). Torque is the cross product of the lever arm vector (distance from pivot) and the applied force vector.</li>
                        <li><strong>Electromagnetism:</strong> Determining the magnetic force exerted on a highly charged particle rapidly moving through a magnetic field (the Lorentz force).</li>
                        <li><strong>Computer Graphics:</strong> Finding the "normal vector" of a 3D polygon/triangle. This is absolutely critical for calculating how light realistically bounces off a 3D model during rendering.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "Is u × v the exact same as v × u?",
                        answer: "No, absolutely not. The cross product is strictly 'anti-commutative'. u × v = -(v × u). Swapping the strict order of the vectors will produce a result with the exact same magnitude, but pointing in the exact opposite mathematical direction."
                    },
                    {
                        question: "What does it mean if the cross product is strictly (0,0,0)?",
                        answer: "If the cross product is a perfect zero vector, it mathematically proves that your two original vectors are either perfectly parallel to each other, perfectly anti-parallel, or at least one of them is the zero vector."
                    },
                    {
                        question: "How do I calculate the cross product of 2D vectors?",
                        answer: "You technically cannot. The cross product is a strictly 3D mathematical operation. To 'cross' 2D vectors, you must artificially add a '0' as their third (z/k) component, which will always result in a vector pointing straight up or straight down perfectly along the z-axis."
                    }
                ]}
                relatedCalculators={[
                    { name: "Dot Product", path: "/dot-product-calculator", desc: "Calculate the scalar dot product of two vectors." },
                    { name: "Vector Addition", path: "/vector-addition-calculator", desc: "Add two vectors together to find the resultant." },
                    { name: "Projectile Motion", path: "/projectile-motion-calculator", desc: "Calculate physical trajectories using vectors." }
                ]}
            />
        </div>
    );
}
