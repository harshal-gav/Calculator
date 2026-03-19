import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/paycheck-calculator/',
  },
  title: 'Paycheck Calculator | Take Home Pay & Tax Estimator',
  description: 'Estimate your take-home pay after federal and state taxes. Accounts for standard deductions and filing status.',
}

export default function PaycheckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
