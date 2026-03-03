'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function BACalculator() {
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('160');
    const [weightUnit, setWeightUnit] = useState('lbs');

    // Drink Inputs
    const [beerCans, setBeerCans] = useState('0'); // 12oz, ~5%
    const [glassesWine, setGlassesWine] = useState('0'); // 5oz, ~12%
    const [shotsLiquor, setShotsLiquor] = useState('0'); // 1.5oz, ~40%

    const [hoursSinceStart, setHoursSinceStart] = useState('1');

    const w = parseFloat(weight);
    const hours = parseFloat(hoursSinceStart);
    const beer = parseFloat(beerCans) || 0;
    const wine = parseFloat(glassesWine) || 0;
    const shots = parseFloat(shotsLiquor) || 0;

    let weightInLbs = w;
    if (weightUnit === 'kg') {
        weightInLbs = w * 2.20462;
    }

    let bac = 0;
    let timeToSober = 0;
    let isValid = false;

    if (!isNaN(weightInLbs) && !isNaN(hours) && weightInLbs > 0 && hours >= 0 && (beer > 0 || wine > 0 || shots > 0)) {
        isValid = true;

        // Widmark Formula for BAC
        // BAC = (Alcohol Consumed in grams / (Body weight in grams * r)) * 100 - (0.015 * hours)
        // Alternative standard US Widmark: BAC = (A x 5.14 / W x r) - .015 x H
        // A = total fluid ounces of alcohol consumed multiplied by the alcohol percentage

        const alcFromBeer = beer * 12 * 0.05;
        const alcFromWine = wine * 5 * 0.12;
        const alcFromShots = shots * 1.5 * 0.40;
        const totalAlcOunces = alcFromBeer + alcFromWine + alcFromShots;

        // r = gender constant
        const r = gender === 'male' ? 0.73 : 0.66;

        const baseBac = (totalAlcOunces * 5.14) / (weightInLbs * r);
        bac = baseBac - (0.015 * hours);

        if (bac < 0) bac = 0;

        // Assuming metabolism rate of ~0.015 BAC / hr
        timeToSober = bac / 0.015;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-sky-100">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center">
                    <span className="mr-3">🍻</span> Blood Alcohol Calculator
                </h1>
                <p className="text-sky-700 text-lg max-w-2xl mx-auto">
                    Estimate your Blood Alcohol Content (BAC) based on the standard Widmark formula.
                </p>
                <div className="mt-4 inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full border border-rose-200 uppercase tracking-widest">
                    For Educational Purposes Only. Never Drink & Drive.
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-sky-50/50 p-6 rounded-2xl border border-sky-100 shadow-inner">
                    <div className="flex justify-between items-center border-b border-sky-200 pb-2 mb-4">
                        <h3 className="font-bold text-sky-900 uppercase tracking-wider text-sm">Your Body</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-sky-800 mb-2 uppercase tracking-wide">Biological Sex</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full rounded-xl border-sky-200 p-3 shadow-sm focus:border-sky-500 font-semibold bg-white cursor-pointer"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-sky-800 mb-2 uppercase tracking-wide">Weight</label>
                            <div className="flex">
                                <input
                                    type="number" min="50" step="1"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full rounded-l-xl border-sky-200 p-3 shadow-sm focus:border-sky-500 font-bold"
                                    placeholder="160"
                                />
                                <select
                                    value={weightUnit}
                                    onChange={(e) => setWeightUnit(e.target.value)}
                                    className="border-y border-r border-sky-200 bg-sky-100 text-sky-800 font-bold px-2 rounded-r-xl cursor-pointer"
                                >
                                    <option value="lbs">lbs</option>
                                    <option value="kg">kg</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-sky-200 pb-2 mb-4 pt-4">
                        <h3 className="font-bold text-sky-900 uppercase tracking-wider text-sm">Drinks Consumed</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-sky-200 text-center shadow-sm">
                            <div className="text-2xl mb-2">🍺</div>
                            <label className="block text-[10px] font-bold text-sky-700 uppercase mb-2">Beer<br />(12oz, ~5%)</label>
                            <input
                                type="number" min="0" step="1"
                                value={beerCans}
                                onChange={(e) => setBeerCans(e.target.value)}
                                className="w-full rounded border-sky-200 p-2 text-center font-bold"
                            />
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-sky-200 text-center shadow-sm">
                            <div className="text-2xl mb-2">🍷</div>
                            <label className="block text-[10px] font-bold text-sky-700 uppercase mb-2">Wine<br />(5oz, ~12%)</label>
                            <input
                                type="number" min="0" step="1"
                                value={glassesWine}
                                onChange={(e) => setGlassesWine(e.target.value)}
                                className="w-full rounded border-sky-200 p-2 text-center font-bold"
                            />
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-sky-200 text-center shadow-sm">
                            <div className="text-2xl mb-2">🥃</div>
                            <label className="block text-[10px] font-bold text-sky-700 uppercase mb-2">Liquor<br />(1.5oz, ~40%)</label>
                            <input
                                type="number" min="0" step="1"
                                value={shotsLiquor}
                                onChange={(e) => setShotsLiquor(e.target.value)}
                                className="w-full rounded border-sky-200 p-2 text-center font-bold"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-sky-200 pb-2 mb-4 pt-4">
                        <h3 className="font-bold text-sky-900 uppercase tracking-wider text-sm">Timeline</h3>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-sky-800 mb-2 uppercase tracking-wide">Hours since first drink</label>
                        <input
                            type="number" min="0" step="0.5"
                            value={hoursSinceStart}
                            onChange={(e) => setHoursSinceStart(e.target.value)}
                            className="w-full rounded-xl border-sky-200 p-3 shadow-sm focus:border-sky-500 font-bold bg-white"
                        />
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {isValid ? (
                        <div className={`h-full rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border ${bac >= 0.08 ? 'bg-gradient-to-br from-rose-700 to-rose-900 border-rose-600' : (bac > 0 ? 'bg-gradient-to-br from-amber-600 to-amber-800 border-amber-500' : 'bg-gradient-to-br from-sky-600 to-sky-800 border-sky-500')}`}>
                            <div className="relative z-10 text-center">
                                <h2 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-6 drop-shadow-sm border-b border-white/20 pb-4">Estimated BAC %</h2>

                                <div className="flex flex-col items-center justify-center space-y-2 mb-8">
                                    <div className={`text-6xl font-black tracking-tighter text-white bg-black/20 rounded-2xl px-6 py-4 shadow-inner border border-white/10 ${bac >= 0.08 ? 'animate-pulse' : ''}`}>
                                        {bac.toFixed(3)}<span className="text-2xl ml-1">%</span>
                                    </div>
                                </div>

                                <div className="bg-black/20 rounded-xl p-4 border border-white/10 backdrop-blur-sm shadow-inner mb-6">
                                    <div className="text-[10px] text-white/70 uppercase font-bold mb-1 tracking-wider">Estimated Time to Sober (0.00%)</div>
                                    <div className="text-xl font-bold text-white flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        {timeToSober < 1 ? '< 1 hour' : `${timeToSober.toFixed(1)} hours`}
                                    </div>
                                </div>

                                <div className="text-xs text-white/80 font-medium px-2 py-4 bg-white/10 rounded-lg border border-white/10">
                                    {bac >= 0.08 ? (
                                        <span className="text-rose-200 font-bold">⚠️ Legally Intoxicated in most areas (≥ 0.08%). Do not drive.</span>
                                    ) : (bac > 0.04 ? (
                                        <span className="text-amber-200 font-bold">Impaired driving skills. Use extreme caution.</span>
                                    ) : (bac > 0 ? (
                                        <span className="text-sky-200 font-bold">Mild impairment.</span>
                                    ) : (
                                        <span>You are completely sober based on the timeline.</span>
                                    )))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50 flex flex-col items-center justify-center p-8 text-center">
                            <div className="text-6xl mb-4 opacity-50 filter saturate-50">⚖️</div>
                            <h3 className="text-sky-900 font-bold text-xl mb-2">Calculate BAC</h3>
                            <p className="text-sky-600 text-sm">Input your weight and the number of drinks consumed to see your estimate.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Blood Alcohol Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication" }) }} />

            <div className="mt-8 text-left">
                <CalculatorSEO
                    title="BAC & Time-to-Sober Calculator"
                    whatIsIt={
                        <p>The <strong>Blood Alcohol Calculator (BAC)</strong> estimates the percentage of alcohol currently active in your bloodstream. By cross-referencing your body weight, biological sex, the number of standard drinks you've consumed, and the time elapsed since your first sip, it provides a mathematical estimation of your current intoxication level and predicts how many hours it will take for your liver to metabolize the alcohol back to 0.00%.</p>
                    }
                    formula={
                        <>
                            <p>This tool utilizes the internationally recognized <strong>Widmark Formula</strong>, developed by Swedish physician Erik Widmark in the 1920s. It mathematically factors in the volume of alcohol, human water-distribution constants, and a standard metabolic elimination rate.</p>
                            <div className="bg-sky-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-sky-100 text-sky-900">
                                <p><strong>BAC = [ (Alcohol Ounces × 5.14) ÷ (Weight in lbs × r) ] - (0.015 × Hours)</strong></p>
                                <p className="mt-2 text-xs italic text-sky-700">Where 'r' is the gender constant (0.73 for men, 0.66 for women).<br />0.015 calculates the average hourly rate the liver destroys alcohol.</p>
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Let's map out a scenario for a 160 lb man who has consumed 4 beers over the course of 2 hours watching a football game.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-sky-800">
                                <li><strong>The Drinks:</strong> 4 standard beers (12oz each at 5% alcohol) = 2.4 ounces of pure ethanol.</li>
                                <li><strong>The Widmark Calculation:</strong> (2.4 × 5.14) ÷ (160 × 0.73) = 0.105 (This is his theoretical peak BAC if he drank them all instantly).</li>
                                <li><strong>The Time Decay:</strong> Over 2 hours, his liver has successfully destroyed (2 × 0.015) = 0.030 of that BAC.</li>
                                <li><strong>The Result:</strong> 0.105 - 0.030 = <strong>0.075% BAC</strong>. He is hovering right underneath the legal limit.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-sky-800">
                            <li><strong>Morning-After Checks:</strong> Individuals who drank heavily until 2 AM using the "Time to Sober" output to realize that even after sleeping for 6 hours, they may still mathematically have a BAC of 0.05% at 8 AM and should not drive to work yet.</li>
                            <li><strong>Educational Awareness:</strong> Demonstrating to smaller individuals (e.g., a 110 lb woman) how aggressively their BAC spikes after just 2 glasses of wine compared to a 220 lb man, highlighting physiological differences in alcohol tolerance.</li>
                            <li><strong>Party Pacing:</strong> Utilizing the tool to understand how long it physically takes the liver to process 1 drink (roughly 1 to 1.5 hours), teaching the user to literally "pace themselves" to avoid stacking alcohol faster than the body can eliminate it.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Can this prove I am safe to drive?",
                            answer: "ABSOLUTELY NOT. The only way to know your true BAC is via a calibrated police breathalyzer or a blood test. This tool purely provides a statistical mathematical AVERAGE. Your actual BAC may be significantly higher based on genetics, stomach food content, medications, and metabolism. Treat this as an educational estimate, never a legal defense."
                        },
                        {
                            question: "Why do women naturally have a higher BAC than men after the same drinks?",
                            answer: "Biological women fundamentally possess less body water and more body fat per pound compared to biological men. Since alcohol is highly water-soluble, it becomes more 'concentrated' in a woman's lower volume of total body water, causing a higher BAC spike."
                        },
                        {
                            question: "Can I drink coffee or take a cold shower to lower my BAC faster?",
                            answer: "No. This is a dangerous myth. Coffee contains caffeine, which might make you feel 'wide awake', but you are now simply a 'wide awake drunk person'. Your liver enzymes process alcohol at a rigid, fixed rate (~0.015% per hour). Only TIME can lower your BAC."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Blood Volume Calculator", path: "/blood-volume-calculator", desc: "Estimate the total liters of blood the alcohol is diluting into." },
                        { name: "Blood Pressure Calculator", path: "/blood-pressure-calculator", desc: "Track cardiovascular health metrics." },
                        { name: "Age Calculator", path: "/age-calculator", desc: "Easily determine exactly how many days old you are." }
                    ]}
                />
            </div>
        </div>
    );
}
