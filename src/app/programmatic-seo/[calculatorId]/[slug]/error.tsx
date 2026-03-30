"use client" // Error boundaries must be client components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Programmatic SEO Generate Error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We couldn't generate the calculator for this specific scenario. Please verify the URL parameters or try returning to our main list of calculators.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Try again
        </button>
        <a 
          href="/programmatic-seo/sip"
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
        >
          View all SIP Calculators
        </a>
      </div>
    </div>
  )
}
