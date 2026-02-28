'use client';
import { useEffect } from 'react';

export default function FirebaseAnalytics() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('@/lib/firebase');
        }
    }, []);
    return null;
}
