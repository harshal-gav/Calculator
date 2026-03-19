import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/cron-job-generator/',
  },
  title: "Cron Job Generator & Expression Builder",
  description:
    "Generate and translate 5-part cron schedule expressions instantly. Understand Linux server timing for automation and repetitive tasks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
