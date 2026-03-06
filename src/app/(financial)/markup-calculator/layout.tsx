import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markup Calculator",
  description:
    "Free online markup calculator. Determine gross profit, required selling price, and derive margin from cost and markup percentage. Including specialized USA tools like markup calculator.",
  keywords: ["markup calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
