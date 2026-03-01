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
        { name: 'Present Value Calculator', path: '/present-value-calculator', desc: 'Calculate the current worth of a future sum of money given a specific expected rate of return.' },
        { name: 'Tip Calculator', path: '/tip-calculator', desc: 'Calculate gratuity instantly, split the bill evenly among your party, and find the exact per-person cost.' },
        { name: 'Margin Calculator', path: '/margin-calculator', desc: 'Calculate gross profit margin, profit dollars, and markup percentage from your cost and revenue.' },
        { name: 'Markup Calculator', path: '/markup-calculator', desc: 'Calculate your final selling price, profit dollars, and derived margin based on your cost and desired markup percentage.' },
        { name: 'VAT Calculator', path: '/vat-calculator', desc: 'Quickly add VAT to a net price or extract VAT from a gross price to find the pre-VAT cost.' },
        { name: 'Break Even Calculator', path: '/break-even-calculator', desc: 'Determine the exact number of units you need to sell to cover your costs and start making a profit.' },
        { name: 'Rent Calculator', path: '/rent-calculator', desc: 'Discover exactly how much rent you can afford based on the 30% rule and your debt-to-income ratio.' },
        { name: 'Debt Payoff Calculator', path: '/debt-payoff-calculator', desc: 'Discover how long it will take to become debt-free and exactly how much interest you will pay.' },
        { name: 'Refinance Calculator', path: '/refinance-calculator', desc: 'Determine if refinancing your mortgage or loan makes financial sense by analyzing your breakeven timeline.' },
        { name: 'FHA Loan Calculator', path: '/fha-loan-calculator', desc: 'Calculate your precise FHA mortgage payment including Upfront MIP, Annual MIP, Taxes, and Insurance.' },
        { name: 'Home Equity Calculator', path: '/home-equity-calculator', desc: 'Discover your total home equity and calculate exactly how much cash you can borrow via a HELOC or Home Equity Loan.' },
        { name: 'Tip Splitting Calculator', path: '/tip-splitting-calculator', desc: 'Quickly calculate the tip and easily divide the total bill among your group.' },
        { name: 'Savings Goal Calculator', path: '/savings-goal-calculator', desc: 'Find out exactly how long it will take to reach your savings goal via monthly contributions.' },
        { name: 'Retirement Calculator', path: '/retirement-calculator', desc: 'Project your retirement nest egg and see if it safely covers your estimated annual expenses.' }
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
        { name: 'Data Converter', path: '/data-converter', desc: 'Convert digital storage units between bits, bytes, kilobytes, megabytes, gigabytes, and more.' },
        { name: 'Age Calculator', path: '/age-calculator', desc: 'Calculate chronological age precisely in years, months, days, weeks, and total days.' },
        { name: 'Area Converter', path: '/area-converter', desc: 'Instantly convert area and land measurements between acres, hectares, square feet, square meters, and more.' },
        { name: 'Energy Converter', path: '/energy-converter', desc: 'Convert energy, work, and heat metrics between Joules, Calories, kWh, BTUs, and Electron-volts.' },
        { name: 'Pressure Converter', path: '/pressure-converter', desc: 'Convert pressure measurements easily between Pascals, PSI, Bar, Atmospheres, and more.' },
        { name: 'Power Converter', path: '/power-converter', desc: 'Convert electrical and mechanical power ratings between Watts, Kilowatts, Horsepower, and BTUs instantly.' },
        { name: 'Love Calculator', path: '/love-calculator', desc: "Enter your name and your crush's name to find out your true compatibility score!" },
        { name: 'Dog Age Calculator', path: '/dog-age-calculator', desc: "Calculate your dog's true age in human years using precise veterinary mathematics." },
        { name: 'Cat Age Calculator', path: '/cat-age-calculator', desc: "Calculate your feline friend's true equivalent age in human years using scientific veterinary guidelines." },
        { name: 'Zodiac Sign Calculator', path: '/zodiac-calculator', desc: "Enter your birth date to instantly discover your astrological sun sign and ruling element." },
        { name: 'Random Password Generator', path: '/password-generator', desc: "Generate secure, highly-randomized passwords using cryptographic standards directly in your browser." },
        { name: 'Grade Calculator', path: '/grade-calculator', desc: 'Calculate your current class grade based on weighted assignments, and see what you need to score on your finals.' },
        { name: 'GPA Calculator', path: '/gpa-calculator', desc: 'Enter your course list, credits, and expected grades to instantly calculate your cumulative Grade Point Average (GPA).' }
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
        { name: 'Pythagorean Calculator', path: '/pythagorean-calculator', desc: 'Calculate the hypotenuse or missing leg of a right triangle with step-by-step arithmetic.' },
        { name: 'Mean Median Mode Calculator', path: '/mean-median-mode-calculator', desc: 'Enter a raw data set to instantly calculate its central tendencies, range, sum, processing count, and sorted order.' },
        { name: 'Probability Calculator', path: '/probability-calculator', desc: 'Calculate the likelihood of single events, independent multi-event scenarios, and associated odds.' },
        { name: 'LCM Calculator', path: '/lcm-calculator', desc: 'Instantly compute the Least Common Multiple (LCM) for a dataset of two or more integers.' },
        { name: 'GCF Calculator', path: '/gcf-calculator', desc: 'Calculates the Greatest Common Factor (also known as the Highest Common Factor) of a dataset of integers.' },
        { name: 'Factorial Calculator', path: '/factorial-calculator', desc: 'Calculate the exact factorial (n!) of any whole number down to its precise individual digits.' }
      ]
    },
    {
      name: 'Technology Calculators',
      calculators: [
        { name: 'Bandwidth Calculator', path: '/bandwidth-calculator', desc: 'Calculate exactly how long it will take to download or upload a file based on your connection speed.' },
        { name: 'IP Subnet Calculator', path: '/ip-subnet-calculator', desc: 'Calculate network boundaries, broadcast addresses, and usable host ranges for IPv4 subnets instantly.' },
        { name: 'RGB to HEX Converter', path: '/rgb-hex-converter', desc: 'Convert colors instantly between Hexadecimal and RGB formats for web development and design.' },
        { name: 'Base64 Converter', path: '/base64-converter', desc: 'Quickly encode text to Base64 format, or decode Base64 strings back into readable text.' },
        { name: 'PX to REM Converter', path: '/px-rem-converter', desc: "Convert CSS pixels (px) to relative root ems (rem) based on your project's root font size." }
      ]
    },
    {
      name: 'Miscellaneous Conversions',
      calculators: [
        { name: 'Cooking Measurement Converter', path: '/cooking-converter', desc: 'Instantly convert recipe volumes and weights between metric and imperial systems.' },
        { name: 'Fuel Economy Converter', path: '/fuel-economy-converter', desc: 'Convert gas mileage values between US MPG, UK MPG, L/100km, and km/L.' },
        { name: 'Roman Numeral Converter', path: '/roman-numeral-converter', desc: 'Convert standard numbers to Roman numerals (I, V, X, L, C, D, M) and vice versa instantly.' },
        { name: 'Word Count Calculator', path: '/word-count-calculator', desc: 'Instantly track words, characters, sentences, and estimated reading time as you type or paste text.' },
        { name: 'Shoe Size Converter', path: '/shoe-size-calculator', desc: 'Instantly convert adult shoe sizes between US (Men/Women), UK, EU, and measurement in Centimeters (CM).' }
      ]
    },
    {
      name: 'Geometry & Shapes',
      calculators: [
        { name: 'Cone Calculator', path: '/cone-calculator', desc: 'Enter the radius and height of a right circular cone to instantly find its volume, surface area, and slant height.' },
        { name: 'Cylinder Calculator', path: '/cylinder-calculator', desc: 'Enter the radius and height of a cylinder to calculate its volume, surface area, and lateral area.' },
        { name: 'Sphere Calculator', path: '/sphere-calculator', desc: 'Enter the radius of a sphere to calculate its volume, surface area, and circumference instantly.' },
        { name: 'Rectangle Calculator', path: '/rectangle-calculator', desc: 'Enter the length and width of a rectangle to instantly find its area, perimeter, and diagonal length.' },
        { name: 'Rhombus Calculator', path: '/rhombus-calculator', desc: 'Enter the two diagonals of a rhombus to instantly calculate its area, side length, and perimeter.' }
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
