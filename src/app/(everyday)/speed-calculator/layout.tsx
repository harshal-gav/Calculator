import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/speed-calculator/',
  },
  title: 'Speed Calculator | Distance, Time, and Speed',
  description: 'Calculate average speed, time elapsed, or total distance traveled. Enter any two variables to automatically solve the physics kinematic equation.',
  keywords: ['speed calculator', 'distance calculator', 'time calculator', 'average speed calculator', 'mph calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
