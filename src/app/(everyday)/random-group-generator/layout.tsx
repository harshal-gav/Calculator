import { Metadata } from "next";
export const metadata: Metadata = {
  alternates: {
    canonical: '/random-group-generator/',
  },
  title: "Random Group Generator - Unbiased Team & Squad Maker",
  description:
    "Instantly divide a giant list of names, students, or coworkers into perfectly randomized groups or teams. Fast, completely impartial, and fully automated.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
