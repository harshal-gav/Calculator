import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/square-footage-calculator/',
  },
  title: 'Square Footage Calculator | Instantly Find Sq Ft',
  description: 'Calculate the total square footage of your room or property. Enter length and width to find exact square feet, square yards, and square meters.',
  keywords: ['square footage calculator', 'sq ft calculator', 'square foot calculator', 'room size calculator', 'area calculator for real estate'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
