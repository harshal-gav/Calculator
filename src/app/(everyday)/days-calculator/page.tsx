'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function DaysCalculator() {
    // Local date for default
    const today = new Date();
    const localTodayStr = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(localTodayStr);
    const [operation, setOperation] = useState('add');
    const [years, setYears] = useState('0');
    const [months, setMonths] = useState('0');
    const [weeks, setWeeks] = useState('0');
    const [days, setDays] = useState('0');

    const [resultDate, setResultDate] = useState<Date | null>(null);

    const calculate = () => {
        if (!startDate) return;

        const d = new Date(startDate);
        // Date input is YYYY-MM-DD, parsing it as such gives Midnight UTC. Add offset to make it local midnight.
        const userDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000);

        const y = parseInt(years) || 0;
        const m = parseInt(months) || 0;
        const w = parseInt(weeks) || 0;
        const day = parseInt(days) || 0;

        const multiplier = operation === 'add' ? 1 : -1;

        userDate.setFullYear(userDate.getFullYear() + (y * multiplier));
        userDate.setMonth(userDate.getMonth() + (m * multiplier));
        userDate.setDate(userDate.getDate() + ((w * 7 + day) * multiplier));

        setResultDate(userDate);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📅</span> Add/Subtract Days
                </h1>
                <p className="text-cyan-700 text-lg max-w-2xl mx-auto">
                    Instantly find exactly what date it will be after adding or subtracting time.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Starting Date</label>
                        <input
                            type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-cyan-500 font-bold font-mono text-xl transition-all outline-none"
                        />
                    </div>

                    <div className="flex bg-zinc-100 p-1 rounded-xl">
                        <button
                            className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-lg transition-colors ${operation === 'add' ? 'bg-cyan-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-700'}`}
                            onClick={() => setOperation('add')}
                        >
                            + Add Time
                        </button>
                        <button
                            className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-lg transition-colors ${operation === 'sub' ? 'bg-rose-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-700'}`}
                            onClick={() => setOperation('sub')}
                        >
                            - Subtract Time
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest text-center">Years</label>
                            <input type="number" min="0" value={years} onChange={(e) => setYears(e.target.value)} className="w-full text-center rounded-xl p-3 border-2 border-zinc-200 focus:border-cyan-500 font-bold text-xl outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest text-center">Months</label>
                            <input type="number" min="0" value={months} onChange={(e) => setMonths(e.target.value)} className="w-full text-center rounded-xl p-3 border-2 border-zinc-200 focus:border-cyan-500 font-bold text-xl outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest text-center">Weeks</label>
                            <input type="number" min="0" value={weeks} onChange={(e) => setWeeks(e.target.value)} className="w-full text-center rounded-xl p-3 border-2 border-zinc-200 focus:border-cyan-500 font-bold text-xl outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest text-center">Days</label>
                            <input type="number" min="0" value={days} onChange={(e) => setDays(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && calculate()} className="w-full text-center rounded-xl p-3 border-2 border-zinc-200 focus:border-cyan-500 font-bold text-xl outline-none" />
                        </div>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className={`w-full text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg uppercase tracking-widest text-lg ${operation === 'add' ? 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/30' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30'}`}
                >
                    Calculate New Date
                </button>
            </div>

            {resultDate !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none ${operation === 'add' ? 'bg-cyan-600' : 'bg-rose-600'}`}></div>

                    <h2 className={`font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center ${operation === 'add' ? 'text-cyan-400' : 'text-rose-400'}`}>Target Date Result</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className={`p-8 rounded-3xl border-4 shadow-inner flex flex-col items-center justify-center ${operation === 'add' ? 'bg-cyan-900/40 border-cyan-500/30' : 'bg-rose-900/40 border-rose-500/30'}`}>
                            <span className={`text-[10px] font-bold uppercase tracking-widest mb-3 block border-b pb-2 w-full text-center ${operation === 'add' ? 'text-cyan-300 border-cyan-500/50' : 'text-rose-300 border-rose-500/50'}`}>
                                {resultDate.toLocaleDateString('en-US', { weekday: 'long' })}
                            </span>
                            <div className="font-serif font-black text-4xl md:text-5xl text-white tracking-tight drop-shadow-lg p-2 text-center leading-tight">
                                {resultDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Days Calculator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Days Content Calculator: Add or Subtract Time"
                    whatIsIt={
                        <>
                            <p>The <strong>Days Calculator</strong> allows you to instantly pinpoint an exact future or past date by mathematically adding or subtracting a specific combination of years, months, weeks, and days from a starting point.</p>
                            <p>Mental calendar math is notoriously difficult because human timekeeping is messy. Leap years change February's length, months randomly alternate between 30 and 31 days, and centuries have complex leap-rules. This tool handles all backend chronological logic automatically.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The calculator utilizes the standard Gregorian Calendar algorithm to evaluate date shifts. Under the hood, modern programming converts your "Start Date" into an exact <strong>Unix Timestamp</strong> (the total number of milliseconds that have passed since January 1, 1970).</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>Adding Days/Weeks:</strong> This is perfectly linear. Adding 3 weeks simply adds exactly 21 days (1,814,400,000 milliseconds) to the starting timestamp.</li>
                                <li><strong>Adding Months:</strong> This is complex constraint computing. If you start on <em>January 31st</em> and add 1 Month, the result is technically <em>February 31st</em> (which doesn't exist). Standard algorithms will aggressively "roll over" this invalid date, landing you firmly on <em>March 3rd</em> (or March 2nd on leap years).</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>You sign a critical 18-month commercial lease starting on October 15, 2023. Your contract legally requires you to give a "60-Day Notice of Intent to Vacate" before the lease permanently renews itself.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>Step 1 (Find the End):</strong> Start at Oct 15, 2023. Add exactly 1 Year and 6 Months. Output: <em>April 15, 2025</em>.</li>
                                <li><strong>Step 2 (Find the Notice Deadline):</strong> Start at April 15, 2025. Subtract exactly 60 Days. Output: <em>February 14, 2025</em>.</li>
                                <li><strong>The Result:</strong> If you don't send an email by Valentine's Day, you are legally trapped in the lease for another year.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Legal & Compliance Deadlines:</strong> Lawyers calculating the exact "90-day statute of limitations" or "30 clear business days" required to officially file court documents or respond to subpoenas without missing critical expiry dates.</li>
                            <li><strong>Pregnancy tracking:</strong> Expecting mothers using the standard medical constant of exactly 280 days added to the date of their last missed cycle to identify their exact projected due date.</li>
                            <li><strong>Project Management (Gantt Charts):</strong> Construction managers determining the exact completion date of a house if Phase 1 takes 4 weeks, Phase 2 takes 16 days, and Phase 3 takes 2 months.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Does the calculator account for leap years?",
                            answer: "Yes, absolutely. If you add 1 year to February 20th, 2023, you land on Feb 20, 2024. However, that mathematical jump accurately counted 366 passing days instead of the normal 365, directly accounting for the extra February 29th."
                        },
                        {
                            question: "Are weekends (Saturday/Sunday) included in 'Days'?",
                            answer: "Yes. This tool adds normal, absolute chronological days. If you specifically need to skip weekends and only count Monday-Friday work days, you must use our dedicated Business Days Calculator instead."
                        },
                        {
                            question: "What happens if I subtract time into BC (Before Christ)?",
                            answer: "Most modern web programming dates (Javascript) technically break if you subtract into the year 0. Depending on your browser, subtracting 3000 years from today will either throw an error or cap out at the dawn of the Unix Epoch (1970)."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Business Days Calculator", path: "/business-days-calculator", desc: "Calculate day spans while specifically skipping Saturdays, Sundays, and Holidays." },
                        { name: "Age Calculator", path: "/age-calculator", desc: "Calculate exactly how many years, months, and days old you are right now." },
                        { name: "Time Card Calculator", path: "/time-card-calculator", desc: "Add hours and minutes together to determine total weekly payroll." }
                    ]}
                />
            </div>
        </div>
    );
}
