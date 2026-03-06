import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter – Live Exchange Rates",
  description:
    "Free Currency Converter. Get live foreign exchange rates for popular global currencies instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
