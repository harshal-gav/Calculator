import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "P/E Ratio Calculator",
  description:
    "Free online Price-to-Earnings (P/E) Ratio Calculator. Evaluate stock valuations and determine if a company is overvalued or undervalued.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
