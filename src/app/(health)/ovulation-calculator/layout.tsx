import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ovulation Calculator | Track Your Most Fertile Days',
    description: 'Predict your exact ovulation date and calculate your prime 5-day fertile window to maximize your chances of natural conception.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
