import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: '/annuity-calculator/',
  },
  title: "Annuity Calculator - Calculate Payouts and Future Value",
  description: "Project your annuity growth or calculate guaranteed monthly payouts from a lump sum investment. Includes accumulation and distribution phase logic.",
};

export default function AnnuityLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
