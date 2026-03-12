import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mean, Median, Mode, Range Calculator | Fast Stats',
  description: 'Instantly calculate the mean, median, mode, and range of any data set. Enter your numbers separated by commas for immediate statistical analysis.',
  keywords: ['mean calculator', 'median calculator', 'mode calculator', 'range calculator', 'average calculator', 'statistics calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
