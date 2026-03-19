import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/angle-converter/',
  },
  title: "Angle Converter",
  description:
    "Free online Angle Converter. Instantly convert angles between degrees, radians, gradians, and standard geometrical units.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
