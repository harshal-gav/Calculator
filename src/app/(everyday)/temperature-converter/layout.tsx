import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/temperature-converter/',
  },
  title: "Temperature Converter",
  description:
    "Free online Temperature Converter. Instantly convert degrees between Celsius (°C), Fahrenheit (°F), and Kelvin (K) scales.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
