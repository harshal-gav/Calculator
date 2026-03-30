import { Metadata } from 'next';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export function generateSipMetadata(amount: number, durationYears: number): Metadata {
  const currencyAmount = formatCurrency(amount);
  const duration = durationYears > 1 ? `${durationYears} years` : `${durationYears} year`;
  
  const title = `SIP Calculator for ${currencyAmount} per month for ${duration} | Compute Returns`;
  const description = `Calculate returns for a Systematic Investment Plan (SIP) of ${currencyAmount} over ${duration}. Instantly see maturity amounts, interest earned, and power of compounding.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}
