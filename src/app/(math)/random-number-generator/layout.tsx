import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator",
  description:
    "Free online random number generator. Generate true random numbers within custom ranges instantly.",
  keywords: ["indices calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
