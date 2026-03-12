import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profit Calculator | Calculate Gross Profit & Margin',
  description: 'Calculate gross profit, net profit, and profit margins based on cost and revenue. Professional tool for business pricing and analysis.',
}

export default function ProfitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
