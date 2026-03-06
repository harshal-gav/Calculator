import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cylinder Volume & Surface Area Calculator",
  description:
    "Free online Cylinder Calculator. Instantly calculate the volume, total surface area, lateral area, and base area of any right circular cylinder. Including specialized USA tools like cylinder calculator.",
  keywords: ["cylinder calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
