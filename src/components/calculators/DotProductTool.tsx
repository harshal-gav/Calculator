"use client";

import { useState } from "react";

export default function DotProductTool() {
  const [dim, setDim] = useState("3"); // 2 or 3 dimensions

  // Vector u
  const [u1, setU1] = useState("2");
  const [u2, setU2] = useState("-5");
  const [u3, setU3] = useState("4");

  // Vector v
  const [v1, setV1] = useState("3");
  const [v2, setV2] = useState("1");
  const [v3, setV3] = useState("-2");

  const [result, setResult] = useState<{
    dotProduct: number;
    magU: number;
    magV: number;
    angleDeg: number;
    angleRad: number;
    ortho: boolean;
  } | null>(null);

  const calculate = () => {
    const d = parseInt(dim);

    const nU1 = parseFloat(u1) || 0;
    const nU2 = parseFloat(u2) || 0;
    const nU3 = d === 3 ? parseFloat(u3) || 0 : 0;

    const nV1 = parseFloat(v1) || 0;
    const nV2 = parseFloat(v2) || 0;
    const nV3 = d === 3 ? parseFloat(v3) || 0 : 0;

    // Dot Product = u1*v1 + u2*v2 + u3*v3
    const dot = nU1 * nV1 + nU2 * nV2 + nU3 * nV3;

    // Magnitudes
    const mU = Math.sqrt(nU1 * nU1 + nU2 * nU2 + nU3 * nU3);
    const mV = Math.sqrt(nV1 * nV1 + nV2 * nV2 + nV3 * nV3);

    // Angle between vectors
    let angleRad = 0;
    let angleDeg = 0;

    if (mU > 0 && mV > 0) {
      // cos(theta) = (u . v) / (|u| * |v|)
      let cosTheta = dot / (mU * mV);
      // Handle float precision issues
      if (cosTheta > 1) cosTheta = 1;
      if (cosTheta < -1) cosTheta = -1;

      angleRad = Math.acos(cosTheta);
      angleDeg = angleRad * (180 / Math.PI);
    }

    setResult({
      dotProduct: dot,
      magU: mU,
      magV: mV,
      angleDeg,
      angleRad,
      ortho: Math.abs(dot) < 1e-10, // close to zero
    });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
      <div className="mb-8 p-4 bg-zinc-100 rounded-xl flex justify-center gap-4">
        <button
          onClick={() => {
            setDim("2");
            setResult(null);
          }}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${dim === "2" ? "bg-emerald-600 text-white shadow-md" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`}
        >
          2D Vectors
        </button>
        <button
          onClick={() => {
            setDim("3");
            setResult(null);
          }}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${dim === "3" ? "bg-emerald-600 text-white shadow-md" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`}
        >
          3D Vectors
        </button>
      </div>

      <div className="space-y-8 mb-8">
        <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/50">
          <div className="font-bold text-emerald-900 border-b border-emerald-200 pb-2 mb-4 flex items-center">
            <span className="bg-emerald-600 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-2 italic">u</span> Vector 1
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">u₁</label>
              <input type="number" step="any" value={u1} onChange={(e) => setU1(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-center font-mono" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">u₂</label>
              <input type="number" step="any" value={u2} onChange={(e) => setU2(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-center font-mono" />
            </div>
            {dim === "3" && (
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">u³</label>
                <input type="number" step="any" value={u3} onChange={(e) => setU3(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-center font-mono" />
              </div>
            )}
          </div>
        </div>

        <div className="p-5 rounded-xl border border-teal-100 bg-teal-50/50">
          <div className="font-bold text-teal-900 border-b border-teal-200 pb-2 mb-4 flex items-center">
            <span className="bg-teal-600 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-2 italic">v</span> Vector 2
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">v₁</label>
              <input type="number" step="any" value={v1} onChange={(e) => setV1(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold bg-white text-center font-mono" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">v₂</label>
              <input type="number" step="any" value={v2} onChange={(e) => setV2(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold bg-white text-center font-mono" />
            </div>
            {dim === "3" && (
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">v₃</label>
                <input type="number" step="any" value={v3} onChange={(e) => setV3(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold bg-white text-center font-mono" onKeyDown={(e) => e.key === "Enter" && calculate()} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg">Calculate (u · v)</button>
      </div>

      {result !== null && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Scalar Result</h2>
          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-full aspect-square border-4 bg-emerald-900/40 border-emerald-400/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-white/60 text-xs uppercase tracking-widest mb-2 font-bold block text-center border-b border-emerald-800 pb-2 w-3/4">Dot Product</span>
              <div className="font-bold text-6xl text-emerald-400 text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                {Number.isInteger(result.dotProduct) ? result.dotProduct : result.dotProduct.toFixed(4)}
              </div>
            </div>
          </div>
          <div className="w-full max-w-2xl z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-center">
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-between items-center px-6">
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Magnitude |u|</span>
              <span className="font-mono text-emerald-100 font-bold">{result.magU.toFixed(4)}</span>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-between items-center px-6">
              <span className="text-teal-400 text-[10px] font-bold uppercase tracking-widest">Magnitude |v|</span>
              <span className="font-mono text-teal-100 font-bold">{result.magV.toFixed(4)}</span>
            </div>
          </div>
          <div className="z-10 bg-black/40 border border-emerald-500/30 p-6 rounded-xl text-center w-full max-w-2xl">
            <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-4 block">Angle Between Vectors (θ)</span>
            <div className="flex justify-center gap-10">
              <div><span className="font-mono text-white text-3xl font-bold">{result.angleDeg.toFixed(2)}°</span><span className="block text-emerald-400/50 text-[10px] mt-1 uppercase tracking-widest">Degrees</span></div>
              <div><span className="font-mono text-white text-3xl font-bold">{result.angleRad.toFixed(4)}</span><span className="block text-emerald-400/50 text-[10px] mt-1 uppercase tracking-widest">Radians</span></div>
            </div>
            {result.ortho && <div className="mt-6 inline-block bg-teal-500/20 text-teal-300 px-4 py-2 rounded-lg text-sm font-bold border border-teal-500/50">✓ Vectors are Orthogonal</div>}
          </div>
        </div>
      )}
    </div>
  );
}
