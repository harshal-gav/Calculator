import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/p-value-calculator/',
  },
  title: 'P-value Calculator | Chi-Square to P-value Converter',
  description: 'Calculate p-values from chi-square statistics, t-statistics, z-scores, and F-statistics for hypothesis testing.',
  keywords: ['p-value calculator', 'chi square p-value', 'statistical significance', 'hypothesis testing', 'p value converter'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
