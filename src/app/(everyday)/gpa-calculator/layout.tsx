import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/gpa-calculator/',
  },
  title: "GPA Calculator – College & High School",
  description:
    "Free cumulative GPA Calculator. Easily calculate your Grade Point Average from credits and letter grades for college or high school. Including specialized USA tools like gpa calculator.",
  keywords: ["gpa calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
