'use client';

import { useState } from 'react';

export default function HtmlEncoderDecoder() {
    const [inputStr, setInputStr] = useState('<h1>Hello World & "Welcome"!</h1>');
    const [outputStr, setOutputStr] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    // Very simple encode/decode using browser's built-in DOM parsing for accurate representation
    const processHtml = (action: 'encode' | 'decode') => {
        if (!inputStr) {
            setOutputStr('');
            return;
        }

        if (action === 'encode') {
            // Encode: convert reserved characters to entities
            let str = inputStr;
            str = str.replace(/&/g, '&amp;');
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            str = str.replace(/"/g, '&quot;');
            str = str.replace(/'/g, '&#39;');
            setOutputStr(str);
        } else {
            // Decode: convert back to standard characters using DOM technique
            const txt = document.createElement('textarea');
            txt.innerHTML = inputStr;
            setOutputStr(txt.value);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputStr).then(() => {
            alert('Copied to clipboard!');
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-orange-900 flex items-center justify-center font-mono">
                    <span className="mr-3">&lt;/&gt;</span> HTML Encoder/Decoder
                </h1>
                <p className="text-orange-700 text-lg max-w-2xl mx-auto">
                    Safely encode HTML tags to escape characters, or decode HTML entities back to readable text.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto flex flex-col lg:flex-row gap-8">

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">Input Text</label>
                        <button onClick={() => setInputStr('')} className="text-xs bg-zinc-100 px-3 py-1 rounded font-bold uppercase text-zinc-600 hover:bg-zinc-200">Clear</button>
                    </div>
                    <textarea
                        value={inputStr}
                        onChange={(e) => setInputStr(e.target.value)}
                        className="w-full flex-1 min-h-[300px] bg-zinc-50 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-white focus:border-orange-500 font-medium font-mono text-lg transition-all outline-none resize-y"
                        placeholder="Paste text here..."
                        spellCheck="false"
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-4 py-4 lg:py-0">
                    <button
                        onClick={() => { setMode('encode'); processHtml('encode'); }}
                        className="w-full lg:w-32 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-orange-600/30 uppercase tracking-widest text-sm"
                    >
                        Encode HTML ➡️
                    </button>
                    <button
                        onClick={() => { setMode('decode'); processHtml('decode'); }}
                        className="w-full lg:w-32 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest text-sm"
                    >
                        Decode HTML ➡️
                    </button>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">Output Text</label>
                        <button onClick={copyToClipboard} disabled={!outputStr} className="text-xs bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded font-bold uppercase text-orange-800 hover:bg-orange-200">Copy Result</button>
                    </div>
                    <textarea
                        value={outputStr}
                        readOnly
                        className="w-full flex-1 min-h-[300px] bg-slate-900 text-orange-300 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-slate-800 font-medium font-mono text-lg transition-all outline-none resize-y"
                        placeholder="Output will appear here..."
                        spellCheck="false"
                    />
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "HTML Encoder/Decoder", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
