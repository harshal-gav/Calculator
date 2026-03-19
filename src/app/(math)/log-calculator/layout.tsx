import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/log-calculator/',
  },
  title: 'Logarithm Calculator | Log Base 10, Natural Log & Any Base',
  description: 'Calculate logarithms with any base. Find log₁₀, natural log (ln), and logarithms for custom bases.',
  keywords: ['logarithm calculator', 'log calculator', 'natural log calculator', 'ln calculator', 'log base calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
