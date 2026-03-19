import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/distance-calculator/',
  },
  title: "Distance Calculator | 2D Coordinate Point Lengths",
  description:
    "Calculate the exact straight-line distance between two points on an x,y coordinate plane. Step-by-step solutions using the Euclidean distance formula. Including specialized USA tools like distance calculator.",
  keywords: [
    "distance calculator",
    "measure distance google maps",
    "distance calculator map",
    "driving distance calculator",
    "google maps distance calculator",
    "google maps distance",
    "distance map",
    "distance formula",
    "distance formula calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
