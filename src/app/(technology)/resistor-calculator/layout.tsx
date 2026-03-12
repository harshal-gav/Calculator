import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resistor Calculator | Resistance Series & Parallel Calculator',
  description: 'Calculate total resistance for resistors in series and parallel circuits. Find color code values and combinations.',
  keywords: ['resistor calculator', 'resistance calculator', 'series resistor', 'parallel resistor', 'ohms calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
