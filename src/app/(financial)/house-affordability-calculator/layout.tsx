import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/house-affordability-calculator/',
  },
  title: 'House Affordability Calculator | How Much House Can I Afford?',
  description: 'Calculate exactly how much house you can afford based on your income, debt-to-income ratio (DTI), and down payment using our free House Affordability Calculator.',
  keywords: ['house affordability calculator', 'how much house can i afford', 'mortgage affordability calculator', 'home affordability'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
