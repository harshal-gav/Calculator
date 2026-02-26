import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mortgage Calculator',
    description: 'Use our free mortgage calculator to estimate your monthly mortgage payments. Includes taxes, insurance, PMI, and more.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
