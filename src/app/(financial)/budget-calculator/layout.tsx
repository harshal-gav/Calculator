import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Budget Calculator | 50/30/20 Rule Planner',
  description: 'Plan your monthly spending using the 50/30/20 rule. Allocate your income to needs, wants, and savings to achieve financial freedom.',
  keywords: ['budget calculator', 'monthly budget planner', '50 30 20 rule', 'savings calculator', 'personal finance manager'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
