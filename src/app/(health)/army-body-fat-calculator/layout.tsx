import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/army-body-fat-calculator/',
  },
  title: 'Army Body Fat Calculator | Body Fat Percentage for Men & Women',
  description: 'Calculate body fat percentage using the US Army formula. Quickly assess your body composition with neck, waist, and hip measurements.',
  keywords: ['army body fat calculator', 'body fat percentage', 'DOD body fat calculator', 'body composition', 'fitness metrics'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
