import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: '/future-value-calculator/',
  },
  title: "Future Value Calculator - Project Investment Growth",
  description: "Calculate the future value of your current savings or investments using compound interest. Support for daily, monthly, and annual compounding.",
};

export default function FutureValueLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
