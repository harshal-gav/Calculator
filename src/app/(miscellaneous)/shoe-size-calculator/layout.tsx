import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shoe Size Converter - International Sizing Chart',
    description: 'Free online Shoe Size Converter. Translate footwear sizing instantly between US Men, US Women, UK, EU, and measurement in Centimeters / Japan.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
