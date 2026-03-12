import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pregnancy Conception Calculator | Reverse Calculate EDD',
  description: 'Calculate exactly when you conceived based on your ultrasound Estimated Due Date (EDD) or the first day of your Last Menstrual Period (LMP).',
  keywords: ['pregnancy conception calculator', 'when did i conceive calculator', 'due date calculator', 'conception date finder'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
