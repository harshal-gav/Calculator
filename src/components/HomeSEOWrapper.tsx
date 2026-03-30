'use client';

import dynamic from 'next/dynamic';

const HomeSEO = dynamic(() => import('@/components/HomeSEO'), {
  ssr: false,
  loading: () => (
    <div className="mt-32 border-t border-gray-100 pt-32 pb-64 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-12 bg-gray-200 rounded-xl w-3/4 mb-8" />
        <div className="h-6 bg-gray-100 rounded-lg w-1/2 mb-4" />
        <div className="h-6 bg-gray-100 rounded-lg w-2/3" />
      </div>
    </div>
  ),
});

export default function HomeSEOWrapper() {
  return <HomeSEO />;
}
