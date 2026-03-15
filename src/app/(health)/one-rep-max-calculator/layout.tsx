import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'One Rep Max Calculator | Training Load Calculator',
  description: 'Calculate your one-rep max using multiple scientific formulas including Epley, Brzycki, and more.',
  keywords: ['one rep max calculator', '1RM calculator', 'strength training', 'max lift calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
