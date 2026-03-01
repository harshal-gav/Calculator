import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      name: 'Financial Calculators',
      calculators: [
        { name: 'Mortgage Calculator', path: '/mortgage-calculator', desc: 'Estimate your monthly mortgage payments including taxes and insurance.' },
        { name: 'Auto Loan Calculator', path: '/auto-loan-calculator', desc: 'Find out how much your monthly car payment will be and total interest paid.' },
        { name: 'Payment Calculator', path: '/payment-calculator', desc: 'Calculate your monthly payments for any type of fixed-term loan.' },
        { name: 'Amortization Calculator', path: '/amortization-calculator', desc: 'View a detailed month-by-month breakdown of your loan payoff schedule.' },
        { name: 'Salary Calculator', path: '/salary-calculator', desc: 'Convert your salary equivalent between hourly, daily, weekly, and annual amounts.' },
        { name: 'Interest Rate Calculator', path: '/interest-rate-calculator', desc: 'Calculate the future accumulated value of an investment with compound interest.' },
        { name: 'ROI Calculator', path: '/roi-calculator', desc: 'Calculate your exact Return on Investment and Annualized ROI over any timeframe.' },
        { name: 'Compound Interest Calculator', path: '/compound-interest-calculator', desc: 'Discover how your savings and investments will grow over time through compound interest.' },
        { name: 'Investment Calculator', path: '/investment-calculator', desc: 'Forecast the long term growth of your investment portfolio and estimate future tax liabilities.' },
        { name: 'Auto Lease Calculator', path: '/auto-lease-calculator', desc: 'Calculate your exact monthly car lease payment including depreciation, rent charges, and sales tax.' },
        { name: 'Present Value Calculator', path: '/present-value-calculator', desc: 'Calculate the current worth of a future sum of money given a specific expected rate of return.' }
      ]
    },
    {
      name: 'Health Calculators',
      calculators: [
        { name: 'BMI Calculator', path: '/bmi-calculator', desc: 'Find out your Body Mass Index and see if you are at a healthy weight.' },
        { name: 'Calorie Calculator', path: '/calorie-calculator', desc: 'Estimate the number of calories you need to consume daily to maintain, lose, or gain weight.' },
        { name: 'Body Fat Calculator', path: '/body-fat-calculator', desc: 'Estimate your body fat percentage using the accurate US Navy tape measurement method.' },
        { name: 'Pregnancy Calculator', path: '/pregnancy-calculator', desc: 'Calculate your estimated due date, conception date, and see your current trimester timeline.' },
        { name: 'Ideal Weight Calculator', path: '/ideal-weight-calculator', desc: 'Discover your medically recommended ideal body weight based on multiple scientific formulas.' },
        { name: 'TDEE Calculator', path: '/tdee-calculator', desc: 'Calculate your Total Daily Energy Expenditure (TDEE), the exact calories your body burns per day.' },
        { name: 'BMR Calculator', path: '/bmr-calculator', desc: 'Calculate your Basal Metabolic Rate — the exact number of calories your body burns while at complete rest.' },
        { name: 'Pace Calculator', path: '/pace-calculator', desc: 'Calculate your running pace and speed per kilometer and per mile based on race distance and time.' },
        { name: 'Blood Pressure Calculator', path: '/blood-pressure-calculator', desc: 'Input your blood pressure reading to immediately classify your cardiovascular health status.' },
        { name: 'Macro Calculator', path: '/macro-calculator', desc: 'Discover exactly how many grams of protein, fats, and carbs you should eat per day based on your dietary goals.' },
        { name: 'Lean Body Mass Calculator', path: '/lean-body-mass-calculator', desc: 'Calculate the exact weight of your body minus all fat content using three different scientific formulas.' }
      ]
    },
    {
      name: 'Everyday Life Calculators',
      calculators: [
        { name: 'Date Calculator', path: '/date-calculator', desc: 'Calculate the exact duration between two dates in years, months, and days.' },
        { name: 'Time Calculator', path: '/time-calculator', desc: 'Add or subtract blocks of time easily in hours, minutes, and seconds.' },
        { name: 'Inflation Calculator', path: '/inflation-calculator', desc: 'Calculate how inflation impacts the future cost of goods and purchasing power.' },
        { name: 'Sales Tax Calculator', path: '/sales-tax-calculator', desc: 'Quickly add sales tax to an item\'s price or reverse calculate to find pre-tax cost.' },
        { name: 'Discount Calculator', path: '/discount-calculator', desc: 'Calculate your final price and exact savings after single or stacked store discounts.' },
        { name: 'Length Converter', path: '/length-converter', desc: 'Instantly convert between metric, imperial, and astronomical units of length.' },
        { name: 'Weight Converter', path: '/weight-converter', desc: 'Convert accurately between all major metric and imperial units of mass.' },
        { name: 'Temperature Converter', path: '/temperature-converter', desc: 'Instantly convert degrees between Celsius, Fahrenheit, and Kelvin scales.' },
        { name: 'Speed Converter', path: '/speed-converter', desc: 'Convert velocity and speed measurements across metric, imperial, and nautical scales.' },
        { name: 'Data Converter', path: '/data-converter', desc: 'Convert digital storage units between bits, bytes, kilobytes, megabytes, gigabytes, and more.' }
      ]
    },
    {
      name: 'Math Calculators',
      calculators: [
        { name: 'Scientific Calculator', path: '/scientific-calculator', desc: 'A comprehensive free online scientific calculator.' },
        { name: 'Percentage Calculator', path: '/percentage-calculator', desc: 'Easily calculate percentages for multiple math use-cases.' },
        { name: 'Fraction Calculator', path: '/fraction-calculator', desc: 'Add, subtract, multiply, and divide fractions with step-by-step simplification.' },
        { name: 'Random Number Generator', path: '/random-number-generator', desc: 'Generate true random numbers instantly within a custom range.' },
        { name: 'Volume Calculator', path: '/volume-calculator', desc: 'Calculate the internal volume of common 3D geometric shapes.' },
        { name: 'Standard Deviation Calculator', path: '/standard-deviation-calculator', desc: 'Calculate the standard deviation, variance, mean, and sum of a data set.' },
        { name: 'Binary Calculator', path: '/binary-calculator', desc: 'Perform addition, subtraction, division, and logical operations on binary numbers.' },
        { name: 'Area Calculator', path: '/area-calculator', desc: 'Find the surface area of rectangles, squares, triangles, and circles.' },
        { name: 'Triangle Calculator', path: '/triangle-calculator', desc: 'Calculate the area, perimeter, and internal angles of any valid triangle.' },
        { name: 'Circle Calculator', path: '/circle-calculator', desc: 'Input any single metric to instantly calculate the radius, diameter, circumference, and area.' },
        { name: 'Perimeter Calculator', path: '/perimeter-calculator', desc: 'Calculate the total perimeter of 2D shapes including random polygons.' },
        { name: 'Pythagorean Calculator', path: '/pythagorean-calculator', desc: 'Calculate the hypotenuse or missing leg of a right triangle with step-by-step arithmetic.' }
      ]
    }
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Free Online Calculators
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Calculators All offers a wide selection of free, fast, and highly accurate online calculators to help you with math, finance, health, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.name} id={cat.name.split(' ')[0].toLowerCase()} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition scroll-mt-24">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{cat.name}</h2>
            <ul className="space-y-4">
              {cat.calculators.map((calc) => (
                <li key={calc.name} className="bg-white p-4 rounded border border-gray-200 hover:border-blue-300 transition">
                  <Link href={calc.path} className="block group">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">{calc.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{calc.desc}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
