import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/social-security-calculator/',
  },
  title: 'Social Security Calculator | Retirement Benefits Estimator',
  description: 'Estimate your future social security benefits based on your current age, salary, and target retirement year. Compare payouts at age 62 vs full retirement age.',
  keywords: ['social security calculator', 'retirement benefits calculator', 'ssi calculator', 'when to take social security', 'fra calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
