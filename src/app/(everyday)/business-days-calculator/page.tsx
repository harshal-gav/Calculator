'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function BusinessDaysCalculator() {
    const today = new Date();
    const localTodayStr = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(localTodayStr);
    const [endDate, setEndDate] = useState(localTodayStr);
    const [excludeSaturday, setExcludeSaturday] = useState(true);
    const [excludeSunday, setExcludeSunday] = useState(true);

    const [result, setResult] = useState<{
        businessDays: number;
        totalDays: number;
        weekendDays: number;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Normalize to local timezone midnight
        start.setMinutes(start.getMinutes() + start.getTimezoneOffset());
        end.setMinutes(end.getMinutes() + end.getTimezoneOffset());

        if (start > end) {
            setError("End date must be on or after the start date.");
            setResult(null);
            return;
        }

        const diffTime = end.getTime() - start.getTime();
        const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); // NOT including end date by default in span counts

        // Loop through days and count
        let bDays = 0;
        let wDays = 0;

        // We include the start date, typically. Let's include start date and exclude end date (standard span).
        // If they want inclusive of end date, we add 1 to the loop. Let's make it inclusive.
        const totalLoopDays = totalDays + 1;

        let currentDate = new Date(start);

        for (let i = 0; i < totalLoopDays; i++) {
            const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 6 is Saturday
            let isBusinessDay = true;

            if (dayOfWeek === 0 && excludeSunday) isBusinessDay = false;
            if (dayOfWeek === 6 && excludeSaturday) isBusinessDay = false;

            if (isBusinessDay) {
                bDays++;
            } else {
                wDays++;
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        setResult({
            businessDays: bDays,
            totalDays: totalLoopDays,
            weekendDays: wDays
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 flex items-center justify-center font-serif">
                    <span className="mr-3">💼</span> Business Days
                </h1>
                <p className="text-blue-700 text-lg max-w-2xl mx-auto">
                    Calculate the exact number of working days between two dates, excluding weekends.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Start Date</label>
                        <input
                            type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold font-mono text-xl transition-all outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">End Date</label>
                        <input
                            type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold font-mono text-xl transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="mb-8 bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3">
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-200 pb-2 mb-3">Exclusions</label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${excludeSaturday ? 'bg-blue-500 border-blue-500' : 'border-zinc-300 bg-white group-hover:border-blue-300'}`}>
                            {excludeSaturday && <span className="text-white text-sm font-bold">✓</span>}
                        </div>
                        <input type="checkbox" checked={excludeSaturday} onChange={(e) => setExcludeSaturday(e.target.checked)} className="hidden" />
                        <span className="text-zinc-700 font-medium">Exclude Saturdays from working days</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${excludeSunday ? 'bg-blue-500 border-blue-500' : 'border-zinc-300 bg-white group-hover:border-blue-300'}`}>
                            {excludeSunday && <span className="text-white text-sm font-bold">✓</span>}
                        </div>
                        <input type="checkbox" checked={excludeSunday} onChange={(e) => setExcludeSunday(e.target.checked)} className="hidden" />
                        <span className="text-zinc-700 font-medium">Exclude Sundays from working days</span>
                    </label>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Working Days
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Date Span Results</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-3xl border-4 bg-blue-900/40 border-blue-500/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-blue-500/50 pb-2 w-full text-center">Business Days</span>
                            <div className="font-mono font-black text-6xl text-white break-all tracking-tight drop-shadow-lg p-2 flex items-baseline">
                                {result.businessDays.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl z-10 grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">Total Combined Days</span>
                            <div className="font-mono text-white font-bold text-2xl">{result.totalDays.toLocaleString()}</div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center border-l-4 border-l-rose-500/50">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">Excluded Days</span>
                            <div className="font-mono text-rose-300 font-bold text-2xl">{result.weekendDays.toLocaleString()}</div>
                        </div>
                    </div>

                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Business Days Calculator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Business & Working Days Calculator"
                    whatIsIt={
                        <>
                            <p>The <strong>Business Days Calculator</strong> accurately counts the total number of working days between two dates, specifically excluding weekends (Saturdays and Sundays).</p>
                            <p>In logistics, finance, and project management, absolute chronological time is often irrelevant. If an invoice is due in "10 Business Days" on a Friday, the actual chronological due date is 14 days away because the weekends "pause" the countdown. This tool handles that complex counting logic instantly.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The core logic requires iterating through a raw calendar span and filtering out specific days of the week.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>Step 1 (Find Total Span):</strong> Subtract the Start Date from the End Date to find the absolute number of calendar days between the two.</li>
                                <li><strong>Step 2 (The Loop):</strong> The algorithm loops through every single day individually, checking its "Day Index" (0=Sunday, 1=Monday... 6=Saturday).</li>
                                <li><strong>Step 3 (Filtering):</strong> If the Day Index is 0 or 6 (and exclusions are checked), that day is discarded. The remaining valid days are summed up to give the final Working Days count.</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>You place a commercial printing order on <strong>Wednesday, May 1st</strong>. The print shop promises delivery in "5 Business Days."</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>The Count Begins:</strong>
                                    <br />Thursday, May 2 = Day 1
                                    <br />Friday, May 3 = Day 2
                                </li>
                                <li><strong>The Weekend Pause:</strong>
                                    <br />Saturday, May 4 = Excluded (Does not count)
                                    <br />Sunday, May 5 = Excluded (Does not count)
                                </li>
                                <li><strong>The Final Span:</strong>
                                    <br />Monday, May 6 = Day 3
                                    <br />Tuesday, May 7 = Day 4
                                    <br />Wednesday, May 8 = Day 5 (Delivery Date)
                                </li>
                                <li><strong>The Output:</strong> Chronologically, it took 7 full calendar days, but officially, it was exactly 5 Business Days.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Logistics & Shipping:</strong> When a package tracking site says "Transit time: 3-5 Working Days", determining the absolute latest date you can expect the delivery to arrive before contacting support.</li>
                            <li><strong>Finance & Invoicing:</strong> "Net 30" payment terms often refer to calendar days, but specific contract clauses like "Settlement in 3 business days" require filtering out bank holidays and weekends to determine the exact transfer date.</li>
                            <li><strong>HR & Payroll Processing:</strong> Calculating the exact number of working days a new employee was active during a partial initial month to prorate their very first salary paycheck accurately.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Are public/bank holidays automatically excluded?",
                            answer: "No, not automatically. Because public holidays vary drastically depending on your specific country, state, and even company, this core calculator only filters out standard absolute weekends (Saturdays and Sundays)."
                        },
                        {
                            question: "Why does it ask if I want to exclude Saturdays AND Sundays?",
                            answer: "Because 'Business Days' are not globally identical. In much of the Middle East (e.g., UAE, Israel), the standard workweek is Sunday through Thursday, meaning their 'Weekends' are Friday and Saturday. This tool allows international flexibility."
                        },
                        {
                            question: "Does the output count the End Date itself?",
                            answer: "Yes. This calculator uses 'Inclusive' counting. If you set the Start Date and End Date to the exact same Tuesday, the calculator outputs '1 Business Day' (Tuesday itself)."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Days Calculator", path: "/days-calculator", desc: "Add or subtract exact chronological time (including weekends) to find a target date." },
                        { name: "Time Card Calculator", path: "/time-card-calculator", desc: "Sum up daily clocked hours to determine total weekly work time and gross pay." },
                        { name: "Salary Calculator", path: "/salary-calculator", desc: "Convert an hourly wage into an annual salary assuming standard 260 yearly business days." }
                    ]}
                />
            </div>
        </div>
    );
}
