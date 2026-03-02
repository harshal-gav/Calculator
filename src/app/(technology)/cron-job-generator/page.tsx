'use client';

import { useState } from 'react';

export default function CronJobGenerator() {
    const [minute, setMinute] = useState('*');
    const [hour, setHour] = useState('*');
    const [dom, setDom] = useState('*');
    const [month, setMonth] = useState('*');
    const [dow, setDow] = useState('*');

    const cronString = `${minute} ${hour} ${dom} ${month} ${dow}`;

    // Extremely basic human readable parser for simple cron formats
    const generateDescription = () => {
        if (cronString === '* * * * *') return 'Every minute, all the time.';
        if (cronString === '0 * * * *') return 'At the start of every hour.';
        if (cronString === '0 0 * * *') return 'Every day at midnight.';
        if (cronString === '0 0 * * 0') return 'Every Sunday at midnight.';
        if (cronString === '0 0 1 * *') return 'At Midnight on the 1st of every month.';

        let desc = 'Runs';

        if (minute !== '*') desc += ` at minute ${minute}`;
        if (hour !== '*') desc += ` past hour ${hour}`;
        if (dom !== '*') desc += ` on day of month ${dom}`;
        if (month !== '*') desc += ` in month ${month}`;
        if (dow !== '*') desc += ` on day of week ${dow}`;

        if (desc === 'Runs') return 'Every minute of every day (Standard Default)';

        return desc + '.';
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cronString).then(() => {
            alert('Cron expression copied to clipboard!');
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 flex items-center justify-center font-mono">
                    <span className="mr-3">⏱</span> Cron Job Generator
                </h1>
                <p className="text-slate-700 text-lg max-w-2xl mx-auto">
                    Quickly generate and understand cron schedule expressions for your tasks.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">Minute</label>
                        <input
                            type="text" value={minute} onChange={(e) => setMinute(e.target.value)}
                            className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
                            placeholder="*"
                        />
                        <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">(0-59) or *</span>
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">Hour</label>
                        <input
                            type="text" value={hour} onChange={(e) => setHour(e.target.value)}
                            className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
                            placeholder="*"
                        />
                        <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">(0-23) or *</span>
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">Day(Month)</label>
                        <input
                            type="text" value={dom} onChange={(e) => setDom(e.target.value)}
                            className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
                            placeholder="*"
                        />
                        <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">(1-31) or *</span>
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">Month</label>
                        <input
                            type="text" value={month} onChange={(e) => setMonth(e.target.value)}
                            className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
                            placeholder="*"
                        />
                        <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">(1-12) or *</span>
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">Day(Week)</label>
                        <input
                            type="text" value={dow} onChange={(e) => setDow(e.target.value)}
                            className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
                            placeholder="*"
                        />
                        <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">(0-6) [Sun-Sat]</span>
                    </div>

                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Quick Presets</h3>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => { setMinute('*'); setHour('*'); setDom('*'); setMonth('*'); setDow('*') }} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm">Every Minute</button>
                        <button onClick={() => { setMinute('0'); setHour('*'); setDom('*'); setMonth('*'); setDow('*') }} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm">Every Hour</button>
                        <button onClick={() => { setMinute('0'); setHour('0'); setDom('*'); setMonth('*'); setDow('*') }} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm">Every Midnight</button>
                        <button onClick={() => { setMinute('0'); setHour('0'); setDom('*'); setMonth('*'); setDow('0') }} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm">Every Sunday</button>
                        <button onClick={() => { setMinute('*/15'); setHour('*'); setDom('*'); setMonth('*'); setDow('*') }} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm">Every 15 Mins</button>
                    </div>
                </div>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                <h2 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Output Expression</h2>

                <div className="z-10 relative mb-8 w-full max-w-2xl group">
                    <div className="flex bg-slate-800 rounded-xl overflow-hidden border border-slate-600 shadow-inner group-hover:border-slate-400 transition-colors">
                        <div className="flex-1 p-6 flex justify-center items-center">
                            <span className="font-mono font-black text-4xl md:text-6xl text-slate-200 tracking-widest drop-shadow-md">{cronString}</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="bg-slate-700 hover:bg-slate-600 border-l border-slate-600 text-white font-bold px-6 flex flex-col items-center justify-center transition-colors"
                        >
                            <span className="text-2xl mb-1">📋</span>
                            <span className="text-[10px] uppercase tracking-widest">Copy</span>
                        </button>
                    </div>
                </div>

                <div className="bg-black/30 w-full max-w-2xl rounded-xl border border-white/5 p-6 flex flex-col items-center text-center z-10">
                    <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold mb-3">Friendly Description</span>
                    <span className="text-slate-300 font-medium text-lg italic leading-relaxed">
                        "{generateDescription()}"
                    </span>
                    <span className="text-white/20 text-xs mt-4">For fully precise timing, ensure your system timezone matches your expectations.</span>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Cron Job Generator", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
