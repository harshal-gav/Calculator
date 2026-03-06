"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function InvestmentCalculator() {
  const [startingBalance, setStartingBalance] = useState("25000");
  const [annualContribution, setAnnualContribution] = useState("6000");
  const [expectedReturn, setExpectedReturn] = useState("8"); // %
  const [investmentYears, setInvestmentYears] = useState("20");

  const [taxRate, setTaxRate] = useState("15"); // Expected capital gains or income tax

  const [result, setResult] = useState<{
    grossFutureValue: number;
    taxesowed: number;
    netFutureValue: number;
    totalContributions: number;
  } | null>(null);

  const calculateInvestment = () => {
    const P = parseFloat(startingBalance) || 0;
    const C = parseFloat(annualContribution) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100;
    const years = parseInt(investmentYears) || 0;
    const tax = (parseFloat(taxRate) || 0) / 100;

    if (years > 0) {
      // Future Value of Initial Balance
      let A1 = P * Math.pow(1 + r, years);

      // Future Value of Annual Contributions (assuming end of year)
      let A2 = 0;
      if (r > 0 && C > 0) {
        A2 = C * ((Math.pow(1 + r, years) - 1) / r);
      } else if (r === 0) {
        A2 = C * years;
      }

      const grossValue = A1 + A2;
      const totalPrincipal = P + C * years;
      const rawGains = grossValue - totalPrincipal;

      const estimatedTaxes = rawGains * tax;
      const netValue = grossValue - estimatedTaxes;

      setResult({
        grossFutureValue: grossValue,
        taxesowed: estimatedTaxes,
        netFutureValue: netValue,
        totalContributions: totalPrincipal,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-slate-800 border-b pb-4">
        Investment Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Forecast the long term growth of your investment portfolio and estimate
        future tax liabilities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Starting Balance ($)
            </label>
            <input
              type="number"
              value={startingBalance}
              onChange={(e) => setStartingBalance(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-bold text-xl"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Annual Additions ($)
              </label>
              <input
                type="number"
                value={annualContribution}
                onChange={(e) => setAnnualContribution(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-medium"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Years to Grow
              </label>
              <input
                type="number"
                value={investmentYears}
                onChange={(e) => setInvestmentYears(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-medium"
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 mt-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Expected Return Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-bold"
            />
            <p className="text-xs text-slate-500 mt-1">
              S&P 500 historical average is ~10% before inflation.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Estimated Tax Rate on Gains (%)
            </label>
            <input
              type="number"
              step="1"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-medium"
            />
            <p className="text-xs text-slate-500 mt-1">
              E.g., 15% long-term Capital Gains.
            </p>
          </div>

          <button
            onClick={calculateInvestment}
            className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl hover:bg-slate-900 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Project Investment
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result !== null ? (
            <>
              <div className="p-8 pb-4 text-center">
                <h3 className="text-slate-800 font-bold uppercase tracking-widest text-sm mb-2">
                  Net Portfolio Value (After Taxes)
                </h3>
                <div className="text-5xl font-black text-slate-900 tracking-tight text-green-700">
                  $
                  {result.netFutureValue.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>

              <div className="p-6 bg-slate-50 space-y-4 border-t border-slate-200 flex-grow">
                <div className="flex justify-between items-center pb-3 border-b border-white">
                  <span className="text-slate-600 font-semibold text-sm">
                    Gross Future Value
                  </span>
                  <span className="font-bold text-slate-800">
                    $
                    {result.grossFutureValue.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white">
                  <span className="text-slate-600 font-semibold text-sm">
                    Total Principal Invested
                  </span>
                  <span className="font-bold text-slate-800">
                    $
                    {result.totalContributions.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                  <span className="text-red-800 font-bold text-sm tracking-wide uppercase">
                    Taxes Owed
                  </span>
                  <span className="font-black text-red-600">
                    -$
                    {result.taxesowed.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8 text-slate-400 font-medium leading-relaxed">
              Dial in your initial capital, yearly injections, and expected
              returns to forecast your wealth building journey.
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Investment Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Investment Calculator & Tax Forecaster"
        whatIsIt={
          <>
            <p>
              Our <strong>Investment Calculator</strong> is a comprehensive
              wealth-projection tool that goes beyond standard compounding
              equations by adding the real-world friction of{" "}
              <strong>taxes</strong>. It allows you to model both an initial
              starting sum and ongoing annual contributions to see exactly how
              large your portfolio will grow over decades.
            </p>
            <p>
              Unlike basic calculators that give you an unrealistic "Gross
              Value," this tool requires you to input an estimated capital gains
              tax rate. This allows you to see the exact "Net Value" (take-home
              cash) you can expect to pull out of the market when you finally
              sell your assets.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Investment Calculator, Investment
              Return Calculator, Investment Growth Calculator, Stock Calculator,
              Cagr Calculator, Roi Formula, Growth Chart Calculator, Return On
              Investment Formula, Stock Profit Calculator, Share Calculator,
              Cagr Formula, Stock Average Calculator, Growth Calculator, Growth
              Rate Calculator, Compound Annual Growth Rate
            </p>
          </>
        }
        formula={
          <>
            <p>
              This calculator merges the Future Value of a Lump Sum formula with
              the Future Value of an Annuity formula, and then subtracts
              calculated taxes from the total raw capital gains.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg font-mono text-center text-[14px] shadow-sm my-4 flex flex-col gap-2 border border-slate-200 text-slate-900">
              <p>
                <strong>1. Gross Value</strong> = [ P(1 + r)<sup>t</sup> ] + [ C
                × ((1 + r)<sup>t</sup> - 1) ÷ r ]
              </p>
              <p>
                <strong>2. Principle</strong> = P + (C × t)
              </p>
              <p>
                <strong>3. Net Value</strong> = Gross Value - [(Gross Value -
                Principle) × Tax Rate]
              </p>
            </div>
          </>
        }
        example={
          <>
            <p>
              Let's assume you start with <strong>$25,000</strong> in an index
              fund. You commit to adding <strong>$6,000 every year</strong> for
              exactly <strong>20 years</strong>. You expect an{" "}
              <strong>8% annual return</strong> and a{" "}
              <strong>15% Capital Gains Tax</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
              <li>
                <strong>Step 1 (Raw Growth):</strong> Your $25,000 grows. Plus,
                your 20 payments of $6,000 ($120k total) grow. The total Gross
                Value becomes roughly <strong>$392,500</strong>.
              </li>
              <li>
                <strong>Step 2 (Identify Gains):</strong> Your out-of-pocket
                principle was $145,000 ($25k + $120k). Therefore, your pure
                "Taxable Gains" are exactly <strong>$247,500</strong>.
              </li>
              <li>
                <strong>Step 3 (Calculate Tax):</strong> 15% of $247,500 is
                roughly <strong>$37,125</strong> owed to the IRS.
              </li>
              <li>
                <strong>Result:</strong> When you sell, your final net take-home
                cash is exactly <strong>$355,375</strong>.
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-slate-700">
            <li>
              <strong>Standard Brokerage Planning:</strong> Calculating the
              after-tax yield of a standard taxable brokerage account (like
              Robinhood or Fidelity) where you are legally required to pay
              long-term capital gains tax upon sale.
            </li>
            <li>
              <strong>Real Estate Modeling:</strong> Projecting the future sale
              value of a rental property (including the initial down-payment and
              annual principal paydown) and factoring in property sale taxes.
            </li>
            <li>
              <strong>Comparing Tax-Advantaged Accounts:</strong> Modeling
              investments inside a standard account (with tax) versus a Roth IRA
              (0% tax rate) to visually see how many tens of thousands of
              dollars taxes eat over 30 years.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "Why should I include 'Annual Additions'?",
            answer:
              "Very few people invest a single lump sum and never touch it again. 'Dollar-Cost Averaging' (investing a set amount of money every single year regardless of market conditions) is the mathematically proven, safest way to build long-term wealth, drastically reducing the impact of market crashes.",
          },
          {
            question: "What is a realistic 'Expected Return' to use?",
            answer:
              "Over the last century, the US Stock Market (S&P 500) has returned an average of about 10% per year before inflation. If you want to calculate 'Real Returns' (purchasing power in today's money), subtract average inflation (3%) and use a 7% expected return in the calculator.",
          },
          {
            question: "How do I estimate my Tax Rate?",
            answer:
              "If you hold a stock for less than a year in the US, it is taxed as standard income (anywhere from 10% to 37%). If you hold it for over a year, it qualifies for Long-Term Capital Gains tax, which generally sits at 15% for the vast majority of middle-class earners.",
          },
        ]}
        relatedCalculators={[
          {
            name: "ROI Calculator",
            path: "/roi-calculator",
            desc: "Calculate your exact annualized percentage returns on recent sales.",
          },
          {
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator",
            desc: "Project future investment growth using recursive compound interest.",
          },
          {
            name: "Savings Goal Calculator",
            path: "/savings-goal-calculator",
            desc: "Figure out exactly how much you need to save each month to hit a target.",
          },
        ]}
      />
    </div>
  );
}
