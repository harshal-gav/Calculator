'use client';

import { useState, useEffect } from 'react';

const zodiacData = [
    { sign: 'Capricorn', emoji: '♑', element: 'Earth', range: 'Dec 22 - Jan 19', bg: 'from-stone-600 to-stone-800' },
    { sign: 'Aquarius', emoji: '♒', element: 'Air', range: 'Jan 20 - Feb 18', bg: 'from-cyan-500 to-cyan-700' },
    { sign: 'Pisces', emoji: '♓', element: 'Water', range: 'Feb 19 - Mar 20', bg: 'from-teal-400 to-teal-600' },
    { sign: 'Aries', emoji: '♈', element: 'Fire', range: 'Mar 21 - Apr 19', bg: 'from-red-500 to-red-700' },
    { sign: 'Taurus', emoji: '♉', element: 'Earth', range: 'Apr 20 - May 20', bg: 'from-green-600 to-green-800' },
    { sign: 'Gemini', emoji: '♊', element: 'Air', range: 'May 21 - Jun 20', bg: 'from-yellow-400 to-yellow-600' },
    { sign: 'Cancer', emoji: '♋', element: 'Water', range: 'Jun 21 - Jul 22', bg: 'from-slate-400 to-slate-600' },
    { sign: 'Leo', emoji: '♌', element: 'Fire', range: 'Jul 23 - Aug 22', bg: 'from-orange-400 to-orange-600' },
    { sign: 'Virgo', emoji: '♍', element: 'Earth', range: 'Aug 23 - Sep 22', bg: 'from-lime-600 to-lime-800' },
    { sign: 'Libra', emoji: '♎', element: 'Air', range: 'Sep 23 - Oct 22', bg: 'from-pink-400 to-pink-600' },
    { sign: 'Scorpio', emoji: '♏', element: 'Water', range: 'Oct 23 - Nov 21', bg: 'from-violet-600 to-violet-900' },
    { sign: 'Sagittarius', emoji: '♐', element: 'Fire', range: 'Nov 22 - Dec 21', bg: 'from-purple-500 to-purple-700' }
];

export default function ZodiacCalculator() {
    const today = new Date().toISOString().split('T')[0];
    const [birthDate, setBirthDate] = useState('1990-01-01');

    const [result, setResult] = useState<{ sign: string; emoji: string; element: string; range: string; bg: string } | null>(null);

    useEffect(() => {
        calculateZodiac();
    }, [birthDate]);

    const calculateZodiac = () => {
        if (!birthDate) {
            setResult(null);
            return;
        }

        const date = new Date(birthDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // 1-12

        let zodiacIndex = -1;

        if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) zodiacIndex = 0; // Capricorn
        else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacIndex = 1; // Aquarius
        else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) zodiacIndex = 2; // Pisces
        else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacIndex = 3; // Aries
        else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacIndex = 4; // Taurus
        else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacIndex = 5; // Gemini
        else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacIndex = 6; // Cancer
        else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacIndex = 7; // Leo
        else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacIndex = 8; // Virgo
        else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacIndex = 9; // Libra
        else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacIndex = 10; // Scorpio
        else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacIndex = 11; // Sagittarius

        if (zodiacIndex !== -1) {
            setResult(zodiacData[zodiacIndex]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-black/95 rounded-xl shadow-2xl border border-gray-800">
            <h1 className="text-4xl font-extrabold mb-4 text-purple-400 border-b border-gray-800 pb-4 flex items-center">
                <span className="mr-3">✨</span> Zodiac Sign Calculator
            </h1>
            <p className="mb-8 text-gray-400 text-lg">
                Enter your birth date to instantly discover your astrological sun sign and ruling element.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800 relative z-10 flex flex-col justify-center text-center">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Select Your Birth Date</label>
                        <input
                            type="date"
                            max={today}
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full rounded-xl border border-gray-700 bg-black p-4 shadow-inner focus:border-purple-500 focus:ring focus:ring-purple-500/20 font-bold text-xl text-center text-gray-100 placeholder-gray-600"
                        />
                    </div>

                    <div className="mt-8 text-xs text-gray-600">
                        Astrology is an ancient practice that correlates the position of celestial bodies with human traits and events.
                    </div>
                </div>

                {/* Results Screen */}
                <div className={`rounded-2xl border-2 overflow-hidden shadow-2xl flex flex-col justify-center text-white relative transition-all duration-700 ${result ? `bg-gradient-to-br ${result.bg} border-white/20` : 'bg-gray-900 border-gray-800'}`}>

                    {/* Stars background effect */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0))', backgroundSize: '200px 200px' }}></div>

                    {result ? (
                        <div className="p-8 text-center z-10 animate-fade-in">
                            <h3 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-2">Your Sun Sign Is</h3>

                            <div className="text-8xl my-6 drop-shadow-xl animate-bounce-slow">
                                {result.emoji}
                            </div>

                            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                                <h2 className="text-4xl font-black mb-1 drop-shadow-lg tracking-wide">{result.sign}</h2>
                                <p className="text-white/80 font-medium tracking-widest uppercase text-xs mb-3">{result.range}</p>
                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {result.element} Element
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center h-full flex flex-col items-center justify-center text-gray-600">
                            <div className="text-6xl mb-4 opacity-50">🔭</div>
                            <p className="font-bold tracking-widest uppercase text-sm">Waiting for stars to align...</p>
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Zodiac Sign Calculator", "operatingSystem": "All", "applicationCategory": "EntertainmentApplication" }) }} />
        </div>
    );
}
