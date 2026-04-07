"use client";

import { useState, useEffect } from "react";

export default function StickyAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    if (hasClosed) return;

    const showAd = () => {
      setIsVisible(true);
      removeEventListeners();
    };

    const removeEventListeners = () => {
      window.removeEventListener("scroll", showAd);
      window.removeEventListener("mousemove", showAd);
      window.removeEventListener("touchstart", showAd);
      window.removeEventListener("keydown", showAd);
    };

    window.addEventListener("scroll", showAd, { passive: true });
    window.addEventListener("mousemove", showAd, { passive: true });
    window.addEventListener("touchstart", showAd, { passive: true });
    window.addEventListener("keydown", showAd, { passive: true });

    // Fallback: Show ad after 2 seconds if no interaction
    const timer = setTimeout(showAd, 2000);

    return () => {
      removeEventListeners();
      clearTimeout(timer);
    };
  }, [hasClosed]);

  if (!isVisible || hasClosed) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[999] flex justify-center pointer-events-none">
      <div className="relative bg-white shadow-[0_-8px_20px_max(0px,rgba(0,0,0,0.1))] border-t border-gray-200 pointer-events-auto flex flex-col items-center w-full max-w-full">
        
        {/* Close banner button */}
        <button 
          onClick={() => {
            setIsVisible(false);
            setHasClosed(true);
          }}
          className="absolute -top-7 right-2 bg-white/90 shadow-[0_-4px_6px_rgba(0,0,0,0.05)] border border-gray-200 border-b-0 text-gray-500 rounded-t-lg px-3 py-1 text-xs font-medium hover:text-gray-800 transition"
          aria-label="Close Advertisement"
        >
          Close Ad
        </button>

        <div className="py-1 flex justify-center w-full">
          {/* Mobile Ad (320x50) */}
          <div className="block md:hidden h-[50px] w-[320px] overflow-hidden">
            <iframe 
              src="/adsterra-mobile.html" 
              width="320" 
              height="50" 
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              title="Advertisement"
              loading="lazy"
            />
          </div>

          {/* Desktop Ad (728x90) */}
          <div className="hidden md:block h-[90px] w-[728px] overflow-hidden">
            <iframe 
              src="/adsterra-desktop.html" 
              width="728" 
              height="90" 
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              title="Advertisement"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
