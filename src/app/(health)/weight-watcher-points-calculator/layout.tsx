import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weight Watcher Points Calculator | WW SmartPoints',
  description: 'Calculate Weight Watchers SmartPoints for any food using calories, fat, fiber, and protein values.',
  keywords: ['weight watchers calculator', 'WW points', 'smartpoints calculator', 'weight loss points', 'WW food points'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
