export function calculateSIP(monthlyInvestment: number, investmentPeriodYears: number, expectedAnnualReturnRate: number = 12) {
  const i = expectedAnnualReturnRate / 100 / 12; // Monthly interest rate
  const n = investmentPeriodYears * 12; // Number of months

  // Future Value of SIP formula
  const futureValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const totalInvested = monthlyInvestment * n;
  const estimatedReturns = futureValue - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    futureValue: Math.round(futureValue),
  };
}
