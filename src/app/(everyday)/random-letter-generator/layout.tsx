import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Letter Generator | Generate Alphabet Characters",
  description:
    "Free online Random Letter Generator. Instantly generate one or multiple random letters from the English alphabet for games, testing, or education.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
