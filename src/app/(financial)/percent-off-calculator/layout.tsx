import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: '/percent-off-calculator/',
  },
  title: "Percent Off Calculator - Sales & Discount Price Checker",
  description: "Quickly calculate the final price of an item after a percentage discount and sales tax. Perfect for shopping and flash sales.",
};

export default function PercentOffLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
