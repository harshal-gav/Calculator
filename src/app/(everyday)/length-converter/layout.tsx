import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/length-converter/',
  },
  title: "Length Converter",
  description:
    "Free online Length Converter. Instantly convert between metric, imperial, and astronomical units like meters, feet, inches, miles, and kilometers. Including specialized USA tools like length converter.",
  keywords: [
    "length converter",
    "bra size calculator in inches",
    "wavelength calculator",
    "steps to miles calculator",
    "kilometer distance map",
    "length calculator",
    "arc length calculator",
    "arc length formula",
    "circumference to diameter calculator",
    "diameter calculator",
    "miles to km converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
