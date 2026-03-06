import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LCM Calculator",
  description:
    "Free online Least Common Multiple (LCM) Calculator. Find the lowest common multiple of two or more numbers instantly. Including specialized USA tools like lcm calculator.",
  keywords: ["lcm calculator", "least common multiple calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
