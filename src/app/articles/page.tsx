import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { ContentService } from "@/services/contentService";
import { ARTICLES } from "@/data/mockData";

export const revalidate = 300;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page) || 1);

  let articles: Awaited<ReturnType<typeof ContentService.getArticlesPaginated>>["articles"] = [];
  let totalPages = 1;
  let totalArticles = 0;
  let error: string | null = null;

  try {
    const result = await ContentService.getArticlesPaginated(currentPage, 9);
    articles = result.articles;
    totalPages = result.totalPages;
    totalArticles = result.totalArticles;
  } catch (e) {
    console.error("Error loading articles:", e);
    error = "Unable to load articles. Please try again.";
  }

  const startItem = totalArticles === 0 ? 0 : (currentPage - 1) * 9 + 1;
  const endItem = Math.min(currentPage * 9, totalArticles);

  const getPageHref = (page: number) => {
    if (page <= 1) return "/articles";
    return `/articles?page=${page}`;
  };

  return (
    <main className="bg-[#FAF7F0] min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-[#e5dfd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">Editorial Journal</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#14261B] mt-2">
            Ayurvedic Insights for Contemporary Living
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#5d695f] leading-relaxed mt-4">
            Explore our collection of health, wellness, Ayurveda, remedies, ingredients, and practical guidance for contemporary living.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {error && (
          <div className="bg-white border border-[#e5dfd3] rounded-lg p-8 text-center">
            <p className="text-[#5d695f]">{error}</p>
          </div>
        )}

        {!error && articles.length === 0 && (
          <div className="bg-white border border-[#e5dfd3] rounded-lg p-12 text-center">
            <h2 className="font-editorial text-xl font-bold text-[#14261B]">No articles found</h2>
            <p className="text-sm text-[#718074] mt-2">There are no articles available on this page.</p>
            {currentPage > 1 && (
              <Link href="/articles" className="mt-5 inline-block text-sm font-semibold text-[#1E4D30]">
                Return to page 1
              </Link>
            )}
          </div>
        )}

        {!error && articles.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-7">
              <p className="text-xs sm:text-sm text-[#718074]">
                Showing <span className="font-semibold text-[#39483e]">{startItem}–{endItem}</span> of{" "}
                <span className="font-semibold text-[#39483e]">{totalArticles}</span> articles
              </p>
              <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E4D30] hover:text-[#8B6B3E]">
                <ArrowLeft size={14} />
                Back to Home
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article, idx) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group bg-white border border-[#e5dfd3] rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
                >
                  <div className="h-52 overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        width={400}
                        height={208}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={currentPage === 1 && idx < 3}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f0ebe1]" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-[#718074] mb-3">
                      <span className="font-semibold text-[#8B6B3E] uppercase tracking-wide">{article.category}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-editorial font-bold text-[#18291d] group-hover:text-[#1E4D30] transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[#5d695f] leading-relaxed mt-3 line-clamp-3">{article.summary}</p>
                    <div className="mt-auto pt-5">
                      <div className="flex items-center gap-2.5 border-t border-[#f0ebd5] pt-4">
                        {article.author.avatarUrl ? (
                          <Image src={article.author.avatarUrl} alt={article.author.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#EAF2ED]" />
                        )}
                        <div>
                          <div className="text-xs font-semibold text-[#1e2e21]">{article.author.name}</div>
                          <div className="text-[10px] text-[#768478] flex items-center gap-1 mt-0.5">
                            <Calendar size={10} />
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-12 pt-7 border-t border-[#e5dfd3]">
                {currentPage > 1 ? (
                  <Link
                    href={getPageHref(currentPage - 1)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#d9d2c4] rounded-md text-sm font-semibold text-[#39483e] hover:bg-white transition-colors"
                  >
                    <ArrowLeft size={15} />
                    Previous
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#d9d2c4] rounded-md text-sm font-semibold text-[#39483e] opacity-40 cursor-not-allowed">
                    <ArrowLeft size={15} />
                    Previous
                  </span>
                )}

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={getPageHref(page)}
                      className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${
                        page === currentPage ? "bg-[#1E4D30] text-white" : "text-[#39483e] hover:bg-white border border-transparent hover:border-[#d9d2c4]"
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages ? (
                  <Link
                    href={getPageHref(currentPage + 1)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#d9d2c4] rounded-md text-sm font-semibold text-[#39483e] hover:bg-white transition-colors"
                  >
                    Next
                    <ArrowRight size={15} />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#d9d2c4] rounded-md text-sm font-semibold text-[#39483e] opacity-40 cursor-not-allowed">
                    Next
                    <ArrowRight size={15} />
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
