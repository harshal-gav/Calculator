import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fraction Calculator",
  description:
    "Free online fraction calculator. Add, subtract, multiply, divide, and simplify fractions effortlessly with step-by-step results. Including specialized USA tools like fraction calculator, mixed fraction calculator, scientific calculator with fraction.",
  keywords: [
    "fraction calculator",
    "mixed fraction calculator",
    "scientific calculator with fraction",
    "adding fractions calculator",
    "multiplying fractions calculator",
    "decimal to fraction calculator",
    "dividing fractions calculator",
    "equivalent fractions calculator",
    "partial fraction calculator",
    "fraction to percent calculator",
    "partial fraction decomposition calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
