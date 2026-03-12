import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LTV Calculator | Property Loan-to-Value Ratio",
  description:
    "Calculate your Loan-to-Value (LTV) ratio instantly to determine mortgage risk and Private Mortgage Insurance (PMI) requirements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
