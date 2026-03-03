import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Commission Calculator | Instant Sales & Agent Fee Calculator',
    description: 'Calculate real estate commissions, sales agent fees, and net seller revenue instantly. Accurate margin and payout calculator for professionals.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
