import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/dti-calculator/',
  },
  title: "DTI Calculator | Debt-to-Income Ratio",
  description:
    "Calculate your Debt-to-Income (DTI) ratio to evaluate your financial health and see if you qualify for a mortgage or auto loan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
