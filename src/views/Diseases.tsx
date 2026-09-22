"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, ShieldCheck, ArrowRight, Droplets, BookOpen } from 'lucide-react';
import type { DiseaseListItem } from '@/lib/listItems';

interface DiseasesProps {
  /** Loaded on the server (cached WordPress fetch) so the list is in the initial HTML. */
  initialDiseases: DiseaseListItem[];
}

export const Diseases: React.FC<DiseasesProps> = ({ initialDiseases }) => {
  const diseases = initialDiseases;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDosha, setSelectedDosha] = useState<string>('All');

  const categories = [
    'All',
    'Digestive',
    'Respiratory',
    'Musculoskeletal',
    'Mind & Stress',
    'Skin & Hair',
    'Metabolic & Lifestyle'
  ];

  const doshas: Array<'All' | any> = ['All', 'Vata', 'Pitta', 'Kapha'];

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.sanskritName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || disease.category === selectedCategory;

    const matchesDosha =
      selectedDosha === 'All' || disease.primaryDosha.includes(selectedDosha);

    return matchesSearch && matchesCategory && matchesDosha;
  });

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <span>/</span>
          <span className="text-[var(--color-ink)] font-medium">Disease & Condition Directory</span>
        </div>

        {/* Section Title */}
        <div className="border-b border-[var(--color-border)] pb-8 mb-8">
          <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">
            Clinical Ayurvedic Pathology
          </span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[var(--color-ink)] mt-2 mb-3">
            Ailment & Disease Directory (Roga Nidana)
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-3xl leading-relaxed">
            Discover in-depth clinical guides on common disorders. Learn root imbalances (Nidana), doshic pathogenesis (Samprapti), classical symptoms, dietary guidelines (Pathya-Apathya), and physician-approved home remedies.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7d8b80]">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search disease by common or Sanskrit name..."
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Dosha Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDosha}
                onChange={(e) => setSelectedDosha(e.target.value)}
                className="w-full py-2.5 px-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
              >
                {doshas.map((d) => (
                  <option key={d} value={d}>
                    Primary Dosha: {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-4 border-t border-[var(--color-border)] text-xs">
            <span className="text-[var(--color-muted)] font-medium mr-1 flex items-center gap-1">
              <Filter size={12} />
              Quick Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[var(--color-primary)] text-white font-medium'
                    : 'bg-[var(--color-bg)] text-[#3d4b40] hover:bg-[#e4ddcf]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-[#67776b] mb-4">
          <span>Showing {filteredDiseases.length} condition monographs</span>
          {(searchTerm || selectedCategory !== 'All' || selectedDosha !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedDosha('All');
              }}
              className="text-[var(--color-accent)] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Compact, Content-Rich Listing */}
        {filteredDiseases.length === 0 ? (
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-12 text-center">
            <BookOpen size={36} className="mx-auto text-[#94a598] mb-3" />
            <h3 className="font-editorial text-lg font-bold text-[#1f3023]">No Conditions Found</h3>
            <p className="text-xs sm:text-sm text-[#667569] mt-1 max-w-md mx-auto">
              We couldn't find any disease monographs matching your search criteria. Try clearing filters or searching for terms like 'Acidity', 'Joint', or 'Cough'.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDiseases.map((disease) => (
              <Link
                key={disease.id}
                href={`/diseases/${disease.slug}`}
                className="group bg-white rounded-lg border border-[var(--color-border)] p-5 sm:p-6 hover:border-[var(--color-primary)]/60 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[var(--color-border)] text-[#71552d]">
                      {disease.category}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--color-border)] text-[var(--color-primary)] flex items-center gap-1">
                      <Droplets size={11} />
                      {disease.primaryDosha} Dosha
                    </span>
                    <span className="text-xs text-[#78887b]">
                      Updated: {disease.updatedAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                    {disease.name}
                  </h3>
                  <div className="text-xs font-serif italic text-[var(--color-accent)] mb-2">
                    {disease.sanskritName}
                  </div>

                  <p className="text-xs sm:text-sm text-[#48564b] leading-relaxed line-clamp-2 mb-3">
                    {disease.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6e7d72]">
                    <div className="flex items-center gap-1">
                      <ShieldCheck size={14} className="text-[var(--color-primary)]" />
                      <span>Reviewed by {disease.reviewedBy.name}</span>
                    </div>
                    <span>•</span>
                    <span>{disease.readingTime}</span>
                    <span>•</span>
                    <span className="text-[var(--color-accent)] font-medium">{disease.homeRemediesIds.length} Verified Desi Nuskhe</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--color-bg)] group-hover:bg-[var(--color-primary)] group-hover:text-white text-[var(--color-primary)] text-xs font-semibold transition-all">
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
};
