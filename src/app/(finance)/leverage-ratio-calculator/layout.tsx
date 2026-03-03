import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Leverage Ratio Calculator | Debt-to-Equity & EBITDA',
    description: 'Calculate critical corporate leverage ratios including Debt-to-Equity, Debt-to-EBITDA, and the Financial Leverage multiplier to evaluate solvency risk.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
