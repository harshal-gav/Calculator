import { Metadata } from "next";
export const metadata: Metadata = {
  alternates: {
    canonical: '/business-days-calculator/',
  },
  title: "Business Days Calculator - Count Working Days & Exclude Weekends",
  description:
    "Instantly determine the exact number of official working days between two dates by automatically stripping out Saturdays and Sundays. Essential for shipping & finance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
