import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Time Calculator',
    description: 'Free online Time Calculator. Add or subtract blocks of time easily in hours, minutes, and seconds. Great for payroll, editing, and athletic training.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
