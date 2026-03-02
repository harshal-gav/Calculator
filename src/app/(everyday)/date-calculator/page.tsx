'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

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

            <CalculatorSEO
                title="Date Calculator"
                whatIsIt={
                    <>
                        <p>Our <strong>Date Calculator</strong> is a specialized calendar tool that calculates the exact amount of time that has passed (or will pass) between two distinct dates. It instantly outputs the total combined days, as well as a clean breakdown in Years, Months, and Days.</p>
                        <p>This tool is essential because standard subtraction fails when applied to dates. The Gregorian calendar is highly irregular, containing months of varying lengths (28 to 31 days) and Leap Years that insert an extra day every four years. This calculator automatically accounts for all historical and future calendar anomalies.</p>
                    </>
                }
                formula={
                    <>
                        <p>To accurately calculate the duration between two dates, our algorithm checks the exact number of days that exist in the specific months and years you have selected. During subtraction or addition, it "borrows" days based on those specific historical calendar months.</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 text-sky-900 border border-sky-100">
                            <p><strong>Years:</strong> End Year - Start Year</p>
                            <p><strong>Months:</strong> End Month - Start Month (Borrow 12 if end month is smaller)</p>
                            <p><strong>Days:</strong> End Day - Start Day (Borrow days equal to the length of the <em>previous</em> month if end day is smaller)</p>
                        </div>
                    </>
                }
                example={
                    <>
                        <p>Let's find out how much time passed between the signing of the Declaration of Independence (<strong>July 4, 1776</strong>) and the moon landing (<strong>July 20, 1969</strong>).</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Step 1 (Days):</strong> 20 - 4 = <strong>16 Days</strong>.</li>
                            <li><strong>Step 2 (Months):</strong> 7 (July) - 7 (July) = <strong>0 Months</strong>.</li>
                            <li><strong>Step 3 (Years):</strong> 1969 - 1776 = <strong>193 Years</strong>.</li>
                            <li><strong>Result:</strong> 193 Years, 0 Months, and 16 Days.</li>
                            <li><strong>Total Days:</strong> Because the algorithm accounts for the 46 Leap Years that occurred during that timespan, it calculates exactly <strong>70,508 Total Days</strong>.</li>
                        </ul>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Legal and Contracts:</strong> Determining the absolute expiration date of a contract, warranty, or statute of limitations (e.g., "90 days from the date of signing").</li>
                        <li><strong>Event Planning:</strong> Calculating exactly how many days are left until a wedding, concert, or major holiday to organize vendor timelines and invitations.</li>
                        <li><strong>Finance:</strong> Calculating the exact number of days a loan was held so that daily compound interest can be accurately charged or paid out.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "What does 'Include end date in calculation' mean?",
                        answer: "By default, calculating from Jan 1st to Jan 2nd returns '1 Day' (measuring the midnight-to-midnight span). If you click 'Include End Date', it adds +1 day to the final result, changing it to '2 Days'. This is crucial for payroll or hotel bookings where you need to count both the starting day and ending day as full calendar items."
                    },
                    {
                        question: "Does it account for Leap Years?",
                        answer: "Yes, perfectly. If your date range crosses February 29th during a leap year (which occurs every 4 years, except for years divisible by 100 but not 400), the calculator automatically adds the requisite extra day into your total."
                    },
                    {
                        question: "Why might a month show as '0' when calculating?",
                        answer: "If you calculate from March 15 to April 10, the result will be 0 Months and 26 Days. Because a full calendar month (passing the 15th of the next month) hasn't technically elapsed yet, the calculator accurately categorizes the remaining time purely into days."
                    }
                ]}
                relatedCalculators={[
                    { name: "Age Calculator", path: "/age-calculator", desc: "Calculate your chronological age in exact days and weeks." },
                    { name: "Time Calculator", path: "/time-calculator", desc: "Add or subtract exact hours and minutes to find time durations." },
                    { name: "Time Zone Converter", path: "/time-zone-converter", desc: "Convert times across hundreds of global time zones instantly." }
                ]}
            />
        </div>
    );
}
