import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary Calculator',
  description: 'Convert your salary instantly. Find out your hourly, daily, weekly, monthly, and annual equivalent pay rates for any income.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
