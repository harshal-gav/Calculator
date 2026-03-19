import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/target-heart-rate-calculator/',
  },
  title: 'Target Heart Rate Calculator | Find Your Training Zones',
  description: 'Calculate your exact target heart rate zones for burning fat, cardiovascular endurance, and anaerobic peak training using your age and resting heart rate.',
  keywords: ['target heart rate calculator', 'heart rate zone calculator', 'fat burn calculator', 'training zones', 'karvonen formula'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
