import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/empirical-rule-calculator/',
  },
  title: "Empirical Rule Calculator | 68-95-99.7 Bell Curve",
  description:
    "Instantly calculate the 68%, 95%, and 99.7% distribution ranges for any normal dataset using the empirical rule (three-sigma rule).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
