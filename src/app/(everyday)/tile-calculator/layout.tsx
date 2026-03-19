import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tile-calculator/',
  },
  title: 'Tile Calculator | Estimate Tiles & Grout Needed',
  description: 'Calculate exactly how many flooring or wall tiles you need for your DIY project. Factors in 10% waste overhead and grout line gap size.',
  keywords: ['tile calculator', 'flooring calculator', 'how many tiles do i need', 'subway tile calculator', 'bathroom remodel calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
