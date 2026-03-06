import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kinetic Energy Calculator – Joules & Mass",
  description:
    "Free Kinetic Energy Calculator. Solve for kinetic energy in Joules, mass in kilograms, or velocity in meters per second for objects in motion.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
