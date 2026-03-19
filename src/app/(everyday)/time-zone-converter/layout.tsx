import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/time-zone-converter/',
  },
  title: "Time Zone Converter",
  description:
    "Free online Time Zone Converter. Instantly convert specific dates and times across hundreds of global time zones with perfect daylight savings accuracy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
