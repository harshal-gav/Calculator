import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate Calculator | Rental Property Analysis',
  description: 'Calculate ROI, Cap Rate, and Cash Flow for rental properties. Compare real estate investment opportunities with our comprehensive analysis tool.',
  keywords: ['real estate calculator', 'rental property calculator', 'cap rate calculator', 'cash on cash return', 'investment property analysis'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
