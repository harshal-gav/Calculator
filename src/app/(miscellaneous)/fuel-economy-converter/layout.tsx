import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/fuel-economy-converter/',
  },
  title: "Fuel Economy Converter - MPG to L/100km",
  description:
    "Free online Fuel Economy Converter. Easily translate gas mileage values between US MPG, UK MPG, L/100km, and km/L for international car specs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
