import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/calorie-calculator/',
  },
  title: "Calorie Calculator",
  description:
    "Free online Calorie Calculator. Estimate your TDEE (Total Daily Energy Expenditure) and find out exactly how many calories you need to lose, maintain, or gain weight. Including specialized USA tools like calorie deficit calculator, calorie calculator, calorie calculator to lose weight.",
  keywords: [
    "calorie deficit calculator",
    "calorie calculator",
    "calorie calculator to lose weight",
    "macro calculator for weight loss",
    "calorie intake calculator",
    "keto macro calculator",
    "keto calculator",
    "tdee",
    "free macro calculator",
    "maintenance calorie calculator",
    "protein intake calculator",
    "calorie calculator to gain weight",
    "macronutrient calculator",
    "iifym calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
