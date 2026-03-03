import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cooking Measurement Converter - Volume & Weight',
    description: 'Free online Cooking Measurement Converter. Instantly convert recipe volumes and weights between metric and imperial systems like cups, tablespoons, grams, and ounces.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
