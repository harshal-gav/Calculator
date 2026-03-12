import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slope Calculator | Find Line Equation & Gradient',
  description: 'Calculate the exact slope (m), y-intercept (b), distance, and angle of any straight line using two Coordinate Points.',
  keywords: ['slope calculator', 'find slope of line', 'line equation calculator', 'y-intercept calculator', 'gradient calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
