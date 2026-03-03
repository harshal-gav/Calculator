import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cat Age Calculator - Convert Cat Years to Human Years',
    description: 'Free online Cat Age Calculator. Calculate your feline friend\'s true equivalent age in human years using scientific veterinary guidelines.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
