import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expected Return Calculator",
  description:
    "Free online Expected Return Calculator. Calculate the probability-weighted expected return of an investment based on various future scenarios.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
