import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/interest-rate-calculator/',
  },
  title: "Interest Rate Calculator | Compound Growth & Yield",
  description:
    "Calculate the accurate future value of investments or debt by applying various annual percentage yields (APY) and compounding frequencies. Including specialized USA tools like interest rate calculator.",
  keywords: [
    "interest rate calculator",
    "interest calculator",
    "savings account interest calculator",
    "interest calculator savings",
    "bank interest calculator",
    "simple interest calculator",
    "monthly interest calculator",
    "interest only calculator",
    "annual interest rate calculator",
    "cumulative interest calculator",
    "daily interest calculator",
    "interest rate formula",
    "simple interest",
    "simple interest formula",
    "interest formula",
    "rate of return calculator",
    "rental yield calculator",
    "bankrate calculator",
    "cap rate calculator",
    "effective tax rate calculator",
    "tax rate calculator",
    "rate calculator",
    "conversion rate calculator",
    "cap rate formula",
    "yield calculator",
    "internal rate of return formula",
    "rate of change calculator",
    "yield to maturity calculator",
    "rate of return formula",
    "heart rate zone calculator",
    "effective annual rate",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
