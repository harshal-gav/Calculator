import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Storage Converter",
  description:
    "Free online Data Storage Converter. Convert bits, bytes, kilobytes, megabytes, gigabytes, and terabytes instantly.",
  keywords: [
    "currency converter calculator",
    "money conversion calculator",
    "conversion calculator",
    "currency converter online",
    "measurement converter",
    "metric conversion calculator",
    "unit converter",
    "metric converter",
    "unit conversion chart",
    "scale converter",
    "unit conversion calculator",
    "time converter calculator",
    "gpa converter",
    "height converter",
    "julian date converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
