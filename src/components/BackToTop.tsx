"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1e3926] hover:bg-[#254930] text-[#c2d6c7] text-xs transition-colors cursor-pointer"
    >
      <span>Back to top</span>
      <ArrowUp size={13} />
    </button>
  );
}
