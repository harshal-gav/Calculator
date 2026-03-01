'use client';

import { useState } from 'react';

export default function PaceCalculator() {
    // Distance
    const [distance, setDistance] = useState('5');
    const [distanceUnit, setDistanceUnit] = useState('km'); // 'km' or 'miles'

    // Time
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('30');
    const [seconds, setSeconds] = useState('0');

    const [result, setResult] = useState<{
        paceMinPerKm: string;
        paceMinPerMile: string;
        speedKmH: number;
        speedMph: number;
    } | null>(null);

    const calculatePace = () => {
        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;
        const s = parseInt(seconds) || 0;
        const dist = parseFloat(distance) || 0;

        const totalMinutes = (h * 60) + m + (s / 60);
        const totalHours = totalMinutes / 60;

        if (totalMinutes > 0 && dist > 0) {
            let distKm = dist;
            let distMiles = dist;

            if (distanceUnit === 'km') {
                distMiles = dist * 0.621371;
            } else {
                distKm = dist * 1.60934;
            }

            // Pace = Time / Distance
            const minPerKm = totalMinutes / distKm;
            const minPerMile = totalMinutes / distMiles;

            // Speed = Distance / Time (in hours)
            const speedKmH = distKm / totalHours;
            const speedMph = distMiles / totalHours;

            // Format pace (e.g. 5.5 minutes -> 5:30)
            const formatPace = (decimalMinutes: number) => {
                const mins = Math.floor(decimalMinutes);
                const secs = Math.round((decimalMinutes - mins) * 60);
                return `${mins}:${secs.toString().padStart(2, '0')}`;
            };

            setResult({
                paceMinPerKm: formatPace(minPerKm),
                paceMinPerMile: formatPace(minPerMile),
                speedKmH,
                speedMph
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-sky-600 border-b pb-4">Pace Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your running pace and speed per kilometer and per mile based on a specific race distance and time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 space-y-6 flex flex-col justify-center">

                    <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Distance</label>
                            <input type="number" step="0.01" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-sky-500 font-bold text-lg" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                            <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-sky-500 font-bold bg-white text-gray-700 h-[52px]">
                                <option value="km">Km</option>
                                <option value="miles">Miles</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-sm relative pt-6 mt-4">
                        <div className="absolute top-0 left-0 -mt-3 ml-4 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm">Total Time</div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Hours</label>
                                <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 text-center shadow-sm focus:border-sky-500 font-bold text-lg" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Mins</label>
                                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 text-center shadow-sm focus:border-sky-500 font-bold text-lg" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Secs</label>
                                <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 text-center shadow-sm focus:border-sky-500 font-bold text-lg" />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculatePace} className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition shadow-lg uppercase tracking-wide">
                        Calculate Target Pace
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-sky-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result !== null ? (
                        <>
                            <div className="p-8 text-center space-y-4 bg-sky-50 border-b border-sky-100">
                                <div>
                                    <h3 className="text-sky-800 font-bold uppercase tracking-widest text-[11px] mb-2">Target Pace (Per Km)</h3>
                                    <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                                        {result.paceMinPerKm} <span className="text-xl text-gray-500 font-medium tracking-tight">/km</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3 bg-white flex-grow">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                                    <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Pace Per Mile</span>
                                    <span className="font-black text-lg text-gray-800">{result.paceMinPerMile} <span className="text-xs font-normal">/mi</span></span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100">
                                    <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Speed (Km/h)</span>
                                    <span className="font-bold text-md text-gray-800">{result.speedKmH.toFixed(2)} km/h</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100 shadow-inner">
                                    <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Speed (Mph)</span>
                                    <span className="font-bold text-md text-gray-800">{result.speedMph.toFixed(2)} mph</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-sky-300 font-medium px-8 text-lg leading-relaxed">
                            Input your exact race distance and goal time to reveal your required running splits and average speed.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Pace Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
