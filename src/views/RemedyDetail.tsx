"use client";
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Share2,
  Bookmark,
  Check,
  ArrowRight,
  Sparkles,
  Info,
  Loader2
} from 'lucide-react';
import { useRouter } from "next/navigation";
import { Remedy } from '../types';
import { ContentService } from '../services/contentService';

interface RemedyDetailProps {
  slug: string | undefined;
  onNavigate?: (page: string, slug?: string) => void;
  initialRemedy?: Remedy | null;
  initialRelatedDiseaseSlug?: string | null;
}

export const RemedyDetail: React.FC<RemedyDetailProps> = ({ slug, onNavigate, initialRemedy, initialRelatedDiseaseSlug }) => {
  const router = useRouter();
  const navigate = (page: string, s?: string) => {
    if (onNavigate) return onNavigate(page, s);
    const map: Record<string, string> = { home: "/", diseases: "/diseases", "disease-detail": s ? `/diseases/${s}` : "/diseases", remedies: "/remedies", "remedy-detail": s ? `/remedies/${s}` : "/remedies", ingredients: "/ingredients", "ingredient-detail": s ? `/ingredients/${s}` : "/ingredients", about: "/about", contact: "/contact" };
    router.push(map[page] || "/");
  };
  const [remedy, setRemedy] = useState<Remedy | null>(initialRemedy ?? null);
  const [isLoading, setIsLoading] = useState(!initialRemedy);
  const [error, setError] = useState<string | null>(initialRemedy === null && initialRemedy !== undefined ? 'Remedy monograph not found' : null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [relatedDiseaseSlug, setRelatedDiseaseSlug] = useState<string | null>(initialRelatedDiseaseSlug ?? null);
  useEffect(() => {
    if (initialRemedy !== undefined) {
      setIsLoading(false);
      return;
    }
    async function loadData() {
      if (!slug) {
        setError('No remedy slug provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const remedyData = await ContentService.getRemedyBySlug(slug);

        if (!remedyData) {
          setError('Remedy monograph not found');
          setIsLoading(false);
          return;
        }

        setRemedy(remedyData);
        if (remedyData.diseaseId) {
  const [relatedDisease] = await ContentService.getDiseasesByIds([remedyData.diseaseId]);
  setRelatedDiseaseSlug(relatedDisease?.slug ?? null);
}
      } catch (err) {
        console.error('Error loading remedy detail:', err);
        setError('Failed to load remedy data. Please try again later.');
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
        <p className="text-[#4d5c50] font-medium animate-pulse">Loading Desi Nuskha...</p>
      </div>
    );
  }

  if (error || !remedy) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-xl border border-[#ded5c5] shadow-sm max-w-md">
          <AlertTriangle size={48} className="mx-auto text-amber-600 mb-4" />
          <h2 className="text-xl font-bold text-[#14261B] mb-2">Remedy Not Found</h2>
          <p className="text-[#4d5c50] mb-6">{error || 'The requested remedy monograph could not be located.'}</p>
          <button
            onClick={() => navigate('remedies')}
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#718074] flex-wrap">
          <button onClick={() => navigate('home')} className="hover:text-[#1E4D30] cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => navigate('remedies')} className="hover:text-[#1E4D30] cursor-pointer">Desi Nuskhe</button>
          <span>/</span>
          <span className="text-[#8B6B3E] font-medium">{remedy.primaryDoshaBalancing} Balancer</span>
          <span>/</span>
          <span className="text-[#1a281e] font-semibold">{remedy.name}</span>
        </nav>

        {/* Hero Card */}
        <header className="bg-white rounded-xl border border-[#ded5c5] overflow-hidden mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12">

            {/* Image side */}
            <div className="md:col-span-5 h-64 md:h-auto relative">
              <img
                src={remedy.featuredImage}
                alt={remedy.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded text-xs font-semibold text-[#1E4D30]">
                {remedy.hindiName || 'देसी नुस्खा'}
              </div>
            </div>

            {/* Info side */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#f5efe4] text-[#785b31] text-xs font-semibold uppercase tracking-wider">
                    Balances {remedy.primaryDoshaBalancing} Dosha
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#e8f2ec] text-[#1E4D30] text-xs font-medium">
                    Difficulty: {remedy.difficulty}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-bold text-[#14261B] leading-tight mb-3">
                  {remedy.name}
                </h1>

                <p className="text-sm sm:text-base text-[#49564c] leading-relaxed mb-4">
                  {remedy.purpose}
                </p>

                {/* Target condition callout */}
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#e8e0d2] text-xs sm:text-sm text-[#38483b] mb-4">
                  <span className="font-semibold text-[#1E4D30]">Intended Target: </span>
                  {remedy.targetCondition}
                </div>
              </div>

              {/* Verified Author & Actions */}
              <div className="pt-4 border-t border-[#f0ebd5] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={remedy.verifiedBy.avatarUrl}
                    alt={remedy.verifiedBy.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#ded5c5]"
                  />
                  <div>
                    <div className="font-bold text-[#1b2b1e] flex items-center gap-1">
                      <span>Verified by {remedy.verifiedBy.name}</span>
                      <ShieldCheck size={14} className="text-[#1E4D30]" />
                    </div>
                    <div className="text-[11px] text-[#6e7d72]">{remedy.verifiedBy.credentials}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#eae3d5] text-[#3b4b3e] border border-[#ded5c5] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copied ? <Check size={14} className="text-emerald-700" /> : <Share2 size={14} />}
                    <span>{copied ? 'Copied' : 'Share Nuskha'}</span>
                  </button>
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`p-1.5 rounded border border-[#ded5c5] cursor-pointer transition-colors ${
                      saved ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-[#FAF8F5] text-[#3b4b3e] hover:bg-[#eae3d5]'
                    }`}
                    title="Save recipe"
                  >
                    <Bookmark size={15} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* 2-Column Detailed Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Ingredients & Protocol Quick Specs */}
          <div className="lg:col-span-5 space-y-6">

            {/* Exact Ingredients Box */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#eee8dc]">
                <h2 className="font-editorial font-bold text-lg text-[#16271a] flex items-center gap-2">
                  <Sparkles size={16} className="text-[#8B6B3E]" />
                  <span>Required Ingredients</span>
                </h2>
                <span className="text-xs text-[#718074]">{remedy.ingredients.length} items</span>
              </div>

              <div className="space-y-3">
                {remedy.ingredients.map((ing, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#FAF8F5] border border-[#e8e1d5] text-xs sm:text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-[#1b2b1e]">{ing.name}</span>
                      <span className="font-medium text-[#1E4D30] shrink-0 bg-white px-2 py-0.5 rounded border border-[#ded5c5]">
                        {ing.quantity}
                      </span>
                    </div>
                    {ing.notes && (
                      <p className="text-[11px] text-[#6d7c71] mt-1 italic">
                        {ing.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Classical Usage Guidelines Card */}
            <div className="bg-[#FAF7F0] rounded-xl border border-[#ded5c5] p-5 sm:p-6">
              <h2 className="font-editorial font-bold text-lg text-[#16271a] mb-4 pb-2 border-b border-[#e2dacb]">
                Administration Guidelines (Vidhi)
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-3 pb-2 border-b border-[#ece4d6]">
                  <span className="text-[#6d7c71]">Dosage (Matra):</span>
                  <span className="font-semibold text-[#1d2d20] text-right">{remedy.howToUse.dosage}</span>
                </div>

                <div className="flex items-start justify-between gap-3 pb-2 border-b border-[#ece4d6]">
                  <span className="text-[#6d7c71]">Timing (Kala):</span>
                  <span className="font-semibold text-[#1d2d20] text-right">{remedy.howToUse.timing}</span>
                </div>

                <div className="flex items-start justify-between gap-3 pb-2 border-b border-[#ece4d6]">
                  <span className="text-[#6d7c71]">Frequency:</span>
                  <span className="font-semibold text-[#1d2d20] text-right">{remedy.howToUse.frequency}</span>
                </div>

                <div className="flex items-start justify-between gap-3 pb-2 border-b border-[#ece4d6]">
                  <span className="text-[#6d7c71]">Carrier (Anupana):</span>
                  <span className="font-semibold text-[#1E4D30] text-right">{remedy.howToUse.anupana}</span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-[#6d7c71]">Course Duration:</span>
                  <span className="font-semibold text-[#8B6B3E] text-right">{remedy.howToUse.duration}</span>
                </div>
              </div>
            </div>

            {/* Historical / Classical Shloka Context */}
            {remedy.traditionalContext && (
              <div className="bg-white rounded-xl border border-[#ded5c5] p-5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B6B3E] mb-2">
                  <Info size={14} />
                  <span>Classical Ayurvedic Context</span>
                </div>
                <p className="text-xs text-[#526255] italic leading-relaxed">
                  "{remedy.traditionalContext}"
                </p>
              </div>
            )}

          </div>

          {/* Right Column: Step-by-Step Preparation & Safety Precautions */}
          <div className="lg:col-span-7 space-y-6">

            {/* Preparation Steps */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl font-editorial font-bold text-[#14261B] mb-2">
                Step-by-Step Preparation (Nirmana Vidhi)
              </h2>
              <p className="text-xs sm:text-sm text-[#617265] mb-6">
                Follow these instructions precisely to preserve the delicate volatile compounds and medicinal potency.
              </p>

              <div className="space-y-4">
                {remedy.preparation.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-[#FAF8F5] border border-[#e8e0d2]">
                    <div className="w-8 h-8 rounded-full bg-[#1E4D30] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm text-[#2f3e32] leading-relaxed pt-1">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crucial Precautions & Who Should Avoid */}
            <div className="bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-8 shadow-xs space-y-6">

              {/* Important Precautions */}
              <div>
                <h3 className="font-editorial font-bold text-lg text-[#16271a] mb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#1E4D30]" />
                  <span>Important Preparation Precautions</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#48564a]">
                  {remedy.precautions.map((prec, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 rounded bg-amber-50/50 border border-amber-200/80">
                      <span className="font-bold text-amber-800">•</span>
                      <span>{prec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Should Avoid (Contraindications) */}
              <div>
                <h3 className="font-editorial font-bold text-lg text-rose-900 mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-rose-700" />
                  <span>Contraindications: Who Should Avoid</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#48564a]">
                  {remedy.whoShouldAvoid.map((avoid, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 rounded bg-rose-50/50 border border-rose-200/80">
                      <span className="font-bold text-rose-700">✕</span>
                      <span>{avoid}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Disease Link If Available */}
              {relatedDiseaseSlug && (
  <div className="p-5 rounded-xl border border-[#ded5c5] bg-[#F4EFE5] flex flex-col sm:flex-row items-center justify-between gap-4">
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-[#8B6B3E]">Related Pathological Guide</div>
      <h4 className="font-editorial font-bold text-base text-[#192b1e]">
        Want to understand the root pathology of this ailment?
      </h4>
    </div>
    <button
      onClick={() => navigate('disease-detail', relatedDiseaseSlug)}
      className="shrink-0 px-4 py-2 rounded bg-[#1E4D30] hover:bg-[#163a24] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
    >
      <span>Read Disease Guide</span>
      <ArrowRight size={13} />
    </button>
  </div>
)}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
