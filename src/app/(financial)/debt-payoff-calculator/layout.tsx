import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Debt Payoff Calculator | Avalanche & Snowball Strategy',
    description: 'Calculate exactly how many months it will take to become totally debt-free and understand the true cost of interest based on your monthly payment.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
