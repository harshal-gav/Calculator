import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Trapezoid Calculator – Area, Median & Perimeter',
    description: 'Free Trapezoid Calculator. Calculate the area, median, and perimeter of a trapezoid instantly using base and height.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
