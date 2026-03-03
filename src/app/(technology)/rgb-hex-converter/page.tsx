'use client';

import { useState, useEffect } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function RgbHexConverter() {
    // Shared state
    const [hex, setHex] = useState('3B82F6'); // blue-500 initial
    const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
    const [activeInput, setActiveInput] = useState<'hex' | 'rgb'>('rgb');

    // Handle Hex Input
    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
        if (val.length > 6) val = val.slice(0, 6);
        setHex(val);
        setActiveInput('hex');

        if (val.length === 3) {
            // Expand 3-char hex to 6-char
            const r = parseInt(val[0] + val[0], 16);
            const g = parseInt(val[1] + val[1], 16);
            const b = parseInt(val[2] + val[2], 16);
            setRgb({ r, g, b });
        } else if (val.length === 6) {
            const r = parseInt(val.substring(0, 2), 16);
            const g = parseInt(val.substring(2, 4), 16);
            const b = parseInt(val.substring(4, 6), 16);
            setRgb({ r, g, b });
        }
    };

    // Handle RGB Input
    const handleRgbChange = (color: 'r' | 'g' | 'b', val: string) => {
        let parsed = parseInt(val, 10);
        if (isNaN(parsed)) parsed = 0;
        if (parsed > 255) parsed = 255;
        if (parsed < 0) parsed = 0;

        const newRgb = { ...rgb, [color]: parsed };
        setRgb(newRgb);
        setActiveInput('rgb');

        // Update hex (only update hex if RGB is actively being changed to keep inputs in sync)
        const hexR = newRgb.r.toString(16).padStart(2, '0');
        const hexG = newRgb.g.toString(16).padStart(2, '0');
        const hexB = newRgb.b.toString(16).padStart(2, '0');
        setHex((hexR + hexG + hexB).toUpperCase());
    };

    // Calculate generic luminance to decide text color (black or white) over the color block
    const getLuminance = () => {
        // Simple fast formula
        return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
    };

    const textColor = getLuminance() > 128 ? '#000000' : '#ffffff';
    const previewColor = `#${hex.length === 6 || hex.length === 3 ? hex : '000000'}`;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-xl shadow-lg border border-zinc-200">
            <h1 className="text-4xl font-extrabold mb-4 text-zinc-800 border-b pb-4 flex items-center">
                <span className="mr-3">🎨</span> RGB to HEX Converter
            </h1>
            <p className="mb-8 text-zinc-600 text-lg">
                Convert colors instantly between Hexadecimal and RGB formats for web development and design.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-8">
                    {/* HEX */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
                        <label className="block text-sm font-bold text-zinc-500 mb-3 uppercase tracking-wider">HEX Color Code</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-2xl">#</span>
                            <input
                                type="text"
                                value={hex}
                                onChange={handleHexChange}
                                className="w-full rounded-xl border-2 border-zinc-200 p-4 pl-12 bg-zinc-50 focus:border-blue-500 focus:bg-white text-3xl font-mono font-black text-zinc-800 outline-none uppercase tracking-widest transition-all"
                                placeholder="000000"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center -my-4 relative z-10">
                        <div className="bg-zinc-200 rounded-full p-2 text-zinc-500 shadow-sm border border-zinc-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </div>
                    </div>

                    {/* RGB */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                        <label className="block text-sm font-bold text-zinc-500 mb-3 uppercase tracking-wider">RGB Values <span className="text-xs font-normal lowercase">(0-255)</span></label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className="text-center font-bold text-red-500 mb-1 text-sm bg-red-50 rounded-t border-b border-red-100 py-1">R</div>
                                <input
                                    type="number" min="0" max="255"
                                    value={activeInput === 'hex' ? rgb.r : rgb.r.toString()}
                                    onChange={(e) => handleRgbChange('r', e.target.value)}
                                    className="w-full rounded-xl border-2 border-red-200 p-3 bg-red-50 focus:bg-white focus:border-red-500 text-xl font-mono font-bold text-center text-zinc-800 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <div className="text-center font-bold text-green-500 mb-1 text-sm bg-green-50 rounded-t border-b border-green-100 py-1">G</div>
                                <input
                                    type="number" min="0" max="255"
                                    value={activeInput === 'hex' ? rgb.g : rgb.g.toString()}
                                    onChange={(e) => handleRgbChange('g', e.target.value)}
                                    className="w-full rounded-xl border-2 border-green-200 p-3 bg-green-50 focus:bg-white focus:border-green-500 text-xl font-mono font-bold text-center text-zinc-800 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <div className="text-center font-bold text-blue-500 mb-1 text-sm bg-blue-50 rounded-t border-b border-blue-100 py-1">B</div>
                                <input
                                    type="number" min="0" max="255"
                                    value={activeInput === 'hex' ? rgb.b : rgb.b.toString()}
                                    onChange={(e) => handleRgbChange('b', e.target.value)}
                                    className="w-full rounded-xl border-2 border-blue-200 p-3 bg-blue-50 focus:bg-white focus:border-blue-500 text-xl font-mono font-bold text-center text-zinc-800 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div
                    className="rounded-3xl shadow-xl flex flex-col justify-end p-8 border hover:scale-[1.02] transition-transform duration-300"
                    style={{ backgroundColor: previewColor, minHeight: '300px', borderColor: 'rgba(0,0,0,0.1)' }}
                >
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl" style={{ color: textColor }}>
                        <h3 className="font-bold text-sm tracking-widest uppercase mb-4 opacity-70 border-b border-current pb-2">CSS Ready</h3>
                        <div className="space-y-2 font-mono text-lg font-bold">
                            <div className="flex justify-between items-center bg-black/10 rounded px-3 py-2 cursor-pointer hover:bg-black/20 transition-colors"
                                onClick={() => { navigator.clipboard.writeText(`#${hex}`); alert('Copied HEX!'); }}>
                                <span>hex:</span>
                                <span>#{hex || '000000'}</span>
                            </div>
                            <div className="flex justify-between items-center bg-black/10 rounded px-3 py-2 cursor-pointer hover:bg-black/20 transition-colors"
                                onClick={() => { navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`); alert('Copied RGB!'); }}>
                                <span>rgb:</span>
                                <span>rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "RGB to HEX Converter", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />

            <div className="mt-8 text-left">
                <CalculatorSEO
                    title="Design Color Profile Converter"
                    whatIsIt={
                        <p>The <strong>RGB to HEX Converter</strong> is a bridge tool for UI/UX designers and frontend developers. It instantly bidirectionalizes visual color representations—from the standard CSS Hexadecimal string format (e.g. #FF5733) into mathematically raw Red, Green, and Blue light additive values (255, 87, 51).</p>
                    }
                    formula={
                        <>
                            <p>Monitors mix red, green, and blue light from an intensity of 0 (off) to 255 (full brightness). To create a Hex code, we take each of these base-10 integer values, convert them individually into a base-16 numerical system (Hexadecimal format: 0-9 and A-F), and concatenate them together into a 6-character string.</p>
                            <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-200 text-zinc-800">
                                <p><strong>R, G, B = Integers between 0 and 255</strong></p>
                                <p className="mt-2 pt-2 border-t border-zinc-300"><strong>Hex = RedToHex() + GreenToHex() + BlueToHex()</strong></p>
                                <p className="mt-2 pt-2 border-t border-zinc-300"><strong>rgb(255, 255, 255) = #FFFFFF (Pure White)</strong></p>
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Let's manually convert a vibrant shade of pure blue.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                                <li><strong>The RGB Input:</strong> Red: 0, Green: 0, Blue: 255.</li>
                                <li><strong>The Conversion:</strong> Base-10 zero converts to Base-16 `00`. Base-10 255 converts to Base-16 `FF`.</li>
                                <li><strong>The Concatenation:</strong> Gluing them together gives us `00` + `00` + `FF`.</li>
                                <li><strong>Result:</strong> The final CSS color code is exactly <strong>#0000FF</strong>.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-zinc-700">
                            <li><strong>CSS Opacity Adjustment:</strong> While modern CSS supports 8-character hex codes, developers often paste a standard 6-character hex code into this converter, extract the RGB values, and inject them into an `rgba(R, G, B, 0.5)` function to easily generate a translucent glass background.</li>
                            <li><strong>Design Systems:</strong> Converting absolute brand colors given by a graphics department in Photoshop (who often work globally in RGB) into perfectly matched CSS constants for a Tailwind config file.</li>
                            <li><strong>JavaScript Animations:</strong> Canvas APIs and popular JS animation libraries often require explicitly defining start/end colors as numeric RGB arrays rather than Hex strings to perform mathematical tweening and fading.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Why does my 3-character Hex code still work?",
                            answer: "A 3-character Hex code (like #F00) is just a visual shorthand for CSS. The browser automatically doubles every single character to parse it. So #F00 is technically identical and instantly expanded to #FF0000 (Pure Red)."
                        },
                        {
                            question: "What is CMYK compared to RGB?",
                            answer: "RGB (Red, Green, Blue) is an 'additive' light model used strictly for digital screens emitting light. CMYK (Cyan, Magenta, Yellow, Key/Black) is a 'subtractive' ink model used strictly for physical paper printing. They cannot map together perfectly."
                        },
                        {
                            question: "Can Hex codes handle transparency?",
                            answer: "Yes, modern CSS allows for 8-character hex codes (e.g., #FF000080), where the final two digits represent the 'Alpha' channel or opacity level."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "PX to REM Converter", path: "/px-rem-converter", desc: "Convert standard pixel values to responsive CSS units." },
                        { name: "Base Converter", path: "/base-converter", desc: "See the math behind converting Decimal (Base-10) to Hexadecimal (Base-16)." },
                        { name: "Proportion Calculator", path: "/proportion-calculator", desc: "Scale UI elements mathematically." }
                    ]}
                />
            </div>
        </div>
    );
}
