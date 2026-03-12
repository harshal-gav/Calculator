const fs = require('fs');
const path = require('path');

const list = {
    "Financial Calculators": [
        "Income Tax Calculator", "House Affordability Calculator", "Estate Tax Calculator", "Social Security Calculator", "Debt Consolidation Calculator", "Student Loan Calculator", "Bond Calculator", "Roth IRA Calculator", "RMD Calculator", "Cash Back or Low Interest Calculator", "Business Loan Calculator", "Real Estate Calculator", "Personal Loan Calculator", "Lease Calculator", "Budget Calculator", "IRR Calculator", "APR Calculator", "VA Mortgage Calculator", "Rent vs. Buy Calculator", "Canadian Mortgage Calculator", "Percent Off Calculator", "Loan Calculator", "Investment Calculator", "401K Calculator", "Marriage Tax Calculator", "Pension Calculator", "Annuity Calculator", "Repayment Calculator", "College Cost Calculator", "CD Calculator", "Mutual Fund Calculator", "IRA Calculator", "Average Return Calculator", "Take-Home-Paycheck Calculator", "Boat Loan Calculator", "Rental Property Calculator", "Down Payment Calculator", "Payback Period Calculator", "Future Value Calculator", "Mortgage Amortization Calculator"
    ],
    "Health Calculators": [
        "Pregnancy Conception Calculator", "Healthy Weight Calculator", "One Rep Max Calculator", "Conception Calculator", "GFR Calculator", "Body Surface Area Calculator", "Anorexic BMI Calculator", "Overweight Calculator", "Pregnancy Weight Gain Calculator", "Army Body Fat Calculator", "Target Heart Rate Calculator", "Fat Intake Calculator", "Period Calculator", "Body Type Calculator", "Weight Watcher Points Calculator"
    ],
    "Math Calculators": [
        "Percent Error Calculator", "Slope Calculator", "Mean, Median, Mode, Range Calculator", "Root Calculator", "Rounding Calculator", "Basic Calculator", "Average Calculator", "Number Sequence Calculator", "Log Calculator", "Sample Size Calculator", "Statistics Calculator", "Permutation and Combination Calculator", "Surface Area Calculator", "Right Triangle Calculator", "Factor Calculator", "Big Number Calculator", "Common Factor Calculator", "Long Division Calculator", "P-value Calculator"
    ],
    "Everyday Life Calculators": [
        "Height Calculator", "Conversion Calculator", "Voltage Drop Calculator", "Square Footage Calculator", "GDP Calculator", "Horsepower Calculator", "Stair Calculator", "Ohms Law Calculator", "Speed Calculator", "Molecular Weight Calculator", "Golf Handicap Calculator", "Tire Size Calculator", "Tile Calculator", "Heat Index Calculator", "Gravel Calculator", "Day Counter", "Date Calculator", "Hours Calculator", "Concrete Calculator", "Bra Size Calculator", "Fuel Cost Calculator", "BTU Calculator", "Engine Horsepower Calculator", "Resistor Calculator", "Electricity Calculator", "Molarity Calculator", "Sleep Calculator", "Roofing Calculator", "Mulch Calculator", "Wind Chill Calculator", "Dew Point Calculator", "Time Duration Calculator", "Day of the Week Calculator"
    ]
};

const srcAppDir = path.join(__dirname, '../src/app');

// Ensure category mapping
const categoryMap = {
    "Financial Calculators": "(financial)",
    "Health Calculators": "(health)",
    "Math Calculators": "(math)",
    "Everyday Life Calculators": "(everyday)"
};

let addedCount = 0;
let existingCount = 0;

const newlyAdded = {
    "Financial Calculators": [],
    "Health Calculators": [],
    "Math Calculators": [],
    "Everyday Life Calculators": []
};

// Check if slug exists in any directory inside app
function existsGlobally(slug) {
    const parentDirs = ['(financial)', '(health)', '(math)', '(everyday)', '(science)', '(miscellaneous)', '(technology)', '(text)'];
    for (const dir of parentDirs) {
        if (fs.existsSync(path.join(srcAppDir, dir, slug))) {
            return true;
        }
    }
    return false;
}

for (const [categoryName, calculators] of Object.entries(list)) {
    const subFolder = categoryMap[categoryName];
    const categoryPath = path.join(srcAppDir, subFolder);

    if (!fs.existsSync(categoryPath)) fs.mkdirSync(categoryPath, { recursive: true });

    for (let calcName of calculators) {
        // Clean name for slug (e.g. Mean, Median, Mode -> mean-median-mode)
        let slug = calcName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Handle "Rent vs. Buy"
        if (calcName === "Rent vs. Buy Calculator") slug = 'rent-vs-buy-calculator';

        if (existsGlobally(slug)) {
            existingCount++;
            continue;
        }

        const calcDir = path.join(categoryPath, slug);
        fs.mkdirSync(calcDir, { recursive: true });

        // Generate layout.tsx
        const layoutContent = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${calcName}',
  description: 'Free online ${calcName} to quickly and accurately solve your calculation needs.',
  keywords: ['${calcName.toLowerCase()}', 'calculator', 'online tool'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
        fs.writeFileSync(path.join(calcDir, 'layout.tsx'), layoutContent);

        // Generate page.tsx
        const pageContent = `'use client';

import CalculatorSEO from '@/components/CalculatorSEO';

export default function Page() {
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-end border-b pb-4 mb-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-blue-900">${calcName}</h1>
                    <p className="mt-2 text-gray-500 text-lg">Quick and easy calculation.</p>
                </div>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-8 min-h-[200px] flex items-center justify-center">
                <p className="text-gray-500">Calculator Interface Coming Soon...</p>
            </div>

            <CalculatorSEO
                title="${calcName}"
                whatIsIt={<p>This ${calcName} is designed to help you quickly assess variables.</p>}
                formula={<p>Results are generated using standard mathematical formulas.</p>}
                example={<p>Enter your inputs into the fields above and click calculate for instant results.</p>}
                useCases={<ul><li>Quickly get accurate answers.</li></ul>}
                faqs={[{ question: "How to use this?", answer: "Input the numbers in the fields above." }]}
                relatedCalculators={[]}
            />
        </div>
    );
}
`;
        fs.writeFileSync(path.join(calcDir, 'page.tsx'), pageContent);

        newlyAdded[categoryName].push({
            name: calcName,
            path: `/${slug}`,
            desc: `Free online ${calcName} for quick calculations.`
        });
        addedCount++;
    }
}

fs.writeFileSync(path.join(__dirname, 'newly-added-calculators.json'), JSON.stringify(newlyAdded, null, 4));

console.log(`Processed 107 Calculators.`);
console.log(`Skipped ${existingCount} that already exist.`);
console.log(`Generated ${addedCount} NEW calculators.`);
console.log(`Saved metadata to scripts/newly-added-calculators.json`);
