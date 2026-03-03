import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projectile Motion Calculator | Flight Trajectories',
    description: 'Calculate exact kinematic trajectories, maximum height, horizontal range, and flight time of objects launched with initial velocity and angle.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
