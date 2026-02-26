'use client';

import { useEffect, useRef } from 'react';

type AdSpaceProps = {
    slot: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    layout?: string;
    className?: string;
};

export default function AdSpace({ slot, format = 'auto', layout, className = '' }: AdSpaceProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        // Only attempt to push the ad once
        try {
            if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error('AdSense push error', e);
        }
    }, []);

    return (
        <div className={`my-4 flex justify-center text-center items-center bg-gray-50 min-h-[90px] border border-gray-100 ${className}`}>
            {/* For development, show a placeholder if no client ID is provided */}
            {!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? (
                <span className="text-gray-400 text-sm italic">Advertisement Space [{slot}]</span>
            ) : (
                <ins
                    ref={adRef}
                    className="adsbygoogle block w-full"
                    style={{ display: 'block' }}
                    data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                    data-ad-slot={slot}
                    data-ad-format={format}
                    {...(layout ? { 'data-ad-layout': layout } : {})}
                    data-full-width-responsive="true"
                />
            )}
        </div>
    );
}
