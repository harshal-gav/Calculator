import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number to Words Converter | Convert Digits to English Text",
  description:
    "Free online Number to Words Converter. Instantly translate large numeric digits (up to quintillions) into alphabetical written English words.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
