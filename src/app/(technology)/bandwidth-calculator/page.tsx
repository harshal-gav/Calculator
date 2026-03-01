'use client';

import { useState, useEffect } from 'react';

const fileUnits = [
    { id: 'b', name: 'Bits (b)', multiplier: 1 },
    { id: 'B', name: 'Bytes (B)', multiplier: 8 },
    { id: 'KB', name: 'Kilobytes (KB)', multiplier: 8 * 1024 },
    { id: 'MB', name: 'Megabytes (MB)', multiplier: 8 * 1024 * 1024 },
    { id: 'GB', name: 'Gigabytes (GB)', multiplier: 8 * 1024 * 1024 * 1024 },
    { id: 'TB', name: 'Terabytes (TB)', multiplier: 8 * 1024 * 1024 * 1024 * 1024 }
];

const speedUnits = [
    { id: 'bps', name: 'Bits per second (bps)', multiplier: 1 },
    { id: 'Kbps', name: 'Kilobits per sec (Kbps)', multiplier: 1000 },
    { id: 'Mbps', name: 'Megabits per sec (Mbps)', multiplier: 1000 * 1000 },
    { id: 'Gbps', name: 'Gigabits per sec (Gbps)', multiplier: 1000 * 1000 * 1000 },
    { id: 'Bps', name: 'Bytes per second (B/s)', multiplier: 8 },
    { id: 'KBps', name: 'Kilobytes per sec (KB/s)', multiplier: 8 * 1024 },
    { id: 'MBps', name: 'Megabytes per sec (MB/s)', multiplier: 8 * 1024 * 1024 }
];

export default function BandwidthCalculator() {
    const [fileSize, setFileSize] = useState('1');
    const [fileUnit, setFileUnit] = useState('GB');

    const [speed, setSpeed] = useState('100');
    const [speedUnit, setSpeedUnit] = useState('Mbps');

    const [result, setResult] = useState({
        seconds: 0,
        formattedTime: '',
        isValid: true
    });

    useEffect(() => {
        calculateTime();
    }, [fileSize, fileUnit, speed, speedUnit]);

    const calculateTime = () => {
        const size = parseFloat(fileSize);
        const spd = parseFloat(speed);

        if (isNaN(size) || isNaN(spd) || size < 0 || spd <= 0) {
            setResult({ seconds: 0, formattedTime: '', isValid: false });
            return;
        }

        const sizeInBits = size * (fileUnits.find(u => u.id === fileUnit)?.multiplier || 1);
        const speedInBitsPerSec = spd * (speedUnits.find(u => u.id === speedUnit)?.multiplier || 1);

        const totalSeconds = sizeInBits / speedInBitsPerSec;

        let formattedTime = '';
        if (totalSeconds < 60) {
            formattedTime = `${totalSeconds.toFixed(1)} seconds`;
        } else if (totalSeconds < 3600) {
            const minutes = Math.floor(totalSeconds / 60);
            const secs = Math.floor(totalSeconds % 60);
            formattedTime = `${minutes} min ${secs} sec`;
        } else if (totalSeconds < 86400) {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            formattedTime = `${hours} hr ${minutes} min`;
        } else {
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            formattedTime = `${days} days ${hours} hr`;
        }

        setResult({
            seconds: totalSeconds,
            formattedTime,
            isValid: true
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-700 border-b pb-4 flex items-center">
                <span className="mr-3">⚡</span> Bandwidth Calculator
            </h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate EXACTLY how long it will take to download or upload a file based on your internet connection speed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">File Size</label>
                        <div className="flex">
                            <input
                                type="number" min="0" step="any"
                                value={fileSize}
                                onChange={(e) => setFileSize(e.target.value)}
                                className="w-full rounded-l-xl border-gray-300 p-3 shadow-sm focus:border-indigo-500 font-bold text-xl text-gray-800"
                            />
                            <select
                                value={fileUnit}
                                onChange={(e) => setFileUnit(e.target.value)}
                                className="rounded-r-xl border-y border-r border-gray-300 p-3 shadow-sm focus:border-indigo-500 font-bold bg-white text-gray-700"
                            >
                                {fileUnits.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Internet Speed</label>
                        <div className="flex">
                            <input
                                type="number" min="0" step="any"
                                value={speed}
                                onChange={(e) => setSpeed(e.target.value)}
                                className="w-full rounded-l-xl border-gray-300 p-3 shadow-sm focus:border-indigo-500 font-bold text-xl text-gray-800"
                            />
                            <select
                                value={speedUnit}
                                onChange={(e) => setSpeedUnit(e.target.value)}
                                className="rounded-r-xl border-y border-r border-gray-300 p-3 shadow-sm focus:border-indigo-500 font-bold bg-white text-gray-700"
                            >
                                {speedUnits.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 pl-1">Note: ISPs advertise speed in Megabits (Mbps), not Megabytes (MB/s).</p>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-indigo-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center text-center">
                    {result.isValid ? (
                        <div className="p-8 h-full flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
                            {/* Animated background waves */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                                <div className="w-[150%] h-[150%] border-[20px] border-white rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-xs mb-4">Estimated Transfer Time</h3>
                                <div className="text-4xl sm:text-5xl font-black drop-shadow-md mb-2 leading-tight">
                                    {result.formattedTime}
                                </div>
                                <div className="text-indigo-300 font-medium text-sm mt-4">
                                    {result.seconds > 60 && `(${result.seconds.toFixed(1)} total seconds)`}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 h-full flex flex-col justify-center bg-gray-50 text-gray-500">
                            Enter valid numbers greater than zero.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Bandwidth Calculator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
