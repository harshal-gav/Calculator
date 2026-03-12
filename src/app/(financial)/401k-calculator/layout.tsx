import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '401k Calculator | Retirement Contribution Planner',
  description: 'Optimize your 401k contributions and employer matches. Calculate how much you will have saved by retirement based on your salary and contribution percentage.',
  keywords: ['401k calculator', 'retirement savings', 'employer match calculator', 'defined contribution plan', 'tax-deferred growth'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
