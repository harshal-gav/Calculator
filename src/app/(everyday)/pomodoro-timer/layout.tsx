import { Metadata } from "next";
export const metadata: Metadata = {
  alternates: {
    canonical: '/pomodoro-timer/',
  },
  title: "Pomodoro Focus Timer - 25 Minute Cycles for Productivity",
  description:
    "Use the classic 25/5 Pomodoro technique to stop procrastinating. Track your focus sessions, manage your breaks, and avoid burnout completely free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
