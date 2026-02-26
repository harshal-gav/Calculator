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
            <ins
                ref={adRef}
                className="adsbygoogle block w-full"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1126148240601289"
                data-ad-slot={slot}
                data-ad-format={format}
                {...(layout ? { 'data-ad-layout': layout } : {})}
                data-full-width-responsive="true"
            />
        </div>
    );
}
