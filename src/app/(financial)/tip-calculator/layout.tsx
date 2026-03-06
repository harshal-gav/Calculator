import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator",
  description:
    "Free online tip and gratuity calculator. Easily calculate tips, total bills, and evenly split costs among a group. Including specialized USA tools like tip calculator.",
  keywords: [
    "tip calculator",
    "electricity bill calculator",
    "multiplication calculator",
    "matrix multiplication calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
