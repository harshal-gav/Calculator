import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calorie Calculator',
    description: 'Free online Calorie Calculator. Estimate your TDEE (Total Daily Energy Expenditure) and find out exactly how many calories you need to lose, maintain, or gain weight.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
