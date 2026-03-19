import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/macro-calculator/',
  },
  title: "Macro Calculator | Precision Macronutrient Splitter",
  description:
    "Calculate exact daily gram targets for protein, fat, and carbohydrates. Tailored macro splits for weight loss, muscle gain, keto, and body recomposition. Including specialized USA tools like macro calculator.",
  keywords: ["macro calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
