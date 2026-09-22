"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Leaf, ArrowRight, Sparkles } from 'lucide-react';
import { RemoteImage } from '@/components/ui/RemoteImage';
import type { IngredientListItem } from '@/lib/listItems';

interface IngredientsProps {
  /** Loaded on the server (cached WordPress fetch) so the list is in the initial HTML. */
  initialIngredients: IngredientListItem[];
}

export const Ingredients: React.FC<IngredientsProps> = ({ initialIngredients }) => {
  const ingredients = initialIngredients;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Root / Rhizome',
    'Leaf / Herb',
    'Spice / Seed',
    'Fruit / Berry',
    'Bark / Wood',
  ];

  const filteredIngredients = ingredients.filter((herb) => {
    const matchesSearch =
      herb.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.sanskritName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.hindiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || herb.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <span>/</span>
          <span className="text-[var(--color-ink)] font-medium">Ayurvedic Materia Medica (Dravyaguna)</span>
        </div>

        {/* Section Title */}
        <div className="border-b border-[var(--color-border)] pb-8 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-border)] text-[var(--color-accent)] text-xs font-semibold uppercase tracking-wider mb-2 border border-[var(--color-border)]">
            <Leaf size={12} />
            Dravyaguna Vijnana Encyclopedia
          </div>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[var(--color-ink)] mt-2 mb-3">
            Classical Medicinal Plants, Spices & Herbs
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-3xl leading-relaxed">
            The foundational dravyaguna encyclopedia of Indian medicine. Discover the biological properties (Rasa, Guna, Virya, Vipaka), organoleptic actions, safe dosage boundaries, and classical clinical indications for individual botanical substances.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            <div className="md:col-span-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7d8b80]">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by botanical name, Sanskrit name, or English name (e.g., Haridra, Ashwagandha)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Part / Category: {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-4 border-t border-[var(--color-border)] text-xs">
            <span className="text-[var(--color-muted)] font-medium mr-1">Parts:</span>
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
          <span>Showing {filteredIngredients.length} documented botanical monographs</span>
          {(searchTerm || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-[var(--color-accent)] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Ingredients Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredIngredients.map((herb) => (
            <Link
              key={herb.id}
              href={`/ingredients/${herb.slug}`}
              className="group bg-white rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-md hover:border-[var(--color-primary)]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative border-b border-[var(--color-border)]">
                  {herb.featuredImage ? (
                    <RemoteImage
                      src={herb.featuredImage}
                      alt={herb.commonName}
                      fill
                      sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
                      <Leaf size={32} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-[var(--color-primary)]">
                    {herb.sanskritName} ({herb.hindiName})
                  </div>
                  <div className="absolute top-3 right-3 bg-[var(--color-ink)]/80 text-white px-2 py-0.5 rounded text-xs font-medium">
                    {herb.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs font-mono text-[var(--color-accent)] italic mb-1">
                    {herb.botanicalName}
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors leading-snug mb-2">
                    {herb.commonName}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-muted)] line-clamp-3 leading-relaxed mb-4">
                    {herb.shortDescription}
                  </p>

                  {/* Energetics Quick Tag */}
                  <div className="bg-[var(--color-bg)] p-3 rounded-lg border border-[var(--color-border)] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[var(--color-muted)]">
                      <span>Potency (Virya):</span>
                      <span className="font-semibold text-[#1c2c1f]">{herb.ayurvedicProperties.virya}</span>
                    </div>
                    <div className="flex items-center justify-between text-[var(--color-muted)]">
                      <span>Powder Dosage:</span>
                      <span className="font-semibold text-[var(--color-primary)]">{herb.recommendedDosage.churna}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-[#f2ede4] flex items-center justify-between text-xs">
                  <span className="text-[var(--color-accent)] font-medium flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>{herb.keyBenefits.length} Key Actions</span>
                  </span>
                  <span className="text-[var(--color-primary)] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Botanical Monograph</span>
                    <ArrowRight size={13} />
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
