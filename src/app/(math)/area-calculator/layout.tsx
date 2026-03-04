import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '2D Surface Area Calculator | Rectangles, Circles, Triangles',
    description: 'Instantly calculate the exact square unit surface area of common 2D shapes. Find the area of rectangles, squares, triangles, and circles with perfectly formatted formulas.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
