import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidence Interval Calculator | Exact Statistical Ranges",
  description:
    "Calculate 90%, 95%, and 99% confidence intervals from your sample mean and standard deviation. Free, fast, and mathematically accurate.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
