import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GDP Calculator | Economic Growth & Percentage Calculator',
  description: 'Calculate GDP growth rates, economic contributions, and percentage changes. Analyze economic performance and growth.',
  keywords: ['GDP calculator', 'GDP growth calculator', 'economic growth calculator', 'percentage change', 'economic metrics'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
