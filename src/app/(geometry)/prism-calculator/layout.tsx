import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/prism-calculator/',
  },
  title: "Prism Calculator | Volume & Surface Area",
  description:
    "Free online Prism Calculator. Instantly calculate the volume, lateral surface area, and total surface area of any right geometric prism.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
