import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/tdee-calculator/',
  },
  title: "TDEE Calculator | Total Daily Energy Expenditure",
  description:
    "Free online TDEE Calculator. Calculate exactly how many calories your body burns every day based on your BMR and activity level. Including specialized USA tools like tdee calculator.",
  keywords: ["tdee calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
