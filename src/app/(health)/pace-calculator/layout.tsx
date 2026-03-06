import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Running Pace Calculator | Split & Speed Converter",
  description:
    "Calculate the exact running pace per mile or kilometer required to hit your race time goal. Convert target times into precise GPS watch pacing splits. Including specialized USA tools like pace calculator.",
  keywords: ["pace calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
