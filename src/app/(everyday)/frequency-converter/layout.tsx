import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frequency Converter – Hz to RPM',
    description: 'Free Frequency Converter. Instantly convert between Hertz, Kilohertz, Megahertz, Gigahertz, Terahertz, and RPM (Revolutions per minute).',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
