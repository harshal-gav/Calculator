import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/variance-calculator/',
  },
  title: 'Variance Calculator | Population & Sample Stats',
  description: 'Calculate the variance of any dataset. Easily compute Sample Variance (s²) and Population Variance (σ²) online.',
  keywords: ['variance calculator', 'population variance', 'sample variance', 'stats variance'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
