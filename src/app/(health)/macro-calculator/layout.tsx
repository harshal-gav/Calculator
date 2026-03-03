import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Macro Calculator | Precision Macronutrient Splitter',
    description: 'Calculate exact daily gram targets for protein, fat, and carbohydrates. Tailored macro splits for weight loss, muscle gain, keto, and body recomposition.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
