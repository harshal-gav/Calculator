import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blood Alcohol Calculator (BAC) – Drinking Estimate',
    description: 'Free Blood Alcohol Content (BAC) Calculator. Estimate your current BAC level and time to sober up based on the Widmark formula. For educational use only.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
