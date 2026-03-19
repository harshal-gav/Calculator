import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/arc-length-calculator/',
  },
  title: "Arc Length Calculator – Sector Area & Chord Length",
  description:
    "Free Arc Length Calculator. Instantly calculate arc length, sector area, and chord length of a circle using radius and central angle.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
