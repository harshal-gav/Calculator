import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roman Numeral Date Converter – Tattoos & Designs",
  description:
    "Free Roman Numeral Date Converter. Easily convert any modern date into elegant Roman numerals for tattoos, engravings, and aesthetic text designs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
