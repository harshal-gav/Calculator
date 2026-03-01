'use client';

import { useState } from 'react';

export default function SalaryCalculator() {
    const [amount, setAmount] = useState('50000');
    const [period, setPeriod] = useState('year'); // hour, day, week, month, year
    const [hoursPerWeek, setHoursPerWeek] = useState('40');
    const [daysPerWeek, setDaysPerWeek] = useState('5');

    const [results, setResults] = useState<{
        hourly: number;
        daily: number;
        weekly: number;
        biweekly: number;
        monthly: number;
        yearly: number;
    } | null>(null);

    const calculateSalary = () => {
        const val = parseFloat(amount) || 0;
        const hpw = parseFloat(hoursPerWeek) || 40;
        const dpw = parseFloat(daysPerWeek) || 5;

        // Convert everything to a yearly baseline first
        let yearly = 0;
        if (period === 'year') yearly = val;
        if (period === 'month') yearly = val * 12;
        if (period === 'week') yearly = val * 52;
        if (period === 'day') yearly = val * dpw * 52;
        if (period === 'hour') yearly = val * hpw * 52;

        setResults({
            yearly: yearly,
            monthly: yearly / 12,
            biweekly: yearly / 26,
            weekly: yearly / 52,
            daily: yearly / (dpw * 52),
            hourly: yearly / (hpw * 52)
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">Salary Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Convert your salary equivalent between hourly, daily, weekly, monthly, and annual amounts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Salary Amount ($)</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 border focus:border-emerald-500 font-bold text-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Earned Per</label>
                            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 border focus:border-emerald-500">
                                <option value="hour">Hour</option>
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Hours/Week</label>
                                <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 border" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Days/Week</label>
                                <input type="number" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 border" />
                            </div>
                        </div>

                        <button onClick={calculateSalary} className="w-full bg-emerald-600 text-white font-bold py-4 mt-4 rounded-lg hover:bg-emerald-700 shadow-md transition uppercase tracking-wider text-sm">
                            Convert Salary
                        </button>
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {results !== null ? (
                        <table className="min-w-full text-left">
                            <tbody className="divide-y divide-gray-100 text-lg">
                                <tr className="bg-emerald-50">
                                    <td className="px-6 py-4 font-semibold text-gray-600">Hourly</td>
                                    <td className="px-6 py-4 font-black text-emerald-800 text-right">${results.hourly.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-500">Daily</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">${results.daily.toFixed(2)}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-500">Weekly</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">${results.weekly.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-500">Bi-Weekly</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">${results.biweekly.toFixed(2)}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-600">Monthly</td>
                                    <td className="px-6 py-4 font-black text-gray-900 text-right">${results.monthly.toFixed(2)}</td>
                                </tr>
                                <tr className="bg-emerald-100">
                                    <td className="px-6 py-5 font-bold text-emerald-900">Yearly</td>
                                    <td className="px-6 py-5 font-black text-emerald-900 text-right text-2xl">${results.yearly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 text-center text-gray-400">
                            Click Convert to view the salary breakdown.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Salary Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
