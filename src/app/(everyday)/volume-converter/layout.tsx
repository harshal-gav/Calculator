import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/volume-converter/',
  },
  title: "Volume Converter – Milliliters, Gallons & Cups",
  description:
    "Free Volume Converter. Quickly convert volume measurements between metric, US customary, and Imperial units like liters, gallons, cups, and ounces.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
