import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood Pressure Calculator | AHA Category Checker",
  description:
    "Instantly categorize your blood pressure reading against official AHA guidelines. Calculate your Pulse Pressure and Mean Arterial Pressure (MAP).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
