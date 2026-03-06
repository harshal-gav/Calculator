import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parallelogram Calculator | Area & Perimeter",
  description:
    "Free online Parallelogram Calculator. Calculate the exact area and perimeter of any parallelogram using base, height, and side length.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
