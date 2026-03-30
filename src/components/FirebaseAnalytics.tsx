'use client';
import { useEffect } from 'react';

export default function FirebaseAnalytics() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Defer analytics initialization to idle time to avoid blocking main thread
            const init = () => import('@/lib/firebase');
            if ('requestIdleCallback' in window) {
                (window as Window).requestIdleCallback(init, { timeout: 4000 });
            } else {
                setTimeout(init, 2000);
            }
        }
    }, []);
    return null;
}
