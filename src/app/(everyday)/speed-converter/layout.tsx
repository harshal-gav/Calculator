import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Speed Converter',
    description: 'Free online Speed and Velocity Converter. Instantly convert between mph, km/h, m/s, knots, and Mach speed.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
