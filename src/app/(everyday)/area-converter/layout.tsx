import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Area Converter',
    description: 'Free online Area Converter. Convert instantly between square meters, square feet, acres, hectares, and more.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
