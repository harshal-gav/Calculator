import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'VAT Calculator',
    description: 'Free online Value-Added Tax (VAT) Calculator. Instantly add VAT to a net price or extract VAT from a gross price.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
