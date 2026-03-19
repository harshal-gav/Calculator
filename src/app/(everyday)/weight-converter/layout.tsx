import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/weight-converter/',
  },
  title: "Weight Converter",
  description:
    "Free online Weight and Mass Converter. Convert accurately between kilograms, pounds, ounces, grams, tons, and stones.",
  keywords: [
    "weight loss calculator",
    "weight calculator",
    "overweight calculator",
    "healthy weight calculator",
    "weight watchers points calculator",
    "weight gain calculator",
    "ideal weight for height",
    "ideal body weight calculator",
    "body weight calculator",
    "dollars to pounds converter",
    "dollars to pounds calculator",
    "pounds to dollars calculator",
    "ideal weight chart",
    "weight conversion",
    "ideal body weight",
    "height weight calculator",
    "height and weight calculator",
    "stone calculator",
    "pounds to dollars conversion",
    "material weight calculator",
    "dog weight calculator",
    "weight conversion calculator",
    "english pounds to dollars",
    "weighted gpa calculator",
    "pipe weight calculator",
    "british pounds to dollars",
    "1 pounds to dollars",
    "ideal body weight formula",
    "kg to pounds converter",
    "pound to kg converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
