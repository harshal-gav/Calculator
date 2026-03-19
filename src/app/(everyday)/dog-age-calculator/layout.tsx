import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/dog-age-calculator/',
  },
  title: "Dog Age Calculator - Convert Dog Years to Human Years",
  description:
    "Free online Dog Age Calculator. Calculate your dog's true age in human years using precise veterinary mathematics based on breed size and weight.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
