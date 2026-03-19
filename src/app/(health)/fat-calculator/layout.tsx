import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/fat-calculator/',
  },
  title: "Fat Calculator – Daily Dietary Fat Target",
  description:
    "Free Dietary Fat Calculator. Calculate the optimal amount of grams of fat you should consume daily for keto, low fat, or standard diets. Including specialized USA tools like fat calculator.",
  keywords: ["fat calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
