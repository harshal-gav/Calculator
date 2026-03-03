import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bandwidth Calculator - Download & Upload Time Estimator',
    description: 'Free online Bandwidth Calculator. Calculate exactly how long it will take to download or upload a file based on your internet connection speed in Mbps or MB/s.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
