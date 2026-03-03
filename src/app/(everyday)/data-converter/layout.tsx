import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Data Storage Converter',
    description: 'Free online Data Storage Converter. Convert bits, bytes, kilobytes, megabytes, gigabytes, and terabytes instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
