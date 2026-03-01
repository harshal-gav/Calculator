'use client';

import { useState } from 'react';

export default function PercentageCalculator() {
    const [whatIsVal1, setWhatIsVal1] = useState('');
    const [whatIsVal2, setWhatIsVal2] = useState('');
    const [whatIsRes, setWhatIsRes] = useState<number | null>(null);

    const [isWhatVal1, setIsWhatVal1] = useState('');
    const [isWhatVal2, setIsWhatVal2] = useState('');
    const [isWhatRes, setIsWhatRes] = useState<number | null>(null);

    const [changeVal1, setChangeVal1] = useState('');
    const [changeVal2, setChangeVal2] = useState('');
    const [changeRes, setChangeRes] = useState<{ val: number, type: 'Increase' | 'Decrease' | 'No Change' } | null>(null);

    const calcWhatIs = () => {
        const v1 = parseFloat(whatIsVal1);
        const v2 = parseFloat(whatIsVal2);
        setWhatIsRes(!isNaN(v1) && !isNaN(v2) ? (v1 / 100) * v2 : null);
    };

    const calcIsWhat = () => {
        const v1 = parseFloat(isWhatVal1);
        const v2 = parseFloat(isWhatVal2);
        setIsWhatRes(!isNaN(v1) && !isNaN(v2) && v2 !== 0 ? (v1 / v2) * 100 : null);
    };

    const calcChange = () => {
        const v1 = parseFloat(changeVal1);
        const v2 = parseFloat(changeVal2);
        if (!isNaN(v1) && !isNaN(v2) && v1 !== 0) {
            const diff = v2 - v1;
            const pct = (Math.abs(diff) / Math.abs(v1)) * 100;
            let type: 'Increase' | 'Decrease' | 'No Change' = 'No Change';
            if (diff > 0) type = 'Increase';
            if (diff < 0) type = 'Decrease';
            setChangeRes({ val: pct, type });
        } else {
            setChangeRes(null);
        }
    };

    const clearAll = () => {
        setWhatIsVal1(''); setWhatIsVal2(''); setWhatIsRes(null);
        setIsWhatVal1(''); setIsWhatVal2(''); setIsWhatRes(null);
        setChangeVal1(''); setChangeVal2(''); setChangeRes(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-end border-b pb-4 mb-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-blue-900">Percentage Calculator</h1>
                    <p className="mt-2 text-gray-500 text-lg">Calculate all common percentage problems instantly.</p>
                </div>
                <button onClick={clearAll} className="text-gray-500 hover:text-red-500 transition font-medium text-sm">Clear All</button>
            </div>

            <div className="space-y-8">

                {/* Scenario 1 */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 flex flex-wrap items-center gap-4 text-xl font-medium text-gray-700">
                        <span>What is</span>
                        <input type="number" value={whatIsVal1} onChange={(e) => setWhatIsVal1(e.target.value)} className="w-24 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center" placeholder="%" />
                        <span>% of</span>
                        <input type="number" value={whatIsVal2} onChange={(e) => setWhatIsVal2(e.target.value)} className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center" />
                        <span className="font-bold text-gray-400">?</span>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button onClick={calcWhatIs} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition w-full md:w-auto">Calculate</button>
                        {whatIsRes !== null && (
                            <div className="min-w-[120px] bg-white border-2 border-green-400 text-green-700 font-bold p-3 rounded-lg text-center shadow-sm text-xl">
                                {whatIsRes.toFixed(4).replace(/\.?0+$/, '')}
                            </div>
                        )}
                    </div>
                </div>

                {/* Scenario 2 */}
                <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 flex flex-wrap items-center gap-4 text-xl font-medium text-gray-700">
                        <input type="number" value={isWhatVal1} onChange={(e) => setIsWhatVal1(e.target.value)} className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 text-center" />
                        <span>is what % of</span>
                        <input type="number" value={isWhatVal2} onChange={(e) => setIsWhatVal2(e.target.value)} className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 text-center" />
                        <span className="font-bold text-gray-400">?</span>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button onClick={calcIsWhat} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition w-full md:w-auto">Calculate</button>
                        {isWhatRes !== null && (
                            <div className="min-w-[120px] bg-white border-2 border-green-400 text-green-700 font-bold p-3 rounded-lg text-center shadow-sm text-xl flex items-center justify-center gap-1">
                                {isWhatRes.toFixed(4).replace(/\.?0+$/, '')} <span className="text-gray-400 text-sm">%</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Scenario 3 */}
                <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-100 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 flex flex-wrap items-center gap-4 text-xl font-medium text-gray-700">
                        <div className="flex flex-col gap-1 w-full md:w-auto">
                            <span className="text-sm text-gray-400">From Value</span>
                            <input type="number" value={changeVal1} onChange={(e) => setChangeVal1(e.target.value)} className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500 text-center" />
                        </div>
                        <span className="mt-5 px-2 text-gray-400 font-bold">→</span>
                        <div className="flex flex-col gap-1 w-full md:w-auto">
                            <span className="text-sm text-gray-400">To Value</span>
                            <input type="number" value={changeVal2} onChange={(e) => setChangeVal2(e.target.value)} className="w-32 p-2 rounded-lg border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500 text-center" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                        <button onClick={calcChange} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition w-full md:w-auto mt-4 md:mt-0">Calculate</button>
                        {changeRes !== null && (
                            <div className="min-w-[180px] bg-white border-2 border-green-400 p-3 rounded-lg text-center shadow-sm flex flex-col items-center justify-center">
                                <div className="text-xl font-bold text-green-700 flex items-center gap-1">
                                    {changeRes.val.toFixed(4).replace(/\.?0+$/, '')} <span className="text-gray-400 text-sm">%</span>
                                </div>
                                <div className={`text-xs font-bold uppercase tracking-wider ${changeRes.type === 'Increase' ? 'text-green-600' : changeRes.type === 'Decrease' ? 'text-red-500' : 'text-gray-400'}`}>
                                    {changeRes.type}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Percentage Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div >
    );
}
