import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Standard Deviation Calculator | Population & Sample Stats',
  description: 'Calculate the standard deviation, variance, and mean of your dataset. Supports both Sample and Population statistical equations.',
  keywords: ['standard deviation calculator', 'population standard deviation', 'sample standard deviation', 'variance calculator', 'stats standard deviation'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
