import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/rounding-calculator/',
  },
  title: 'Rounding Calculator | Round to Nearest Decimal Place',
  description: 'Instantly round any complex decimal number up, down, or to the nearest whole number, tenths, hundredths, or thousands correctly.',
  keywords: ['rounding calculator', 'round numbers online', 'nearest ten calculator', 'round to hundredths', 'sig fig calculator round'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
