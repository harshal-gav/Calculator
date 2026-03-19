import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/pyramid-calculator/',
  },
  title: "Pyramid Calculator | Volume & Surface Area",
  description:
    "Free online Pyramid Calculator. Calculate the volume, lateral surface area, total surface area, and slant heights of any rectangular pyramid.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
