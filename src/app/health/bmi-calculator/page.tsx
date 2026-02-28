'use client';

import { useState } from 'react';
import AdSpace from '@/components/AdSpace';

export default function BMICalculator() {
    const [age, setAge] = useState('25');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('175');
    const [weight, setWeight] = useState('70');
    const [bmi, setBmi] = useState<number | null>(null);

    const calculateBMI = () => {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);
        if (h > 0 && w > 0) {
            setBmi(w / (h * h));
        }
    };

    const getCategory = (b: number) => {
        if (b < 16) return { label: 'Severe Thinness', color: 'text-red-600', bg: 'bg-red-100' };
        if (b < 17) return { label: 'Moderate Thinness', color: 'text-orange-600', bg: 'bg-orange-100' };
        if (b < 18.5) return { label: 'Mild Thinness', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        if (b < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
        if (b < 30) return { label: 'Overweight', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        if (b < 35) return { label: 'Obese Class I', color: 'text-orange-600', bg: 'bg-orange-100' };
        if (b < 40) return { label: 'Obese Class II', color: 'text-red-500', bg: 'bg-red-100' };
        return { label: 'Obese Class III', color: 'text-red-700', bg: 'bg-red-200' };
    };

    const clearForm = () => {
        setAge('25');
        setGender('male');
        setHeight('175');
        setWeight('70');
        setBmi(null);
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">BMI Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                The Body Mass Index (BMI) Calculator can be used to calculate BMI value and corresponding weight status while taking age into consideration.
            </p>

            <AdSpace slot="bmi-calc-top" format="auto" className="mb-8 rounded-lg overflow-hidden" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Input Section */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Age (ages 2 - 120)</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                                <div className="flex gap-4 mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className="w-4 h-4 text-blue-600" />
                                        <span>Male</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className="w-4 h-4 text-pink-600" />
                                        <span>Female</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                            />
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button
                                onClick={calculateBMI}
                                className="flex-1 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 active:bg-green-800 transition shadow-md"
                            >
                                Calculate
                            </button>
                            <button
                                onClick={clearForm}
                                className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div>
                    {bmi !== null ? (
                        <div className={`p-8 rounded-2xl text-center shadow-inner border transition-all duration-500 ${getCategory(bmi).bg}`}>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Result</h2>
                            <div className="text-5xl sm:text-6xl font-black mb-4">
                                {bmi.toFixed(1)} <span className="text-lg font-normal text-gray-500 align-top">kg/m²</span>
                            </div>
                            <div className={`text-xl sm:text-2xl font-bold uppercase tracking-wider ${getCategory(bmi).color}`}>
                                {getCategory(bmi).label}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center p-8 text-gray-400 text-center">
                            Enter your details and click Calculate to see your results.
                        </div>
                    )}

                    <div className="mt-8">
                        <h3 className="font-bold text-gray-800 mb-4 text-lg">Adult BMI Chart</h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 border-b">Category</th>
                                        <th className="px-4 py-3 border-b text-right">BMI Range (kg/m²)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">Underweight</td>
                                        <td className="px-4 py-3 text-right text-yellow-600">&lt; 18.5</td>
                                    </tr>
                                    <tr className="bg-green-50 hover:bg-green-100 font-semibold">
                                        <td className="px-4 py-3 text-green-800">Normal weight</td>
                                        <td className="px-4 py-3 text-right text-green-700">18.5 - 24.9</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">Overweight</td>
                                        <td className="px-4 py-3 text-right text-yellow-600">25 - 29.9</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-red-600">Obesity</td>
                                        <td className="px-4 py-3 text-right text-red-600">≥ 30</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "BMI Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
