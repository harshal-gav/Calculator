import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Perimeter & Circumference Calculator | All 2D Shapes',
    description: 'Calculate the exact outer perimeter and circumference of rectangles, squares, triangles, circles, and regular polygons instantly. Includes formulas and step-by-step logic.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
