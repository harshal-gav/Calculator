import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/irr-calculator/',
  },
  title: 'IRR Calculator | Internal Rate of Return',
  description: 'Calculate the Internal Rate of Return (IRR) for your investments with uneven cash flows. Essential for project valuation and private equity analysis.',
  keywords: ['irr calculator', 'internal rate of return', 'npv calculator', 'investment yield calculator', 'cash flow analysis'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
