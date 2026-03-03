import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BMR Calculator | Calculate Basal Metabolic Rate',
    description: 'Free online BMR Calculator. Use the Mifflin-St Jeor equation to exactly calculate your Basal Metabolic Rate and how many calories your body burns at rest.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
