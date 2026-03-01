'use client';

import { useState } from 'react';

export default function PregnancyCalculator() {
    const [lmpDate, setLmpDate] = useState('');
    const [cycleLength, setCycleLength] = useState('28');

    const [result, setResult] = useState<{
        dueDate: Date;
        conceptionDate: Date;
        firstTrimesterEnd: Date;
        secondTrimesterEnd: Date;
        weeksPregnant: number;
        daysPregnant: number;
    } | null>(null);

    const calculateDue = () => {
        if (!lmpDate) return;

        const lmp = new Date(lmpDate);
        if (isNaN(lmp.getTime())) return;

        const cycle = parseInt(cycleLength) || 28;

        // Naegele's rule adjusted for cycle length:
        // Due Date = LMP + 280 days + (Cycle Length - 28 days)
        const due = new Date(lmp);
        due.setDate(due.getDate() + 280 + (cycle - 28));

        // Estimated conception is roughly Two weeks after LMP + cycle adjustment
        const conception = new Date(lmp);
        conception.setDate(conception.getDate() + 14 + (cycle - 28));

        // Trimesters
        const firstTriEnd = new Date(lmp);
        firstTriEnd.setDate(firstTriEnd.getDate() + (13 * 7)); // 13 weeks

        const secondTriEnd = new Date(lmp);
        secondTriEnd.setDate(secondTriEnd.getDate() + (27 * 7)); // 27 weeks

        // Current progress
        const today = new Date();
        const diffTime = Math.max(0, today.getTime() - lmp.getTime());
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(totalDays / 7);
        const days = totalDays % 7;

        setResult({
            dueDate: due,
            conceptionDate: conception,
            firstTrimesterEnd: firstTriEnd,
            secondTrimesterEnd: secondTriEnd,
            weeksPregnant: weeks,
            daysPregnant: days
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-fuchsia-900 border-b pb-4">Pregnancy Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your estimated due date, conception date, and see your current trimester timeline.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-fuchsia-50 p-6 rounded-xl border border-fuchsia-200">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">First Day of Last Period (LMP)</label>
                            <input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} className="w-full rounded-lg border-fuchsia-300 p-3 shadow-sm focus:border-fuchsia-500 font-medium text-lg text-gray-800" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Average Cycle Length (Days)</label>
                            <input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className="w-full rounded-lg border-fuchsia-300 p-3 shadow-sm focus:border-fuchsia-500 font-medium" />
                            <p className="text-xs text-gray-500 mt-1">Typically 28 days for most women.</p>
                        </div>

                        <button onClick={calculateDue} className="w-full bg-fuchsia-600 text-white font-bold py-4 rounded-xl hover:bg-fuchsia-700 transition shadow-lg uppercase tracking-wide mt-4">
                            Calculate Due Date
                        </button>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-fuchsia-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result !== null ? (
                        <div className="p-6">
                            <div className="text-center mb-6 pb-6 border-b border-fuchsia-100">
                                <h3 className="text-fuchsia-800 font-semibold uppercase tracking-wider text-sm mb-2">Estimated Due Date</h3>
                                <div className="text-3xl lg:text-4xl font-black text-gray-900">
                                    {formatDate(result.dueDate)}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-fuchsia-50 rounded-lg p-4 grid grid-cols-2 gap-2 text-sm text-center">
                                    <div className="border-r border-fuchsia-200">
                                        <div className="text-gray-500 font-bold uppercase mb-1">Current Progress</div>
                                        <div className="text-xl font-black text-fuchsia-700">
                                            {result.weeksPregnant > 42 ? 'Arrived!' : `${result.weeksPregnant} Wks, ${result.daysPregnant} Days`}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 font-bold uppercase mb-1">Conception</div>
                                        <div className="text-sm font-bold text-gray-800 mt-[6px]">
                                            {result.conceptionDate.toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-700 mb-2 border-b pb-1 text-sm uppercase tracking-wide">Trimester Timeline</h4>
                                    <ul className="text-sm space-y-3">
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">1st Trimester Ends</span>
                                            <span className="font-bold text-gray-900">{result.firstTrimesterEnd.toLocaleDateString()}</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">2nd Trimester Ends</span>
                                            <span className="font-bold text-gray-900">{result.secondTrimesterEnd.toLocaleDateString()}</span>
                                        </li>
                                        <li className="flex justify-between items-center bg-gray-50 -mx-2 px-2 py-1 rounded">
                                            <span className="text-fuchsia-700 font-bold">Due Date (3rd Ends)</span>
                                            <span className="font-black text-fuchsia-900">{result.dueDate.toLocaleDateString()}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 text-center text-fuchsia-300 font-medium">
                            Set your last period date and cycle length to generate your custom pregnancy calendar.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Pregnancy Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
