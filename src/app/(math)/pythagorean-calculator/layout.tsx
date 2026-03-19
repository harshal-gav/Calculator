import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/pythagorean-calculator/',
  },
  title: "Pythagorean Theorem Calculator | Solve a² + b² = c²",
  description:
    "Instantly calculate the hypotenuse or missing leg of any right triangle using the Pythagorean Theorem. Shows complete step-by-step algebraic proofs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
