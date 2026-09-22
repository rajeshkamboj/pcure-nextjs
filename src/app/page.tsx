import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  Activity,
  Leaf,
  Droplets,
  Clock,
} from "lucide-react";
import { ContentService } from "@/services/contentService";
import { HeroSearch } from "@/components/home/HeroSearch";
import { RemoteImage } from "@/components/ui/RemoteImage";

// ISR: the whole home page is generated at build and refreshed at most every 60 seconds (instantly when the revalidate webhook fires)
// (literal required by Next; keep in sync with WP_REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function HomePage() {
  // Server-side, cached, in parallel. Previously these four collections were fetched
  // in full from the browser after hydration while the user saw a spinner.
  const [featuredDiseases, featuredRemedies, ingredients, articles] = await Promise.all([
    ContentService.getFeaturedDiseases(),
    ContentService.getFeaturedRemedies(),
    ContentService.getAllIngredients(),
    ContentService.getLatestArticles(6),
  ]);

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Editorial Hero Header */}
      <section className="relative border-b border-[var(--color-border)] bg-[#f5f0e6] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 opacity-5 pointer-events-none translate-x-1/3 -translate-y-1/3">
          <svg viewBox="0 0 200 200" fill="currentColor" className="text-[#1A4329] w-full h-full">
            <path d="M42.7,-64.1C54.6,-57.4,63.2,-44.6,69.5,-30.9C75.8,-17.1,79.8,-2.3,77.5,11.8C75.1,25.9,66.4,39.3,55.1,49.8C43.8,60.3,29.9,67.9,15.1,70.9C0.3,73.8,-15.4,72.1,-29.3,65.6C-43.2,59.1,-55.3,47.8,-63.9,34.2C-72.5,20.6,-77.6,4.6,-74.6,-9.7C-71.7,-24,-60.7,-36.7,-48.2,-43.6C-35.7,-50.5,-21.7,-51.7,-7.1,-58.5C7.4,-65.4,30.8,-70.7,42.7,-64.1Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#cad9cf]">
                <Sparkles size={13} className="text-[#2B6E44]" />
                Classical Wisdom • Evidence-Informed
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[var(--color-ink)] tracking-tight leading-[1.18] mb-4">
                Timeless Ayurvedic Healing, Documented with Clinical Precision.
              </h1>

              <p className="text-base sm:text-lg text-[#4a554a] font-normal leading-relaxed mb-8 max-w-2xl">
                Explore an authentic library of classical disease pathologies, time-tested <span className="text-[#1A4329] font-medium italic">Desi Nuskhe</span> home remedies, and dravyaguna botanical profiles reviewed by certified Vaidyas.
              </p>

              <HeroSearch />
            </div>

            <div className="lg:col-span-5">
              {featuredDiseases.length > 0 ? (
                <div className="bg-white rounded-xl border border-[#ded6c8] shadow-md p-6 sm:p-7 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                      <Activity size={14} />
                      <span>Featured Classical Monograph</span>
                    </div>
                    <span className="text-xs font-medium text-[var(--color-muted)] bg-[#f4efe6] px-2 py-0.5 rounded">Charaka Samhita</span>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-[#f0f7f2] text-[var(--color-primary)] mb-2">
                      {featuredDiseases[0].category}
                    </span>
                    <h2 className="text-xl font-editorial font-bold text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors">
                      <Link href={`/diseases/${featuredDiseases[0].slug}`}>{featuredDiseases[0].name}</Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-2 leading-relaxed line-clamp-3">
                      {featuredDiseases[0].summary}
                    </p>
                  </div>

                  <div className="bg-[var(--color-bg)] p-3.5 rounded-lg border border-[var(--color-border)] flex items-center justify-between mb-5">
                    <div className="text-xs text-[var(--color-muted)]">
                      <div className="font-semibold text-[#203325]">Reviewed by {featuredDiseases[0].reviewedBy.name}</div>
                      <div className="text-xs text-[var(--color-muted)]">{featuredDiseases[0].reviewedBy.credentials}</div>
                    </div>
                    <div className="text-xs font-medium text-[var(--color-primary)] flex items-center gap-1">
                      <ShieldCheck size={16} />
                      <span>Peer Verified</span>
                    </div>
                  </div>

                  <Link href={`/diseases/${featuredDiseases[0].slug}`} className="w-full text-center bg-[#F1ECE1] hover:bg-[#e4ddcf] text-[var(--color-primary)] font-semibold text-xs sm:text-sm py-2.5 rounded-md transition-colors flex items-center justify-center gap-1.5">
                    <span>Read Complete Clinical Guide</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-[#ded6c8] shadow-md p-6 sm:p-7 text-center">
                  <p className="text-sm text-[var(--color-muted)]">No featured monograph available at this time.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Editorial Methodology Bar */}
      <section className="bg-white border-b border-[var(--color-border)] py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--color-border)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wide">Classical Samhitas</h4>
                <p className="text-xs text-[#69796e] leading-tight">Charaka, Sushruta & Vagbhata texts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--color-border)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wide">Vaidya-Reviewed</h4>
                <p className="text-xs text-[#69796e] leading-tight">Strict dosage & contraindication safety</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--color-border)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                <Leaf size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wide">Pure Desi Nuskhe</h4>
                <p className="text-xs text-[#69796e] leading-tight">Kitchen herbs & accessible remedies</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--color-border)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                <Droplets size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wide">Dosha Balancing</h4>
                <p className="text-xs text-[#69796e] leading-tight">Vata, Pitta & Kapha harmonizing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Health Conditions */}
      <section className="py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[var(--color-border)]">
            <div>
              <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">Ailment Directory</span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mt-1">
                Common Health Conditions & Pathologies
              </h2>
            </div>
            <Link href="/diseases" className="mt-3 md:mt-0 text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:text-[#133621] flex items-center gap-1 transition-colors">
              <span>View All Disease Guides</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDiseases.slice(0, 3).map((disease) => (
              <Link
                key={disease.id}
                href={`/diseases/${disease.slug}`}
                className="group bg-white rounded-lg border border-[#e5ded2] p-5 hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[var(--color-border)] text-[#71552d]">
                      {disease.category}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--color-border)] text-[var(--color-primary)] flex items-center gap-1">
                      <Droplets size={11} />
                      {disease.primaryDosha} Dosha
                    </span>
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-[#1b2b20] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                    {disease.name}
                  </h3>
                  <div className="text-xs font-serif italic text-[var(--color-accent)] mb-2">{disease.sanskritName}</div>

                  <p className="text-xs sm:text-sm text-[#4d5a50] leading-relaxed line-clamp-3 mb-4">
                    {disease.summary}
                  </p>

                  <div className="flex items-center gap-2.5 text-xs text-[#6e7d72]">
                    <span>{disease.readingTime}</span>
                    <span>•</span>
                    <span className="text-[var(--color-accent)] font-medium">{disease.homeRemediesIds.length} Verified Desi Nuskhe</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--color-bg)] group-hover:bg-[var(--color-primary)] group-hover:text-white text-[var(--color-primary)] text-xs font-semibold transition-all">
                    <span>Clinical Guide</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Authentic Desi Nuskhe */}
      <section className="bg-[#F3EFE6] py-14 sm:py-16 border-y border-[#E2DBD0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[var(--color-border)]">
            <div>
              <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">Time-Honored Formulations</span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mt-1">
                Authentic Desi Nuskhe (Home Remedies)
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
                Formulations crafted from household spices and kitchen apothecaries with dosage clarity.
              </p>
            </div>
            <Link href="/remedies" className="mt-3 md:mt-0 text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:text-[#133621] flex items-center gap-1 transition-colors">
              <span>Explore All Desi Nuskhe</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRemedies.slice(0, 3).map((remedy) => (
              <Link
                key={remedy.id}
                href={`/remedies/${remedy.slug}`}
                className="group bg-white rounded-lg border border-[#e1d9cc] overflow-hidden hover:shadow-md hover:border-[var(--color-primary)]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative border-b border-[var(--color-border)]">
                    <RemoteImage
                      src={remedy.featuredImage}
                      alt={remedy.name}
                      fill
                      sizes="(min-width: 1152px) 368px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded text-xs font-semibold text-[var(--color-primary)] shadow-xs">
                      {remedy.hindiName || "देसी नुस्खा"}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-[var(--color-ink)]/80 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                      <Clock size={11} />
                      <span>{remedy.prepTime}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider mb-1.5">
                      Balances {remedy.primaryDoshaBalancing} Dosha
                    </div>
                    <h3 className="text-lg font-editorial font-bold text-[#1b2b20] group-hover:text-[var(--color-primary)] transition-colors leading-snug mb-2">
                      {remedy.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4f5c52] line-clamp-2 mb-4 leading-relaxed">
                      {remedy.purpose}
                    </p>

                    <div className="bg-[var(--color-bg)] p-2.5 rounded border border-[var(--color-border)] text-xs text-[#526055] space-y-1 mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#7d8c80]">Target:</span>
                        <span className="font-medium text-[#253629] text-right line-clamp-1">{remedy.targetCondition}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7d8c80]">Timing:</span>
                        <span className="font-medium text-[#253629] text-right">{remedy.howToUse.timing}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-1 flex items-center justify-between text-xs text-[var(--color-primary)] font-semibold">
                    <span className="text-xs text-[#78887c] font-normal">{remedy.ingredients.length} Pure Ingredients</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Recipe & Dosage</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ayurvedic Materia Medica */}
      <section className="py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[var(--color-border)]">
            <div>
              <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">Botanical Materia Medica</span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mt-1">
                Classical Medicinal Plants, Spices & Herbs
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
                Energetics (Rasa, Virya, Vipaka) and clinical applications according to Dravyaguna.
              </p>
            </div>
            <Link href="/ingredients" className="mt-3 md:mt-0 text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:text-[#133621] flex items-center gap-1 transition-colors">
              <span>Browse Full Herb Library</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ingredients.map((herb) => (
              <Link
                key={herb.id}
                href={`/ingredients/${herb.slug}`}
                className="group bg-white rounded-lg border border-[var(--color-border)] p-3.5 hover:border-[var(--color-primary)] hover:shadow-sm transition-all text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-[var(--color-border)]">
                  {herb.featuredImage ? (
                    <RemoteImage src={herb.featuredImage} alt={herb.commonName} width={64} height={64} sizes="64px" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
                      <Leaf size={20} />
                    </div>
                  )}
                </div>
                <h4 className="font-editorial font-bold text-sm text-[#182a1d] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                  {herb.commonName}
                </h4>
                <div className="text-xs font-serif italic text-[var(--color-accent)] mt-0.5">{herb.sanskritName}</div>
                <div className="text-xs text-[#778679] mt-2 bg-[#f6f2ea] px-2 py-0.5 rounded-full">{herb.category}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Health Articles */}
      <section className="bg-white py-14 sm:py-16 border-t border-[#e6dfd2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[var(--color-border)]">
            <div>
              <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">Editorial Journal</span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[var(--color-ink)] mt-1">
                Ayurvedic Insights for Contemporary Living
              </h2>
            </div>

            <Link href="/articles" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors">
              <span>View All Articles</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {articles.slice(0, 6).map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="h-48 rounded-lg overflow-hidden mb-4 border border-[var(--color-border)] relative">
                    <RemoteImage
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1152px) 368px, (min-width: 768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-2">
                    <span className="font-semibold text-[var(--color-accent)] uppercase">{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-[#18291d] group-hover:text-[var(--color-primary)] transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4f5c52] line-clamp-2 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-[var(--color-border)]">
                    {article.author.avatarUrl ? (
                      <RemoteImage src={article.author.avatarUrl} alt={article.author.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[var(--color-border)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold">{article.author.name.charAt(0)}</span>
                      </div>
                    )}

                  <div className="text-xs">
                    <div className="font-semibold text-[#1e2e21]">{article.author.name}</div>

                    <div className="text-xs text-[#768478]">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Educational & Trust Assurance Block */}
      <section className="py-12 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-border)] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-editorial font-bold text-lg text-[var(--color-ink)] mb-1">
                Our Editorial & Medical Integrity Commitment
              </h3>
              <p className="text-xs sm:text-sm text-[#4e5c51] leading-relaxed">
                Patientscure bridges the timeless wisdom of classical Brihat Trayi Samhitas with modern botanical pharmacology. Every home remedy, ingredient dosage, and symptom overview is rigorously validated by qualified Ayurvedic physicians (BAMS / MD Ayurveda) before publication.
              </p>
            </div>
            <Link href="/about" className="shrink-0 px-4 py-2 bg-white text-[var(--color-primary)] hover:bg-[var(--color-bg)] border border-[#cfc5b4] rounded font-medium text-xs sm:text-sm transition-colors">
              Learn About Our Vaidyas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
