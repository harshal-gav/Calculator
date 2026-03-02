import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gas Mileage Calculator',
    description: 'Free online Gas Mileage Calculator. Calculate your exact vehicle fuel efficiency (MPG, L/100km, km/L) based on distance driven and gas consumed.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
