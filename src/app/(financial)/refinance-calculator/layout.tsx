import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/refinance-calculator/',
  },
  title: "Refinance Break-Even Calculator | Savings & Timeline",
  description:
    "Calculate your exact break-even timeline and lifetime interest savings to mathematically determine if refinancing your mortgage is a profitable decision. Including specialized USA tools like refinance calculator.",
  keywords: ["refinance calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
