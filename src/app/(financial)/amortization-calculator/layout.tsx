import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/amortization-calculator/',
  },
  title: "Amortization Calculator",
  description:
    "Generate a complete amortization schedule. See exactly how much of your monthly payment goes to principal versus interest over time. Including specialized USA tools like amortization calculator.",
  keywords: [
    "amortization calculator",
    "amortization schedule",
    "loan amortization calculator",
    "amortization schedule calculator",
    "amortization table",
    "loan amortization schedule",
    "amortization",
    "loan amortization",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
