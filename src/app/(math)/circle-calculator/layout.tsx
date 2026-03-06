import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Circle Geometry Calculator | Radius to Area",
  description:
    "Solve any circle instantly. Enter just one known metric (radius, diameter, circumference, or area) and our calculator will perfectly solve the remaining three. Including specialized USA tools like circle calculator.",
  keywords: ["circle calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
