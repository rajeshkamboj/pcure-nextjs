"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AdSenseProps {
  slot: string;
  className?: string;
  /**
   * Space (px) reserved for the ad so the article does not jump when the ad
   * renders (Cumulative Layout Shift). Roughly the height of a responsive
   * mobile display unit.
   */
  minHeight?: number;
}

/**
 * A single AdSense display unit. The adsbygoogle.js loader itself is injected
 * once, site-wide, from app/layout.tsx (next/script, lazyOnload, stable id) — this
 * component only queues the slot, which the loader picks up when it arrives.
 */
export default function AdSense({ slot, className = "", minHeight = 250 }: AdSenseProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const adElement = adRef.current;
    if (!adElement) return;

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
    // Re-run on every route change so each new page/article gets a fresh ad.
  }, [pathname]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div style={{ minHeight }}>
        <ins
          // key={pathname} forces React to unmount the old <ins> node and
          // create a brand new one on every route change, instead of reusing
          // the same DOM node AdSense already filled (which is what was
          // silently blocking any refresh before).
          key={pathname}
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
