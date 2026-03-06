import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Fat Calculator",
  description:
    "Free online Body Fat Calculator. Estimate your body fat percentage, lean body mass, and fat mass using the highly accurate US Navy tape measurement method. Including specialized USA tools like body fat calculator.",
  keywords: ["body fat calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
