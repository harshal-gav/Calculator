import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: '/marriage-tax-calculator/',
  },
  title: "Marriage Tax Calculator - Bonus or Penalty Analysis",
  description: "Calculate whether you will pay more or less in federal taxes by filing jointly. Uses 2024 IRS tax brackets and standard deductions.",
};

export default function MarriageTaxLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
