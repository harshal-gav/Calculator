import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Scientific Notation Converter – Standard to Exponential Form',
    description: 'Free Scientific Notation Converter. Convert numbers instantly between standard decimal format and scientific exponential notation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
