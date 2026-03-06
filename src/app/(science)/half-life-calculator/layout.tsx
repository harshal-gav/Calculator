import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Half-Life Calculator – Radioactive Decay",
  description:
    "Free Half-Life Calculator. Compute the remaining amount, elapsed time, initial amount, or half-life decay rate of radioactive materials.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
