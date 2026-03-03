import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mortgage Payoff Calculator – Calculate Extra Payments',
    description: 'Free Mortgage Payoff Calculator. Discover how much time and interest you can save by making extra monthly payments toward your mortgage principal.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
