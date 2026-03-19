import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/prime-factorization-calculator/',
  },
  title: "Prime Factorization Calculator – Find Prime Factors",
  description:
    "Free Prime Factorization Calculator. Decompose any integer into a product of its prime factors instantly with this free math tool. Including specialized USA tools like prime factorization calculator.",
  keywords: ["prime factorization calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
