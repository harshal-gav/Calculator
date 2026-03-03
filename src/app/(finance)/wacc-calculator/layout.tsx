import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'WACC Calculator',
    description: 'Free online Weighted Average Cost of Capital (WACC) Calculator. Determine a company\'s blended cost of financing across debt and equity.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
