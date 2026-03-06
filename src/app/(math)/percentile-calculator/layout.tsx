import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentile Calculator | Find Exact Data Percentiles",
  description:
    "Calculate the exact value at any given percentile (0-100) from a raw dataset. Perfect for grading, salary comparison, and statistical analysis. Including specialized USA tools like percentile calculator.",
  keywords: ["percentile calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
