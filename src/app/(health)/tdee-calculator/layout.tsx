import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TDEE Calculator | Total Daily Energy Expenditure',
    description: 'Free online TDEE Calculator. Calculate exactly how many calories your body burns every day based on your BMR and activity level.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
