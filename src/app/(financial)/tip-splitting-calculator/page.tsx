"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function TipSplittingCalculator() {
  const [billAmount, setBillAmount] = useState("100");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [numberOfPeople, setNumberOfPeople] = useState("4");

  const bill = parseFloat(billAmount);
  const tip = parseFloat(tipPercentage);
  const people = parseInt(numberOfPeople, 10);

  let totalTip = 0;
  let totalBill = 0;
  let tipPerPerson = 0;
  let totalPerPerson = 0;
  let isValid = false;

  if (
    !isNaN(bill) &&
    !isNaN(tip) &&
    !isNaN(people) &&
    bill >= 0 &&
    tip >= 0 &&
    people > 0
  ) {
    isValid = true;
    totalTip = bill * (tip / 100);
    totalBill = bill + totalTip;
    tipPerPerson = totalTip / people;
    totalPerPerson = totalBill / people;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-sky-50 rounded-xl shadow-lg border border-sky-100">
      <h1 className="text-4xl font-extrabold mb-4 text-sky-900 border-b pb-4 flex items-center">
        <span className="mr-3">🧾</span> Tip Splitting Calculator
      </h1>
      <p className="mb-8 text-sky-700 text-lg">
        Quickly calculate the tip and easily divide the total bill among your
        group.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div className="bg-white p-6 rounded-xl border border-sky-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2">
              Total Bill Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-500 font-bold">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full rounded-xl border-sky-200 pl-8 p-3 shadow-inner focus:border-sky-500 font-bold text-xl text-slate-800 bg-sky-50"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2 flex justify-between">
              <span>Tip Percentage (%)</span>
              <span className="text-sky-600 font-black">{tipPercentage}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => setTipPercentage("10")}
                className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200"
              >
                10%
              </button>
              <button
                onClick={() => setTipPercentage("15")}
                className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200"
              >
                15%
              </button>
              <button
                onClick={() => setTipPercentage("18")}
                className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200"
              >
                18%
              </button>
              <button
                onClick={() => setTipPercentage("20")}
                className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200"
              >
                20%
              </button>
              <button
                onClick={() => setTipPercentage("25")}
                className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200"
              >
                25%
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2 flex justify-between">
              <span>Number of People</span>
              <span className="text-sky-600 font-black">
                {numberOfPeople} 👤
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>
        </div>

        {/* Results breakdown */}
        <div className="bg-sky-900 border border-sky-800 rounded-xl p-6 md:p-8 flex flex-col justify-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-48 w-48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          {isValid ? (
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-end border-b border-sky-700 pb-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-sky-300">
                    Total Tip
                  </div>
                  <div className="text-2xl font-black">
                    ${totalTip.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-widest text-sky-300">
                    Total Bill
                  </div>
                  <div className="text-2xl font-black">
                    ${totalBill.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="bg-sky-800 p-6 rounded-xl border border-sky-700 shadow-inner text-center">
                <div className="text-sm font-bold uppercase tracking-widest text-sky-300 mb-2">
                  Amount Per Person
                </div>
                <div className="text-5xl font-black text-white flex items-center justify-center">
                  <span className="text-3xl font-bold text-sky-400 mr-1">
                    $
                  </span>
                  {totalPerPerson.toFixed(2)}
                </div>
                <div className="text-sm mt-3 text-sky-200">
                  (Includes ${(totalTip / people).toFixed(2)} tip)
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 text-center text-sky-300 font-medium italic">
              Awaiting valid input...
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Tip Splitting Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Restaurant Tip & Bill Splitting Calculator"
          whatIsIt={
            <p>
              The <strong>Tip Splitting Calculator</strong> is a fast,
              highly-practical everyday utility perfect for dining out with
              groups. By inputting the total receipt amount, selecting a
              standard gratuity percentage, and specifying the party size, it
              instantly calculates the exact dollar amount each person needs to
              contribute to cover both the meal and the tip fairly.
            </p>
          }
          formula={
            <>
              <p>
                This calculator utilizes basic percentage multiplication
                combined with straightforward divisional fractions to ensure
                every penny is accounted for among the group.
              </p>
              <div className="bg-sky-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-sky-100 text-sky-900">
                <p>
                  <strong>Total Gratuity = Bill Amount × (Tip % ÷ 100)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-sky-200">
                  <strong>Final Bill = Bill Amount + Total Gratuity</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-sky-200">
                  <strong>
                    Per Person Share = Final Bill ÷ Number of People
                  </strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Imagine four friends go out for an expensive steak dinner and
                want to split the check evenly.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-sky-800">
                <li>
                  <strong>The Input:</strong> The food receipt is $185.00. The
                  service was excellent, so they agree on a 20% tip. The party
                  size is 4.
                </li>
                <li>
                  <strong>The Gratuity Math:</strong> 20% of $185.00 is exactly
                  $37.00.
                </li>
                <li>
                  <strong>The Total:</strong> The Final Bill on the table is
                  $185.00 + $37.00 = $222.00.
                </li>
                <li>
                  <strong>The Split:</strong> $222.00 ÷ 4 people.
                </li>
                <li>
                  <strong>The Result:</strong> Everyone drops exactly{" "}
                  <strong>$55.50</strong> onto the table. Done!
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-sky-800">
              <li>
                <strong>Large Group Dinners:</strong> Eliminating the awkward
                "mental math" phase at the end of a long birthday dinner when
                the server refuses to split the check onto 8 different credit
                cards.
              </li>
              <li>
                <strong>Delivery Orders:</strong> Quickly determining exactly
                how much your roommates owe you via Venmo/Zelle after you put
                the entire $65 pizza and wings delivery (plus driver tip) on
                your own card.
              </li>
              <li>
                <strong>Ride Shares & Taxis:</strong> Splitting the total cost
                of an Uber XL ride from the airport, ensuring the driver's tip
                is factored into the final split cost among friends.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Should I calculate the tip before or after tax?",
              answer:
                "Etiquette experts generally agree that tipping is meant to reflect the service provided on the food/drinks ordered, not a tax levied by the government. Strictly speaking, you should tip on the PRE-TAX subtotal. However, tipping on the post-tax total is incredibly common and always appreciated by servers.",
            },
            {
              question: "What is considered a standard tip amount?",
              answer:
                "In the United States, 15% is traditionally the minimum for standard sit-down service, 18% is expected for good service, and 20%+ is awarded for exceptional service. For food delivery drivers, 10-15% or a flat $3-$5 is customary.",
            },
            {
              question: "What if someone ordered way more food than me?",
              answer:
                "This calculator performs a rigid 'even split'. If one person ordered a $40 steak and you ordered a $10 salad, it is generally much fairer to just calculate a flat 20% on top of your individual food items and pay exactly that amount.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Tip Calculator",
              path: "/tip-calculator",
              desc: "A simpler interface when you only need gratuity without splitting.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator",
              desc: "For manual percentage math and reverse engineering totals.",
            },
            {
              name: "Fraction to Decimal",
              path: "/fraction-to-decimal-calculator",
              desc: "Helpful for splitting uneven bills (e.g., paying 1/3 of the tab).",
            },
          ]}
        />
      </div>
    </div>
  );
}
