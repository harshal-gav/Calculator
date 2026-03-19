import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/bmr-calculator/',
  },
  title: "BMR Calculator | Calculate Basal Metabolic Rate",
  description:
    "Free online BMR Calculator. Use the Mifflin-St Jeor equation to exactly calculate your Basal Metabolic Rate and how many calories your body burns at rest. Including specialized USA tools like bmr calculator, basal metabolic rate calculator, bmr calculator to lose weight.",
  keywords: [
    "bmr calculator",
    "basal metabolic rate calculator",
    "bmr calculator to lose weight",
    "bmr formula",
    "resting metabolic rate calculator",
    "metabolic rate calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
