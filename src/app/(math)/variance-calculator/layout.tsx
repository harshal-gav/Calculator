import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Variance & Standard Deviation Calculator | Sample & Population',
    description: 'Instantly calculate sample and population variance (s² and σ²). Input your dataset to automatically compute mean, sum of squares, variance, and standard deviation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
