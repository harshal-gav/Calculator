import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Zodiac Sign Calculator - Find Your Astrological Sign',
    description: 'Free online Zodiac Sign Calculator. Enter your birth date to instantly discover your astrological sun sign and ruling element.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
