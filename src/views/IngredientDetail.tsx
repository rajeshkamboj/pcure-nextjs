"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Share2,
  Bookmark,
  Check,
  Leaf,
} from 'lucide-react';
import type { Ingredient } from '../types';
import type { RemedyListItem, DiseaseListItem } from '@/lib/listItems';
import { RemoteImage } from '@/components/ui/RemoteImage';
import { lazyLoadContentMedia } from '@/lib/wpContent';

interface IngredientDetailProps {
  /** Loaded on the server (cached WordPress fetch) so the monograph is in the initial HTML. */
  ingredient: Ingredient;
  relatedRemedies: RemedyListItem[];
  relatedDiseases: DiseaseListItem[];
}

export const IngredientDetail: React.FC<IngredientDetailProps> = ({
  ingredient,
  relatedRemedies,
  relatedDiseases,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#718074] flex-wrap">
          <Link href="/" className="hover:text-[#1E4D30]">Home</Link>
          <span>/</span>
          <Link href="/ingredients" className="hover:text-[#1E4D30]">Botanical Library</Link>
          <span>/</span>
          <span className="text-[#8B6B3E] font-medium">{ingredient.category}</span>
          <span>/</span>
          <span className="text-[#1a281e] font-semibold">{ingredient.commonName}</span>
        </nav>

        {/* Hero Card */}
        <header className="bg-white rounded-xl border border-[#ded5c5] overflow-hidden mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12">

            <div className="md:col-span-5 h-72 md:h-auto relative">
              {ingredient.featuredImage ? (
                <RemoteImage
                  src={ingredient.featuredImage}
                  alt={ingredient.commonName}
                  fill
                  // LCP element on mobile (top of the hero card) → priority.
                  priority
                  sizes="(min-width: 1024px) 408px, (min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#f0ebe1] flex items-center justify-center text-[#8B6B3E]">
                  <Leaf size={48} />
                </div>
              )}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded text-xs font-semibold text-[#1E4D30]">
                {ingredient.sanskritName} ({ingredient.hindiName})
              </div>
            </div>

            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#f5efe4] text-[#785b31] text-xs font-semibold uppercase tracking-wider">
                    {ingredient.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#e8f2ec] text-[#1E4D30] text-xs font-medium">
                    Virya: {ingredient.ayurvedicProperties.virya}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#14261B] leading-tight mb-1">
                  {ingredient.commonName}
                </h1>

                <div className="text-sm font-mono italic text-[#8B6B3E] mb-3">
                  Botanical: {ingredient.botanicalName} • Classical: {ingredient.sanskritName}
                </div>

                <p className="text-sm sm:text-base text-[#49564c] leading-relaxed mb-4">
                  {ingredient.shortDescription}
                </p>

                {/* Doshic Action Badge */}
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#e8e0d2] text-xs sm:text-sm text-[#27382b]">
                  <span className="font-semibold text-[#1E4D30]">Dosha Karma: </span>
                  {ingredient.ayurvedicProperties.doshaEffect}
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="pt-4 mt-4 border-t border-[#f0ebd5] flex items-center justify-between text-xs">
                <span className="text-[#6d7c71]">
                  Part of {relatedRemedies.length} Desi Nuskhe Formulations
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#eae3d5] text-[#3b4b3e] border border-[#ded5c5] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copied ? <Check size={14} className="text-emerald-700" /> : <Share2 size={14} />}
                    <span>{copied ? 'Copied' : 'Share'}</span>
                  </button>
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`p-1.5 rounded border border-[#ded5c5] cursor-pointer transition-colors ${
                      saved ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-[#FAF8F5] text-[#3b4b3e] hover:bg-[#eae3d5]'
                    }`}
                    title="Bookmark herb"
                  >
                    <Bookmark size={15} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Classical Energetics & Dosage Specs */}
          <div className="lg:col-span-5 space-y-6">

            {/* Ayurvedic Pharmacodynamics Card (Pancha Mahabhuta / Dravyaguna) */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-5 sm:p-6 shadow-xs">
              <h2 className="font-editorial font-bold text-xl text-[#16271a] mb-4 pb-2 border-b border-[#eee8dc] flex items-center gap-2">
                <Leaf size={16} className="text-[#1E4D30]" />
                <span>Ayurvedic Energetics (Dravyaguna)</span>
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-[#718074] block mb-1">Taste (Rasa):</span>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.ayurvedicProperties.rasa.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#ded5c5] text-xs font-medium text-[#26372a]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[#718074] block mb-1">Physical Attributes (Guna):</span>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.ayurvedicProperties.guna.map((g, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#ded5c5] text-xs font-medium text-[#26372a]">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f0ebd5]">
                  <span className="text-[#718074]">Potency (Virya):</span>
                  <span className="font-semibold text-[#1a2b1d]">{ingredient.ayurvedicProperties.virya}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f0ebd5]">
                  <span className="text-[#718074]">Post-Digestive Effect (Vipaka):</span>
                  <span className="font-semibold text-[#1a2b1d]">{ingredient.ayurvedicProperties.vipaka}</span>
                </div>
              </div>
            </div>

            {/* Classical Recommended Dosages */}
            <div className="bg-[#FAF7F0] rounded-xl border border-[#ded5c5] p-5 sm:p-6">
              <h2 className="font-editorial font-bold text-xl text-[#16271a] mb-3 pb-2 border-b border-[#e2d9cb]">
                Standard Therapeutic Dosages
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[#6d7c71]">Churna (Powder):</span>
                  <span className="font-semibold text-[#1E4D30] text-right">{ingredient.recommendedDosage.churna}</span>
                </div>
                {ingredient.recommendedDosage.decoction && (
                  <div className="flex items-start justify-between gap-3 pt-2 border-t border-[#e8dfd0]">
                    <span className="text-[#6d7c71]">Kashayam (Decoction):</span>
                    <span className="font-semibold text-[#1E4D30] text-right">{ingredient.recommendedDosage.decoction}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contraindications & Safety */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-5 sm:p-6 shadow-xs">
              <h2 className="font-editorial font-bold text-xl text-rose-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-700" />
                <span>Safety & Contraindications</span>
              </h2>
              <ul className="space-y-2 text-xs text-[#48564a]">
                {ingredient.safetyAndContraindications.map((contra, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded bg-rose-50/50 border border-rose-200/80">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>{contra}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: In-Depth Monograph, Key Benefits & Related Formulations */}
          <div className="lg:col-span-7 space-y-6">

            {/* Detailed Description */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#14261B] mb-4 pb-2 border-b border-[#eee8dc]">
                Botanical Monograph & Clinical Profile
              </h2>
              <div
                className="patientscure-rich-content"
                dangerouslySetInnerHTML={{
                  __html: lazyLoadContentMedia(ingredient.fullDescription || ''),
                }}
              />
            </div>

            {/* Key Clinical Benefits */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-editorial font-bold text-[#14261B] mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-[#8B6B3E]" />
                <span>Documented Therapeutic Benefits</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ingredient.keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#e8e1d5] text-xs sm:text-sm">
                    <CheckCircle2 size={15} className="text-[#1E4D30] shrink-0 mt-0.5" />
                    <span className="text-[#324235]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Classical Indications (Roga Ghnata) */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-editorial font-bold text-[#14261B] mb-3">
                Classical Indications (Roga Ghnata)
              </h2>
              <div className="flex flex-wrap gap-2">
                {ingredient.therapeuticUses.map((use, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#ded5c5] text-xs text-[#2b3a2e] font-medium">
                    {use}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Home Remedies (Desi Nuskhe using this herb) */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-editorial font-bold text-[#14261B] mb-4 flex items-center justify-between pb-2 border-b border-[#eee8dc]">
                <span>Desi Nuskhe Incorporating {ingredient.commonName}</span>
                <span className="text-xs text-[#718074] font-sans font-normal">{relatedRemedies.length} recipes</span>
              </h2>
              <div className="space-y-3">
                {relatedRemedies.map((remedy) => (
                  <Link
                    key={remedy.id}
                    href={`/remedies/${remedy.slug}`}
                    className="p-4 rounded-lg bg-[#FAF8F5] border border-[#e8e1d5] hover:border-[#1E4D30]/60 transition-all flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-medium text-[#8B6B3E] uppercase">{remedy.hindiName || 'देसी नुस्खा'}</div>
                      <h4 className="font-editorial font-bold text-base text-[#1b2b1e] hover:text-[#1E4D30]">
                        {remedy.name}
                      </h4>
                      <p className="text-xs text-[#4f5f52] line-clamp-1 mt-0.5">{remedy.purpose}</p>
                    </div>
                    <ArrowRight size={16} className="text-[#1E4D30] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Associated Disease Monographs */}
            {relatedDiseases.length > 0 && (
              <div className="bg-[#FAF7F0] rounded-xl border border-[#ded5c5] p-5 sm:p-6">
                <h3 className="font-editorial font-bold text-lg text-[#192b1e] mb-3">
                  Related Disease Pathologies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedDiseases.map((disease) => (
                    <Link
                      key={disease.id}
                      href={`/diseases/${disease.slug}`}
                      className="p-3 rounded-lg bg-white border border-[#ded5c5] hover:border-[#1E4D30] transition-colors block"
                    >
                      <div className="text-xs text-[#78887b] uppercase font-semibold">{disease.category}</div>
                      <div className="text-xs font-bold text-[#1b2a1e] hover:text-[#1E4D30] truncate">{disease.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
