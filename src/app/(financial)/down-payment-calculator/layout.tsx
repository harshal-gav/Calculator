import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: '/down-payment-calculator/',
  },
  title: "Down Payment Calculator - Savings Timeline for Home Ownership",
  description: "Calculate how much you need to save for a home down payment and estimate how long it will take to reach your goal based on monthly deposits.",
};

export default function DownPaymentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
