import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: '/rental-property-calculator/',
  },
  title: "Rental Property Calculator - Analyze Real Estate ROI",
  description: "Calculate cap rate, cash-on-cash return, and monthly cash flow for potential rental property investments. Free real estate analysis tool.",
};

export default function RentalPropertyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
