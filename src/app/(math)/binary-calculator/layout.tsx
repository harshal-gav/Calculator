import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Binary Calculator | Compute 1s and 0s',
    description: 'Free online Binary Calculator. Perform mathematical addition, subtraction, division, and logic tests on Base-2 binary numbers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
