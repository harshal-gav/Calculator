import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Investment Calculator & Tax Forecaster',
    description: 'Free online Investment Calculator. Forecast long term growth of your portfolio with annual additions and automatically estimate future capital gains tax liabilities.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
