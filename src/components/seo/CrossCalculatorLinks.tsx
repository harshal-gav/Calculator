import Link from 'next/link';
import registry from '@/data/programmable-registry.json';

export function CrossCalculatorLinks({ currentCalcId }: { currentCalcId: string }) {
  const allIds = Object.keys(registry);
  
  // Pick 6 random tools that are not the current one
  const others = allIds.filter(id => id !== currentCalcId);
  const selected = [];
  
  for (let i = 0; i < 6; i++) {
    if (others.length === 0) break;
    const randIndex = Math.floor(Math.random() * others.length);
    selected.push(others[randIndex]);
    others.splice(randIndex, 1);
  }

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Explore Other Popular Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selected.map((calcId, i) => {
          const config = (registry as any)[calcId];
          return (
            <Link 
              key={i} 
              href={`/${calcId}`} 
              className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {config.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1 capitalize">{config.category}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
