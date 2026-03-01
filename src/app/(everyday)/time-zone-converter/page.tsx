'use client';

import { useState, useEffect } from 'react';

// Common time zones mapping
const TIME_ZONES = [
    { label: 'UTC / GMT (Coordinated Universal Time)', value: 'UTC' },
    { label: 'EST / EDT (Eastern Time - US/Canada)', value: 'America/New_York' },
    { label: 'CST / CDT (Central Time - US/Canada)', value: 'America/Chicago' },
    { label: 'MST / MDT (Mountain Time - US/Canada)', value: 'America/Denver' },
    { label: 'PST / PDT (Pacific Time - US/Canada)', value: 'America/Los_Angeles' },
    { label: 'HST (Hawaii Standard Time)', value: 'Pacific/Honolulu' },
    { label: 'AKST / AKDT (Alaska Time)', value: 'America/Anchorage' },
    { label: 'BST / GMT (London)', value: 'Europe/London' },
    { label: 'CET / CEST (Central European Time)', value: 'Europe/Paris' },
    { label: 'EET / EEST (Eastern European Time)', value: 'Europe/Helsinki' },
    { label: 'MSK (Moscow Standard Time)', value: 'Europe/Moscow' },
    { label: 'IST (India Standard Time)', value: 'Asia/Kolkata' },
    { label: 'PKT (Pakistan Standard Time)', value: 'Asia/Karachi' },
    { label: 'CST (China Standard Time)', value: 'Asia/Shanghai' },
    { label: 'JST (Japan Standard Time)', value: 'Asia/Tokyo' },
    { label: 'KST (Korea Standard Time)', value: 'Asia/Seoul' },
    { label: 'AEST / AEDT (Australian Eastern Time)', value: 'Australia/Sydney' },
    { label: 'AWST (Australian Western Time)', value: 'Australia/Perth' },
    { label: 'NZST / NZDT (New Zealand Time)', value: 'Pacific/Auckland' },
    { label: 'BRT / BRST (Brasília Time)', value: 'America/Sao_Paulo' },
];

export default function TimeZoneConverter() {
    const [sourceDate, setSourceDate] = useState('');
    const [sourceTime, setSourceTime] = useState('');
    const [sourceZone, setSourceZone] = useState('America/New_York');
    const [targetZone, setTargetZone] = useState('Asia/Kolkata');
    const [result, setResult] = useState<{ date: string, time: string, diff: string } | null>(null);

    // Initialize with current local time
    useEffect(() => {
        const now = new Date();
        const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // If localTz is one of our options, you could use it. Otherwise fallback to Eastern.
        if (TIME_ZONES.some(tz => tz.value === localTz)) {
            setSourceZone(localTz);
        }

        // Format YYYY-MM-DD
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        setSourceDate(`${year}-${month}-${day}`);

        // Format HH:MM
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setSourceTime(`${hours}:${minutes}`);
    }, []);

    useEffect(() => {
        if (!sourceDate || !sourceTime || !sourceZone || !targetZone) {
            setResult(null);
            return;
        }

        try {
            // Create a date object interpreting the input as if it were in the source timezone
            // Unfortunately, JS Date assumes local. We must build a string that forces the perspective.

            // 1. Get current date strings for both zones from the exact same instant to find offset difference

            // Reconstruct the requested moment as UTC by offsetting it manually
            // An easier approach for modern browsers: use Intl to format a fixed date in both zones and find diff

            const dateObj = new Date(); // anchor date

            const getOffsetString = (tz: string) => {
                // Formatting to capture the GMT offset: e.g. "GMT-0400" or "GMT+0530"
                const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'longOffset', timeZone: tz }).formatToParts(dateObj);
                const offsetPart = parts.find(p => p.type === 'timeZoneName')?.value;
                if (!offsetPart) return 0;

                // Parse "GMT-04:00" or "GMT+05:30" or "GMT"
                if (offsetPart === 'GMT') return 0;
                const sign = offsetPart.includes('+') ? 1 : -1;
                const timeStr = offsetPart.replace('GMT+', '').replace('GMT-', ''); // "04:00" or "05:30"
                const [h, m] = timeStr.split(':').map(Number);
                return sign * (h * 60 + (m || 0)); // total minutes offset
            };

            const sourceOffsetMin = getOffsetString(sourceZone);
            const targetOffsetMin = getOffsetString(targetZone);

            // Parse input time precisely
            const [y, m, d] = sourceDate.split('-').map(Number);
            const [hrs, mins] = sourceTime.split(':').map(Number);

            // Create a UTC date representing the absolute moment in time
            // If the local entry was at sourceOffsetMin, then UTC is entry - sourceOffsetMin
            // We'll use Date.UTC to build the nominal date, then subtract the source offset to get pure UTC
            const absoluteUTC = new Date(Date.UTC(y, m - 1, d, hrs, mins) - (sourceOffsetMin * 60000));

            // Now, format that absoluteUTC moment into the target timezone
            const targetFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: targetZone,
                year: 'numeric', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit', second: '2-digit',
                hour12: true,
                timeZoneName: 'short'
            });

            // Target parts
            const parts = targetFormatter.formatToParts(absoluteUTC);
            const ttMonth = parts.find(p => p.type === 'month')?.value;
            const ttDay = parts.find(p => p.type === 'day')?.value;
            const ttYear = parts.find(p => p.type === 'year')?.value;
            const ttHour = parts.find(p => p.type === 'hour')?.value;
            const ttMin = parts.find(p => p.type === 'minute')?.value;
            const ttAmpm = parts.find(p => p.type === 'dayPeriod')?.value;
            const ttTzn = parts.find(p => p.type === 'timeZoneName')?.value;

            // Calculate Difference
            const diffMin = targetOffsetMin - sourceOffsetMin;
            const diffHours = Math.floor(Math.abs(diffMin) / 60);
            const diffRemMin = Math.abs(diffMin) % 60;
            const diffSign = diffMin >= 0 ? '+' : '-';
            const diffString = diffMin === 0
                ? 'Same Time'
                : `${diffSign}${diffHours}h ${diffRemMin > 0 ? diffRemMin + 'm' : ''} ${diffMin > 0 ? 'ahead' : 'behind'}`;

            setResult({
                date: `${ttMonth} ${ttDay}, ${ttYear}`,
                time: `${ttHour}:${ttMin} ${ttAmpm} ${ttTzn}`,
                diff: diffString
            });

        } catch (e) {
            console.error(e);
            setResult(null);
        }

    }, [sourceDate, sourceTime, sourceZone, targetZone]);

    const handleSwap = () => {
        setSourceZone(targetZone);
        setTargetZone(sourceZone);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800 flex items-center justify-center">
                    <span className="mr-3">🌍</span> Time Zone Converter
                </h1>
                <p className="text-slate-600 text-lg">
                    Instantly convert a specific date and time across global time zones.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Inputs */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-4">Source Time</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wide">Time Zone</label>
                                <select
                                    value={sourceZone}
                                    onChange={(e) => setSourceZone(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 p-3 shadow-sm focus:border-blue-500 font-semibold bg-slate-50 text-sm truncate"
                                >
                                    {TIME_ZONES.map(tz => <option key={`src-${tz.value}`} value={tz.value}>{tz.label}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wide">Date</label>
                                    <input
                                        type="date"
                                        value={sourceDate}
                                        onChange={(e) => setSourceDate(e.target.value)}
                                        className="w-full rounded-xl border-slate-200 p-3 shadow-sm focus:border-blue-500 font-bold bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wide">Time</label>
                                    <input
                                        type="time"
                                        value={sourceTime}
                                        onChange={(e) => setSourceTime(e.target.value)}
                                        className="w-full rounded-xl border-slate-200 p-3 shadow-sm focus:border-blue-500 font-bold bg-slate-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center -my-2 relative z-10">
                        <button
                            onClick={handleSwap}
                            className="bg-slate-800 hover:bg-slate-900 text-white rounded-full p-3 shadow-lg transform transition hover:scale-110 active:scale-95 border-4 border-slate-50"
                            title="Swap Zones"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-4">Target Zone</h3>

                        <div>
                            <select
                                value={targetZone}
                                onChange={(e) => setTargetZone(e.target.value)}
                                className="w-full rounded-xl border-slate-200 p-3 shadow-sm focus:border-emerald-500 font-semibold bg-slate-50 text-sm truncate"
                            >
                                {TIME_ZONES.map(tz => <option key={`tgt-${tz.value}`} value={tz.value}>{tz.label}</option>)}
                            </select>
                        </div>
                    </div>

                </div>

                {/* Output */}
                <div className="lg:col-span-3">
                    {result ? (
                        <div className="h-full bg-slate-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-slate-800">
                            {/* Decorative element map dots */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                            <div className="relative z-10 text-center">
                                <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-widest text-[10px] mb-8 border border-emerald-500/30">
                                    Target Local Time
                                </div>

                                <div className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-lg">
                                    {result.time.split(' ').slice(0, 2).join(' ')}
                                </div>
                                <div className="text-emerald-400 font-bold text-lg md:text-xl tracking-wide mb-8">
                                    {result.time.split(' ').pop()} • {result.date}
                                </div>

                                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 inline-block px-8 py-3">
                                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time Difference</div>
                                    <div className="text-lg font-bold font-mono text-slate-200">
                                        {result.diff}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>Select dates and timezones to calculate conversion.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Time Zone Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
