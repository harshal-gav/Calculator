import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: '/boat-loan-calculator/',
  },
  title: "Boat Loan Calculator - estimate Monthly Marine Payments",
  description: "Calculate your monthly payments for marine financing. Compare long-term loan options for yachts, sailboats, and recreational boats.",
};

export default function BoatLoanLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
