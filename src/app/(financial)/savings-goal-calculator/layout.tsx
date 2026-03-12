import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator | Financial Target Planner',
  description: 'Calculate exactly how much you need to save each month to reach your financial goals. Perfect for weddings, house down payments, or emergency funds.',
  keywords: ['savings goal calculator', 'financial target calculator', 'monthly savings planner', 'how much to save', 'goal based saving'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
