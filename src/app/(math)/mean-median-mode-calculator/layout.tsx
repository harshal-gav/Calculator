import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mean, Median, & Mode Calculator",
  description:
    "Free online statistical calculator to instantly find the mean, median, mode, and range of any data set.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
