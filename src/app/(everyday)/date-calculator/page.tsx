'use client';

import { useState } from 'react';

export default function DateCalculator() {
    // Get today's date adjusted for local timezone before stringifying to YYYY-MM-DD
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(localToday);
    const [endDate, setEndDate] = useState(localToday);
    const [includeEndDate, setIncludeEndDate] = useState(false);

    const [result, setResult] = useState<{
        totalDays: number;
        years: number;
        months: number;
        days: number;
    } | null>(null);

    const calculateDifference = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Add 1 day if we are including the end date in the span
        if (includeEndDate) {
            end.setDate(end.getDate() + 1);
        }

        // Calculate total days
        const diffTime = end.getTime() - start.getTime();
        const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        // Calculate Years, Months, Days via pure date manipulation
        // This handles leap years and variable month lengths accurately
        let d1 = new Date(startDate);
        const d2 = new Date(end); // End date, potentially adjusted by includeEndDate

        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();

        if (days < 0) {
            months -= 1;
            // Get last day of the previous month
            const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        // Handle negative differences (start date is after end date)
        if (totalDays < 0) {
            setResult({
                totalDays,
                years: -years,
                months: -months,
                days: -days
            });
        } else {
            setResult({
                totalDays,
                years,
                months,
                days
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-sky-900 border-b pb-4">Date Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the exact duration between two dates in years, months, and days.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 space-y-6 flex flex-col justify-center">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-sky-500 font-medium text-lg text-gray-800" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-sky-500 font-medium text-lg text-gray-800" />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                        <input type="checkbox" checked={includeEndDate} onChange={(e) => setIncludeEndDate(e.target.checked)} className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500" />
                        <span className="text-gray-700 font-medium">Include end date in calculation (+1 day)</span>
                    </label>

                    <button onClick={calculateDifference} className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition shadow-lg uppercase tracking-wide">
                        Calculate Duration
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-sky-100 rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center p-8 min-h-[300px]">
                    {result !== null ? (
                        <div className="w-full text-center space-y-6">
                            <div>
                                <h3 className="text-sky-800 font-semibold uppercase tracking-wider text-sm mb-2">Total Combined Days</h3>
                                <div className="text-6xl font-black text-gray-900">
                                    {Math.abs(result.totalDays)} <span className="text-3xl text-gray-500 font-bold ml-1">days</span>
                                </div>
                                {result.totalDays < 0 && <span className="text-xs text-red-500 font-bold mt-1 inline-block uppercase bg-red-50 px-2 py-1 rounded">Negative Time (End was before start)</span>}
                            </div>

                            <div className="h-px w-full bg-sky-100"></div>

                            <div>
                                <h3 className="text-gray-500 font-bold uppercase text-xs mb-3">Breakdown</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="text-2xl font-black text-sky-700">{Math.abs(result.years)}</div>
                                        <div className="text-xs text-gray-500 font-semibold uppercase mt-1">Years</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="text-2xl font-black text-sky-700">{Math.abs(result.months)}</div>
                                        <div className="text-xs text-gray-500 font-semibold uppercase mt-1">Months</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="text-2xl font-black text-sky-700">{Math.abs(result.days)}</div>
                                        <div className="text-xs text-gray-500 font-semibold uppercase mt-1">Days</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sky-300 font-medium text-center text-lg max-w-xs">
                            Select two dates to instantly compute the exact time difference.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Date Calculator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
