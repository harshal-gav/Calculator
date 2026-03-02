'use client';

import { useState } from 'react';

export default function JsonValidator() {
    const [jsonInput, setJsonInput] = useState('{\n  "property": "value",\n  "array": [1, 2, 3]\n}');
    const [result, setResult] = useState<{ isValid: boolean; parsed: string | null; error: string | null } | null>(null);

    const validateJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            const formatted = JSON.stringify(parsed, null, 4);
            setResult({ isValid: true, parsed: formatted, error: null });
        } catch (e: any) {
            setResult({ isValid: false, parsed: null, error: e.message });
        }
    };

    const reformatJson = () => {
        validateJson();
        if (result?.isValid && result.parsed) {
            setJsonInput(result.parsed);
        }
    };

    const clearInput = () => {
        setJsonInput('');
        setResult(null);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-mono">
                    <span className="mr-3">&#123; &#125;</span> JSON Validator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Instantly validate, format, and debug JSON data structures.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto flex flex-col h-full">

                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">Enter JSON String</label>
                    <div className="flex gap-2">
                        <button
                            onClick={clearInput}
                            className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-widest rounded transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            onClick={reformatJson}
                            className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded transition-colors"
                        >
                            Format Output
                        </button>
                    </div>
                </div>

                <textarea
                    value={jsonInput}
                    onChange={(e) => {
                        setJsonInput(e.target.value);
                        setResult(null); // Reset result on change
                    }}
                    className="w-full flex-1 min-h-[400px] bg-zinc-900 text-emerald-300 rounded-xl border-zinc-300 shadow-sm p-4 border focus:bg-zinc-950 focus:border-emerald-500 font-medium font-mono text-lg transition-all outline-none resize-y"
                    placeholder="Paste your JSON here..."
                    spellCheck="false"
                />

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={validateJson}
                        className="w-full md:w-auto md:min-w-[300px] bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Validate JSON
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className={`rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden flex flex-col ${result.isValid ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-red-50 border-2 border-red-500'}`}>

                    <div className="flex items-start gap-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-3xl shadow-inner shrink-0 ${result.isValid ? 'bg-emerald-200 text-emerald-600' : 'bg-red-200 text-red-600'}`}>
                            {result.isValid ? '✓' : '✗'}
                        </div>

                        <div className="flex-1">
                            <h2 className={`font-black uppercase tracking-widest text-2xl mb-2 ${result.isValid ? 'text-emerald-700' : 'text-red-700'}`}>
                                {result.isValid ? 'Valid JSON' : 'Invalid JSON'}
                            </h2>

                            {!result.isValid && result.error && (
                                <div className="bg-red-100 p-4 rounded-xl border border-red-200 mt-4">
                                    <span className="text-red-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Error Message</span>
                                    <div className="font-mono text-red-800 font-bold">{result.error}</div>
                                </div>
                            )}

                            {result.isValid && (
                                <p className="text-emerald-600 font-medium">
                                    The provided string is well-formed JSON. Use the "Format Output" button above to pretty-print it.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "JSON Validator", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
