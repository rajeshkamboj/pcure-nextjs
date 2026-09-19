"use client";

import { useEffect, useRef } from "react";

interface AdSenseProps {
  slot: string;
  className?: string;
}

export default function AdSense({
  slot,
  className = "",
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const adElement = adRef.current;

    if (!adElement) {
      return;
    }

    // Prevent AdSense from being initialized more than once
    // on the same <ins> element.
    if (adElement.innerHTML.trim() !== "") {
      return;
    }

    try {
      ((window as any).adsbygoogle =
        (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}