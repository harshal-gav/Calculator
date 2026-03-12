import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investment Calculator | Compound Growth Tool',
  description: 'Project the future value of your investments. Calculate the impact of initial capital, monthly contributions, and total time on your potential wealth.',
  keywords: ['investment calculator', 'compound interest calculator', 'wealth projection', 'finance growth tool', 'stock market calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
