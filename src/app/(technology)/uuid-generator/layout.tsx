import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UUID Generator | Create Random Version 4 UUIDs',
    description: 'Instantly generate mathematically random, universally unique identifiers (UUID v4) for software development and database records.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
