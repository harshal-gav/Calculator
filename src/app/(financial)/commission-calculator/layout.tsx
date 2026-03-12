import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commission Calculator | Sales Commission & Bonus',
  description: 'Calculate sales commissions, tiered bonus structures, and total earnings. Perfect for sales teams and professionals.',
}

export default function CommissionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
