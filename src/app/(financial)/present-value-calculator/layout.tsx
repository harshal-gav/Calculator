import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Present Value Calculator',
    description: 'Free online Present Value (PV) Calculator. Determine exactly how much you need to invest today to reach a target financial goal in the future based on a specific interest rate.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
