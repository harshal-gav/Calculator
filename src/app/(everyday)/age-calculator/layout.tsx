import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Age Calculator',
    description: 'Free online Age Calculator. Calculate your exact chronological age in years, months, days, weeks, and find out exactly how many days until your next birthday.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
