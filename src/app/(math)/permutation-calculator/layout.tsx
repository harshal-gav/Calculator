import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/permutation-calculator/',
  },
  title: "Permutation Calculator (nPr) | Find Exact Arrangements",
  description:
    "Calculate the total number of unique permutations (where exact order matters). Supports calculations with and without repetition.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
