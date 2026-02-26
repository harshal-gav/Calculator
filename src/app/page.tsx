import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      name: 'Financial Calculators',
      calculators: [
        { name: 'Mortgage Calculator', path: '/financial/mortgage-calculator', desc: 'Estimate your monthly mortgage payments including taxes and insurance.' }
      ]
    },
    {
      name: 'Health Calculators',
      calculators: [
        { name: 'BMI Calculator', path: '/health/bmi-calculator', desc: 'Find out your Body Mass Index and see if you are at a healthy weight.' }
      ]
    },
    {
      name: 'Math Calculators',
      calculators: [
        { name: 'Scientific Calculator', path: '/math/scientific-calculator', desc: 'A comprehensive free online scientific calculator.' },
        { name: 'Percentage Calculator', path: '/math/percentage-calculator', desc: 'Easily calculate percentages for multiple math use-cases.' }
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
          Calculator.net offers a wide selection of free, fast, and highly accurate online calculators to help you with math, finance, health, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.name} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
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
