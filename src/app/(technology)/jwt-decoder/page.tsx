'use client';

import { useState } from 'react';

export default function JwtDecoder() {
    const [jwtInput, setJwtInput] = useState('');
    const [decodedHeader, setDecodedHeader] = useState('');
    const [decodedPayload, setDecodedPayload] = useState('');
    const [error, setError] = useState('');

    const decodeJwt = () => {
        setError('');
        setDecodedHeader('');
        setDecodedPayload('');

        if (!jwtInput) return;

        try {
            const parts = jwtInput.split('.');
            if (parts.length !== 3) {
                setError('A valid JWT must contain exactly 3 parts separated by dots.');
                return;
            }

            const header = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
            const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));

            setDecodedHeader(JSON.stringify(JSON.parse(header), null, 4));
            setDecodedPayload(JSON.stringify(JSON.parse(payload), null, 4));

        } catch (e: any) {
            setError('Failed to decode JWT. Ensure it is a valid Base64Url encoded string.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center font-mono">
                    <span className="mr-3">🔑</span> JWT Decoder
                </h1>
                <p className="text-purple-700 text-lg max-w-2xl mx-auto">
                    Decode JSON Web Tokens instantly to view their header and payload information.
                </p>
                <div className="mt-4 inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-bold">
                    100% Client-Side. Your tokens never leave your browser.
                </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto flex flex-col lg:flex-row gap-8">

                {/* Input */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">Encoded JWT</label>
                        <button onClick={() => { setJwtInput(''); setDecodedHeader(''); setDecodedPayload(''); setError(''); }} className="text-xs bg-zinc-100 px-3 py-1 rounded font-bold uppercase text-zinc-600 hover:bg-zinc-200">Clear</button>
                    </div>
                    <textarea
                        value={jwtInput}
                        onChange={(e) => {
                            setJwtInput(e.target.value);
                            // Auto trigger decode if it roughly looks like a JWT
                            if (e.target.value.split('.').length === 3) {
                                setTimeout(() => document.getElementById('decodeBtn')?.click(), 100);
                            }
                        }}
                        className="w-full flex-1 min-h-[400px] bg-slate-900 text-purple-300 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-slate-950 focus:border-purple-500 font-medium font-mono text-sm md:text-base transition-all outline-none resize-y break-all"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        spellCheck="false"
                    />

                    <button
                        id="decodeBtn"
                        onClick={decodeJwt}
                        className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-purple-600/30 uppercase tracking-widest text-lg"
                    >
                        Decode Token ➡️
                    </button>
                    {error && <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">{error}</div>}
                </div>

                {/* Output */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col flex-1">
                        <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide mb-2 text-rose-600">HEADER (Algorithm & Type)</label>
                        <textarea
                            value={decodedHeader}
                            readOnly
                            className="w-full flex-1 min-h-[150px] bg-rose-50 text-rose-900 rounded-xl border border-rose-200 p-4 font-medium font-mono text-sm transition-all outline-none resize-none"
                            placeholder="{}"
                            spellCheck="false"
                        />
                    </div>
                    <div className="flex flex-col flex-[2]">
                        <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide mb-2 text-indigo-600">PAYLOAD (Data)</label>
                        <textarea
                            value={decodedPayload}
                            readOnly
                            className="w-full flex-1 min-h-[250px] bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-200 p-4 font-medium font-mono text-sm transition-all outline-none resize-none"
                            placeholder="{}"
                            spellCheck="false"
                        />
                    </div>
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "JWT Decoder", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
