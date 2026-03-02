'use client';

import { useState } from 'react';

export default function JsonToCsv() {
    const [jsonInput, setJsonInput] = useState('[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]');
    const [csvOutput, setCsvOutput] = useState('');
    const [error, setError] = useState('');

    const convertToCsv = () => {
        setError('');
        setCsvOutput('');

        try {
            const parsed = JSON.parse(jsonInput);

            // Ensure array
            const data = Array.isArray(parsed) ? parsed : [parsed];

            if (data.length === 0) {
                setError("JSON Array is empty.");
                return;
            }

            if (typeof data[0] !== 'object' || data[0] === null) {
                setError("JSON must contain an array of objects.");
                return;
            }

            // Extract headers
            const headers = new Set<string>();
            data.forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    Object.keys(item).forEach(key => headers.add(key));
                }
            });

            const headerArray = Array.from(headers);

            const escapeCsv = (val: any) => {
                if (val === null || val === undefined) return '';
                let str = String(val);
                if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                    str = '"' + str.replace(/"/g, '""') + '"';
                }
                return str;
            };

            const csvRows = [];
            csvRows.push(headerArray.map(escapeCsv).join(','));

            data.forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    const row = headerArray.map(header => escapeCsv(item[header]));
                    csvRows.push(row.join(','));
                }
            });

            setCsvOutput(csvRows.join('\n'));

        } catch (e: any) {
            setError(e.message || "Invalid JSON format");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(csvOutput).then(() => {
            alert('CSV copied to clipboard!');
        });
    };

    const downloadCsv = () => {
        const blob = new Blob([csvOutput], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-mono">
                    <span className="mr-3">="{ }"</span> JSON to CSV
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Convert arrays of JSON objects into formatted Comma-Separated Values effortlessly.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Input Column */}
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">Input JSON</label>
                        <button onClick={() => setJsonInput('')} className="text-xs bg-zinc-100 px-3 py-1 rounded font-bold uppercase text-zinc-600 hover:bg-zinc-200">Clear</button>
                    </div>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="w-full flex-1 min-h-[400px] bg-zinc-900 text-emerald-300 rounded-xl border border-zinc-300 shadow-inner p-4 focus:border-emerald-500 font-medium font-mono text-sm transition-all outline-none resize-y"
                        placeholder='[{"col1": "val1", "col2": "val2"}]'
                        spellCheck="false"
                    />

                    <button
                        onClick={convertToCsv}
                        className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Convert to CSV 👉
                    </button>
                    {error && <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">{error}</div>}
                </div>

                {/* Output Column */}
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">Output CSV</label>
                        <div className="flex gap-2">
                            <button onClick={copyToClipboard} disabled={!csvOutput} className="text-xs bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded font-bold uppercase text-emerald-800 hover:bg-emerald-200">Copy</button>
                            <button onClick={downloadCsv} disabled={!csvOutput} className="text-xs bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded font-bold uppercase text-white hover:bg-emerald-700">Download</button>
                        </div>
                    </div>
                    <textarea
                        value={csvOutput}
                        readOnly
                        className="w-full flex-1 min-h-[400px] bg-zinc-50 text-zinc-800 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-white font-medium font-mono text-sm transition-all outline-none resize-y whitespace-pre"
                        placeholder="CSV output will appear here..."
                        spellCheck="false"
                    />
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "JSON to CSV Converter", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
