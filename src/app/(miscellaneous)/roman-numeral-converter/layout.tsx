import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/roman-numeral-converter/',
  },
  title: "Roman Numeral Converter - Translate I, V, X, L, M",
  description:
    "Free online Roman Numeral Converter. Instantly translate Arabic numbers (like 2024) into standard Roman Numerals (MMXXIV) and vice versa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
