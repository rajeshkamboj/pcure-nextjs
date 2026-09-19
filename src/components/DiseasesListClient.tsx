"use client";
import { useState, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import { Search, Filter, ShieldCheck, ArrowRight, Droplets, BookOpen } from "lucide-react";
import type { Disease } from "@/types";

interface Props {
  initialDiseases: Disease[];
}

export function DiseasesListClient({ initialDiseases }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDosha, setSelectedDosha] = useState<string>("All");
  const deferredSearch = useDeferredValue(searchTerm);

  const categories = ["All", "Digestive", "Respiratory", "Musculoskeletal", "Mind & Stress", "Skin & Hair", "Metabolic & Lifestyle"];
  const doshas: string[] = ["All", "Vata", "Pitta", "Kapha"];

  const filteredDiseases = useMemo(() => {
    const q = deferredSearch.toLowerCase();
    return initialDiseases.filter((disease) => {
      const matchesSearch =
        !q ||
        disease.name.toLowerCase().includes(q) ||
        disease.sanskritName.toLowerCase().includes(q) ||
        disease.summary.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === "All" || disease.category === selectedCategory;
      const matchesDosha = selectedDosha === "All" || disease.primaryDosha.includes(selectedDosha);
      return matchesSearch && matchesCategory && matchesDosha;
    });
  }, [initialDiseases, deferredSearch, selectedCategory, selectedDosha]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center gap-2 text-xs text-[#718074]">
          <Link href="/" className="hover:text-[#1E4D30]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1a281e] font-medium">Disease & Condition Directory</span>
        </div>

        <div className="border-b border-[#e2dbcf] pb-8 mb-8">
          <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">Clinical Ayurvedic Pathology</span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#14261B] mt-2 mb-3">Ailment & Disease Directory (Roga Nidana)</h1>
          <p className="text-sm sm:text-base text-[#4d5c50] max-w-3xl leading-relaxed">
            Discover in-depth clinical guides on common disorders. Learn root imbalances (Nidana), doshic pathogenesis (Samprapti), classical symptoms, dietary guidelines (Pathya-Apathya), and physician-approved home remedies.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#ded5c5] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7d8b80]">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search disease by common or Sanskrit name..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-sm text-[#192b1e] placeholder-[#8f9b91] focus:outline-none focus:border-[#1E4D30] focus:ring-1 focus:ring-[#1E4D30]"
              />
            </div>
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-sm text-[#192b1e] focus:outline-none focus:border-[#1E4D30] cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-3">
              <select
                value={selectedDosha}
                onChange={(e) => setSelectedDosha(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-sm text-[#192b1e] focus:outline-none focus:border-[#1E4D30] cursor-pointer"
              >
                {doshas.map((d) => (
                  <option key={d} value={d}>
                    Primary Dosha: {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-4 border-t border-[#f0ebd5] text-xs">
            <span className="text-[#6d7c71] font-medium mr-1 flex items-center gap-1">
              <Filter size={12} />
              Quick Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                  selectedCategory === cat ? "bg-[#1E4D30] text-white font-medium" : "bg-[#F2ECE1] text-[#3d4b40] hover:bg-[#e4ddcf]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#67776b] mb-4">
          <span>Showing {filteredDiseases.length} condition monographs</span>
          {(searchTerm || selectedCategory !== "All" || selectedDosha !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedDosha("All");
              }}
              className="text-[#8B6B3E] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredDiseases.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#ded5c5] p-12 text-center">
            <BookOpen size={36} className="mx-auto text-[#94a598] mb-3" />
            <h3 className="font-editorial text-lg font-bold text-[#1f3023]">No Conditions Found</h3>
            <p className="text-xs sm:text-sm text-[#667569] mt-1 max-w-md mx-auto">
              We couldn&apos;t find any disease monographs matching your search criteria. Try clearing filters or searching for terms like &apos;Acidity&apos;, &apos;Joint&apos;, or &apos;Cough&apos;.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDiseases.map((disease) => (
              <Link
                key={disease.id}
                href={`/diseases/${disease.slug}`}
                className="group bg-white rounded-lg border border-[#ded5c5] p-5 sm:p-6 hover:border-[#1E4D30]/60 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-[#f4efe5] text-[#71552d]">{disease.category}</span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#e8f2ec] text-[#1E4D30] flex items-center gap-1">
                      <Droplets size={11} />
                      {disease.primaryDosha} Dosha
                    </span>
                    <span className="text-[11px] text-[#78887b]">Updated: {disease.updatedAt}</span>
                  </div>
                  <h3 className="text-xl font-editorial font-bold text-[#14261B] group-hover:text-[#1E4D30] transition-colors leading-snug">{disease.name}</h3>
                  <div className="text-xs font-serif italic text-[#8B6B3E] mb-2">{disease.sanskritName}</div>
                  <p className="text-xs sm:text-sm text-[#48564b] leading-relaxed line-clamp-2 mb-3">{disease.summary}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6e7d72]">
                    <div className="flex items-center gap-1">
                      <ShieldCheck size={14} className="text-[#1E4D30]" />
                      <span>Reviewed by {disease.reviewedBy.name}</span>
                    </div>
                    <span>•</span>
                    <span>{disease.readingTime}</span>
                    <span>•</span>
                    <span className="text-[#8B6B3E] font-medium">{disease.homeRemediesIds.length} Verified Desi Nuskhe</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#FAF7F0] group-hover:bg-[#1E4D30] group-hover:text-white text-[#1E4D30] text-xs font-semibold transition-all">
                    <span>Clinical Guide</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
