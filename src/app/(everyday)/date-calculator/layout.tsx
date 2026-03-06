import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Calculator",
  description:
    "Free online Date Calculator. Discover the exact duration between two dates, or add/subtract days, weeks, and months from a specific date. Including specialized USA tools like date calculator.",
  keywords: [
    "date calculator",
    "time clock calculator",
    "work time calculator",
    "overtime calculator",
    "day counter",
    "time value of money calculator",
    "time calculator minutes",
    "time difference calculator",
    "time and a half calculator",
    "time zone calculator",
    "business day calculator",
    "year calculator",
    "month calculator",
    "working days calculator",
    "90 day calculator",
    "calculate number of days",
    "date and time calculator",
    "date calculator online",
    "date counter",
    "date difference calculator",
    "date duration calculator",
    "date range calculator",
    "date time calculator",
    "date to date calculator",
    "day to day calculator",
    "days since calculator",
    "days until calculator",
    "elapsed time calculator",
    "no of days calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
