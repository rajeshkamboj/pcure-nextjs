import Link from "next/link";
import Image from "next/image";
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
import { HomeHeroSearch } from "@/components/HomeHeroSearch";
import { DISEASES, REMEDIES, INGREDIENTS, ARTICLES } from "@/data/mockData";

export const revalidate = 300;

async function getHomeData() {
  try {
    const [diseases, remedies, herbs, posts] = await Promise.all([
      ContentService.getFeaturedDiseases().catch(() => []),
      ContentService.getFeaturedRemedies().catch(() => []),
      ContentService.getAllIngredients().catch(() => []),
      ContentService.getAllArticles().catch(() => []),
    ]);
    // Fallback to mock data when WordPress is unreachable or returns empty (offline build/demo)
    const fbDiseases = diseases.length ? diseases : DISEASES.filter((d) => d.featured);
    const fbRemedies = remedies.length ? remedies : REMEDIES.filter((r) => r.featured);
    const fbHerbs = herbs.length ? herbs : INGREDIENTS;
    const fbPosts = posts.length ? posts : ARTICLES;
    return { diseases: fbDiseases, remedies: fbRemedies, herbs: fbHerbs, posts: fbPosts };
  } catch {
    return {
      diseases: DISEASES.filter((d) => d.featured),
      remedies: REMEDIES.filter((r) => r.featured),
      herbs: INGREDIENTS,
      posts: ARTICLES,
    };
  }
}

export default async function HomePage() {
  const { diseases: featuredDiseases, remedies: featuredRemedies, herbs: ingredients, posts: articles } = await getHomeData();

  return (
    <div className="bg-[#FAF8F5]">
      {/* Editorial Hero Header */}
      <section className="relative border-b border-[#e5dfd3] bg-[#f5f0e6] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 opacity-5 pointer-events-none translate-x-1/3 -translate-y-1/3">
          <svg viewBox="0 0 200 200" fill="currentColor" className="text-[#1A4329] w-full h-full">
            <path d="M42.7,-64.1C54.6,-57.4,63.2,-44.6,69.5,-30.9C75.8,-17.1,79.8,-2.3,77.5,11.8C75.1,25.9,66.4,39.3,55.1,49.8C43.8,60.3,29.9,67.9,15.1,70.9C0.3,73.8,-15.4,72.1,-29.3,65.6C-43.2,59.1,-55.3,47.8,-63.9,34.2C-72.5,20.6,-77.6,4.6,-74.6,-9.7C-71.7,-24,-60.7,-36.7,-48.2,-43.6C-35.7,-50.5,-21.7,-51.7,-7.1,-58.5C7.4,-65.4,30.8,-70.7,42.7,-64.1Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#1E4D30] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#cad9cf]">
                <Sparkles size={13} className="text-[#2B6E44]" />
                Classical Wisdom • Evidence-Informed
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#14261B] tracking-tight leading-[1.18] mb-4">
                Timeless Ayurvedic Healing, Documented with Clinical Precision.
              </h1>

              <p className="text-base sm:text-lg text-[#4a554a] font-normal leading-relaxed mb-8 max-w-2xl">
                Explore an authentic library of classical disease pathologies, time-tested <span className="text-[#1A4329] font-medium italic">Desi Nuskhe</span> home remedies, and dravyaguna botanical profiles reviewed by certified Vaidyas.
              </p>

              <HomeHeroSearch />
            </div>

            <div className="lg:col-span-5">
              {featuredDiseases.length > 0 ? (
                <div className="bg-white rounded-xl border border-[#ded6c8] shadow-md p-6 sm:p-7 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-[#eee7da] mb-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#8B6B3E] uppercase tracking-wider">
                      <Activity size={14} />
                      <span>Featured Classical Monograph</span>
                    </div>
                    <span className="text-[11px] font-medium text-[#7c8b7f] bg-[#f4efe6] px-2 py-0.5 rounded">Charaka Samhita</span>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-[#f0f7f2] text-[#1E4D30] mb-2">
                      {featuredDiseases[0].category}
                    </span>
                    <Link
                      href={`/diseases/${featuredDiseases[0].slug}`}
                      className="block text-xl sm:text-2xl font-editorial font-bold text-[#14261B] hover:text-[#1E4D30] transition-colors"
                    >
                      {featuredDiseases[0].name}
                    </Link>
                    <p className="text-xs sm:text-sm text-[#546257] mt-2 leading-relaxed line-clamp-3">
                      {featuredDiseases[0].summary}
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#e8e1d5] flex items-center justify-between mb-5">
                    <div className="text-xs text-[#4d5c50]">
                      <div className="font-semibold text-[#203325]">Reviewed by {featuredDiseases[0].reviewedBy.name}</div>
                      <div className="text-[11px] text-[#718074]">{featuredDiseases[0].reviewedBy.credentials}</div>
                    </div>
                    <div className="text-xs font-medium text-[#1E4D30] flex items-center gap-1">
                      <ShieldCheck size={16} />
                      <span>Peer Verified</span>
                    </div>
                  </div>

                  <Link
                    href={`/diseases/${featuredDiseases[0].slug}`}
                    className="w-full text-center bg-[#F1ECE1] hover:bg-[#e4ddcf] text-[#1E4D30] font-semibold text-xs sm:text-sm py-2.5 rounded-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Read Complete Clinical Guide</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-[#ded6c8] shadow-md p-6 sm:p-7 text-center">
                  <p className="text-sm text-[#7c8b7f]">No featured monograph available at this time.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Editorial Methodology Bar */}
      <section className="bg-white border-b border-[#E5DFD3] py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF2ED] text-[#1E4D30] flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1a281e] uppercase tracking-wide">Classical Samhitas</h4>
                <p className="text-[11px] text-[#69796e] leading-tight">Charaka, Sushruta & Vagbhata texts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF2ED] text-[#1E4D30] flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1a281e] uppercase tracking-wide">Vaidya-Reviewed</h4>
                <p className="text-[11px] text-[#69796e] leading-tight">Strict dosage & contraindication safety</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF2ED] text-[#1E4D30] flex items-center justify-center shrink-0">
                <Leaf size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1a281e] uppercase tracking-wide">Pure Desi Nuskhe</h4>
                <p className="text-[11px] text-[#69796e] leading-tight">Kitchen herbs & accessible remedies</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF2ED] text-[#1E4D30] flex items-center justify-center shrink-0">
                <Droplets size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1a281e] uppercase tracking-wide">Dosha Balancing</h4>
                <p className="text-[11px] text-[#69796e] leading-tight">Vata, Pitta & Kapha harmonizing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Health Conditions */}
      <section className="py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[#e5dfd3]">
            <div>
              <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">Ailment Directory</span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#14261B] mt-1">
                Common Health Conditions & Pathologies
              </h2>
            </div>
            <Link
              href="/diseases"
              className="mt-3 md:mt-0 text-xs sm:text-sm font-semibold text-[#1E4D30] hover:text-[#133621] flex items-center gap-1 transition-colors"
            >
              <span>View All Disease Guides</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDiseases.slice(0, 3).map((disease) => (
              <Link
                key={disease.id}
                href={`/diseases/${disease.slug}`}
                className="group bg-white rounded-lg border border-[#e5ded2] p-5 hover:border-[#1E4D30]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-[#f4efe5] text-[#71552d]">
                      {disease.category}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#e8f2ec] text-[#1E4D30] flex items-center gap-1">
                      <Droplets size={11} />
                      {disease.primaryDosha} Dosha
                    </span>
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-[#1b2b20] group-hover:text-[#1E4D30] transition-colors leading-snug">
                    {disease.name}
                  </h3>
                  <div className="text-xs font-serif italic text-[#8B6B3E] mb-2">{disease.sanskritName}</div>

                  <p className="text-xs sm:text-sm text-[#4d5a50] leading-relaxed line-clamp-3 mb-4">
                    {disease.summary}
                  </p>

                  <div className="flex items-center gap-2.5 text-xs text-[#6e7d72]">
                    <span>{disease.readingTime}</span>
                    <span>•</span>
                    <span className="text-[#8B6B3E] font-medium">{disease.homeRemediesIds.length} Verified Desi Nuskhe</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f0ebe1] flex items-center justify-end">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#FAF7F0] group-hover:bg-[#1E4D30] group-hover:text-white text-[#1E4D30] text-xs font-semibold transition-all">
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[#ded5c5]">
            <div>
              <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">Time-Honored Formulations</span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#14261B] mt-1">
                Authentic Desi Nuskhe (Home Remedies)
              </h2>
              <p className="text-xs sm:text-sm text-[#546257] mt-1">
                Formulations crafted from household spices and kitchen apothecaries with dosage clarity.
              </p>
            </div>
            <Link
              href="/remedies"
              className="mt-3 md:mt-0 text-xs sm:text-sm font-semibold text-[#1E4D30] hover:text-[#133621] flex items-center gap-1 transition-colors"
            >
              <span>Explore All Desi Nuskhe</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRemedies.slice(0, 3).map((remedy, idx) => (
              <Link
                key={remedy.id}
                href={`/remedies/${remedy.slug}`}
                className="group bg-white rounded-lg border border-[#e1d9cc] overflow-hidden hover:shadow-md hover:border-[#1E4D30]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative border-b border-[#eee7da]">
                    {remedy.featuredImage ? (
                      <Image
                        src={remedy.featuredImage}
                        alt={remedy.name}
                        width={400}
                        height={176}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx === 0}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f0ebe1]" />
                    )}
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-semibold text-[#1E4D30] shadow-xs">
                      {remedy.hindiName || "देसी नुस्खा"}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-[#14261B]/80 text-white px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                      <Clock size={11} />
                      <span>{remedy.prepTime}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] font-medium text-[#8B6B3E] uppercase tracking-wider mb-1.5">
                      Balances {remedy.primaryDoshaBalancing} Dosha
                    </div>
                    <h3 className="text-lg font-editorial font-bold text-[#1b2b20] group-hover:text-[#1E4D30] transition-colors leading-snug mb-2">
                      {remedy.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4f5c52] line-clamp-2 mb-4 leading-relaxed">
                      {remedy.purpose}
                    </p>

                    <div className="bg-[#FAF8F5] p-2.5 rounded border border-[#ece4d6] text-xs text-[#526055] space-y-1 mb-2">
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

                  <div className="px-5 pb-4 pt-1 flex items-center justify-between text-xs text-[#1E4D30] font-semibold">
                    <span className="text-[11px] text-[#78887c] font-normal">{remedy.ingredients.length} Pure Ingredients</span>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[#e5dfd3]">
            <div>
              <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">Botanical Materia Medica</span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#14261B] mt-1">
                Classical Medicinal Plants, Spices & Herbs
              </h2>
              <p className="text-xs sm:text-sm text-[#546257] mt-1">
                Energetics (Rasa, Virya, Vipaka) and clinical applications according to Dravyaguna.
              </p>
            </div>
            <Link
              href="/ingredients"
              className="mt-3 md:mt-0 text-xs sm:text-sm font-semibold text-[#1E4D30] hover:text-[#133621] flex items-center gap-1 transition-colors"
            >
              <span>Browse Full Herb Library</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ingredients.slice(0, 12).map((herb) => (
              <Link
                key={herb.id}
                href={`/ingredients/${herb.slug}`}
                className="group bg-white rounded-lg border border-[#e5dfd3] p-3.5 hover:border-[#1E4D30] hover:shadow-sm transition-all text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-[#ded5c5]">
                  {herb.featuredImage ? (
                    <Image
                      src={herb.featuredImage}
                      alt={herb.commonName}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f0ebe1] flex items-center justify-center text-[#8B6B3E]">
                      <Leaf size={20} />
                    </div>
                  )}
                </div>
                <h4 className="font-editorial font-bold text-sm text-[#182a1d] group-hover:text-[#1E4D30] transition-colors leading-tight">
                  {herb.commonName}
                </h4>
                <div className="text-[11px] font-serif italic text-[#8B6B3E] mt-0.5">{herb.sanskritName}</div>
                <div className="text-[10px] text-[#778679] mt-2 bg-[#f6f2ea] px-2 py-0.5 rounded-full">{herb.category}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Health Articles */}
      <section className="bg-white py-14 sm:py-16 border-t border-[#e6dfd2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-[#e5dfd3]">
            <div>
              <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">Editorial Journal</span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#14261B] mt-1">
                Ayurvedic Insights for Contemporary Living
              </h2>
            </div>

            <Link href="/articles" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold text-[#1E4D30] hover:text-[#8B6B3E] transition-colors">
              <span>View All Articles</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {articles.slice(0, 6).map((article, idx) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="h-48 rounded-lg overflow-hidden mb-4 border border-[#e5dfd3]">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx === 0}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f0ebe1]" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#718074] mb-2">
                    <span className="font-semibold text-[#8B6B3E] uppercase">{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-[#18291d] group-hover:text-[#1E4D30] transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4f5c52] line-clamp-2 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-[#f0ebd5]">
                  {article.author.avatarUrl ? (
                    <Image src={article.author.avatarUrl} alt={article.author.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#EAF2ED] text-[#1E4D30] flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold">{article.author.name.charAt(0)}</span>
                    </div>
                  )}

                  <div className="text-xs">
                    <div className="font-semibold text-[#1e2e21]">{article.author.name}</div>

                    <div className="text-[10px] text-[#768478]">
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
      <section className="py-12 bg-[#FAF7F0] border-t border-[#E5DFD3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl border border-[#ded5c5] bg-[#F4EFE5] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#1E4D30] text-white flex items-center justify-center shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-editorial font-bold text-lg text-[#16271a] mb-1">
                Our Editorial & Medical Integrity Commitment
              </h3>
              <p className="text-xs sm:text-sm text-[#4e5c51] leading-relaxed">
                Patientscure bridges the timeless wisdom of classical Brihat Trayi Samhitas with modern botanical pharmacology. Every home remedy, ingredient dosage, and symptom overview is rigorously validated by qualified Ayurvedic physicians (BAMS / MD Ayurveda) before publication.
              </p>
            </div>
            <Link
              href="/about"
              className="shrink-0 px-4 py-2 bg-white text-[#1E4D30] hover:bg-[#FAF8F5] border border-[#cfc5b4] rounded font-medium text-xs sm:text-sm transition-colors text-center"
            >
              Learn About Our Vaidyas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
