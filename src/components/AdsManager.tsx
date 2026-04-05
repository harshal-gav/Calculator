"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function AdsManager() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setShouldLoad(true);
      removeEventListeners();
    };

    const removeEventListeners = () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    // Fallback: Load ads after 8 seconds if no interaction
    const timer = setTimeout(() => {
      setShouldLoad(true);
      removeEventListeners();
    }, 8000);

    return () => {
      removeEventListeners();
      clearTimeout(timer);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        id="adsterra-social-bar"
        src="https://pl29042747.profitablecpmratenetwork.com/7a/47/fd/7a47fd360cce722626d103ccace5d6f5.js"
        strategy="lazyOnload"
      />
    </>
  );
}

