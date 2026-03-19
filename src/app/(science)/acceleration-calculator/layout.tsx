import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/acceleration-calculator/',
  },
  title: "Acceleration Calculator",
  description:
    "Free online Acceleration Calculator. Solve for acceleration, initial velocity, final velocity, and elapsed time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
