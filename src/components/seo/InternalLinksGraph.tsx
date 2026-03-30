import Link from 'next/link';

export function InternalLinksGraph({ currentAmount, currentDuration }: { currentAmount: number, currentDuration: number }) {
  // Logic to build variations near the current parameters for SEO clustering 
  // (e.g. if 10k 5 yr, suggest 15k 5 yr, or 10k 10 yr)
  
  const related = [
    { label: `${currentAmount + 5000} For ${currentDuration} Years`, slug: `${currentAmount + 5000}-${currentDuration}-years` },
    { label: `${currentAmount} For ${currentDuration + 5} Years`, slug: `${currentAmount}-${currentDuration + 5}-years` },
    { label: `${currentAmount * 2} For ${currentDuration} Years`, slug: `${currentAmount * 2}-${currentDuration}-years` },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore Related </h3>
      <div className="flex flex-wrap gap-4">
        {related.map((node, i) => (
          <Link 
            key={i} 
            href={`/programmatic-seo/sip/${node.slug}`} 
            className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-full font-medium transition-colors"
          >
            {node.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
