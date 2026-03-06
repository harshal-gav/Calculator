import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power Converter",
  description:
    "Free online Power Converter. Convert electrical and mechanical power ratings between Watts, Kilowatts, and Horsepower.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
