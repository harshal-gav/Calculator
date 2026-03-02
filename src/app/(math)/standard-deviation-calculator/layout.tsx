import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Standard Deviation Calculator',
    description: 'Free online standard deviation calculator. Calculate sample and population standard deviation, variance, and mean instantly from your data set.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
