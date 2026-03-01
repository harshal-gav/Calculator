'use client';

import { useState } from 'react';

export default function BloodPressureCalculator() {
    const [systolic, setSystolic] = useState('120');
    const [diastolic, setDiastolic] = useState('80');

    const [result, setResult] = useState<{
        category: string;
        color: string;
        description: string;
        pulsePressure: number;
        map: number; // Mean Arterial Pressure
    } | null>(null);

    const calculateBP = () => {
        const sys = parseFloat(systolic) || 0;
        const dia = parseFloat(diastolic) || 0;

        if (sys > 0 && dia > 0) {
            let category = '';
            let color = '';
            let description = '';

            // AHA Guidelines
            if (sys < 90 || dia < 60) {
                category = 'Hypotension (Low)';
                color = 'text-blue-600';
                description = 'Your blood pressure is lower than normal. Consider consulting a doctor if you experience dizziness or fainting.';
            } else if (sys < 120 && dia < 80) {
                category = 'Normal';
                color = 'text-green-600';
                description = 'Your blood pressure is in the ideal, healthy range. Maintain your healthy habits.';
            } else if (sys >= 120 && sys <= 129 && dia < 80) {
                category = 'Elevated';
                color = 'text-yellow-500';
                description = 'Your blood pressure is slightly elevated. You may be at risk of developing hypertension if steps are not taken.';
            } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
                category = 'High Blood Pressure (Stage 1)';
                color = 'text-orange-500';
                description = 'You have Stage 1 Hypertension. Medical providers may recommend lifestyle changes and possibly medication.';
            } else if (sys >= 180 || dia >= 120) {
                category = 'Hypertensive Crisis';
                color = 'text-red-700 bg-red-100 px-2 py-1 rounded inline-block';
                description = 'CRITICAL: Consult your doctor immediately. This is emergency territory.';
            } else if (sys >= 140 || dia >= 90) {
                category = 'High Blood Pressure (Stage 2)';
                color = 'text-red-500';
                description = 'You have Stage 2 Hypertension. Speak with a healthcare professional regarding intervention.';
            }

            const pulsePressure = sys - dia;
            // MAP roughly = DP + 1/3(SP - DP)
            const map = dia + (pulsePressure / 3);

            setResult({
                category,
                color,
                description,
                pulsePressure,
                map
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-red-700 border-b pb-4">Blood Pressure Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Input your blood pressure reading to immediately classify your cardiovascular health based on AHA guidelines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-red-50 p-6 rounded-xl border border-red-100 space-y-6 flex flex-col justify-center">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Systolic (Top Number)</label>
                        <input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-red-500 font-black text-2xl text-gray-800" />
                        <p className="text-xs text-gray-500 mt-1">Pressure during a heartbeat (contraction).</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Diastolic (Bottom Number)</label>
                        <input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-red-500 font-black text-2xl text-gray-800" />
                        <p className="text-xs text-gray-500 mt-1">Pressure between heartbeats (resting).</p>
                    </div>

                    <button onClick={calculateBP} className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition shadow-lg uppercase tracking-wide mt-4">
                        Analyze Reading
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 px-4">Not a replacement for professional medical advice.</p>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-red-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-6">
                            <div>
                                <h3 className="text-gray-500 font-bold uppercase tracking-widest text-[11px] mb-2">Category Assessment</h3>
                                <div className={`text-4xl font-black ${result.color} pb-4`}>
                                    {result.category}
                                </div>
                                <p className="text-sm font-medium text-gray-600 mt-2 bg-gray-50 p-4 rounded-lg border border-gray-100 leading-relaxed shadow-inner">
                                    {result.description}
                                </p>
                            </div>

                            <h3 className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest pt-2 border-t border-gray-100 mt-4">Advanced Metrics</h3>
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <h4 className="text-gray-500 font-bold uppercase text-[10px] mb-1">Pulse Pressure</h4>
                                    <p className="text-xl font-bold text-gray-800">{Math.round(result.pulsePressure)} <span className="text-[10px] uppercase tracking-wide font-normal text-gray-500">mmHg</span></p>
                                </div>
                                <div className="bg-red-50 p-3 rounded-xl border border-red-100 shadow-inner">
                                    <h4 className="text-red-800 font-bold uppercase text-[10px] mb-1">Mean Arterial Pressure (MAP)</h4>
                                    <p className="text-xl font-bold text-red-700">{Math.round(result.map)} <span className="text-[10px] uppercase tracking-wide font-normal text-gray-500">mmHg</span></p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-red-300 font-medium px-8 text-lg leading-relaxed">
                            Enter your Systolic and Diastolic numbers to verify if your pressure falls within a healthy, normal range.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Blood Pressure Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
