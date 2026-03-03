import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Length Converter',
    description: 'Free online Length Converter. Instantly convert between metric, imperial, and astronomical units like meters, feet, inches, miles, and kilometers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
