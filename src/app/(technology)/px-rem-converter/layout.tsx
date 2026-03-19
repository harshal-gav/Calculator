import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/px-rem-converter/',
  },
  title: "PX to REM Converter - CSS Unit Calculator",
  description:
    "Free online PX to REM Converter. Convert CSS pixels to relative ems based on your projects root font size for responsive mobile-first web design.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
