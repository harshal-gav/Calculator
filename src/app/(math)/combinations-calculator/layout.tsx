import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Combinations Calculator (nCr) | Find Unique Groups',
    description: 'Calculate the total number of unique combinations (where order does not matter) from a set. Perfectly solves nCr problems instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
