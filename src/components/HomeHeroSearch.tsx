"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

const popularSearches = [
  "Acidity (Amlapitta)",
  "Joint Stiffness",
  "Dry Cough",
  "Sleep & Anidra",
  "Ashwagandha",
  "Turmeric",
];

export function HomeHeroSearch() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const onSearchSubmit = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  return (
    <>
      <form onSubmit={handleHeroSearch} className="mb-5 max-w-xl">
        <div className="relative flex items-center shadow-sm rounded-lg bg-white border border-[#D5CDBD] p-1.5 focus-within:border-[#1E4D30] focus-within:ring-2 focus-within:ring-[#1E4D30]/15 transition-all">
          <div className="pl-3 pr-2 text-[#7c8b7f]">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search symptoms, remedies (e.g. Acidity, Golden Milk, Tulsi)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1c2c20] placeholder-[#8f9b91] focus:outline-none py-2"
          />
          <button
            type="submit"
            className="bg-[#1E4D30] hover:bg-[#163a24] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Search</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2 text-xs text-[#5f6e63]">
        <span className="font-medium text-[#2d3a30]">Frequent Searches:</span>
        {popularSearches.map((term, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              const clean = term.split(" ")[0];
              setSearchInput(clean);
              onSearchSubmit(clean);
            }}
            className="px-2.5 py-1 rounded bg-[#EAE3D5]/70 hover:bg-[#ded5c5] text-[#2c3d31] transition-colors cursor-pointer border border-[#ded5c5]"
          >
            {term}
          </button>
        ))}
      </div>
    </>
  );
}
