"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState("100");
  const [taxRate, setTaxRate] = useState("8.5");
  const [isTaxIncluded, setIsTaxIncluded] = useState(false); // i.e. reverse calculation

  const [result, setResult] = useState<{
    grossAmount: number; // Total with tax
    netAmount: number; // Price before tax
    taxAmount: number; // The tax portion
  } | null>(null);

  const calculateTax = () => {
    const p = parseFloat(price) || 0;
    const r = (parseFloat(taxRate) || 0) / 100;

    if (p > 0) {
      if (isTaxIncluded) {
        // Reverse: The $p entered already includes tax
        // Net = Gross / (1 + Rate)
        const net = p / (1 + r);
        const tax = p - net;

        setResult({
          grossAmount: p,
          netAmount: net,
          taxAmount: tax,
        });
      } else {
        // Forward: The $p entered is base price, add tax
        const tax = p * r;
        const gross = p + tax;

        setResult({
          grossAmount: gross,
          netAmount: p,
          taxAmount: tax,
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-900 border-b pb-4">
        Sales Tax Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Quickly add sales tax to an item's price or reverse calculate to find
        the pre-tax cost.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 font-bold text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Sales Tax Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 font-medium text-lg"
            />
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isTaxIncluded}
                onChange={(e) => setIsTaxIncluded(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 font-medium text-sm">
                Reverse Calculate (Extract tax from this total price)
              </span>
            </label>
          </div>

          <button
            onClick={calculateTax}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Tax
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-blue-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
          {result !== null ? (
            <div className="w-full text-center space-y-8">
              <div>
                <h3 className="text-blue-800 font-semibold uppercase tracking-wider text-sm mb-2">
                  {isTaxIncluded
                    ? "Net Price (Before Tax)"
                    : "Total Gross Price"}
                </h3>
                <div className="text-6xl font-black text-gray-900 border-b border-blue-100 pb-4">
                  $
                  {(isTaxIncluded
                    ? result.netAmount
                    : result.grossAmount
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">
                    Base Item Cost
                  </h4>
                  <p className="text-2xl font-bold text-gray-800">
                    $
                    {result.netAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">
                    Tax Portion
                  </h4>
                  <p className="text-2xl font-bold text-blue-700">
                    $
                    {result.taxAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-blue-400 font-medium">
              Enter the price and local tax rate to see the full breakdown
              instantly.
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
            name: "Sales Tax Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Sales Tax Calculator (Forward & Reverse)"
          whatIsIt={
            <>
              <p>
                The <strong>Sales Tax Calculator</strong> allows you to rapidly
                add local sales tax to a sticker price, or perform a{" "}
                <i>reverse extraction</i> to find the original pre-tax base cost
                of an item when you only know the final receipt total.
              </p>
              <p>
                Unlike VAT systems in Europe, retail prices in the United States
                and Canada are almost always displayed "pre-tax". Calculating
                the true out-of-pocket cost requires knowing your local
                municipal tax rate and applying it before reaching the register.
              </p>
            </>
          }
          formula={
            <>
              <p>
                <strong>Standard Calculation (Adding Tax):</strong>
              </p>
              <div className="bg-blue-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-blue-900 border border-blue-100">
                <strong>Gross Total</strong> = Base Price × (1 + [Tax Rate /
                100])
              </div>
              <p className="mt-4">
                <strong>Reverse Extraction (Removing Tax):</strong>
              </p>
              <div className="bg-blue-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-blue-900 border border-blue-100">
                <strong>Base Price</strong> = Gross Total ÷ (1 + [Tax Rate /
                100])
              </div>
            </>
          }
          example={
            <>
              <p>
                <strong>
                  Scenario: Reverse Extraction for Expense Reports
                </strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  You lost your hotel receipt but your credit card shows a total
                  charge of <strong>$162.00</strong>.
                </li>
                <li>
                  You know the local city hotel tax rate is <strong>8%</strong>.
                </li>
                <li>
                  You cannot simply subtract 8% from $162 (which is $149.04)
                  because the tax was calculated on the smaller base number.
                </li>
                <li>
                  By dividing $162.00 by 1.08, the calculator accurately
                  reverse-engineers the base room rate of{" "}
                  <strong>$150.00</strong> and reveals the exact tax paid was{" "}
                  <strong>$12.00</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Corporate Expense Reporting:</strong> Accounting
                departments frequently require employees to itemize the tax
                portion of a meal or flight separately from the base cost.
              </li>
              <li>
                <strong>Large Purchases:</strong> When buying a $40,000 vehicle,
                calculating the exact burden of a 7.5% state auto tax ($3,000)
                to ensure you secure a large enough auto loan.
              </li>
              <li>
                <strong>Business Pricing Strategies:</strong> If you run a
                cash-only food truck and want to charge exactly $10.00 including
                an 8.25% tax, you must use reverse extraction to set your menu
                price at $9.24.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why do some items not have sales tax?",
              answer:
                "Tax nexus logic is incredibly complex and localized. Many states exempt basic necessities like unprepared groceries, prescription medications, or certain clothing items below a specific dollar threshold.",
            },
            {
              question:
                "If I buy online, do I pay my state's tax or the seller's state tax?",
              answer:
                "You generally pay the sales tax rate of the state where the item is physically <i>delivered</i> (your home), assuming the online retailer has 'economic nexus' (does enough business) in your state to be legally required to collect it.",
            },
            {
              question: "What is the difference between Sales Tax and VAT?",
              answer:
                "A Value-Added Tax (VAT) is collected incrementally at every stage of the supply chain (manufacturer to distributor to retailer) and is baked into the sticker price. US Sales Tax is collected only once, entirely at the final retail point of sale, and is added on top of the sticker price.",
            },
          ]}
          relatedCalculators={[
            {
              name: "VAT Calculator",
              path: "/vat-calculator",
              desc: "Calculate Value Added Tax (VAT) used in Europe and most of the world.",
            },
            {
              name: "Discount Calculator",
              path: "/discount-calculator",
              desc: "Apply retail discounts before applying the final sales tax.",
            },
            {
              name: "Markup Calculator",
              path: "/markup-calculator",
              desc: "For business owners setting their initial base retail prices.",
            },
          ]}
        />
      </div>
    </div>
  );
}
