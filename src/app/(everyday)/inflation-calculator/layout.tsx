import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Inflation Calculator | Purchasing Power Forecaster',
    description: 'Calculate the future cost of goods due to inflation. Discover how historical and projected inflation rates degrade your total purchasing power over time.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
