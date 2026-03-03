import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Carbohydrate Calculator – Daily Carb Intake',
    description: 'Free Carbohydrate Calculator. Find out how many grams of carbs you should eat every day based on your body weight, activity, and goals.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
