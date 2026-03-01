'use client';

import { useState } from 'react';
import AdSpace from '@/components/AdSpace';

export default function StickyBottomAd() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null; // The user dismissed the ad, hide entirely
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 transition-all duration-300 transform translate-y-0">
            {/* The Wrapper surrounding the Ad and the Close button */}
            <div className="relative bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200 w-full flex justify-center py-2 px-4 shadow-lg">

                {/* Dismiss Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-0 right-0 -mt-3 mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-1 leading-none shadow-md z-10 transition-colors"
                    aria-label="Close Advertisement"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* The global slot for AdSense bottom ads */}
                <div className="bg-transparent overflow-hidden max-w-[1200px] w-full mt-1">
                    <AdSpace slot="global-sticky-bottom" format="auto" />
                </div>
            </div>
        </div>
    );
}
