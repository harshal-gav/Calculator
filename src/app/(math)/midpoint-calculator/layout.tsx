import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midpoint Calculator | Find the Exact Center Coordinate",
  description:
    "Instantly locate the perfect mathematical center point situated halfway between any two paired Cartesian coordinates, complete with the step-by-step averaging formula. Including specialized USA tools like midpoint calculator.",
  keywords: ["midpoint calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
