'use client';

import { useState } from 'react';

export default function Base64Converter() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleInput = (val: string) => {
        setInput(val);
        setError('');

        if (!val) {
            setOutput('');
            return;
        }

        try {
            if (mode === 'encode') {
                // To handle Unicode safely
                const encoded = btoa(unescape(encodeURIComponent(val)));
                setOutput(encoded);
            } else {
                // Decoding
                // First remove any whitespace that might cause DOMException
                const cleaned = val.replace(/\\s/g, '');
                const decoded = decodeURIComponent(escape(atob(cleaned)));
                setOutput(decoded);
            }
        } catch (err: any) {
            setOutput('');
            setError(mode === 'encode'
                ? 'Error encoding to Base64.'
                : 'Invalid Base64 string. Please ensure it is correctly formatted.');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const switchMode = (newMode: 'encode' | 'decode') => {
        setMode(newMode);
        setInput(output);
        if (output) {
            // Trigger recalculation with the swapped input
            try {
                if (newMode === 'encode') {
                    setOutput(btoa(unescape(encodeURIComponent(output))));
                } else {
                    const cleaned = output.replace(/\\s/g, '');
                    setOutput(decodeURIComponent(escape(atob(cleaned))));
                }
                setError('');
            } catch (err) {
                setOutput('');
                setError('Conversion error during swap.');
            }
        } else {
            setOutput('');
            setError('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 text-zinc-100">
            <h1 className="text-4xl font-extrabold mb-4 text-sky-400 border-b border-zinc-800 pb-4 flex items-center">
                <span className="mr-3">⚙️</span> Base64 Encoder / Decoder
            </h1>
            <p className="mb-8 text-zinc-400 text-lg">
                Quickly encode text to Base64 format, or decode Base64 strings back into readable text. Local execution for privacy.
            </p>

            <div className="flex bg-zinc-800 rounded-xl p-1 mb-8">
                <button
                    onClick={() => switchMode('encode')}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${mode === 'encode' ? 'bg-sky-500 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50'}`}
                >
                    Encode to Base64
                </button>
                <button
                    onClick={() => switchMode('decode')}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${mode === 'decode' ? 'bg-indigo-500 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50'}`}
                >
                    Decode from Base64
                </button>
            </div>

            <div className="space-y-6">
                {/* Input Area */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
                        </label>
                        <span className="text-xs text-zinc-500 font-mono">{input.length} chars</span>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => handleInput(e.target.value)}
                        placeholder={mode === 'encode' ? "Paste or type your text here..." : "Paste your Base64 string here (e.g. SGVsbG8gd29ybGQ=)"}
                        className="w-full h-40 bg-black border-2 border-zinc-800 rounded-xl p-4 text-white font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none resize-none transition-colors"
                    />
                </div>

                {/* Arrow Icon */}
                <div className="flex justify-center -my-2 relative z-10">
                    <div className="bg-zinc-800 border border-zinc-700 p-2 rounded-full text-zinc-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>

                {/* Output Area */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                            {mode === 'encode' ? 'Base64 Output' : 'Plain Text Output'}
                        </label>
                    </div>

                    {error ? (
                        <div className="w-full text-center p-8 bg-red-900/20 border border-red-500/50 text-red-400 font-mono rounded-xl">
                            {error}
                        </div>
                    ) : (
                        <div className="relative group">
                            <textarea
                                readOnly
                                value={output}
                                className={`w-full h-48 bg-zinc-950 border-2 border-zinc-700 rounded-xl p-4 pr-16 text-emerald-400 font-mono focus:outline-none resize-none ${output ? '' : 'opacity-50'}`}
                                placeholder="Result will appear here..."
                            />
                            {output && (
                                <button
                                    onClick={handleCopy}
                                    className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}
                                    title="Copy to clipboard"
                                >
                                    {copied ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Base64 Converter", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
