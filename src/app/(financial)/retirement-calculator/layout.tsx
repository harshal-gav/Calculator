import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/retirement-calculator/',
  },
  title: 'Retirement Calculator | Future Wealth Planner',
  description: 'Plan your retirement with precision. Calculate how much you need to save to maintain your lifestyle after you stop working.',
  keywords: ['retirement calculator', 'retirement planner', 'pension calculator', '401k projection', 'financial independence calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
