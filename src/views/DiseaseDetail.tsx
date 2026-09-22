"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Share2,
  Bookmark,
  Check,
  ChevronRight,
  Droplets,
} from 'lucide-react';
import type { Disease } from '../types';
import type { RemedyListItem, IngredientListItem } from '@/lib/listItems';
import { RemoteImage } from '@/components/ui/RemoteImage';
import { lazyLoadContentMedia } from '@/lib/wpContent';

interface DiseaseDetailProps {
  /** Loaded on the server (cached WordPress fetch) so the monograph is in the initial HTML. */
  disease: Disease;
  associatedRemedies: RemedyListItem[];
  associatedIngredients: IngredientListItem[];
}

export const DiseaseDetail: React.FC<DiseaseDetailProps> = ({
  disease,
  associatedRemedies,
  associatedIngredients,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navSections = [
    { id: 'sec-overview', label: 'Overview' },
    { id: 'sec-ayurveda', label: 'Ayurvedic Perspective' },
    { id: 'sec-symptoms', label: 'Symptoms & Warning Signs' },
    { id: 'sec-causes', label: 'Possible Causes (Nidana)' },
    { id: 'sec-diet', label: 'Diet & Lifestyle (Pathya)' },
    { id: 'sec-remedies', label: 'Desi Nuskhe (Home Remedies)' },
    { id: 'sec-precautions', label: 'Clinical Precautions' },
    { id: 'sec-faqs', label: 'Frequently Asked Questions' },
    { id: 'sec-references', label: 'Classical References' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--color-muted)] flex-wrap">
          <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <span>/</span>
          <Link href="/diseases" className="hover:text-[var(--color-primary)]">Diseases</Link>
          <span>/</span>
          <span className="text-[var(--color-accent)] font-medium">{disease.category}</span>
          <span>/</span>
          <span className="text-[var(--color-ink)] font-semibold">{disease.name}</span>
        </nav>

        {/* Article Header Card */}
        <header className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded bg-[var(--color-border)] text-[#785b31] text-xs font-semibold uppercase tracking-wider">
              {disease.category} Monograph
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#eaf3ec] text-[var(--color-primary)] text-xs font-semibold flex items-center gap-1">
              <Droplets size={12} />
              Primary: {disease.primaryDosha} Dosha
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[var(--color-ink)] tracking-tight leading-[1.15] mb-2">
            {disease.name}
          </h1>

          <div className="text-base sm:text-lg font-serif italic text-[var(--color-accent)] mb-4">
            Classical Nomenclature: {disease.sanskritName}
          </div>

          <p className="text-base sm:text-lg text-[#3a473d] leading-relaxed mb-6 font-normal">
            {disease.summary}
          </p>

          {/* Metadata & Vaidya Peer Review Badge */}
          <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <RemoteImage
                src={disease.reviewedBy.avatarUrl}
                alt={disease.reviewedBy.name}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover border border-[var(--color-border)]"
              />
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1a2a1d]">
                  <span>Medically Reviewed by {disease.reviewedBy.name}</span>
                  <ShieldCheck size={15} className="text-[var(--color-primary)]" />
                </div>
                <div className="text-xs text-[#6e7d72]">{disease.reviewedBy.credentials} • {disease.reviewedBy.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>
  Updated {new Date(disease.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}
</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{disease.readingTime}</span>
              </div>

              <div className="flex items-center gap-1.5 pl-2 border-l border-[#e4dcce]">
                <button
                  onClick={handleShare}
                  className="p-1.5 rounded text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg)] cursor-pointer transition-colors"
                  title="Copy link"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-1.5 rounded cursor-pointer transition-colors ${
                    bookmarked ? 'text-amber-600' : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark size={16} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Table of Contents & Related Quick Links (Sticky on Desktop) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">

            {/* Table of Contents */}
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 shadow-xs">
              <h2 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider mb-3 flex items-center gap-2 pb-2 border-b border-[var(--color-border)]">
                <BookOpen size={14} className="text-[var(--color-primary)]" />
                Table of Contents
              </h2>
              <nav className="space-y-1.5">
                {navSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className="w-full text-left text-xs sm:text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[#f6f2ea] px-2.5 py-1.5 rounded transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="truncate">{sec.label}</span>
                    <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-primary)]" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Summary Pill: Primary Dosha & Dhatus */}
            <div className="bg-[var(--color-border)] rounded-xl border border-[var(--color-border)] p-5">
              <h3 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider mb-3">
                Pathological Classification
              </h3>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[var(--color-muted)] block">Predominant Dosha:</span>
                  <span className="font-semibold text-[#1a291d]">{disease.ayurvedicPerspective.doshaImbalance}</span>
                </div>
                <div>
                  <span className="text-[var(--color-muted)] block">Tissues Involved (Dhatus):</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {disease.ayurvedicPerspective.dhatusAffected.map((dhatu, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-[var(--color-border)] text-xs text-[#2c3d30] font-medium">
                        {dhatu}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Botanical Agents */}
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 shadow-xs">
              <h3 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider mb-3">
                Primary Botanical Agents
              </h3>
              <div className="space-y-3">
                {associatedIngredients.map((herb) => (
                  <Link
                    key={herb.id}
                    href={`/ingredients/${herb.slug}`}
                    className="flex items-center gap-3 p-2 rounded hover:bg-[var(--color-bg)] transition-colors border border-transparent hover:border-[var(--color-border)]"
                  >
                    <RemoteImage src={herb.featuredImage} alt={herb.commonName} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[var(--color-ink)] hover:text-[var(--color-primary)]">{herb.commonName}</div>
                      <div className="text-xs font-serif italic text-[var(--color-accent)]">{herb.sanskritName}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Column: Editorial Health Article */}
          <div className="lg:col-span-8 space-y-10">

            {/* 1. Overview */}
            <section id="sec-overview" className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mb-4 pb-2 border-b border-[var(--color-border)]">
                1. Clinical Overview & Definition
              </h2>
              <div
                className="patientscure-rich-content"
                dangerouslySetInnerHTML={{ __html: lazyLoadContentMedia(disease.overview || '') }}
              />
            </section>

            {/* 2. Ayurvedic Perspective (Samprapti & Nidana) */}
            <section id="sec-ayurveda" className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mb-4 pb-2 border-b border-[var(--color-border)]">
                2. Ayurvedic Perspective (Samprapti & Nidana)
              </h2>
              <div className="space-y-5 text-sm sm:text-base text-[#38463c]">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
                    Disease Pathogenesis (Samprapti)
                  </h3>
                  <p className="bg-[var(--color-bg)] p-4 rounded-lg border border-[var(--color-border)] text-xs sm:text-sm leading-relaxed">
                    {disease.ayurvedicPerspective.samprapti}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2">
                    Classical Root Causes (Nidana)
                  </h3>
                  <ul className="space-y-2">
                    {disease.ayurvedicPerspective.nidana.map((nidana, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0"></span>
                        <span>{nidana}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Symptoms & Warning Signs */}
            <section id="sec-symptoms" className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mb-4 pb-2 border-b border-[var(--color-border)]">
                3. Symptoms & Warning Signs
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Classical Symptoms */}
                <div className="bg-[var(--color-bg)] p-4 sm:p-5 rounded-lg border border-[#e6decf]">
                  <h3 className="font-editorial font-bold text-lg text-[var(--color-ink)] mb-3">
                    Classical Signs (Rupa / Lakshana)
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--color-muted)]">
                    {disease.symptoms.classical.map((sym, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modern Manifestation */}
                <div className="bg-[#F8F9F8] p-4 sm:p-5 rounded-lg border border-[#dfe8e1]">
                  <h3 className="font-editorial font-bold text-lg text-[var(--color-ink)] mb-3">
                    Modern Clinical Presentation
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--color-muted)]">
                    {disease.symptoms.modern.map((sym, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#2B6E44] shrink-0 mt-0.5" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Red Flag Warning Signs */}
              <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <AlertTriangle size={16} />
                  <span>When to Seek Immediate Medical Evaluation (Red Flags)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-amber-900">
                  {disease.symptoms.warningSigns.map((warning, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 4. Causes */}
            <section id="sec-causes" className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mb-4 pb-2 border-b border-[var(--color-border)]">
                4. Primary Etiological Causes (Hetu)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {disease.causes.map((cause, i) => (
                  <div key={i} className="p-3 bg-[var(--color-bg)] rounded border border-[var(--color-border)] flex items-start gap-2.5">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent)] shrink-0">0{i+1}.</span>
                    <span className="text-[#3c4a3f]">{cause}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Diet & Lifestyle (Pathya / Apathya) */}
            <section id="sec-diet" className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mb-4 pb-2 border-b border-[var(--color-border)]">
                5. Diet & Lifestyle Protocols (Pathya & Apathya)
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mb-6">
                In Ayurveda, diet (Ahara) is considered medicine itself: "Without proper diet, medicine is of no use. With proper diet, medicine is of no need."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Wholesome Foods (Pathya) */}
                <div className="p-5 rounded-lg bg-emerald-50/50 border border-emerald-200">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>Wholesome & Recommended (Pathya)</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#27382c]">
                    {disease.dietAndLifestyle.pathya.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unwholesome Foods (Apathya) */}
                <div className="p-5 rounded-lg bg-rose-50/50 border border-rose-200">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
                    <AlertTriangle size={15} />
                    <span>Strictly Avoid (Apathya)</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#382729]">
                    {disease.dietAndLifestyle.apathya.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-700 font-bold shrink-0">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Yoga & Pranayama */}
              <div className="bg-[var(--color-bg)] p-5 rounded-lg border border-[#e6ded0]">
                <h3 className="font-editorial font-bold text-lg text-[var(--color-ink)] mb-2">
                  Therapeutic Yoga, Pranayama & Lifestyle
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-semibold text-[var(--color-accent)] uppercase text-xs mb-2">Daily Habits (Vihara)</h4>
                    <ul className="space-y-1.5 text-[#445247]">
                      {disease.dietAndLifestyle.lifestyleTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[var(--color-primary)] uppercase text-xs mb-2">Yoga Asanas & Breathwork</h4>
                    <ul className="space-y-1.5 text-[#445247]">
                      {disease.dietAndLifestyle.yogaPranayama.map((yoga, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{yoga}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Traditional Desi Nuskhe (Home Remedies) */}
            <section id="sec-remedies" className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-border)]">
                <div>
                  <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">Traditional Formulations</span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)]">
                    6. Verified Desi Nuskhe (Home Remedies)
                  </h2>
                </div>
                <span className="text-xs text-[var(--color-muted)]">{associatedRemedies.length} available</span>
              </div>

              <div className="space-y-4">
                {associatedRemedies.map((remedy) => (
                  <div
                    key={remedy.id}
                    className="p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-primary)]/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-white border border-[var(--color-border)] text-[var(--color-primary)]">
                          {remedy.hindiName || 'घरेलू नुस्खा'}
                        </span>
                        <span className="text-xs text-[var(--color-muted)]">Prep time: {remedy.prepTime}</span>
                      </div>
                      <h3 className="text-lg font-editorial font-bold text-[var(--color-ink)] hover:text-[var(--color-primary)]">
                        <Link href={`/remedies/${remedy.slug}`}>{remedy.name}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 line-clamp-2">
                        {remedy.purpose}
                      </p>
                    </div>

                    <Link
                      href={`/remedies/${remedy.slug}`}
                      className="shrink-0 px-4 py-2 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Full Recipe & Dosage</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Clinical Precautions */}
            <section id="sec-precautions" className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mb-4 pb-2 border-b border-[var(--color-border)]">
                7. Important Clinical Precautions
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#48564b]">
                {disease.precautions.map((prec, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <ShieldCheck size={16} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. FAQs */}
            <section id="sec-faqs" className="bg-white rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mb-4 pb-2 border-b border-[var(--color-border)]">
                8. Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {disease.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-[var(--color-border)] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full text-left p-4 bg-[var(--color-bg)] hover:bg-[var(--color-border)] text-xs sm:text-sm font-semibold text-[#18291c] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform text-[var(--color-accent)] ${openFaqIndex === idx ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 bg-white text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed border-t border-[var(--color-border)]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Classical References */}
            <section id="sec-references" className="bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] p-6 sm:p-8 scroll-mt-24">
              <h2 className="text-xl font-editorial font-bold text-[var(--color-ink)] mb-3">
                9. Classical Samhita & Modern Citations
              </h2>
              <ul className="space-y-2 text-xs text-[#5f6f63]">
                {disease.references.map((ref, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-[var(--color-accent)]">[0{idx + 1}]</span>
                    <div>
                      <span className="font-semibold text-[#293a2c]">{ref.title}</span> — <span>{ref.source}</span>
                      {ref.year && <span className="text-[#88978c]"> ({ref.year})</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};
