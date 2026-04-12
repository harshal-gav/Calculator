"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import projectileData from "@/data/seo-content/official/projectile-motion-calculator.json";

export default function ProjectileMotionCalculator() {
  const [velocity, setVelocity] = useState("20");
  const [angle, setAngle] = useState("45");
  const [gravity, setGravity] = useState("9.81");
  const [initialHeight, setInitialHeight] = useState("0");

  const [result, setResult] = useState<{
    range: number;
    maxHeight: number;
    timeOfFlight: number;
    vx: number;
    vy: number;
  } | null>(null);

  useEffect(() => {
    calculateTrajectory();
  }, [velocity, angle, gravity, initialHeight]);

  const calculateTrajectory = () => {
    const v0 = parseFloat(velocity) || 0;
    const deg = parseFloat(angle) || 0;
    const g = parseFloat(gravity) || 0;
    const h0 = parseFloat(initialHeight) || 0;

    if (v0 > 0 && g > 0) {
      const rad = (deg * Math.PI) / 180;
      const vx = v0 * Math.cos(rad);
      const vy = v0 * Math.sin(rad);

      // Time to landing: h0 + vy*t - 0.5*g*t^2 = 0
      // 0.5gt^2 - vy*t - h0 = 0
      // Quadratic formula: t = [-b + sqrt(b^2 - 4ac)] / 2a
      // a = 0.5g, b = -vy, c = -h0
      const a_quad = 0.5 * g;
      const b_quad = -vy;
      const c_quad = -h0;
      const discriminant = Math.pow(b_quad, 2) - 4 * a_quad * c_quad;
      
      let tFlight = 0;
      if (discriminant >= 0) {
        tFlight = (-b_quad + Math.sqrt(discriminant)) / (2 * a_quad);
      }

      const range = vx * tFlight;
      
      // Max height occurs at t = vy / g (above h0)
      const tPeak = vy / g;
      const hPeak = h0 + (vy * tPeak) - (0.5 * g * Math.pow(tPeak, 2));

      setResult({
        range,
        maxHeight: hPeak,
        timeOfFlight: tFlight,
        vx,
        vy
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-3xl shadow-xl border border-slate-200 font-sans italic-headings">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏹</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Trajectory <span className="text-cyan-600 font-black">Ballistics</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase italic">Parabolic Motion Projection Engine</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 09-I</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">Ideal Kinematic Verification</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 border-b border-slate-100 pb-3 italic">Launch Data</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Initial Velocity (m/s)</label>
                <input
                  type="number"
                  value={velocity}
                  onChange={(e) => setVelocity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic flex justify-between">
                   <span>Launch Angle</span>
                   <span className="text-cyan-600">{angle}°</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600 mb-2"
                />
                <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase italic">
                  <span>Horizontal (0°)</span>
                  <span>Vertical (90°)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Gravity (g)</label>
                    <input
                      type="number"
                      value={gravity}
                      onChange={(e) => setGravity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-lg text-slate-700"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Start Ht (m)</label>
                    <input
                      type="number"
                      value={initialHeight}
                      onChange={(e) => setInitialHeight(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-lg text-slate-700"
                    />
                 </div>
              </div>
            </div>

            <button
              onClick={calculateTrajectory}
              className="w-full bg-slate-900 hover:bg-black text-cyan-400 font-black py-5 rounded-2xl shadow-xl transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 border border-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span> Project Path
            </button>
          </div>

          <div className="p-8 bg-slate-100 rounded-[2.5rem] border border-slate-200 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Angle Tip</span>
                <span className="text-xs">📐</span>
             </div>
             <p className="text-[11px] font-bold leading-relaxed italic text-slate-600">A 45° angle provides maximum range on level ground. Adjust velocity for higher apex requirements.</p>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
          {result !== null ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-slate-200">
                 {/* Trajectory SVG */}
                 <div className="relative h-64 w-full mb-8 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-end px-8 pb-4">
                    <svg viewBox="0 0 400 200" className="w-full h-full preserve-3d overflow-visible">
                       {/* Ground */}
                       <line x1="-100" y1="200" x2="500" y2="200" stroke="#e2e8f0" strokeWidth="2" />
                       {/* Parabola */}
                       <path 
                         d={`M 0 ${200 - (parseFloat(initialHeight) * 2)} Q 200 ${200 - (result.maxHeight * 4)} 400 200`} 
                         stroke="#0891b2" 
                         strokeWidth="4" 
                         fill="none" 
                         strokeDasharray="8 8" 
                         className="opacity-20 translate-y-[-2px]" 
                       />
                       <path 
                         d={`M 0 ${200 - (parseFloat(initialHeight) * 2)} Q 200 ${200 - (result.maxHeight * 4)} 400 200`} 
                         stroke="#0891b2" 
                         strokeWidth="3" 
                         fill="none" 
                         className="animate-draw-path"
                       />
                       {/* Projectile Point */}
                       <circle cx="400" cy="200" r="6" fill="#0f172a" />
                       <circle cx="200" cy={200 - (result.maxHeight * 4)} r="4" fill="#0891b2" />
                    </svg>
                    <div className="absolute top-4 right-6 text-[8px] font-black text-slate-300 uppercase tracking-widest italic">Simulation Trace: Active</div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                       <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Total Range</span>
                       <div className="text-5xl font-black italic tabular-nums text-slate-900 leading-none">
                          {result.range.toFixed(1)}<span className="text-xl text-slate-300 font-bold ml-1 italic">m</span>
                       </div>
                    </div>
                    <div>
                       <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Peak Altitude</span>
                       <div className="text-5xl font-black italic tabular-nums text-slate-900 leading-none">
                          {result.maxHeight.toFixed(1)}<span className="text-xl text-slate-300 font-bold ml-1 italic">m</span>
                       </div>
                    </div>
                    <div>
                       <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Flight Time</span>
                       <div className="text-5xl font-black italic tabular-nums text-slate-900 leading-none">
                          {result.timeOfFlight.toFixed(2)}<span className="text-xl text-slate-300 font-bold ml-1 italic">s</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white flex flex-col justify-center relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 h-1 w-full bg-cyan-500"></div>
                  <div className="text-cyan-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Vector Decomposition</div>
                  <div className="flex flex-col gap-4">
                     <div className="flex justify-between items-baseline">
                        <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest italic">Horizontal (Vx)</span>
                        <span className="text-2xl font-black italic">{result.vx.toFixed(2)} m/s</span>
                     </div>
                     <div className="flex justify-between items-baseline border-t border-white/5 pt-4">
                        <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest italic">Vertical (Vy)</span>
                        <span className="text-2xl font-black italic">{result.vy.toFixed(2)} m/s</span>
                     </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center italic-headings">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Environmental Matrix</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Impact Velocity</span>
                      <span className="text-slate-900 font-black italic">{velocity} m/s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Drag Model</span>
                      <span className="text-slate-300 font-black italic italic">VACUUM (IDEAL)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-200/40 p-3 rounded-2xl flex items-center gap-4">
                <div className="h-2 grow bg-slate-300 rounded-full overflow-hidden shadow-inner flex">
                   <div className="h-full bg-cyan-600 transition-all duration-1000 shadow-[0_0_15px_rgba(8,145,178,0.4)]" style={{ width: `${Math.min(100, result.range / 2)}%` }}></div>
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-24 text-right italic">Range Scale</div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white shadow-inner">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-sm animate-pulse">
                  <span className="text-4xl text-slate-300">☄️</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter italic">Pending Launch Vector</h3>
               <p className="text-slate-400 max-w-sm font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Initialize velocity and launch angle to project the parabolic flight path across the coordinate system.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={projectileData.title}
        whatIsIt={projectileData.whatIsIt}
        formula={projectileData.formula}
        example={projectileData.example}
        useCases={projectileData.useCases}
        faqs={projectileData.faqs}
        deepDive={projectileData.deepDive}
        glossary={projectileData.glossary}
        relatedCalculators={[
          {
            name: "Velocity",
            path: "/velocity-calculator/",
            desc: "Analyze speed and displacement vectors in standard 1D motion scenarios.",
          },
          {
            name: "Acceleration",
            path: "/acceleration-calculator/",
            desc: "Calculate the rate of change in velocity for accelerating projectiles.",
          },
          {
            name: "Force",
            path: "/force-calculator/",
            desc: "Determine launch force requirements based on mass and desired velocity.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Perform advanced trigonometric operations required for ballistics research.",
          }
        ]}
      />

       <style jsx>{`
        @keyframes draw-path {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-path 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
