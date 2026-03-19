import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/home-equity-calculator/',
  },
  title: "Home Equity Calculator | Calculate HELOC Borrowing Power",
  description:
    "Calculate your total home equity and find out your absolute maximum borrowing power for a Home Equity Line of Credit (HELOC) or Home Equity Loan. Including specialized USA tools like home equity calculator.",
  keywords: ["home equity calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
