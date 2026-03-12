import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prime Number Calculator | Prime Factorization & primality Test',
  description: 'Test if a number is prime, find the next prime, and generate a list of prime numbers between two ranges. Detailed prime factorization included.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
