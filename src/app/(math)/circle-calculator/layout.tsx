import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Circle Geometry Calculator | Radius to Area',
    description: 'Solve any circle instantly. Enter just one known metric (radius, diameter, circumference, or area) and our calculator will perfectly solve the remaining three.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
