import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/discount-calculator/',
  },
  title: "Discount Calculator | Calculate Stacked Retail Savings",
  description:
    "Calculate final out-of-pocket costs and total dollars saved during retail sales. Easily handle complex stacked discounts and clearance coupons. Including specialized USA tools like discount calculator.",
  keywords: ["discount calculator", "discount formula", "round off calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
