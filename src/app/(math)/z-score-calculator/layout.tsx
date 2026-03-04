import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Z-Score Calculator | Calculate Standard Score & Percentile',
    description: 'Instantly calculate the Z-Score (standard score) of a raw value. See exactly how many standard deviations away from the mean your data point is.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
