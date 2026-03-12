import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fuel Cost Calculator | Gas Trip Estimator',
  description: 'Calculate the exact fuel cost of your road trip. Enter your distance, car MPG, and local gas prices to instantly estimate total gas expenses.',
  keywords: ['fuel cost calculator', 'gas trip calculator', 'gas cost estimator', 'mpg calculator road trip'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
