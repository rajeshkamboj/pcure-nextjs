"use client";
import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Share2,
  Bookmark,
  Check,
  Leaf,
  Loader2
} from 'lucide-react';
import { useRouter } from "next/navigation";
import { Ingredient, Remedy, Disease } from '../types';
import { ContentService } from '../services/contentService';

interface IngredientDetailProps {
  slug: string | undefined;
  onNavigate?: (page: string, slug?: string) => void;
  initialIngredient?: Ingredient | null;
  initialRemedies?: Remedy[];
  initialDiseases?: Disease[];
}

export const IngredientDetail: React.FC<IngredientDetailProps> = ({ slug, onNavigate, initialIngredient, initialRemedies, initialDiseases }) => {
  const router = useRouter();
  const navigate = (page: string, s?: string) => {
    if (onNavigate) return onNavigate(page, s);
    const map: Record<string, string> = { home: "/", diseases: "/diseases", "disease-detail": s ? `/diseases/${s}` : "/diseases", remedies: "/remedies", "remedy-detail": s ? `/remedies/${s}` : "/remedies", ingredients: "/ingredients", "ingredient-detail": s ? `/ingredients/${s}` : "/ingredients", about: "/about", contact: "/contact" };
    router.push(map[page] || "/");
  };
  const [ingredient, setIngredient] = useState<Ingredient | null>(initialIngredient ?? null);
  const [relatedRemedies, setRelatedRemedies] = useState<Remedy[]>(initialRemedies ?? []);
  const [relatedDiseases, setRelatedDiseases] = useState<Disease[]>(initialDiseases ?? []);
  const [isLoading, setIsLoading] = useState(!initialIngredient);
  const [error, setError] = useState<string | null>(initialIngredient === null && initialIngredient !== undefined ? 'Ingredient monograph not found' : null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (initialIngredient !== undefined) {
      setIsLoading(false);
      return;
    }
    async function loadData() {
      if (!slug) {
        setError('No ingredient slug provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const ingredientData = await ContentService.getIngredientBySlug(slug);

        if (!ingredientData) {
          setError('Ingredient monograph not found');
          setIsLoading(false);
          return;
        }

        setIngredient(ingredientData);

        // Fetch related entities in parallel
        const [remedies, diseases] = await Promise.all([
          ContentService.getRemediesByIds(ingredientData.featuredRemediesIds),
          ContentService.getDiseasesByIds(ingredientData.associatedDiseasesIds)
        ]);

setRelatedRemedies(remedies);
setRelatedDiseases(diseases);

      } catch (err) {
        console.error('Error loading ingredient detail:', err);
        setError('Failed to load ingredient data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-[#1E4D30] animate-spin mb-4" />
        <p className="text-[#4d5c50] font-medium animate-pulse">Loading Botanical Profile...</p>
      </div>
    );
  }

  if (error || !ingredient) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-xl border border-[#ded5c5] shadow-sm max-w-md">
          <AlertTriangle size={48} className="mx-auto text-amber-600 mb-4" />
          <h2 className="text-xl font-bold text-[#14261B] mb-2">Ingredient Not Found</h2>
          <p className="text-[#4d5c50] mb-6">{error || 'The requested botanical monograph could not be located.'}</p>
          <button
            onClick={() => navigate('ingredients')}
            className="px-6 py-2 bg-[#1E4D30] text-white rounded-md font-semibold hover:bg-[#163a24] transition-colors cursor-pointer"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#718074] flex-wrap">
          <button onClick={() => navigate('home')} className="hover:text-[#1E4D30] cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => navigate('ingredients')} className="hover:text-[#1E4D30] cursor-pointer">Botanical Library</button>
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
                <img
                  src={ingredient.featuredImage}
                  alt={ingredient.commonName}
                  className="w-full h-full object-cover"
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
              <h2 className="font-editorial font-bold text-lg text-[#16271a] mb-4 pb-2 border-b border-[#eee8dc] flex items-center gap-2">
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
              <h2 className="font-editorial font-bold text-lg text-[#16271a] mb-3 pb-2 border-b border-[#e2d9cb]">
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
              <h2 className="font-editorial font-bold text-lg text-rose-900 mb-3 flex items-center gap-2">
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
              <h2 className="text-2xl font-editorial font-bold text-[#14261B] mb-4 pb-2 border-b border-[#eee8dc]">
                Botanical Monograph & Clinical Profile
              </h2>
              <div className="text-sm sm:text-base text-[#39493d] leading-relaxed space-y-4">
                <p>{ingredient.fullDescription}</p>
              </div>
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
                  <div
                    key={remedy.id}
                    onClick={() => navigate('remedy-detail', remedy.slug)}
                    className="p-4 rounded-lg bg-[#FAF8F5] border border-[#e8e1d5] hover:border-[#1E4D30]/60 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-[11px] font-medium text-[#8B6B3E] uppercase">{remedy.hindiName || 'देसी नुस्खा'}</div>
                      <h4 className="font-editorial font-bold text-base text-[#1b2b1e] hover:text-[#1E4D30]">
                        {remedy.name}
                      </h4>
                      <p className="text-xs text-[#4f5f52] line-clamp-1 mt-0.5">{remedy.purpose}</p>
                    </div>
                    <ArrowRight size={16} className="text-[#1E4D30] shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Disease Monographs */}
            {relatedDiseases.length > 0 && (
              <div className="bg-[#FAF7F0] rounded-xl border border-[#ded5c5] p-5 sm:p-6">
                <h3 className="font-editorial font-bold text-base text-[#192b1e] mb-3">
                  Related Disease Pathologies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedDiseases.map((disease) => (
                    <div
                      key={disease.id}
                      onClick={() => navigate('disease-detail', disease.slug)}
                      className="p-3 rounded-lg bg-white border border-[#ded5c5] hover:border-[#1E4D30] transition-colors cursor-pointer"
                    >
                      <div className="text-[10px] text-[#78887b] uppercase font-semibold">{disease.category}</div>
                      <div className="text-xs font-bold text-[#1b2a1e] hover:text-[#1E4D30] truncate">{disease.name}</div>
                    </div>
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
