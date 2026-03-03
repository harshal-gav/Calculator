import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Stock Return Calculator – Net Profit & ROI',
    description: 'Free Stock Return Calculator. Calculate your exact Net Profit and Return on Investment (ROI) for individual stock trades.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
