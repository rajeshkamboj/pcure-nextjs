"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Clock, Droplets, ArrowRight, Sparkles } from 'lucide-react';
import { RemoteImage } from '@/components/ui/RemoteImage';
import type { RemedyListItem } from '@/lib/listItems';

interface RemediesProps {
  /** Loaded on the server (cached WordPress fetch) so the list is in the initial HTML. */
  initialRemedies: RemedyListItem[];
}

export const Remedies: React.FC<RemediesProps> = ({ initialRemedies }) => {
  const remedies = initialRemedies;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDosha, setSelectedDosha] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const doshaFilters = ['All', 'Vata', 'Pitta', 'Kapha'];
  const difficultyFilters = ['All', 'Very Easy', 'Easy', 'Moderate'];

  const filteredRemedies = remedies.filter((remedy) => {
    const matchesSearch =
      remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (remedy.hindiName && remedy.hindiName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      remedy.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.targetCondition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDosha =
      selectedDosha === 'All' || remedy.primaryDoshaBalancing === selectedDosha;

    const matchesDifficulty =
      selectedDifficulty === 'All' || remedy.difficulty === selectedDifficulty;

    return matchesSearch && matchesDosha && matchesDifficulty;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#718074]">
          <Link href="/" className="hover:text-[#1E4D30]">Home</Link>
          <span>/</span>
          <span className="text-[#1a281e] font-medium">Desi Nuskhe & Classical Remedies</span>
        </div>

        {/* Section Heading */}
        <div className="border-b border-[#e2dbcf] pb-8 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3ede1] text-[#8B6B3E] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#ded5c5]">
            <Sparkles size={12} />
            Kitchen Apothecary & Herbal Decoctions
          </div>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#14261B] mt-2 mb-3">
            Classical Desi Nuskhe (Home Remedies Library)
          </h1>
          <p className="text-sm sm:text-base text-[#4d5c50] max-w-3xl leading-relaxed">
            Time-tested, accessible recipes formulated from unadulterated spices, medicinal roots, and herbal decoctions. Each formulation details specific preparation methods, ideal ingestion timing (Anupana), target dosha, and contraindications.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-xl border border-[#ded5c5] p-4 sm:p-5 mb-8 shadow-xs">
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
                placeholder="Search remedies (e.g., Haldi Doodh, Kashayam, Insomnia, Acidity)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-sm text-[#192b1e] placeholder-[#8f9b91] focus:outline-none focus:border-[#1E4D30] focus:ring-1 focus:ring-[#1E4D30]"
              />
            </div>

            {/* Dosha Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDosha}
                onChange={(e) => setSelectedDosha(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-sm text-[#192b1e] focus:outline-none focus:border-[#1E4D30] cursor-pointer"
              >
                {doshaFilters.map((d) => (
                  <option key={d} value={d}>
                    Dosha Balance: {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-sm text-[#192b1e] focus:outline-none focus:border-[#1E4D30] cursor-pointer"
              >
                {difficultyFilters.map((diff) => (
                  <option key={diff} value={diff}>
                    Difficulty: {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Tags Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-4 border-t border-[#f0ebd5] text-xs">
            <span className="text-[#6d7c71] font-medium mr-1">Popular Targets:</span>
            {['Acidity', 'Joint Pain', 'Sleep', 'Cough', 'Immunity', 'Bloating'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] hover:bg-[#eae3d5] text-[#3e4d41] border border-[#ded5c5] cursor-pointer transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#67776b] mb-4">
          <span>Displaying {filteredRemedies.length} authentic Desi Nuskhe</span>
          {(searchTerm || selectedDosha !== 'All' || selectedDifficulty !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDosha('All');
                setSelectedDifficulty('All');
              }}
              className="text-[#8B6B3E] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Remedies Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredRemedies.map((remedy) => (
            <Link
              key={remedy.id}
              href={`/remedies/${remedy.slug}`}
              className="group bg-white rounded-xl border border-[#ded5c5] overflow-hidden hover:shadow-md hover:border-[#1E4D30]/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="h-48 overflow-hidden relative border-b border-[#eee7da]">
                  <RemoteImage
                    src={remedy.featuredImage}
                    alt={remedy.name}
                    fill
                    sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-[#1E4D30] shadow-xs">
                    {remedy.hindiName || 'देसी नुस्खा'}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#14261B]/80 text-white px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                    <Clock size={12} />
                    <span>{remedy.prepTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-[#8B6B3E] uppercase tracking-wider flex items-center gap-1">
                      <Droplets size={12} />
                      Balances {remedy.primaryDoshaBalancing}
                    </span>
                    <span className="text-[11px] text-[#637267] bg-[#FAF8F5] border border-[#e8e1d5] px-2 py-0.5 rounded">
                      {remedy.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-[#14261B] group-hover:text-[#1E4D30] transition-colors leading-snug mb-2">
                    {remedy.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4d5c50] line-clamp-2 leading-relaxed mb-4">
                    {remedy.purpose}
                  </p>

                  <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#e8e0d2] text-xs space-y-1.5 mb-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#758478] shrink-0">Indication:</span>
                      <span className="font-medium text-[#223326] text-right line-clamp-1">{remedy.targetCondition}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#758478] shrink-0">Carrier (Anupana):</span>
                      <span className="font-medium text-[#223326] text-right truncate">{remedy.howToUse.anupana}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-[#f2ede4] flex items-center justify-between text-xs">
                  <span className="text-[#718074]">
                    {remedy.ingredients.length} Ingredients
                  </span>
                  <span className="text-[#1E4D30] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Nuskha</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};