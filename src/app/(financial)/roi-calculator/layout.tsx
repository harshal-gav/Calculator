import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ROI Calculator',
    description: 'Free online ROI Calculator. Calculate your exact Return on Investment, Net Return, and Annualized ROI across any time period to evaluate investment performance.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
