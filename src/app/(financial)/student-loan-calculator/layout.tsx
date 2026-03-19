import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/student-loan-calculator/',
  },
  title: 'Student Loan Calculator | Payoff & Extra Payments',
  description: 'Calculate your student loan monthly payment, total interest, and discover exactly how much money and time you can save by adding extra monthly payments.',
  keywords: ['student loan calculator', 'student loan payoff calculator', 'college loan calculator', 'extra payment calculator', 'student debt'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
