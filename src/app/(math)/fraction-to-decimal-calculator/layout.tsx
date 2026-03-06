import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fraction to Decimal Calculator | Convert Percentages Instantly",
  description:
    "Instantly convert any mathematical fraction into a decimal number and percentage equivalent. Fast and accurate educational conversion tool. Including specialized USA tools like fraction to decimal calculator.",
  keywords: ["fraction to decimal calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
