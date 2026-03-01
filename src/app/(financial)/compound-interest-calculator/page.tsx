'use client';

import { useState } from 'react';

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState('10000');
    const [rate, setRate] = useState('7.5');
    const [years, setYears] = useState('15');
    const [compoundFreq, setCompoundFreq] = useState('12'); // Monthly
    const [monthlyContribution, setMonthlyContribution] = useState('200');

    const [result, setResult] = useState<{
        futureValue: number;
        totalContributions: number;
        totalInterest: number;
    } | null>(null);

    const calculateCompound = () => {
        const P = parseFloat(principal) || 0;
        const r = (parseFloat(rate) || 0) / 100;
        const t = parseFloat(years) || 0;
        const n = parseInt(compoundFreq) || 12;
        const PMT = parseFloat(monthlyContribution) || 0;

        if (t > 0) {
            // Compound Interest on Principal: A1 = P(1 + r/n)^(nt)
            const A1 = P * Math.pow(1 + (r / n), n * t);

            // Future Value of a Series (Monthly Contributions):
            // If contributions are monthly, and compounding is something else, this formula gets very complex.
            // For simplicity in standard calculators, we often assume the contribution freq matches compound freq,
            // or we use the standard PMT future value formula assuming PMT frequency = Compounding Frequency.
            // Let's assume PMT is made at the END of each compounding period for standard accuracy, 
            // and adjust the PMT to match compound freq equivalent if needed.
            // We will simplify: assume PMT matches compounding frequency (e.g. if monthly comp, PMT is monthly).
            // If n=1 (yearly) but they enter monthly PMT, we multiply PMT * 12 for the yearly injection.
            let freqPMT = PMT;
            if (n === 1) freqPMT = PMT * 12; // Yearly
            if (n === 4) freqPMT = PMT * 3;  // Quarterly
            if (n === 365) freqPMT = PMT / 30; // Daily roughly

            let A2 = 0;
            if (r > 0 && freqPMT > 0) {
                A2 = freqPMT * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));
            } else if (r === 0) {
                A2 = freqPMT * (n * t);
            }

            const totalAmount = A1 + A2;
            const totalPrincipal = P + (PMT * 12 * t);
            const totalEarned = totalAmount - totalPrincipal;

            setResult({
                futureValue: totalAmount,
                totalContributions: totalPrincipal,
                totalInterest: totalEarned
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-green-900 border-b pb-4">Compound Interest Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Discover how your savings and investments will grow over time through the power of compound interest.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-green-50 p-6 rounded-xl border border-green-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Principal ($)</label>
                        <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-green-500 font-bold text-xl" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Interest Rate (%)</label>
                        <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-green-500 font-medium" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Years to Grow</label>
                        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-green-500 font-medium" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Contribution ($)</label>
                        <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-green-500 font-medium text-blue-700" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Compound Frequency</label>
                        <select value={compoundFreq} onChange={(e) => setCompoundFreq(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-green-500 bg-white">
                            <option value="1">Annually (1/Yr)</option>
                            <option value="2">Semi-Annually (2/Yr)</option>
                            <option value="4">Quarterly (4/Yr)</option>
                            <option value="12">Monthly (12/Yr)</option>
                            <option value="365">Daily (365/Yr)</option>
                        </select>
                    </div>

                    <button onClick={calculateCompound} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Growth
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-green-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8">
                            <div>
                                <h3 className="text-green-800 font-bold uppercase tracking-widest text-sm mb-2">Total Future Value</h3>
                                <div className="text-5xl lg:text-6xl font-black text-gray-900 border-b border-green-100 pb-4 tracking-tight">
                                    ${result.futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 text-left">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                                    <h4 className="text-gray-500 font-bold uppercase text-[11px] tracking-wider">Total Principal</h4>
                                    <p className="text-xl font-bold text-gray-800">${result.totalContributions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex justify-between items-center shadow-inner">
                                    <h4 className="text-green-800 font-bold uppercase text-[11px] tracking-wider">Total Interest Earned</h4>
                                    <p className="text-xl font-black text-green-600">+${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-green-400 font-medium">
                            Set your principal, interest, and monthly additions to watch your wealth compound!
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Compound Interest Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
